import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
const useRoute = defineStore('setRoute', ()=>{
    let routeLocal=ref([]);

    const setRoute=(routes)=>{
        routeLocal.value=routes;        
        let module=import.meta.glob('@/views/**/*.vue');
        routes.map(route => {
            let comp=module[`/src/views/${route.component}`]
            const temp={
                path:route.path,
                name:route.name,
                component:comp
            }
            router.addRoute('menu',temp)
        });
    }

    return {setRoute,routeLocal}
},{
    persist:{
        storage:sessionStorage,
    }
})

export default useRoute