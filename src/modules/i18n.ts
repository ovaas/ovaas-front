import { createI18n } from 'vue-i18n'
import { usePreferredLanguages } from '@vueuse/core'
import { messages } from '../messages'
import { UserModule } from '/~/types'
import { localeSchema } from '../logics'

// multiple language
export const install: UserModule = ({ app }) => {
  const preferredLangs = usePreferredLanguages()
  const language = preferredLangs.value.find((locale) => {
    return Object.keys(messages).includes(locale) || 'ja'
  })

  const i18n = createI18n({
    locale: localeSchema.value ? localeSchema.value : language,
    messages,
  })

  app.use(i18n)
}
