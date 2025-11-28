import './assets/main.css'
import 'vue-loading-overlay/dist/css/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App)

app.use(createPinia())

app.use(router)

app.mount('#app')
