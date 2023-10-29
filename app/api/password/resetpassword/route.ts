import {NextResponse} from 'next/server';
import {updatePassword} from '@/lib/actions';
import {getCookie} from '@/utils/getCookie';
import {createTranslator} from 'next-intl';

export async function POST(request: Request) {
    // get passwords from payload
    const data = await request.json();
    const {newPassword, newPasswordConfirm} = data;
    const locale = (await getCookie('NEXT_LOCALE')) as string;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    // get user_id from session
    // update the user
    if (
        newPassword &&
        newPasswordConfirm &&
        newPassword === newPasswordConfirm
    ) {
        //const cookieStore = cookies();
        const email = await getCookie('resetPasswordEmail');
        await updatePassword(email as string, newPassword);
        return NextResponse.json({
            redirect: '/api/auth/signin',
            message: `${t('ResetPassword.success')} 👍`,
        });
    } else {
        // password don't match
        return NextResponse.json({
            error: t('ResetPassword.error'),
        });
    }
}
