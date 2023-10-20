import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {updatePassword} from '@/lib/actions';

export async function POST(request: Request) {
    // get passwords from payload
    const data = await request.json();
    const {newPassword, newPasswordConfirm} = data;
    // get user_id from session
    // update the user
    if (
        newPassword &&
        newPasswordConfirm &&
        newPassword === newPasswordConfirm
    ) {
        const cookieStore = cookies();
        const email = cookieStore.get('resetPasswordEmail');
        await updatePassword(email?.value as string, newPassword);
        return NextResponse.json({
            redirect: '/api/auth/signin',
            message: 'Your password has been reset 👍',
        });
    } else {
        // password don't match
        return NextResponse.json({
            error: 'Your passwords must match',
        });
    }
}
