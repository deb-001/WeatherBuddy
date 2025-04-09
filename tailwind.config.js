// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in the src directory and its subdirectories
  ],
  darkMode: 'class', // ADD THIS LINE for theme toggling
  theme: {
    extend: {},
  },
  plugins: [],
}