import "./index.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";

// import routes generated by Voie
import routes from "voie-pages";
// import i18n messages
import { messages } from "./messages";
// import icons data generated by PurgeIcons
import "@purge-icons/generated";

import App from "./App.vue";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const i18n = createI18n({
  locale: "en",
  messages,
});

app.use(i18n);
app.use(router);

app.mount("#app");
