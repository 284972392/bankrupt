import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect:'/index',
      children:[
      	{
      		path:'/index',
      		name:'index',
      		component:() => import('@/pages/index')
				},
				{
      		path:'/detail',
      		name:'detail',
      		component:() => import('@/pages/index/detail')
        },
        {
      		path:'/step',
      		name:'step',
      		component:() => import('@/pages/index/step')
				},
        {
          path:'/my',
          name:'my',
          component:() => import('@/pages/my')
        },
   			 {
          path:'/newUser',
          name:'newUser',
          component:() => import('@/pages/newUser')
        },
        {
          path:'/taskRecord',
          name:'taskRecord',
          component:() => import('@/pages/taskRecord')
        },
        {
          path:'/getCashRecord',
          name:'getCashRecord',
          component:() => import('@/pages/getCashRecord')
        },
        {
          path:'/sign',
          name:'sign',
          component:() => import('@/pages/sign')
        },
        {
          path:'/invite',
          name:'invite',
          component:() => import('@/pages/invite')
        },
        {
          path:'/simple',
          name:'simple',
          component:() => import('@/pages/simple')
        },
        {
          path:'/simpleDetail',
          name:'simpleDetail',
          component:() => import('@/pages/simple/detail')
        },
        {
          path:'/updatePic',
          name:'updatePic',
          component:() => import('@/pages/simple/updatePic')
        },
        {
          path:'/qmhd',
          name:'qmhd',
          component:() => import('@/pages/qmhd')
        },
        {
          path:'/clockIn',
          name:'clockIn',
          component:() => import('@/pages/clockIn')
        },
      ]
    }
  ]
})
