const express=require('express');
const expressJoi=require('@escook/express-joi')

const {loginLimit}=require('../limit/login')
const router=express.Router();

const loginHandler=require('../router_handle/login');

router.post('/register',expressJoi(loginLimit),loginHandler.register);
router.post('/login',expressJoi(loginLimit),loginHandler.login);
module.exports=router;