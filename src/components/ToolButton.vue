<template>
  <button>
    <slot />
  </button>
</template>
<style scoped lang="postcss">
button {
  @apply !outline-none w-8 h-8 inline-flex justify-center items-center disabled:(text-true-gray-300 cursor-not-allowed) dark:disabled:text-true-gray-600;

  &.active {
    @apply bg-gray-100 dark:bg-dark-300 rounded;
  }

  &:focus {
    @apply bg-gray-200 dark:bg-dark-200 rounded;
  }
}
</style>
