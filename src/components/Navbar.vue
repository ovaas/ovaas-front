<template>
  <aside class="flex-none flex flex-col items-center bg-gray-300 dark:bg-gray-700 h-full w-18 p-2 text-gray-800 dark:text-white">
    <router-link to="/">
      <NavItem>
        <Icon class="text-2xl mb-1" icon="bx:bx-home" />
        <p class="text-xs font-bold">
          {{ t('pages-title.home') }}
        </p>
      </NavItem>
    </router-link>
    <div class="cursor-pointer" @click="isDark = !isDark">
      <NavItem>
        <Icon :icon="isDark ? 'bx:bx-sun' : 'bx:bx-moon'" class="text-2xl mb-1" />
        <p class="text-xs font-bold">
          {{ isDark ? t('colorMode.light') : t('colorMode.dark') }}
        </p>
      </NavItem>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { isDark } from '/~/logics'

const { t } = useI18n()
</script>

<style>

</style>
