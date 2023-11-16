const {cartsAddErr,cartsGetErr,cartsEditErr}=require('../constants/err.type')
const {addToCart,getCarts,editCart,removeCart,selectAllCarts,unSelectAllCarts}=require('../service/carts.service')
class CartsController{
    async add(ctx){
        try{
            ctx.request.body.user_id=ctx.state.user.id
            const res=await addToCart(ctx.request.body)
            ctx.body={
                code:0,
                message:'已加入购物车',
                result:''
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',cartsAddErr,ctx)
        }
    }
    async get(ctx){
        try{
            const {pageNum=1,pageSize=8}=ctx.request.query
            const res=await getCarts(pageNum,pageSize)
            if(res){
                ctx.body={
                    code:0,
                    message:'购物车列表获取成功',
                    result:res
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',cartsGetErr,ctx)
        }
    }
    async edit(ctx){
        try{
            ctx.request.body.user_id=ctx.state.user.id
            ctx.request.body.goods_id=ctx.params.id
            const res=await editCart(ctx.request.body)
            if(res){
                ctx.body={
                    code:0,
                    message:'购物车更新成功',
                    result:res
                }
            }
        }catch{
            console.error(err);
            return ctx.app.emit('error',cartsEditErr,ctx)
        }
        
    }
    async remove(ctx){
        try{
            const {ids}=ctx.request.body
            // console.log('数组是：',ids);
            const res=await removeCart(ids)
            ctx.body={
                code:0,
                message:'删除购物车成功',
                result:res
            }
        }catch(err){
            // console.log('--------------------------------------');
            console.error(err);
            return ctx.app.emit('error',cartsDeleteErr,ctx)
        }
    }
    async selectAll(ctx){
        try{
            const res=await selectAllCarts()
            if(res){
                ctx.body={
                    code:0,
                    message:'已全选',
                    result:''
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',selectAllErr,ctx)
        }
    }
    async unSelectAll(ctx){
        try{
            const res=await unSelectAllCarts()
            if(res){
                ctx.body={
                    code:0,
                    message:'已取消全选',
                    result:''
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',unSelectAllErr,ctx)
        }
    }
}

module.exports=new CartsController()