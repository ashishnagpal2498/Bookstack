/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBackground: 'rgb(244, 247, 245)',
        card: 'rgb(77, 99, 86)',
        carrara: 'rgb(241,242,227)',
        navbar: 'rgb(128, 124, 149)',
        darkSkin: 'rgb(130, 120, 110)',
        text: 'rgb(31, 21, 32)',
        highlight: 'rgb(56, 110, 128)'
      },
    },
  },
  plugins: [],
}
