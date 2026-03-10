
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#0A2540',
                },
                green: {
                    500: '#228B22',
                },
            },
        },
    },
    plugins: [],
};