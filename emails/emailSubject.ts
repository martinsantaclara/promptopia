import {getCookie} from '@/utils/getCookie';
import {createTranslator} from 'next-intl';

export default async function emailSubject(keyMessage: string) {
    const locale = (await getCookie('NEXT_LOCALE')) as string;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    return t(`${keyMessage}.subject`);
}
