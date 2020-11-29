import { Ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { locales } from '../messages'

export const localeSchema = useStorage('locales', 'en') as Ref<locals>

export const colorSchema = useStorage('color-schema', 'auto') as Ref<'auto' | 'dark' | 'light'>
