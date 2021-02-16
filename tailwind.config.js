/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('windicss/colors')
const defaultTheme = require('windicss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', '"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"', 'Meiryo', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        teal: colors.teal,
      },
      opacity: {
        15: '0.15',
        20: '0.2',
        95: '0.95',
      },
      margin: {
        96: '24rem',
        128: '32rem',
      },
      padding: {
        '2/3': '66.666%',
      },
      width: {
        18: '4.5rem',
      },
      height: {
        18: '4.5rem',
      },
    },
  },
  darkMode: 'class',
}
