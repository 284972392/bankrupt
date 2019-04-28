<template>
    <div class="activity">
        <img src="https://image.miduoxing.cn/null_861d4042-8a31-40b8-9ed3-e972360be330" alt="" class="banner">
        <p class="title1">一重奖</p>
        <div class="step">
            <img src="https://image.miduoxing.cn/null_683d1ce4-7790-4fd3-8c43-017883e03963" alt="" class="box_img">
            <img src="https://image.miduoxing.cn/null_c43305d8-8794-4940-af19-633b01d499b1" alt="" class="jt">
            <img src="https://image.miduoxing.cn/null_a2bce359-2393-4c59-8eb3-30a81217f64b" alt="" class="box_img">
            <img src="https://image.miduoxing.cn/null_c43305d8-8794-4940-af19-633b01d499b1" alt="" class="jt">
            <img src="https://image.miduoxing.cn/null_c8b4e3a7-460e-4853-9dae-358db437689e" alt="" class="box_img">
        </div>
        <p class="title2">二重奖</p>
        <p class="title3">邀请好友 >= <span class="yellow">50</span>人，将获得额外现金奖励</p>
        <img src="https://image.miduoxing.cn/null_1cb4485a-bb93-4697-abcc-7fd71ea94334" alt="">
        <p class="tip">（tips: 额外现金奖励可直接提现）</p>
        <div class="role"><hr style="height:2rpx;width:272rpx;background:#fff;" />活动规则<hr style="height:2rpx;width:272rpx;background:#fff;" /></div>
        <p class="tipRole">1. 活动时间：2月1日 — 2月12日</p>
        <p class="tipRole">2. 每邀请一个好友最高奖励2元，邀请奖励上限为100元</p>
        <div class="tipRole" style="display:flex;"> <p>3.</p> <p>邀请奖励存放在<span class="yellow">待收佣金</span>中处于未激活状态，当用户的<span class="yellow">已收佣金</span>达到50元时，邀请奖励被激活，可直接提现</p> </div>
        <p class="tipRole">4. 排行榜奖励将在活动结束后3个工作日之内统一发放</p>
        <p class="tipRole">5. 本活动最终解释权归杭州奇思妙想网络科技有限公司所有</p>
        <div class="topBox">
            <div class="ttt">
            <div class="inviteTitle"><hr style="height:2rpx;width:152rpx;background:#eeeeee;" />邀请排行榜<hr style="height:2rpx;width:152rpx;background:#eeeeee;" /></div>
            </div>
            <div class="list" v-for="(data,index) in arr" :key="data.id">
                <span style="margin-left:24rpx;">{{index+1}}</span>
                <img :src="data.headImgUrl" alt="">
                <span>{{data.nickName}}</span>
                <p>{{data.number}}人</p>
            </div>
            <div class="crown">
                <img src="https://image.miduoxing.cn/null_f4f541e3-51cb-4de9-a1ff-d060ac51c583" alt="">
                <img src="https://image.miduoxing.cn/null_1e8ea089-a0b6-4350-ba0b-2a170f4d8190" alt="">
                <img src="https://image.miduoxing.cn/null_4997a72f-f014-4085-9d21-49f1fc9068b0" alt="">                
            </div>
        </div>

        <div class="shareBox">
            <button class="shareBtn" open-type="share">分享好友，立即赚钱</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                arr:[]
            }
        },
        onShareAppMessage:(res)=> {
            let openId = wx.getStorageSync('appDt').openId
            let sharePath = "pages/index/main?openId=" + openId;
				wx.reportAnalytics('share_path', {
					sharepath: '首页',
				});
				    return {
				      title: '过年津贴，人人有份',
				      path: sharePath
				    }
            },
        onShow(){
               this.$http.get(this.globalUrl.getTeamList,{}).then((res)=>{
                console.log(res.data.data)
                this.arr = res.data.data
            })
        }
    }
</script>

<style lang='scss' scoped>
    .activity{
        width: 100%;
        height: 100%;
        overflow: scroll;
        background: #DB4B4A;
        display: flex;
        flex-direction: column;
        padding-bottom: 180rpx;
        align-items: center;
    .shareBox{
        position: fixed;
        bottom: 0;
        height: 126rpx;
        width: 100%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        .shareBtn{
            background-image: linear-gradient(0deg, #E65454 0%, #FF8686 100%);
            box-shadow: 0 4rpx 14rpx 0 #FF7878;
            border-radius: 42rpx;font-size: 30rpx;color: #FFFFFF;
            text-align: center;width: 630rpx;
            height: 84rpx;line-height: 84rpx;
        }
    }
        .yellow{color: #ffe308;}
        .banner{
            height: 420rpx;
            width: 100%;
        }
        .title1{
            font-size: 32rpx;
            font-weight: bold;
            color: #FFFFFF;
            margin-top: 26rpx;
            margin-bottom: 20rpx;
        }
        .step{
            height: 184rpx;
            width: 93%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .box_img{width: 188rpx;height: 100%;}
            .jt{width: 49.4rpx;height: 20rpx;}
        }
        .title2{
            font-size: 32rpx;
            font-weight: bold;
            color: #FFFFFF;
            margin-top: 46rpx;
            margin-bottom: 6rpx;
        }
        .title3{ font-size: 32rpx;
            font-weight: bold;
            color: #FFFFFF;
            margin-bottom: 26rpx;}
        .tip{font-size: 22rpx;
            color: #FFFFFF;
            margin-top: 12rpx;
            margin-bottom: 68rpx;}
        .role{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: bold;
            width: 94.4%;
            font-size: 28rpx;
            color: #FFFFFF;
        }
        .tipRole{
            font-size: 26rpx;
            color: #FFFFFF;
            margin-top: 24rpx;
            width: 100%;
            padding-left: 32rpx;
            padding-right: 32rpx;
            box-sizing: border-box;
        }
        
        .topBox{
            width: 686rpx;
            height: 938rpx;
            overflow: scroll;
            background: #fff;
            margin-top: 46rpx;
            border-radius: 20rpx;
            position: relative;
            .crown{
                 position: absolute;
                 left: 44rpx;
                 top: 108rpx;
                 img{
                     width: 64rpx;
                     height: 53rpx;
                     display: flex;
                     flex-direction: column;
                     margin-bottom: 35rpx;
                 }
            }
            .ttt{
                width: 100%;display: flex;
                justify-content: center;
                .inviteTitle{
                font-size: 28rpx;color: #666666;width: 67.3%;display: flex;
                margin-top: 34rpx;align-items: center;margin-bottom: 16rpx;
                  }
            }
            
            .list{
                position: relative;
                margin-left: 42rpx;
                width: 602rpx;
                height: 86rpx;
                display: flex;
                align-items: center;font-size: 26rpx;
                color: #333333;
                border-bottom: 2rpx solid #EEEEEE;
                font-size: 26rpx;
                color: #333333;
                font-weight: bold;
                img{height: 52rpx;width: 52rpx;margin-left: 116rpx;}
                span{margin-left: 20rpx;}
                p{position: absolute;right: 16rpx;top: 24rpx;}
            }
        }
    }
</style>