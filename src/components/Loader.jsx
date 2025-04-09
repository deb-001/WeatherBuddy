// src/components/Loader.jsx
import React from 'react';

// Make sure 'export default' is here
export default function Loader() {
  return (
    <div className="flex justify-center items-center mt-8">
      {/* You can use a simple spinner or just text */}
      {/* Example spinner (requires CSS animation): */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      {/* Or just simple text: */}
      {/* <p className="text-white text-lg">Loading...</p> */}
    </div>
  );
}

// --- OR --- if you defined the function separately:

// function Loader() {
//   // ... component code ...
// }
// export default Loader; // Make sure this line exists at the end