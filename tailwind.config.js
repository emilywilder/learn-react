/** @type {import('tailwindcss').Config} */

const { scopedPreflightStyles } = require('tailwindcss-scoped-preflight');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'tiffany-blue': 'rgb(10,186,181)'
      }  
    },
  },
  plugins: [
    require("daisyui"),
    scopedPreflightStyles({
      cssSelector: '.notailwind', // or .notailwind or even [data-tailwind=false] - any valid CSS selector of your choice
      mode: 'except matched',
  })
  ],
}