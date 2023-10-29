const Koa=require('koa')

// 创建服务
const app=new Koa()

// 中间件
app.use((ctx,next)=>{
    ctx.body='hello world!'
})

app.listen(3000,()=>{
    console.log('sever is running on http://localhost:3000');
})