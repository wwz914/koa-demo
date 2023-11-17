const Router=require('koa-router')
const router=new Router({prefix:'/order'})
const {auth}=require('../middleware/auth.middleware')
const {validator}=require('../middleware/order.middleware')
const {generate,getOrder,update}=require('../controller/order.controller')
// 生成订单接口
router.post('/',auth,validator({
    address_id:{type:'number'},
    goods_info:{type:'string'},
    total:{type:'number'}
}),generate)
// 获取订单接口
router.get('/',auth,getOrder)
// 更新订单接口
router.patch('/:id',auth,validator({status:{type:'number'}}),update)
module.exports=router