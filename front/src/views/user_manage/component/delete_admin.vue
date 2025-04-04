<template>        
    <el-dialog v-model="dialogFormVisible" :title="types" width="500" align-center draggable>
        <div class="form-wrapped">
            <span v-if="id">是否要取消该管理员的管理权限?</span>
            <span v-else>是否要删除改用户?</span>
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
import { ref,defineProps,defineExpose,defineEmits } from 'vue';
import {changeIdentityToUser}from '@/api/userinfo.js'
import { ElMessage } from 'element-plus'
import { computed } from 'vue';
const id=ref();
const prop=defineProps(['tableType'])
const dialogFormVisible=ref(false);
const open=(row)=>{    
    dialogFormVisible.value=true;
    id.value=row.id;
}
const emit=defineEmits(['success'])
const sure=async ()=>{
    const res=await changeIdentityToUser(id.value);    
    
    if(res.status==0){
        ElMessage.success('降权成功')
        emit('success')
    }
    else ElMessage.error('降权失败')
    dialogFormVisible.value = false;
}

const types=computed(()=>{
    if(prop.tableType)return ("降级"+prop.tableType);
    else return '删除用户'
})
defineExpose({open,sure});
</script>

<style lang="scss" scoped>

    
</style>