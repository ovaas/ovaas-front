/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', '"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"', 'Meiryo', ...defaultTheme.fontFamily.sans],
      },
    },
  },
})
