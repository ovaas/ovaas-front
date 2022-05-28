import { getMousePos } from '@/lib/utils'
import type { Ref } from 'vue'
import { canvasToBlob, downloadBlobFile } from '@/lib/utils'

export function useCanvas(
  canvas: Ref<HTMLCanvasElement | null>,
  box: Ref<HTMLElement | null>,
) {
  let ctx: CanvasRenderingContext2D

  onMounted(() => {
    if (!canvas.value || !box.value) return
    canvas.value.width = box.value.offsetWidth
    canvas.value.height = box.value.offsetHeight
    ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    canvas.value.addEventListener('mousedown', doMouseDown)
    canvas.value.addEventListener('mousemove', doMouseMove)
    canvas.value.addEventListener('mouseup', doEnd)
    canvas.value.addEventListener('touchstart', doTouchStart)
    canvas.value.addEventListener('touchmove', doTouchMove)
    canvas.value.addEventListener('touchend', doEnd)
  })
  onUnmounted(() => {
    canvas.value?.removeEventListener('mousedown', doMouseDown)
    canvas.value?.removeEventListener('mousemove', doMouseMove)
    canvas.value?.removeEventListener('mouseup', doEnd)
    canvas.value?.removeEventListener('touchstart', doTouchStart)
    canvas.value?.removeEventListener('touchmove', doTouchMove)
    canvas.value?.removeEventListener('touchend', doEnd)
  })
  let draw = false
  const color = '#000000'
  const lineWidth = 10

  const STACK_MAX_SIZE = 30
  const undoDataStack = ref<ImageData[]>([])
  const redoDataStack = ref<ImageData[]>([])

  const clearAll = () => {
    undoDataStack.value = []
    redoDataStack.value = []
    ctx.fillStyle = '#FFFFFF'
    if (!canvas.value) return
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  }

  const saveDraw = () => {
    redoDataStack.value = []
    if (undoDataStack.value.length >= STACK_MAX_SIZE)
      undoDataStack.value.pop()
    if (!canvas.value) return
    undoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height))
  }

  const undo = () => {
    if (undoDataStack.value.length <= 0) return
    if (canvas.value)
      redoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height))
    const imageData = undoDataStack.value.shift() as ImageData
    ctx.putImageData(imageData, 0, 0)
  }

  const redo = () => {
    if (redoDataStack.value.length <= 0) return
    if (canvas.value)
      undoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height))
    const imageData = redoDataStack.value.shift() as ImageData
    ctx.putImageData(imageData, 0, 0)
  }

  const doMouseDown = (e: MouseEvent) => {
    saveDraw()
    draw = true
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    const { x, y } = getMousePos(canvas.value!, e.clientX, e.clientY)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const doTouchStart = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    saveDraw()
    draw = true
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    const { x, y } = getMousePos(canvas.value!, touch.clientX, touch.clientY)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const doMouseMove = (e: MouseEvent) => {
    if (!draw) return
    const { x, y } = getMousePos(canvas.value!, e.clientX, e.clientY)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const doTouchMove = (e: TouchEvent) => {
    if (!draw) return
    const touch = e.changedTouches[0]
    const { x, y } = getMousePos(canvas.value!, touch.clientX, touch.clientY)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const doEnd = () => {
    draw = false
  }

  const disableUndo = computed(() => {
    return undoDataStack.value.length === 0
  })
  const disableRedo = computed(() => {
    return redoDataStack.value.length === 0
  })

  const toBlob = () => canvasToBlob(canvas.value!)

  async function download() {
    const blob = await toBlob()
    if (!blob)
      return
    downloadBlobFile(blob)
  }

  return {
    clearAll,
    undo,
    redo,
    doMouseDown,
    doMouseMove,
    doTouchStart,
    doTouchMove,
    doEnd,
    disableUndo,
    disableRedo,
    download,
    toBlob,
  }
}
