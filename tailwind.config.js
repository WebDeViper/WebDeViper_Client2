/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22a3cc',
        semi_primary: '#bce3ef',
        secondary: '#bfd9ff',
      },
    },
  },
  plugins: [],
};
