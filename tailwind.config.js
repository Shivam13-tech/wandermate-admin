/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px", // Small screens, like mobile
      md: "768px", // Medium screens, like tablets
      lg: "1024px", // Large screens, like laptops
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        buttonColor: "#063970",
        inputBoxColor: "#E5E5E5",
      },
    },
  },
  plugins: [],
};
