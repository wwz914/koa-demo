const {Sequelize}=require('sequelize')

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
}=require('../config/config.default')

const seq=new Sequelize(MYSQL_DB,,{
    host:MYSQL_HOST,
    dialect:'mysql'
})

seq.authenticate().then(()=>{
    console.log('连接数据库成功');
}).catch(err=>{
    console.log('连接数据库失败',err);
})

module.exports=seq