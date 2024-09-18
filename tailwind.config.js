/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure this includes .tsx files for TypeScript
  ],
  theme: {
    extend: {
      "invert-50": "invert(50%)"
    },
  },
  plugins: [],
};