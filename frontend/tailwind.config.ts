import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5F1',
          100: '#CFEAE2',
          200: '#9BD6C8',
          300: '#62BBA7',
          400: '#2D9D86',
          500: '#0A6B5C',
          600: '#075B4E',
          700: '#064D42',
          800: '#043B33',
          900: '#022F28',
          950: '#011F1B'
        },
        accent: {
          50: '#FBF4E8',
          100: '#F5E6C7',
          200: '#E9CC8E',
          300: '#DDB157',
          400: '#C9963B',
          500: '#A97827',
          600: '#875F20',
          700: '#67491A'
        },
        warm: {
          50: '#FAF8F3',
          100: '#F7F5F0',
          200: '#D8D3CA',
          300: '#B7AEA1',
          400: '#8B8275',
          500: '#686156',
          600: '#4A473F',
          700: '#38342D',
          800: '#26231D',
          900: '#1C1B18'
        }
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif']
      }
    }
  },
  plugins: []
} satisfies Config
