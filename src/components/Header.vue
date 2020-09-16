<template>
  <header class="flex-none flex items-center justify-between bg-header w-full h-18 text-white px-6">
    <router-link to="/" class="text-3xl font-bold">
      OVaaS
    </router-link>
    <div class="inline-block relative">
      <DarkSelect v-model="currentLang">
        <option v-for="lang in languages" :key="lang.locale" :value="lang.locale" :selected="lang.locale === currentLang">
          {{ lang.name }}
        </option>
      </DarkSelect>
    </div>
  </header>
</template>

<script setup>
import { watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
export { languages } from '/~/messages'
import { localeSchema } from "../store";

const { locale } = useI18n();

export const currentLang = computed({
  get() {
    return localeSchema.value;
  },
  set(v) {
    localeSchema.value = v;
  },
});

watch(
  currentLang,
  (v) => locale.value = v,
  { immediate: true },
);
</script>

<style>
</style>