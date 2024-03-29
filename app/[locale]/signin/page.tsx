'use client';
import {setCookie} from '@/utils/setCookies';
import {signIn} from 'next-auth/react';
import {useLocale, useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import React, {FormEvent, useState, useTransition} from 'react';

import {FaGithub, FaGoogle, FaLinkedin, FaLinkedinIn} from 'react-icons/fa6';
import {Tooltip} from 'react-tooltip';

export default function SignInPage() {
    const [rightPanel, setRightPanel] = useState(false);
    let [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const [signInActive, setSignInActive] = useState(true);
    const router = useRouter();
    const t = useTranslations('Signin');
    const handleSign = () => {
        setSignInActive((prev) => !prev);
    };
    const clickSignIn = () => {
        setRightPanel(false);
    };
    const clickSignUp = () => {
        setRightPanel(true);
    };

    const handleSignIn = async (formData: FormData) => {
        await setCookie('access', 'signIn');
        const email = formData.get('email');
        const password = formData.get('password');
        signIn('credentials', {
            email,
            password,
            callbackUrl: `/${locale}`,
        });
    };
    const handleSignUp = async (formData: FormData) => {
        await setCookie('access', 'signUp');
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        // signIn('credentials', {
        //     name,
        //     email,
        //     password,
        //     callbackUrl: '/',
        // });
        const response = await signIn('credentials', {
            name,
            email,
            password,
            redirect: false,
        });
        if (!response?.error) {
            await setCookie('userName', name as string, 'month');
            signIn('email', {email, callbackUrl: `/${locale}`});
        } else {
            router.push('/error?error=existing-credentials-signin');
        }
    };
    return (
        <>
            <div className="max-sm:flex flex-col justify-center items-center my-0 mx-auto w-10/12 min-w-[250px] max-w-[350px] h-[575px] relative overflow-hidden shadow rounded-3xl sm:hidden">
                <div
                    className={`w-full h-[70%] absolute top-0 !bg-transparent ${
                        signInActive ? 'opacity-100' : 'opacity-0'
                    } transition ease-in-out delay-100 duration-1000`}
                >
                    <div className="absolute w-full h-full top-0 bg-white/5" />
                    <form
                        className={`form !px-3 relative z-10`}
                        action={(formData) => handleSignIn(formData)}
                        //action={handleSignIn}
                    >
                        <h1 className="h1">{t('signin')}</h1>
                        <div className="socialContainer !my-[10px]">
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signIn');
                                        signIn('github', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signinSocial', {
                                    social: 'Github',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGithub size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signIn');
                                        signIn('google', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signinSocial', {
                                    social: 'Google',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGoogle size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signIn');
                                        signIn('linkedin', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signinSocial', {
                                    social: 'Linkedin',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaLinkedinIn size={24} />
                            </button>
                        </div>
                        <span className="span mt-0">{t('emailSignin')}</span>
                        <div className="glassmorphism mt-2.5 w-[95%] !p-4">
                            <input
                                className="form_input !mt-0 dark:text-white"
                                type="email"
                                placeholder="Email"
                                id="inputEmail"
                                name="email"
                                required
                            />
                            <input
                                type="password"
                                placeholder={t('passwordPlaceholder')}
                                id="inputPassword"
                                className="form_input dark:text-white"
                                name="password"
                                required
                            />
                        </div>
                        <a
                            className="a m-[10px] dark:text-white/70 hover:text-blue-300 dark:hover:text-blue-300"
                            href="/resetPassword/forgotpassword"
                        >
                            {t('forgotPassword')}
                        </a>
                        <button
                            type="submit"
                            className="button mt-[10px] hover:bg-primary-orange/80"
                        >
                            {t('signinSubmit')}
                        </button>
                    </form>
                </div>
                <div
                    className={`w-full h-[70%] absolute top-0 ${
                        !signInActive ? 'opacity-100' : 'opacity-0'
                    } ${
                        !signInActive ? 'translate-y-0' : '-translate-y-full'
                    } transition ease-in-out delay-100 duration-1000`}
                >
                    <div className="absolute w-full h-full top-0 bg-white/5" />

                    <form
                        className={`form !px-3 relative z-10`}
                        action={(formData) => handleSignUp(formData)}
                        //action={handleSignUp}
                    >
                        <h1 className="h1">{t('create')}</h1>
                        <div className="socialContainer !my-0[10px]">
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signUp');
                                        signIn('github', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signupSocial', {
                                    social: 'Github',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGithub size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signUp');
                                        signIn('google', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signupSocial', {
                                    social: 'Google',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGoogle size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signUp');
                                        signIn('linkedin', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signupSocial', {
                                    social: 'Linkedin',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaLinkedinIn size={24} />
                            </button>
                        </div>
                        <span className="span mt-0">{t('emailSignup')}</span>

                        <div className="glassmorphism mt-2.5 w-[95%] !p-4">
                            <input
                                className="form_input !mt-0 dark:text-white"
                                type="text"
                                placeholder={t('namePlaceholder')}
                                name="name"
                            />

                            <input
                                className="form_input dark:text-white"
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            <input
                                className="form_input dark:text-white"
                                type="password"
                                placeholder={t('passwordPlaceholder')}
                                name="password"
                                required
                            />
                        </div>
                        <button
                            className="button mt-[10px] hover:bg-primary-orange/80"
                            type="submit"
                        >
                            {t('signup')}
                        </button>
                    </form>
                </div>
                <div className="overlay_gradient !top-1/2 !left-0 !w-full !h-[60%]">
                    <div
                        className={`w-full h-1/2 absolute z-20 top-1/2 ${
                            !signInActive ? 'opacity-100' : 'opacity-0'
                        } ${
                            !signInActive
                                ? '-translate-y-full'
                                : 'translate-y-full'
                        } transition ease-in-out delay-100 duration-1000 py-4 px-8 flex flex-col justify-between items-center`}
                    >
                        <h1 className="h1">{t('signinWelcome')}</h1>
                        <p className="p !m-0 text-center">
                            {t('signinMessage')}
                        </p>
                        <button
                            className="button ghost hover:bg-primary-orange/80"
                            id="signIn"
                            onClick={handleSign}
                        >
                            {t('signinSubmit')}
                        </button>
                    </div>
                    <div
                        className={`w-full h-1/2  absolute -z-20 top-0 ${
                            signInActive ? 'opacity-100' : 'opacity-0'
                        } transition ease-in-out delay-100 duration-1000 py-4 px-8 flex flex-col justify-between items-center`}
                    >
                        <h1 className="h1">{t('signupWelcome')}</h1>
                        <p className="p !m-0 text-center">
                            {t('signupMessage')}
                        </p>
                        <button
                            className="button ghost hover:bg-primary-orange/80"
                            id="signUp"
                            onClick={handleSign}
                        >
                            {t('signup')}
                        </button>
                    </div>{' '}
                </div>
            </div>
            <div
                className={`max-sm:hidden sm:block containerSignin ${
                    rightPanel ? 'rightPanelActive' : ''
                }`}
                id="container"
            >
                {/* <div className="mainG" /> */}

                <div className="formContainer signInContainer">
                    <div className="absolute w-full h-full top-0 bg-white/5" />
                    {/* <!-- Sign In form code goes here --> */}
                    <form
                        className={`form ${
                            rightPanel ? 'opacity-0' : 'opacity-100'
                        } relative z-10`}
                        action={(formData) => handleSignIn(formData)}
                        //action={handleSignIn}
                    >
                        <h1 className="h1">{t('signin')}</h1>
                        <div className="socialContainer">
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signIn');
                                        signIn('github', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signinSocial', {
                                    social: 'Github',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGithub size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signIn');
                                        signIn('google', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signinSocial', {
                                    social: 'Google',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGoogle size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signIn');
                                        signIn('linkedin', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signinSocial', {
                                    social: 'Linkedin',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaLinkedinIn size={24} />
                            </button>
                        </div>
                        <span className="span mt-4">{t('emailSignin')}</span>
                        <div className="glassmorphism mt-2.5 w-[125%]">
                            <input
                                className="form_input !mt-0 dark:text-white"
                                type="email"
                                placeholder="Email"
                                id="inputEmail"
                                name="email"
                                required
                            />
                            <input
                                type="password"
                                placeholder={t('passwordPlaceholder')}
                                id="inputPassword"
                                className="form_input dark:text-white"
                                name="password"
                                required
                            />
                        </div>
                        <a
                            className="a hover:text-blue-300 dark:text-white/70 dark:hover:text-blue-300"
                            href="/resetPassword/forgotpassword"
                        >
                            {t('forgotPassword')}
                        </a>
                        <button
                            type="submit"
                            className="button mt-[22px] hover:bg-primary-orange/80"
                        >
                            {t('signinSubmit')}
                        </button>
                    </form>
                </div>
                <div className="formContainer signUpContainer">
                    <div className="absolute w-full h-full top-0 bg-white/5" />

                    {/* <!-- Sign Up form code goes here --> */}
                    <form
                        className={`form ${
                            rightPanel ? 'opacity-100' : 'opacity-0'
                        } relative z-10`}
                        action={(formData) => handleSignUp(formData)}
                        //action={handleSignUp}
                    >
                        <h1 className="h1">{t('create')}</h1>
                        <div className="socialContainer">
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signUp');
                                        signIn('github', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signupSocial', {
                                    social: 'Github',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGithub size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signUp');
                                        signIn('google', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signupSocial', {
                                    social: 'Google',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaGoogle size={24} />
                            </button>
                            <button
                                className="a social dark:text-white"
                                onClick={(e) => {
                                    startTransition(async () => {
                                        e.preventDefault();
                                        await setCookie('access', 'signUp');
                                        signIn('linkedin', {
                                            callbackUrl: `/${locale}`,
                                        });
                                        //router.back();
                                    });
                                }}
                                name="socialIcons"
                                data-tooltip-content={t('signupSocial', {
                                    social: 'Linkedin',
                                })}
                                data-tooltip-variant="info"
                            >
                                <FaLinkedinIn size={24} />
                            </button>
                        </div>
                        <span className="span mt-4">{t('emailSignup')}</span>

                        <div className="glassmorphism mt-2.5 mb-5 w-[125%]">
                            <input
                                className="form_input !mt-0 dark:text-white"
                                type="text"
                                placeholder={t('namePlaceholder')}
                                name="name"
                            />

                            <input
                                className="form_input dark:text-white"
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            <input
                                className="form_input dark:text-white"
                                type="password"
                                placeholder={t('passwordPlaceholder')}
                                name="password"
                                required
                            />
                        </div>

                        <button
                            className="button hover:bg-primary-orange/80"
                            type="submit"
                        >
                            {t('signup')}
                        </button>
                    </form>
                </div>
                <div className="overlayContainer">
                    {/* <!-- The overlay code goes here --> */}
                    <div className="overlay_gradient">
                        <div className="overlayPanel !px-12 overlayLeft">
                            <h1 className="h1">{t('signinWelcome')}</h1>
                            <p className="p">{t('signinMessage')}</p>
                            <button
                                className="button ghost hover:bg-primary-orange/80"
                                id="signIn"
                                onClick={() => clickSignIn()}
                            >
                                {t('signinSubmit')}
                            </button>
                        </div>
                        <div className="overlayPanel !px-12 overlayRight">
                            <h1 className="h1">{t('signupWelcome')}</h1>
                            <p className="p">{t('signupMessage')}</p>
                            <button
                                className="button ghost hover:bg-primary-orange/80"
                                id="signUp"
                                onClick={() => clickSignUp()}
                            >
                                {t('signup')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Tooltip
                place="top"
                anchorSelect="[name^='socialIcons']"
                style={{zIndex: 99, borderRadius: '15px'}}
                opacity={0.95}
            />
        </>
    );
}
