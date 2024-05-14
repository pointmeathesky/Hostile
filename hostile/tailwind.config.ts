import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bargray: '#808080',
        invbar:  '#7f7f7f',
        panelgray: '#c0c0c0',
        invpan: '#3f3f3f',
        backblue: '#008080',
        invert: '#ff7f7f',
        winyel: '#ffcc00',
        winblue: '#394dcd'
      },

    },
  },
  plugins: [],
};
export default config;
