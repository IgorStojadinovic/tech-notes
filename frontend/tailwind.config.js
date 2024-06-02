/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#10141E",
        "semi-dark-blue": "#161D2F",
        "greyish-blue": "#5A698F",
        "red-main": "#FC4747",
      },
    },
    variants: {
      fill: ["hover", "focus"],
    },
  },
  plugins: [],
}

