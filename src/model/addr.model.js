const seq=require('../db/seq')

const {DataTypes}=require('sequelize')

const Addr=seq.define('zd_addr',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    consignee:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'收货人'
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'手机号'
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'收货地址'
    },
    is_default:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:'默认地址：1，其他地址：0'
    },
})

// Addr.sync({force:true})

module.exports=Addr