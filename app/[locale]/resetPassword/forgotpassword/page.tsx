'use client';
import {useRouter} from 'next/navigation';
import {FormEvent, useState} from 'react';

type Payload = {
    email: FormDataEntryValue | null;
};

async function sendToken(payload: Payload) {
    const res = await fetch('/api/password/sendtoken', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        console.log('Error sending token');
        return undefined;
    }
    return res.json();
}

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [error, setError] = useState();

    async function onForgotPassword(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const payload = {
            email: formData.get('email'),
        };

        const response = await sendToken(payload);
        if (response.error) {
            setError(response.error);
        } else if (response.redirect) {
            router.push(`${response.redirect}`);
        }
        return true;
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form
                method="post"
                onSubmit={onForgotPassword}
                className="bg-white !bg-opacity-20 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
            >
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}
                <div className="mb-4 text-black dark:text-white">
                    Please use the same email address that you used to create
                    your user
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white/70"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form_input dark:text-white/70"
                        onFocus={() => setError(undefined)}
                    ></input>
                </div>

                <input
                    type="submit"
                    value="Reset Password"
                    className="outline_btn !py-2 px-4 cursor-pointer rounded focus:outline-none focus:shadow-outline  dark:bg-white dark:hover:bg-black"
                ></input>
            </form>
        </main>
    );
}
