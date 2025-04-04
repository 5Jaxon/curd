<template>
	<el-dialog v-model="dialogFormVisible" :title='title' width="30%" center>
		<span v-if="title.value=='删除信息'" v-html="tips"></span>
		<span v-else-if="title.value=='恢复消息'" v-html="tips"></span>
		<span v-else v-html="tips"></span>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="operationMessage">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import {
		firstDelete, recover, deleteMessage
	} from '@/api/message.js'
	import { ElMessage } from 'element-plus'
	// import {changeUserReadListButDelete,changeUserReadList} from '@/api/dep_msg.js'
	// import {
	// 	useMsg
	// } from '@/store/message.js'
	// const msgStore = useMsg()
	const title = ref()
	const tips = ref()
	// 消息ID
	const messageId = ref()
	const department = ref()

	const emit = defineEmits(['success'])

	const operationMessage = async () => {
		if (title.value == '删除信息') {
			const res = await firstDelete(messageId.value)
			if (res.status == 0) {
				// await changeUserReadListButDelete(messageId.value,department.value)
				// msgStore.returnReadList(localStorage.getItem('id'))
				ElMessage({
					message: '删除公告成功',
					type: 'success',
				})
				emit('success')
				dialogFormVisible.value = false
			} else {
				ElMessage.error('删除公告失败')
				dialogFormVisible.value = false
			}
		}
		if (title.value == '恢复消息') {
			const res = await recover(messageId.value)
			if (res.status == 0) {
				// await changeUserReadList(messageId.value,department.value)
				// msgStore.returnReadList(localStorage.getItem('id'))
				ElMessage({
					message: '恢复公告成功',
					type: 'success',
				})
				emit('success')
				dialogFormVisible.value = false
			} else {
				ElMessage.error('恢复公告失败')
				dialogFormVisible.value = false
			}
		}
		if (title.value == '真正删除信息') {
			const res = await deleteMessage(messageId.value)
			if (res.status == 0) {
				ElMessage({
					message: '删除公告成功',
					type: 'success',
				})
				emit('success')
				dialogFormVisible.value = false
			} else {
				ElMessage.error('删除公告失败')
				dialogFormVisible.value = false
			}
		}
	}

	// 弹窗开关
	const dialogFormVisible = ref(false)

	// 打开编辑管理员的弹窗
	const open = (titles,row) => {
		dialogFormVisible.value = true
        title.value=titles;
        if(titles=='删除信息') {		
            tips.value = '您确定要删除这个公告吗？'
            messageId.value = row.id
            department.value = row.message_receipt_object
	    }
	    if(titles=='恢复消息'){            
            tips.value = '您确定要恢复这个公告吗？'
            messageId.value =row.id
            department.value = row.message_receipt_object
        }
        if(titles=='真正删除信息'){            
            tips.value = '请慎重操作！您确定要真正删除这个公告吗？'
            messageId.value = row.id
        }
    }

	defineExpose({
		open
	})


</script>

<style lang="scss" scoped>

</style>