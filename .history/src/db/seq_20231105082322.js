const {Sequelize}=require('sequelize')

const {
    M
}=require('../config/config.default')

const seq=new Sequelize('','root','123456',{
    host:'localhost',
    dialect:'mysql'
})

// seq.authenticate().then(()=>{
//     console.log('连接数据库成功');
// }).catch(err=>{
//     console.log('连接数据库失败',err);
// })

module.exports=seq