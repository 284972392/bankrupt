import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    "navigationBarBackgroundColor": "#ffffff",
    "backgroundTextStyle": "light", 
    "enablePullDownRefresh": true,
    "navigationBarTitleText": "搜索"
  }
}