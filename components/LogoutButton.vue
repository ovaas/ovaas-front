<script setup lang="ts">
import { accessToken } from '#imports'

const router = useRouter()

function logout() {
  accessToken.value = ''
  router.push('/')
}
</script>

<template>
  <button v-if="accessToken" class="btn" @click="logout()">
    {{ $t('button.logout') }}
  </button>
</template>
