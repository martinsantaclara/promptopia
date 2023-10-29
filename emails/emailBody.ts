import {getCookie} from '@/utils/getCookie';
import {createTranslator} from 'next-intl';

export default async function emailBody() {
    const locale = (await getCookie('NEXT_LOCALE')) as string;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    const greeting = t('ActivateAccountEmail.greeting');
    const heading = t('ActivateAccountEmail.heading');
    const activate = t('ActivateAccountEmail.activate');
    return {greeting, heading, activate};
}
