const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

// require('./app/models/user')

const app = new Koa()
//监听全局异常
app.use(catchError)
//获取数据
app.use(parser())
//抽离功能
InitManager.initCore(app)
//监听端口号
app.listen(3000)