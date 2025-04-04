<template>
    <el-dialog v-model="state" title="修改密码" width="400px">
        <el-form  class="register-form" label-width="auto" style="max-width: 600px" :rules="rules">
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input v-model="changeData.oldPassword" show-password/>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" >
                <el-input v-model="changeData.newPassword" show-password/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="state = false">取消</el-button>
                <el-button type="primary" @click="sure">
                确认
                </el-button>
            </div>
        </template>  
    </el-dialog>
</template>

<script lang="ts" setup>
    import {ref,reactive} from 'vue';    
    import { changePassword } from '@/api/userinfo.js';
    import { ElMessage } from 'element-plus'

    const labelPosition =ref('top')
    interface changeData{
        newPassword:string;
        oldPassword:string;        
    }

    const changeData:changeData=reactive({
        newPassword:'',
        oldPassword:'',               
    })
    const state=ref(false)


    const open=()=>{
        state.value=true;
    }
    const sure=async()=>{
        let res=await changePassword(localStorage.getItem('id'),changeData.oldPassword,changeData.newPassword);        
        if(res.status==0){
            ElMessage.success('修改成功');
            state.value=false;
        }
        else ElMessage.error('修改失败');
        
        
    }
    const rules = reactive({
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },       
    ],newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
    ],})
    defineExpose({open})
</script>

<style lang="scss" scoped>

</style>