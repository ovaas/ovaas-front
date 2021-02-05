<template>
  <transition name="popup">
    <div v-show="show" class="fixed inset-x-0 z-50 flex justify-center text-gray-700 transition-all transform bottom-4 dark:text-gray-100">
      <div
        class="relative px-8 py-3 rounded-md"
        :class="[color, textColor]"
      >
        <button class="absolute top-0 right-0 p-1 delete" @click="hideMessage">
          <jam-close-circle-f />
        </button>
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { emitter, FLASH_EVENT } from '../logics/emitter'
import type { FlashPayload, Colors } from '../logics/emitter'
import { isDark } from '~/logics/dark'

const show = ref(false)
const message = ref('')
const emitColor = ref<Colors>()
const textColor = computed(() => {
  return emitColor.value === 'yellow' || emitColor.value === 'white' ? 'text-gray-700' : ''
})
const color = computed(() => {
  return isDark.value
    ? darkColors[emitColor.value || 'green']
    : lightColors[emitColor.value || 'green']
})
const timeoutId = ref<number | null>(null)

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

const setTransitionDelay = () => {
  if (!show.value) return
  show.value = false
  if (timeoutId.value)
    clearTimeout(timeoutId.value)
  timeoutId.value = window.setTimeout(() => show.value = true, 150)
}

const hideMessage = () => {
  show.value = false
}

const setDelayedHide = () => {
  if (timeoutId.value)
    clearTimeout(timeoutId.value)
  timeoutId.value = window.setTimeout(hideMessage, 3000)
}

const showMessage = (payload: FlashPayload) => {
  setTransitionDelay()
  message.value = payload.message
  emitColor.value = payload.color
  show.value = true
  setDelayedHide()
}

onMounted(() => {
  emitter.on<FlashPayload>(FLASH_EVENT, (e) => {
    if (!e) return
    showMessage(e)
  })
})
</script>

<style scoped lang='postcss'>
.popup-leave-active {
  @apply -translate-y-0 opacity-100;
}
.popup-leave-to {
  @apply translate-y-6 opacity-0;
}
.popup-enter-active {
  @apply translate-y-6 opacity-0;
}
.popup-enter-to {
  @apply -translate-y-0 opacity-100;
}
</style>
