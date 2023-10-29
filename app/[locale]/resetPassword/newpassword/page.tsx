'use client';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {toast} from 'sonner';

type Payload = {
    newPassword: FormDataEntryValue | null;
    newPasswordConfirm: FormDataEntryValue | null;
};

async function resetPassword(payload: Payload) {
    const res = await fetch('/api/password/resetpassword', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (!res.ok) return undefined;
    return res.json();
}

export default function NewPasswordPage() {
    const router = useRouter();
    const [error, setError] = useState();
    const t = useTranslations('NewPassword');

    async function onResetPassword(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = {
            newPassword: formData.get('new_password'),
            newPasswordConfirm: formData.get('new_password_confirm'),
        };
        const response = await resetPassword(payload);
        if (response.error) {
            setError(response.error);
        } else if (response.redirect) {
            toast.success(t('success'));
            router.push('/api/auth/signin');
        }
        return true;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form
                method="post"
                onSubmit={onResetPassword}
                className="bg-white bg-opacity-20 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
            >
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}
                <div className="mb-4 text-black dark:text-white">
                    {t('text')}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="new_password"
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white/70"
                    >
                        {t('password')}
                    </label>
                    <input
                        type="password"
                        name="new_password"
                        id="new_password"
                        className="form_input dark:text-white/70"
                        onFocus={() => setError(undefined)}
                        // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></input>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="new_password_confirm"
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white/70"
                    >
                        {t('confirmPassword')}
                    </label>
                    <input
                        type="password"
                        name="new_password_confirm"
                        id="new_password_confirm"
                        className="form_input dark:text-white/70"
                        onFocus={() => setError(undefined)}
                        // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></input>
                </div>
                <input
                    type="submit"
                    value={t('action')}
                    className="outline_btn !py-2 px-4 cursor-pointer rounded focus:outline-none focus:shadow-outline dark:bg-white dark:hover:bg-black"
                ></input>
            </form>
        </main>
    );
}
