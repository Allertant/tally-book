const mongoose = require('mongoose')
// 创建文档的结构对象，设置集合中文档的属性以及属性值
let AccountSchema = new mongoose.Schema({
    // title
    title:{
        type:String,
        required:true
    },
    // time
    time:{
        type:Date,
        required:true
    },
    // type
    type:{
        type:Number,
        default:-1,
        enum:[-1,1]
    },
    //account
    account:{
        type:Number,
        required:true
    },
    // remarks
    remarks:{
        type:String
    }
})
// 创建模型对象，对文档操作的封装对象
let AccountModel = mongoose.model('accounts',AccountSchema) // 集合名称，结构对象

// 向外暴露对象
module.exports = AccountModel