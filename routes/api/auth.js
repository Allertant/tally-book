var express = require('express');
const jwt = require('jsonwebtoken')
var md5 = require('md5')
var UserModel = require('../../models/UserModel')


var router = express.Router();

//登录表单提交
router.post('/login',(req,res)=>{
    const {username,password} = req.body
    UserModel.findOne({username,password:md5(password)},(err,data)=>{
        if(err) return res.json({
            code:"2001",
            msg:'数据库读取失败',
            data:null
        })
        // 判断data
        if(!data) return res.json({
            code:'2002',
            msg:'用户名或密码错误~',
            data:null
        })
        //创建当前用户的token 
        let token = jwt.sign({
            username:data.username,
            _id:data._id
        },'shiyixi',{
            expiresIn:60*60*24*7
        })
        //响应token
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })
        res.render('success',{msg:'登录成功',url:'/account'})
    })
})

// 退出登录
router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'login'})
    })
})

module.exports = router;
