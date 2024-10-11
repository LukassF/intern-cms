/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f7f9",
        accent: {
          100: "#4eb788",
          200: "#41946F",
        },
        brandGrey: {
          100: "#747480",
          200: "#AEB5BC",
          300: "#4A4F56",
        },
      },
    },
  },
  plugins: [],
};
