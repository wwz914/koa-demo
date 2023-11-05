const {Sequelize}=require('sequelize')

const seq=new Sequelize('zdsc','root','123456',{
    host:'localhost',
    dialect:'mysql'
})

seq.authenticate().then(()=>{
    l
})