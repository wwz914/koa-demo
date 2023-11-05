const User=require('')

class UserService{
    async createUser(user_name,password){
        // todo:写入数据库
        // User.createUser(user_name,password){
        //     User.create({
        //         user_name,password
        //     })
        // }
        const res=await User.create({user_name,password})
        console.log(res);
        return res
    }
}

module.exports=new UserService()