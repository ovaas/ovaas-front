<template>
  <header class="flex-none flex bg-gray-500 dark:bg-gray-600 w-full h-16 basic-transition">
    <div class="w-18 h-full bg-gray-700 dark:bg-gray-900 inline-flex justify-center items-center">
      <img src="/~/assets/logo.svg" width="30" height="30" alt="Icon">
    </div>
    <div class="flex-auto flex h-full justify-between items-center mx-4 md:mx-6">
      <router-link to="/" class="text-white">
        <h1 class="text-3xl font-bold leading-none">
          OVaaS
        </h1>
      </router-link>
      <div class="inline-flex h-full items-center">
        <LanguageSelect />
        <DarkSwitch class="md:hidden" />
      </div>
    </div>
  </header>
</template>
