/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        bg: '#0b0b0d',
        surface: 'rgba(255, 255, 255, 0.03)',
        text: '#e6e6e6',
        subtext: '#bdbdbd',
        accent: '#7dd3fc',
        glass: 'rgba(255,255,255,0.06)',
      },
      borderRadius: {
        base: '12px',
      },
      boxShadow: {
        soft: '0 6px 20px rgba(2,6,23,0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Satoshi', 'Inter', 'ui-sans-serif'],
        mono: ['Space Grotesk', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

