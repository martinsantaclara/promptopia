import {useTranslations} from 'next-intl';
import React from 'react';

export default function HomeTitle() {
    const t = useTranslations('HomePage');
    return (
        <>
            <h1 className="head_text text-center dark:text-white">
                {t('title1')}
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">
                    {' '}
                    {t('title2')}
                </span>
            </h1>
            <p className="desc text-center dark:text-[#9eafc2]">
                {t('description')}
            </p>
        </>
    );
}
