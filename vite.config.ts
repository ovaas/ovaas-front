import fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'

const config = defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    hmr: {
      host: process.env.CODESPACES
        ? `${process.env.CODESPACE_NAME}-3000.apps.codespaces.githubusercontent.com`
        : undefined,
      clientPort: process.env.CODESPACES ? 443 : undefined,
    },
  },
  plugins: [
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: true,
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    // https://github.com/antfu/vite-plugin-icons
    Icons({
      scale: 1.1,
      defaultStyle: 'vertical-align: middle;',
    }),
    WindiCSS(),
    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'OVaaS',
        short_name: 'OVaaS',
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
    }),
    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/**')],
    }),
    viteMockServe({
      mockPath: 'mock',
    }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'drauu', 'dayjs', 'mitt', 'axios'],
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      fs.copyFileSync(resolve(__dirname, 'dist/index.html'), resolve(__dirname, 'dist/404.html'))
    },
  },
})

export default config
