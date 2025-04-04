<template>        
    <el-dialog v-model="dialogFormVisible" :title="'新建'+tableType" width="500" align-center draggable>
        <div class="form-wrapped">
            <el-form :model="form" :rules="rules" ref="vefi">
                <el-form-item label="账号" label-width="70px" prop="account">
                    <el-input v-model="form.account" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓名" label-width="70px" prop="name">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>   
                <el-form-item label="密码" label-width="70px" prop="password">
                    <el-input v-model="form.password" autocomplete="off" />
                </el-form-item>   
                <el-form-item label="性别" label-width="70px" prop="sex">
                    <el-select v-model="form.sex" placeholder="选择性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" label-width="70px" prop="email"> 
                    <el-input v-model="form.email" autocomplete="off" />
                </el-form-item>
                <el-form-item label="部门" label-width="70px" prop="department">
                    <el-select v-model="form.department" placeholder="选择部门">
                    <el-option  v-for="(item,index) in departments" :key="index" :label="item" :value="item" />                    
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="sure">
                确定
                </el-button>
            </div>
        </template>

    </el-dialog>
</template>

<script setup lang="ts">
import { ref,defineProps,defineExpose ,reactive,inject} from 'vue';
import { ElMessage } from 'element-plus'
import {getDepartment}from '@/api/setting.js'
import {createAdmin}from '@/api/userinfo.js'
// const prop=defineProps(['tableType'])
const tableType=inject('tableType')
const departments=ref();
const vefi=ref();
(async()=>{
    departments.value=await getDepartment();
})();
const form=ref({
    account:null,
    password:'',
    name:'',
    sex:'',
    email:'',
    department:'',
    identity:tableType
})
const rules = reactive({
		account: [
			{ required: true, message: '请输入管理员的注册账号', trigger: 'blur' },
		],
		name: [
			{ required: true, message: '请输入管理员的名字', trigger: 'blur' },
		],
		sex: [
			{ required: true, message: '请输入管理员的性别', trigger: 'blur' },
		],
		email: [
			{ required: true, message: '请输入管理员的邮箱', trigger: 'blur' },
		],
		department: [
			{ required: true, message: '请输入管理员的部门', trigger: 'blur' },
		],
	})

const dialogFormVisible=ref(false);
const open=()=>{
    dialogFormVisible.value=true;
}
const sure=async()=>{
    await vefi.value.validate(async(valid, fields) => {
    if (valid) {
        const res=await createAdmin(form.value);
        if(res.stauts==0){
            emit('success')
        }    
    } else {
      ElMessage.error('输入不符合要求')
    }
  })
    
    dialogFormVisible.value = false;
    
}

const emit=defineEmits(['success'])
defineExpose({open,sure});
</script>

<style lang="scss" scoped>
.form-wrapped{
    display: flex;
    justify-content: center;
    .el-form{
        width: 250px;
        
    }
}
    
</style>