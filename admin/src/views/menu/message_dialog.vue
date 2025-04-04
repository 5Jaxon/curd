<template>
    <el-dialog title="部门消息" v-model="visable" width="800px" center>
        <el-container>
            <el-aside width="50%">
                <el-table :data="tableData" @row-click="show">
                    <el-table-column type="index" width="12px"></el-table-column>
                    <el-table-column width="12px">
                        <template #default="{row}">
                            <div class="point" v-if="row.status==0"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="主题" prop="message_title"></el-table-column>
                    <el-table-column label="等级" prop="message_level"></el-table-column>
                    <el-table-column label="发布日期" >
                        <template #default="{row}">
                            {{ row.message_publish_time.slice(0,10) }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-aside>   
            <el-main>
                <div v-if="content==''">点击消息展示具体内容</div>
                <div v-else v-html="content"></div>
            </el-main>
        </el-container>
        
    </el-dialog>
</template>

<script setup lang="ts">
import {getReadList,read} from '@/api/message.js'

import { ref } from 'vue';
const tableData=ref([]);
const content=ref('');
(async()=>{
    tableData.value=await getReadList(localStorage.getItem('id'));    
    
})()
const visable=ref(false);
const open=()=>{
    visable.value=true;

}
const show=(row)=>{
    content.value=row.message_content;
    row.status=1;
    read(localStorage.getItem('id'),row.id);
    
}
defineExpose({open});
</script>


<style lang="scss" scoped>

.el-container{
    min-height: 600px;
    margin: 16px 0;
    .el-aside{
        padding: 16px;
        .point{
            background-color: orange;
            height: 8px;
            width: 8px;
            border-radius: 50%;
        }
    }
    .el-main{
        padding: 16px;
        border-left:1px solid #ddd;
    }
}
</style>