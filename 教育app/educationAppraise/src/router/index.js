import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'


Vue.use(Router)

export default new Router({
  routes: [
		{
			path:'/classDetail',
			name:'classDetail',
			component:() => import('@/pages/classDetail')
		},
		{
			path:'/organDetail',
			name:'organDetail',
			component:() => import('@/pages/organDetail')
		},
		{
			path:'/teacherDetail',
			name:'teacherDetail',
			component:() => import('@/pages/teacherDetail')
		},
		{
			path:'/comment',
			name:'comment',
			component:() => import('@/pages/comment')
		},
		{
			path:'/styleList',
			name:'styleList',
			component:() => import('@/pages/styleList')
			  },
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
      		path:'/studyAngle',
      		name:'studyAngle',
      		component:() => import('@/pages/studyAngle')
      	},
      	{
      		path:'/my',
      		name:'my',
      		component:() => import('@/pages/my')
      	}
      ]
    },
    {
      		path:'/userLaval',
      		name:'userLaval',
      		component:() => import('@/pages/my/userLeval')
    },
        {
      		path:'/contactUs',
      		name:'contactUs',
      		component:() => import('@/pages/my/contactUs')
    },
            {
      		path:'/Troubleshoot',
      		name:'Troubleshoot',
      		component:() => import('@/pages/my/Troubleshoot')
    },
    {
      		path:'/setting',
      		name:'setting',
      		component:() => import('@/pages/my/setting')
    },
    {
      		path:'/myComment',
      		name:'myComment',
      		component:() => import('@/pages/my/myComment')
    },
    {
      		path:'/myCollection',
      		name:'myCollection',
      		component:() => import('@/pages/my/myCollection')
    },
    {
      		path:'/myTikit',
      		name:'myTikit',
      		component:() => import('@/pages/my/myTikit')
    },
    {
      		path:'/myRelease',
      		name:'myRelease',
      		component:() => import('@/pages/my/myRelease')
    
    },
   {
      		path:'/releaseDetail',
      		name:'releaseDetail',
      		component:() => import('@/pages/my/releaseDetail')
    
    },
    {
      		path:'/release',
      		name:'release',
      		component:() => import('@/pages/studyAngle/release')
    
    }
  ]
})
