const Addr=require('../model/addr.model')
class addrService{
    async addAddr(addr){
        const res=await Addr.create(addr)
        console.log(res);
        return true
    }
    async getAddrs(user_id){
        const {rows:res}=await Addr.findAndCountAll({where:{user_id}})
        console.log(res);
        return res
    }
    async updateAddr(addr,id){
        const res=await Addr.update(addr,{where:{id}})
        return res[0]>0?true:false
    }
    async removeAddr(id){
        const res=await Addr.destroy({where:{id}})
        return res>0?true:false
    }
    async serDefaultAddr(id,user_id){
        const res0=await Addr.update({is_default:0},{where:{user_id}})
        if(res0[0]<=0)return false
        const res1=await Addr.update({is_default:1},{where:{id}})
        return res1[0]>0?true:false
    }
}
module.exports=new addrService() 