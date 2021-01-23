import { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Demo {
  title: string
  image: string
  content: string
  path: string
}

export interface SiteData {
  title: string
  description: string
}

export interface HandwrittenResult {
  count: number
  timecost: number
  text: string
}
