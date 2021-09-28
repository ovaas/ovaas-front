import { useStorage } from '@vueuse/core'
import type { Ref } from 'vue'

export const localeSchema = useStorage('locale', '')
export const AccessToken = useStorage('access_token', '')

export const colorSchema = useStorage('color-schema', 'auto') as Ref<'auto' | 'dark' | 'light'>
