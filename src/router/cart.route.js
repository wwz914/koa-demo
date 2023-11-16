// 1.导入koa-Router
const Router = require("koa-router")
// 2.实例化router对象
const router=new Router({prefix:'/carts'})
const {auth}=require('../middleware/auth.middleware')
const {add,get,edit, remove,selectAll,unSelectAll}=require('../controller/carts.controller')
// 3.编写路由规则
// 加入接口：认证->查重->添加
router.post('/',auth,add)
// 获取列表接口
router.get('/',auth,get)
// 更新接口
router.patch('/:id',auth,edit)
// 删除接口
router.delete('/',auth,remove)
// 全选接口
router.post('/selectAll',auth,selectAll)
// 全不选接口
router.post('/unSelectAll',auth,unSelectAll)
// 4.导出router对象
module.exports=router