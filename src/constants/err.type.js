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
    },
    goodRemoveErr:{
        code:'10205',
        message:'商品下架失败',
        result:''
    },
    goodRestoreErr:{
        code:'10206',
        message:'商品下架失败',
        result:''
    },
    goodGetErr:{
        code:'10207',
        message:'商品获取失败',
        result:''
    },
    cartsAddErr:{
        code:'10301',
        message:'加入购物车失败',
        result:''
    },
    cartsGetErr:{
        code:'10302',
        message:'购物车获取失败',
        result:''
    },
    cartsEditErr:{
        code:'10303',
        message:'购物车更新失败',
        result:''
    },
    cartsDeleteErr:{
        code:'10304',
        message:'购物车删除失败',
        result:''
    },
    selectAllErr:{
        code:'10305',
        message:'购物车全选失败',
        result:''
    },
    unSelectAllErr:{
        code:'10306',
        message:'购物车取消全选失败',
        result:''
    },
    addrParamsErr:{
        code:'10401',
        message:'地址参数错误',
        result:''
    },
    addrAddErr:{
        code:'10402',
        message:'地址添加失败',
        result:''
    },
    addrUpdateErr:{
        code:'10403',
        message:'地址更新失败',
        result:''
    },
    addrDeleteErr:{
        code:'10404',
        message:'地址删除失败',
        result:''
    },
    addrSetDefaultErr:{
        code:'10405',
        message:'设置默认地址失败',
        result:''
    },
    orderParamsErr:{
        code:'10501',
        message:'订单参数错误',
        result:''
    },
    orderGenerateErr:{
        code:'10502',
        message:'订单生成失败',
        result:''
    },
    orderGetErr:{
        ode:'10503',
        message:'订单获取失败',
        result:''
    },
    orderUpdateErr:{
        ode:'10504',
        message:'订单更新失败',
        result:''
    }
}