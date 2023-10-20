'use client';

import {useState} from 'react';

import {useTranslations} from 'next-intl';
import Search from './Search';
import React from 'react';
import Posts from './Posts';

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
    const t = useTranslations('FormFeed');

    // Search states

    const handleTagClick = (tagName: string) => {
        setSearchText(tagName);
    };

    return (
        <section className="feed">
            <Search searchText={searchText} setSearchText={setSearchText} />
            {/* All Prompts */}
            <Posts searchText={searchText} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
