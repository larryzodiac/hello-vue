import { createApp } from "vue";
import App from "./App.vue";
import ProfileContact from './components/ProfileContact';

const app = createApp(App);
app.component('profile-contact', ProfileContact);
app.mount("#app");
