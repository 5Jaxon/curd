<template>
    <breadCrumb :item="item"/>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <el-input
                v-model="input"
                style="width: 240px"
                placeholder="输入搜索的账号"
                :suffix-icon="Search"
                @change="search"
                />
                <el-button type="primary" @click="addAdmin">添加{{tableType}}</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column type="index" width="50" />
                <el-table-column prop="account" label="账号"  />
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="department" label="部门"/>
                <el-table-column prop="email" label="邮箱"/>
                <el-table-column  label="操作 ">
                    <template #default="{row}">
                        <el-button type="success" @click="change(row)">编辑</el-button>
                        <el-button type="danger" @click="del(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-footer">
            <el-pagination layout="prev, pager, next, jumper" :total="total" :current-page="curPage" @update:current-page="update"/>
        </div>
    </div>
    <create ref="createp" :tableType="prop.tableType" @success="update"></create>
    <edit ref="editp" :tableType="prop.tableType" @success="update"></edit>
    <dele ref="delep" :tableType="prop.tableType" @success="update"></dele>
</template>

<script setup lang="ts">
import breadCrumb from '@/components/bread_crumb.vue';
import { ref,defineProps } from 'vue';
import {Search} from '@element-plus/icons-vue'
import create from './create_admin.vue'
import edit from './edit_admin.vue'
import dele from './delete_admin.vue'
const prop=defineProps(['tableType']);
const item=ref({
    first:'用户管理',
    second:prop.tableType
})

import {searchUser,getAdminListLength,returnListData}from '@/api/userinfo.js'

const tableData=ref();
(async ()=>{
    tableData.value=await returnListData(1,prop.tableType)
})()
const total=ref(0);
const curPage=ref(1);
(async()=>{
    const res=await getAdminListLength(prop.tableType);
    total.value=res.length;        
    
})()

const update= async(value)=>{
    tableData.value=await returnListData(value,prop.tableType);
    curPage.value=value;    
}

const input=ref('')


const createp=ref();
const addAdmin=()=>{
    createp.value.open();
}

const editp=ref();
const change=(row)=>{
    editp.value.open(row);
}

const delep=ref()
const del=(row)=>{
    delep.value.open(row);
}

const search=async()=>{
    let res;
    if(input.value!=''){
        res=await searchUser(input.value,prop.tableType);
    }else res=await returnListData(curPage.value,prop.tableType)
    tableData.value=res;    
    
}

</script>

<style lang="scss" scoped>
.table-wrapped{
    background-color: #f5f5f5;
    height:calc(100vh - 101px);
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    .table-top{
        background-color: #fff;
        padding: 8px;
        .table-header{
            padding: 0,24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
            margin-bottom: 16px;
        }
        .el-table{
            height: calc(100vh - 220px);
        }
    }
    .table-footer{
        display: flex;
        justify-content: flex-end;
    }
}

</style>