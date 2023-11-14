const Goods=require('../model/goods.model')

class GoodsService{
    // 上传商品
    async createGood(good){
        const res=await Goods.create(good)
        console.log('创建商品成功');
        return res.dataValues
    }
    // 修改商品
    async updateGood(good,id){
        const res=await Goods.update(good,{where:{id}})
        return res[0]>0?true:false
    }
    // 下架商品
    async reomveGoods(id){
        const res=await Goods.destroy({where:{id}})
        return res==1?true:false
    }
    // 上架商品
    async restoreGoods(id){
        const res=await Goods.restore({where:{id}})
        console.log(res);
        return res==1?true:false
    }
    // 查询商品
    async getGoods(pageNum,pageSize){
        const {count,rows}=await Goods.findAndCountAll({
            offset:(pageNum-1)*pageSize,
            limit:pageSize*1
        })
        return{
            pageNum,
            pageSize,
            total:count,
            list:rows
        }
    }
}

module.exports=new GoodsService()