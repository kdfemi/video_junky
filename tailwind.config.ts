import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        'junky-yellow': '#a8eb12',
        'junky-green': '#00bf72',
        'junky-blue': '#004d7a',
        'junky-purple': '#051937',
        'junky-teal': '#008793'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'ui-monospace'],
      }, 
      backgroundImage: ({theme}) => ({
        "logo-gradient": `linear-gradient(to right top, ${theme('colors.junky-purple')}, ${theme('colors.junky-blue')}, ${theme('colors.junky-teal')}, ${theme('colors.junky-green')}, ${theme('colors.junky-yellow')})`,
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }),
    },
  },
  plugins: [
    plugin(function({matchVariant, addUtilities}) {
    //  addUtilities({
    //   // 'truncate'
    //  })
    })
  ],
};
export default config;
