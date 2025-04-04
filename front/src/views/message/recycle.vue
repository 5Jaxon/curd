<template>
    <breadCrumb :item="item"></breadCrumb>
    <div class="content-wrapped">                    
        <div class="table-header">
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="message_title" label="公告主题" width="120" />
                <el-table-column prop="message_category" label="类别" />
                <el-table-column prop="message_publish_department" label="发布部门" />
                <el-table-column prop="message_receipt_object" label="接收对象" />                
                <el-table-column prop="message_delete_time" label="删除日期" width="200">
                    <template #default="{row}">
                        <div>{{row.message_delete_time?.slice(0,10)}}</div>
                    </template>
                </el-table-column>                
                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{row}">
                        <div>
                            <el-button type="success" @click="resume(row)">还原</el-button>
                            <el-button type="danger" @click="deleteMessage(row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-footer">
            <el-pagination layout="prev, pager, next, jumper" :total="total" :current-page="curPage" @update:current-page="update" :page-size="2"/>
        </div>            
    
    </div>    
    <dele ref="delep" @success="update"></dele>
</template>

<script setup lang="ts">
import breadCrumb from '@/components/bread_crumb.vue';
import { ref } from 'vue';
import {returnRecycleListData,getRecycleMessageLength}from '@/api/message.js'
import dele from './components/delete.vue'
const item=ref({first:'消息管理',second:'回收站'})
const tableData=ref([]);
const total=ref();
const curPage=ref(1);

const update=async(value=curPage.value)=>{
    curPage.value=value;
    let temp=await Promise.all([returnRecycleListData(curPage.value),getRecycleMessageLength()]);
    tableData.value=temp[0];
    total.value=temp[1].length;        
}

(async ()=>{    
    update(1);
})()

const delep=ref()
const deleteMessage=(row)=>{
    delep.value.open('真正删除信息',row)
}
const resume=(row)=>{
    delep.value.open('恢复消息',row)
}
</script>


<style lang="scss" scoped>
.content-wrapped{
    background-color: #f5f5f5;
    margin: 8px;
    padding: 8px;
    height: 100%;

    .table-header{
        height:calc(100vh - 162px);                
        background-color: #fff;
        padding: 8px;
    }
    .table-footer{
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
        padding: 8px;
    }        
    
}
</style>