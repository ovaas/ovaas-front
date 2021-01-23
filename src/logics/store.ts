import { Ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const localeSchema = useStorage('locale', '') as Ref<string>

export const colorSchema = useStorage('color-schema', 'auto') as Ref<'auto' | 'dark' | 'light'>
