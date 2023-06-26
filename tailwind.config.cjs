const tailwindcss = require('tailwindcss');
const defaultTheme = require('tailwindcss/defaultTheme');
const defaultColor = require('tailwindcss/colors');


const tailwindSafelist = [
  'dashie-red', 'dashie-amber', 'dashie-orange'
];

/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: 'jit',
    content: [
      './index.html',
      './src/**/*.{ts,tsx}',
    ],
    options: {
      safelist: tailwindSafelist,
    },
        
    darkMode: 'class',
    theme: {
      container: {
        center: true,
        padding: '2rem',
      },
      extend: { 
        colors: {
          ...defaultColor,
        },
        fontFamily: {
        sans: ['Inter', 'Sarabun', ...defaultTheme.fontFamily.sans],
      },
    },
    plugins: [
      tailwindcss,
    ],
  }
}
