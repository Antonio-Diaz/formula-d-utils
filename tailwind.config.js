const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: colors.gray['900'],
        primary: colors.amber,
        accent: {
          orange: colors.orange,
          lime: colors.lime,
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
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
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.card': {
          backgroundColor: theme('colors.background'),
          color: theme('colors.white'),
          padding: theme('spacing.4'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.md'),
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.500'),
          color: theme('colors.white'),
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
          },
        },
      });
    }),
  ],
};
