/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: '"Poppins", sans-serif',
        },
        extend: {
            fontFamily: {
                teachers: '"Teachers", sans-serif',
            },
            colors: {
                bg: '#121215',
                box: '#19181c',
                'box-heading': '#8D90D3',
                'task-bg': '#2f2d36',
                accent: '#744cf7',

                'accent-light': '#8786A0',
                text: '#D6D7E2',
                'gradient-start': '#9472FF',
                'gradient-end': '#6D43F6',
            },
        },
    },
    plugins: [],
}
