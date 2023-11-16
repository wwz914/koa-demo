const {DataTypes}=require('sequelize')

const seq=require('../db/seq')

const Carts=seq.define('zd_carts',{
    goods_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'商品id'
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:'数量'
    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:1,
        comment:'选中为1，否则为0'
    }
})

// Carts.sync({force:true})

module.exports=Carts