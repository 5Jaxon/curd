import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './store/index'
import * as elementPlusIconsVue from '@element-plus/icons-vue'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/common.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import setRoutes from './store/setRoute'
const app=createApp(App);
for(const [key,component] of Object.entries(elementPlusIconsVue)){
    app.component(key,component);
}
app.use(elementPlus,{
    locale:zhCn,
})
app.use(pinia);
let routeStore=setRoutes();
routeStore.setRoute(routeStore.routeLocal);
app.use(router);

app.mount('#app');
