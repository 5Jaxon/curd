<template>
    <div class="bread-crumb">
        <SvgIcon icon-name='localtion' class="bread-crumb-icon"> </SvgIcon>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{ props.item.first }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="props.item.second">{{ props.item.second }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
    import SvgIcon from '@/components/SvgIcon.vue';
    const props=defineProps(['item']);
</script>

<style scoped>
    .bread-crumb{
        height: 30px;
        padding: 0 ;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .bread-crumb-icon{
        margin-right: 2px;
    }
    :deep(.el-breadcrumb__item){
        height: 30px;
        padding: 0;
        line-height: 30px;
    }
    :deep(.el-breadcrumb__inner){
        font-weight:500;
    }
</style>