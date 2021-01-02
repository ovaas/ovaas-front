<template>
  <div class="absolute top-0 right-0 inline-flex flex-col items-end m-4 z-20">
    <button id="shareBtn" class="text-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full p-2 focus:outline-none focus:ring-1 transition-all transform" :class="{'rotate-180': show}" @click.stop="show = !show">
      <bx-bx-share-alt v-if="!show" />
      <bx-bx-caret-down v-else class="transform rotate-180" />
    </button>
    <transition name="fade">
      <div v-if="show" class="bg-gray-100 dark:bg-gray-800 rounded-md p-1 mt-3 text-2xl inline-flex flex-col" @click.stop>
        <button :aria-label="t('share.twitter')" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none" @click.stop="shareToTwitter">
          <bx-bxl-twitter />
        </button>
        <button :aria-label="t('share.instagram')" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none">
          <bx-bxl-instagram />
        </button>
        <button :aria-label="t('share.facebook')" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none">
          <bx-bxl-facebook-square />
        </button>
        <button :aria-label="t('share.download')" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none" @click.stop="downloadImage">
          <bx-bx-cloud-download />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const show = ref(false)

const props = defineProps({
  image: {
    type: String,
    require: true,
  },
})

const shareToTwitter = () => {
  const text = 'Some Image using OVaaS power by OpenVINO'
  const url = `https://twitter.com/intent/tweet?text=${text}`

  window.open(url, '_blank')
}

const downloadImage = () => {
  if (!props.image) return
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.download = 'human-pose.jpg'
  a.href = props.image
  a.click()
  a.remove()
}

// Click any where to close
onMounted(() => {
  document.addEventListener('click', () => {
    if (!show.value) return
    show.value = false
  })
})
// Remove event listener
onUnmounted(() => {
  window.removeEventListener('click', () => {
    show.value = false
  })
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
