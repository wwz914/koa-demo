class UserService{
    async createUser(user_name,password){
        // todo:写入数据库
        // User.createUser(user_name,password){
        //     User.create({
        //         user_name,password
        //     })
        // }
        User.create({user})
        return '写入数据库成功'
    }
}

module.exports=new UserService()