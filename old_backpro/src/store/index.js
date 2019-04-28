import Vue from "vue"
import Vuex from "vuex"
import tabsview from './modules/tabsview'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tabsview,
    user
  },
  state:{
    LoadingState:false,
    // 员工信息
    staffInfo:{},
    // 上传url操作
    shareUrl:'',
    // 上传图片删除时的index
    imgIndex:'',
    // 当前优惠的id
    discountId:'13',
    //用户id
    userId:0,
    //配置管理信息
    config:{},
  },
  getters:{
    loading:state => state.LoadingState
  },
  mutations:{
    showLoading:(state)=>{
      state.LoadingState = true;
    },
    hideLoading:(state)=>{
      state.LoadingState = false;
    }
  },
  actions:{
    showLoading:({ commit }) =>{
      commit('showLoading')
    },
    hideLoading: ({ commit }) =>{
      commit('hideLoading')
    }
  }
})

export default store