import { useI18n } from 'vue-i18n'
import { DOMURL, resizeImage } from '@/lib/utils'
import { allowFileTypes } from '@/lib/constants'
import { ref, watch } from '#imports'

export function useUploadImage(path: string) {
  const { functionsUrl } = useRuntimeConfig().public
  const { t } = useI18n()

  const image = ref<File | null>(null)
  const resultImage = ref<string>('')

  function handleInput(file: File) {
    image.value = file
  }

  const { data, loading, error, post, cancel } = useApi<Blob>(new URL(path, functionsUrl).toString(), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  })

  const checkFileExt = (file: File) => {
    if (allowFileTypes.includes(file.type))
      return true
    flash(EmitTypes.Warning, t('errors.not-valid-image'))
    return false
  }

  watch(data, (v) => {
    if (!v) return
    resultImage.value = DOMURL!.createObjectURL(v)
  })

  watch(image, async(file) => {
    if (!file || !checkFileExt(file)) return
    loading.value = true
    try {
      const blob = await resizeImage(file)
      const formData = useFromData('image', blob, 'image.jpg')
      post(formData)
    } catch (e) {
      flash(EmitTypes.Danger, t('errors.upload-error'))
    }
  })

  onUnmounted(() => {
    cancel()
  })

  return {
    handleInput,
    loading,
    error,
    resultImage,
  }
}
