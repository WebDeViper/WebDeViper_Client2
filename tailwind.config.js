/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22a3cc',
        semi_primary: '#bce3ef',
        secondary: '#bfd9ff',
        dark: '#332D2D',
        success: '#14A44D',
        light: '#FBFBFB',
        kakao: '#FEE500',
        naver: '#03C75A',
        google: '#FBFBFB',
      },
    },
  },
  plugins: [],
};
