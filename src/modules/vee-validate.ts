import { defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { UserModule } from '@/types'
import { messages } from '@/messages'

export const install: UserModule = () => {
  defineRule('required', required)
  defineRule('email', email)

  configure({
    generateMessage: localize({
      en: {
        messages: {
          ...en.messages,
          ...Object.fromEntries(
            Object.entries(messages.en.validate.messages)
              .map(([key, value]) => [key, (value as any).source]),
          ),
        },
      },
      ja: {
        messages: {
          ...ja.messages,
          ...Object.fromEntries(
            Object.entries(messages.ja.validate.messages)
              .map(([key, value]) => [key, (value as any).source]),
          ),
        },
      },
    }),
  })
}
