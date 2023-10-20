'use client';
import {signIn} from 'next-auth/react';
const baseUrl = process.env.BASE_URL;

export default async function SignIn() {
    console.log('baseUrl extra', baseUrl);

    const csrfToken = await fetch('http://localhost:3000/api/auth/csrf').then(
        (rs) => rs.text()
    );
    return (
        <div>
            <button
                type="button"
                onClick={() =>
                    signIn('email', {email: 'martinsantaclara@yahoo.com.ar'})
                }
            >
                Sign in with Email
            </button>
        </div>
    );
}
