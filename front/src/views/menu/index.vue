<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
            <el-menu  class="el-menu-vertical-demo"  router>   
                <div class="title">
                    后台管理系统
                </div>             
                <el-menu-item index="/menu/home" #title>
                    <el-icon><House /></el-icon>
                    <span>首页 </span>
                </el-menu-item>
                <el-menu-item index="/menu/overview">
                    <el-icon><PieChart /></el-icon>
                    <span>系统概况</span>
                </el-menu-item>
                <el-sub-menu index="3" v-if="userStore.identity=='用户管理员'||userStore.identity=='超级管理员'">
                    <template #title>
                        <el-icon><User /></el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group title="管理员管理">
                        <el-menu-item index="/menu/product_manage" >产品管理员</el-menu-item>
                        <el-menu-item index="/menu/user_manage" >用户管理员</el-menu-item>
                        <el-menu-item index="/menu/message_manage" >消息管理员</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="员工管理">
                        <el-menu-item index="user_list">用户列表</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><TakeawayBox /></el-icon>
                        <span>产品管理</span>
                    </template>
                    <el-menu-item-group title="入库管理">
                        <el-menu-item index="/menu/product" >产品列表</el-menu-item>                        
                    </el-menu-item-group>
                    <el-menu-item-group title="出库管理">
                        <el-menu-item index="/menu/out_product">出库列表</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="5" v-if="userStore.identity=='消息管理员'||userStore.identity=='超级管理员'">
                    <template #title>
                        <el-icon><Message /></el-icon>
                        <span>消息管理</span>
                    </template>                    
                    <el-menu-item index="/menu/message" >消息管理</el-menu-item>                                                                
                    <el-menu-item index="/menu/recycle">回收站</el-menu-item>                    
                </el-sub-menu>
                <el-menu-item index="/menu/set">
                    <el-icon><Setting /></el-icon>
                    <span>系统设置</span>                
                </el-menu-item>   
            </el-menu>
          </el-aside>
        <el-container>
            <el-header>
                <span class="head-left">尊敬的 {{ userStore.name }} 你好</span>
                <div class="head-right">
                    <el-badge :is-dot="readStatus" @click="open">
                        <el-icon size="20"><message ></message></el-icon>
                    </el-badge>
                    <el-avatar v-if="userStore.imageUrl"  :size="25" :src="userStore.imageUrl" />
                    <el-avatar v-else :size="25" :src="circleUrl" />
                    <el-dropdown>
                        <span>
                        设置
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="gotoset">设置账号</el-dropdown-item>
                                <el-dropdown-item>                                    
                                    <el-upload
                                        action="http://127.0.0.1:3007/user/uploadAvatar"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                    >更改头像</el-upload>
                                </el-dropdown-item>
                                <el-dropdown-item @click="exit">退出登录</el-dropdown-item>                            
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
          <el-main>
            <RouterView ></RouterView>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <msg ref="msgp"></msg>
  </template>

<script lang="ts" setup>
import { useRouter,RouterView } from 'vue-router';
import {Menu as IconMenu}from '@element-plus/icons-vue'
import { reactive, toRefs,ref } from 'vue';
import useUserInfo from '@/store/userinfo.js'
import {getUserInfo,bind}from '@/api/userinfo.js'
import msg from './message_dialog.vue';
import {updateReadStatus}from '@/api/userinfo.js'
const router=useRouter();
const userStore=useUserInfo();
const readStatus=ref(false);
(async()=>{
    const res=await getUserInfo(localStorage.getItem('id'));
    readStatus.value=res.read_status>0?false:true;
})()
const circleUrl=ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const exit=()=>{
    router.replace('/login');
}    
const gotoset=()=>{
    router.replace('/menu/set')
}

const msgp=ref();
const open=()=>{
    msgp.value.open();
    if(readStatus.value){
        updateReadStatus(localStorage.getItem('id'),1);
        readStatus.value=false;
    }
    
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
    if(response.status==0){
        userStore.$patch({
        imageUrl:response.url
        })
        bind(response.onlyId,userStore.account,response.url)
    }else{
        ElMessage.error('更新失败')
    }    
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('Avatar picture size can not exceed 5MB!')
    return false
  }
  return true
}
</script>

<style lang="scss" scoped>
    .el-aside{
        height: 100vh;
        width: 210px;
        background: #2b303b;
        overflow-x:hidden ;
        .el-menu{
            background-color:#2b303b;
            border-right:0 ;
            width: 210px;
            .el-menu-item{
                color: #eee;
            }
            

        }
        .title{
            padding: 20px;
            display: flex;
            justify-content: center ;
            color: #eee;
            background-color: #2b303b;
        }
    }
    .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #2b303b;
        height: 50px;
        color: #eee;
        .head-right{
            display:flex;
            justify-content: space-around;
            align-items: center;
            width: 150px;            
        }
    }
    .el-main{
        padding: 0;
        background-color: #ddd;
        height: calc(100vh - 85px) ;
        overflow: hidden;        
    }
    .el-menu-item:hover {
        background-color:#2b4567;
    }    
    :deep(.el-sub-menu__title:hover ){
        background-color:#2b4567;
    }
    :deep(.el-sub-menu__title){
        color:#eee;
    }
    :deep(.el-menu--inline){
        background-color: #2b303b;
    }
</style>