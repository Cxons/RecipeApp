/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        homepage: "url('./src/assets/images/Picture3.jpg')",
        anotherPage: "url('./scr/assets/images/Picture2.jpg')",
      },
    },
  },
  plugins: [],
};
