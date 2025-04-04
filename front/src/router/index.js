import {createRouter,createWebHashHistory} from 'vue-router'
import { compareTime } from 'element-plus/es/components/time-select/src/utils.mjs';

const routes=[
    {
        name:'login',
        path:"/login",
        component:()=>import('../views/login/login.vue')  
    },{
        path:"/",
        redirect:'/login'
    },{
        name:'menu',
        path:"/menu",
        component:()=>import('../views/menu/index.vue'),
        children:[{
            name:'home',
            path:'home',
            component:()=>import('../views/home/index.vue')
        },{
            name:'set',
            path:'set',
            component:()=>import('../views/set/index.vue')
        },{
            name:'overview',
            path:'overview',
            component:()=>import('@/views/overview/index.vue')
        },{
            name:'product',
            path:'product',
            component:()=>import('@/views/product/product_manage/index.vue')
        },{
            name:'out_product',
            path:'out_product',
            component:()=>import('@/views/product/out_product_manage_list/index.vue')
        }                          
        ]
    },
    {
        name:'404',
        path:"/:pathMatch(.*)*",
        component:()=>import('../components/404.vue')
    },
];

const router=createRouter({
    history:createWebHashHistory(),
    routes,
});

router.beforeEach((to,from)=>{
    if(from.name='login'&&!sessionStorage.getItem('token')&&to.name!='login')return false;
})
export default router;

