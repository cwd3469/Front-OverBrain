const { fontSize } = require('./src/styles/fontSize');
const { colors } = require('./src/styles/colors');
const { screens } = require('./src/styles/screens');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: screens,
    extend: {
      fontSize: fontSize,
      colors: colors,
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
