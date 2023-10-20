/** @type {import('tailwindcss').Config} */
import {withUt} from 'uploadthing/tw';
export default withUt({
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                satoshi: ['Satoshi', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                'primary-orange': '#FF5722',
                'dark-subtitle': '#9eafc2',
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                col2: 'repeat(2, 1fr)',

                col3: 'repeat(3, 1fr)',
            },
            backgroundColor: {
                'grid-color': '#FF5722',
            },
            backgroundImage: {
                'radial-gradient':
                    'radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%)',
                'grid-image': "url('/assets/images/grid.svg')",
            },
        },
    },
    plugins: [],
    darkMode: 'class',
});

//module.exports = {

//};
