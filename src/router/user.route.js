const Router=require('koa-router')
const { userValidator,
        verifyUser,
        crpyPassword,
        verifyLogin
}=require('../middleware/user.middleware')
const {auth}=require('../middleware/auth.middleware')
const {register,login,changePwd}=require('../controller/user.controller')

const router=new Router({prefix:'/users'})

// 注册接口
router.post('/register',userValidator,verifyUser,crpyPassword,register)
// 登录接口
router.post('/login',userValidator,verifyLogin,login )
// 修改密码接口
router.patch('/',auth,crpyPassword,changePwd)
module.exports=router