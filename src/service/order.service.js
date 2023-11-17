const Order=require('../model/order.model')
class orderService{
    async generateOrder(order,user_id,order_number){
        const res=await Order.create({...order,user_id,order_number})
        return res.dataValues
    }
    async getOrderList(user_id){
        const {rows:res}=await Order.findAndCountAll({where:{user_id}})
        return res
    }
    async updateOrder(status,user_id,id){
        const res=await Order.update({status},{where:{user_id,id}})
        return res[0]>0?true:false
    }
}
module.exports=new orderService()