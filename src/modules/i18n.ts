import { createI18n } from 'vue-i18n'
import { messages } from '../messages'
import { UserModule } from '/~/types'

// multiple language
export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    locale: 'en',
    messages,
  })

  app.use(i18n)
}
