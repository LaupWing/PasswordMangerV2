/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      fontFamily: {
         sans: ["Poppins", "sans-serif"],
      },
      extend: {
         colors: {
            main: {
               primary: "#1E1E1E",
               secondary: "#282828",
               tertiare: "#404040",
            },
            accent: {
               blue: "#325DA8",
               grey: "#9E9E9E",
            },
         },
      },
   },
   plugins: [
      // require("@tailwindcss/forms")
   ],
}
