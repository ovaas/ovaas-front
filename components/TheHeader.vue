<template>
  <header
    sticky
    top-0
    w-full
    z-50
    bg-opacity-80
    backdrop-filter
    backdrop-blur-lg
    bg-black
    text-white
    dark:bg-dark-300
    class="h-$header-height"
  >
    <div class="flex items-center justify-between h-full max-w-screen-xl mx-auto px-4 lg:px-6">
      <NuxtLink to="/" class="flex space-x-6">
        <img src="/images/logo.png" width="30" height="30" alt="Icon">
        <h1 class="text-3xl font-bold leading-none">
          OVAAS
        </h1>
      </NuxtLink>
      <div class="flex space-x-2 md:space-x-6">
        <LanguageSelect />
        <ToggleDark />
        <LogoutButton />
      </div>
    </div>
  </header>
</template>
