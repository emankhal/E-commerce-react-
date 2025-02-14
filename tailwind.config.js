/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4fa74f",
      },
      container: {
        center: true, // Optional: centers the container
       
        screens: {
          // Additional breakpoints if needed
          lg: '80rem',
         
        },
      },
    },
  },
  plugins: [],
}