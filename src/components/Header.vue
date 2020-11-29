<template>
  <header class="flex-none flex items-center justify-between bg-blue-600 w-full h-16 text-white">
    <div class="flex h-full items-center">
      <div class="w-18 h-full bg-blue-900 flex justify-center items-center">
        <img src="/favicon.svg" alt="Icon" class="h-8 w-8">
      </div>
      <router-link to="/" class="inline-flex">
        <h1 class="text-3xl font-bold leading-none ml-6">
          OVaaS
        </h1>
      </router-link>
    </div>
    <div class="inline-block px-6">
      <DarkSelect v-model="currentLang">
        <option v-for="lang in langs" :key="lang.locale" :value="lang.locale" :selected="lang.locale === currentLang">
          {{ lang.name }}
        </option>
      </DarkSelect>
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { languages as langs } from '/~/messages'
import { usePreferredLanguages } from '@vueuse/core'
import { localeSchema } from '../logics'

const languages = usePreferredLanguages()
const { locale } = useI18n()

const currentLang = computed({
  get() {
    return localeSchema.value
  },
  set(v) {
    localeSchema.value = v
  },
})

watch(languages, (val) => {
  if (val[0] === 'ja')
    currentLang.value = 'ja'

  else
    currentLang.value = 'en'
}, { immediate: true })

watch(
  currentLang,
  v => locale.value = v,
  { immediate: true },
)
</script>

<style>
</style>
