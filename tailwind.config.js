/** @type {import('tailwindcss').Config} */ 
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
 
  theme: {
    extend: {
      fontFamily: {
        'poppin': ['"Poppins"', 'sans-serif'],
      },
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}