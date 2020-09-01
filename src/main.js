import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import routes from 'voie-pages'

import App from './App.vue'
import './index.css'
import '@purge-icons/generated'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)

app.mount('#app')
