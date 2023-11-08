/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22a3cc',
        semi_primary: '#bce3ef',
        secondary: '#bfd9ff',
        danger: '#e74c3c',
      },
      container: {
        screens: {
          lg: '1024px',
          md: '768px',
          sm: '640px',
          xs: '390px',
        },
        padding: {
          DEFAULT: '1rem',
          sm: '0',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
