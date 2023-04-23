var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
var authRouter = require('./routes/web/auth')
// 引入api接口路由
var apiRouter = require('./routes/api/account');
const authApiRouter = require('./routes/api/auth')
// 导入操作session
const session = require('express-session')
const MongoStore = require('connect-mongo')
// 导入配置项
const {DBHOST,DBPORT,DBNAME} = require('./config/config')
// 导入中间件


var app = express();

// 设置session中间件
app.use(session({
  name:'sid', //cookie的name，默认值时connect.sid
  secret:'shiyixi', // 参与加密的字符串（签名）
  saveUninitialized:false, // 是否为每次请求都设置一个cookie用来存储session的id（是否每一次，不管是否使用，都创建session）
  resave:true, // 是否在每次请求时重新保存session
  store:MongoStore.create({
      mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}` //数据库的连接设置
  }),
  cookie:{
      httpOnly:true, // 开启后前端无法进行js操作
      maxAge:1000*60*60*24*7 // 这一条也控制sessionID的过期时间的
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/',authRouter)
// 使用api路由
app.use('/api',apiRouter)
app.use('/api',authApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 响应 404
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
