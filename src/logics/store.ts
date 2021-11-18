import { useStorage } from '@vueuse/core'

export const localeSchema = useStorage('locale', '')
export const AccessToken = useStorage('access_token', '')
