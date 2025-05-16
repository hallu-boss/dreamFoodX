/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plant: {
          50: "#e7efe2",
          100: "#b8d0aa",
          200: "#adc99d",
          300: "#a3c391",
          400: "#99bc85",
          500: "#8aa978",
          600: "#7a966a",
          700: "#7a966a",
          800: "#6b845d",
          900: "#5c7150",
          950: "#4d5e43",
        },
      },
    },
  },
  plugins: [],
}

