import React, { useState } from 'react';

function SearchBar({ onSearch, disabled }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !disabled) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className={`flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500
          ${disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800'}
          text-gray-900 dark:text-gray-100 
          placeholder-gray-500 dark:placeholder-gray-400`}
        disabled={disabled}
      />
      <button
        type="submit"
        className={`px-4 py-2 bg-blue-600 text-white rounded-r-lg transition duration-200 
          ${disabled ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-500'}`}
        disabled={disabled}
      >
        {disabled ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;