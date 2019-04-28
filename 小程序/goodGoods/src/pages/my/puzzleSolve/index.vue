<template>
    <div class="puzzleSolve">
        <div class="contant">
            <div class="top" @click="changeA">
                <div>1. <span>怎么赚佣金</span></div>
                <img src='../../../images/top.png' alt="" v-if="show1">
                <img src='../../../images/btm.png' alt="" v-if="!show1">
            </div>
            <div class="text" v-if="show1">
                成为分销商后，可以自己组建团队，获得邀请佣金。自己购买商品也可以获得相应的佣金；同时分享给好友，若好友购买则可获得分享的佣金。
            </div>
        </div>
        <div class="contant">
            <div class="top" @click="changeB">
                <div>2. <span>提现到账进度</span></div>
                <img src='../../../images/top.png' alt="" v-if="show2">
                <img src='../../../images/btm.png' alt="" v-if="!show2">
            </div>
            <div class="text" v-if="show2">
					我们会在1-3个工作日内提现到所填支付宝账号
            </div>
        </div>
        <div class="contant">
            <div class="top" @click="changeC">
                <div>3. <span>违规行为的认定</span></div>
                <img src='../../../images/top.png' alt="" v-if="show3">
                <img src='../../../images/btm.png' alt="" v-if="!show3">
            </div>
            <div class="text" v-if="show3">
				 我们会检测您是否存在互刷或者其它作弊行为， 一经发现有违规操作，将会对您进行封号处理！ 
            </div>
        </div>
    </div>  
</template>

<script>
    export default {
        data(){
            return{
                id:null,
                show1:false,
                show2:false,
                show3:false
            }
        },
        	onLoad(options){  
              this.id = options.id
              
              wx.setNavigationBarTitle({  
                title:'疑难解答'  
              });
          },
        methods:{
            changeA(){
                this.show1 = !this.show1
            },
            changeB(){
                this.show2 = !this.show2
            },
            changeC(){
                this.show3 = !this.show3
            }
        }
    }
</script>

<style scoped>
    page{
  height: 100%;
  font-family: PingFangSC-Medium;
   background: #f4f4f4;
}
</style>


<style scoped lang="scss" scoped>
    .puzzleSolve{
        background: #FFFFFF;
        overflow: hidden;
        .contant{
            box-sizing: border-box;
            padding: 24rpx 28rpx 0 32rpx;
            border-bottom: 2rpx solid #EEEEEE;
            .text{
                font-family: PingFangSC-Medium;
                font-size: 24rpx;
                color: #888888;
                letter-spacing: 0;
                line-height: 18px;
                margin-left: 59rpx;
                margin-bottom: 26rpx;
            }
            .top{
                width: 100%;
                height: 100rpx;
                font-family: PingFangSC-Medium;
                font-size: 28rpx;
                color: #333333;
                letter-spacing: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold;
                img{height: 14rpx;width: 24rpx;}
                span{
                    margin-left: 28rpx;
                }
            }
        }
    }
</style>
