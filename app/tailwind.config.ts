/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Primary teal/turquoise accent #39ac99
                primary: {
                    50: '#e8f7f4',
                    100: '#c2ebe3',
                    200: '#9bded2',
                    300: '#73d2c1',
                    400: '#4cc3b0',
                    500: '#39ac99', // Main brand color
                    600: '#2e8a7a',
                    700: '#23685c',
                    800: '#18463d',
                    900: '#0d241f',
                },

                // Dark mode backgrounds
                dark: {
                    secondary: '#202b3c',
                    bg: '#1a1d2e',
                    card: '#252837',
                    sidebar: '#1a1d2e',
                    hover: '#2d3142',
                },

                // Light mode backgrounds
                light: {
                    secondary: '#f9ebdc',
                    bg: '#f5f6fa',
                    card: '#ffffff',
                    sidebar: '#ffffff',
                    hover: '#e8eaf0',
                },

                // Status colors
                status: {
                    available: '#fef3c7',
                    fostered: '#e9d5ff',
                    medical: '#fed7aa',
                }
            },
        },
    },
    plugins: [],
}