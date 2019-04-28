// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Promise from "promise-polyfill";
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


if(!window.Promise){
    window.Promise = Promise;
}

Vue.use(VueQuillEditor)

// 市级联动组件
import iviewArea from 'iview-area';
import store from  './store/index.js'
// loading组件
import qs from 'qs';
Vue.prototype.$qs = qs
// t-charts组件
import VCharts from 't-charts'
Vue.use(VCharts)

import axios from 'axios'
import axxiiooss from 'axios'
import {postRequest, getRequest,postDataRequest} from './util/request'
import {findButton,isButtonShow} from './util/auth'

Vue.prototype.isButtonShow = isButtonShow
Vue.prototype.findButton = findButton

Vue.prototype.post = postRequest
Vue.prototype.get = getRequest
Vue.prototype.postData = postDataRequest

import { allUrl } from './util/getUrl'
Vue.prototype.allUrl = allUrl
import { allUrlTwo } from './util/getUrl2'
Vue.prototype.allUrlTwo = allUrlTwo
import { allUrlThree } from './util/getUrl3'
Vue.prototype.allUrlThree = allUrlThree


//更改时间
import { changeTime,changeSmallTime } from './util/changeTime'
Vue.prototype.changeTime = changeTime
Vue.prototype.changeSmallTime = changeSmallTime

Vue.prototype.$http = axios;
Vue.prototype.$https = axxiiooss;

Vue.use(iviewArea);

Vue.use(VueRouter);
Vue.use(iView);

// "iview": "^2.13.1",
// "iview": "^3.0.1",

Vue.config.productionTip = false

// 超时时间

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
// 超时时间
axios.defaults.timeout = 20000
axios.defaults.withCredentials=true; // 让ajax携带cookie

axios.interceptors.request.use( config => { //配置发送请求的信息
  if(store.state.user.token!==null){
    // 设置头部信息
    // config.headers.Authorization = `token${store.state.user.token}`
  }
  store.dispatch('showLoading');
  return config;
}, error => {

  return Promise.reject(error);
});

axios.interceptors.response.use((response)=> { //配置请求回来的信息
  
  if(response.data == '{code:0,message:"session is invalid,please login again!"}'){
    store.dispatch('hideLoading');
    iView.Message.error("登录超时，请重新登录！");  
    router.push('/login')
  }

 
  store.dispatch('hideLoading');
  return response;
 }, err => {
	console.log(err)
  store.dispatch('hideLoading');
 if(err.response){
    if (err.response.status === 504 || err.response.status === 404) {
      iView.Message.error('服务器被吃了')
    } else if (err.response.status === 403) {
      iView.Message.error('权限不足,请联系管理员')
    } else {
      iView.Message.error('未知错误')
    }
 }else{
 	console.log("???")
//    iView.$Message.error({
//      content: '辣鸡天成的服务器又崩了！！',
//      duration: 10,
//      closable: true
//    });
 }
  

  // if (err.response) {
  //   switch (err.response.status) {
  //       case 401:
  //           // 返回 401 用户token过期 清除token信息并跳转到登录页面
  //           store.commit('REMOVE_TOKEN');
  //           router.replace({
  //               path: '/login'
  //               // query: {redirect: router.currentRoute.fullPath}
  //           })
  //       }
  //   }

  return Promise.reject(err);
});
var userInfo = JSON.parse(localStorage.getItem('TokenKey'));  
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
  
      if (store.state.user.token!==null) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              //  query: {redirect: '/home'}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }

  //  if(to.meta.access){
  //     iView.Message.error('权限不足,请联系管理员')
  //      next({path:'/home'});
  //  }else{
  //    next()
  //  }

})







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})











// // http request 请求拦截器，有token值则配置上token值
// axios.interceptors.request.use(
//   config => {
//       if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//           config.headers.Authorization = token;
//       }
//       return config;
//   },
//   err => {
//       return Promise.reject(err);
//   });

// // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 这里写清除token的代码
//                   router.replace({
//                       path: 'login',
//                       query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//                   })
//           }
//       }
//       return Promise.reject(error.response.data) 
//   });