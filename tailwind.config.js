module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        arc: {
          bg: '#5a8a7a',
          'bg-light': 'rgba(255, 255, 255, 0.1)',
          card: 'rgba(255, 255, 255, 0.1)',
          'card-hover': 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.15)',
          'border-light': 'rgba(255, 255, 255, 0.25)',
          text: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.8)',
          muted: 'rgba(255, 255, 255, 0.5)',
          accent: '#98FB98',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}