import Redirect from '@/components/Redirect';
import {useTranslations} from 'next-intl';

type Props = {
    userId: string;
    creator: string | undefined;
};

export default function NotSessionUpdate({userId, creator}: Props) {
    const t = useTranslations('Updatepost');
    const path = `/profile/${userId}?authorized=true`;
    const message =
        creator !== undefined
            ? {
                  message1: t('mess1NotCreator'),
                  message2: t('mess2NotCreator'),
              }
            : {
                  message1: t('mess1NotExist'),
                  message2: t('mess2NotExist'),
              };

    return (
        <Redirect
            message1={message.message1}
            message2={message.message2}
            redirectPath={path}
        />
    );
}
