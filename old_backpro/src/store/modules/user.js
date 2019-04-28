
import { getToken, setToken, removeToken } from '../../util/auth'
const SET_TOKEN = 'SET_TOKEN'
const REMOVE_TOKEN = 'REMOVE_TOKEN'
// const SET_AVATAR = 'SET_AVATAR'
// const SET_PERMISSIONS = 'SET_PERMISSIONS'

const user = {
  state: {
    token: getToken()
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token;
    },
    [REMOVE_TOKEN](state){
      state.token = null;
    }
    // [SET_NAME](state, name) {
    //   state.name = name
    // },
    // [SET_AVATAR](state, avatar) {
    //   state.avatar = avatar
    // },
    // [SET_PERMISSIONS](state, permissions) {
    //   state.permissions = permissions
    // }
  },
  actions: {
   
  },
  getters: {
    token: state => state.token,
    // name: state => state.name,
    // avatar: state => state.avatar,
    // permissions: state => state.permissions
  }
}

export default user