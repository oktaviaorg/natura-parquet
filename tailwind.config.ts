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
        // Accent vert sapin (CTA)
        forest: {
          50: '#F0F7F4',
          100: '#DBF0E5',
          200: '#B8E0CC',
          300: '#8BCAAB',
          400: '#5BAF86',
          500: '#3D9268',  // Vert principal
          600: '#2F7653',
          700: '#285F45',
          800: '#234C39',
          900: '#1E3F30',
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
