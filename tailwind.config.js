/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',    // Target pages
    './components/**/*.{js,ts,jsx,tsx}', // Target components
    './app/**/*.{js,ts,jsx,tsx}',       // If you're using the app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
