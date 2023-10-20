import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';

const locales = ['en', 'es'];
const publicPages = [
    '/signin',
    '/error',
    '/signout',
    '/about',
    '/profile',
    '/es/profile',
    '/en/profile',
    '/resetPassword',
    '/es/resetPassword',
    '/en/resetPassword',
];
const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'es',
});
const authMiddleware = withAuth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.

    function onSuccess(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({token}) => token != null,
        },
        pages: {
            signIn: '/signin',
            signOut: '/signout',
            error: '/error', // Error code passed in query string as ?error=
        },
    }
);
let locale = '';
export default function middleware(req: NextRequest) {
    /* const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    );
 */
    const testPublic = RegExp(`^(${publicPages.join('|')})/`, 'i');
    const testLocale = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    );
    const isPublicPage =
        testLocale.test(req.nextUrl.pathname) ||
        testPublic.test(req.nextUrl.pathname);
    let {pathname} = req.nextUrl;
    if (pathname.length === 3) locale = pathname;
    if (isPublicPage) {
        //let {pathname} = req.nextUrl;
        const isError = pathname.includes('error');
        if (pathname.slice(4, 10) === 'signin') {
            locale = pathname.slice(0, 3);
        }
        if (isError && pathname.slice(0, 6) === '/error')
            req.nextUrl.pathname = `${
                locale === '/es' ? '' : locale
            }${pathname}`;
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
