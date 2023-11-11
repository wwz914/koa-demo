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
npm i nodemon -D
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

### 2 将路由和控制器拆分

路由：解析URL，分布给控制器对应的方法

控制器：处理不同的业务

改写`user.route.js`

```
const Router=require('koa-router')

const {register,login}=require('../controller/user.controller')

const router=Router({prefix:'/users'})

// 注册接口
router.post('/register',register)
// 登录接口
router.post('/login',login )

module.exports=router
```

创建`controller/user.controller.js`

```
class UserController{
    async register(ctx,next){
        ctx.body='用户注册成功'
    }

    async login(ctx,next){
        ctx.body='用户登录成功'
    }
}

module.exports=new UserController()
```

## 六.解析Body

### 1 安装koa-body

```
npm i koa-body
```

### 2 注册中间件

改写`app/index.js`

![image-20231031234710068](C:\Users\32629\AppData\Roaming\Typora\typora-user-images\image-20231031234710068.png)

### 3 解析请求的数据

改写`user.controller.js`

```
const {createUser}=require('../service/user.service')

class UserController{
    async register(ctx,next){
        // 1.获取数据
        const {user_name,password}=ctx.request.body
        // 2.操作数据库
        const res=await createUser(user_name,password)
        // 3.返回结果
        ctx.body=res
    }

    async login(ctx,next){
        ctx.body='用户登录成功'
    }
}

module.exports=new UserController()
```

### 4 拆分service层

service层主要是做数据库处理

创建`src/service/user.service.js`

```
class UserService{
    async createUser(user_name,password){
        // todo:写入数据库
        return '写入数据库成功'
    }
}

module.exports=new UserService()
```

##  七.数据库操作

sequelize ORM数据库工具

ORM：对象关系映射

- 数据表映射(对应)一个类
- 数据表中的数据行(记录)对应一个对象
- 数据表字段对应对象的属性
- 数据表的操作对应对象的方法

### 1 安装sequelize

详细用法参考：sequelize官方文档](https://www.sequelize.cn/)

```
npm i mysql2 sequelize
```

### 2 连接数据库

`src/db/seq.js`

```
// 导入
const {Sequelize}=require('sequelize')

const{
    MYSQL_HOST,
MYSQL_PORT,
MYSQL_USER,
MYSQL_PWD,
MYSQL_DB
}=require('../config/config.default')
// 创建工具实例
const seq=new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,
    dialect:'mysql'
})

// // 测试是否连接数据库成功
// seq.authenticate().then(()=>{
//     console.log('数据库连接成功');
// }).catch((err)=>{
//     console.log('数据库连接失败');
// })

// 导出连接对象
module.exports=seq
```

###  3 编写配置文件

```
APP_PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PWD=123456
MYSQL_DB=zdsc
```

## 八. 创建User模型

### 1 拆分Model层

sequelize主要通过Model对应数据表

创建`src/model/user.model.js`

```
const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const User = seq.define('zd_ser', {
    // id会被sequelize自动创建
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员'
    },

},
)

// User.sync({ force: true })强制删除原表然后重建
module.exports=User
```

## 九.添加用户入库

改写`user.service.js`

```
const User=require('../model/user.model')

class UserService{
    async createUser(user_name,password){
        // todo:写入数据库
        // await表达式：promise对象
        const res= await User.create({user_name,password})//简写
        // console.log(res); 
        return res.dataValues
    }
}

module.exports=new UserService()
```

同时，改写`user.controller.js`中的方法   6

```
async register(ctx,next){
        // 1.获取数据
        const {user_name,password}=ctx.request.body
        // 2.操作数据库
        const res=await createUser(user_name,password)
        // 3.返回结果
        ctx.body={
            code:0,
            message:'用户注册成功',
            result:{
                id:res.id,
                user_name:res.user_name
            }
        }
    }
```

## 十.错误处理

1 改写`user.controller.js`，在获取数据后添加校验代码

```
// 1.获取数据
const {user_name,password}=ctx.request.body
// 合法性
if(!user_name||!password){
    console.error('用户名或密码为空');
    ctx.status=400,
    ctx.body={
        code:'10001',
        message:'用户名或密码为空',
        result:'',
    }
    return
}
// 合理性
if(getUserInfo({user_name})){
    ctx.status=409,
    ctx.body={
        code:'10002',
        message:'用户名已存在',
        result:""
    }
    return
}
```

2 改写`user.service.js`，添加对应方法

```
async getUserInfo({id,user_name,password,is_admin}){
        const whereOpt={}

        // 若id存在就赋值给whereOpt对象
        id&&Object.assign(whereOpt,{id})
        user_name&&Object.assign(whereOpt,{user_name})
        password&&Object.assign(whereOpt,{password})
        is_admin&&Object.assign(whereOpt,{is_admin})
    
        const res=await User.findOne({
            attributes:['id','where','password','is_admin'],
            where:whereOpt
        })

        return res?res.dataValues:null
    }
```

## 十一.拆分中间件

在`错误处理`的基础上优化代码结构

### 1 抽离文件夹`middleware`

在文件夹中新建各模块中间件

```
```





