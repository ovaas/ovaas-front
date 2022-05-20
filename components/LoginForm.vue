<script setup lang="ts">
import type { FormSchema } from '@/lib/types'

const router = useRouter()
const config = useRuntimeConfig().public

const schema: FormSchema = {
  fields: [
    {
      name: 'user',
      type: 'user',
      label: 'form.username',
      placeholder: 'username',
    },
    {
      name: 'password',
      type: 'password',
      label: 'form.password',
      placeholder: '●●●●●●●●',
    },
  ],
  validation: {
    user: 'required',
    password: 'required',
  },
  submitText: 'form.login',
}

interface LoginRes {
  access_token: string
}

const { loading, post, data } = useApi<LoginRes>(`${config.apiUrl}/auth`)

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2)) // eslint-disable-line no-alert
  post({
    password: values.password,
    user: values.user,
  })
}

watch(data, (v) => {
  if (!v) return
  accessToken.value = v.access_token
  router.push('/')
})

onMounted(() => {
  if (accessToken.value)
    router.push('/')
})
</script>

<template>
  <div class="bg-dark-400 rounded-xl p-8 max-w-sm w-full">
    <header class="mb-5">
      <h2 class="text-2xl font-bold">
        {{ $t('pages-title.login') }}
      </h2>
    </header>
    <DynamicForm :schema="schema" :is-loading="loading" @submit="onSubmit" />
  </div>
</template>
