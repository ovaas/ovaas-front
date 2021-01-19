import { computed } from 'vue'
import type { SiteData } from '/~/types'

export function generateHeadMeta(siteData: SiteData) {
  return {
    title: computed(() => siteData.title),
    meta: [
      {
        name: 'description',
        content: computed(() => siteData.description),
      },
      {
        property: 'og:title',
        content: computed(() => siteData.title),
      },
      {
        property: 'og:description',
        content: computed(() => siteData.description),
      },
    ],
  }
}