import path from 'path'
import ViteComponents from 'vite-plugin-components'
import PurgeIcons from 'vite-plugin-purge-icons'
import Voie from 'vite-plugin-voie'

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

export default {
  alias,
  plugins: [
    ViteComponents({ alias }),
    Voie(),
    PurgeIcons()
  ]
};