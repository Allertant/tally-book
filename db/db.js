/**
 *  
 * @param {*} success 连接数据库成功的回调
 * @param {*} error 连接数据库失败的回调
 */
module.exports = function(success,error){
    // 判断error,并为其设置默认值
    if(typeof error !== 'function'){
        error = ()=>{
            console.log('连接错误')
        }
    }

    const mongoose = require('mongoose')
    mongoose.set('strictQuery',true)

    // 连接数据库，指定数据库名称
    const {DBHOST,DBPORT,DBNAME} = require('../config/config.js')
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    mongoose.connection.once('open',()=>{
        success()
    })

    mongoose.connection.once('error',()=>{
        error()
    })
    mongoose.connection.once('close',()=>{
        console.log('连接关闭')
    })
}

