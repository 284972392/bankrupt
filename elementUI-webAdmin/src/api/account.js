//let base = 'http://192.168.2.228:8077/'//天成本地 
      let base = 'http://draw.xiafukeji.com/' //新服务器 

  
const allUrl = {
    login: base+'sys/login',//post 登录
    register: base +'sys/user/save',//注册
    uploadPics: base + 'uploadPic/uploadPics',//上传
    sendEmail : base + 'sys/sendEmail',//发送邮件
    forgetPsw : base + 'sys/user/password' , //忘记密码接口
   
 //广告主接口
  changePassword : base +'/sys/user/changePassword', //更改密码  有可能媒体也会用到， 先写在广告主的页面， 后面需要的话再提出来
   userInfo : base +'/sys/user/info',//用户信息 
   userUpdate : base +'/sys/user/update',//用户更新
   
    qualificationSave : base + '/qualification/save', //资质添加
//  qualificationList : base + '/qualification/list',//资质列表
		qualificationList : base +'/qualification/queryGroupQualification',//资质列表
	  qualificationUpdate: base +'/qualification/update',  //资质更新
    financeRecordRecord: base +'/financeRecord/list', //财务记录
	financeRecordQuery: base +'/financeRecord/query',//导出财务记录
    
    advertSave: base + 'advert/save',//添加广告计划
    advertUpdate: base + '/advert/update',//修改广告计划
    advertList: base + 'advert/list',//广告列表
    adverDataList: base + 'advertData/list',//广告数据列表
    getAdvertById: base + 'advert/getAdvertById',//通过ID查广告信息
    rechargeRecordSave: base + 'rechargeRecord/save',//广告商充值
    rechargeRecordList: base + 'rechargeRecord/list',//充值列表
    advertStatistics: base + 'advert/statistics',//首页广告状态数量统计
    advertQuery: base + 'advert/query',//导出广告列表
// 媒体接口
    mediaList: base + 'media/list',//媒体列表
    mediaSave: base + 'media/save',//新建媒体
    mediaUpdate: base + 'media/update',//更新媒体
    advertPositionList: base + 'advertPosition/list',//广告位列表
    updateAdvertPosition: base + 'advertPosition/update',//修改广告位
    advertPositionSave: base + 'advertPosition/save',//添加广告位

}

export { allUrl }




import request from './request'
//账号模块
//用户管理
export const getUserlist = (params) => {
  return request('get', '/api/v1.0/user/admin/list', params) //管理员获取用户列表
}

export const changeStatus = (params) => {
  return request('post', '/api/v1.0/user/admin/changeStatus', params) //管理员修改用户状态
}
//角色管理
export const getRole = (params) => {
  return request('get', '/api/v1.0/admin/role', params) //获取管理员角色列表
}

export const getPrivilege = (params) => {
  return request('get', '/api/v1.0/admin/role/privilege', params) //获得权限树
}

export const check = (params) => {
  return request('get', '/api/v1.0/admin/role/check', params) //确定角色是否存在
}

export const changeRole = (params) => {
  return request('post', '/api/v1.0/admin/role', params) //添加或者修改管理员角色
}

export const deleteRole = (params) => {
  return request('delete', '/api/v1.0/admin/role', params) //删除管理员角色
}

//管理员
export const getAdminList = (params) => {
  return request('get', '/api/v1.0/admin/list', params) //登陆管理员获取自身信息
}

//export const register = (params) => {
//return request('post', '/api/v1.0/admin/register', params) //添加管理员
//}

export const updateAdmin = (id, params) => {
  return request('post', `/api/v1.0/admin/${id}/update`, params) //更新管理员信息
}

export const deleteAdmin = (id, params) => {
  return request('delete', `/api/v1.0/admin/${id}`, params) //更新管理员信息
}

export const changeAdminStatus = (id, params) => {
  return request('post', `/api/v1.0/admin/${id}/status`, params) //对管理员进行禁用启用
}

export const resetPassword = (id, params) => {
  return request('post', `/api/v1.0/admin/${id}/resetPassword`, params) //重置管理员密码
}
//
//export const login = (params) => {
//return request('post', '/api/v1.0/account/admin/login', params) //管理员登陆
//}

export const logout = (params) => {
  return request('post', '/api/v1.0/account/logout', params) //登出
}

//export const changePassword = (params) => {
//return request('post', '/api/v1.0/account/changePassword', params) //修改密码
//}

export const my = (params) => {
  return request('get', '/api/v1.0/admin/my', params) //登陆管理员获取自身信息
}

export const exist = (params) => {
  return request('get', '/api/v1.0/account/admin/exist', params) //检查管理员用户名是否已经存在
}

export const checkPassword = (params) => {
  return request('post', '/api/v1.0/account/checkPassword', params) //检查当前账号密码是否正确
}

//其他

export const arbitrator = (params) => {
  return request('get', '/api/v1.0/account/admin/arbitrator', params) //查询仲裁员列表
}

export const adminBalance = (params) => {
  return request('get', '/api/v1.0/bills/adminBalance', params) //查询仲裁员列表
}

//广告后台的接口

//登录，注册，忘记密码
export const login = (params) => {
return request('post', allUrl.login, params) //登录
}

export const register = (params) => {
	return request('post', allUrl.register, params) //注册
}

export const sendEmail = (params) => {
	return request('post', allUrl.sendEmail, params) //发送邮箱验证码
}

export const forgetPsw = (params) => {
	return request('post', allUrl.forgetPsw, params) //忘记密码
}
//广告主
export const advertSave = (params) => {
	return request('post', allUrl.advertSave, params) //添加广告计划
}
export const advertUpdate = (params) => {
	return request('post', allUrl.advertUpdate, params) //修改广告计划
}

export const getAdverlist = (params) => {
  return request('get', allUrl.advertList, params) //获取广告列表
}
export const getAdverDataList = (params) => {
  return request('get', allUrl.adverDataList, params) //获取广告数据列表
}
export const rechargeRecordSave = (params) => {
	return request('post', allUrl.rechargeRecordSave, params) //广告商充值
}
export const getRechargeRecordList = (params) => {
  return request('get', allUrl.rechargeRecordList, params) //获取广告数据列表
}
export const advertStatistics = (params) => {
  return request('get', allUrl.advertStatistics, params) //获取首页广告状态数量
}
export const getAdvertById = (params) => {
  return request('get', allUrl.getAdvertById, params) //通过ID查广告信息
}



export const qualificationSave = (params) => {
	return request('post', allUrl.qualificationSave, params) //上传资质
}

export const qualificationList = (params) => {
	return request('get', allUrl.qualificationList, params) //资质列表
}

export const qualificationUpdate = (params) => {
	return request('post', allUrl.qualificationUpdate, params) //资质更新
}

export const financeRecordRecord = (params) => {
	return request('get', allUrl.financeRecordRecord, params) //财务记录
}
export const financeRecordQuery = (params) => {
	return request('get', allUrl.financeRecordQuery, params) //财务记录
}
export const advertQuery = (params) => {
	return request('get', allUrl.advertQuery, params) //资质列表
}


export const changePassword = (params) => {
	return request('post', allUrl.changePassword, params) //修改密码
}
export const userInfo = (params) => {
	return request('get', allUrl.userInfo, params) //用户信息
}
export const userUpdate = (params) => {
	return request('post', allUrl.userUpdate, params) //用户信息
}
//媒体
  export const getMediaList = (params) => {
    return request('get', allUrl.mediaList, params) //媒体列表
  }
  export const mediaSave = (params) => {
    return request('post', allUrl.mediaSave, params) //新增媒体
  }
  export const mediaUpdate = (params) => {
    return request('post', allUrl.mediaUpdate, params) //更新媒体
  }
  export const getAdvertisePositionList = (params) => {
    return request('get', allUrl.advertPositionList, params) //广告位列表
  }
  export const updateAdvertPosition = (params) => {
    return request('post', allUrl.updateAdvertPosition, params) //修改广告位
  }
  export const advertPositionSave = (params) => {
    return request('post', allUrl.advertPositionSave, params) //添加广告位
  }
  
  
//平台方

