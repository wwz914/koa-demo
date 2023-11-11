// 该文件主要处理业务，仅用于创建服务，加载路由...采用分层有利于降低代码耦合度
const Koa=require('koa')
const {koaBody}=require('koa-body')

const errHandler=require('./errHandler')
// 创建服务
const app=new Koa()

app.use(koaBody())

const userRouter=require('../router/user.route')

app.use(userRouter.routes())

// 统一的错误处理
app.on('error',errHandler)
module.exports=app