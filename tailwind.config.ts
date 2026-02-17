import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette branding Natura Parquets
        natura: {
          primary: '#5D4037',      // Brun foncé
          secondary: '#8D6E63',    // Brun moyen
          accent: '#D7CCC8',       // Beige clair
          background: '#EFEBE9',   // Crème
          text: '#3E2723',         // Brun très foncé
          gold: '#C9A962',         // Or accent
        },
        wood: {
          50: '#faf8f5',
          100: '#f3ede4',
          200: '#e5d9c7',
          300: '#d4bfa3',
          400: '#c1a07d',
          500: '#8D6E63',
          600: '#5D4037',
          700: '#4E342E',
          800: '#3E2723',
          900: '#2D1F1B',
        },
        gold: {
          50: '#fbf9f1',
          100: '#f5f0dd',
          200: '#eae0bb',
          300: '#dcc98f',
          400: '#C9A962',
          500: '#bd9a4d',
          600: '#a67f3e',
          700: '#8a6535',
          800: '#725230',
          900: '#5f452a',
        },
        cream: {
          50: '#FDFCFB',
          100: '#EFEBE9',
          200: '#D7CCC8',
          300: '#BCAAA4',
          400: '#A1887F',
          500: '#8D6E63',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wood-grain': "url('/images/wood-texture.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
