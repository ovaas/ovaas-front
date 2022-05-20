import { getMousePos } from '@/lib/utils'
import type { Ref } from 'vue'

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
  }
}
