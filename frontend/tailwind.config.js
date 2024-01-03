/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue, js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'xl': '0 30px 30px rgba(30, 130, 76)',
      },
      fontFamily: {
        'sans': 'system-ui',
        'serif': 'Georgia'
      }
    },
  },
  plugins: [],
}