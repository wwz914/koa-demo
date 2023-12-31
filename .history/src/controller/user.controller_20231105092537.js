const { error } = require('console')
const {createUser, getUserInfo}=require('../service/user.service')

class UserController{
    async register(ctx,next){
        // 1.获取数据
        const {user_name,password}=ctx.request.body
        // 合法性
        if(!user_name||!password){
            console.error('用户名或密码为空',ctx.request.body);
            ctx.status=400
            ctx.body={
                code:'10001',
                message:'用户名或密码为空',
                result:''
            }
            return
        }
        // 合理性
        console.log('yi'cu',await getUserInfo({user_name}));
        if(await getUserInfo({user_name})){
            ctx.status=409
            ctx.body={
                code:'10002',
                message:'用户已经存在',
                result:''
            }
            return
        }
        // 2.操作数据库
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
    }

    async login(ctx,next){
        ctx.body='用户登录成功'
    }
}

module.exports=new UserController()