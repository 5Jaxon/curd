<template>
    <breadCrumb :item="item"></breadCrumb>
    <div class="home-wrapped">
        <div class="swiper-wrapped">
            <el-carousel :interval="4000" type="card" height="220px" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in images" :key="index">
                <img :src="item" class="swiper"/>                 
            </el-carousel-item>
            </el-carousel>
        </div>
        <div class="layout-wrapped">          
          <div class="company-notice">
            <span>公司公告</span>
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
          </div>                      
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in introduces" :key="index"  @click="openDialog(index+1)">
              <div class="company-message">
                <span>{{ item.set_name }}</span>
                <div  v-html="item.set_text"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        
    </div>
    <dialo ref="dialog"></dialo>
    <msg ref="msgp"></msg>
</template>

<script lang="ts" setup>
import breadCrumb from '../../components/bread_crumb.vue';
import { ref,reactive } from 'vue';
import {getAllSwiper,getAllCompanyIntroduce}from '@/api/setting.js'
import dialo from './introduce.vue'
import msg from './message.vue'
import {bus} from '@/utils/mitt.js'
import {getReadList,read} from '@/api/message.js'
const item=ref({first:'首页'})
const images=ref()
const introduces=ref();
const getAllSwipers=async()=>{
  images.value=await getAllSwiper();
  images.value=images.value.filter((e)=>e&&e.trim());  
  
}
getAllSwipers();
const getAllCompanyIntroduces=async()=>{
  introduces.value=await getAllCompanyIntroduce();
}
getAllCompanyIntroduces()
const dialog=ref();
const openDialog=(id)=>{
  dialog.value.open();
  bus.emit('dialog',id);
}

const tableData=ref([]);
(async()=>{
    tableData.value=await getReadList(localStorage.getItem('id'));        
})()

const msgp=ref()
const show=(row)=>{
  msgp.value.open(row);
  row.status=1;
  read(localStorage.getItem('id'),row.id);
}
</script>

<style lang="scss" scoped>
@mixin table-class{
  height:400px;
  width:48%;
  display: flex;
  flex-direction: column;
  .point{
    background-color: orange;
    height: 8px;
    width: 8px;
    border-radius: 50%;
  }
  span{
    font-size: 16px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ea0709;     
    text-align: left;
  }
}
.home-wrapped{
  padding: 8px;
  height: calc(100vh - 101px);
  overflow: auto;
  display:flex;
  flex-direction: column;
  background: #eee;    
  .swiper-wrapped{
      padding:0 20px;
      background: #fff;
      margin-bottom: 8px;
      // width: 90%;
      .swiper{
        height: 100%;
        width: 100%;
      }
  }
  .layout-wrapped{
    padding: 8px;
    background-color: #fff;
    margin-bottom: 8px;
    text-align: left;      
    display: flex;
    justify-content: space-around;
    .el-row{
      width: 48%;
      .el-col{
        margin:8px 0;
      }
        .company-message{        
        background-color: #f5f5f5;
        height:200px;
        padding: 8px;
        cursor: pointer;
        }
      
      .company-message:hover{        
        background-color: #eef5ff;
        height:200px;
        padding: 8px;
        cursor: pointer;   

      }
      span{
          border-bottom:1px solid #409eff;
          font-size: 14px;          
      }       
    }
    
    .company-notice{
      @include table-class()
    }

  }



}


.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>