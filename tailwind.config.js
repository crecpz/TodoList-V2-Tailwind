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
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },

        'fade-out': {
          '0%': {
            opacity: '1',
            visibility: 'visible',
          },
          '99%': {
            opacity: '0',
          },
          '100%': {
            visibility: 'hidden',
            opacity: '0',
          },
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
            bottom: 'calc(100% + 4px)',
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

        // 'loader-fade-in' : {
        //   '0%': {
        //     opacity: '0',
        //   },
        //   '100' : {
        //     opacity: '1',
        //   }
        // },

        'jumping-letter': {
          '0%': {
            transform: 'translateY(0%)',
          },
          '70%': {
            transform: 'translateY(-35%)',

          },
          '100%': {
            transform: 'translateY(0%)',
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

        // shadow-[0_0_6px_0,inset_0_0_3px_0] shadow-secondary

        'box-appear': {
          '0%': {
            'box-shadow': '0 0 0px 0 #eee5dc,inset 0 0px 0 #eee5dc',
          },
          '30%': {
          },
          '40%': {
            'box-shadow': '0 0 40px 0 #eee5dc,inset 0 0 20px 0 #eee5dc',
          },
          '99%': {
          },
          '100%': {
            'box-shadow': '0 0 0px 0 #eee5dc,inset 0 0 0px 0 #eee5dc',
            'box-shadow': '0 0 3px 0 #eee5dc,inset 0 0 3px 0 #eee5dc',
          },
        },
      },
    },

    animation: {
      'fade-in': 'fade-in 700ms forwards',
      'fade-out': 'fade-out 1000ms ease forwards',
      'slide-up': 'slide-up 500ms forwards',
      'slide-down': ' slide-down 700ms forwards',
      'popup': 'popup 200ms ease-out forwards',
      'hide-down': 'hide-down 350ms ease-in forwards',
      'popdown': 'popdown 200ms ease-out forwards',
      'hide-up': 'hide-up 350ms ease-in-out forwards',
      'progress': 'progress 2s linear forwards',
      'add-item': 'add-item 300ms ease-in-out forwards',
      'remove-item': 'remove-item 500ms ease-in-out forwards',
      'jumping-letter': 'jumping-letter 500ms ease-out',
      'tick': 'tick 150ms linear forwards 300ms',
      'tick-before': 'tick-before 150ms linear forwards 500ms',
      'box-appear': 'box-appear 750ms ease-out forwards 800ms',
    },
  },

  plugins: [],

}
