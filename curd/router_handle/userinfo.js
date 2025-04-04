const db=require('../db/index');
//加密中间间
const bcrypt=require('bcrypt');
const crypto=require('crypto')
const fs=require('fs')
exports.uploadAvatar=(req,res)=>{    
    const onlyId=crypto.randomUUID();
    let oldname=req.files[0].filename;
    let newname=Buffer.from(req.files[0].originalname,'latin1').toString('utf-8')     
    fs.renameSync('./public/upload/'+oldname,'./public/upload/'+newname)            
    const sql='insert into image set ?';
    db.query(sql,{
        image_url:`http://127.0.0.1:3007/upload/${newname}`,
        onlyId
    },(err,result)=>{        
        if(err)res.cc(err);
        res.send({
            url:`http://127.0.0.1:3007/upload/${newname}`,
            onlyId,
            status:0
        })
    })
}

exports.bindAccount=(req,res)=>{
    const {
        account,
        onlyId,
        url
    }=req.body;
    let sql='update image set account= ? where onlyId=?';
    db.query(sql,[account,onlyId],(err,result)=>{
        if(err)res.cc(err);
        if(result.affectedRows==1){
            sql='update users set image_url =? where account= ?'
            db.query(sql,[url,account],(err,result)=>{
                // console.log(result);
                
                if(err)res.cc(err);
                res.send({
                    status:0,
                    message:'修改成功'
                })
            })
        }
    })
}

exports.getUserInfo =(req,res)=>{
    const sql='select * from users where id = ?';
    db.query(sql,req.body.id,(err,result)=>{
        if(err)return res.cc(err);
        res.send(result[0])
    })
}

exports.changeName=(req,res)=>{
    const {id,name}=req.body;
    const sql='update users set name= ? where id = ?';
    db.query(sql,[name,id],(err,result)=>{
        if(err)return res.cc(err);
        res.send({
            status:0,
            message:'修改成功'
        })
    })
}

exports.changeSex=(req,res)=>{
    const {id,sex}=req.body;
    const sql='update users set sex= ? where id = ?';
    db.query(sql,[sex,id],(err,result)=>{
        if(err)return res.cc(err);
        res.send({
            status:0,
            message:'修改成功'
        })
    })
}

exports.changeEmail=(req,res)=>{
    const {id,email}=req.body;
    const sql='update users set email= ? where id = ?';
    db.query(sql,[email,id],(err,result)=>{
        if(err)return res.cc(err);
        res.send({
            stauts:0,
            message:'修改成功'
        })
    })
}

exports.changePassword = (req, res) => {
	const sql = 'select password from users where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		// bcrypt
		const compareResult = bcrypt.compareSync(req.body.oldPassword, result[0].password)
		if (!compareResult) {
			return res.send({
				status: 1,
				message: '原密码错误'
			})
		}
		req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10)
		const sql1 = 'update users set password = ? where id = ?'
		db.query(sql1, [req.body.newPassword, req.body.id], (err, result) => {
			if (err) return res.cc(err)
			res.send({
				status: 0,
				message: '修改成功'
			})
		})
	})
}

// 验证账户和与邮箱是否一致 email account
exports.verifyAccountAndEmail = (req, res) => {
	const {
		account,
		email
	} = req.body
	const sql = 'select * from users where account = ?'
	db.query(sql, account, (err, result) => {
		if (err) return res.cc(err)
		// res.send(result[0].email)
		if (email == result[0].email) {
			res.send({
				status: 0,
				message: '查询成功',
				id: result[0].id
			})
		} else {
			res.send({
				status: 1,
				message: '查询失败'
			})
		}
	})
}

// 登录页面修改密码 参数 newPassword id
exports.changePasswordInLogin = (req, res) => {
	const user = req.body
    console.log(user);
    
	user.newPassword = bcrypt.hashSync(user.newPassword, 10)
	const sql = 'update users set password = ? where id = ?';
	db.query(sql, [user.newPassword, user.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '更新成功'
		})
	})
}


exports.createAdmin=(req,res)=>{
    const {
        account,
        password,
        name,
        sex,
        department,
        email,
        identity,

    }=req.body
    const sql='select * from users where account=?';
    db.query(sql,account,(err,result)=>{
        if(err)return res.cc(err);
        if(result.length>0){
            return res.seng({
                stauts:1,
                message:'账号已存在'
            })
        }
        let hpassword=bcrypt.hashSync(password,10);
        const sql1='insert into users set ?';
        const create_time=new Date();
        db.query(sql1,{
            account,password:hpassword,name,sex,department,
            identity,create_time,email,status:0
        },(err,results)=>{
            if(err)return res.cc(err);
            if(results.affectedRows!=1){
                return res.send({
                status:1,
                message:'添加失败'
                })
            }
            return res.send({
                status:0,
                message:'添加成功'
            })            
        })
    })
}

exports.getAdminList = (req, res) => {
	const sql = 'select * from users where identity = ?'
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		result.forEach((e) => {
			e.password = ''
			e.create_time = ''
			e.image_url = ''
			e.status = ''
		})
		res.send(result)
	})
}
// 编辑管理员账号信息
exports.editAdmin = (req, res) => {
	const {
		id,
		name,
		sex,
		email,
		department
	} = req.body
	const date = new Date()
	const sql0 = 'select department from users where id = ?'
	db.query(sql0, id, (err, result) => {
		if (result[0].department == department) {
			// 修改的内容
			const updateContent = {
				id,
				name,
				sex,
				email,
				department,
				update_time: date,
			}
			const sql = 'update users set ? where id = ?'
			db.query(sql, [updateContent, updateContent.id], (err, result) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: '修改管理员信息成功'
				})
			})
		} else {
			// 修改的内容
			const updateContent = {
				id,
				name,
				sex,
				email,
				department,
				update_time: date,
				read_list: null,
				read_status: 0
			}
			const sql = 'update users set ? where id = ?'
			db.query(sql, [updateContent, updateContent.id], (err, result) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: '修改管理员信息成功'
				})
			})
		}
	})

}

// 对管理员取消赋权 参数 id
exports.changeIdentityToUser = (req, res) => {
	const identity = '用户'
	const sql = 'update users set identity = ? where id = ?'
	db.query(sql, [identity, req.body.id], (err, result) => {
		if (err) return res.cc(err) 
		res.send({
			status: 0,
			message: '降级成功'
		})
	})
}

// 对用户进行赋权 参数 id identity
exports.changeIdentityToAdmin = (req, res) => {
	const date = new Date()
	const sql = 'update users set identity = ?,update_time = ? where id = ?'
	db.query(sql, [req.body.identity, date, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '赋权成功'
		})
	})
}

// 通过账号对用户搜索 account identity
exports.searchUser = (req, res) => {
	const {account,identity} = req.body
	const sql = 'select * from users where account = ? and identity = ?'
	db.query(sql, [account,identity], (err, result) => {
		if (err) return res.cc(err)
		result.forEach((e) => {
			e.password = ''
			e.create_time = ''
			e.image_url = ''
			e.status = ''
		})
		res.send(result)
	})
}


// 冻结用户 通过id 把status 置为 1 
exports.banUser = (req, res) => {
	const status = 1
	const sql = 'update users set status = ? where id = ?'
	db.query(sql, [status, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '冻结成功'
		})
	})
}



// 解冻用户
exports.hotUser = (req, res) => {
	const status = 0
	const sql = 'update users set status = ? where id = ?'
	db.query(sql, [status, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '解冻成功'
		})
	})
}

// 获取冻结用户列表
exports.getBanList = (req, res) => {
	const sql = 'select * from users where status = "1" '
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 删除用户 id account
exports.deleteUser = (req, res) => {
	const sql = 'delete from users where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		const sql1 = 'delete from image where account = ?'
		db.query(sql1, req.body.account, (err, result) => {
			if (err) return res.cc(err)
			res.send({
				status: 0,
				message: '删除用户成功'
			})
		})
	})
}

// 获取对应身份的一个总人数 identity
exports.getAdminListLength = (req, res) => {
	const sql = 'select * from users where identity = ? '
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 监听换页返回数据 页码 pager identity
// limit 10 为我们要拿到数据 offset 我们跳过多少条数据
exports.returnListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from users where identity = ? ORDER BY create_time limit 10 offset ${number} `
	db.query(sql, req.body.identity, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}

// 通过部门对用户搜索 department
exports.searchUserByDepartment = (req, res) => {
	const sql = 'select * from users where department = ? and identity = "用户"'
	db.query(sql, req.body.department, (err, result) => {
		if (err) return res.cc(err)
		result.forEach((e) => {
			e.password = ''
			e.image_url = ''
		})
		res.send(result)
	})
}

exports.updateReadStatus=(req,res)=>{
	const {id,status}=req.body;
	const sql='update users set read_status=? where id=?';
	db.query(sql,[status,id],(err,result)=>{
		if(err)return res.cc(err);
		res.send({status:0})
	})
}