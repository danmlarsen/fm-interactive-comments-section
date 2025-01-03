import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "hsl(228, 33%, 97%)",
          200: "hsl(223, 19%, 93%)",
          300: "hsl(239, 57%, 85%)",
          500: "hsl(211, 10%, 45%)",
          800: "hsl(212, 24%, 26%)",
        },
        blue: "hsl(238, 40%, 52%)",
        red: {
          200: "hsl(358, 79%, 66%)",
          500: "hsl(358, 79%, 66%)",
        },
      },
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
