module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%,50%': { opacity: '1' },
          '50%,100%': { opacity: '0' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fade-in 0.8s ease forwards'
      }
    }
  },
  plugins: [],
}
