import { createI18n } from 'vue-i18n'
import { usePreferredLanguages } from '@vueuse/core'
import { UserModule } from '@/types'
import { messages } from '../messages'
import { localeSchema } from '../logics'

// multiple language
export const install: UserModule = ({ app }) => {
  const preferredLangs = usePreferredLanguages()
  const language = preferredLangs.value.find((locale) => {
    return Object.keys(messages).includes(locale)
  }) || 'ja'

  const locale = localeSchema.value || language

  const i18n = createI18n({
    locale,
    messages,
  })

  app.use(i18n)
}
