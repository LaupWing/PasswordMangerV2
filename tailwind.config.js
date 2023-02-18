/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            black: {
               DEFAULT: "black",
               default: "#1E1E1E",
               light: "#282828",
               lightest: "#404040",
            },
            mainBlue: "#325DA8",
            mainGrey: "#9E9E9E",
         },
      },
   },
   plugins: [],
}
