/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'butcher-red': {
          DEFAULT: '#C41E3A',
          light: '#E63946',
          dark: '#8B0000',
        },
        'butcher-black': {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          dark: '#0A0A0A',
        },
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
};
