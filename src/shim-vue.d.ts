declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const Component: ReturnType<ComponentOptions>
  export default component
}
