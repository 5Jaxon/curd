<template>
    <breadCrumb :item="item"></breadCrumb>
    <div class="content-wrapped">
        <el-tabs v-model="activeName"  >
            <el-tab-pane label="公告管理" name="first">
                <div class="table-header">
                    <div class="table-top">
                        <div class="top-left">
                            <el-select @change="update(1)"
                            v-model="department"
                            placeholder="请选择部门"
                            style="width: 200px">
                                <el-option
                                    v-for="(item,index) in departments"
                                    :key="index"
                                    :label="item"
                                    :value="item"
                                />
                            </el-select>
                            <el-radio-group v-model="level" @change="update(1)">
                                <el-radio label="一般" size="large"></el-radio>
                                <el-radio label="重要" size="large"></el-radio>
                                <el-radio label="必要" size="large"></el-radio>
                            </el-radio-group>
                        </div>
                        <div class="top-right">
                            <el-button type="primary" @click="showAll" plain>全部公告</el-button>
                            <el-button type="primary" @click="publish">发布公告</el-button>
                        </div>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="message_title" label="公告主题" width="120" />
                        <el-table-column prop="message_category" label="类别" />
                        <el-table-column prop="message_publish_department" label="发布部门" />
                        <el-table-column prop="message_publish_name" label="发布人" />
                        <el-table-column prop="message_receipt_object" label="接收对象" />
                        <el-table-column prop="message_level" label="公告等级" />
                        <el-table-column prop="message_publish_time" label="发布时间" width="150">
                            <template #default="{row}">
                                <div>{{row.message_publish_time?.slice(0,10)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="message_update_time" label="最新编辑时间" width="150">
                            <template #default="{row}">
                                <div>{{row.message_update_time?.slice(0,10)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="message_click_number" label="阅读人数" />
                        <el-table-column label="操作" width="200" fixed="right">
                            <template #default="{row}">
                                <div>
                                    <el-button type="success" @click="editMessage(row)">编辑</el-button>
                                    <el-button type="danger" @click="deleteMessage(row)">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table-footer">
                    <el-pagination layout="prev, pager, next, jumper" :total="total" :current-page="curPage" @update:current-page="update" :page-size="10"/>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="系统消息" name="second">Config</el-tab-pane> -->
        </el-tabs>
    </div>
    <editor ref="editorp" @success="update"></editor>
    <dele ref="delep" @success="update"></dele>
</template>

<script setup lang="ts">
import breadCrumb from '@/components/bread_crumb.vue';
import { ref } from 'vue';
import {getDepartment}from '@/api/setting.js'
import {getMessage,getCompanyMessageLength}from '@/api/message.js'
import editor from './components/editor.vue'
import dele from './components/delete.vue'
const item=ref({first:'消息管理',second:'消息列表'})
const activeName=ref('first');
const departments=ref([]);
const department=ref('');
const tableData=ref([]);
const total=ref();
const curPage=ref(1);
(async ()=>{
    let temp=await Promise.all([getDepartment(),getMessage('','',curPage.value),getCompanyMessageLength('','')]);
    departments.value=temp[0];
    tableData.value=temp[1];
    total.value=temp[2].length;
})()

const update=async(value=curPage.value)=>{
    curPage.value=value;
    let temp=await Promise.all([getMessage(department.value,level.value,curPage.value),getCompanyMessageLength(department.value,level.value)]);
    tableData.value=temp[0];
    total.value=temp[1].length;        
}

const level=ref('');

const showAll=async()=>{    
    level.value='';
    department.value='';
    update(1);
}
const editorp=ref()
const editMessage=(row)=>{
    editorp.value.open('编辑公告',row);
}
const publish=()=>{
    editorp.value.open('发布公告');
}
const delep=ref()
const deleteMessage=(row)=>{
    delep.value.open('删除信息',row)
}

</script>


<style lang="scss" scoped>
.content-wrapped{
    background-color: #f5f5f5;
    margin: 8px;
    padding: 8px;
    height: 100%;
    .el-tabs{
        background-color: #fff;
        height:100%;
        padding: 0 8px;
        .el-tab-pane{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height:calc(100vh - 160px);
            .table-header{
                height:calc(100vh - 200px);                
                .table-top{
                    padding: 0 16px;
                    display: flex;
                    justify-content: space-between;
                    .top-left{
                        display: flex;
                        gap: 50px;
                    }
                }
                .el-table{
                    height: calc(100vh - 240px);
                }
            }
            .table-footer{
                display: flex;
                justify-content: flex-end;
            }
        }
        
    }
}
</style>