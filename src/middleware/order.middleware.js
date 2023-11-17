const {orderParamsErr}=require('../constants/err.type')
const validator=(rule)=>{
     return async(ctx,next)=>{
        try{
            await ctx.verifyParams(rule)
        }catch(err){
            console.error(err);
            orderParamsErr.result=err
            return ctx.app.emit('error',orderParamsErr,ctx)
        }
         await next()
    }
}
module.exports={
    validator 
}