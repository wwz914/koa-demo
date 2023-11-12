const bcrypt = require('bcryptjs')
const {getUserInfo}=require('../service/user.service')
const { userExitErr,
        userFormatErr,
        userRegisterErr,
        userNotExitErr,
        userLoginErr,
        invalidPwdErr
}=require('../constants/err.type')
// 注册输入信息完整性校验中间件
const userValidator=async(ctx,next)=>{
    const {user_name,password}=ctx.request.body
    // 合法性
    if(!user_name||!password){
        console.error('用户名或密码为空',ctx.request.body);//打印错误日志
        ctx.app.emit('error',userFormatErr,ctx)
        return
    }
    await next()
}
// 注册查重中间件
const verifyUser=async(ctx,next)=>{
    const {user_name}=ctx.request.body
    try{
        const res=await getUserInfo({user_name})
        if(res){
            console.error('用户名已存在',{user_name});
            ctx.app.emit('error',userExitErr,ctx)
            return//阻止下一个中间件执行
        }
    }catch(err){
        console.error('获取用户信息错误',err);
        ctx.app.emit('error',userRegisterErr,ctx)
        return
    }
    await next()
}
// 密码加密中间件
const crpyPassword=async(ctx,next)=>{
    const {password}=ctx.request.body

    const salt = bcrypt.genSaltSync(10);
    // hash保存的是密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password=hash
    await next()
}
// 验证登录中间件
const verifyLogin=async(ctx,next)=>{
    const {user_name,password}=ctx.request.body
    try{
        const res=await getUserInfo({user_name})
        if(!res){
            console.error('用户不存在',user_name);
            ctx.app.emit('error',userNotExitErr,ctx)
            return
        }
        if(!bcrypt.compareSync(password, res.password)){
            ctx.app.emit('error',invalidPwdErr,ctx)
            return
        }
    }catch(err){
        console.error('用户登录失败',err);
        ctx.app.emit('error',userLoginErr,ctx)
        return
    }
    await next()
}
module.exports={userValidator,
                verifyUser,
                crpyPassword,
                verifyLogin
}