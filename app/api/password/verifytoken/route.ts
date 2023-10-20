import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    // get phone number and email from form payload
    const data = await request.json();
    const {token} = data;

    const cookieStore = cookies();
    const storedToken = cookieStore.get('resetPasswordToken');

    // get user_id from session
    if (token && token === storedToken?.value) {
        // redirect to reset password page
        const response = NextResponse.json({
            redirect: '/resetPassword/newpassword',
        });
        return response;
    } else {
        // redirect and display error
        return NextResponse.json({
            error: 'Token did not match, please try again?',
        });
    }
}
