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
        'before-expand': {
          '50%': {
            top:'50%',
            'translate-y':'-50%'
          },
          '100%':{
            top:'50%',
            transform:'translate-y(-50%)',
            transform:'rotate(45deg)'
          },
        },

        'after-expand': {

        },

        'disappear': {

        },
      },
      animation: {
        'before-expand': 'ease-in-out 1000ms forwards',
        'after-expand': 'ease-in-out 1000ms forwards',
        'disappear': 'ease-in-out 500ms forwards',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    }
  },
  plugins: [],
}
