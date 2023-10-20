import type {NextAuthOptions} from 'next-auth';
import {cookies} from 'next/headers';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';

import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import {Resend} from 'resend';
import Cryptr from 'cryptr';
import {updateEmailVerified} from '@/lib/actions';
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY as string);
const resend = new Resend(process.env.SMTP_PASSWORD);
import ActivateAccountEmail from '@/emails/ActivateAccountEmail';

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: {
                    label: 'Name:',
                    type: 'text',
                    placeholder: 'your-cool-name',
                },
                email: {
                    label: 'Email:',
                    type: 'text',
                    placeholder: 'your-cool-email',
                },
                password: {
                    label: 'Password:',
                    type: 'password',
                    placeholder: 'your-awesome-password',
                },
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                // const user = {
                //     id: '42',
                //     name: 'Dave',
                //     password: 'nextauth',
                //     email: 'nextauth@gmail.com',
                // };
                const cookieStore = cookies();
                const access = cookieStore.get('access');

                const userExist = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email!,
                    },
                });

                if (userExist) {
                    if (userExist.password) {
                        const decryptedPassword = cryptr.decrypt(
                            userExist.password as string
                        );

                        if (
                            access?.value === 'signIn' &&
                            decryptedPassword !== credentials?.password
                        ) {
                            throw new Error('incorrect-credentials'); // Redirect to error page
                        } else if (access?.value === 'signUp') {
                            throw new Error('existing-credentials'); // Redirect to error page
                        }
                        return userExist;
                    } else {
                        throw new Error('existing-credentials-signin'); // Redirect to error page
                    }
                } else {
                    if (access?.value === 'signIn') {
                        throw new Error('incorrect-credentials'); // Redirect to error page}
                    }
                }
                const newUser = await prisma.user.create({
                    data: {
                        email: credentials?.email,
                        name: credentials?.name,
                        image: '/userProfile.png',
                        password: cryptr.encrypt(
                            credentials?.password as string
                        ),
                    },
                });
                return newUser;
            },
        }),
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest({
                identifier: email,
                url,
                provider: {server, from},
            }) {
                let {host} = new URL(url);
                const cookieStore = cookies();
                const userName = cookieStore.get('userName')?.value;
                await resend.emails.send({
                    from,
                    to: email,
                    subject: `Confirm your account on Promptopia`,
                    react: ActivateAccountEmail({userName, url}),
                    text: text({url, host}),
                });
            },
        }),
    ],
    pages: {
        signIn: '/signin',
        signOut: `/signout`,
        error: `/error`, // Error code passed in query string as ?error=
    },
    session: {strategy: 'jwt'},
    callbacks: {
        async signIn({profile, credentials, email, user, account}) {
            const cookieStore = cookies();
            const access = cookieStore.get('access');
            if (profile !== undefined) {
                const userExist = await prisma.user.findUnique({
                    where: {
                        email: profile?.email,
                    },
                });

                //console.log('profile', profile);
                //console.log('account', account);
                //console.log('user', user);

                if (!userExist && access?.value === 'signIn') {
                    //throw new Error('Credentials Login Incorrect'); // Redirect to error page
                    throw new Error('nonexistent-account'); // Redirect to error page
                    //return false;
                } else if (userExist && access?.value === 'signUp') {
                    throw new Error('existing-account'); // Redirect to error page
                } else if (userExist) {
                    const accountExist = await prisma.account.findUnique({
                        where: {
                            providerAccountId: account?.providerAccountId,
                        },
                    });
                    if (!accountExist)
                        throw new Error('existing-account-other-provider'); // Redirect to error page
                }
                return true;
            } else {
                return true;
            }
        },
        async session({session}) {
            const userSession = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email!,
                },
            });
            if (userSession) {
                if (!userSession.emailVerified && !userSession.password) {
                    await updateEmailVerified(
                        userSession?.email as string,
                        new Date()
                    );
                }
                const userRole =
                    userSession?.email === 'martinsantaclara@gmail.com'
                        ? 'Admin'
                        : 'User';
                session.user.id = userSession?.id as string;
                session.user.role = userRole;
                session.user.image = userSession?.image;
                session.user.name = userSession?.name;
                session.user.emailVerified =
                    !userSession.emailVerified && !userSession.password
                        ? new Date()
                        : userSession.emailVerified;
            }
            return session;
        },
        async jwt({token, account}) {
            const userToken = await prisma.user.findUnique({
                where: {
                    email: token.email!,
                },
            });
            token.userRole =
                token.email === 'martinsantaclara@gmail.com' ? 'admin' : 'user';

            if (account) token.token = account.access_token;

            return token;
        },
    },
};

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({url, host}: {url: string; host: string}) {
    return `Sign in to ${host}\n${url}\n\n`;
}
