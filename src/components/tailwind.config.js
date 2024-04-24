/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#352F44',
        "columnBackgroundColor": '#5C5470',
        "mainTextColor": '#FAF0E6'
      }
    },
  },
  plugins: [],
}

