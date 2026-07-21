/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta basada en tu logo
        'can-primary': '#E65100',   // Naranja vibrante del logo
        'can-secondary': '#5D4037', // Café oscuro del borde
        'can-accent': '#FFD54F',    // Amarillo suave para alertas
        'can-bg': '#FFFBF5',        // Crema muy suave para fondos
      },
    },
  },
  plugins: [],
}