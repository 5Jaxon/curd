<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>  
  <router-link to="/">主界面</router-link>|
  <router-link to="/login">登录</router-link>
  <router-view></router-view>  
</template>

<style scoped>
</style>
