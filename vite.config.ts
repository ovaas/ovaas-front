import path from 'path'
import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Voie from 'vite-plugin-voie'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import PurgeIcons from 'vite-plugin-purge-icons'

const config: UserConfig = {
  alias: {
    '/~/': `${path.resolve(__dirname, 'src')}/`,
  },
  plugins: [
    Vue({
      ssr: !!process.env.SSG,
    }),
    // https://github.com/vamplate/vite-plugin-voie
    Voie({
      // load index page sync and bundled with the landing page to improve first loading time.
      importMode(path: string) {
        if (path === '/src/pages/index.vue')
          return 'sync'
        return 'async'
      },
    }),
    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // as the `alias` changes the behavior of middleware, you have to pass it to ViteComponents to do the resolving
      // allow auto import and register components used in markdown
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),
    // https://github.com/antfu/vite-plugin-icons
    ViteIcons({
      scale: 1.1,
      defaultStyle: 'vertical-align: middle;',
    }),
  ],
  optimizeDeps: {
    include: ['mitt'],
  },
  env: {
    VITE_FUNCTIONS_ENDPOINT: process.env.FUNCTIONS_ENDPOINT || 'https://ovaas-backend.azurewebsites.net/api',
  },
}

export default config
