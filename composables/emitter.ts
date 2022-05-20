import mitt from 'mitt'
import type { EventType } from 'mitt'
import type { Colors, FlashPayload } from '~~/lib/types'

export const FLASH_EVENT = Symbol('flashMessage')

interface Event {
  [key: EventType]: unknown
  [FLASH_EVENT]: FlashPayload
}

export const emitter = mitt<Event>()

export const EmitTypes = {
  Success: 'green',
  Danger: 'red',
  Warning: 'yellow',
  Info: 'white',
} as const

export const flash = (color: Colors, message: string): void => {
  emitter.emit(FLASH_EVENT, {
    message,
    color,
  })
}

export function onFlash(fn: (event: FlashPayload) => void) {
  onMounted(() => {
    emitter.on(FLASH_EVENT, (event) => {
      if (!event) return
      fn(event)
    })
  })
}
