const User=require('../model/user.model')

class UserService{
    async createUser(user_name,password){
        // todo:写入数据库
        const res=await User.create({user_name,password})
        return res.dataValues
    }

    async getUserInfo({id,user_name,is_})
}

module.exports=new UserService()