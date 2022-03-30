module.exports = {
  content: [
    'index.html', 'main.js',
  ],
  theme: {
    extend: {

      colors: {
        primary: '#BCB8B8',
        'primary-darken': '#7c7c7c',
      },

      fontFamily: {
        'space-mono': "'Space Mono', monospace",
      },

      keyframes: {
        'expand--before': {
          '50%': {
            top: '0%',
          },
          '100%': {
            top: '0%',
            transform: 'rotate(45deg)',
          },
        },

        'expand--after': {
          '50%': {
            top: '0%',
          },
          '100%': {
            top: '0%',
            transform: 'rotate(-45deg)',
          }
        },

        'disappear': {
          '0%': {
            'background-color': 'white',
          },
          '100%': {
            'background-color': 'transparent',
          }
        },

      },
      animation: {
        'expand--before': 'expand--before ease-in 500ms forwards',
        'expand--after': 'expand--after ease-in 500ms forwards',
        'disappear': 'disappear ease-in 300ms forwards',

        'collapse--before':'expand--before ease-in 500ms reverse forwards',
        'collapse--after':'expand--after ease-in 500ms reverse forwards',
        'appear': 'disappear ease-in 300ms reverse forwards',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    }
  },
  plugins: [],
}
