/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        red: {
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
        },
        yellow: {
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        emerald: {
          600: '#059669',
          700: '#047857',
          800: '#065f46',
        },
        purple: {
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}