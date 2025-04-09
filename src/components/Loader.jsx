// src/components/Loader.jsx
import React from 'react';

// Make sure 'export default' is here
export default function Loader() {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}