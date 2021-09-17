import Compressor from 'compressorjs'

export const inBrowser = typeof window !== 'undefined'
export const isDev = import.meta.env.DEV
export const DOMURL = window.URL || window.webkitURL || window

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
