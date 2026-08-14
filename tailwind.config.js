/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        velnix: {
          pink: '#ff2e56',
          pinkHover: '#ff4b72',
          pinkDark: '#b81434',
          bg: '#08080f',
          bgCard: '#10101a',
          bgCardHover: '#181826',
          border: '#1f1f2e',
          subtext: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Montserrat', 'Inter', 'sans-serif'],
        cursive: ['Cinzel Decorative', 'cursive', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
