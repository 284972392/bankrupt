import Vue from 'vue'
import App from './App'
import 'mpvue-weui/src/style/weui.css';
Vue.config.productionTip = false
App.mpType = 'app'

import mixin from './mixin/index'
Vue.mixin(mixin)

const app = new Vue(App)
app.$mount()

var Fly = require("flyio/dist/npm/wx")
var fly = new Fly


var session = ''



fly.interceptors.request.use((request) => {
    session = wx.getStorageSync('appDt').session3rd;
    // console.log(session)
    //给所有请求添加自定义header
    if (session&&session!=='') {
      request.timeout = 10000,
        request.headers = {
          "content-type": "application/json",
        }
      wx.showLoading({
        title: "加载中",
        mask: true,
      });

      request.headers = {
        "X-Tag": "flyio",
        'content-type': 'application/json'
      };

      let authParams = {
        //公共参数
        "oldSession3rd": session
      };
    
      request.body && Object.keys(request.body).forEach((val) => {
        if(request.body[val] === ""){
          delete request.body[val]
        };
      });
      request.body = {
        ...request.body,
        ...authParams
      }    

      return request;

    } else {
      // fly.lock();//锁住请求
        wx.showLoading({
            title: "加载中",
            mask: true,
          });

        // wx.login({
        //    success:(res)=> {  
        //      if (res.code) {
        //        let shareOpenId = wx.getStorageSync('shareOpenId')
        //        wx.request({
        //          url: 'http://192.168.2.106:8055/wechatLogin/getSessionKey',
        //          header: { 'content-type': 'application/x-www-form-urlencoded', },
        //          method:'post',
        //          data: {
        //            code: res.code,
        //            oldSession3rd:'',
        //            shareOpenId:shareOpenId
        //          },
        //          dataType: 'json',
        //            success:res =>{
        //              console.log(res)
        //              if(res.data.resultCode == '0'){
        //                this.data.session3rd = res.data.data.session3rd;
        //                this.data.openId = res.data.data.openId;
        //                 wx.setStorage({
        //                     key: 'appDt',
        //                      data: this.data
        //                 });
        //              }
        //            }
        //        })
        //      } 
        //      }
        //    });
        //     //等待token返回之后在解锁，
        //   fly.unlock();
          return request;//继续之前的请求，
    
    }
  })
   
  
  fly.interceptors.response.use(
    (response) => {
      wx.hideLoading();
      return response
    },
    (err) => {
      wx.hideLoading();
      if (err.status == 0) {
        // return "网络连接异常"
        wx.showToast({
          title: '网络连接异常',
          icon: 'none',
          duration: 1000//持续的时间  
        })
      } else if (err.status == 1) {
        // return "网络连接超时"
         wx.showToast({
          title: '网络连接超时',
          icon: 'none',
          duration: 1000//持续的时间  
        })
      } else if (err.status == 401) {
        return "用户未登录"
      } else {
        if (err.response.data.message) {
          return err.response.data.message
        } else {
          return '请求数据失败,请稍后再试'
        }
      };
      // Do something with response error
    }
  )





	//  fly.config.baseURL='http://192.168.2.192:8055' //天成本地/
//      fly.config.baseURL = 'http://192.168.2.106:8056' //李斌本地
    //  fly.config.baseURL = 'http://192.168.2.113:8055' //细细本地
        fly.config.baseURL = 'https://good.hzqimiao.com' //线上接口
//      fly.config.baseURL = 'https://testgood.hzqimiao.com' //测试线上接口










  
  
  Vue.prototype.$http = fly;

