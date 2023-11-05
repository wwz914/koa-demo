const {Sequelize}=require('sequelize')
cosnt {MYSQL_HOST,} = require('../config/config.default')
const seq=new Sequelize('MYSQL_HOST','root','123456',{
    host:'localhost',
    dialect:'mysql'
})

// seq.authenticate().then(()=>{
//     console.log('连接数据库成功');
// }).catch(err=>{
//     console.log('连接数据库失败',err);
// })

module.exports=seq