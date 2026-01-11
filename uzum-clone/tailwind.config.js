/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uzum: {
          primary: "#7000ff",
          secondary: "#8a33ff",
          bg: "#f4f5f5",
          text: "#1f2026",
          gray: "#8b8e99"
        }
      }
    },
  },
  plugins: [],
}
