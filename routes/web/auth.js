var express = require('express');
var router = express.Router();
var UserModel = require('../../models/UserModel')
var md5 = require('md5')

// 注册
router.get('/reg',(req,res)=>{
    //响应html
    res.render('auth/reg')
})

//注册表单提交
router.post('/reg',(req,res)=>{
    const {username,password} = req.body
    UserModel.create({
        username,
        password:md5(password)
    },(err,data)=>{
        if(err) return res.status(500).send('注册失败，请稍后再试')
        res.render('success',{msg:'注册成功',url:'/login'})
    })
})

//登录
router.get('/login',(req,res)=>{
    res.render('auth/login')
})

//登录表单提交
router.post('/login',(req,res)=>{
    const {username,password} = req.body
    UserModel.findOne({username,password:md5(password)},(err,data)=>{
        if(err) return res.status(500).send('登录失败，请稍后再试')
        // 判断data
        if(!data) return res.send('账号或密码错误~')
        //写入session
        req.session.username=data.username
        req.session._id=data._id
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
