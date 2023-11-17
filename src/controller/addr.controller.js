const { addAddr ,getAddrs,updateAddr,removeAddr,serDefaultAddr} = require("../service/addr.service")

class addrController{
    async add(ctx){
        try{
            ctx.request.body.user_id=ctx.state.user.id
            const res=await addAddr(ctx.request.body)
            if(res){
                ctx.body={
                    code:0,
                    message:'地址添加成功',
                    result:''
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',addrAddErr,ctx)
        }
    }
    async getList(ctx){
        try{
            console.log('ctx.state.user.id:',ctx.state.user.id);
            const res=await getAddrs(ctx.state.user.id)
            ctx.body={
                code:0,
                message:'获取地址列表成功',
                data:res
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',addrGetErr,ctx)
        }
    }
    async update(ctx){
        try{
            const addr=ctx.request.body
            const id=ctx.params.id
            const res=await updateAddr(addr,id)
            if(res){
                ctx.body={
                    code:0,
                    message:'地址更新成功'
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',addrUpdateErr,ctx)
        }
        
    }
    async remove(ctx){
        try{
            const id=ctx.params.id
            const res=await removeAddr(id)
            if(res){
                ctx.body={
                    code:0,
                    message:'地址删除成功',
                    result:''
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',addrDeleteErr,ctx)
        }
    }
    async serDefault(ctx){
        try{
            const id=ctx.params.id
            const user_id=ctx.state.user.id
            const res=await serDefaultAddr(id,user_id)
            if(res){
                ctx.body={
                    code:0,
                    message:'设置默认地址成功',
                    result:''
                }
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',addrSetDefaultErr,ctx)
        }
    }
}
module.exports=new addrController()