import { App } from 'vue'
import installI18n from './i18n'
import './axios'

export default (app: App) => {
  installI18n(app)
}
