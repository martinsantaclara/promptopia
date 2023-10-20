const str = '#B2 es el número de suite';
const sim = '#$1';
const publicPages = [
    '/',
    '/signin',
    '/error',
    '/signout',
    '/about',
    '/resetPassword/forgotpassword',
    '/resetPassword/entertoken',
    '/resetPassword/newpassword',
];
/* const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
); */
const locales = ['en', 'es'];
const publics = ['/signin', '/about', '/error', '/profile', '/es/profile'];

const path1 = '/';
const path2 = '/es';
const path3 = '/en';
const path4 = '/signin';
const path5 = '/en/signin';
const path6 = '/es/profile/gjhgjjjjjjjjj';
const path7 = '/createpost';

const testPublic = RegExp(`^(${publics.join('|')})/`, 'i');
const testLocale = RegExp(
    `^(/(${locales.join('|')}))?(${publics.join('|')})?/?$`,
    'i'
);

console.log('1', testPublic.test(path1));
console.log('1', testLocale.test(path1));
console.log('2', testPublic.test(path2));
console.log('2', testLocale.test(path2));
console.log('3', testPublic.test(path3));
console.log('3', testLocale.test(path3));
console.log('4', testPublic.test(path4));
console.log('4', testLocale.test(path4));
console.log('5', testPublic.test(path5));
console.log('5', testLocale.test(path5));
console.log('6', testPublic.test(path6));
console.log('6', testLocale.test(path6));
console.log('7', testPublic.test(path7));
console.log('7', testLocale.test(path7));

//console.log(testLocale.test(locale2));
/* console.log(testLocale.test(public1));
//console.log(testLocale.test(public2));
console.log(testLocale.test(public1));
console.log(testPublic.test(public2));
console.log(testPublic.test(public3));
console.log(testPublic.test(public4));
console.log(testLocale.test(public4));
 */
