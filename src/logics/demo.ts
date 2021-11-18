import { createDrauu, DrawingMode } from 'drauu'
import { DEMO_API_ENDPOINT } from '@/constants'
import { useFromData, useApi } from '@/logics'
import { isDev, DOMURL } from '@/utils'

import type { HandwrittenResult } from '@/types'
import type { Ref } from 'vue'

export function useHandWritten(svgEl: Ref<SVGSVGElement | null>) {
  const mode = ref<DrawingMode>('stylus')
  const canUndo = ref(false)
  const canRedo = ref(false)
  const modelText = ref('')
  const isModelOpen = ref(false)
  const drauu = createDrauu({
    brush: {
      color: '#000',
      size: 4,
    },
  })

  drauu.on('changed', () => {
    canUndo.value = drauu.canUndo()
    canRedo.value = drauu.canRedo()
  })

  onMounted(() => {
    if (!svgEl.value)
      return

    drauu.mount(svgEl.value)
  })
  watch(mode, (v) => {
    drauu.mode = v
  })

  async function SVGtoBlob(svg: SVGElement, type = 'image/jpeg'): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      const canvas = document.createElement('canvas')
      canvas.height = svg.clientHeight
      canvas.width = svg.clientWidth
      const ctx = canvas.getContext('2d')
      ctx!.fillStyle = '#FFF'
      ctx!.fillRect(0, 0, canvas.width, canvas.height)
      const img = new Image()
      const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' })
      const url = DOMURL!.createObjectURL(blob)

      img.onload = function() {
        ctx!.drawImage(img, 0, 0)
        DOMURL!.revokeObjectURL(url)
        canvas.toBlob((blob) => {
          if (blob)
            resolve(blob)
          else
            resolve(null)
        }, type)
      }
      img.onerror = function(e) {
        reject(e)
      }
      img.src = url
    })
  }

  async function downloadImage() {
    const blob = await SVGtoBlob(drauu.el!)

    if (!blob)
      return

    const link = document.createElement('a')
    link.href = DOMURL!.createObjectURL(blob)
    link.download = 'hand-written.jpeg'
    document.body.appendChild(link)
    link.click()
  }

  const { data, loading, error, post, cancel } = useApi<HandwrittenResult>(`${DEMO_API_ENDPOINT}/handwritten`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
  })

  watch(data, async(v) => {
    if (!v) return
    // eslint-disable-next-line no-console
    if (isDev) console.log(v)
    modelText.value = v.text
    isModelOpen.value = true
  })

  async function uploadImage() {
    const blob = await SVGtoBlob(drauu.el!)
    if (!blob) return
    const formData = useFromData('image', blob, 'handwritten.jpg')
    await post(formData)
  }

  onUnmounted(() => {
    cancel()
  })

  return {
    drauu,
    mode,
    canUndo,
    canRedo,
    loading,
    error,
    modelText,
    isModelOpen,
    uploadImage,
    downloadImage,
  }
}
