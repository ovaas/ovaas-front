import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'voie-pages'

export default (app: App) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  app.use(router)
}
