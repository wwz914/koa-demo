const path=require('path')
const {createGood,updateGood,reomveGoods,restoreGoods,getGoods}=require('../service/goods.service')
const {uploadImgErr,uploadFileTypeErr,goodPubErr,goodRemoveErr,goodRestoreErr,goodGetErr}=require('../constants/err.type');
const { log } = require('console');
class GoodsController{
    async upload(ctx,next){
        const {file}=ctx.request.files
        console.log(file);
        if(file){
            const fileType=['image/jepg','image/png']
            // 处理上传文件类型错误问题
            if(!fileType.includes(file.mimetype)){
                return ctx.app.emit('error',uploadFileTypeErr,ctx)
            }
            ctx.body={
                code:0,
                message:'商品图片上传成功',
                result:{
                    goods_img:path.basename(file.filepath),
                }
            }
        }else{
            return ctx.app.emit('error',uploadImgErr,ctx)
        }
    }

    async publishGoods(ctx,next){
        // 调用sevice
        try{
            const {updatedAt,createdAt,...res}=await createGood(ctx.request.body)
            ctx.body={
                code:0,
                message:'商品发布成功',
                result:res
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',goodPubErr,ctx)
        }
    }

    async updateGoods(ctx){
        try{
            const res=await updateGood(ctx.request.body,ctx.params.id)
            ctx.body={
                code:0,
                message:'修改成功',
                result:''
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',goodUpdateErr,ctx)
        }
    }

    async remove(ctx){
        const res=await reomveGoods(ctx.params.id)
        if(res){
            ctx.body={
                code:0,
                message:'下架成功',
                result:''
            }
        }else{
            return ctx.app.emit('error',goodRemoveErr,ctx)
        }
    }

    async restore(ctx){
        const res=await restoreGoods(ctx.params.id)
        if(res){
            ctx.body={
                code:0,
                message:'上架成功',
                result:''
            }
        }else{
            return ctx.app.emit('error',goodRestoreErr,ctx)
        }
        
    }

    async findAll(ctx){
        // 1.解析pageNum和pageSize
        const {pageNum=1,pageSize=10}=ctx.request.query
        // 2.调用数据处理的相关方法
        try{
            const res=await getGoods(pageNum,pageSize)
            // 3.返回结果
            ctx.body={
                code:0,
                message:'获取商品成功',
                result:res
            }
        }catch(err){
            console.error(err);
            return ctx.app.emit('error',goodGetErr,ctx)
        }
    }
}

module.exports=new GoodsController()