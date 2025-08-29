/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // If using src directory
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff2f1',
          500: '#ff6b47',
          600: '#ff5722',
        },
        navy: {
          900: '#1a202c',
        },
      },
    },
  },
  plugins: [],
}