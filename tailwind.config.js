/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/**/*.{js,jsx,ts,tsx}", // Include your pages folder inside src
    "./src/components/**/*.{js,jsx,ts,tsx}", // If you have a components folder
    "./src/app/**/*.{js,jsx,ts,tsx}", // If you're using the app directory (optional)
  ],
  theme: {
    extend: {
      fontFamily: {
        oxanium: ["Oxanium", "sans-serif"], // Add the font here
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
