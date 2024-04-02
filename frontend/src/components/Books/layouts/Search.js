// Ashish Nagpal
import React, { useState, useRef } from 'react';

const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  let typingTimer;

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      onSearchChange(newSearchTerm);
    }, 1000);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`search-box ${isFocused ? 'focused' : ''}`}>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=''
      />
      <label>Search</label>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><g data-name="Layer 2"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search"></path></g></svg>
      <span id='remove-search' onClick={() => {
        setSearchTerm("")
        onSearchChange("");
      }}>&#x2715;</span>
    </div>
  );
};

export default Search;

