import {getCookie} from '@/utils/getCookie';
import {createTranslator} from 'next-intl';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    // get phone number and email from form payload
    const data = await request.json();
    const {token} = data;
    const locale = (await getCookie('NEXT_LOCALE')) as string;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});

    //const cookieStore = cookies();
    const storedToken = await getCookie('resetPasswordToken');

    // get user_id from session
    if (token && token === storedToken) {
        // redirect to reset password page
        const response = NextResponse.json({
            redirect: '/resetPassword/newpassword',
        });
        return response;
    } else {
        // redirect and display error
        return NextResponse.json({
            error: t('VerifyToken.error'),
        });
    }
}
