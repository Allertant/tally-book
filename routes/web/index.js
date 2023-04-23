const express = require('express');
const moment = require('moment')
const AccountModel = require('../../models/AccountModel');
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

// 创建路由对象
const router = express.Router();

//使用路由中间件

// 首页页面
router.get('/',checkLoginMiddleware, function(req, res, next) {
  // 重定向账单页表页
  res.redirect('/account')
});

//账户也米娜
router.get('/account',checkLoginMiddleware,(req,res,next)=>{
  // 读取集合信息
  AccountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err) return res.status(500).send('读取失败~~')
    res.render('list',{accounts:data,moment})
  })
})

// 创建记录页面
router.get('/account/create',checkLoginMiddleware,(req,res,next)=>{
  res.render('create')
})

// 新增记录
// 转换日期（字符串==》日期对象）
router.post('/account',(req,res)=>{
  // 插入数据库
  AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  },(err,data)=>{
    if(err) return res.status(500).send('插入失败~~')
    // 成功提醒
    res.render('success',{msg:'添加成功哦',url:'/account'})
  })
})

// 删除记录
router.get('/account/:id',checkLoginMiddleware,(req,res,next)=>{
  let id = req.params.id
  AccountModel.deleteOne({_id:id},(err,data)=>{
    if(err) return res.status(500).send('删除失败~~')
    res.render('success',{msg:'删除成功',url:'/account'})
  })
})

module.exports = router;
