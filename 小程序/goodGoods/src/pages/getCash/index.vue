<template>
<!-- ham -->
    <div class="getCash">
        <div class="top">
            <p class="p1">可提现金额</p>
            <p class="p2">￥{{canGetNum}}</p>
            <div>
                <span>已提现: ￥{{haveGetNum}}</span>
                <div class="record" @click="getRecord">提现记录</div>
            </div>
        </div>
        <div class="formCard">
            <p class="note">注： 每月21日结算上个月确定收货的订单</p>
            <form bindsubmit="formSubmit" bindreset="formReset">

            <view class="section">
                <view class="section__title">支付宝账号</view>
                <input placeholder="邮箱地址/手机号码" v-model="form.account" type="text" placeholder-style="color:#a6a6a6;font-size:24rpx;"/>
            </view>
            <view class="section">
                <view class="section__title">收款人姓名</view>
                <input placeholder="收款人认证的姓名" type="text" v-model="form.name" placeholder-style="color:#a6a6a6;font-size:24rpx;"/>
            </view>
            <view class="section">
                <view class="section__title">提现金额</view>
                <input placeholder="请输入可提现金额" v-model="form.getNum" type="digit" placeholder-style="color:#a6a6a6;font-size:24rpx;"/>
            </view>
       
            <view class="btn-area">
                <div form-type="submit" :class="isEnough?'enough':''" type="primary" @click="getCash">{{show}}</div>
            </view>
            <p class="note">注： 最低提现金额5元</p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                show:'余额不足',
                canGetNum:0,
                haveGetNum:0,
                id:null,
                // 是否可以提现
                isEnough:false,
                form:{
                    getNum:'',
                    account:null,
                    name:null
                }
            }
        },
        methods: {
            getCash(){
          
                if(this.isEnough){
 
              let session = 'oldSession3rd=' + wx.getStorageSync('appDt').session3rd
              let url = this.globalUrl.withdrawRecordAdd +'?'+session
                  this.$http.post(url,{
                      alipayAccount:this.form.account,
                      amount:this.form.getNum,
                      payeeName:this.form.name
                  }).then(res =>{
                      if(res.data.resultCode=='0'){
                        wx.navigateTo({url:'./subSuccess/main?form='+JSON.stringify(this.form)+'&canGetNum='+this.canGetNum})
                      }
                  })
                      
                }
            },
            getRecord(){
                wx.navigateTo({url:'./getCashRecord/main'})
            }
        },
        	onLoad(options){  
              this.id = options.id
              this.form = {
                    getNum:'',
                    account:null,
                    name:null
                }
             this.$http.get(this.globalUrl.getWithdrawAmount,{}).then(res =>{
                      this.canGetNum = res.data.data.noWithdrawal
                      this.haveGetNum = res.data.data.withdrawal
                  })
              wx.setNavigationBarTitle({  
                title:'提现'  
              });
          },
        watch:{
            form: {
            　　　　handler(newValue, oldValue) {
                        if(!newValue.getNum||newValue.getNum>this.canGetNum){
                            this.isEnough = false
                            this.show = '余额不足'
                        }else if(newValue.getNum<5){
                             this.isEnough = false
                             this.show = '提现金额最低5元'
                        }else if(!newValue.name){
                            this.isEnough = false
                            this.show = '请填写姓名'
                        }else if(!/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(newValue.getNum)){
                            this.isEnough = false
                            this.show = '请填写正确金额'
                        }else if(/^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/.test(newValue.account)||/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(newValue.account)){
                                    this.isEnough = true   
                                    this.show = '提现'
                            }else{
                                this.show = '请填写正确支付宝账号'
                                this.isEnough = false
                            }

            　　　　},
            　　　　deep: true
            　　}
        },
        mounted() {
            
        },
        updated() {
   
        },
    }
</script>

<style>
  page{
  height: 100%;
}
</style>

<style lang='scss' scoped>
    .getCash{
        overflow: hidden;
        padding: 0;
        background: #f4f4f4;
        height: 100%;
        width: 100%;
        .top{
            height: 39%;
            background-image: -webkit-linear-gradient(top, #e65454, #fa7a7b); 
            width: 100%;
            text-align: center;
            overflow: hidden;
            div{
                height: 49rpx;
                line-height: 49rpx;
                margin-top: 26rpx;
                padding-left: 130rpx;
                padding-right: 105rpx;
                font-weight: bold;
                display: flex;
                color: #ffffff;
                font-size: 25rpx;
                justify-content: space-around;
                .record{
                    width: 125rpx;
                    height: 44rpx;
                    line-height: 44rpx;
                    text-align: center;
                    padding: 0;
                    margin: 0;
                    border: 2rpx solid #ffffff;
                    border-radius: 15rpx;
                }
            }
            .p1{
                font-size: 25rpx;
                font-weight: bold;
                color: #fff;
                margin-top: 50rpx;
            }
            .p2{
                font-size: 60rpx;
                color: #fff;
                font-weight: bold;
                margin-top: 28rpx;
            }
        }
        .formCard{
            background: #ffffff;
            height: 838rpx;
            width: 703rpx;
            position: absolute;
            top: 298rpx;
            box-sizing: border-box;
            left: 24rpx;
            border-radius: 15rpx;
            padding-left: 36rpx;
            .btn-area{
                div{
                    text-align: center;
                    box-sizing: border-box;
                    margin: 0;
                    border: none;
                    display: block;
                    width: 617rpx;
                    height: 85rpx;
                    line-height: 85rpx;
                    background: #D3D3D3;
                    box-shadow: 0 2px 7px 0 #DCDCDC;
                    border-radius: 21px;
                    color: #ffffff;
                    margin-top: 55rpx;
                }
                .enough{
                   background-image: linear-gradient(0deg, #E65454 0%, #FF8686 100%);
                   box-shadow: 0 2px 7px 0 #FF7878;
                 
                }

            }
            input{
				box-sizing: border-box;
				padding-left: 73rpx;
				margin-top: 27rpx;
				display: block;
				width: 617rpx;
				height: 71rpx;
                border:2rpx solid #eeeeee;
				background: #ffffff;
				border-radius: 50px;
				// box-shadow: 1px 1px 5px #eeeeee;
                margin-bottom: 33rpx;
            }
            .section__title{
                font-size: 27rpx;
                color: #333333;
                font-weight: bold;
            }
            .note{
                font-size: 24rpx;
                color: #666666;
                font-weight: bold;
                margin-top: 43rpx;
                overflow: hidden;
                margin-bottom: 55rpx;
            }
        }
    }
</style>