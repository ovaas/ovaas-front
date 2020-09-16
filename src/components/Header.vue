<template>
  <header class="flex-none flex items-center justify-between bg-header w-full h-18 text-white px-6">
    <router-link to="/" class="text-3xl font-bold">
      OVaaS
    </router-link>
    <div class="inline-block relative">
      <DarkSelect v-model="locale">
        <option v-for="lang in languages" :key="lang.locale" :value="lang.locale">
          {{ lang.name }}
        </option>
      </DarkSelect>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { languages } from '/~/messages'

const { locale } = useI18n()

export {
  locale,
  languages
}
</script>

<style>
</style>