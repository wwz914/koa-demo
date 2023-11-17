const Router=require('koa-router')
const router=new Router({prefix:'/addr'})

const {auth}=require('../middleware/auth.middleware')
const {validator}=require('../middleware/addr.middleware')
const {add,getList,update, remove,serDefault}=require('../controller/addr.controller')

// 添加地址接口
router.post('/',auth,validator({
    consignee:{type:'string',required:true},
    phone:{type:'string',format: /^1\d{10}$/,required:true},
    address:{type:'string',required:true},
}),add)
// 获取地址列表接口
router.get('/address',auth,getList)
// 更新地址接口
router.put('/address/:id',auth,validator({
    consignee:{type:'string',required:true},
    phone:{type:'string',format: /^1\d{10}$/,required:true},
    address:{type:'string',required:true},
    is_default:{type:'number',required:true}
}),update)
// 删除地址接口
router.delete('/address/:id',auth,remove)
// 设置默认地址接口
router.patch('/address/:id',auth,serDefault)
module.exports=router 