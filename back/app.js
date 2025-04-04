const express=require('express');
const cors=require('cors');
const loginRouter=require('./router/login')
const uploadRouter=require('./router/userinfo')
const setRouter=require('./router/setting')
const proRouter=require('./router/product')
const msgRouter=require('./router/message')
const ovRouter=require('./router/overview')
const port='3007';

app=new express();
app.use(cors());

const multer=require('multer');
const upload=multer({dest:'./public/upload'})
app.use(upload.any())
app.use(express.static('./public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req,res,next)=>{
    res.cc=(err,status=1)=>{
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
    }
    next();
})

const jwtconfig=require('./jwt_config/index');
const {expressjwt:jwt} =require('express-jwt');
app.use(jwt({
    secret:jwtconfig.jwtSercetKey,algorithms:['HS256']
}).unless({
    path:[/^\/api\//]
}))
app.use('/api',loginRouter);
app.use('/user',uploadRouter);
app.use('/set',setRouter);
app.use('/pro',proRouter);
app.use('/message',msgRouter)
app.use('/overview',ovRouter)
const joi =require('joi');

app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError)return res.cc(err);
})
app.listen(port,()=>{
    console.log("localhost:",port);    
});