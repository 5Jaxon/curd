<template>
	<el-dialog v-model="state.dialogFormVisible" :title="title" width="600px" destroy-on-close>		
		<el-container>
			<el-main>
				<div v-html="valueHtml" ></div>
			</el-main>
		</el-container>				
	</el-dialog>
</template>



<script lang="ts" setup>	
	import {
		onBeforeUnmount, ref, shallowRef,
		reactive
	} from 'vue'	
	import { bus } from "@/utils/mitt.js"
	// changecompanyintro
	import {  getCompanyIntroduce} from '@/api/setting.js'
	const title = ref()
	bus.on("dialog", async (id : number) => {
		if (id == 1) {
			title.value = '编辑公司介绍'
			valueHtml.value = await getCompanyIntroduce('公司介绍')
		}
		if (id == 2) {
			title.value = '编辑公司架构'
			valueHtml.value = await getCompanyIntroduce('公司架构')
		}
		if (id == 3) {
			title.value = '编辑公司战略'
			valueHtml.value = await getCompanyIntroduce('公司战略')
		}
		if (id == 4) {
			title.value = '编辑高层介绍'
			valueHtml.value = await getCompanyIntroduce('公司高层')
		}
	})
		
	// 内容 HTML
	const valueHtml = ref()
	
	const state = reactive({
		dialogFormVisible: false,
	});

	
	// 暴露open方法
	const open = () => {
		state.dialogFormVisible = true;
	};
	defineExpose({
		open,
	});

	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})

</script>

<style lang="scss" scoped>
.el-main{
	min-height: 500px;
	text-align: center;
}

</style>