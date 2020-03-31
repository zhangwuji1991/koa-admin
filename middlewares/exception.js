const { HttpException } = require('../core/http-exception')


const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        //监听错误 输出一段有意义的提示信息
        //error 堆栈调用信息
        //error 简化 清晰明了对信息 给前端
        //http status
        //message
        //error_code 详细 开发着自己定义
        //request_url 当前请求的url
        //已知型错误 校验获取参数出现
        //未知型错误 程序潜在错误 无意识 根本不知道他出错了
        //连接数据库 账号 密码 输错了
        //生产环境
        //开发环境 控制台打印错误
        //开发环境 不是httpexception
        const isHttpException = error instanceof HttpException
        const isDew = global.config.environment === 'dev'

        if (isDew && !isHttpException) {
            throw error
        }

        if (isHttpException) {
            ctx.body = {
                msg:error.msg,
                error_code: error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }else{
            //处理未知异常
            ctx.body = {
                msg: 'we made a mistake',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError