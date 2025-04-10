module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", './node_modules/@fortawesome/fontawesome-free/**/*.js'],
    theme: {
      extend: { 
        fontFamily: {
        'alexandria': ['Alexandria', 'sans-serif'],
        'love-ya': ['"Love Ya Like A Sister"', 'cursive']
      }
    },
    },
    // Safelist Font Awesome classes to prevent purging
    safelist: [
      {
        pattern: /^fa-/, // Allow all Font Awesome classes (fa-*)
      },
    ],
    plugins: [require("tailgrids/plugin")],
  };