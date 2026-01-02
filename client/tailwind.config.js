/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef6fb',
                    100: '#d5eaf5',
                    200: '#b0d9ee',
                    300: '#7dbfe2',
                    400: '#469fd1',
                    500: '#2582b8',
                    600: '#196796',
                    700: '#0B3C5D', // CORE DEEP BLUE
                    800: '#114467',
                    900: '#123953',
                },
                secondary: '#7A1F2B', // MAROON
                accent: '#F2F2F2', // LIGHT GREY
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
