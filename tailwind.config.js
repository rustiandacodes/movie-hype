/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1380px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1736px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'dark-bg': '#0D0F11',
        'dark-unit': '#262C36',
        'dark-unit2': '#262C36',
        'dark-primary': '#A02334',
        'dark-typo': '#E3E3E3',
        'dark-typo2': '#576776',
      },
    },
  },
  plugins: [],
};
