const express=require('express')
const router=express.Router();
const messageHandler=require('../router_handle/message.js')


// 发布消息
router.post('/publishMessage', messageHandler.publishMessage)
// 编辑公告
router.post('/editMessage', messageHandler.editMessage)
// 获取公告/系统消息
router.post('/getMessage', messageHandler.getMessage)
// 更新点击率
router.post('/updateClick', messageHandler.updateClick)
// 初次删除
router.post('/firstDelete', messageHandler.firstDelete)
// 获取回收站总数
router.post('/getRecycleMessageLength', messageHandler.getRecycleMessageLength)
// 回收站监听换页
router.post('/returnRecycleListData', messageHandler.returnRecycleListData)

// 还原操作
router.post('/recover', messageHandler.recover)
// 删除操作
router.post('/deleteMessage', messageHandler.deleteMessage)
// 获取公司公告总数
router.post('/getCompanyMessageLength', messageHandler.getCompanyMessageLength)
//获取消息列表
router.post('/getReadList', messageHandler.getReadList)
//更新阅读列表，点击次数
router.post('/read', messageHandler.read)
module.exports=router;