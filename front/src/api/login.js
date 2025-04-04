import instance from '@/http/index.js'

//注册
export const register = data=>{
    const{
        account,
        password
    }=data;
    return instance({
        url:'/api/register',
        method:'POST',
        data:{
            account,
            password
        }
    })
}

//登录
export const login = data=>{
    const{
        account,
        password
    }=data;
    return instance({
        url:'/api/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}

export const verify = data=>{
    const{
        account,
        email,        
    }=data;
    return instance({
        url:'/user/verifyAccountAndEmail',
        method:'POST',
        data:{
            account,
            email
        }
    })
}

export const resetPassword = data=>{
    const{
        id,
        newPassword
    }=data;

    
    return instance({
        url:'/user/changePasswordInLogin',
        method:'POST',
        data:{
            id,
            newPassword
        }
    })
}