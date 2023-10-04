/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', ...defaultTheme.fontFamily.sans],
        comfortaa: ['Comfortaa'],
      },
    },
  },
  plugins: [],
};
