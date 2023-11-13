const Router=require('koa-router')

const {auth,hasAdminPermission,validator}=require('../middleware/auth.middleware')
const {upload,publishGoods}=require('../controller/goods.controller')

const router=new Router({prefix:'/goods'})

// 上传图片接口
router.post('/upload',auth,hasAdminPermission,upload)

// 发布商品接口
router.post('/',auth,hasAdminPermission,validator,publishGoods)
module.exports=router