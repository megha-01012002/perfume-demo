/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#3B1018",
          dark: "#1A070B",
        },
        gold: {
          DEFAULT: "#C8A96B",
          light: "#DCC393",
          dark: "#A8874F",
        },
        ivory: "#F8F4ED",
        beige: "#E9E0D3",
        charcoal: "#242124",
      },
      fontFamily: {
        display: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "'Manrope'", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(26, 7, 11, 0.15)",
        card: "0 4px 24px -6px rgba(26, 7, 11, 0.10)",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
