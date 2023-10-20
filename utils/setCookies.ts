'use server';

import {cookies} from 'next/headers';

export async function setCookie(
    name: string,
    type: string,
    expire: string = 'none'
) {
    //cookies().set('name', 'lee');
    // or
    //cookies().set('name', 'lee', {secure: true});
    // or
    const hoy = new Date();
    let setArgument = {
        name: name,
        value: type,
    };
    let expires;
    if (expire !== 'none') {
        expires =
            expire === 'year'
                ? {expires: hoy.setFullYear(hoy.getFullYear() + 1)}
                : {expires: hoy.setDate(hoy.getDate() + 30)};
    }
    setArgument =
        expire === 'none' ? setArgument : {...setArgument, ...expires};

    cookies().set(setArgument);
}
