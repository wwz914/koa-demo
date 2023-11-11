const { error, log } = require('console')
const {createUser, getUserInfo}=require('../service/user.service')
const {userRegisterErr}=require('../constants/err.type')
class UserController{
    async register(ctx,next){
        // 1.获取数据
        const {user_name,password}=ctx.request.body
    
        // 2.操作数据库
        try{
            const res=await createUser(user_name,password)
            // 3.返回结果
            ctx.body={
                code:0,
                message:'用户注册成功',
                result:{
                    id:res.id,
                    user_name:res.user_name
                }
            }
        }catch(err){
            console.log(err);
            ctx.app.emit('error',userRegisterErr,ctx)
        }
    }

    async login(ctx,next){
        ctx.body='用户登录成功'
    }
}

module.exports=new UserController()