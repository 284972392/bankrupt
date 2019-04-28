import axios from 'axios'
import { throwErr } from '@/utils'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

//过滤请求
axios.interceptors.request.use(config => {
		if(store.state.token){
	config.headers.common['Token']=sessionStorage.getItem("token")
	}
  config.timeout = 10 * 1000
  return config
}, error => {
  return Promise.reject(error)
})
//console.log(sessionStorage.getItem("token"))
//axios.defaults.withCredentials=true; // 让ajax携带cookie
axios.defaults.headers.common['Token'] = sessionStorage.getItem("token");

// 添加响应拦截器
axios.interceptors.response.use( config => {
	return config;
})
axios.interceptors.response.use( response => {
 
	if (response.data.code == 401) {
      store.dispatch('setUserInfo', {})
		
		Message({
        message: 'token失效，请重新登录'
      })
         router.push('/login')
		
	}else if (response.data.code == 0) {
      return Promise.resolve(response)
    }

	else{
      return Promise.resolve(response)
    	
    }
//	 
//else if (response.data.code == 1401) {
//    store.dispatch('setUserInfo', {})
//    Message({
//      message: '未登录'
//    })
//       router.push('/login')
//    return Promise.reject(response)
//  } else {
//    return Promise.reject(response)
//  }
},
error => {
    if (error && error.response) {
      let res = {}
      res.code = error.response.status
      res.msg = throwErr(error.response.status, error.response)
      return Promise.reject(res)
    }
    return Promise.reject(error)
}
)
export default function request(method, url, data) {

  method = method.toLocaleLowerCase()
  if (method == 'post') {
    return axios.post(url, data)
  } else if (method == 'get') {
    return axios.get(url, {
      params: data
    })
  } else if (method == 'delete') {
    return axios.delete(url, {
      params: data
    })
  }
}

