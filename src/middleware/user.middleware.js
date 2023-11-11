const {getUserInfo}=require('../service/user.service')
const {userExitErr,userFormatErr,userRegisterErr}=require('../constants/err.type')
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

const verifyUser=async(ctx,next)=>{
    const {user_name}=ctx.request.body
    // 合理性
    // console.log('已存在',await getUserInfo({user_name}));
    // if(await getUserInfo({user_name})){
    //     ctx.app.emit('error',userExitErr,ctx)
    //     return
    // }
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
module.exports={userValidator,verifyUser}