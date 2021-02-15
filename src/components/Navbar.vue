<template>
  <aside class="flex-col items-center flex-none hidden p-2 text-gray-800 bg-gray-300 md:flex dark:bg-gray-700 w-18 dark:text-white">
    <router-link to="/">
      <NavItem>
        <bx-bx-home class="mb-1 text-2xl" />
        <p class="text-xs font-bold">
          {{ t('pages-title.home') }}
        </p>
      </NavItem>
    </router-link>
    <div class="cursor-pointer" @click="isDark = !isDark">
      <NavItem>
        <bx-bx-sun v-if="isDark" class="mb-1 text-2xl" />
        <bx-bx-moon v-else class="mb-1 text-2xl" />
        <p class="text-xs font-bold">
          {{ isDark ? t('colorMode.light') : t('colorMode.dark') }}
        </p>
      </NavItem>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { isDark } from '~/logics'

const { t } = useI18n()
</script>
