/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "purple-1050": "#0D0714",
        "purple-1000": "#15101C"
      },
      fontFamily: {
        sans: "Inter"
      },
    },
  },
  plugins: [],
}
