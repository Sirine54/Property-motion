const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'lg-max': { max: '1450px' },
      },

      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
        // lexend: ['Lexend', 'sans-serif'],
        // roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        custom: '-2px 0px 5px 0px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        1.5: '1.5px',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(113, 57, 234, 1) 0%, #F8F8F8 100%)',
      },
      opacity: {
        50: '0.5',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        },
        spinFade: {
          '0%': { opacity: '0', transform: 'rotate(0deg)' },
          '100%': { opacity: '0.5', transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        spinFade: 'spinFade 1s linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-icon-input': {
          '&::-webkit-calendar-picker-indicator': {
            display: 'none',
          },
        },
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#99CAFF',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-button': {
            display: 'none',
          },
          // "scrollbar-color": "#3369FF transparent",
        },
        '.custom-scrollbar1': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '3px',
            // height: '144px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3369FF',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-button': {
            display: 'none',
          },
        },
        '.hidden-scrollbar': {
          '&::-webkit-scrollbar': {
            display: 'none', // Completely hide the scrollbar
          },
          'scrollbar-width': 'none', // Hide scrollbar for Firefox
          '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
        },
      });
    }),
    plugin(function ({ addVariant }) {
      addVariant('before', '&::before');
      addVariant('after', '&::after');
    }),
  ],
};
