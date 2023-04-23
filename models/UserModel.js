const mongoose = require('mongoose')
// 创建文档的结构对象，设置集合中文档的属性以及属性值
let UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    }
    
})
// 创建模型对象，对文档操作的封装对象
let UserModel = mongoose.model('users',UserSchema) // 集合名称，结构对象

// 向外暴露对象
module.exports = UserModel