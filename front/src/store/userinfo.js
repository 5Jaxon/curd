import { defineStore } from 'pinia'

const useUserInfo = defineStore('userinfo', {
  state:()=>{
    return{
        imageUrl:'',
        name:'',
        sex:'',
        department:'',
        identity:'',
        account:'',
        email:''
    }
  },
  actions:{
    userInfo (data){
        this.account=data.account;
        this.imageUrl=data.image_url;
        this.name=data.name;
        this.sex=data.sex;
        this.department=data.department;
        this.identity=data.identity;        
        this.email=data.email;
    }
  },
  persist:{
    storage:localStorage,
  }
})

export default useUserInfo