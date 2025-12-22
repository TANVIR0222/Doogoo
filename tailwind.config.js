/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "never",
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "420px",
        lg: "680px",
      },
      fontFamily: {
        "montserrat-300": ["montserratLight"],
        "montserrat-400": ["montserratRegular"],
        "montserrat-500": ["montserratMedium"],
        "montserrat-600": ["montserratSemiBold"],
        "montserrat-700": ["montserratBold"],
        "montserrat-800": ["montserratBlack"],
      },
      colors: {
        yellowGreen: "#D6DF22",
        blackish: "#3E3E3F",
        gray: "#BCBDC0",
        blackText: "#000",
        primaryBg: "#ffffff",
      },
    },
  },
  plugins: [],
};
