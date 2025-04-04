import instance from '../http/index'

export const getUser=()=>{
    return instance({
        url:'/overview/getUser',
        method:'POST',        
    })
}

export const getProduct=()=>{
    return instance({
        url:'/overview/getProduct',
        method:'POST',        
    })
}

export const getMessage=()=>{
    return instance({
        url:'/overview/getMessage',
        method:'POST',        
    })
}

export const getLogin=()=>{
    return instance({
        url:'/overview/getLogin',
        method:'POST',        
    })
}