<script setup lang="ts">
import { AccessToken } from '@/logics'

const { t } = useI18n()
const router = useRouter()

function logout() {
  AccessToken.value = ''
  router.push('/')
}
</script>

<template>
  <button v-if="AccessToken" class="btn" @click="logout()">
    {{ t('button.logout') }}
  </button>
</template>
