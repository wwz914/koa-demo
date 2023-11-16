// 该文件主要处理业务，仅用于创建服务，加载路由...采用分层有利于降低代码耦合度
const Koa=require('koa')
const path=require('path')
const {koaBody}=require('koa-body')
const KoaStatic=require('koa-static')
const parameper=require('koa-parameter')
const errHandler=require('./errHandler')
// 创建服务
const app=new Koa()
// 使用参数校验插件
parameper(app)

app.use(koaBody({
    // 以下为上传图片的需要声明的option
    multipart:true,
    parsedMethods:['POST', 'PUT', 'PATCH','DELETE'],
    formidable:{
        // 在option中尽量使用绝对路径
        uploadDir:path.join(__dirname,'../upload'),
        keepExtensions:true
    }
}))

app.use(KoaStatic(path.join(__dirname,'../upload')))
// 路由自动加载
const router=require('../router/index')
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error',errHandler)
module.exports=app