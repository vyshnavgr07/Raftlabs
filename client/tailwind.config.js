/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff6f0',
          100: '#ffeadb',
          200: '#ffd0b0',
          300: '#ffae78',
          400: '#ff8538',
          500: '#f56712',
          600: '#e04d08',
          700: '#b93a09',
          800: '#93300e',
          900: '#772a0f',
        },
        ink: {
          50: '#f7f5f2',
          100: '#ebe6df',
          200: '#d6cfc4',
          300: '#b8aea0',
          400: '#8f8476',
          500: '#6e6559',
          600: '#554e45',
          700: '#3d3832',
          800: '#2a2622',
          900: '#1a1714',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        sans: ['"Figtree"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px rgba(26, 23, 20, 0.06)',
        lift: '0 16px 40px rgba(26, 23, 20, 0.1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'cart-pop': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'scale-in': 'scale-in 1.1s ease-out both',
        'cart-pop': 'cart-pop 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
