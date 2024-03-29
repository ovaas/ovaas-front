<script setup lang="ts">
import type { Colors } from '@@/lib/types'

const show = ref(false)
const message = ref('')

const emitColor = ref<Colors>()
const textColor = computed(() => {
  return emitColor.value === 'yellow' || emitColor.value === 'white' ? 'text-gray-700' : ''
})

const lightColors: {[key in Colors]: string} = {
  green: 'bg-green-400',
  red: 'bg-red-400',
  yellow: 'bg-yellow-300',
  white: 'bg-white',
}

const darkColors: {[key in Colors]: string} = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-300',
  white: 'bg-white',
}

const color = computed(() => {
  return isDark.value
    ? darkColors[emitColor.value || 'green']
    : lightColors[emitColor.value || 'green']
})

const timeoutId = ref<number | null>(null)

const setTransitionDelay = () => {
  if (!show.value) return
  show.value = false
  if (timeoutId.value)
    clearTimeout(timeoutId.value)
  timeoutId.value = window.setTimeout(() => {
    show.value = true
  }, 150)
}

const hideMessage = () => {
  show.value = false
}

const setDelayedHide = () => {
  if (timeoutId.value)
    clearTimeout(timeoutId.value)
  timeoutId.value = window.setTimeout(hideMessage, 3000)
}

onFlash((e) => {
  setTransitionDelay()
  message.value = e.message
  emitColor.value = e.color
  show.value = true
  setDelayedHide()
})
</script>

<template>
  <transition name="popup">
    <div
      v-show="show"
      class="
        fixed inset-x-0 bottom-4 z-50
        flex justify-center
        transition-all transform
        text-gray-700
        dark:text-gray-100
      "
    >
      <div
        class="relative px-8 py-3 rounded-md"
        :class="[color, textColor]"
      >
        <button class="absolute top-0 right-0 p-1 delete focus:outline-none" @click="hideMessage">
          <UnoIcon i-jam-close-circle-f />
        </button>
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<style scoped lang='postcss'>
.popup-leave-active,
.popup-enter-to {
  @apply -translate-y-0 opacity-100;
}
.popup-enter-active,
.popup-leave-to {
  @apply translate-y-6 opacity-0;
}
</style>
