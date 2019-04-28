// 悠享好货的接口
//let base = '/api' //天成本地
//    let base = "http://testgood.hzqimiao.com"
let base = "http://good.hzqimiao.com"
// let base = 'http://192.168.2.192:8055' //天成本地
//    let base = 'http://192.168.2.106:8055' //李斌本地


const allUrlTwo = {
    // 用户登录 post
    getPddOrderPage : base +'/order/getPddOrderPage',//订单列表
	getWithdrawRecordPage :base + '/withdrawRecord/getWithdrawRecordPage', // 提现列表
	update : base + '/withdrawRecord/update',//审核
	userManage : base + '/wechatUserInfo/userManage', //用户股那里列表
	userSelfManage : base + '/wechatUserInfo/userSelfManage', //个人用户管理列表
	getCommissionByPage : base + '/commissionDetail/getCommissionByPage', //佣金明细
	findFeedBackByPage: base + '/feedBack/findFeedBackByPage',//查看所有反馈意见
	updateState: base + '/feedBack/updateState',//修改反馈意见状态
	getBackChannels : base + '/channels/getBackChannels', //频道列表
	getCatInfoList : base + '/cat/getCatInfoList',//获取分类信息
	getCategoryPage: base + '/category/getCategoryPage',//分类列表
	addCategory: base + '/category/add',//生成分类记录
	updateCategory: base + '/category/update',//修改分类
	addChannels : base +'/channels/addChannels',//添加频道
	delChannels : base + '/channels/delChannels',//删除频道
	updateChannels: base +'/channels/updateChannels',//修改频道		
}

export { allUrlTwo }