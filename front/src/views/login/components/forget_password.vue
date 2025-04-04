<template>
    <el-dialog v-model="state.forgetDialog" title="忘记密码" width="400px">
        <el-form  class="register-form" label-width="auto" style="max-width: 600px" :rules="rules">
            <el-form-item label="账号" prop="account">
                <el-input v-model="forgetData.account" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="forgetData.email" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="state.forgetDialog = false">取消</el-button>
                <el-button type="primary" @click="openChange">
                下一步
                </el-button>
            </div>
        </template>  
    </el-dialog>

    <el-dialog v-model="state.changeDialog" title="修改密码" width="400px">
        <el-form  class="register-form" label-width="auto" style="max-width: 600px" :rules="rules">
            <el-form-item label="密码" prop="password">
                <el-input v-model="changeData.newPassword" />
            </el-form-item>
            <el-form-item label="再次确认密码" prop="repassword" >
                <el-input v-model="changeData.rePassword" show-password/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="state.changeDialog = false">取消</el-button>
                <el-button type="primary" @click="sure">
                确认
                </el-button>
            </div>
        </template>  
    </el-dialog>
</template>

<script lang="ts" setup>
    import {ref,reactive} from 'vue';    
    import { verify,resetPassword } from '../../../api/login';
    import { ElMessage } from 'element-plus'
import { error } from 'echarts/types/src/util/log.js';

    const labelPosition =ref('top')
    interface formData{
        account:number|null;
        email:string
    }
 
    interface changeData{
        newPassword:string;
        rePassword:string;
        id:string
    }
    
    const forgetData:formData = reactive({
        account:null,
        email:''
    })
    const changeData:changeData=reactive({
        newPassword:'',
        rePassword:'',
        id:'' ,       
    })
    const state=reactive({
        forgetDialog:false,
        changeDialog:false
    })

    const open=()=>{
        state.forgetDialog=true;
    }

    const openChange=async ()=>{
        const res=await verify(forgetData);
        if(res.status==0){
            state.forgetDialog=false;
            state.changeDialog=true;            
        }else{
            ElMessage({
                type:'error',
                message:'验证失败'
            })
        }
        
    }
    const sure=async()=>{
        if(changeData.newPassword==changeData.rePassword){
            changeData.id=localStorage.getItem('id') as string;
            const res=await resetPassword(changeData);
            if(res.status==0){
                ElMessage.success('修改成功');
                state.changeDialog=false;
            }else{
                ElMessage.error('修改失败');
            }
        }else ElMessage.error('密码不一致')
        
    }
    const rules = reactive({
    account: [
        { required: true, message: '请输入注册的账号', trigger: 'blur' },    
    ],email: [
        { required: true, message: '请输入绑定的邮箱', trigger: 'blur' },
    ],password: [
        { required: true, message: '请输入新的密码', trigger: 'blur' },
    ],repassword: [
        { required: true, message: '请确认新的密码', trigger: 'blur' },
    ],})
    defineExpose({open})
</script>

<style lang="scss" scoped>

</style>