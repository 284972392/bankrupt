// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// ui框架引入
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import axios from 'axios'
Vue.prototype.$http = axios

import { Upload,Icon } from 'iview';
Vue.component('Upload', Upload);
Vue.component('Icon', Icon);

import 'iview/dist/styles/iview.css';

import mixin from './mixin/index'
import "./assets/reset.css";

import Toast from 'muse-ui-toast';

Vue.use(Toast);


Vue.mixin(mixin)

Vue.use(MuseUI,VueAwesomeSwiper);

import store from  './store/index.js'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',

})





//document.addEventListener('plusready', function() {
// 
//var webview = plus.webview.currentWebview();
//  var first = null;
//  plus.key.addEventListener('backbutton', function() {
//      webview.canBack(function(e) {
//          if(e.canBack) {
//              webview.back();          
//           } else {
//                  //首页返回键处理
//                  //处理逻辑：1秒内，连续两次按返回键，则退出应用；
//                  
//                  
//                      //首次按键，提示‘再按一次退出应用’
//                      if (!first) {
//                         let instance = Toast.info('再按一次返回键退出app');  
//
//                          first = new Date().getTime();
//                          setTimeout(function(){
//                            first = null;                     		
//                          },1000);
//                      }else{
//                         if(new Date().getTime() - first <3000){
//                             plus.runtime.quit();
//                         }
//                      }
//                    
//                 }
//          })
//      });
//      plus.screen.lockOrientation("portrait-primary");
//  })