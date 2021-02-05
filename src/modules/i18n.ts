import { createI18n } from 'vue-i18n'
import { usePreferredLanguages } from '@vueuse/core'
import { messages } from '../messages'
import { localeSchema } from '../logics'
import { UserModule } from '~/types'

const isClient = typeof window !== 'undefined'

// multiple language
export const install: UserModule = ({ app }) => {
  const preferredLangs = usePreferredLanguages()
  const language = preferredLangs.value.find((locale) => {
    return Object.keys(messages).includes(locale) ? locale : 'ja'
  })

  const locale = localeSchema.value ? localeSchema.value : isClient ? language : 'ja'

  const i18n = createI18n({
    locale,
    messages,
  })

  app.use(i18n)
}
