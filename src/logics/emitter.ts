import mitt from 'mitt'

export type Colors = 'green' | 'red' | 'yellow' | 'white'
export type FlashPayload = { color: Colors; message: string }
export const FLASH_EVENT = Symbol('flashMessage')

export const emitter = mitt()

export const enum EmitTypes {
  Success = 'green',
  Danger = 'red',
  Warning = 'yellow',
  Info = 'white'
}

export const flash = (color: EmitTypes, message: string): void => {
  emitter.emit<FlashPayload>(FLASH_EVENT, {
    message,
    color,
  })
}
