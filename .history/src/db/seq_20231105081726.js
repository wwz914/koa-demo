const {Sequelize}=require('sequelize')

const seq=new Sequelize('zdsc','root','123456',{
    host:'localhost',
    dialect:'mysql'
})

seq.authenticate().then(()=>{
    console.log('连接数据库成功');
}).catch(err)