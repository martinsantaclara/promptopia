import React, {ChangeEvent, useState} from 'react';

type Props = {
    searchText: string;
    setSearchText: (value: string) => void;
};

export default function Search({searchText, setSearchText}: Props) {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        // debounce method
    };
    return (
        <form className="relative w-full flex-center">
            <input
                type="text"
                value={searchText}
                onChange={(e) => handleSearchChange(e)}
                required
                className="search_input peer !text-black/70"
            />
        </form>
    );
}
