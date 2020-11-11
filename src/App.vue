<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Header />
    <div class="flex-auto flex overflow-hidden">
      <SideMenu />
      <div class="flex-auto overflow-hidden">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
