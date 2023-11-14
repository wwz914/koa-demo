// 1.导入koa-Router
const Router = require("koa-router")
// 2.实例化router对象
const router=new Router({prefix:'/carts'})
const {auth}=require('../middleware/auth.middleware')
// 3.编写路由规则
// 加入购物车接口：校验->->
router.post('/',auth,(ctx,next)=>{
    ctx.body='购物车路由'
})
// 4.导出router对象
module.exports=router