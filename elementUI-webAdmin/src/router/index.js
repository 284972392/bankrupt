import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import advertiser from './advertiser'
import media from './media'
Vue.use(Router)
//将路由表暴露给 sideItem 组件 动态渲染出菜单栏
export const asyncRouterMap = [
  ...advertiser
]
export const asyncRouterMap_media = [
  ...media
]
// JSON.parse(sessionStorage.getItem('userInfo')).data.roleName == 'advertiser'
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
    children: [
      {
        path: '/index',
        name: 'index',
        meta: { title: '首页', icon: 'dashboard', noCache: false ,name:'advertiser' },
        component: () => import('@/pages/advertiser/index' /* webpackChunkName: 'index' */), // 启动页
      },
      {
        path: '/mediaIndex',
        name: 'mediaIndex',
        meta: { title: '首页', icon: 'dashboard', noCache: false ,name:'media' },
        component: () => import('@/pages/media/index' /* webpackChunkName: 'index' */), // 启动页
      },
//    {
//      path: '/index/advertiserPayRecord',
//      name: 'advertiserPayRecord',
//      meta: { title: '充值记录',name:'advertiser',noCache: true },
//      component: () => import('@/pages/advertiser/rechargeRecord' ), 
//    },
      {
        path: '/index/addAdvertisePlan',
        name: 'addAdverPlan',
        meta: { title: '广告计划',name:'advertiser',noCache: true },
        component: () => import('@/pages/advertiser/addAdvertisePlan' ), 
      },
         {
        path: '/index/addqualification',
        name: 'addqualification',
        meta: { title: '更新资质',name:'advertiser',noCache: true},
        component: () => import('@/pages/advertiser/account/inform/addqualification')
      },
      {
        path: '/media/addNewMedia',
        name: 'addNewMedia',
        meta: { title: '新建媒体',name:'media',noCache: true},
        component: () => import('@/pages/media/addNewMedia')
      },
    ]
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/pages/error/401' /* webpackChunkName: '401' */), // 启动页
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/error/404' /* webpackChunkName: '401' */), // 启动页
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login' /* webpackChunkName: 'login' */), // 登录
  },
//if (sessionStorage.getItem('token')) {
//store.commit('set_token', sessionStorage.getItem('token'))
//}

  { path: '*', redirect: '/404', hidden: true },
]


let routerMap = constantRouterMap.concat(asyncRouterMap_media).concat(asyncRouterMap)



const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }), //新开的路由默认为顶部
  routes: routerMap
})
//捕获权限 
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') { //登录页面无需权限
    next()
  } else if (to.path === '/index') { //启动页权限
    let privilege = store.getters.userInfo.data.roleName
    if(privilege==='advertiser'){
      next()
    }else if(privilege==='media'){
      next({ path: '/mediaIndex' })
    }else{
      next({ path: '/401', replace: true })
    }
  } else if (to.path === '/401') { //无权限页面
    next()
  } else if (to.path === '/hostRegister') { //注册
    next()
  }	else if(to.path === '/mediaRegister'){
    next()
  } else if (to.path === '/404') { //无匹配页面

    next()
  } else {
    
    //当页面有权限限制的时候 根据自身项目更改
    let privilege = store.getters.userInfo.data.roleName

    if(privilege===to.meta.name){
      next()
    }else{
      next({ path: '/401', replace: true })
    }
    // let flag = privilege.some(p => p === to.meta.title || p === to.matched[1].meta.title)
    // if (flag) {
    //   next()
    // } else {
    //   next({ path: '/401', replace: true })
    // }
    // next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router