<template>        
    <el-dialog v-model="dialogFormVisible" :title="title" width="600" align-center draggable>
        <div class="form-wrapped">            
            <el-form :model="form" label-width="120px" style="max-width: 600px;" :rules="rules"
            label-position="left">
				<el-form-item label="主题" prop='message_title'>
					<el-input v-model="form.message_title" />
				</el-form-item>
				<el-form-item label="发布部门" prop='message_publish_department' v-if="title=='发布公告'||title=='编辑公告' " >
					<el-select v-model="form.message_publish_department" placeholder="请选择发布部门" :disabled="title=='编辑公告'">
						<el-option v-for="item in departments" :key="item"  :value="item" >{{ item }}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发布人" prop='message_publish_name'>
					<el-input v-model="form.message_publish_name" disabled />
				</el-form-item>
				<el-form-item label="接收部门" prop='message_receipt_object' v-if="title=='发布公告'||title=='编辑公告'">
					<el-select v-model="form.message_receipt_object" placeholder="请选择接收部门">
						<el-option v-for="item in allOptions" :key="item" 
                       :value="item" >{{ item }}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公告等级" prop='message_level' v-if="title=='发布公告'||title=='编辑公告'">
					<el-select v-model="form.message_level" placeholder="选择公告等级">
						<el-option label="一般" value="一般" />
						<el-option label="重要" value="重要" />
						<el-option label="必要" value="必要" />
					</el-select>
				</el-form-item>
            </el-form>
            <div class="editor">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
				:mode="mode" />
			    <Editor style="height: 400px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
				:mode="mode" @onCreated="handleCreated" />
            </div>
            
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="sure">
                确定
                </el-button>
            </div>
        </template>

    </el-dialog>
</template>

<script setup lang="ts">
import { ref,defineExpose,defineEmits ,reactive} from 'vue';
import {getDepartment}from '@/api/setting.js'
import { ElMessage } from 'element-plus'
import userStore from '@/store/userinfo.js'
import {editMessage,publishMessage } from '@/api/message.js'
const store=userStore();
const departments=ref();
const allOptions=ref();
(async()=>{
    departments.value=await getDepartment();
    allOptions.value=[...departments.value,'全体成员'];
})();
const emit = defineEmits(['success'])
const form = reactive({
		id: 0,
		message_title: '',
		message_publish_department: '',
		message_publish_name: '',
		message_category: '',
		message_receipt_object: '',
		message_level: '',
		message_content: '',
	})

	const rules = reactive({
		message_title: [
			{ required: true, message: '请输入公告标题', trigger: 'blur' },
		],
		message_publish_department: [
			{ required: true, message: '请选择发布部门', trigger: 'blur' },
		],
		message_publish_name: [
			{ required: true, message: '请输入发布人', trigger: 'blur' },
		],
		message_receipt_object: [
			{ required: true, message: '请选择的接收对象', trigger: 'blur' },
		],
		message_level: [
			{ required: true, message: '请选择公告等级', trigger: 'blur' },
		],
		message_content: [
			{ required: true, message: '请输入公告内容', trigger: 'blur' },
		],
	})

const dialogFormVisible=ref(false);
const title = ref()
const open=(titles,row)=>{
    title.value=titles;    
    dialogFormVisible.value=true;
    if(titles=='编辑公告'){
        valueHtml.value = row.message_content
        form.id = row.id
        form.message_title = row.message_title
        form.message_publish_department = row.message_publish_department
        form.message_publish_name = row.message_publish_name
        form.message_receipt_object = row.message_receipt_object
        form.message_level = row.message_level    
    }else if(titles=='发布公告')    {
        valueHtml.value = ''        
        form.message_title = ''
        form.message_publish_department = store.department
        form.message_publish_name = store.name
        form.message_receipt_object = ''
        form.message_level = ''    
    }
}

const sure=async ()=>{
    dialogFormVisible.value = false;
    form.message_content=valueHtml.value;
    let res;
    if(title.value=='编辑公告')res=await editMessage(form);
    else if(title.value=='发布公告')res=await publishMessage(form);
    if(res.status==0){
        ElMessage.success(title.value+'成功')
        emit('success')
    }
    else ElMessage.error(title.value+'失败')
}

import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import {
		onBeforeUnmount, shallowRef,		
	} from 'vue'
	import { Editor, Toolbar } from '@wangeditor/editor-for-vue'		

	// 编辑器实例，必须用 shallowRef
	const editorRef = shallowRef()
	// mode
	const mode = ref('default')
	// 内容 HTML
	const valueHtml = ref()

	const toolbarConfig = {
		excludeKeys:['']
	}
	const editorConfig = {
		placeholder: '请输入内容...',
	}
	// 上传图片，修改 uploadImage 菜单配置
	// 需要注意的是，如何去修改参数？
	toolbarConfig.excludeKeys = [
		'blockquote',
		'bgColor',
		'color',
		'group-more-style',
		'fontFamily',
		'bulletedList',
		'numberedList',
		'lineHeight',
		'todo',
		'emotion',
		'insertLink',
		'group-video',
		'insertTable',
		'codeBlock',
		'divider',
		'fullScreen',
		// 'group-image',

		// 排除菜单组，写菜单组 key 的值即可
	]


	// 组件销毁时，也及时销毁编辑器
	onBeforeUnmount(() => {
		const editor = editorRef.value
		if (editor == null) return
		editor.destroy()
	})

	const handleCreated = (editor : any) => {
		editorRef.value = editor // 记录 editor 实例，重要！
	}

    

defineExpose({open,sure});
</script>

<style lang="scss" scoped>
.form-wrapped{
    display: flex;
    justify-content: center;
    flex-direction: column;        
    .el-form{
        width: 330px;
        
    }
    .editor{
        border: 1px solid #aaa;
        overflow: auto;
    }
}
    
</style>