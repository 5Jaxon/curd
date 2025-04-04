<template>
	<el-dialog v-model="visible" title="部门消息" width="660px" destroy-on-close center>		
		<el-container>
			<el-main >
                <div >{{ title }}</div>
                <hr>
				<div v-html="valueHtml" class="content"></div>
			</el-main>
            <el-aside width="200px">
                <div>发布日期: {{ date.slice(0,10) }}</div>
                <hr>
                <div>发布人: {{ name }}</div>
            </el-aside>
		</el-container>				
	</el-dialog>
</template>



<script lang="ts" setup>	
	import {
		ref
	} from 'vue'	
		
		
	// 内容 HTML
	const valueHtml = ref()
	
	const visible=ref(false);

    const date=ref();
    const name=ref();
    const title=ref()
	// 暴露open方法
	const open = (data) => {
		visible.value = true;
        valueHtml.value=data.message_content;
        date.value=data.message_publish_time;
        name.value=data.message_publish_name;
        title.value=data.message_title;
	};
	defineExpose({
		open,
	});



</script>

<style lang="scss" scoped>
.el-main{    
	min-height: 500px;
	text-align: center;
    border-right: solid 2px #ccc;
    font-size: 1.2em;
    padding: 10px 0;
    .content{
        text-align: left;
    }
}
.el-aside{
    padding: 10px;
    font-size: 1.2em;
}
</style>