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
        primary: 'var(--color-primary)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        card: 'var(--color-card-bg)',
        text: 'var(--color-text)',
        subtext: 'var(--color-subtext)',
        heading: 'var(--color-heading)',
        accent: 'var(--color-accent-solid)',
        onaccent: 'var(--color-on-accent)',
        glass: 'var(--color-surface)',
        edge: 'var(--color-border)',
        'edge-strong': 'var(--color-border-strong)',
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
