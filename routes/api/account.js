var express = require('express');
const moment = require('moment')
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取账户列表
router.get('/account',checkTokenMiddleware, (req, res, next) => {
  console.log('ip=', req.ip)

  // 读取集合信息
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) return res.json({
      code: '1001',
      msg: '读取失败',
      data: null
    })
    res.json({
      //响应编号：20000 / 0000 / 000000
      code: '0000',
      //响应信息
      msg: '读取成功',
      //响应数据
      data
    })
  })
})

// 新增记录
router.post('/account', checkTokenMiddleware,(req, res) => {
  // 插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) return res.json({
      code: '1002',
      msg: '创建失败~~',
      data: null
    })
    // 成功提醒
    res.json({
      code: '0000',
      msg: '创建成功',
      data
    })
  })
})

// 删除记录
router.delete('/account/:id',checkTokenMiddleware, (req, res, next) => {
  let id = req.params.id
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) return res.json({
      code: '1003',
      msg: '删除失败~',
      data: null
    })
    res.json({
      code: '0000',
      msg: '删除成功',
      data
    })
  })
})

// 获取单个账单信息
router.get('/account/:id',checkTokenMiddleware, (req, res, next) => {
  let id = req.params.id
  AccountModel.findById(id, (err, data) => {
    if (err) return res.json({
      code: '1004',
      msg: '读取失败~',
      data: null
    })
    res.json({
      code: '0000',
      msg: '删除成功',
      data
    })
  })
})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware,(req, res, next) => {
  let { id } = req.params
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) return res.json({
      code: '1005',
      msg: '更新失败~~',
      data: null
    })
    AccountModel.findById(id, (err, data) => {
      if (err) return res.json({
        code: '1005',
        msg: '更新失败~~',
        data: null
      })
      // 成功响应
      res.json({
        code: '0000',
        msg: '更新成功',
        data
      })
    })
  })
})

module.exports = router;
