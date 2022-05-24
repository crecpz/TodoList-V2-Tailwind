module.exports = {
  content: [
    'index.html', 'main.js',
  ],
  theme: {
    extend: {

      colors: {
        primary: '#405362',
        'primary-light': '#a9abab',
        secondary: '#eee5dc',
        tertiary: '#ffd38d',
        'tertiary-dark': '#ffc85a',
        // 'tertiary-dark':'#efc881',
      },

      fontFamily: {
        'Source-Code-Pro': "'Source Code Pro', monospace,'Noto Sans TC','Noto Serif TC'",
        'Font-Awesome': "'Font Awesome 5 Free'",
      },


      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },

        'slide-up': {
          'from': {
            opacity: 0,
            transform: 'translateY(50%)',
          },
          'to': {
            opacity: 1,
            transform: 'translateY(0%)',
          },
        },

        'slide-down': {
          'from': {
            opacity: 1,
            transform: 'translateY(0%)',
          },
          'to': {
            opacity: 0,
            transform: 'translateY(50%)',
          },
        },

        'popup': {
          '70%': {
            bottom: '130%',
          },
          '100%': {
            opacity: '1',
            bottom: 'calc(100% + 4px)',
          },
        },

        'hide-down': {
          '0%': {
            bottom: '100%',
            opacity: '1',
          },
          '30%': {
            bottom: '130%',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            bottom: '0',
            opacity: '0',
          },
        },

        'popdown': {
          // '0%': {
          //   top: '0%',
          // },
          '70%': {
            top: '130%',
          },
          '100%': {
            opacity: '1',
            // top: '100%',
            top: 'calc(100% + 4px)',
          },
        },

        'hide-up': {
          '0%': {
            top: 'calc(100% + 4px)',
            opacity: '1',
          },
          '30%': {
            top: '130%',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            top: '0',
            opacity: '0',
          },
        },

        'progress': {
          '0%':{
            width: '100%'
          },
          '100%':{
            width: '0%',
          },
        },
      },

      animation: {
        'fade-in': 'fade-in 700ms forwards',
        'fade-out': 'fade-out 1000ms forwards',
        'slide-up': 'slide-up 500ms forwards',
        'slide-down': ' slide-down 700ms forwards',
        'popup': 'popup 200ms ease-out forwards',
        'hide-down': 'hide-down 350ms ease-in forwards',
        'popdown': 'popdown 200ms ease-out forwards',
        'hide-up': 'hide-up 350ms ease-in-out forwards',
        'progress': 'progress 2s linear forwards',
      },

    },

    plugins: [],

  }
}
