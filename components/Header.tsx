'use client';
import React, {useEffect, useRef, useState} from 'react';
import Navbar from './Navbar';

export default function Header() {
    const cardRef = useRef(null);
    const [navScrolled, setNavScrolled] = useState(false);

    useEffect(() => {
        if (!cardRef?.current) return;

        const sectionOneOptions = {
            rootMargin: '-55px 0px 0px 0px',
        };

        /* const sectionOneObserver = new IntersectionObserver(function (
            entries,
            sectionOneObserver
        ) {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    setNavScrolled(true);
                } else {
                    setNavScrolled(false);
                }
            });
        },
        sectionOneOptions); */

        const sectionOneObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setNavScrolled(false);
            } else {
                setNavScrolled(true);
            }
        }, sectionOneOptions);
        sectionOneObserver.observe(cardRef.current!);
    }, []);
    return (
        <>
            <Navbar navScrolled={navScrolled} />
            <div className="bg-transparent h-1 mt-5" ref={cardRef}></div>
        </>
    );
}
