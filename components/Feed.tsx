'use client';

import {useState} from 'react';
import Search from './Search';
import Posts from './Posts';

const Feed = () => {
    const [searchText, setSearchText] = useState('');

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
