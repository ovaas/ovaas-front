<template>
  <aside class="flex-none flex flex-col items-center bg-gray-700 h-full w-18 p-2">
    <router-link to="/">
      <NavLink :title="t('pages-title.home')" icon="bx:bx-home" />
    </router-link>
    <router-link to="/history">
      <NavLink :title="t('pages-title.history')" icon="bx:bx-history" />
    </router-link>
    <router-link to="/settings">
      <NavLink :title="t('pages-title.settings')" icon="bx:bx-cog" />
    </router-link>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
export { t }
</script>

<style>

</style>