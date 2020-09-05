<template>
  <aside class="flex-none flex flex-col items-center bg-gray-600 h-full w-18 p-2">
    <router-link to="/">
      <NavLink text="Home" icon="bx:bx-home" />
    </router-link>
    <router-link to="/history">
      <NavLink text="History" icon="bx:bx-history" />
    </router-link>
    <router-link to="/settings">
      <NavLink text="Settings" icon="bx:bx-cog" />
    </router-link>
  </aside>
</template>

<script>
export default {

}
</script>

<style>

</style>