<template>
  <div class="flex flex-col h-screen overflow-hidden text-gray-700 dark:text-gray-100">
    <Header />
    <div class="flex-auto flex overflow-hidden">
      <Navbar />
      <div class="flex-auto overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
  <FlashMessage />
</template>
