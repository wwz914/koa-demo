const Goods=require('../model/goods.model')

class GoodsService{
    async createGood(good){
        const res=await Goods.create(good)
        console.log('创建商品成功');
        return res.dataValues
    }
}

module.exports=new GoodsService()