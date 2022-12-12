/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        amazone:{
          DEFAULT:"#131921",
          light:"#252E3F"
        }
      },
      fontFamily: {
        'Sora': ['Sora', 'sans-serif']
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
