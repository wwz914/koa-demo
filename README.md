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

所有数据库的操作都在`Service`层完成，`Service`调用`Model`完成数据库操作

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

### 1 拆分中间件

建立constants和errHandler.js

constants：存放各种错误返回类型

- err.type.js(constants文件夹下)：

```javascript
// 定义错误类型
module.exports={
    userFormatErr:{
        code:'10001',
        message:'用户名或密码为空',
        result:''
    },
    userExitErr:{
        code:'10002',
        message:'用户已经存在',
        result:''
    },
    userRegisterErr:{
        code:'10003',
        message:'用户注册错误',
        result:''
    }
}
```

- errHandler.js：错误处理函数，返回添加响应状态码

```javascript
module.exports=(err,ctx)=>{
    let status=500
    switch(err.code){
        case '10001':
            status=400
        break
        case '10002':
            status=409
        break
        default:
            status=500
    }
    ctx.status=status
    ctx.body=err
}
```

### 2 统一错误处理

在`user.middleware.js`中提交错误处理

```javascript
 ctx.app.emit('error',userExitErr,ctx)
```

在`app/index.js`中统一接收错误处理事件

```javascript
const errHandler=require('./errHandler')
app.on('error',errHandler)
```

### 3 错误处理函数

某些错误处理事件会发生独立性错误，需采用try-catch写法

```javascript
const verifyUser=async(ctx,next)=>{
    const {user_name}=ctx.request.body
    try{
        const res=await getUserInfo({user_name})
        if(res){
            console.error('用户名已存在',{user_name});
            ctx.app.emit('error',userExitErr,ctx)
            return//阻止下一个中间件执行
        }
    }catch(err){
        console.error('获取用户信息错误',err);
        ctx.app.emit('error',userRegisterErr,ctx)
        return
    }
    await next()
}
```

## 十二.加密

将密码保存到数据库前，对其进行加密

### 1 安装bcryptjs

```
npm install bcryptjs
```

### 2 编写加密中间件

```javascript
const crpyPassword=async(ctx,next)=>{
    const {password}=ctx.request.body

    const salt = bcrypt.genSaltSync(10);
    // hash保存的是密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password=hash
    await next()
}//写完记得导出
```

### 3 在`route`中使用

```javascript
const {userValidator,verifyUser,crpyPassword}=require('../middleware/user.middleware')
router.post('/register',userValidator,verifyUser,crpyPassword,register)
```

阶段总结：



## 十三.登陆验证

- 登录校验中间件

```javascript
const verifyLogin=async(ctx,next)=>{
    const {user_name,password}=ctx.request.body
    try{
        const res=await getUserInfo({user_name})
        if(!res){
            console.error('用户不存在',user_name);
            ctx.app.emit('error',userNotExitErr,ctx)
            return
        }
        if(!bcrypt.compareSync(password, res.password)){
            ctx.app.emit('error',invalidPwdErr,ctx)
            return
        }
    }catch(err){
        console.error('用户登录失败',err);
        ctx.app.emit('error',userLoginErr,ctx)
        return
    }
    await next()
}
```

- 登录处理函数

```javascript
async login(ctx,next) {
        const {user_name,password}=ctx.request.body
        // ctx.body=`用户登陆成功，${user_name}`
        ctx.body={
            code:0,
            message:'用户登录成功',
            result:{
                user_name
            }
        }
    }
```

## 十四.用户的认证

登录成功后颁发token

jwt:jsonwebtoken

- header：头部
- payload：负载
- signiture：签名

### 1 颁发token

#### 1） 安装jsonwebtoken

```
npm install jsonwebtoken
```

#### 2）在控制器中改写login方法

```javascript
async login(ctx,next) {
        const {user_name,password}=ctx.request.body
        // token的payload需要获取用户信息
        try{
            // 获取除密码之外的所有信息
            const {password,...restUser}=await getUserInfo({user_name})
            ctx.body={
                code:0,
                message:'用户登录成功',
                result:{
                    token:jwt.sign(restUser,JWT_SECRET,{expiresIn:'2d'}),
                }
            }

        }catch(err){
            console.error('用户登陆失败',err);
        }
    }
```

#### 3）定义私钥

![image-20231112125553262](C:\Users\32629\AppData\Roaming\Typora\typora-user-images\image-20231112125553262.png)

### 2 用户认证

#### 1）改写auth中间件

```javascript
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/config.default')
const {tokenExpiresErr,invalidTokenErr}=require('../constants/err.type')
const auth=async(ctx,next)=>{
    // 获取token
    const {authorization}=ctx.request.header
    const token=authorization.replace('Bearer ','')
    // console.log(token);
    try{
        const user=jwt.verify(token,JWT_SECRET)
        ctx.state.user=user
    }catch(err){
        switch(err.name){
            case 'TokenExpiredError':
                console.error('token已过期',err);
                return ctx.app.emit('error',tokenExpiresErr,ctx)
            case 'JsonWebTokenError':
                console.error('无效的token',invalidTokenErr);
                return ctx.app.emit('error',invalidTokenErr,ctx)
        }
    }
    await next()
}

module.exports={
    auth
}
```

#### 2）改写router

![image-20231112130230954](C:\Users\32629\AppData\Roaming\Typora\typora-user-images\image-20231112130230954.png)

## 十五.路由自动加载

### 1 在`router`文件夹中添加`index.js`

`index.js`

```javascript
const fs=require('fs')

const Router=require('koa-router')
const router=new Router()
fs.readdirSync(__dirname).forEach(file=>{
    // console.log(file);
    if(file!='index.js'){
        let r=require('./'+file)
        router.use(r.routes())
    }
})

// 导出
module.exports=router
```

### 2 改写`app/index.js`中的路由注册方式

PS：`allowedMethods()`用于限制请求发送类型

```javascript
const router=require('../router/index')
app.use(router.routes()).use(router.allowedMethods())
```

## 十六.封装管理员权限

在`auth.middleware.js`中添加授权中间件

```javascript
const hasAdminPermission=async(ctx,next)=>{
    const {is_admin}=ctx.state.user

    if(!is_admin){
        console.error('该用户没有管理员权限');
        return ctx.app.emit('error',noAdminPermissionErr,ctx)
    }

    await next()
}
```

## 十七.上传图片

### 1 添加koa-body的option

```javascript
app.use(koaBody({
    // 以下为上传图片的需要声明的option
    multipart:true,
    formidable:{
        // 在option中尽量使用绝对路径
        uploadDir:path.join(__dirname,'../upload'),
        keepExtensions:true
    }
}))
```

### 2 `controller`中的`upload`函数

```javascript
async upload(ctx,next){
    const {file}=ctx.request.files
    console.log(file);
    if(file){
        console.log('yeahhh');
        ctx.body={
            code:0,
            message:'商品图片上传成功',
            result:{
                goods_img:path.basename(file.filepath),
            }
        }
    }else{
        return ctx.app.emit('error',uploadImgErr,ctx)
    }
}
```

## 十八.发布商品

- `route`层

  ```javascript
  router.post('/',auth,hasAdminPermission,validator,publishGoods) 
  ```

- `controller`层

  ```javascript
  async publishGoods(ctx,next){
      // 调用sevice
      try{
          const {updatedAt,createdAt,...res}=await createGood(ctx.request.body)
          ctx.body={
              code:0,
              message:'商品发布成功',
              result:res
          }
      }catch(err){
          console.error(err);
          return ctx.app.emit('error',goodPubErr,ctx)
      }
  }
  ```

- `service`层

  ```javascript
  async createGood(good){
      const res=await Goods.create(good)
      console.log('创建商品成功');
      return res.dataValues
  }
  ```

## 十九.修改商品

- `route`层

  ```javascript
  router.put('/:id',auth,hasAdminPermission,validator,updateGoods)
  ```

- `controller`层

  ```javascript
  async updateGoods(ctx){
      try{
          const res=await updateGood(ctx.request.body,ctx.params.id)
          ctx.body={
              code:0,
              message:'修改成功',
              result:''
          }
      }catch(err){
          console.error(err);
          return ctx.app.emit('error',goodUpdateErr,ctx)
      }
  }
  ```

- `service`层

  ```javascript
  async updateGood(good,id){
      const res=await Goods.update(good,{where:{id}})
      return res[0]>0?true:false
  }
  ```

## 二十.下架商品

- `route`层

  ```javascript
  router.post('/:id/off',auth,hasAdminPermission,remove)
  ```

- `controller`层

  ```javascript
  async remove(ctx){
      const res=await reomveGoods(ctx.params.id)
      if(res){
          ctx.body={
              code:0,
              message:'下架成功',
              result:''
          }
      }else{
          return ctx.app.emit('error',goodRemoveErr,ctx)
      }
  }
  ```

- `service`层

  ```javascript
  async reomveGoods(id){
      const res=await Goods.destroy({where:{id}})
      return res==1?true:false
  }
  ```

## 二十一.上架商品（略）

## 二十二.获取商品列表

- `route`层

  ```javascript
  router.get('/',findAll)
  ```

- `controller`层

  ```javascript
  async findAll(ctx){
      // 1.解析pageNum和pageSize
      const {pageNum=1,pageSize=10}=ctx.request.query
      // 2.调用数据处理的相关方法
      try{
          const res=await getGoods(pageNum,pageSize)
          // 3.返回结果
          ctx.body={
              code:0,
              message:'获取商品成功',
              result:res
          }
      }catch(err){
          console.error(err);
          return ctx.app.emit('error',goodGetErr,ctx)
      }
  }
  ```

- `service`层

  ```javascript
  async getGoods(pageNum,pageSize){
      const {count,rows}=await Goods.findAndCountAll({
          offset:(pageNum-1)*pageSize,
          limit:pageSize*1
      })
      return{
          pageNum,
          pageSize,
          total:count,
          list:rows
      }
  }
  ```

## 二十三.
