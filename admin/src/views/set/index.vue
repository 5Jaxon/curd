<template>    
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb >    
    <div class="common-wrapped">
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="账号详情" name="first">
                <div class="account-info-warpped">
                    <span>用户头像</span>
                    <div class="account-info-content">
                        <el-upload
                        class="avatar-uploader"
                        action="http://127.0.0.1:3007/user/uploadAvatar"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload" >
                            <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </div>                    
                </div>
                <div class="account-info-warpped">
                    <span>用户账号</span>
                    <div class="account-info-content">
                        <el-input disabled v-model="userStore.account"></el-input>
                    </div>                    
                </div>
                <div class="account-info-warpped">
                    <span>用户密码</span>
                    <div class="account-info-content">
                        <el-button type="primary" @click="changep.open()">点击修改</el-button>
                    </div>                    
                </div>
                <div class="account-info-warpped">
                    <span>用户部门</span>
                    <div class="account-info-content">
                        <el-input disabled v-model="userStore.department"></el-input>
                    </div>
                </div>
                <div class="account-info-warpped">
                    <span>用户姓名</span>
                    <div class="account-info-content">
                        <el-input  v-model="userStore.name"></el-input>
                    </div>
                    <el-button type="primary" @click="saveName">保存</el-button>
                </div>
                <div class="account-info-warpped">
                    <span>用户姓别</span>
                    <div class="account-info-content">
                        <el-select
                        v-model="userStore.sex"
                        placeholder="选择你的性别"                        
                        style="width: 240px"
                        >
                            <el-option                                
                                label="男"
                                value="男"
                            />
                            <el-option                                
                                label="女"
                                value="女"
                            />
                        </el-select>
                    </div>
                    <el-button type="primary" @click="saveSex">保存</el-button>
                </div>
                <div class="account-info-warpped">
                    <span>用户身份</span>
                    <div class="account-info-content">
                        <el-input disabled v-model="userStore.identity"></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公司信息" name="second" v-if="userStore.identity=='超级管理员'">
                <div class="account-info-warpped">
                    <span>公司名称</span>
                    <div class="account-info-content">
                        <el-input v-model="companyName"></el-input>                        
                    </div>
                    <el-button type="primary" @click="changeCompanyName1">编辑公司名称</el-button>
                </div>
                <div class="account-info-warpped">
                    <span>公司介绍</span>
                    <div class="account-info-content">
                        <el-button type="success" @click="openEditor(1)">编辑公司介绍</el-button>
                    </div>
                </div>
                <div class="account-info-warpped">
                    <span>公司架构</span>
                    <div class="account-info-content">
                        <el-button type="success" @click="openEditor(2)">编辑公司架构</el-button>
                    </div>
                </div>
                <div class="account-info-warpped">
                    <span>公司战略</span>
                    <div class="account-info-content">
                        <el-button type="success" @click="openEditor(3)">编辑公司战略</el-button>
                    </div>
                </div>
                <div class="account-info-warpped">
                    <span>公司高层</span>
                    <div class="account-info-content">
                        <el-button type="success" @click="openEditor(4)">编辑高层介绍</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="首页管理" name="third" v-if="userStore.identity=='超级管理员'">
                <div class="home-wrapped">
                    <div class="tips">
                        <span>
                            点击图片框上传首页轮播图
                        </span>
                    </div>
                    <div class="swiper-wrapped" v-for="(item,index) in images" :key="index">
                        <div class="swiper-name">
                            <span>轮播图{{ index+1 }}:</span>
                        </div>
                        <el-upload
                            class="swiper-uploader"
                            action="http://127.0.0.1:3007/set/uploadSwiper"
                            :show-file-list="false"
                            :on-success="handleSwiperSuccess"
                            :before-upload="beforeSwiperUpload"
                            :data="{setName:'swiper'+(index+1)}"
                        >
                            <template #trigger>
                                <img v-if="item" :src="item" class="swiper" />
                                <img v-else src="@/assets/雪碧图.png" class="swiper" />
                            </template>                                                        
                        </el-upload>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其他设置" name="fourth">
                <div class="other-set">
                    <div class="set-department" v-if="userStore.identity=='用户管理员'||userStore.identity=='超级管理员'">
                        <span>部门设置</span>
                        <el-tag
                        v-for="tag in departmentTags"
                        :key="tag"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                        >
                        {{ tag }}
                        </el-tag>
                        <el-input
                        v-if="inputVisible"
                        ref="InputRef"
                        v-model="inputValue"
                        class="w-20"
                        size="small"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                        />
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">
                        + 新部门
                        </el-button>
                    </div>
                    <div class="set-product" v-if="userStore.identity=='产品管理员'||userStore.identity=='超级管理员'">
                        <span>产品设置</span>
                        <el-tag v-for="tag in productTags" :key="tag" closable
                        :disable-transitions="false" @close="handleClose2(tag)">
                        {{ tag }}
                        </el-tag>
                        <el-input v-if="inputVisible2" ref="InputRef2" v-model="inputValue2"
                        class="w-20" size="small"  @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2"  />
                        <el-button v-else class="button-new-tag" size="small" @click="showInput2">
                        + 新产品
                        </el-button>
                    </div>
                </div>
                
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
    <change ref="changep"></change>
    <editor ref="editorp"></editor>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import breadCrumb from '../../components/bread_crumb.vue';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import change from './change_password.vue'
import {getCompanyName,changeCompanyName,getAllSwiper}from '@/api/setting';
const breadcrumb=ref();
const changep=ref();
const companyName=ref();
const images=ref();

const getAllSwipers=async ()=>{
    images.value=await getAllSwiper();

}
const changeCompanyName1=async ()=>{
    const res=await changeCompanyName(companyName.value);        
    if(res.status===0)ElMessage.success('修改成功')
    else ElMessage.error('修改失败')
}

onMounted(async()=>{
    companyName.value=await getCompanyName()
    images.value=await getAllSwiper();
})

const item=ref({
    first:'系统设置'
})

const activeName = ref('first')

import type { UploadProps } from 'element-plus'
import { reactive } from 'vue';
import {bind,changeName,changeSex}from '@/api/userinfo.js'  
import useUserInfo from '@/store/userinfo'
import { error } from 'echarts/types/src/util/log';
const userStore=useUserInfo();
const saveName=async()=>{
    let res=await changeName(localStorage.getItem('id'),userStore.name);
    if(res.status==0)ElMessage.success('修改成功');
    else ElMessage.error('修改失败');
}

const saveSex=async()=>{
    let res=await changeSex(localStorage.getItem('id'),userStore.sex);
    if(res.status==0)ElMessage.success('修改成功');
    else ElMessage.error('修改失败');
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,  
) => {
    // data.imageUrl = URL.createObjectURL(uploadFile.raw!)
    if(response.status==0){
        userStore.$patch({
        imageUrl:response.url
        })
        bind(response.onlyId,userStore.account,response.url)
    }else{
        ElMessage.error('更新失败')
    }    
}

const handleSwiperSuccess: UploadProps['onSuccess'] = (
  response,  
) => {
    // data.imageUrl = URL.createObjectURL(uploadFile.raw!)
    if(response.status==0){
        userStore.$patch({
        imageUrl:response.url
        })        
        getAllSwipers();
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

const beforeSwiperUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('Avatar picture size can not exceed 5MB!')
    return false
  }
  return true
}

import editor from './editor.vue';
import {bus}from '@/utils/mitt.js';
import { onMounted } from 'vue';
const editorp=ref()
const openEditor=(id)=>{
    editorp.value.open();
    bus.emit('editorTitle',id);
}

import { nextTick,toRaw} from 'vue'
import { ElInput } from 'element-plus'
import type { InputInstance } from 'element-plus'
import {setDepartment,getDepartment,setProduct,getProduct}from '@/api/setting.js'
const inputValue = ref('')
const departmentTags = ref([''])
const inputVisible = ref(false)
const InputRef = ref<InputInstance>();

const inputValue2 = ref('')
const productTags = ref([''])
const inputVisible2 = ref(false)
const InputRef2 = ref<InputInstance>();
(async ()=>{
    departmentTags.value=await getDepartment();    
    productTags.value=await getProduct();    
})()
const handleClose = async(tag: string) => {
    departmentTags.value.splice(departmentTags.value.indexOf(tag), 1)
    const res=await setDepartment(JSON.stringify(toRaw(departmentTags.value)));
    if(res.status==0)ElMessage.success('设置成功')    
    else ElMessage.error('设置失败')
}

const handleClose2 = async(tag: string) => {
    productTags.value.splice(productTags.value.indexOf(tag), 1)
    const res=await setProduct(JSON.stringify(toRaw(productTags.value)));
    if(res.status==0)ElMessage.success('设置成功')    
    else ElMessage.error('设置失败')
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const showInput2 = () => {
  inputVisible2.value = true
  nextTick(() => {
    InputRef2.value!.input!.focus()
  })
}

const handleInputConfirm =async () => {
  if (inputValue.value) {
    departmentTags.value.push(inputValue.value)
    const res=await setDepartment(JSON.stringify(toRaw(departmentTags.value)));
    if(res.status==0)ElMessage.success('设置成功')    
    else ElMessage.error('设置失败')
  }
  inputVisible.value = false
  inputValue.value = ''
}

const handleInputConfirm2 =async () => {
  if (inputValue2.value) {
    productTags.value.push(inputValue2.value)
    const res=await setProduct(JSON.stringify(toRaw(productTags.value)));
    if(res.status==0)ElMessage.success('设置成功')    
    else ElMessage.error('设置失败')
  }
  inputVisible2.value = false
  inputValue2.value = ''
}
</script>

<style lang="scss" scoped>
.bread{
    display: flex;
    align-items: center;
    padding: 0,20px;
    .bread-crumb-icon{
        margin-left: 20;    
    }
}
.common-wrapped{
    margin-left: 10px;
    background-color: #eee;
    height: calc(100vh - 75px);
    overflow: auto;
    .common-content{
        padding-left: 10px;
        height:100%;
        .account-info-warpped{
            display: flex;
            align-items: center;
            padding-left: 45px;
            margin-bottom: 25px;        
            width: 300px; 
            span{
                min-width: 70px;
            }
            .account-info-content{
                margin-left: 25px;
                margin-right: 15px;
                .el-input{
                width: 200px;
            }   
            }
        }

    }
 
    
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.home-wrapped{
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .tips{
        margin-bottom: 8px;
        span{
            font-size: 14px;
            color: silver;
        }
    }

    .swiper-wrapped{
        display: flex;
        margin-bottom: 16px;

        .swiper-name{
            font-size: 14px;
            margin-bottom: 24px;
            margin-right: 16px;
        }
        .swiper{
            height:96px;
            width: 336px;
        }
    }
}

.other-set{
    margin-left: 20px;    

    .set-department{
        margin-bottom: 16px;
        span{
            font-size: 13px;
            margin-right:24px;
        }
        .el-input{
            width: 200px;
        }
    }

    .set-product{
        margin-bottom: 16px;
        span{
            font-size: 13px;
            margin-right:24px;
        }
        .el-input{
            width: 200px;
        }
    }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}


</style>