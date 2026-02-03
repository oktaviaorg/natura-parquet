import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'natura': {
          50: '#f6f5f0',
          100: '#e8e6db',
          200: '#d3cfba',
          300: '#b9b193',
          400: '#a39773',
          500: '#928259',
          600: '#7d6b4b',
          700: '#66553e',
          800: '#564838',
          900: '#4a3f33',
          950: '#2a231b',
        },
        'wood': {
          light: '#d4a574',
          medium: '#a67c52',
          dark: '#5c4033',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
