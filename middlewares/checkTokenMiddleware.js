const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')
//声明中间件
let checkTokenMiddleware = (req, res, next) => {
    let token = req.get('token')
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token 缺失',
            data: null
        })
    }
    // 校验token
    jwt.verify(token, secret, (err, data) => {
        if (err) return res.json({
            code: '2004',
            msg: 'token校验失败',
            data: null
        })
        // 保存用户的信息
        erq.user = data
        // 成功
        next()
    })
}
module.exports = checkTokenMiddleware