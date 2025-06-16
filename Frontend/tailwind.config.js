/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        greatvibes: ['"Great Vibes"', "cursive"],
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
};
