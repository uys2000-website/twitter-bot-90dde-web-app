import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/Router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import "@/services/debugLogger";

createApp(App).use(Quasar, quasarUserOptions).use(router).mount("body");
