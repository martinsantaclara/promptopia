'use client';
import {useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {signIn, useSession} from 'next-auth/react';
import {Tooltip} from 'react-tooltip';
import LocaleSwitcher from './LocaleSwitcher';
import {useTheme} from 'next-themes';
import {getCookie} from '@/utils/getCookie';
import {setCookie} from '@/utils/setCookies';
import SwitchTheme from './SwitchTheme';
import {useLocale, useTranslations} from 'next-intl';

const Navbar = ({navScrolled}: {navScrolled: boolean}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const {theme, setTheme} = useTheme();
    const locale = useLocale();
    const t = useTranslations('Navbar');

    useEffect(() => {
        const getCookieFs = async () => {
            const theme = await getCookie('theme');
            if (theme !== undefined) {
                setTheme(theme);
            } else {
                const dark = window.matchMedia(
                    '(prefers-color-scheme: dark)'
                ).matches;
                setTheme(dark ? 'dark' : 'light');
                setCookie('theme', dark ? 'dark' : 'light', 'year');
            }
        };
        getCookieFs();
    }, [theme]);

    if (session === undefined) {
        return (
            <div className="flex justify-center">
                <div
                    className="inline-block h-8 w-8 mt-5 mb-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-orange-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                ></div>
            </div>
        );
    }

    return (
        <>
            {session !== undefined && (
                <header
                    className={`sticky top-0 w-full max-sm:px-6 sm:px-16 py-4 mb-10 ${
                        navScrolled ? 'bg-white dark:bg-slate-800' : ''
                    }   z-50`}
                >
                    <nav className="flex-between w-full max-w-6xl mx-auto">
                        <Link
                            href={`/${locale}`}
                            className="flex gap-4 flex-center"
                        >
                            <Image
                                src="/assets/images/logo.svg"
                                alt="Promptopia logo"
                                width={30}
                                height={30}
                                // className="object-contain"
                            ></Image>
                            <p className="logo_text dark:text-white">
                                Promptopia
                            </p>
                            {/* <button onClick={getUser}>User</button> */}
                        </Link>

                        <div className="flex items-center gap-4">
                            <SwitchTheme theme={theme} setTheme={setTheme} />
                            <LocaleSwitcher />
                            {/* Desktop Navigation */}
                            <div className="max-sm:hidden sm:flex">
                                {session?.user ? (
                                    <div className="flex gap-3 md:gap-5">
                                        <Link
                                            href={`/${locale}/createpost`}
                                            className="black_btn"
                                        >
                                            {t('action')}
                                        </Link>
                                        <button
                                            type="button"
                                            className="outline_btn dark:bg-white dark:hover:bg-black"
                                            onClick={() =>
                                                router.push(
                                                    `/${locale}/signout?callbackUrl=/${locale}`
                                                )
                                            }
                                        >
                                            {t('signout')}
                                        </button>
                                        <Link href={`/${locale}/profile`}>
                                            <Image
                                                src={
                                                    session.user.image as string
                                                }
                                                width={37}
                                                height={37}
                                                className="rounded-full hover:cursor-pointer"
                                                alt="profile"
                                                data-tooltip-id="tooltip-profile"
                                                data-tooltip-html={`<p class='text-center'>${session.user.name}</p><p className='my-0'>${session.user.email}</p>`}
                                                data-tooltip-variant="info"
                                            ></Image>
                                        </Link>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            signIn();
                                        }}
                                        className="black_btn"
                                    >
                                        {t('signin')}
                                    </button>
                                )}
                            </div>

                            {/* Mobile Navigation */}
                            <div className="max-sm:flex sm:hidden relative">
                                {session?.user ? (
                                    <div className="flex">
                                        <Image
                                            src={session.user.image as string}
                                            width={37}
                                            height={37}
                                            className="rounded-full hover:cursor-pointer"
                                            alt="profile"
                                            onClick={() =>
                                                setToggleDropdown(
                                                    (prev) => !prev
                                                )
                                            }
                                            data-tooltip-id="tooltip-profile"
                                            data-tooltip-html={`<p class='text-center'>${session.user.name}</p><p className='my-0'>${session.user.email}</p>`}
                                            data-tooltip-variant="info"
                                        ></Image>
                                        {toggleDropdown && (
                                            <div className="dropdown dark:bg-slate-500">
                                                <div className="dropdown-arrow dark:bg-slate-500"></div>
                                                <Link
                                                    href={`/${locale}/profile`}
                                                    className="dropdown_link dark:text-white/80 dark:hover:text-white"
                                                    onClick={() =>
                                                        setToggleDropdown(false)
                                                    }
                                                >
                                                    {t('profile')}
                                                </Link>
                                                <Link
                                                    href={`/${locale}/createpost`}
                                                    className="dropdown_link dark:text-white/80 dark:hover:text-white"
                                                    onClick={() =>
                                                        setToggleDropdown(false)
                                                    }
                                                >
                                                    {t('action')}
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setToggleDropdown(
                                                            false
                                                        );
                                                        router.push(
                                                            `/${locale}/signout?callbackUrl=/${locale}`
                                                        );
                                                    }}
                                                    className="mt-5 outline_btn w-full dark:bg-white dark:hover:bg-black"
                                                >
                                                    {t('signout')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            signIn();
                                        }}
                                        className="black_btn"
                                    >
                                        {t('signin')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>
            )}
            <Tooltip
                id="tooltip-profile"
                place="bottom"
                style={{
                    zIndex: 99,
                    borderRadius: '15px',
                }}
                opacity={0.95}
            />
        </>
    );
};

export default Navbar;
