/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BBE1FA",
        secondary: "#3282B8",
        tertiary: "#0F4C75",
        dark: "#1B262C",
      },
    },
  },
  plugins: [],
};
