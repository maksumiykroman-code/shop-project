import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bronze: {
          50: '#fbf7f2',
          100: '#f5eadb',
          200: '#ead2b5',
          300: '#dcb385',
          400: '#c98a55',
          500: '#b26c3d',
          600: '#935434',
          700: '#78432e',
          800: '#633826',
          900: '#543020',
          950: '#2f1910'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.10)'
      }
    }
  },
  plugins: [lineClamp]
} satisfies Config;
