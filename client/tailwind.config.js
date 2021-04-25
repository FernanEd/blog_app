module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#38c",
        secondary: "#999",
        success: "#3b8",
        danger: "#c38",
        warning: "#da3",
        link: "#3cc",
        dark: {
          100: "#444",
          200: "#333",
          300: "#222",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
