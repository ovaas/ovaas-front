import { useStorage } from '@vueuse/core'

export const localeSchema = useStorage('locale', '')
export const accessToken = useStorage('access_token', '')
