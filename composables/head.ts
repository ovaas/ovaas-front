import { useHead } from '#head'
import type { SiteData } from '@/lib/types'

export function useCustomHead(siteData: SiteData) {
  const route = useRoute()
  if (route.path !== '/')
    siteData.title += ' - OVAAS'

  return useHead({
    title: siteData.title,
    meta: [
      {
        name: 'description',
        content: siteData.description,
      },
      {
        property: 'og:title',
        content: siteData.title,
      },
      {
        property: 'og:description',
        content: siteData.description,
      },
    ],
  })
}
