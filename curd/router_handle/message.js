const { log } = require('console');
const db=require('../db/index')

exports.getMessage=(req,res)=>{
    const{department,level,page}=req.body;
	number=(page-1)*10;
    const sql=`select * from message where message_level like ? and message_publish_department like ? and message_status=0 ORDER BY message_publish_time limit 10 offset ${number}`;
    db.query(sql,[`%${level}%`,`%${department}%`],(err,result)=>{
        if(err)return res.cc(err);
        res.send(result)
    })
}

// 获取公司公告总数
exports.getCompanyMessageLength = (req, res) => {
	const{department,level}=req.body;
	const sql = 'select * from message where message_level like ? and message_publish_department like ? and message_status=0';	
	db.query(sql, [`%${level}%`,`%${department}%`],(err, result) => {
		if (err) return res.cc(err)												
		res.send({
			length: result.length
		})
	})
}

exports.publishMessage = (req, res) => {
	const update_read_list=(id,result)=>{
		return new Promise((res,rej)=>{
			const sql='update users set read_list =? ,read_status = 0 where id=?';	
			if(result.read_list==null)result.read_list='[]'
			let temp=JSON.parse(result.read_list)
			temp.push({id,status:0})
			result.read_list=JSON.stringify(temp)
			db.query(sql,[result.read_list,result.id],(err,result)=>{
				if(err)rej(err)
				res()						
			})
		})
	}

	const {
		message_title,
		message_category,
		message_publish_department,
		message_publish_name,
		message_receipt_object,
		message_content,
		message_level
	} = req.body
	const message_publish_time = new Date()
	const sql = 'insert into message set ? '
	db.query(sql, {
		message_title,
		message_category,
		message_publish_department,
		message_publish_name,
		message_publish_time,
		message_click_number: 0,
		message_status: 0,
		message_receipt_object,
		message_content,
		message_level
	}, (err, result1) => {
		if (err) return res.cc(err)
		let sql1;
		if(message_receipt_object=='全体成员')sql1='select read_list,id from users';
		else sql1='select read_list,id from users where department like ?';
		db.query(sql1,message_receipt_object, (err,result2)=>{
			if(err)return res.cc(err);			
			let pro= Promise.all(result2.map(e=>update_read_list(result1.insertId,e)))
			pro.then(()=>res.send({status:0,message:'发布成功'})).catch((err)=>{
				console.log(err);
				
				res.cc(err)
			})			
		})

	})
}

exports.editMessage = (req, res) => {
	const {
        id,
		message_title,
		message_category,		
		message_publish_name,
		message_receipt_object,
		message_content,
		message_level
	} = req.body
	const message_update_time = new Date();
	const sql = 'update message set ? where id= ?'
	db.query(sql, [{
		message_title,
		message_category,		
		message_publish_name,
		message_update_time,		
		message_receipt_object,
		message_content,
		message_level
	},id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '编辑消息成功',
			department: message_receipt_object,
			id
		})
	})
}


// 更新点击率
exports.updateClick = (req, res) => {
	const {
		message_click_number,
		id
	} = req.body
	number = message_click_number * 1 + 1
	const sql = 'update message set message_click_number = ? where id = ?'
	db.query(sql, [number, id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '点击率增加'
		})
	})
}

// 初次删除
exports.firstDelete = (req, res) => {
	const message_status = 1
	const message_delete_time = new Date()
	const sql = 'update message set message_status = ? ,message_delete_time = ? where id = ?'
	db.query(sql, [message_status, message_delete_time, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '删除成功'
		})
	})
}


// 获取回收站总数
exports.getRecycleMessageLength = (req, res) => {
	const sql = 'select * from message where message_status = 1'
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			length: result.length
		})
	})
}

// 回收站监听换页
exports.returnRecycleListData = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql =
		`select * from message where message_status = 1 ORDER BY message_delete_time limit 10 offset ${number} `
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		res.send(result)
	})
}


// 还原操作
exports.recover = (req, res) => {
	const message_status = 0
	const message_update_time = new Date()
	const sql = 'update message set message_status = ? ,message_update_time = ? where id = ?'
	db.query(sql, [message_status, message_update_time, req.body.id], (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '还原成功'
		})
	})
}


// 删除操作
exports.deleteMessage = (req, res) => {
	const sql = 'delete from message where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '删除消息成功'
		})
	})
}

exports.getReadList=(req,res)=>{
	const getMessage=(id,status)=>{
		return new Promise((res,rej)=>{
			const sql='select * from message where id=? and message_status=0';
			db.query(sql,id,(err,result)=>{
				if(err)rej(err);
				else if(result.length>0){
					result[0].status=status;
					list.push(result[0])
				}
				res();
			})
		})
	}
	const {id}=req.body
	const list=[];	
	const sql='select read_list from users where id=?'
	db.query(sql,id,(err,result)=>{
		if(err)return res.cc(err);
		let temp=JSON.parse(result[0].read_list||'[]')
		let pro =Promise.all(temp.map((e)=>getMessage(e.id,e.status)))
		pro.then(()=>res.send(list));
		pro.catch(()=>res.cc(err));
	})
}

exports.read=(req,res)=>{
	const{message_id,user_id}=req.body;
	const sql='update message set message_click_number=message_click_number+1 where id=?'
	db.query(sql,message_id,(err,result)=>{
		if(err)return res.cc(err);
		const sql1='select read_list from users where id=?'
		db.query(sql1,user_id,(err,result)=>{
			if(err)return res.cc(err);
			let read_list=JSON.parse(result[0].read_list);
			for(const obj of read_list){
				if(obj.id==message_id){
					obj.status=1;
					break;
				}
			}
			read_list=JSON.stringify(read_list)
			const sql2='update users set read_list = ? where id=?';			
			db.query(sql2,[read_list,user_id],(err,result)=>{
				if(err)return res.cc(err);
				res.send({
					status:0
				})
			})
		})
		
	})
}

