<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { generateHeadMeta } from '@/logics/meta'

const siteData = reactive({
  title: 'OVaaS - OpenVINO as a service',
  description: 'No setup! No command! No code! Easy to use OpenVINO™ demo website.',
})
useHead(generateHeadMeta(siteData))
</script>

<template>
  <div class="flex flex-col h-screen text-gray-700 dark:text-gray-100">
    <Header />
    <div class="flex flex-auto pt-16 md:pt-0">
      <Navbar />
      <div class="flex-auto overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
  <FlashMessage />
</template>
