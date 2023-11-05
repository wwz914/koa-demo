const { DataTypes}=require('sequelize')

const seq=require('../db//seq')

// 创建模型
const User=seq.define('zd_user',{
    user_name:{
        type:DataTypes.STRING,
        allowNull:
    }
})