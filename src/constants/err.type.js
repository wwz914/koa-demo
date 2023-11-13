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
    },
    userNotExitErr:{
        code:'10004',
        message:'用户不存在',
        result:''
    },
    userLoginErr:{
        code:'10005',
        message:'用户登陆失败',
        result:''
    },
    invalidPwdErr:{
        code:'10006',
        message:'用户密码错误',
        result:''
    },
    tokenExpiresErr:{
        code:'10101',
        message:'token已过期',
        result:''
    },
    invalidTokenErr:{
        code:'10102',
        message:'无效的token',
        result:''
    },
    noAdminPermissionErr:{
        code:'10103',
        message:'没有管理员权限',
        result:''
    },
    uploadImgErr:{
        code:'10201',
        message:'商品图片上传失败',
        result:''
    },
    uploadFileTypeErr:{
        code:'10202',
        message:'文件上传类型错误',
        result:''
    },
    goodsParamErr:{
        code:'10203',
        message:'商品参数错误',
        result:''
    },
    goodPubErr:{
        code:'10204',
        message:'商品上传错误',
        result:''
    }
}