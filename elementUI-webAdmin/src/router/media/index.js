export default [
      {
        path: '/mediaTraffic',
        name: 'mediaTraffic',
        redirect: 'noredirect',
        meta: { title: '流量合作', icon: 'icon-query',name:'media'},
        component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
        children: [
          {
            path: 'myMedia',
            name: 'myMedia',
            meta: { title: '我的媒体',name:'media'},
            component: () => import('@/pages/media/traffic/myMedia')
          },
          {
            path: 'myAdvertiseSpace',
            name: 'myAdvertiseSpace',
            meta: { title: '我的广告位',name:'media'},
            component: () => import('@/pages/media/traffic/myAdvertiseSpace')
          }
        ]
      },
      {
        path: '/mediaDataIncome',
        name: 'mediaDataIncome',
        redirect: 'noredirect',
        meta: { title: '数据收益', icon: 'el-icon-document',name:'media'},
        component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
        children: [
          {
            path: 'mediaData',
            name: 'mediaData',
            meta: { title: '媒体数据',name:'media'},
            component: () => import('@/pages/media/dataIncome/mediaData')
          },
          {
            path: 'adverSpaceData',
            name: 'adverSpaceData',
            meta: { title: '广告位数据',name:'media'},
            component: () => import('@/pages/media/dataIncome/adverSpaceData')
          }
        ]
      },
      {
        path: '/mediaFinancialManage',
        name: 'mediaFinancialManage',
        redirect: 'noredirect',
        meta: { title: '财务管理', icon: 'el-icon-tickets',name:'media'},
        component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
        children: [
          {
            path: 'financialRecord',
            name: 'financialRecord',
            meta: { title: '财务记录',name:'media'},
            component: () => import('@/pages/media/financialManage')
          }
        ]
      },
      {
        path: '/mediaAccountManage',
        name: 'mediaAccountManage',
        redirect: 'noredirect',
        meta: { title: '账户管理', icon: 'el-icon-document',name:'media'},
        component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
        children: [
          {
            path: 'accountInfo',
            name: 'accountInfo',
            meta: { title: '账户信息',name:'media'},
            component: () => import('@/pages/media/accountManage/accountInfo')
          },
          {
            path: 'financialInfo',
            name: 'financialInfo',
            meta: { title: '财务信息',name:'media'},
            component: () => import('@/pages/media/accountManage/financialInfo')
          }
        ]
      },
      {
        path: '/mediaTechnologyButt',
        name: 'mediaTechnologyButt',
        redirect: 'noredirect',
        meta: { title: '技术对接', icon: 'el-icon-document',name:'media'},
        component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
        children: [
          {
            path: 'ApiButt',
            name: 'ApiButt',
            meta: { title: 'API对接',name:'media'},
            component: () => import('@/pages/media/technologyButt')
          }
        ]
      },
]   