import { defineNuxtConfig } from 'nuxt'
import { transformerDirectives, transformerVariantGroup } from 'unocss'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@intlify/nuxt3',
    '@kevinmarrec/nuxt-pwa',
  ],
  meta: {
    charset: 'utf-8',
  },
  typescript: {
    strict: true,
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
  runtimeConfig: {
    public: {
      functionsUrl: 'https://ovaas-backend.azurewebsites.net/api',
      apiUrl: '/api/v1',
    },
    azureStorageAccountName: '',
    azureStorageAccountKey: '',
    azureTableName: '',
  },
  unocss: {
    preflight: true,
    attributify: true,
    icons: {
      scale: 1.1,
    },
    transformers: [
      transformerVariantGroup(),
      transformerDirectives(),
    ],
  },
  i18n: {
    langDir: 'locales',
    vueI18n: {
      fallbackLocale: 'en',
    },
  },
  pwa: {
    manifest: {
      name: 'OVAAS',
      short_name: 'OVAAS',
      description: 'No setup! No command! No code! Easy to use OpenVINO™ demo website.',
      theme_color: '#1A202C',
      lang: 'ja',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
})
