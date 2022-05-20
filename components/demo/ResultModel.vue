
<script setup lang="ts">
defineProps<{
  open: boolean
  text?: string
}>()

defineEmits(['update:open'])
</script>

<template>
  <div v-if="open" class="absolute inset-0 ">
    <div
      class="
        relative h-full bg-gray-800 bg-opacity-50 rounded-xl
        backdrop-filter backdrop-blur-md
        flex items-center justify-center
        text-5xl font-semibold text-white md:text-6xl
      "
    >
      {{ text || $t('demos.handwritten-ocr.text-not-found') }}
      <div class="absolute top-0 right-0 p-6 text-lg">
        <div
          class="
            flex items-center justify-center p-2
            text-gray-800 bg-gray-100
            border border-gray-500 rounded-full
            hover:bg-opacity-75
            dark:(bg-gray-800 text-white)
          "
          @click="$emit('update:open', false)"
        >
          <UnoIcon i-ion-close-round />
        </div>
      </div>
    </div>
  </div>
</template>
