const {addrParamsErr}=require('../constants/err.type')
const validator=(rule)=>{
     return async(ctx,next)=>{
        try{
            await ctx.verifyParams(rule)
        }catch(err){
            console.error(err);
            addrParamsErr.result=err
            return ctx.app.emit('error',addrParamsErr,ctx)
        }
         await next()
    }
}
module.exports={
    validator 
}