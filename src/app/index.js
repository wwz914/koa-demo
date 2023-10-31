// 该文件主要处理业务，仅用于创建服务，加载路由...采用分层有利于降低代码耦合度
const Koa=require('koa')

// 创建服务
const app=new Koa()

const userRouter=require('../router/user.route')

app.use(userRouter.routes())

module.exports=app