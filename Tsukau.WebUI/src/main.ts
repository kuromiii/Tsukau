import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'

import './assets/base.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(createVuetify())

app.mount('#app')
