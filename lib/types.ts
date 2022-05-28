export type Colors = 'green' | 'red' | 'yellow' | 'white'
export interface FlashPayload { color: Colors, message: string }

// export interface Demo {
//   title: string
//   image: string
//   content: string
//   path: string
// }

export interface SiteData {
  title: string
  description: string
}

export interface HandwrittenResult {
  count: number
  timecost: number
  text: string
}

export interface FieldSchema {
  as?: string
  name: string
  label: string
  sublabel?: string
  [k: string]: any
}

export interface FormSchema {
  fields: FieldSchema[]
  validation: any
  values?: Record<string, any>
  submitText: string
}
