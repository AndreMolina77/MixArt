module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@fortawesome/fontawesome-free/**/*.js', './index.html'], 
    theme: {
      extend: { 
      fontFamily: {
        'alexandria': ['Alexandria', 'sans-serif'],
        'love-ya': ['"Love Ya Like A Sister"', 'cursive']
      },
      spacing: {
        '7xl': '80rem',
      },
      colors: {
        primary: '#F4F1DE',
        secondary: '#7A6E6E',
        accent: '#E07A5F',
        highlight: '#EBFEF5'
      }
    }
    },
    // Safelist Font Awesome classes to prevent purging
    safelist: [
      {
        pattern: /^fa-/, // Allow all Font Awesome classes (fa-*)
      }
    ],
    plugins: [require("tailgrids/plugin")]
}