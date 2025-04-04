<template>        
    <el-dialog v-model="dialogFormVisible" :title="'编辑'+prop.tableType" width="500" align-center draggable>
        <div class="form-wrapped">
            <el-form :model="form" ref="vefi" :rules="rules">
                <el-form-item label="账号" label-width="70px" prop="account">
                    <el-input v-model="form.account" autocomplete="off" disabled/>
                </el-form-item>
                <el-form-item label="姓名" label-width="70px" prop="name">
                    <el-input v-model="form.name" autocomplete="off" />
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
import { ref,defineProps,defineExpose,defineEmits ,reactive} from 'vue';
import {getDepartment}from '@/api/setting.js'
import {editAdmin}from '@/api/userinfo.js'
import { ElMessage } from 'element-plus'
const departments=ref();
(async()=>{
    departments.value=await getDepartment();
})();
const form=ref({
    account:null,    
    name:'',
    sex:'',
    email:'',
    department:'',
    id:null
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

const prop=defineProps(['tableType'])
const dialogFormVisible=ref(false);
const open=(row)=>{    
    dialogFormVisible.value=true;
    form.value.account=row.account;    
    form.value.name=row.name;
    form.value.sex=row.sex;
    form.value.email=row.email;
    form.value.department=row.department;
    form.value.id=row.id;
}
const emit=defineEmits(['success'])
const vefi=ref()
const sure=async ()=>{
    await vefi.value.validate(async(valid, fields) => {
    if (valid) {
        const res=await editAdmin(form.value);
        if(res.stauts==0){
            emit('success')
        }        
    } else {
      ElMessage.error('输入不符合要求')
    }
  })
    
    dialogFormVisible.value = false;
}

defineExpose({open,sure});
</script>

<style lang="scss" scoped>
.form-wrapped{
    display: flex;
    justify-content: center;
    .el-form{
        width: 270px;
        
    }
}
    
</style>