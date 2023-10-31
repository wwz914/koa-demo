## 一.项目的初始化

### 1 npm初始化 

```cmd
npm init -y
```

生成package.json文件:

-记录项目的依赖

### 2 git初始化

```
git init
```

生成‘.git’隐藏文件夹，git的本地仓库

### 3 创建README文件

## 二.项目搭建

### 1  安装Koa框架

```
npm install koa
```

### 2 编写最基本的app

创建src/main.js

```
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
```

### 3 测试

在终端，使用`node src/main.js`

 ![image-20231029162736271](C:\Users\32629\AppData\Roaming\Typora\typora-user-images\image-20231029162736271.png)

## 三.项目的基本优化

### 1 自动重启项目

安装nodeman工具

```
npm i nodemon
```

编写package.json脚本

```
"scripts": {
    "dev":"nodemon ./src/main.js"
  },
```

执行`npm run dev`启动服务

![image-20231029164505865](C:\Users\32629\AppData\Roaming\Typora\typora-user-images\image-20231029164505865.png)

### 2 读取配置文件

安装` dotenv`,读取跟目录中的.env文件,将配置写在process.env中

```
npm i dotenv
```

创建.env文件

```
APP_PORT=3000
```

创建` src/config/config.default.js`

```
const dotenv=require('dotenv')

dotenv.config()

console.log(process.env.APP_PORT);

module.exports=process.env
```

改写`main.js`

```
const Koa=require('koa')

const {APP_PORT}=require('./config/config.default')

// 创建服务
const app=new Koa()

// 中间件
app.use((ctx,next)=>{
    ctx.body='hello world'
})

app.listen(3000,()=>{
    console.log(`sever is running on http://localhost:${APP_PORT}`);
})
```

## 四.添加路由

路由：根据不同的URL，调用对应的处理函数

### 1 安装koa-router

```
npm i koa-router
```

步骤：

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

### 2 编写路由

创建`src/router`目录，编写`user.route.js`

```
const Router=require('koa-router')

const router=Router({prefix:'/users'})

// GET /users/(统一前缀)
router.get('/',(ctx,next)=>{
    ctx.body='hello user'
})

module.exports=router
```

### 3 改写main.js

```
const app=new Koa()

const userRouter=require('./router/user.route')

app.use(userRouter.routes())
```

## 五.目录结构优化

### 1 将http服务和app业务拆分

创建`src/app`

```
const Koa=require('koa')

const app=new Koa()

const userRouter=require('../router/user.route')

app.use(userRouter.routes())

module.exports=app
```

改写main.js

```
const app=require('./app')

const {APP_PORT}=require('./config/config.default')

app.use((ctx,next)=>{
    ctx.body='hello world'
})

app.listen(3000,()=>{
    console.log(`sever is running on http://localhost:${APP_PORT}`);
})
```

