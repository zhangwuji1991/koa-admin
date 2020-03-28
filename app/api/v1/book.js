const Router = require('koa-router')
const router = new Router()

router.get('/book/latest', (ctx, netx) => {
    console.log(ctx.path)
    ctx.body = { key: "book" }
})

module.exports = router