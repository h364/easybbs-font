import './assets/base.scss'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'

import Dialog from '@/components/Dialog.vue'

import Verify from '@/utiles/Verify.js'
import Confirm from '@/utiles/Confirm.js'
import Request from '@/utiles/Request.js'
import Message from '@/utiles/Message.js'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.component("Dialog", Dialog)

app.config.globalProperties.Verify = Verify
app.config.globalProperties.Confirm = Confirm
app.config.globalProperties.Request = Request
app.config.globalProperties.Message = Message
app.config.globalProperties.VueCookies = VueCookies
app.config.globalProperties.GlobalInfo = {
    bodyWidth: 1300,
}

app.mount('#app')
