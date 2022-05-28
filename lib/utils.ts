import Compressor from 'compressorjs'

export const inBrowser = typeof window !== 'undefined'
export const isDev = import.meta.env.DEV
export const DOMURL = inBrowser ? window.URL || window.webkitURL || window : null

export async function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      maxHeight: 2000,
      maxWidth: 2000,
      success(result) {
        resolve(result)
      },
      error(err) {
        reject(err)
      },
    })
  })
}

export function getMousePos(
  canvasDom: HTMLCanvasElement,
  x: number,
  y: number,
) {
  const rect = canvasDom.getBoundingClientRect()
  return {
    x: x - rect.left,
    y: y - rect.top,
  }
}

export async function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob)
        resolve(blob)
      else
        resolve(null)
    }, 'image/jpeg')
    canvas.onerror = function(e) {
      reject(e)
    }
  })
}

export function downloadBlobFile(blob: Blob) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'hand-written.jpeg'
  document.body.appendChild(link)
  link.click()
}
