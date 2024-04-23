/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
      colors: {
        bargray: '#808080',
        invbar:  '#7f7f7f',
        panelgray: '#c0c0c0',
        invpan: '#3f3f3f',
        backblue: '#008080',
        invert: '#ff7f7f',
        winyel: '#ffcc00'
      },

      // keyframes:{
      //   thru: {
      //     '0%, 100%': { transform: 'rotate(-3deg)' },
      //     '50%': { transform: 'rotate(3deg)' },
      //   },
      // },
      // animation: {
      //   thru: 'thru 1s ease-in-out infinite',
      // },
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
