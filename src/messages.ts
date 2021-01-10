import { computed } from 'vue'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

export const messages = {
  en,
  ja,
}

const languageName = {
  en: 'English',
  ja: '日本語',
}

export const languages = Object.keys(messages).map((locale) => {
  return {
    locale,
    name: languageName[locale] as string,
  }
})
