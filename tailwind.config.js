module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minWidth: {
      '4': '1rem',
      '10': '2.5rem',
    },
    extend: {
      flexBasis: {
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
      },
      width: {
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
      }
    },
  },
  plugins: [],
}
