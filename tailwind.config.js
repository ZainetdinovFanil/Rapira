/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        whiteGray: '#D8D8E5',
        customGray: '#f9f9f9',
        mainGray: '#7E8299',
        darkGray: '#3F4254',
        blackGray: '#181C32',
        filterGray: '#A1A5B7',
        
        darkBlue: '#3E97FF',
        mainBlue: '#2884EF',

        errorRed: '#F1416C'
      },
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

