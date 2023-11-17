const {DataTypes}=require('sequelize')
const seq=require('../db/seq')

const Order=seq.define('zd_order',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    address_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'地址id'
    },
    goods_info:{
        type:DataTypes.TEXT,
        allowNull:false,
        comment:'订单信息(json字符串)'
    },
    total:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        comment:'订单总金额'
    },
    order_number:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'唯一订单表标识'
    },
    status:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
        comment:'0:未支付,1:已支付,2:已收货3:已签收,4:取消'
    },
})

// Order.sync({force:true}) 

module.exports=Order 