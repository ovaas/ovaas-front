import { ref, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AxiosRequestConfig } from 'axios'
import { useApi, useFromData } from '~/logics/axios'
import { flash, EmitTypes } from '~/logics/emitter'
import { inBrowser, resizeImage } from '~/utils'

export function useUploadImage(path: string) {
  const { t } = useI18n()

  const image = ref<File | null>(null)
  const resultImage = ref<string>('')

  const baseUrl = import.meta.env.VITE_FUNCTIONS_ENDPOINT
  const objectDetectionUrl = `${baseUrl}${path}`
  const allowFileTypes = ['image/jpeg', 'image/png']

  let reader: FileReader

  if (inBrowser) {
    reader = new FileReader()
    reader.onload = (event) => {
      resultImage.value = event.target?.result as string
    }
  }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  }

  const { data, loading, error, post, cancel } = useApi<Blob>(objectDetectionUrl, config)

  const checkFileExt = (file: File) => {
    if (allowFileTypes.includes(file.type))
      return true
    flash(EmitTypes.Warning, t('errors.not-valid-image'))
    return false
  }

  watch(data, (v) => {
    if (v) reader.readAsDataURL(v as Blob)
  })
  watch(error, (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
  })
  watch(image, async(file) => {
    if (!file || !checkFileExt(file)) return
    loading.value = true
    const blob = await resizeImage(file)
    const formData = useFromData('image', blob, 'image.jpg')
    post(formData)
  })
  onUnmounted(() => {
    cancel()
  })

  return {
    image,
    loading,
    resultImage,
  }
}
