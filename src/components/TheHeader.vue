<template>
  <header class="d-header">
    <div class="flex items-center justify-between h-full max-w-screen-xl mx-auto px-4 lg:px-6">
      <router-link to="/" class="flex space-x-6">
        <img src="/images/logo.svg" width="30" height="30" alt="Icon">
        <h1 class="text-3xl font-bold leading-none">
          OVaaS
        </h1>
      </router-link>
      <div class="flex space-x-2 md:space-x-6">
        <LanguageSelect />
        <ToggleDark />
        <LogoutButton />
      </div>
    </div>
  </header>
</template>
