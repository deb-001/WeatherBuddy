import React from 'react';
function SearchHistory({ history, onSearch }) {
  if (!history || history.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
        No recent searches
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((city, index) => (
        <button
          key={index}
          onClick={() => onSearch(city)}
          className="w-full text-left px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-700/80 shadow-sm border border-blue-100 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {city}
        </button>
      ))}
    </div>
  );
}

export default SearchHistory;