import {NextResponse, NextRequest} from 'next/server';
import {setCookie} from '@/utils/setCookies';
import prisma from '@/lib/prisma';
import {Resend} from 'resend';
import ResetPasswordTokenEmail from '@/emails/ResetPasswordTokenEmail';

const resend = new Resend(process.env.SMTP_PASSWORD);

export async function POST(request: Request) {
    // get phone number and email from form payload
    const data = await request.json();
    const {email} = data;
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
            error: 'You must provide an email',
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

        await resend.emails.send({
            from: 'Promptopia <martinsantaclara@promptopia.com.ar>',
            to: email,
            subject: 'Password Reset Token',
            react: ResetPasswordTokenEmail({userName, token}),
            text: 'Hello World',
        });
        return NextResponse.json({
            redirect: '/resetPassword/entertoken',
        });
    } else {
        // redirect and display error
        return NextResponse.json({
            error: 'We could not locate a user with that email address',
        });
    }
}
