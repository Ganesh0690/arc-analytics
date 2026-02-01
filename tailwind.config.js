/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        arc: {
          bg: '#0c1829',
          'bg-light': '#122035',
          card: '#14253a',
          'card-hover': '#1a2d45',
          border: '#1e3a5f',
          'border-light': '#2a4a72',
          text: '#e6edf5',
          secondary: '#a3b8cc',
          muted: '#6b8299',
          accent: '#c98a4b',
          'accent-light': '#daa05d',
          teal: '#4a9e97',
          'teal-light': '#5cb8b0',
          cream: '#f0ebe0',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
