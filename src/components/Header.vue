<template>
  <header class="flex-none flex items-center justify-between bg-gray-500 dark:bg-gray-600 w-full h-16 basic-transition">
    <div class="flex h-full items-center">
      <div class="w-18 h-full bg-gray-700 dark:bg-gray-900 flex justify-center items-center">
        <img src="/~/assets/logo.svg" width="30" height="30" alt="Icon">
      </div>
      <router-link to="/" class="inline-flex text-white">
        <h1 class="text-3xl font-bold leading-none ml-6">
          OVaaS
        </h1>
      </router-link>
    </div>
    <LanguageSelect />
  </header>
</template>

<script setup lang="ts">
</script>

<style>
</style>
