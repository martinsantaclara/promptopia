'use client';
import {useEffect, useState} from 'react';
import {redirect, useRouter, useSearchParams} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {signIn} from 'next-auth/react';

const initial = (error: string, locale: string) => {
    let errorMessage1 = '';
    let errorMessage2 = '';
    switch (error) {
        case 'incorrect-credentials':
            errorMessage1 =
                locale === 'es' ? 'El email o la contraseña' : 'Incorrect';
            errorMessage2 =
                locale === 'es' ? 'son Incorrectos' : 'email or password';
            break;
        case 'existing-credentials':
            errorMessage1 =
                locale === 'es'
                    ? 'Ya existe un usuario'
                    : 'Already exist a user';
            errorMessage2 =
                locale === 'es' ? 'con el mismo email' : 'with the same email';
            break;
        case 'existing-credentials-signin':
            errorMessage1 =
                locale === 'es'
                    ? 'Ya existe una cuenta'
                    : 'Already exist a account';
            errorMessage2 =
                locale === 'es' ? 'con el mismo email' : 'with the same email';
            break;
        case 'nonexistent-account':
            errorMessage1 = locale === 'es' ? 'La cuenta' : 'Account';
            errorMessage2 = locale === 'es' ? 'no existe' : "don't exist";
            break;
        case 'existing-account':
            errorMessage1 = locale === 'es' ? 'La cuenta' : 'Account';
            errorMessage2 = locale === 'es' ? 'ya existe' : 'already exist';
            break;
        case 'OAuthAccountNotLinked':
            errorMessage1 =
                locale === 'es'
                    ? 'Inicie con la misma cuenta'
                    : 'Sign in with the same account';
            errorMessage2 =
                locale === 'es'
                    ? 'que usó originalmente'
                    : 'you used originally';
            break;
        case 'existing-account-other-provider':
            errorMessage1 =
                locale === 'es'
                    ? 'Inicie con la misma cuenta'
                    : 'Sign in with the same account';
            errorMessage2 =
                locale === 'es'
                    ? 'que usó originalmente'
                    : 'you used originally';
            break;
        default:
            break;
    }
    return {errorMessage1, errorMessage2};
};

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const router = useRouter();
    const t = useTranslations('Error');
    const locale = useLocale();
    const [message, setMessage] = useState(initial(error as string, locale));

    useEffect(() => {
        setTimeout(() => {
            signIn();
        }, 3000);
    }, []);

    return (
        <div className="relative z-10 max-w-[600px] h-[50vh] flex items-center">
            <div className="messageBox relative !py-5 sm:!py-10 !px-12 sm:!px-24 !bg-transparent">
                <h1 className="head_text text-center !text-3xl sm:!text-4xl !font-bold !mt-0 dark:text-white">
                    {message.errorMessage1}
                    <br />
                    <span className="orange_gradient text-center !text-3xl sm:!text-4xl !font-bold">
                        {' '}
                        {message.errorMessage2}
                    </span>
                </h1>
            </div>
        </div>
    );
}
