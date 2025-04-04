const joi=require('joi')

const name=joi.string().pattern(/^[\u4e00-\u9fa5]{2,4}$/).required();
const id=joi.required();
const email=joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required()
const password = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()

exports.password_limit ={
	// 表示对req.body里面的数据进行验证
	body:{
		id,
		oldPassword:password,
		newPassword:password
	}
}

exports.forgetPassword_limit ={	
	body:{			
		id,	
		newPassword:password
	}
}

exports.name_limit={
    body:{
        name,
        id
    }
}

exports.email_limit={
    body:{
        id,
        email
    }
}
