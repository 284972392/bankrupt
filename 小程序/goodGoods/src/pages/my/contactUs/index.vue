<template>
    <div class="contactUs">
        <div class="qrCode" @click="save">
            <img src="http://image.miduoxing.cn/%E5%AE%A2%E6%9C%8D.jpeg" alt="">
        </div>
        <p class="title">悠享好货</p>
        <div class="text">优享好货分销平台，为您提供优惠好物的时候又能为您赚取佣金，购买越多，分享越多，赚得越多哦~</div>
        <!--<div class="btn">联系我们</div>-->
        <p class="btm">点击二维码保存图片，微信识别关注</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                id:null
            }
        },
        	onLoad(options){  
              this.id = options.id 
              wx.setNavigationBarTitle({  
                title:'联系我们'  
              });
          },
        methods: {
            save(){
                wx.previewImage({
                current: 'http://image.miduoxing.cn/%E5%AE%A2%E6%9C%8D.jpeg', // 当前显示图片的http链接
                urls: ['http://image.miduoxing.cn/%E5%AE%A2%E6%9C%8D.jpeg'] // 需要预览的图片http链接列表
                })
                wx.downloadFile({
                url: 'http://image.miduoxing.cn/%E5%AE%A2%E6%9C%8D.jpeg',
                success: function (res) {
                
                //图片保存到本地
                if(res.errMsg='')
                    wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                        success: function (data) {
                    
                            wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                            })
                        }
    
                    })
                 },
               
                })
            }
        }
    }
</script>

<style scoped>
page{
  height: 100%;
  font-family: PingFangSC-Medium;
  
}
</style>

<style scoped lang="scss" scoped>
    .contactUs{
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        .qrCode{
            height: 320rpx;
            width: 320rpx;
            margin-top: 66rpx;
            background: #FFFFFF;
            border-radius: 4px;
            padding: 15rpx;
            box-sizing: border-box;
            box-shadow: 2rpx 2rpx 25rpx #e9e9e9;
            img{height: 290rpx;width: 290rpx;}
        }
        .title{
            font-family: PingFangSC-Medium;
            font-size: 36rpx;
            color: #333333;
            letter-spacing: 0;
            margin-bottom: 26rpx;
            margin-top: 52rpx;
            font-weight: bold;
        }
        .text{
            font-family: PingFangSC-Medium;
            font-size: 26rpx;
            color: #333333;
            letter-spacing: 0;
            width: 614rpx;
            margin-bottom: 78rpx;
            font-weight: bold;
        }
        .btn{
            background-image: linear-gradient(0deg, #E65454 0%, #FF8686 100%);
            box-shadow: 0 2px 7px 0 #FF7878;
            border-radius: 21px;
            width: 414rpx;
            height: 84rpx;
            line-height: 84rpx;
            text-align: center;
            color: #FFFFFF;
            font-size: 30rpx;
            margin-bottom: 32rpx;
        }
        .btm{
            font-family: PingFangSC-Medium;
            font-size: 24rpx;
            color: #666666;
            letter-spacing: 0;
        }
    }
</style>