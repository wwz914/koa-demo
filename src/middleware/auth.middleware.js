const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/config.default')
const { tokenExpiresErr,
        invalidTokenErr,
        noAdminPermissionErr,
        goodsParamErr
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

// 校验商品参数
const validator=async(ctx,next)=>{
    try{
        ctx.verifyParams({
            goods_name:{type:'string',required:true},
            goods_price:{type:'number',required:true},
            goods_num:{type:'number',required:true},
            goods_img:{type:'string',required:true},
        })
        await next()
    }catch(err){
        // 判错
        goodsParamErr.result=err
        return ctx.app.emit('error',goodsParamErr,ctx)
    }
}

module.exports={
    auth,
    hasAdminPermission,
    validator,
}