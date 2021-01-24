import { Image } from 'image-js'

export const inBrowser = typeof window !== 'undefined'

export async function resizeImage(file: File) {
  const load = await Image.load(await file.arrayBuffer())
  const defaultHW = 2000
  let options: {
    width?: number
    height?: number
  }
  load.width >= load.height ? options = { width: defaultHW } : options = { height: defaultHW }
  const resized = load.resize(options)
  return await resized.toBlob('image/jpeg')
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
