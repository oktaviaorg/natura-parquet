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
        // Palette Natura - tons bois/terre épurés
        natura: {
          50: '#FDFCFA',   // Blanc cassé
          100: '#F7F5F0',  // Beige très clair
          200: '#EDE8DE',  // Beige clair
          300: '#DDD5C5',  // Sable
          400: '#C4B9A4',  // Taupe clair
          500: '#A69882',  // Bois moyen
          600: '#8B7355',  // Chêne
          700: '#6B5A45',  // Bois foncé
          800: '#4A3F32',  // Brun profond
          900: '#2D251C',  // Quasi noir
        },
        // Accent marron/bronze (CTA) - remplace le vert
        forest: {
          50: '#FAF7F4',
          100: '#F0EBE4',
          200: '#E0D5C8',
          300: '#C9B9A5',
          400: '#A69282',
          500: '#8B7355',  // Marron principal (CTA)
          600: '#6B5A45',
          700: '#5A4A3A',
          800: '#4A3F32',
          900: '#3A3028',
        },
        // Accent doré (prix, badges)
        gold: {
          400: '#D4A853',
          500: '#C49A3D',
          600: '#A67F2E',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        'card-hover': '0 10px 40px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}

export default config
