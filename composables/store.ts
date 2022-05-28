import { useStorage } from '@vueuse/core'

export const localeSchema = useStorage('locale', 'en')
export const accessToken = useStorage('access_token', '')
