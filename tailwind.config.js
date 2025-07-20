const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#0F0F0F',
        graphite: '#1C1C1E',
        neonPink: '#FF4FCB',
        electricBlue: '#3B9CFF',
        intenseRed: '#FF2E2E',
        brightGreen: '#0AFFA0',
        acidYellow: '#FFDC00',
      },
      fontFamily: {
        sans: ['Rajdhani', 'ui-sans-serif', 'system-ui'],
        display: ['Orbitron', 'Rajdhani', 'ui-sans-serif'],
      },
      keyframes: {
        'bounce-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 0.5s ease-out both',
      },
      boxShadow: {
        neon: '0 0 10px 0 rgba(255, 79, 203, 0.7)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.card': {
          backgroundColor: theme('colors.graphite'),
          color: theme('colors.white'),
          padding: theme('spacing.4'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.md'),
        },
        '.btn-primary': {
          backgroundColor: theme('colors.neonPink'),
          color: theme('colors.graphite'),
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
          '&:hover': {
            backgroundColor: theme('colors.electricBlue'),
          },
        },
      });
    }),
  ],
};
