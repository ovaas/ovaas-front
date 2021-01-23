<template>
  <header class="flex flex-none w-full h-16 bg-gray-500 dark:bg-gray-600 basic-transition">
    <div class="inline-flex items-center justify-center h-full md:bg-gray-700 w-18 md:dark:bg-gray-900">
      <img src="/~/assets/logo.svg" width="30" height="30" alt="Icon">
    </div>
    <div class="flex items-center justify-between flex-auto h-full mr-3 md:mx-6">
      <router-link to="/" class="inline-flex text-white">
        <h1 class="text-3xl font-bold leading-none">
          OVaaS
        </h1>
      </router-link>
      <div class="inline-flex items-center h-full">
        <LanguageSelect />
        <DarkSwitch class="md:hidden" />
      </div>
    </div>
  </header>
</template>
