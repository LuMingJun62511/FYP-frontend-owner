import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import store from './store'
// import axios from 'axios'
// import VueAxios from 'vue-cli-plugin-axios'
// import SuiVue from 'semantic-ui-vue'

// createApp(App).use(VueAxios, axios).use(SuiVue).use(store).use(router).mount('#app')
// createApp(App).use(ElementPlus).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.$log = console.log

app.use(router)
app.use(ElementPlus)

app.mount('#app')
