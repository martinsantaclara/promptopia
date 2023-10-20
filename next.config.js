/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.ts'
);
/* const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'uploadthing.com',
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
 */
module.exports = withNextIntl({
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'uploadthing.com',
        ],
    },
    experimental: {
        serverActions: true,
    },
});
