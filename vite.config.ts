import path from 'path'
import { UserConfig } from 'vite'
import ViteComponents from 'vite-plugin-components'
import PurgeIcons from 'vite-plugin-purge-icons'
import Voie from 'vite-plugin-voie'

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

const config: UserConfig = {
  alias,
  plugins: [
    Voie({
      importMode(path: string) {
        if (path === '/src/pages/index.vue')
          return 'sync'
        return 'async'
      },
    }),
    ViteComponents({ alias }),
    PurgeIcons(),
  ],
  optimizeDeps: {
    include: ['mitt'],
  },
  env: {
    VITE_FUNCTIONS_ENDPOINT: process.env.FUNCTIONS_ENDPOINT | "https://ovaashumanpose-test.azurewebsites.net/api"
  }
}

export default config
