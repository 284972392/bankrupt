import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import tagsView from './modules/tagsView'
import getters from './getters'
import account from './modules/account'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global,
    tagsView,
    account
  },
  state:{
  	 // 上传url操作
    shareUrl:'',
    // 上传图片删除时的index
    imgIndex:'',
    token:'',
    qualification_list:{},
    // 删除广告计划信息
    clearAdvertisePlan:false,
    clearAdvertisePlanImg:false,
    // 广告信息
	AdvertiseInfo:{},
	// 媒体平台
	selectPlatform:'Android',
	// 更新媒体信息
	MediaInfo:{},
	// 广告位信息
	adverPositionInfo:{}
  },
  getters,
	mutations:{
		set_token(state, token) {
			console.log(token+"luyou")
		state.token = token
		sessionStorage.token = token
		},
		del_token(state) {
		state.token = ''
		sessionStorage.removeItem('token')
		},
		qualification_list(state,qualification_list){
			if(qualification_list=="新增"){
				sessionStorage.qualification_list = "new"
			}else{
				state.qualification_list = qualification_list
			sessionStorage.qualification_list = qualification_list
			}
			
		}
	}
})

export default store