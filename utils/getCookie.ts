'use server';
import React from 'react';
import {cookies} from 'next/headers';

export async function getCookie(key: string) {
    const cookieStore = cookies();
    const cookieValue = cookieStore.get(key);

    return cookieValue?.value;
}
