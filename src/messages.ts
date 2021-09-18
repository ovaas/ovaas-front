
// import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
export const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../locales/*.yml'))
    .map(([key, value]) => {
      const msgKey = key.split('/').pop()?.replace('.yml', '')
      return [msgKey, value.default]
    }),
)

const languageName: Record<string, string> = {
  en: 'English',
  ja: '日本語',
}

export const languages = Object.keys(messages).map((locale) => {
  return {
    locale,
    name: languageName[locale] as string,
  }
})
