<template>
  <aside class="flex flex-col items-center bg-gray-600 h-full w-18 p-2">
    <router-link v-slot="{ isActive }" to="/">
      <NavLink text="Home" icon="bx:bx-home" :is-active="isActive" />
    </router-link>
    <router-link to="/history">
      <NavLink text="History" icon="bx:bx-history" :is-active="isActive" />
    </router-link>
    <router-link to="/settings">
      <NavLink text="Settings" icon="bx:bx-cog" :is-active="isActive" />
    </router-link>
  </aside>
</template>

<script>
export default {

}
</script>

<style>

</style>