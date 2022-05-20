import { configure, defineRule } from 'vee-validate'
import { email, required } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { messages } from '@/messages'

export function setupVeeValidate() {
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
