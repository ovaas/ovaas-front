<template>
  <div class="flex flex-col h-screen text-gray-700 dark:text-gray-100">
    <Header />
    <div class="flex flex-auto">
      <Navbar />
      <div class="flex-auto overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
  <FlashMessage />
</template>
