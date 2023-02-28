import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store/index'



const app = createApp(App)
app.config.globalProperties.$log = console.log
app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
