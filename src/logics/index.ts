import { isDev } from '@/utils'

export function useFromData(name: string, file: File | Blob | string, filename?: string): FormData {
  const formData = new FormData()
  formData.append(name, file, filename)
  if (isDev) {
    for (const pair of formData.entries())
      // eslint-disable-next-line no-console
      console.log(`${pair[0]}, ${pair[1]}`)
  }
  return formData
}

export * from './store'
export * from './dark'
export * from './axios'
