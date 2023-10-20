'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {toast} from 'sonner';

type Payload = {
    token: FormDataEntryValue | null;
};

async function verifyToken(payload: Payload) {
    const res = await fetch('/api/password/verifytoken', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (!res.ok) return undefined;
    return res.json();
}

export default function EnterTokenPage() {
    const router = useRouter();
    const [error, setError] = useState();

    async function onVerifyToken(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = {
            token: formData.get('token'),
        };
        const response = await verifyToken(payload);
        if (response.error) {
            setError(response.error);
        } else if (response.redirect) {
            toast.success('The password has been changed successfully!');
            router.push(response.redirect);
        }
        return true;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form
                method="post"
                onSubmit={onVerifyToken}
                className="bg-white bg-opacity-20 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
            >
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}
                <div className="mb-4 text-black dark:text-white">
                    Check your email and enter token that we have sent you
                    below.{' '}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="token"
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white/70"
                    >
                        Token
                    </label>
                    <input
                        type="token"
                        name="token"
                        id="token"
                        className="form_input dark:text-white/70"
                        onFocus={() => setError(undefined)}

                        // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></input>
                </div>
                <input
                    type="submit"
                    value="Validate Token"
                    className="outline_btn !py-2 px-4 cursor-pointer rounded focus:outline-none focus:shadow-outline dark:bg-white dark:hover:bg-black"
                ></input>
            </form>
        </main>
    );
}
