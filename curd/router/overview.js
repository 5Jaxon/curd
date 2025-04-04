const express=require('express')
const router=express.Router()
const routerHandler=require('../router_handle/overview')

router.post('/getUser',routerHandler.getUser);
router.post('/getProduct',routerHandler.getProduct);
router.post('/getMessage',routerHandler.getMessage);
router.post('/getLogin',routerHandler.getLogin);
module.exports=router