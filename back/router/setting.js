const express=require('express');

const router=express.Router();

const setHandler=require('../router_handle/setting');

router.post('/uploadSwiper',setHandler.uploadSwiper);
router.post('/getAllSwiper', setHandler.getAllSwiper)
// 获取公司名称
router.post('/getCompanyName', setHandler.getCompanyName)
// 改变公司名称
router.post('/changeCompanyName', setHandler.changeCompanyName)
// 编辑公司介绍的接口
router.post('/changeCompanyIntroduce', setHandler.changeCompanyIntroduce)
// 获取公司介绍
router.post('/getCompanyIntroduce', setHandler.getCompanyIntroduce)
// 获取所有公司信息
router.post('/getAllCompanyIntroduce', setHandler.getAllCompanyIntroduce)
// 部门设置
router.post('/setDepartment', setHandler.setDepartment)
// 获取部门
router.post('/getDepartment', setHandler.getDepartment)
// 产品设置
router.post('/setProduct', setHandler.setProduct)
// 获取产品
router.post('/getProduct', setHandler.getProduct)
module.exports=router;