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
                "main-bg": '#E5E5E5',
                "grey-blue": "#2D3748",
                "gray": "#A0AEC0",
                "teal": "#4FD1C5",
                'dark-grey': '#718096'
            },
        },
        variants: {
            fill: ["hover", "focus"],
        },
    },
    plugins: [],
}

