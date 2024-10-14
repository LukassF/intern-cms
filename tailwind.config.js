/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "525px",
        "2xs": "400px",
      },
      colors: {
        primary: "#f5f7f9",
        accent: {
          100: "#4eb788",
          200: "#41946F",
        },
        brandGrey: {
          100: "#AEB5BC",
          200: "#747480",

          300: "#4A4F56",
        },
      },
      animation: {
        load: "load 1.5s linear infinite",
      },
      keyframes: {
        load: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
      },
    },
  },
  plugins: [],
};
