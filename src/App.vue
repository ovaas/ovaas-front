<template>
  <div class="flex flex-wrap h-full">
    <Header />
    <SideMenu />
    <div class="flex-1 px-4 py-10 text-center text-white">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
