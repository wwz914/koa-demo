const { where } = require('sequelize')
const User=require('../model/user.model')

class UserService{
    async createUser(user_name,password){
        // todo:写入数据库
        const res=await User.create({user_name,password})
        return res.dataValues
    }

    async getUserInfo({id,user_name,password,is_admin}){
        const whereOpt={}

        id&&Object.assign(whereOpt,{id})
        user_name&&Object.assign(whereOpt,{user_name})
        is_admin&&Object.assign(whereOpt,{is_admin})
        password&&Object.assign(whereOpt,{password})

        const res=User.findOne({
            attributes:['id','user_name','password','is_admin'],
            where:whereOpt
        })

        return res?res.da
    }
}

module.exports=new UserService()