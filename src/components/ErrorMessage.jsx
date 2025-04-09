// src/components/ErrorMessage.jsx
import React from 'react';

// Make sure 'export default' is here
export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg shadow-sm max-w-md w-full animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {/* Alert Icon */}
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- OR --- if you defined the function separately:

// function ErrorMessage({ message }) {
//   // ... component code ...
// }
// export default ErrorMessage; // Make sure this line exists at the end