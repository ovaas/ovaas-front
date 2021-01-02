<template>
  <aside class="flex-none hidden md:flex flex-col items-center bg-gray-300 dark:bg-gray-700 h-full w-18 p-2 text-gray-800 dark:text-white">
    <router-link to="/">
      <NavItem>
        <bx-bx-home class="text-2xl mb-1" />
        <p class="text-xs font-bold">
          {{ t('pages-title.home') }}
        </p>
      </NavItem>
    </router-link>
    <div class="cursor-pointer" @click="isDark = !isDark">
      <NavItem>
        <bx-bx-sun v-if="isDark" class="text-2xl mb-1" />
        <bx-bx-moon v-else class="text-2xl mb-1" />
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
