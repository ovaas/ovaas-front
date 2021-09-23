<script setup lang="ts">
import type { FormSchema } from '@/types'
import { useApi } from "../logics/axios"

const { t } = useI18n()

const schema: FormSchema = {
  fields: [
    {
      name: 'password',
      type: 'password',
      label: 'form.password',
      placeholder: '●●●●●●●●',
    },
  ],
  validation: {
    password: 'required',
  },
  submitText: 'form.login',
}

const loading = ref(false)

function onSubmit(values: any) {
  loginUseApi("/api/v1/auth")
  alert(JSON.stringify(values, null, 2))
}

function loginUseApi(path: string) {
  const { loading, post} = useApi<Blob>(`${path}`,{
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  })

  post({'Password': 'pass'}) // TODO: 入力されたpassを入れる

  return (
    loading
  )
}

// function loginProcess(){
//   axios.post("/api/v1/auth", {
//       // TODO: 送信データを決める
//       password: "password"
//     })
//     .then(function(res) {
//       // TODO: ログイン成功
//       // TODO: loading refをfalseに更新
//       console.log(res);
//     })
//     .catch(function(err) {
//       console.error(err)
//     });
// }

</script>

<template>
  <div class="bg-dark-400 rounded-xl p-8 max-w-sm w-full">
    <header class="mb-5">
      <h2 class="text-2xl font-bold">
        {{ t('pages-title.login') }}
      </h2>
    </header>
    <DynamicForm :schema="schema" :is-loading="loading" @submit="onSubmit" />
  </div>
</template>
