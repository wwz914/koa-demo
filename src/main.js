const app=require('./app')

const {APP_PORT}=require('./config/config.default')

app.use((ctx,next)=>{
    ctx.body='hello world'
})

app.listen(3000,()=>{
    console.log(`sever is running on http://localhost:${APP_PORT}`);
})