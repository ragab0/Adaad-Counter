/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        slate: {
          50: "#f8fafc",
          100: "#e2e8f0",
          200: "#cbd5e1",
          300: "#a5b4cf",
          400: "#7b8aa3",
          500: "#5d6a85",
          600: "#3f4a62",
          700: "#2a2d3a",
          800: "#1d1f29",
          900: "#13141b",
        },
        main: "#31c48d",
        surface: {
          light: "#ffffff",
          dark: "#1d1f29",
        },
        "surface-hover": {
          light: "#f4f4f5",
          dark: "#262936",
        },
        "page-bg": {
          light: "#f4f4f5",
          dark: "#13141b",
        },
        border: {
          light: "#e4e4e7",
          dark: "#2a2d3a",
        },
        "text-muted": {
          light: "#78716c",
          dark: "#8b8fa3",
        },
        "btn-secondary": {
          light: "#f4f4f5",
          dark: "#2a2d3a",
        },
        "btn-secondary-hover": {
          light: "#e4e4e7",
          dark: "#34384a",
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        "card-hover":
          "0 8px 24px -6px rgb(0 0 0 / 0.1), 0 2px 6px -2px rgb(0 0 0 / 0.05)",
        "card-dark":
          "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 10px -4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
