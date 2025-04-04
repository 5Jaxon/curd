const express=require('express');
const expressJoi=require('@escook/express-joi')
const router=express.Router();

const userinfoHandler=require('../router_handle/userinfo');
const {name_limit,email_limit,password_limit,forgetPassword_limit,createAdmin_limit}=require('../limit/user');
router.post('/uploadAvatar',userinfoHandler.uploadAvatar);
router.post('/bindAccount',userinfoHandler.bindAccount);
router.post('/getUserInfo',userinfoHandler.getUserInfo);
router.post('/changeName',expressJoi(name_limit),userinfoHandler.changeName);
router.post('/changeSex',userinfoHandler.changeSex);
router.post('/changeEmail',expressJoi(email_limit),userinfoHandler.changeEmail);
// 修改用户密码 changePassword
router.post('/changePassword', expressJoi(password_limit), userinfoHandler.changePassword);
// 验证账号与邮箱 verifyAccountAndEmail
router.post('/verifyAccountAndEmail', userinfoHandler.verifyAccountAndEmail);
// 登录页面修改密码 changePasswordInLogin
router.post('/changePasswordInLogin', expressJoi(forgetPassword_limit),userinfoHandler.changePasswordInLogin);

router.post('/createAdmin',userinfoHandler.createAdmin)
// 获取管理员列表
router.post('/getAdminList',userinfoHandler.getAdminList)
// 编辑管理员账号信息
router.post('/editAdmin',userinfoHandler.editAdmin)
// 对管理员取消赋权
router.post('/changeIdentityToUser',userinfoHandler.changeIdentityToUser)
// 对用户进行赋权
router.post('/changeIdentityToAdmin',userinfoHandler.changeIdentityToAdmin)
// 通过账号对用户搜索
router.post('/searchUser',userinfoHandler.searchUser)
// 冻结用户
router.post('/banUser',userinfoHandler.banUser)
// 解冻用户
router.post('/hotUser',userinfoHandler.hotUser)
// 获取冻结用户列表
router.post('/getBanList',userinfoHandler.getBanList)
// 删除用户 deleteUser
router.post('/deleteUser',userinfoHandler.deleteUser)
// 获取对应身份的一个总人数
router.post('/getAdminListLength',userinfoHandler.getAdminListLength)
// 监听换页返回数据
router.post('/returnListData',userinfoHandler.returnListData)
// 通过部门对用户搜索
router.post('/searchUserByDepartment',userinfoHandler.searchUserByDepartment)
//更新阅读状态
router.post('/updateReadStatus',userinfoHandler.updateReadStatus)
module.exports=router;