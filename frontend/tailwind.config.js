/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'leaf': {
          50: '#f0f9e8',
          100: '#daf1cb',
          200: '#b8e39d',
          300: '#8ecd65',
          400: '#68b338',
          500: '#4d9421',
          600: '#3d771a',
          700: '#305a15',
          800: '#254012',
          900: '#1c330f',
        },
        'soil': {
          50: '#f9f6f3',
          100: '#f0e8e1',
          200: '#e1cfc0',
          300: '#d0b199',
          400: '#ba8e6d',
          500: '#a77354',
          600: '#956044',
          700: '#794a37',
          800: '#633d2f',
          900: '#523229',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};