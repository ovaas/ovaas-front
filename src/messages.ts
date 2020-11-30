import en from '../locales/en.json'
import ja from '../locales/ja.json'

export const messages = {
  en,
  ja,
}

export const locales = Object.keys(messages)

interface Lang {
  locale: string
  name: string
}

export const languages = [
  {
    locale: 'en',
    name: 'English',
  },
  {
    locale: 'ja',
    name: '日本語',
  },
] as Lang[]
