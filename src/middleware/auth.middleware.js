const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/config.default')
const { tokenExpiresErr,
        invalidTokenErr,
        noAdminPermissionErr
}=require('../constants/err.type')
// 认证
const auth=async(ctx,next)=>{
    // 获取token
    const {authorization}=ctx.request.header
    const token=authorization.replace('Bearer ','')
    // console.log(token);
    try{
        const user=jwt.verify(token,JWT_SECRET)
        ctx.state.user=user
    }catch(err){
        switch(err.name){
            case 'TokenExpiredError':
                console.error('token已过期',err);
                return ctx.app.emit('error',tokenExpiresErr,ctx)
            case 'JsonWebTokenError':
                console.error('无效的token',invalidTokenErr);
                return ctx.app.emit('error',invalidTokenErr,ctx)
        }
    }
    await next()
}
// 授权
const hasAdminPermission=async(ctx,next)=>{
    const {is_admin}=ctx.state.user

    if(!is_admin){
        console.error('该用户没有管理员权限');
        return ctx.app.emit('error',noAdminPermissionErr,ctx)
    }

    await next()
}

module.exports={
    auth,hasAdminPermission
}