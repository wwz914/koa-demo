const path=require('path')
const {createGood}=require('../service/goods.service')
const {uploadImgErr,uploadFileTypeErr,goodPubErr}=require('../constants/err.type');
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
}

module.exports=new GoodsController()