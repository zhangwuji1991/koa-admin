const Router = require('koa-router')
const router = new Router()
const { HttpException, ParameterException } = require('../../../core/http-exception')
const { ValidationInteger } = require('../../validators/validator')

router.get('/v1/:id/classic/latest', async (ctx, netx) => {
   const path = ctx.params
   const query = ctx.request.query
   const headers = ctx.request.header
   const body = ctx.request.body
   const v = await new ValidationInteger().validate(ctx)
   
   ctx.body = 'success'
})

module.exports = router