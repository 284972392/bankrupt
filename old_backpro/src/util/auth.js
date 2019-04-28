

function getToken() {
  return localStorage.getItem('TokenKey')
}

function setToken(token) {
  return localStorage.setItem('TokenKey',token)
}

function removeToken() {
  return localStorage.removeItem('TokenKey')
}

// 查找当前路由下的所有按钮
function findButton(param){
  let marray = JSON.parse(this.$store.state.user.token).roleVo.children
  var info = []
  marray.forEach((i,index)=>{   
      if(i.title==param){
          info  = i.buttons 
      }
      if(i.children){
          i.children.forEach((i,index)=>{
               if(i.title==param){
                  info  = i.buttons 
              }
          })
      }
  })
  return info;
}
// 查找按钮是否显示   param是所有按钮  name是查找的按钮
function isButtonShow(param,name){
  var info;
  param.forEach((i,index)=>{
      if(i.buttonCname == name){
          info = i.checked
      }
  })
  return info;
}

export { getToken, setToken, removeToken,findButton,isButtonShow}