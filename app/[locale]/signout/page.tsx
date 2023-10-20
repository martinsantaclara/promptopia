'use client';
import {signOut} from 'next-auth/react';
import {useLocale} from 'next-intl';

const baseUrl = process.env.BASE_URL;

export default function SignOutPage() {
    const locale = useLocale();
    const logout = async () => {
        const csrfToken = await fetch(`${baseUrl}/api/auth/csrf`).then((rs) =>
            rs.text()
        );

        const response = await fetch(`${baseUrl}/api/auth/signout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: csrfToken,
        });
        signOut({callbackUrl: `/${locale}`});
    };
    return (
        <div className="relative z-10 w-[90%] md:w-3/4 max-w-[600px]  h-[50vh] flex items-center">
            <div className="messageBox relative !py-10 w-[90%] !bg-transparent">
                <h1 className="head_text text-center !text-3xl sm:!text-4xl !font-bold !mt-0 dark:text-white">
                    Are you sure
                    <br />
                    <span className="orange_gradient text-center !text-3xl sm:!text-4xl !font-bold">
                        {' '}
                        you want to <span className="!text-4xl">sign out?</span>
                    </span>
                </h1>
                <button
                    type="button"
                    className="outline_btn !text-base mt-12 !px-6 !py-2 relative z-10 dark:bg-white dark:hover:bg-black"
                    onClick={() => logout()}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}
