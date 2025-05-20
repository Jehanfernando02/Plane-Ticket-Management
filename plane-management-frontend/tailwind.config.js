/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark blue for branding
        secondary: '#3B82F6', // Lighter blue for accents
        accent: '#F59E0B', // Yellow for highlights
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode with class toggle
}