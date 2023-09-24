/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts, tsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#ffffff',
        'background': '#16061e',
        'primary': '#982acf',
        'secondary': '#250a33',
        'accent': '#a034d5',
      },
    },
  },
  plugins: [],
}

