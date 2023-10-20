import Redirect from '@/components/Redirect';
import {useTranslations} from 'next-intl';

export default function NotSessionProfile() {
    const t = useTranslations('Profile');
    return (
        <Redirect
            message1={t('message1')}
            message2={t('message2')}
            redirectPath="/signin"
        />
    );
}
