const Router=require('koa-router')

const {auth,hasAdminPermission,validator}=require('../middleware/auth.middleware')
const {upload,publishGoods,updateGoods,remove,restore,findAll}=require('../controller/goods.controller')

const router=new Router({prefix:'/goods'})

// 上传图片接口
router.post('/upload',auth,hasAdminPermission,upload)

// 发布商品接口
router.post('/',auth,hasAdminPermission,validator,publishGoods)  

// 修改商品接口
router.put('/:id',auth,hasAdminPermission,validator,updateGoods)

// 下架商品接口
router.post('/:id/off',auth,hasAdminPermission,remove)

// 上架商品接口
router.post('/:id/on',auth,hasAdminPermission,restore)

// 查询所有商品接口
router.get('/',findAll)

module.exports=router