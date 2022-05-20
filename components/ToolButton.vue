<template>
  <button
    w-8
    h-8
    inline-flex
    justify-center
    items-center
    outline-none
    class="disabled:(text-true-gray-300 cursor-not-allowed dark:text-true-gray-600)"
    active="bg-gray-100 dark:bg-dark-300 rounded"
    focus="bg-gray-200 dark:bg-dark-200 rounded"
  >
    <slot />
  </button>
</template>
