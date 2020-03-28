const requireDirectory = require('require-directory');
const Router = require('koa-router')

class InitManager {
    static initCore(app){
        //入口方法
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadConfig()
    }
    
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }

    static initLoadRouters() {
        //自动注册路由
        //path config
        const apiDirectory = `${process.cwd()}/app/api` //api所在的固定地址
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManager


// 手动注册路由
// app.use(book.routes())
// app.use(classic.routes())