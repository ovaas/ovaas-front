<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { localeSchema } from '#imports'
const show = ref(false)
const { locale, availableLocales } = useI18n()

const languageName: Record<string, string> = {
  en: 'English',
  ja: '日本語',
}

syncRef(localeSchema, locale)

watch(locale, (v) => {
  if (typeof document !== 'undefined')
    document.documentElement.lang = v
},
{ immediate: true })

onMounted(() => {
  document.addEventListener('click', () => {
    show.value = false
  })
})
onUnmounted(() => {
  document.removeEventListener('click', () => {})
})
</script>

<template>
  <div class="relative h-full" @click.stop="show = true" @mouseenter="show = true" @mouseleave="show = false">
    <div class="flex items-center p-2 text-2xl text-white hover:text-gray-300">
      <UnoIcon i-vs-language />
    </div>
    <transition name="slide-fade">
      <div v-show="show" class="absolute top-0 left-0 pt-12">
        <div class="bg-dark-100 dark:bg-dark-200 inline-flex flex-col rounded-md p-1.5 shadow-md">
          <button
            v-for="lang in availableLocales"
            :key="lang"
            class="
              w-full px-4 py-1.5
              text-center rounded-md
              hover:bg-dark-300
              focus:(outline-none text-true-gray-400)
              dark:hover:bg-dark-400
              dark:focus:text-gray-400
            "
            :value="lang"
            :selected="lang === locale"
            @click="locale = lang"
          >
            {{ languageName[lang] }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
