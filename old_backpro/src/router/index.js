import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)


const addRole = r => require.ensure([], () => r(require('@/components/integral/addRole/addRole')), 'addRole')
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const forgetPsw = r => require.ensure([], () => r(require('@/components/forgetPsw')), 'forgetPsw')
const addGoldRateRule = r => require.ensure([], () => r(require('@/components/integral/addGoldRateRule')), 'addGoldRateRule')
const teamConfig = r => require.ensure([], () => r(require('@/components/integral/teamConfig')), 'teamConfig')
const configuration = r => require.ensure([], () => r(require('@/components/integral/configuration')), 'configuration')
const consumerule = r => require.ensure([], () => r(require('@/components/integral/consumerule')), 'consumerule')
const consumecontent = r => require.ensure([], () => r(require('@/components/integral/consumecontent')), 'consumecontent')
const getRule = r => require.ensure([], () => r(require('@/components/integral/getRule')), 'getRule')
const getcontent = r => require.ensure([], () => r(require('@/components/integral/getContent')), 'getcontent')
const card = r => require.ensure([], () => r(require('@/components/contentManage/card')), 'card')
const redirectUrl = r => require.ensure([], () => r(require('@/components/contentManage/redirectUrl')), 'redirectUrl')

const checkStaff = r => require.ensure([], () => r(require('@/components/system/staffMag/checkStaff')), 'checkStaff')
const staff_mag = r => require.ensure([], () => r(require('@/components/system/staffMag/staff_mag')), 'staff_mag')
const role_mag = r => require.ensure([], () => r(require('@/components/system/role_mag')), 'role_mag')
const menu_mag = r => require.ensure([], () => r(require('@/components/system/menu_mag')), 'menu_mag')
const log_mag = r => require.ensure([], () => r(require('@/components/system/log_mag')), 'log_mag')
const data = r => require.ensure([], () => r(require('@/components/data')), 'data')
const withdrawal_record = r => require.ensure([], () => r(require('@/components/finance/withdrawal_record')), 'withdrawal_record')
const recharge_record = r => require.ensure([], () => r(require('@/components/finance/recharge_record')), 'recharge_record')
const cornRecord = r => require.ensure([], () => r(require('@/components/userManage/checkUser/cornRecord')), 'cornRecord')
const userBase = r => require.ensure([], () => r(require('@/components/userManage/checkUser/userBase')), 'userBase')
const teamMates = r => require.ensure([], () => r(require('@/components/userManage/checkUser/teamMates')), 'teamMates')
const taskRecord = r => require.ensure([], () => r(require('@/components/userManage/checkUser/taskRecord')), 'taskRecord')
const invite_record = r => require.ensure([], () => r(require('@/components/userManage/invite_record')), 'invite_record')

const moneyRecord = r => require.ensure([], () => r(require('@/components/userManage/checkUser/moneyRecord')), 'moneyRecord')
const loginRecord = r => require.ensure([], () => r(require('@/components/userManage/checkUser/loginRecord')), 'loginRecord')
const checkUser = r => require.ensure([], () => r(require('@/components/userManage/checkUser/checkUser')), 'checkUser')
const task_record = r => require.ensure([], () => r(require('@/components/userManage/task_record')), 'task_record')
const user = r => require.ensure([], () => r(require('@/components/userManage/user_list')), 'user')
const recycleGold_record = r => require.ensure([], () => r(require('@/components/userManage/recycleGold_record')), 'recycleGold_record')
const exchangeGold_record = r => require.ensure([], () => r(require('@/components/userManage/exchangeGold_record')), 'exchangeGold_record')
const obtainGold_record = r => require.ensure([], () => r(require('@/components/userManage/obtainGold_record')), 'obtainGold_record')
const cashDeposit_record = r => require.ensure([], () => r(require('@/components/userManage/cashDeposit_record')), 'cashDeposit_record')
const cashGet_record = r => require.ensure([], () => r(require('@/components/userManage/cashGet_record')), 'cashGet_record')
const checkTask = r => require.ensure([], () => r(require('@/components/channel/task/checkTask')), 'checkTask')
const readTaskOne = r => require.ensure([], () => r(require('@/components/channel/task/readTaskOne')), 'readTaskOne')
const addTaskOne = r => require.ensure([], () => r(require('@/components/channel/task/addTaskOne')), 'addTaskOne')
const checkResultBargain = r => require.ensure([], () => r(require('@/components/channel/bargain/checkResultBargain')), 'checkResultBargain')
const checkBargain = r => require.ensure([], () => r(require('@/components/channel/bargain/checkBargain')), 'checkBargain')
const viewBargain = r => require.ensure([], () => r(require('@/components/channel/bargain/viewBargain')), 'viewBargain')
const subBargainOk = r => require.ensure([], () => r(require('@/components/channel/bargain/subBargainOk')), 'subBargainOk')
const changeBargain = r => require.ensure([], () => r(require('@/components/channel/bargain/changeBargain')), 'changeBargain')
const readBargain = r => require.ensure([], () => r(require('@/components/channel/bargain/readBargain')), 'readBargain')
const addBargain = r => require.ensure([], () => r(require('@/components/channel/bargain/addBargain')), 'addBargain')
const CardRoadReadOnly = r => require.ensure([], () => r(require('@/components/channel/getCard/CardRoadReadOnly')), 'CardRoadReadOnly')
const addCardRoad = r => require.ensure([], () => r(require('@/components/channel/getCard/addCardRoad')), 'addCardRoad')
const discounts = r => require.ensure([], () => r(require('@/components/channel/discounts')), 'discounts')
const toAudit = r => require.ensure([], () => r(require('@/components/channel/toAudit')), 'toAudit')
const task = r => require.ensure([], () => r(require('@/components/channel/task')), 'task')
const replenishList = r => require.ensure([], () => r(require('@/components/channel/replenishList')), 'replenishList')
const calculate = r => require.ensure([], () => r(require('@/components/channel/calculate')), 'calculate')
const rechargeRecord = r => require.ensure([], () => r(require('@/components/merchant/rechargeRecord')), 'rechargeRecord')
const rechargeReadOnly = r => require.ensure([], () => r(require('@/components/merchant/rechargeReadOnly')), 'rechargeReadOnly')
const recharge = r => require.ensure([], () => r(require('@/components/merchant/recharge')), 'recharge')
const PersonMerMission = r => require.ensure([], () => r(require('@/components/merchant/personMerChild/personMerMission')), 'PersonMerMission')
const PersonMerDisCount = r => require.ensure([], () => r(require('@/components/merchant/personMerChild/personMerDisCount')), 'PersonMerDisCount')
const PersonMerBill = r => require.ensure([], () => r(require('@/components/merchant/personMerChild/personMerBill')), 'PersonMerBill')
const PersonMerBase = r => require.ensure([], () => r(require('@/components/merchant/personMerChild/personMerBase')), 'PersonMerBase')
const addPersonReadonly = r => require.ensure([], () => r(require('@/components/merchant/personMer/addPersonReadonly')), 'addPersonReadonly')
const addPersonMer = r => require.ensure([], () => r(require('@/components/merchant/personMer/addPersonMer')), 'addPersonMer')
const personMerSherch = r => require.ensure([], () => r(require('@/components/merchant/personMer/personMerSherch')), 'personMerSherch')
const merchant_person = r => require.ensure([], () => r(require('@/components/merchant/personMer/merchant_person')), 'merchant_person')
const viewDiscount = r => require.ensure([], () => r(require('@/components/merchant/shareCoupon/viewDiscount')), 'viewDiscount')
const checkResultDiscount = r => require.ensure([], () => r(require('@/components/merchant/shareCoupon/checkResultDiscount')), 'checkResultDiscount')
const checkDiscount = r => require.ensure([], () => r(require('@/components/merchant/shareCoupon/checkDiscount')), 'checkDiscount')
const submitOk = r => require.ensure([], () => r(require('@/components/merchant/shareCoupon/submitOk')), 'submitOk')
const changeDiscount = r => require.ensure([], () => r(require('@/components/merchant/shareCoupon/changeDiscount')), 'changeDiscount')
const readDiscount = r => require.ensure([], () => r(require('@/components/merchant/shareCoupon/readDiscount')), 'readDiscount')
const shareDiscount = r => require.ensure([], () => r(require('@/components/merchant/shareCoupon/shareDiscount')), 'shareDiscount')
const cmpMerYh = r => require.ensure([], () => r(require('@/components/merchant/cmpMerChild/cmpMerYh')), 'cmpMerYh')
const cmpMerHs = r => require.ensure([], () => r(require('@/components/merchant/cmpMerChild/cmpMerHs')), 'cmpMerHs')
const CmpMerMission = r => require.ensure([], () => r(require('@/components/merchant/cmpMerChild/CmpMerMission')), 'CmpMerMission')
const CmpMerDisCount = r => require.ensure([], () => r(require('@/components/merchant/cmpMerChild/CmpMerDisCount')), 'CmpMerDisCount')
const CmpMerBill = r => require.ensure([], () => r(require('@/components/merchant/cmpMerChild/CmpMerBill')), 'CmpMerBill')
const CmpMerBase = r => require.ensure([], () => r(require('@/components/merchant/cmpMerChild/CmpMerBase')), 'CmpMerBase')
const cmpMerSherch = r => require.ensure([], () => r(require('@/components/merchant/cmpMer/cmpMerSherch')), 'cmpMerSherch')
const addCmpReadonly = r => require.ensure([], () => r(require('@/components/merchant/cmpMer/addCmpReadonly')), 'addCmpReadonly')
const addCmpMer = r => require.ensure([], () => r(require('@/components/merchant/cmpMer/addCmpMer')), 'addCmpMer')
const merchant_cmp = r => require.ensure([], () => r(require('@/components/merchant/cmpMer/merchant_cmp')), 'merchant_cmp')
const home = r => require.ensure([], () => r(require('@/components/home')), 'home')
const page_statistics = r => require.ensure([], () => r(require('@/components/statistics/pageStatistics')), 'page_statistics')
//媒体管理
const advert_position = r => require.ensure([], () => r(require('@/components/media_manage/advert_position')), 'advert_position')
const advert_list = r => require.ensure([], () => r(require('@/components/media_manage/advert_list')), 'advert_list')
//const home = r => require.ensure([], () => r(require('@/components/home')), 'home')
//const home = r => require.ensure([], () => r(require('@/components/home')), 'home')
// 贷款超市
const loansInstitutions = r => require.ensure([], () => r(require('@/components/loan/loansInstitutions')), 'loansInstitutions')
const loansProject = r => require.ensure([], () => r(require('@/components/loan/loansProject')), 'loansProject')
const addLoansOrgan = r => require.ensure([], () => r(require('@/components/loan/addLoansOrgan')), 'addLoansOrgan')
const addLoansPro = r => require.ensure([], () => r(require('@/components/loan/addLoansPro')), 'addLoansPro')
//哈哈学习
const organizationList = r => require.ensure([], () => r(require('@/components/hahaStudy/organization/organizationList')), 'organizationList')
const videoList = r => require.ensure([], () => r(require('@/components/hahaStudy/video/videoList')), 'videoList')
const putIn = r => require.ensure([], () => r(require('@/components/hahaStudy/put/putIn')), 'putIn')
const buyRecord = r => require.ensure([], () => r(require('@/components/hahaStudy/buyRecord/buyRecord')), 'buyRecord')
const addOrganization = r => require.ensure([], () => r(require('@/components/hahaStudy/organization/addOrganization')), 'addOrganization')
const addvideoPro = r => require.ensure([], () => r(require('@/components/hahaStudy/video/addvideoPro')), 'addvideoPro')
//悠享好货
const cashManage = r => require.ensure([], () => r(require('@/components/goodGoods/cashManage/cashManage')), 'cashManage')
const orderManage = r => require.ensure([], () => r(require('@/components/goodGoods/orderManage/orderManage')), 'orderManage')
const userManage = r => require.ensure([], () => r(require('@/components/goodGoods/userManage/userManage')), 'userManage')
const checkTeamUser = r => require.ensure([], () => r(require('@/components/goodGoods/userManage/chechTeamUser')), 'checkTeamUser')
const goodsAdvice = r => require.ensure([], () => r(require('@/components/goodGoods/advice/advice')), 'goodsAdvice')
const channelsManage = r => require.ensure([], () => r(require('@/components/goodGoods/channelsManage/channelsManage')), 'channelsManage')
const categoryManage = r => require.ensure([], () => r(require('@/components/goodGoods/categoryManage/categoryManage')), 'categoryManage')

//channelsManage

// 全民小赚公众号
const vipcn = r => require.ensure([], () => r(require('@/components/qmxz/vipcn/index')), 'vipcn')
const withdrawManage = r => require.ensure([], () => r(require('@/components/qmxz/withdrawManage/index')), 'withdrawManage')
const taskManage = r => require.ensure([], () => r(require('@/components/qmxz/taskManage/index')), 'taskManage')
const easyRecord = r => require.ensure([], () => r(require('@/components/qmxz/easyRecord/index')), 'easyRecord')
const easyTask = r => require.ensure([], () => r(require('@/components/qmxz/easyTask/index')), 'easyTask')


export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      redirect:'/home',
      children:[
        {path:'/home',component:home,meta: {requireAuth: true},name:'首页'},
        {path:'/merchant_cmp',component:merchant_cmp,name:'企业商户'},
        {path:'/merchant_person',component:merchant_person,name:'个人商户'},
        {path:'/recharge',component:recharge,name:'充值申请'},
        {path:'/rechargeRecord',component:rechargeRecord,name:'待充值审核'},
        {path:'/rechargeReadOnly',component:rechargeReadOnly},
        {path:'/addCmpMer',component:addCmpMer,name:'添加企业商户'},
        	{path:'/addCmpMer/addCmpReadonly',component:addCmpReadonly},
        {path:'/cmpMerSherch',component:cmpMerSherch,redirect:'/cmpMerSherch/cmpMerBase',
        children:[
        		{path:'/cmpMerSherch/cmpMerBase',component:CmpMerBase,name:'查看企业商户'},
        		{path:'/cmpMerSherch/cmpMerBill',component:CmpMerBill},
        		{path:'/cmpMerSherch/cmpMerDisCount',component:CmpMerDisCount},
        		{path:'/cmpMerSherch/cmpMerMission',component:CmpMerMission},
        		{path:'/cmpMerSherch/cmpMerHs',component:cmpMerHs},
        		{path:'/cmpMerSherch/cmpMerYh',component:cmpMerYh},
        ]
       },
        {path:'/addPersonMer',component:addPersonMer,name:'添加个人商户'},
        	{path:'/addPersonMer/addPersonReadonly',component:addPersonReadonly},
        {path:'/personMerSherch',component:personMerSherch,redirect:'/personMerSherch/personMerBase',
        	children:[
        		{path:'/personMerSherch/personMerBase',component:PersonMerBase,name:'查看个人商户'},
        		{path:'/personMerSherch/personMerBill',component:PersonMerBill},
        		{path:'/personMerSherch/personMerDisCount',component:PersonMerDisCount},
        		{path:'/merchant_person/personMerMission',component:PersonMerMission}
        ]
        },
        {path:'/shareDiscount',component:shareDiscount,name:'添加优惠'},
        {path:'/readDiscount',component:readDiscount},
        {path:'/changeDiscount',component:changeDiscount},
        {path:'/submitOk',component:submitOk},
        {path:'/checkDiscount',component:checkDiscount},
        {path:'/checkResultDiscount',component:checkResultDiscount},
        {path:'/viewDiscount',component:viewDiscount},
        {path:'/channel/discounts',component:discounts,name:'优惠管理'}, 
        {path:'/task',component:task,name:'任务管理'},
        {path:'/user',component:user,name:'用户管理'},
        {path:'/merchant_person',component:merchant_person,name:'个人商户'},
        {path:'/channel/task',component:task,name:'任务列表'},
        {path:'/channel/to_audit',component:toAudit,name:'待审核奖励'},    
        {path:'/channel/replenish_list',component:replenishList,name:'补货记录'},    
        {path:'/channel/calculate',component:calculate,name:'划算管理'}, 
        //发布卡片
        {path:'/channel/task/addCardRoad',component:addCardRoad,name:'发布卡片'},
        {path:'/channel/task/CardRoadReadOnly',component:CardRoadReadOnly},
        // 发布划算
        {path:'/addBargain',component:addBargain,name:'发布划算'},
        {path:'/readBargain',component:readBargain},
        {path:'/viewBargain',component:viewBargain},
        {path:'/changeBargain',component:changeBargain},
        {path:'/subBargainOk',component:subBargainOk},
        {path:'/checkBargain',component:checkBargain},
        {path:'/checkResultBargain',component:checkResultBargain},
        // 发布任务
        {path:'/addTaskOne',component:addTaskOne},
        {path:'/readTaskOne',component:readTaskOne},
        {path:'/checkTask',component:checkTask},
          // ***
        {path:'/user',component:user,name:'用户列表'},
        {path:'/cashGet_record',component:cashGet_record,name:'现金领取记录'},
        {path:'/cashDeposit_record',component:cashDeposit_record,name:'现金提现记录'},
        {path:'/obtainGold_record',component:obtainGold_record,name:'金币获取记录'},
        {path:'/exchangeGold_record',component:exchangeGold_record,name:'金币兑换记录'},
        {path:'/recycleGold_record',component:recycleGold_record,name:'金币回收记录'},
        
        {path:'/task_record',component:task_record,name:'任务记录'},
        {path:'/invite_record',component:invite_record,name:'邀请记录'},
        {path:'/checkUser',component:checkUser,redirect:'/checkUser/userBase',
				  children:[
				    {path:'/checkUser/userBase',component:userBase,name:'查看用户'},
				    {path:'/checkUser/loginRecord',component:loginRecord},
				    {path:'/checkUser/moneyRecord',component:moneyRecord},
				    {path:'/checkUser/taskRecord',component:taskRecord},
				    {path:'/checkUser/teamMates',component:teamMates},
				    {path:'/checkUser/cornRecord',component:cornRecord}
				]
				},
        {path:'/recharge_record',component:recharge_record,name:'待充值审核'},
        {path:'/withdrawal_record',component:withdrawal_record,name:'待提现审核'},
        {path:'/data',component:data,name:'数据管理',meta: {access: true}},
        {path:'/system/log_mag',component:log_mag,name:'日志管理'},
        {path:'/system/menu_mag',component:menu_mag,name:'菜单管理'},
        {path:'/content/master',component:menu_mag,name:'师徒榜单管理'},
        {path:'/system/role_mag',component:role_mag,name:'角色管理'},
        {path:'/system/staff_mag',component:staff_mag,name:'员工管理'},
        {path:'/system/checkStaff',component:checkStaff,name:'查看员工'},
        // 内容管理
        {path:'/content/card',component:card,name:'卡券列表'},
        {path:'/content/redirect_url',component:redirectUrl,name:'跳转链接列表'},
  
        // 积分会员管理
        // {path:'/integral_member/getcontent',component:getcontent,name:'获取内容'},
        // {path:'/integral_member/getRule',component:getRule,name:'获取规则'},
        // {path:'/integral_member/consumecontent',component:consumecontent,name:'消耗内容'},
        // {path:'/integral_member/consumerule',component:consumerule,name:'消耗规则'},
        {path:'/integral_member/consumerule',component:configuration,name:'配置管理'},
        {path:'/integral_member/sign_in_rule',component:addRole,name:'签到规则'},
        {path:'/integral_member/addGoldRateRule',component:addGoldRateRule,name:'修改消耗规则'},
        {path:'/integral_member/team',component:teamConfig,name:'组团队配置'},
       //媒体管理
        {path:'/media_manage/advert_position',component:advert_position,name:'广告位置'},
        {path:'/media_manage/advert_list',component:advert_list,name:'广告列表'},
       	//统计管理
        {path:'/data/page_statistics',component:page_statistics,name:'页面及按钮统计'},
       	// 贷款超市
         {path:'/loans/loans_institutions',component:loansInstitutions,name:'贷款机构'},
         {path:'/loans/loans_project',component:loansProject,name:'贷款项目'},
         {path:'/loans/addLoansOrgan',component:addLoansOrgan},
         {path:'/loans/addLoansPro',component:addLoansPro}, 
         //哈哈学习
         {path:'/haha_study/institutions_list',component:organizationList,name:'机构列表'},
         {path:'/haha_study/addOrganization',component:addOrganization,name:'添加机构'},
         {path:'/haha_study/video_project',component:videoList,name:'机构列表'},
         {path:'/haha_study/put_list',component:putIn,name:'机构列表'},
         {path:'/haha_study/buy_record',component:buyRecord,name:'机构列表'},
         {path:'/haha_study/addvideoPro',component:addvideoPro,name:'添加视屏项目'},
         //悠享好货
         {path:'/good_goods/withdraw_manage',component:cashManage,name:'提现管理'},
         {path:'/good_goods/user_manage',component:userManage,name:'用户管理'},
         {path:'/good_goods/checkTeamUser',component:checkTeamUser,name:'查看用户'},
         {path:'/good_goods/order_manage',component:orderManage,name:'订单管理'},
         {path:'/good_goods/advice',component:goodsAdvice,name:'建议反馈'},
         {path:'/good_goods/channels_manage',component:channelsManage,name:'频道管理'},
         {path:'/good_goods/category_manage',component:categoryManage,name:'分类管理'},
        //  全民小赚
        {path:'/qmxz/task_manage',component:vipcn,name:'公众号管理'},
        {path:'/qmxz/withdraw_manage',component:withdrawManage,name:'全名体现管理'},
        {path:'/qmxz/task_manage',component:taskManage,name:'全名任务列表'},
        {path:'/qmxz/easy_make_record_manage',component:easyRecord,name:'简单赚记录列表'},
        {path:'/qmxz/easy_make_manage',component:easyTask,name:'简单赚任务列表'},
        
         
        ]
      },
      {
        path:'/login',
        name:'登录',
        component:login
      },
      {
        path:'/forgetPsw',
        name:'忘记密码',
        component:forgetPsw
      }
]
})
