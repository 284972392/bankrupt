


<template>
    <div class="invite">
        <div class="bg">
             <img src="../../../images/aaa.png" alt="">
        </div>
        <div class="qrCard">
            <img :src="userInfo.avatarUrl" alt="" class="head">
            <p class="nickName">{{userInfo.nickName}}</p>
            <img :src="'http://'+qrCode" alt="" class="qrCode" @click="showImg">
            <p class="note">好友识别二维码，即可邀请</p>
            <div class="saveBtn" @click="saveImg">保存二维码</div>
        </div>

      <mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask='true'></mp-loading>
    </div>
</template>

<script>
import mpLoading from 'mpvue-weui/src/loading';
    export default {
        components: {
            mpLoading,
        },
        data(){
            return{
                qrCode:'',
               isShowLoading:true,
                userInfo:{
                    avatarUrl:''
                }
            }
        },
        	onLoad(){  
              wx.setNavigationBarTitle({  
                title:'我的邀请码'  
              });
              
          },
        methods: {
            saveImg(){
             wx.getSetting({
            success:(res)=> {
               
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                    scope:'scope.writePhotosAlbum',
                    success:()=> {
                       this.saveImg()
                    }
                    })
                }
                }
            })


             wx.downloadFile({
                url:'https://'+this.qrCode,
                success:  (res)=> {
                     wx.showToast({
                        title: '保存中',
                        icon: 'loading'
                    })
                //图片保存到本地
                    let path = res.tempFilePath
                    wx.saveImageToPhotosAlbum({
                    filePath: path,
                        success: function (data) {
                            
                            wx.hideToast({
                                success(){
                                     wx.showToast({
                                        title: '保存成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                }
                            })
                            

                           
                        }
    
                    })
                }
                 })
            },
            showImg(){
                wx.previewImage({
                    current: 'https://'+this.qrCode, // 当前显示图片的http链接
                    urls: ['https://'+this.qrCode] // 需要预览的图片http链接列表
                })
            }
        },
        beforeMount() {
              wx.getUserInfo({
                    success:res=> {
                        this.userInfo = res.userInfo
                    }
                  })
                this.$http.get(this.globalUrl.shareWXAQCode,{}).then(res =>{
                     if(res.data.data){
                         this.isShowLoading = false
                         this.qrCode = res.data.data
                     }

                  })
                  
        },
    }
</script>
<style>
  page{
  height: 100%;
}
</style>


<style scoped lang="scss" scoped>
    .invite{
        height: 100%;
        width: 100%;
        overflow: hidden;
        .bg{    
          position: absolute;top: 0;left: 0;z-index: -999;
           height: 100%;width: 100%;
           background: #E65454;
           img{
               height: 342rpx;width: 100%;
           }
       }
        .qrCard{
            background: #FFFFFF;
            border-radius: 20rpx;
            height: 724rpx;
            width: 666rpx;
            position: relative;
            left: 42rpx;top: 398rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            .head{
                height: 120rpx;width: 120rpx;
                border-radius: 100%;
                margin-top: -60rpx;
                border: 6rpx solid #FFFFFF;
            }
            .nickName{
                font-size: 30rpx;
                color: #333333;
                margin-top: 14rpx;
                font-weight: bold;
            }
            .qrCode{
                margin-top: 26rpx;
                height: 322rpx;width: 322rpx;
            }
            .note{
                margin-top: 28rpx;
                font-size: 26rpx;
                color: #333333;
                font-weight: bold;
            }
            .saveBtn{
                background-image: linear-gradient(0deg, #E65454 0%, #FF8686 100%);
                box-shadow: 0 4rpx 14rpx 0 #FF7878;
                border-radius: 42rpx;
                text-align: center;
                height: 84rpx;
                line-height: 84rpx;
                width: 400rpx;
                margin-top: 48rpx;
                font-size: 30rpx;
                color: #FFFFFF;
            }
        }
    }
    
</style>