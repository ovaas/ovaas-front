<template>
  <div class="relative h-full">
    <div class="flex items-center h-full px-3 text-2xl text-white md:px-5" @mouseenter="show = true">
      <vs-language />
    </div>
    <transition name="slide-fade">
      <div v-show="show" class="absolute top-0 right-0 pr-2 pt-14" @mouseleave="show = false">
        <div class="bg-white dark:bg-gray-700 inline-flex flex-col rounded-md p-1.5 shadow-md">
          <button
            v-for="lang in languages"
            :key="lang.locale"
            class="w-full px-3 py-1 text-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:text-gray-500 dark:focus:text-gray-400"
            :value="lang.locale"
            :selected="lang.locale === currentLang"
            @click="currentLang = lang.locale"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, toRaw, defineProps, defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'
import { languages } from '/~/messages'
import { usePreferredLanguages } from '@vueuse/core'
import { localeSchema } from '../logics'

const show = ref(false)

const props = defineProps({
  modelValue: {
    type: String,
    require: true,
  },
})

const emit = defineEmit(['update:modelValue'])

const preferredLangs = usePreferredLanguages()
const { locale, availableLocales } = useI18n()

const currentLang = computed<string>({
  get() {
    const preferredLang = preferredLangs.value[0]
    return localeSchema.value
      ? localeSchema.value
      : localeSchema.value
      = availableLocales.includes(preferredLang) ? preferredLang : availableLocales[0]
  },
  set(v) {
    localeSchema.value = v
  },
})

watch(currentLang, (v) => {
  if (typeof document !== 'undefined')
    document.documentElement.lang = v
  locale.value = v
},
{ immediate: true })
</script>

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
