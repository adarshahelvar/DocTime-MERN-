/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "##9771FF",
        headingColor: "#181A1E",
        irisBlueColor: "#01B5C5",
        textColor: "#4E545F",
      }

    },
    boxShadow: {
      panelShadow: "rgba(17,12,46,0.15) 0px 48px 100px 0px;",
    },
  },
  plugins: [],
};
