const Carts=require('../model/carts.model')
const {Op}=require('sequelize')
class CartsService{
    async addToCart(good){
        const {user_id,goods_id}=good;
        // 根据用户id和商品id判断是否重复
        let res=await Carts.findOne({where:{user_id,goods_id}})
        if(res){
            await res.increment('number')
            res=await res.reload()
            return true
        }
        res1=Carts.create(good)
        return true
    }
    async getCarts(pageNum,pageSize){
        const {count,rows}=await Carts.findAndCountAll({
            offset:(pageNum-1)*pageSize,
            limit:pageSize*1
        })
        return{
            pageNum,
            pageSize,
            total:count,
            data:rows
        }
    }
    async editCart(good){
        const {number,selected,user_id,goods_id}=good
        let pageNum=1
        let pageSize=8
        const res=await Carts.update(
            {number,selected},
            {where:{user_id,goods_id}}
        )
        if(res[0]==1){
            const {count,rows}=await Carts.findAndCountAll({
                offset:(pageNum-1)*pageSize,
                limit:pageSize*1
            })
            return{
                pageNum,
                pageSize,
                total:count,
                data:rows
            }
        }else{
            return false
        }
    }
    async removeCart(ids){
        const res=await Carts.destroy({
            where:{
                id:{
                    [Op.in]:ids,
                }
            }
        })
        // console.log('res:',res);
        return res
    }
    async selectAllCarts(){
        const res=await Carts.update({selected:1},{where:{}})
        return res[0]>0?true:false
    }
    async unSelectAllCarts(){
        const res=await Carts.update({selected:0},{where:{}})
        return res[0]>0?true:false
    }
}

module.exports=new CartsService() 