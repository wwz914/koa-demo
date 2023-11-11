const Router=require('koa-router')
const {userValidator,verifyUser,crpyPassword}=require('../middleware/user.middleware')
const {register,login}=require('../controller/user.controller')

const router=new Router({prefix:'/users'})

// 注册接口
router.post('/register',userValidator,verifyUser,crpyPassword,register)
// 登录接口
router.post('/login',login )

module.exports=router