import instance from '@/http/index.js'

//注册
export const getUserInfo = id=>{    
    return instance({
        url:'/user/getUserInfo',
        method:'POST',
        data:{
            id
        }
    })
}

export const changeName = (id,name)=>{    
    return instance({
        url:'/user/changeName',
        method:'POST',
        data:{
            id,
            name
        }
    })
}

export const changeSex = (id,sex)=>{    
    return instance({
        url:'/user/changeSex',
        method:'POST',
        data:{
            id,
            sex
        }
    })
}

export const changeEmail = (id,email)=>{    
    return instance({
        url:'/user/changeEmail',
        method:'POST',
        data:{
            id,
            email
        }
    })
}

export const changePassword = (id,oldPassword,newPassword)=>{    
    return instance({
        url:'/user/changePassword',
        method:'POST',
        data:{
            id,
            oldPassword,
            newPassword
        }
    })
}

export const bind = (onlyId,account,url)=>{    
    return instance({
        url:'/user/bindAccount',
        method:'POST',
        data:{
            onlyId,
            account,
            url
        }
    })
}

export const createAdmin = data => {
	const {
		account,
		...identity
	} = data
	return instance({
		url: '/user/createAdmin',
		method: 'POST',
		data: {
			account,
			...identity
		}
	})
}

// 获取管理员列表
export const getAdminList = identity => {
	return instance({
		url: '/user/getAdminList',
		method: 'POST',
		data: {
			identity
		}
	})
}

// 编辑管理员账号信息
export const editAdmin = data => {
	const {
		id,
		...department
	} = data
	return instance({
		url: '/user/editAdmin',
		method: 'POST',
		data: {
			id,
			...department
		}
	})
}

// 对管理员取消赋权
export const changeIdentityToUser = id => {
	return instance({
		url: '/user/changeIdentityToUser',
		method: 'POST',
		data: {
			id
		}
	})
}

// 对用户进行赋权 
export const changeIdentityToAdmin = (id, identity) => {
	return instance({
		url: '/user/changeIdentityToAdmin',
		method: 'POST',
		data: {
			id,
			identity
		}
	})
}

// 通过账号对用户搜索
export const searchUser = (account,identity) => {
	return instance({
		url: '/user/searchUser',
		method: 'POST',
		data: {
			account,
			identity
		}
	})
}

// 通过部门对用户搜索
export const searchDepartment = department => {
	return instance({
		url: '/user/searchUserByDepartment',
		method: 'POST',
		data: {
			department
		}
	})
}

// 冻结用户
export const banUser = id => {
	return instance({
		url: '/user/banUser',
		method: 'POST',
		data: {
			id
		}
	})
}

// 解冻用户
export const hotUser = id => {
	return instance({
		url: '/user/hotUser',
		method: 'POST',
		data: {
			id
		}
	})
}

// 获取冻结用户列表
export const getBanList = () => {
	return instance({
		url: '/user/getBanList',
		method: 'POST',
	})
}

// 删除用户  deleteUser
export const deleteUser = (id, account) => {
	return instance({
		url: '/user/deleteUser',
		method: 'POST',
		data: {
			id,
			account
		}
	})
}

// 获取对应身份的一个总人数
export const getAdminListLength = identity => {
	return instance({
		url: '/user/getAdminListLength',
		method: 'POST',
		data: {
			identity
		}
	})
}

// 监听换页返回数据
export const returnListData = (pager,identity) => {
	return instance({
		url: '/user/returnListData',
		method: 'POST',
		data: {
			pager,
			identity
		}
	})
}

export const updateReadStatus = (id,status) => {
	return instance({
		url: '/user/updateReadStatus',
		method: 'POST',
		data: {
			id,
			status
		}
	})
}
