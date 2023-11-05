const { DataTypes}=require('sequelize')

const seq=require('../db//seq')

// 创建模型,执行方法就能创建b
const User=seq.define('zd_user',{
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        comment:'用户名，唯一'
    },
    password:{
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:'密码'
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:'是否为管理员'
    }
})