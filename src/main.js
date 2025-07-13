// import './assets/main.css';
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const app = createApp(App)
// Add for console access in Vue components
// This allows you to use `console.log` in your Vue components
app.config.globalProperties.console = console
app.use(router)

app.mount("#app")
