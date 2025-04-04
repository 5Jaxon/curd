const { status } = require('express/lib/response');
const db=require('../db/index');
//加密中间间
const bcrypt=require('bcrypt');
//jwt生成token
const jwt =require('jsonwebtoken')
//jwt config
const jwtConfig=require('../jwt_config/index');

exports.register= (req,res)=>{
    const info=req.body;
    const sql="select * from users where account=?";
    db.query(sql,info.account, async(err,result)=>{
        if(err)return res.cc(err);
        if(result.length>0){
            return res.send({
                status:1,
                message:"账号已存在"
            })
        }
        const sql1='insert into users set?';
        info.password=await bcrypt.hash(info.password,10);
        const identity='用户';
        const create_time=new Date();
        db.query(sql1, {
            account:info.account,
            password:info.password,
            identity,
            create_time,
            status:0  // status: 0}
        },(err,result)=>{
            if(err)return res.cc(err);
            
            if(result.affectedRows!==1){
                return res.send({
                    status:1,
                    message:'注册失败'});
            }
            return res.send({
                status:0,
                message:'注册成功'
            })
        })
    })
    
}

exports.login=(req,res)=>{
    const info=req.body;
    const sql='select * from users where account=?';
    db.query(sql,info.account,(err,results)=>{
        if(err)return res.cc(err);//报错，一般是无法连接database
        if(results.length!==1) return res.cc('登录失败');
        const flag=bcrypt.compareSync(info.password,results[0].password);
        if(!flag)return res.cc('登录失败');
        if(results[0].status==1)return res.cc('账户冻结');

        const login_time=new Date();
        const sql1='insert into login_log set ?';
        db.query(sql1,{account:results[0].account,email:results[0].email,name:results[0].name,login_time},(err,result)=>{
            if(err)return res.cc(err);
            const user={
                ...results[0],
                password:'',
                imageUrl:'',
                createTime:'',
                updateTime:''
    
            }
            results[0].password=''
            const token=jwt.sign(user,jwtConfig.jwtSercetKey,{expiresIn:'2h'})
            if(results[0].identity=='用户')results[0].route=userRouter
            else if(results[0].identity=='用户管理员')results[0].route=userAdminRouter
            else if(results[0].identity=='消息管理员')results[0].route=messageAdminRouter
            else if(results[0].identity=='产品管理员')results[0].route=productAdminRouter
            else if(results[0].identity=='超级管理员')results[0].route=superAdminRouter
            res.send({
                result:results[0],
                status:0,
                message:'登录成功',
                token:'bearer '+token
            })
        })        
    })
}

// 超级管理员路由
const superAdminRouter = [
    {
        name:'product_manage',
        path:'product_manage',
        component:'user_manage/product_manage/index.vue'
    },{
        name:'user_manage',
        path:'user_manage',
        component:'user_manage/user_manage/index.vue'
    },{
        name:'message_manage',
        path:'message_manage',
        component:'user_manage/message_manage/index.vue'
    },{
        name:'user_list',
        path:'user_list',
        component:'user_manage/user_list/index.vue'
    },{
        name:'message',
        path:'message',
        component:'message/index.vue'
    },{
        name:'recycle',
        path:'recycle',
        component:'message/recycle.vue'
    }    
];

// 用户管理员路由
const userAdminRouter = [
    {
        name:'product_manage',
        path:'product_manage',
        component:'user_manage/product_manage/index.vue'
    },{
        name:'user_manage',
        path:'user_manage',
        component:'user_manage/user_manage/index.vue'
    },{
        name:'message_manage',
        path:'message_manage',
        component:'user_manage/message_manage/index.vue'
    },{
        name:'user_list',
        path:'user_list',
        component:'user_manage/user_list/index.vue'
    }
];
// 产品管理员路由
const productAdminRouter = [];
// 消息管理员路由
const messageAdminRouter = [
    {
        name:'message',
        path:'message',
        component:'message/index.vue'
    },{
        name:'recycle',
        path:'recycle',
        component:'message/recycle.vue'
    }    
];
// 普通用户路由
const userRouter = [];
