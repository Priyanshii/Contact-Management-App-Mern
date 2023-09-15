/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backgroundImage: {
      'login': "url('../src/assets/background.jpg')",
    },
    extend: {
      screens: {  
        'md': {'max': '798px'},
        // => @media (max-width: 798px) { ... }
  
        'sm': {'max': '600px'},
        // => @media (max-width: 600px) { ... }
      }
    },
  },
  plugins: [],
}