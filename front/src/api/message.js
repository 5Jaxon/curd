import instance from '@/http/index.js'

export function getMessage(department,level,page){
    return instance({
        url:'/message/getMessage',
        method:'POST',
        data:{
            department,
            level,
			page
        }

    })
}

export function editMessage(form){
    return instance({
        url:'/message/editMessage',
        method:'POST',
        data:form
    })
}

export function publishMessage(form){
    return instance({
        url:'/message/publishMessage',
        method:'POST',
        data:form
    })
}

export const companyMessageList = () => {
	return instance({
		url: '/message/companyMessageList',
		method: 'POST',
	})
}

// 初次删除
export const firstDelete = (id) => {
	return instance({
		url: '/message/firstDelete',
		method: 'POST',
		data: {
			id
		}
	})
}

// 获取回收站总数
export const getRecycleMessageLength = () => {
	return instance({
		url: '/message/getRecycleMessageLength',
		method: 'POST',
	})
}

// 监听换页返回数据  回收站列表
export const returnRecycleListData = (pager) => {
	return instance({
		url: '/message/returnRecycleListData',
		method: 'POST',
		data: {
			pager
		}
	})
}


// 还原操作
export const recover = (id) => {
	return instance({
		url: '/message/recover',
		method: 'POST',
		data: {
			id
		}
	})
}

// 删除操作
export const deleteMessage = (id) => {
	return instance({
		url: '/message/deleteMessage',
		method: 'POST',
		data: {
			id
		}
	})
}

// 获取公司公告总数
export const getCompanyMessageLength = (department,level) => {
	return instance({
		url: '/message/getCompanyMessageLength',
		method: 'POST',
		data:{
			department,
			level
		}
	})
}
//获取消息列表
export const getReadList = (id) => {
	return instance({
		url: '/message/getReadList',
		method: 'POST',
		data:{
			id
		}
	})
}
//更新消息列表,点击次数
export const read = (user_id,message_id) => {	
	return instance({
		url: '/message/read',
		method: 'POST',
		data:{
			user_id,
			message_id,			
		}
	})
}