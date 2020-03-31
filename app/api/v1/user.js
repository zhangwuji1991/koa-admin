const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { Success } = require('../../../core/http-exception')

const router = new Router({
    prefix: '/v1/user'
})

//注册 
router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx)

    const user = {
        email: v.get('body.email'),
        nickname: v.get('body.nickname'),
        password: v.get('body.password2')
    }

    await User.create(user)

    throw new Success()

    //获取的参数保存到数据库
    //sequelize 操作mysql
})

module.exports = router