module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./index.html",
      "./src/**/*.vue",
      "./src/**/*.js",
    ],
  },
  theme: {
    extend: {
      opacity: {
        "15": "0.15",
        "20": "0.2",
        "95": "0.95",
      },
      colors: {
        header: "#2B6CB0",
      },
      margin: {
        "96": "24rem",
        "128": "32rem",
      },
      height: {
        "18": "4.5rem",
      },
      width: {
        "18": "4.5rem",
      },
    },
  },
  variants: {
    backgroundOpacity: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
    ],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    applyComplexClasses: true,
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true,
  },
};
