const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/config.default')
const {createUser,getUserInfo,updateById}=require('../service/user.service')
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

    async login(ctx,next) {
        const {user_name,password}=ctx.request.body
        // token的payload需要获取用户信息
        try{
            // 获取除密码之外的所有信息
            const {password,...restUser}=await getUserInfo({user_name})
            ctx.body={
                code:0,
                message:'用户登录成功',
                result:{
                    token:jwt.sign(restUser,JWT_SECRET,{expiresIn:'2d'}),
                }
            }

        }catch(err){
            console.error('用户登陆失败',err);
        }
    }

    async changePwd(ctx,next){
        // 获取数据
        const id=ctx.state.user.id
        const password=ctx.request.body.password
        console.log(id,password);
        // 调用service操作数据库
        try{
            const res=await updateById({id,password})
            if(res){
                ctx.body={
                    code:0,
                    message:'密码修改成功',
                    result:''
                }
            }
        }catch(err){
            console.error();
            ctx.body={
                code:'10007',
                message:'修改密码失败',
                result:''
            }
        }
        // 返回结果
    }
}

module.exports=new UserController()