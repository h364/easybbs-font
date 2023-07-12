import './assets/base.scss'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.config.globalProperties.VueCookies = VueCookies
app.config.globalProperties.GlobalInfo = {
    bodyWidth: 1300,
}

app.mount('#app')
