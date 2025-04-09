// src/components/GeolocationButton.jsx
import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

function GeolocationButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`p-2.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 
        dark:bg-blue-600 dark:hover:bg-blue-700 
        transition-all duration-200 relative group
        ${loading ? 'animate-pulse' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
      aria-label="Use current location"
      title="Use current location"
    >
      <MapPinIcon className={`h-6 w-6 ${loading ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`} />
      
      {/* Ripple effect for loading state */}
      {loading && (
        <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-75"></span>
      )}
      
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Use my location
      </span>
    </button>
  );
}

export default GeolocationButton;