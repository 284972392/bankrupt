export default [
  {
    path: '/advertise',
    name: 'advertise',
    redirect: 'noredirect',
    meta: { title: '广告管理', icon: 'icon-customerInfo',name:'advertiser'},
    component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
    children: [
      {
        path: 'adverlist',
        name: 'adverlist',
        meta: { title: '广告列表',name:'advertiser',noCache: true},
        component: () => import('@/pages/advertiser/advertise')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    redirect: 'noredirect',
    meta: { title: '数据管理', icon: 'el-icon-edit',name:'advertiser',noCache: false },
    component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
    children: [
      {
        path: 'adverdata',
        name: 'adverdata',
        meta: { title: '广告数据',name:'advertiser',noCache: false},
        component: () => import('@/pages/advertiser/dataManage')
      }
    ]
  },
  {
    path: '/financial',
    name: 'financial',
    redirect: 'noredirect',
    meta: { title: '财务管理', icon: 'el-icon-tickets',name:'advertiser' },
    component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
    children: [
      {
        path: 'inform',
        name: 'inform',
        meta: { title: '财务信息',name:'advertiser',noCache: false},
        component: () => import('@/pages/advertiser/financial/information')
      },
      {
        path: 'record',
        name: 'record',
        meta: { title: '财务记录',name:'advertiser',noCache: false},
        component: () => import('@/pages/advertiser/financial/record')
      },
       {
        path: 'advertiserPayRecord',
        name: 'advertiserPayRecord',
        meta: { title: '充值记录',name:'advertiser',noCache: true },
        component: () => import('@/pages/advertiser/rechargeRecord' ), 
      }
    ]
  },
  {
    path: '/accountAdver',
    name: 'accountAdver',
    redirect: 'noredirect',
    meta: { title: '账号管理', icon: 'el-icon-edit-outline',name:'gg' },
    component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
    children: [
      {
        path: 'inform',
        name: 'inform2',
        meta: { title: '账号信息',name:'advertiser',noCache: false},
        component: () => import('@/pages/advertiser/account/inform')
      },
      {
        path: 'pswSafe',
        name: 'pswSafe',
        meta: { title: '修改密码',name:'advertiser',noCache: true},
        component: () => import('@/pages/advertiser/account/pswSafe')
      }
    ]
  },
 
]
