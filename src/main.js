import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createUnhead, headSymbol } from '@unhead/vue'
import router from './router/index.js'
import App from './App.vue'
import './assets/styles.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide(headSymbol, createUnhead())

app.mount('#app')
