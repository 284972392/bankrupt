import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    "navigationBarBackgroundColor": "#f4f4f4",
    "backgroundTextStyle": "light", 
    "enablePullDownRefresh": true,
  }
}