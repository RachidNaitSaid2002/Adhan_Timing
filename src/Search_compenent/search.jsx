import './search.scss';
import React, { useState } from "react";

const Search = ({onSearch}) => {
    const [value, setValue] = useState('');

    const handleButtonClick = () => {
        onSearch(value);
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div className='nav_s card'>
                {/* <input
                    type="text"
                    placeholder='Enter Your City Here.....'
                    value={value}
                    onChange={handleInputChange}
                />
                <button onClick={handleButtonClick}>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                    Search
                </button> */}
            </div>
        </>
    );
};

export default Search;