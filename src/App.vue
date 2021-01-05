<template>
  <div class="flex flex-col h-screen overflow-hidden text-gray-700 dark:text-gray-100">
    <Header />
    <div class="flex flex-auto overflow-hidden">
      <Navbar />
      <div class="flex-auto overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
  <FlashMessage />
</template>

<script setup lang="ts">
import { usePrefetch } from '/~/logics/preFetch'
if (import.meta.env.PROD) {
  // in prod mode, enable intersectionObserver based pre-fetch
  usePrefetch()
}
</script>
