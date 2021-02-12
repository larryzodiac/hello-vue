import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseBadge from "./components/ui/BaseBadge.vue";

createApp(App)
  .component("base-badge", BaseBadge)
  .use(store)
  .use(router)
  .mount("#app");
