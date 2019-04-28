

   let base = 'http://backend.miduoxing.cn/'
//  let base = 'http://testbackend.miduoxing.cn/'



	// let base = 'http://192.168.2.106:8055/' //李斌本地
//  let base = 'http://testbackend.miduoxing.cn/'
  



 
const allUrl = {
    // 用户登录 post
    loginUrl : base+'user/login', 
    logOut : base + 'user/logout',
    test: base+'role/test',
    // 角色管理部分 
    rolePage : base+'role/findRolePage', //get 分页查询角色列表
    roleList : base+'role/findMenuList', //get 查询角色列表
    findRole : base+'role/findRole', //get 查看角色
    addRole : base+'role/addRole', //post 添加角色
    updateRole: base+'role/updateRole', //post 更新角色
    //员工管理部分...
    userPage: base+'user/findUserPage', //get 分页查询员工列表 
    findDepart : base+'user/findDepart', //get 查询机构和角色列表
    findUser : base+'user/findUser', //get 查看员工
    updateUser : base + 'user/updateUser', //post 更新员工
    addUser : base + 'user/addUser', //post 添加员工
    countUser : base + 'user/countUser', //get 查询在职离职员工数
    // 优惠相关
    addDiscount: base + 'discount/addDiscount', //post 添加优惠
    findDiscount: base + 'discount/findDiscount', //get 查询优惠
    findProperty: base + 'discount/findProperties', //get 查询商户信息及select选项信息
    updateDiscount: base + 'discount/updateDiscount', //post修改优惠
    findDiscountPage: base + 'discount/findDiscountPage', //get 获取优惠列表
    updateDiscountStatus: base + '/discount/updateDiscountStatus', //post 修改优惠状态
    countDiscount: base + 'discount/countDiscount', //get 查询优惠数 
    // 划算相关
    findBargainPage: base + 'bargain/findBargainPage', //get 查看划算列表
    addBargain: base + 'bargain/addBargain', //post 添加划算
    findBargain: base + 'bargain/findBargain', //get 查询划算
    findBargainPro: base + 'bargain/findProperties', //查询参数列表
    updateBargain: base + 'bargain/updateBargain', //post修改划算
    updateBargainStatus: base + 'bargain/updateBargainStatus', //修改划算状态
    countBargain: base + 'bargain/countBargain',//get 查询划算数
    // 任务相关   
    addTask: base + 'task/addTask',//post添加任务
    countTask: base + 'task/countTask',//get查询各种类任务的优惠数
    findTaskProperties: base + 'task/findProperties',//get查询参数列表
    findTask: base + "task/findTask",//get查询任务
    findTaskPage: base + 'task/findTaskPage', //get 获取任务列表
    updateTask: base + 'task/updateTask',//post 修改任务
    updateTaskStatus: base + 'task/updateTaskStatus',//post修改任务状态
    //商户管理
    findTenantPage:base+'tenant/findTenantPage',// get 分页查询商户列表 type:0 企业  1 个人商户
    findTenant:base+'tenant/findTenant',//get 查看个人商户详情
    addTenant:base+'tenant/addTenant', //post 添加商户
    uploadPics:base+'uploadPic/uploadPic',//post  上传多张文件   
    updateTenant:base+'tenant/updateTenant', //post 更改商户
    findProperties:base+'product/findProperties', //get产品列表搜索
    updateUser : base + 'user/updateUser', //post 更新员工
    addUser : base + 'user/addUser', //post 添加员工
    countUser : base + 'user/countUser', //get 查询在职离职员工数
    getProduct : base + 'product/getProduct', //get 查询在职离职员工数
   	addRechargeRecord : base + '/rechargeRecord/addRechargeRecord',// post 商户充值
  	findRechargeRecord : base +'/rechargeRecord/findRechargeRecord'	, //get  查询充值			
  	findRechargeRecordPage : base + '/rechargeRecord/findRechargeRecordPage', // get 充值列表
  	countRechargeRecord : base + '/rechargeRecord/countRechargeRecord',  // get 充值状态计数
  	findRecordPageBytenantId : base + '/rechargeRecord/findRecordPageBytenantId', //get 根据商户id查询充值记录列表
  	findTaskPageBytenantId : base + '/task/findTaskPageBytenantId', //get 根据商户id查询商户任务
    findDiscountPageBytenantId : base + '/discount/findDiscountPageBytenantId', // get 根据商户id查询优惠列表
    findBargainPageBytenantId : base + '/bargain/findBargainPageBytenantId', // get 根据商户id查询划算列表
    // app下  任务、用户、现金记录、金币记录
    findAppUserPage : base + '/appUser/findAppUserPage', //get获取app用户列表
    countAppUser : base + '/appUser/countAppUser', //get查询各种类用户数
    findAppUser: base + '/appUser/findAppUser', //get 查询app用户
    findAppTaskRecordByUserId:base + '/appTaskRecord/findAppTaskRecordByUserId', //get根据用户id查询任务记录
    findAppCashPaymentByUserId:base + '/appCashPayment/findAppCashPaymentByUserId',//get 根据用户id查询现金收支记录
    updateAppUserStatus: base + '/appUser/updateAppUserStatus',//post修改app用户状态
    findAppTaskRecordPage: base + '/appTaskRecord/findAppTaskRecordPage', //get获取app任务记录列表
    findAppCashPaymentPage: base + '/appCashPayment/findAppCashPaymentPage', //get获取app现金领取记录列表
    countAppCashPayment: base + '/appCashPayment/countAppCashPayment', //get 查询各种类app现金领取记录数
    findAppWithdrawRecordPage: base + '/appWithdrawRecord/findAppWithdrawRecordPage', //get获取现金提现记录列表
    findAppWithdrawRecordList: base + '/appWithdrawRecord/findAppWithdrawRecordList', //get获取现金提现记录表格
    countAppWithdrawRecord: base + '/appWithdrawRecord/countAppWithdrawRecord', //get查询各种类app现金提现记录数
    findAppGoldCoinRecordByUserId : base + '/appGoldCoinRecord/findAppGoldCoinRecordByUserId', //get通过app用户id查询 金币收支记录
    findObtainAppGoldCoinRecordPage: base + '/appGoldCoinRecord/findObtainAppGoldCoinRecordPage', //get分页查询获取金币记录列表
    countObtainAppGoldCoinRecord: base + '/appGoldCoinRecord/countObtainAppGoldCoinRecord', //查询获取类金币记录数
    findRecycleAppGoldCoinRecordPage : base+'/appGoldCoinRecord/findRecycleAppGoldCoinRecordPage', //get  金币回收记录列表 
    findExchangeAppGoldCoinRecordPage : base + '/appGoldCoinRecord/findExchangeAppGoldCoinRecordPage', //get 金币兑换记录列表
    countRecycleAppGoldCoinRecord : base + '/appGoldCoinRecord/countRecycleAppGoldCoinRecord' , //get 金币兑换计数上
    findRechargeRecordPage : base + '/rechargeRecord/findRechargeRecordPage', //get 获取待充值列表
    countRechargeRecord: base + '/rechargeRecord/countRechargeRecord', //get查询各种类充值的优惠数
    updateRechargeRecordStatus: base + '/rechargeRecord/updateRechargeRecordStatus', //post 修改充值状态
    updateAppWithdrawRecordStatus: base + '/appWithdrawRecord/updateAppWithdrawRecordStatus',  //post修改app现金提现记录状态
    findPrizePage: base + '/prize/findPrizePage', //获取奖品列表
    updatePrizeStatus: base + '/prize/updatePrizeStatus', //post修改奖品状态
    deletePrize: base + 'prize/deletePrize', //post删除奖品
    addPrize: base + 'prize/addPrize', //post添加奖品
    updatePrize: base + '/prize/updatePrize', //post修改奖品
    findPrize: base + '/prize/findPrize', //get查询奖品
    findAppTaskRecordAuditPage: base + '/appTaskRecord/findAppTaskRecordAuditPage', //get分页查询app任务记录审核列表
    findReplenishRecordPage: base + '/replenishRecord/findReplenishRecordPage', //获取补货列表
    countAppTaskRecord: base + '/appTaskRecord/countAppTaskRecord', //get查询各种类app任务记录的app任务记录数
    findAppTaskRecordList:base + '/appTaskRecord/findAppTaskRecordList',//get导出app任务记录表格
    updateAppTaskRecordStatus: base + '/appTaskRecord/updateAppTaskRecordStatus', //修改app任务记录状态
    findConstantConfigPage:base + '/constantConfig/findConstantConfigPage', //get获取配置列表
    updateConstantConfig: base + '/constantConfig/updateConstantConfig', //post修改金币汇率
    findContentPage : base + '/content/findContentPage',  //获取内容列表
    findContent : base +'/content/findContent',  //查看内容
    addContent : base + '/content/addContent', //添加内容
    updateRule : base + '/rule/updateRule', //修改规则
    findRuleList : base +'/rule/findRuleList' ,//获取规则
    findRechargeRecordList: base + '/rechargeRecord/findRechargeRecordList',

	//媒体管理
	//广告位置
	findAdvertPositionPage: base + '/advertPosition/findAdvertPositionPage',//广告位置列表查询
	addAdvertPosition : base + '/advertPosition/addAdvertPosition',//添加广告位
	updateAdvertPositionStatus: base + '/advertPosition/updateAdvertPositionStatus',//更新状态 上下架
	updateAdvertPosition: base + '/advertPosition/updateAdvertPosition',//修改广告位置
	addAdvertList : base + '/advertList/addAdvertList',//广告位添加广告
	//广告
	findAdvertListPage:base + '/advertList/findAdvertListPage',//广告列表查询
	updateAdvertList:base + '/advertList/updateAdvertList', //广告修改
	updateAdvertListStatus:base + '/advertList/updateAdvertListStatus',//广告上下架
    findOperatorList:base+'/advertList/findOperatorList',//操作人员列表 get


    taskFindCreateBy:base + '/task/findCreateBy',//查询所有任务创建人
    findAllTenant:base + '/tenant/findAllTenant',//查询所有商户
    rechargeFindCreateBy:base + '/rechargeRecord/findCreateBy',//查询所有充值审核创建人

    findTeamConstantConfig: base + 'constantConfig/findTeamConstantConfig',//查询组团队配置参数
    updateTeamConstantConfig: base + '/constantConfig/updateTeamConstantConfig',//修改组团队配置
    findAppInviteRecordPage: base + '/appInviteRecord/findAppInviteRecordPage',//获取app邀请记录列表
    findInviteRecordById: base + '/appInviteRecord/findInviteRecordById',//通过id查询邀请记录
    findTeamInfoPage: base + '/appInviteRecord/findTeamInfoPage',//获取团队信息列表
    //统计
    findAccessPage:base + '/pageAccess/findAccessPage',
        // 导出统计
    findAccessPageList:base + '/pageAccess/findAccessPageList',
    //渠道列表
    findPlaceList:base + '/constantConfig/findPlaceList',

    // 贷款超市相关接口
    findLoansOrganizationPage: base + "/loansOrganization/findLoansOrganizationPage",//获取机构列表
    findLoansProjectPage: base + '/loansProject/findLoansProjectPage',//获取项目列表
    loansOrganizationFindAll :base + '/loansOrganization/findAll',//导出机构列表
    loansProjectFindAll : base + '/loansProject/findAll', //导出项目列表
    addLoansOrganization: base + '/loansOrganization/addLoansOrganization',//添加贷款机构
    findLoansById:base + '/loansOrganization/findLoansById', //通过id查看机构信息
    updateLoansOrganization: base + '/loansOrganization/updateLoansOrganization',//修改贷款机构
    addLoansProject: base + '/loansProject/addLoansProject',//添加贷款项目
    findLoansProjectById: base + '/loansProject/findLoansProjectById', //通过id查看项目信息
    updateLoansProject: base + '/loansProject/updateLoansProject',//修改贷款项目
    updateLoanState: base + '/loansProject/updateState',//修改贷款项目状态
    delLoanProject:base + '/loansProject/delProject',//删除贷款项目
    
    //哈哈学习
    findEducationOrganizationPage : base +'/educationOrganization/findEducationOrganizationPage',//获取机构列表
    selectAllWorkName : base +'educationOrganization/selectAllWorkName',// 获取全部员工
    addEducationOrganization : base +'educationOrganization/addEducationOrganization',//添加机构
    updateEducationOrganization :base + 'educationOrganization/updateEducationOrganization',//修改机构
    deleteEducationOrganization :base + 'educationOrganization/deleteEducationOrganization',//删除机构
    educationOrganizationAll : base + 'educationOrganization/findAll',//导出教育机构
    findEducationProjectPage : base +'educationCourse/findEducationProjectPage',//获取项目列表 type 1：视屏列表  ；  type 2：投放列表
	findAllTypeName : base + 'educationCourse/findAllTypeName',//获取视屏分类 做下拉
	findAllOrganizationName : base + 'educationCourse/findAllOrganizationName',// 获取机构列表做下拉
	addEducationCourse : base +'educationCourse/addEducationCourse',//添加视屏项目
	updateEducationProject : base +'educationCourse/updateEducationProject',//修改视屏项目
	findAllVideoByCourseId : base +'educationCourse/findAllVideoByCourseId', //根据id查视屏数组
	addPut :base +'educationCourse/addPut',//添加投放
	delPut : base + 'educationCourse/delPut',//删除投放
	updatePutState :base +'educationCourse/updateState',//修改投放状态
	updatePut : base +'educationCourse/updatePut',//修改投放
	delProject:base +'educationCourse/delProject',//删除项目
	educationCourseFindAll : base + 'educationCourse/findAll',//导出项目
	findEducationRecordPage : base + 'educationRecord/findEducationRecordPage', //获取购买记录
	findAllEducationRecord : base + 'educationRecord/findAllEducationRecord',//导出记录
	uploadVideo : base + 'upload/upload', //上传视频
    
    // 跳转链接相关
    addRedirectUr: base + 'redirectUrl/addRedirectUrl',//添加跳转链接post
    findRedirectUrlPage: base + 'redirectUrl/findRedirectUrlPage',//获取跳转链接列表

    
  }

export { allUrl }