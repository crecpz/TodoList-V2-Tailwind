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

      screens: {
        'xs': '576px',
      },


      fontFamily: {
        'main-font': "'Source Code Pro','Noto Sans TC'",
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
            visibility: 'hidden',
          },
        },

        'popdown': {
          '70%': {
            top: '130%',
          },
          '100%': {
            opacity: '1',
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
          '0%': {
          },
          '100%': {
            width: '0%',
          },
        },

        'remove-item': {
          '50%': {
            transform: 'scaleY(1)',
            'transform-origin': 'top',
            overflow: 'hidden'

          },
          '100%': {
            transform: 'scaleY(0)',
            'transform-origin': 'top',
          },
        },

        'jumping-letter': {
          '0%': {
            transform: 'translateY(0%)',
            color: '#eee5dc',
          },
          '70%': {
            transform: 'translateY(-40%)',
            color: '#ffc85a',
          },
          '100%': {
            transform: 'translateY(0%)',
            color: '#eee5dc'
          },
        },

        'tick': {
          '100%': {
            width: '14px',
          }
        },

        'tick-before': {
          '100%': {
            height: '24px',
          },
        },

        'box-appear': {
          '0%': {
            // 'border-bottom-width': '0',
            // 'box-shadow': 'inset 0 0 0 0',
            transform: 'scale(0)',
            opacity: '0',
          },

          '50%':{
            transform: 'scale(1)',
          },

          '100%': {
            // 'border-bottom-width': '10px',
            // 'box-shadow': 'inset 0 -48px 0 0',
            transform: 'scale(.8)',
            opacity: '1',
          },
        },
      },

      animation: {
        'fade-in': 'fade-in 700ms forwards',
        // fade out 的forwards被我拿掉了，為了測試用，測試完請放回
        'fade-out': 'fade-out 1500ms ease forwards',
        'slide-up': 'slide-up 500ms forwards',
        'slide-down': ' slide-down 700ms forwards',
        'popup': 'popup 200ms ease-out forwards',
        'hide-down': 'hide-down 350ms ease-in forwards',
        'popdown': 'popdown 200ms ease-out forwards',
        'hide-up': 'hide-up 350ms ease-in-out forwards',
        'progress': 'progress 2s linear forwards',
        'add-item': 'add-item 300ms ease-in-out forwards',
        'remove-item': 'remove-item 500ms ease-in-out forwards',
        'jumping-letter': 'jumping-letter 500ms ease',
        'tick': 'tick 300ms linear forwards 450ms',
        'tick-before': 'tick-before 300ms linear forwards 800ms',
        'box-appear': 'box-appear 300ms ease-out forwards',
      },

      // 動畫延遲無效是因為我用js在inline-style增加了delay
    },

    plugins: [],

  }
}
