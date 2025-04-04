const joi =require('joi');

const account=joi.string().alphanum().max(12).min(6).required();
const password=joi.string().pattern(/^(?![0-9]+$)\w{6,50}$/).required();

exports.loginLimit={
    //对req.body验证
    body:{
        account,
        password}
}
