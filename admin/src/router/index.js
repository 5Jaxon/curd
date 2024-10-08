import login from '../views/login/login.vue'
import main from '../views/main.vue'
import {createRouter,createWebHashHistory} from 'vue-router'

const routes=[
    {
        path:"/",
        component:main
    },{
        path:"/login",
        component:login  
    }
];

const route=createRouter({
    routes,
    history:createWebHashHistory()
});
export default route;

