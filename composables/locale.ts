import { useI18n } from 'vue-i18n'
import type { Demo } from '~~/lib/schema'

export function useDemoLocale(demo: Demo) {
  const { locale } = useI18n()
  const title = computed(() => {
    const key = `title_${locale.value as 'en' | 'ja'}` as const
    return demo[key] ?? '-'
  })
  const description = computed(() => {
    const key = `description_${locale.value as 'en' | 'ja'}` as const
    return demo[key] ?? '-'
  })

  return {
    title,
    description,
  }
}
