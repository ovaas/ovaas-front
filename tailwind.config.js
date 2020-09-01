module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.js',
    ],
  },
  theme: {
    extend: {
      colors: {
        header: '#2B6CB0',
      },
      margin: {
        '96': '24rem',
        '128': '32rem',
      },
      height: {
        '18': '4.5rem',
      },
      width: {
        '18': '4.5rem',
      },
    },
  },
  variants: {
    backgroundOpacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  },
  experimental: {
    applyComplexClasses: true,
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true
  }
}
