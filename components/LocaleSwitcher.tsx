'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next-intl/client';
import {ChangeEvent, useTransition} from 'react';
import Image from 'next/image';
import {Tooltip} from 'react-tooltip';

export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleSwitcher = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es';
        startTransition(() => {
            router.replace('/', {locale: nextLocale});
        });
    };
    return (
        <>
            <button
                onClick={handleSwitcher}
                className="relative w-8 h-8 bg-transparent"
                data-tooltip-id="tooltip-switcher"
                data-tooltip-content={
                    locale === 'es' ? 'Cambiar a Inglés' : 'Change to Spanish'
                }
                data-tooltip-variant="info"
            >
                {/* <div className="bg-white absolute w-8 h-8 rounded-full top-[4.5px] left-[4.2px]"></div> */}
                <Image
                    src={`/assets/images/${locale}.png`}
                    width={32}
                    height={32}
                    alt="switcher"
                    className="absolute top-0 left-0 rounded-full"
                ></Image>
            </button>
            <Tooltip
                id="tooltip-switcher"
                place="bottom"
                style={{
                    zIndex: 99,
                    borderRadius: '15px',
                }}
                opacity={0.95}
            />
        </>
    );
}
