import { z } from 'zod'

export const demoSchema = z.object({
  slug: z.string(),
  type: z.union([z.literal('imageUpload'), z.literal('canvas')]),
  apiUrl: z.string(),
  thumbnailUrl: z.string(),
  title_ja: z.string(),
  description_ja: z.string(),
  title_en: z.string(),
  description_en: z.string(),
})

export type Demo = z.infer<typeof demoSchema>
