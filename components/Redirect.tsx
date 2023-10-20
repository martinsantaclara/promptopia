'use client';
import React, {useEffect, useTransition} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';

type Props = {
    message1: string;
    message2: string;
    redirectPath: string;
};

export default function Redirect({message1, message2, redirectPath}: Props) {
    const router = useRouter();
    const locale = useLocale();
    const notDefaultLocale = locale !== 'es';
    useEffect(() => {
        setTimeout(() => {
            router.push(
                `${notDefaultLocale ? '/' + locale : ''}${redirectPath}`
            );
        }, 3000);
    }, []);
    return (
        <div className="relative z-10 max-w-[600px] h-[50vh] flex items-center">
            <div className="messageBox relative !py-5 sm:!py-10 !px-12 sm:!px-24 !bg-transparent">
                <h1 className="head_text text-center !text-3xl sm:!text-4xl !font-bold !mt-0 dark:text-white">
                    {message1}
                    <br />
                    <span className="orange_gradient text-center !text-3xl sm:!text-4xl !font-bold">
                        {' '}
                        {message2}
                    </span>
                </h1>
                {/*  <button
                type="button"
                className="outline_btn !text-base mt-6 dark:bg-white dark:hover:bg-black"
                onClick={() => router.push(`/profile`)}
            >
                Go to Profile
            </button> */}
            </div>
        </div>
    );
}
