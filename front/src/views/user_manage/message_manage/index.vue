<template>
    <myTable tableType="消息管理员"></myTable>
</template>

<script setup lang="ts">
import myTable from '../component/index.vue'
import { provide } from 'vue';
provide('tableType','消息管理员')
</script>