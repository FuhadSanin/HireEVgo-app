/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary-green": "#379972",
        "custom-blue": "#0E627C",
        "background-primary": "#F3F2F8",
      },
      boxShadow: {
        "custom-light": "0 4px 6px rgba(0, 0, 0, 0.05)", // Example light shadow
      },
    },
  },
  plugins: [],
}
