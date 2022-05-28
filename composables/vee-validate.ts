import { configure, defineRule } from 'vee-validate'
import { email, required } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'

export function setupVeeValidate() {
  defineRule('required', required)
  defineRule('email', email)

  configure({
    generateMessage: localize({
      en: {
        messages: {
          ...en.messages,
          required: 'This field is required',
          email: 'This field must be a valid email',
        },
      },
      ja: {
        messages: {
          ...ja.messages,
          required: 'こちらは必須項目です',
          email: '有効のメールアドレスではありません',
        },
      },
    }),
  })
}
