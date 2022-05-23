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

        'retreat': {
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
      },

      animation: {
        'fade-in': 'fade-in 700ms forwards',
        'fade-out': 'fade-out 1000ms forwards',
        'slide-up': 'slide-up 500ms forwards',
        'slide-down': ' slide-down 700ms forwards',
        'popup': 'popup 300ms ease-out forwards',
        'retreat': 'retreat 350ms ease-in forwards',
        
      },

    },

    plugins: [],

  }
}
