/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        bg: '#070707',
        surface: '#0f0f0f',
        border: '#1a1a1a',
        accent: '#e8ff47',
        'accent-dim': '#b8cc2a',
        muted: '#444',
        text: '#e8e8e8',
        'text-dim': '#888',
      },
    },
  },
  plugins: [],
}
