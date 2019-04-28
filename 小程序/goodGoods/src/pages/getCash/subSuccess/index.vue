<template>
    <div class="subSuccess">
        <img src="../../../images/ok.png" alt="">
        <p class="title">提现申请已提交</p>
        <p class="info">预计到账时间：一个工作日到账，节假日延后</p>
        <div class="box">
            <div><span>提现方式</span><span>支付宝</span></div>
            <div><span>支付宝账号</span><span>{{form.account}}</span></div>
            <div><span>收款人姓名</span><span>{{form.name}}</span></div>
            <div><span>提现金额</span><span>{{form.getNum}}元</span></div>
            <div><span>账户余额</span><span>{{yue}}元</span></div>
        </div>
        <p class="mid">提现的金额请在支付宝中查询</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                form:{},
                yue:''
            }
        },
        onLoad:function(options){
            console.log("接收到的参数是testData="+options.form);
            this.form = JSON.parse(options.form)
            this.yue = options.canGetNum - this.form.getNum
          
        },
         onUnload: function () {
                wx.reLaunch({
                url: '../my/main'
                })
            },
    }
</script>

<style>
  page{
  height: 100%;
}
</style>

<style scoped lang='scss'>
    .subSuccess{
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        padding: 104rpx 60rpx 0 60rpx;
        img{
            height: 108rpx;
            width: 108rpx;
        }
        .title{
            font-family: PingFangSC-Medium;
            font-size: 34rpx;
            color: #333333;
            letter-spacing: 0;
            font-weight: bold;
            margin-top: 36rpx;
        }
        .info{
            font-family: PingFangSC-Medium;
            font-size: 26rpx;
            color: #666666;
            letter-spacing: 0;
            margin-top: 26rpx;
            margin-bottom: 74rpx;
        }
        .box{
            background: #F5F5F5;
            border: 1px solid #EEEEEE;
            border-radius: 4px;
            height: 334rpx;
            box-sizing: border-box;
            width: 630rpx;
            padding: 12rpx 36rpx 0 36rpx;
            font-family: PingFangSC-Medium;
            font-size: 26rpx;
            color: #333333;
            letter-spacing: 0;
            font-weight: bold;
            line-height: 60rpx;
            div{
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
        }
        .mid{
            margin-top: 24rpx;
            font-family: PingFangSC-Medium;
            font-size: 24rpx;
            color: #AAAAAA;
            letter-spacing: 0;
            text-align: left;
        }
    }
</style>        