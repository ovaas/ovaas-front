<script setup lang="ts">
defineProps<{
  loading: boolean
  isDisabled: boolean
}>()

defineEmits(['click'])
</script>

<template>
  <button class="bg-white border border-gray-300 dark:(bg-dark-500 border-dark-100) hover:bg-gray-50 dark:hover:bg-dark-300 py-1.5 px-3.5 rounded-lg inline-flex shadow-sm items-center focus:outline-none" :disabled="isDisabled" :class="{ 'opacity-50 cursor-not-allowed': isDisabled }" @click="$emit('click', $event)">
    <div class="inline-flex items-center justify-center mr-2 -ml-1 h-7 w-7">
      <UnoIcon v-if="loading" i-bx-bx-refresh class="text-2xl sm:animate-spin" />
      <UnoIcon v-else i-bx-bx-cloud-upload class="text-2xl" />
    </div>
    {{ $t('upload.recognize') }}
  </button>
</template>
