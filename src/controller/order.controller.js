const {v4:uuid}=require('uuid')
const {generateOrder,getOrderList,updateOrder}=require('../service/order.service')
class orderController{
    async generate(ctx){
        try{
            const order=ctx.request.body
            const user_id=ctx.state.user.id
            // 用uuid插件生成订单号
            const order_number=uuid()
            const res=await generateOrder(order,user_id,order_number)
            ctx.body={
                code:0,
                message:'订单生成成功',
                result:res
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',orderGenerateErr,ctx)
        }
    }
    async getOrder(ctx){
        try{    
            const user_id=ctx.state.user.id
            const res=await getOrderList(user_id)
            ctx.body={
                code:0,
                message:'订单获取成功',
                data:res
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',orderGetErr,ctx)
        }

    }
    async update(ctx){
        try{
            const user_id=ctx.state.user.id
            const id=ctx.params.id
            const {status}=ctx.request.body
            const res=await updateOrder(status,user_id,id)
            if(res){
                ctx.body={
                    code:0,
                    message:'订单更新成功',
                    result:''
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',orderUpdateErr,ctx)
        }
    }
}
module.exports=new orderController() 