/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        altDark: "#111314",
        light: "#1e1f24",
        tableHeading: "#9da1b2",
        tableBorder: "#485568",
      },
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
        heading: ["Sansita", "sans-serif"],
      },
    },
  },
  plugins: [],
};
