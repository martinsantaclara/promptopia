import {createTranslator} from 'next-intl';
import {ReactNode} from 'react';

type Props = {
    params: {locale: string};
    children: ReactNode;
};

export async function generateMetadata({params: {locale}}: Props) {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});

    return {
        title: t('Createpost.title'),
        description: t('Createpost.description'),
    };
}

export default async function CreatepostLayout({children}: Props) {
    return <>{children}</>;
}
