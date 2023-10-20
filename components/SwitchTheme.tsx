import React from 'react';
import Image from 'next/image';
import {FaMoon} from 'react-icons/fa6';
import {setCookie} from '@/utils/setCookies';
type Props = {
    theme: string | undefined;
    setTheme: (theme: string) => void;
};

export default function SwitchTheme({theme, setTheme}: Props) {
    const handleClick = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        setCookie('theme', newTheme, 'year');
    };
    return (
        <button
            onClick={handleClick}
            className="flex justify-center items-center h-[32px]"
        >
            {theme === 'dark' ? (
                <FaMoon
                    style={{
                        width: '32px',
                        height: '32px',
                        color: '#fff',
                        rotate: '220deg',
                        position: 'relative',
                        top: '2px',
                    }}
                />
            ) : (
                <Image
                    src="/assets/images/icon-sun.svg"
                    alt="light mode"
                    width={38}
                    height={38}
                />
            )}
        </button>
    );
}
