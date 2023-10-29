import {NextResponse, NextRequest} from 'next/server';
import {setCookie} from '@/utils/setCookies';
import prisma from '@/lib/prisma';
import {Resend} from 'resend';
import ResetPasswordTokenEmail from '@/emails/ResetPasswordTokenEmail';
import {getCookie} from '@/utils/getCookie';
import {createTranslator} from 'next-intl';
import emailSubject from '@/emails/emailSubject';

const resend = new Resend(process.env.SMTP_PASSWORD);

export async function POST(request: Request) {
    // get phone number and email from form payload
    const data = await request.json();
    const {email} = data;
    const locale = (await getCookie('NEXT_LOCALE')) as string;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    // look up the user based on phone or email
    let user;
    if (email) {
        user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        // user = await findUserByEmail(email);
    } else {
        // neither an email nor phone number was submitted, re-direct and display error
        return NextResponse.json({
            error: t('SendToken.emailError'),
        });
    }

    if (user) {
        //const {user_id, preference} = user;
        // generate reset token
        const token = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0');
        const ex = 2 * 60; // expire this record in 2 minutes

        // send notification

        await setCookie('resetPasswordToken', token);
        await setCookie('resetPasswordEmail', email);

        const userName = user.name;
        const greeting = t('ResetPasswordTokenEmail.greeting');
        const heading = t('ResetPasswordTokenEmail.heading');

        await resend.emails.send({
            from: 'Promptopia <martinsantaclara@promptopia.com.ar>',
            to: email,
            subject: await emailSubject('ResetPasswordEmail'),
            react: ResetPasswordTokenEmail({
                userName,
                token,
                greeting,
                heading,
            }),
            text: 'Hello World',
        });
        return NextResponse.json({
            redirect: '/resetPassword/entertoken',
        });
    } else {
        // redirect and display error
        return NextResponse.json({
            error: t('SendToken.userError'),
        });
    }
}
