/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0B1120',
          900: '#0F172A',
          800: '#161F35',
          700: '#1E293B',
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        income: {
          500: '#10B981',
          600: '#059669',
        },
        expense: {
          500: '#F43F5E',
          600: '#E11D48',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 4px 16px -4px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
