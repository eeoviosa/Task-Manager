/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a18cd1', // soft purple
          dark: '#7e5bef',
        },
        secondary: {
          DEFAULT: '#fbc2eb', // light pink gradient
          light: '#fad0c4',
        },
        accent: {
          DEFAULT: '#ff6b6b', // delete button red
          dark: '#e63946',
        },
        success: {
          DEFAULT: '#4CAF50', // green check
        },
        info: {
          DEFAULT: '#5dade2', // update button blue
        },
        neutral: {
          DEFAULT: '#f8f9fa', // background/white text
          dark: '#343a40',
        },
      },
  },
  plugins: [],
}
}