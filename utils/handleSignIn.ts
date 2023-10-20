'use server';
import {signIn} from 'next-auth/react';

export default async function handleSignInForm(type: string) {
    return signIn(type);
}
