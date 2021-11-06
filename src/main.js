import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/store";
import axios from "axios";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "normalize.css";

const server = localStorage.getItem("server") || "http://127.0.0.1:8000";
axios.defaults.baseURL = server;

const app = createApp(App)
  .use(store)
  .use(router, axios);
app.config.globalProperties.axios = axios;

app.mount("#app");
