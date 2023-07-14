/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryWhite: "#D9D9D9",
        modalBg: "#181818",
        secondary: "#2A2A2A",
        secondaryText: "#626262",
        suva: "#8A8A8A",
        grayText: "#B9B9B9",
        success: "#00FF85",
      },
      boxShadow: {
        modalShadow: "0px 10px 50px 0px rgba(0, 0, 0, 0.25)",
      },
      dropShadow: {
        tagShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
      },
      transitionProperty: {
        width: "width",
      },
      transitionDuration: {
        loading: "3000ms",
      },
      animation: {
        imageMove1: "imageMove1 3s ease-out infinite",
        imageMove2: "imageMove2 3s ease-in infinite",
        imageMove3: "imageMove3 3s ease-in-out infinite",
        tagFlashUp: "tagFlashUp 1s linear 1",
        tagDisappear: "tagDisappear 0.5s ease-out forwards",
        loadingScale: "scale 0.5s linear",
      },
      keyframes: {
        imageMove1: {
          "0% 100%": {
            transform: "scale(1) translate(0px, 0px)",
          },
          "50%": {
            transform: "scale(1.1) translate(4px, -5px)",
          },
        },
        imageMove2: {
          "0% 100%": {
            transform: "scale(1) translate(0px, 0px)",
          },
          "50%": {
            transform: "scale(1.2) translate(-5px, 5px)",
          },
        },
        imageMove3: {
          "0% 100%": {
            transform: "scale(1) translate(0px, 0px)",
          },
          "50%": {
            transform: "scale(1.1) translate(-5px, -7px)",
          },
        },
        tagFlashUp: {
          "0%": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "50%": {
            backgroundColor: "#00FF85",
          },
          "100%": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },
        tagDisappear: {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.7)",
          },
        },
        scale: {
          "0%": { transform: "scale(10)" },
          "50%": { transform: "scale(0.2)" },
          "70%": { transform: "scale(1.2)" },
          "90%": { transform: "scale(0.7)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
