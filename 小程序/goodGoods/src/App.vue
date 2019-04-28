<template>
    <div>
        21312
    </div>
</template>


<script>
const appDt = wx.getStorageSync('appDt');
export default {
  data(){
    return{
      data:{
        session3rd: appDt && appDt.session3rd ? appDt.session3rd : '',
        openId: appDt && appDt.openId ? appDt.openId : '',
        promoteName : appDt && appDt.promoteName ? appDt.promoteName : '', 
        promoteId :  appDt && appDt.promoteId ? appDt.promoteId : ''      
      },
      shareOpenId:''
    }
  },
    
  methods: {
    wxLogin(){
    
       wx.login({
      success:(res)=> {  
        console.log(res+'code')
        if (res.code) {
          //发起网络请求
              let shareOpenId = wx.getStorageSync('shareOpenId')
              this.shareOpenId = shareOpenId?shareOpenId:''
          wx.request({
            url: 'https://good.hzqimiao.com/wechatLogin/getSessionKey',
            header: { 'content-type': 'application/x-www-form-urlencoded', },
            method:'post',
            data: {
              code: res.code,
              oldSession3rd:this.data.session3rd,
              shareOpenId:this.shareOpenId
            },
            dataType: 'json',
              success:res =>{ 
                console.log(res)
                if(res.data.resultCode == '0'){
                  this.data.session3rd = res.data.data.session3rd;
                  this.data.openId = res.data.data.session3rd;
                  this.data.promoteName = res.data.data.promoteName;
                  this.data.promoteId = res.data.data.promoteId;
                   wx.setStorage({
                                    key: 'appDt',
                                    data: this.data
                                });
                }
              },
              fail:res=>{
                this.wxLogin()
          
              }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
         }
        }
      });
    },
    wxCheckLogin(){
      
      // wx.checkSession({
      // success:()=>{
        // session_key 未过期，并且在本生命周期一直有效
        // if(this.data.session3rd === ''||this.data.openId === ''){
          // this.wxLogin()
        // }
        
      // },
    
      // })
    }
  },
  mounted () {
    // this.wxCheckLogin()
    // this.wxLogin()
  },
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)



   
   
    // wx.getSetting({
    // success(res) {
    //     if (!res.authSetting['scope.writePhotosAlbum']) {
    //     wx.authorize({
    //     scope:'scope.writePhotosAlbum',
    //     success() {
    //     console.log('授权成功')
    //         }
    //     })
    //     }
    //  }
    // })

    
      
 

  },
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
