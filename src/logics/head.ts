import { useHead as _useHead } from '@vueuse/head'
import type { Ref } from 'vue'
import type { SiteData } from '@/types'

export function generateHeadMeta(siteData: Ref<SiteData>) {
  return computed(() => {
    return {
      title: siteData.value.title,
      meta: [
        {
          name: 'description',
          content: siteData.value.description,
        },
        {
          property: 'og:title',
          content: siteData.value.title,
        },
        {
          property: 'og:description',
          content: siteData.value.description,
        },
      ],
    }
  })
}

export function useHead(siteData: Ref<SiteData>) {
  const route = useRoute()
  if (route.path !== '/')
    siteData.value.title += ' - OVaaS'

  return _useHead(generateHeadMeta(siteData))
}
