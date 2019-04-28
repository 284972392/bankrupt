<template>
    <div class="sign">
        <div class="top">
            <img src="http://image.miduoxing.cn/2a18807b-0e00-4964-adec-ae7bd61c1eeb" alt="">
        </div>
        <div class="btn">
            <div class="btnContent">
                                 <mu-ripple class="mu-ripple-demo goSign" @click="goTurntable">
                每日抽奖
           </mu-ripple>
             <mu-ripple class="mu-ripple-demo goSign" v-if="!toDaySign&&!canGetPrice" @click="goSign">
            立即签到
           </mu-ripple>
             <mu-ripple class="mu-ripple-demo alSign" v-if="toDaySign&&!canGetPrice">
                 {{show}}
             </mu-ripple>
             <mu-ripple class="mu-ripple-demo goSign animate" v-if="canGetPrice" @click="goGetPrice">
                领现金
           </mu-ripple>
            </div>          
        </div>
        <div class="kuang">
            <div class="canlendar" v-if="showC">
                  <div class="pai">
                      <div class="box" v-for="(data,index) in data">
                          <img src="../../assets/images/grey.png" alt="" class="common" v-if="(index+1)%3!==0&&!data.sign">
                          <img src="../../assets/images/right.png" alt="" class="common" v-if="(index+1)%3!==0&&data.sign">                    
                          <img src="../../assets/images/hongbao@3x.png" alt="" class="active" v-if="(index+1)%3==0&&!data.sign">
                          <img src="../../assets/images/hongbao1@3x.png" alt="" class="active" v-if="(index+1)%3==0&&data.sign">
                          
                          <span>{{data.date}}</span>
                      </div>
                  </div>
       
            </div>
        </div>
        <div class="rule" @click="showRule">
            <div class="ruleContent">
                <p>1.活动时间仅限3月15日—4月13日</p>
                <p>2.每轮连续签到三天即可获得一次领红包的机会</p>
                <p>3.每一轮若断签，则会丧失本轮领取红包的机会</p>
                <p>4.红包金额每轮最高可达18.8元</p>
                <p>5.本活动最终解释权归甘来科技有限公司所有</p>
               
            </div>
        </div>

        <!-- 幕布 弹窗 -->
        <div class="mubu" v-if="signTc||actTc"></div>
        <div class="signOk" v-if="signTc">
            <img src="../../assets/images/cha.png" alt="" @click="signTc=!signTc">
            <p>送你一次抽奖机会</p>
               <mu-ripple class="mu-ripple-demo goPrice" @click="goTurntable">
                去抽奖
             </mu-ripple>
        </div>
        <div class="getPrice" v-if="actTc">
            <img src="../../assets/images/cha.png" alt="" class="cha" @click="actTc=!actTc">
            <p>获得红包</p>
            <p>{{amount}}元</p>
            <div>红包已放入您的钱包</div>
            <img :src="advertiseUrl" alt="" class="adver" @click="goAdver">
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:[{date:'3.15'},{date:'3.16'},{date:'3.17'},{date:'3.18'},{date:'3.19',},
                      {date:'3.20'},{date:'3.21'},{date:'3.22'},{date:'3.23'},{date:'3.24'},{date:'3.25'},
                      {date:'3.26'},{date:'3.27'},{date:'3.28'},{date:'3.29'},{date:'3.30'},{date:'3.31'},
                      {date:'4.1'},{date:'4.2'},{date:'4.3'},{date:'4.4'},{date:'4.5'},{date:'4.6'},
                      {date:'4.7'},{date:'4.8'},{date:'4.9'},{date:'4.10'},{date:'4.11'},{date:'4.12'},
                      {date:'4.13'}],
                // 今日是否签到
                toDaySign:true,
                // 签到成功弹窗
                signTc:false,
                // 获得红包弹窗
                actTc:false,
                // 是否可以抽红包
                canGetPrice:false,
                // 广告图片链接
                advertiseUrl:'',
                // 跳转链接
                url:'',
                // 显示日历
                showC:false,
                // 中奖金额
                amount:'',
                show:'今日已签到'
            }
        },
        methods:{
            showRule(){
                window.scrollTo(0, document.documentElement.clientHeight);
            },
            // 签到
            goSign(){
                 let url = this.allUrl + '/signIn/saveSignIn?oldSession3rd='+this.oldSession3rd
                this.$http({
					url:url,
					method:'post'
				  })
				  .then((res)=>{
                      this.toDaySign = true
                      this.signTc = true
                     
                      this.$toast.success({
                            time:5000,
                            message:res.data.resultMessage
                        })

                      this.init()
                      this.updateState()
				  })
            },
            // 跳转盘
            goTurntable(){
                let orderId =  (new Date()).toLocaleDateString()
                let url = 'http://front.hzqimiao.com/meters/giftQmxz/index.html?orderId='+orderId+'&&userSign='+this.oldSession3rd
                window.location.href = url;
            },
            // 点击抽现金
            goGetPrice(){
                let url = this.allUrl + '/taskRecord/draw?oldSession3rd='+this.oldSession3rd; 
                  this.$http({
					url:url,
					method:'post'
				  })
				  .then((res)=>{
                      this.amount = res.data.data.amount
                      this.advertiseUrl = res.data.data.picUrl
                      this.url = res.data.data.url
                      this.canGetPrice = false;
                      this.actTc = true;

                     this.updateState()
                  })
            },
            // 初始化日历表
            init(){
                this.oldSession3rd = this.$route.query.openId
                 let url = this.allUrl + '/signIn/getSignInList'
              this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
			  .then((response)=>{
                  this.showC = false
                  this.showC = true
                 response.data.data.map((res)=>{
                     this.data[res].sign = true
                 })
             

              })
            },
            // 更新签到状态
            updateState(){
                // -1已签到 1未签到 2可抽奖 -2下轮再来
                    let url = this.allUrl + '/signIn/checkTodaySignIn'
              this.$http.get(url+'?oldSession3rd='+this.oldSession3rd).then((res)=>{
      
                  if(res.data.resultCode==1){
                      this.toDaySign = false
                  }else if(res.data.resultCode==-1){
                      this.toDaySign = true
                      this.show = '今日已签到'
                  }else if(res.data.resultCode==-2){
                      this.toDaySign = true
                      this.show = '下轮继续'
                  }else if(res.data.resultCode == 2){
                      this.canGetPrice = true
                  }
              })
            },
            // 中奖页面的广告
            goAdver(){
                window.location.href = this.url;
            }

        },
        mounted(){
            this.$http({
		url:'https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=qmxzSign&&channel=lvtudiandian',
                method:'post'
            })
            .then((res)=>{
            
            })
        },
        beforeMount(){
            this.init()
            this.updateState()
        }
    }
</script>

<style scoped lang="scss">
@keyframes scaleDraw {  
            0%{
                transform: scale(1);  

            }
            25%{
                transform: scale(1.1); 
       
            }
            50%{
                transform: scale(1);

            }
            75%{
                transform: scale(1.1);

            }
        }
    .sign{
        height: 100%;
        min-height: 48rem;
        width: 100%;
        background: #feb896;
        overflow: hidden;
        position: absolute;
        .top{
            height: 31.14%;
            width: 100%;
            img{height: 100%;width: 100%;}
        }
        .btn{
            height: 3.28125rem;width: 100%;
            display: flex;
            justify-content: center;
            margin-top: -3.40625rem;
            .animate{
            -webkit-animation-name: scaleDraw; 
            -webkit-animation-timing-function: ease-in-out; 
            -webkit-animation-iteration-count: infinite; 
            -webkit-animation-duration: 2s; 
            }
            
        }
        .btnContent{
            width: 85%;
             display: flex;justify-content: space-around;
        }
        .mu-ripple-demo {
            position: relative;
            width: 7.6875rem;
            height: 2.9375rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.09375rem;
            border-radius: .9375rem;
            color: #fff;
        }
        .goSign{
                background: linear-gradient(#ffad59,#ff4a46);
                border-bottom: .3125rem solid #c60000;
            }
        .alSign{
             background: linear-gradient(#e4dbd2,#c0aeae);
                border-bottom: .3125rem solid #9b8989;
        }
        .goPrice{
            background: linear-gradient(#fc9660,#e04946);
                border-bottom: .3125rem solid #af1010;
                width: 49.91%;height: 2.6875rem;
                margin-top: 9.2%;margin-left: 25.2%;
        }
        .kuang{
            // height: 24.0625rem;
            height: 48.73%;
            width: 94.66%;
            margin-left: 2.67%;
            margin-top: 3.3%;
            background: url('../../assets/images/kuang@3x.png') no-repeat center center;
            background-size: 100% 100%;
            overflow: hidden;
            .canlendar{
                width: 18.3125rem;
                // height: 15.3125rem;
                height: 69.21%;
                margin-left: 2rem;
                margin-top: 3.3125rem;
                overflow-y: scroll;
                overflow-x: hidden;

                 .pai{
                     background: url('http://image.miduoxing.cn/3fd57684-78fe-4b72-8b68-b37799c3b593') no-repeat center center;
                     background-size: 100% 100%;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    height: 20.3125rem;
                    padding-top: 0.4rem;
                    .box{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 4.1625rem;
                        width: 16.6%;
                        .common{
                            width: 1.40625rem;
                            height: 1.5rem;
                            margin-top: .25rem;
                            margin-bottom: .59375rem;
                        }
                        .active{
                            width: 1.75rem;
                            height: 2rem;
                            margin-bottom: .34375rem;
                        }
                    }
                }
               
            }
        }
        .rule{
            height: 14.90625rem;
            // height: 28.98%;
            width: 100%;
            background: url('http://image.miduoxing.cn/0988a059-6d46-4deb-8a79-df7c0d50a673') no-repeat center center;
            background-size: 100% 100%;
            position: absolute;
            bottom: 0;
            
         
            .ruleContent{
                // margin-top: 22%;
                margin-top: 5.3125rem;
                margin-left: 1.3125rem;
                p{
                    font-size: .84375rem;
                    line-height: 1rem;
                    margin-bottom: .8rem;
                    font-weight: bold;
                    color: #9d2424;
                    text-align: left;
                }
            }
        }
        .mubu{
            position: fixed;
            top: 0;
            height: 100%;
            width: 100%;
            background: #000000;
            z-index: 99;
            opacity: .7;
        }
         .signOk{
                height: 16.5625rem;
                width: 75%;
                margin-left: 12.5%;
                background: url('http://image.miduoxing.cn/0bc4255f-3194-4ddf-89bf-a532365d0919') no-repeat center center;
                background-size: 100% 100%;
                z-index: 999;
                position: absolute;
                top: 32.3%;
                img{
                    height: 1.1875rem;width: 1.1875rem;
                    position: absolute;right: .3125rem;top: .25rem;
                }
                p{
                    margin-top: 57.77%;
                    font-size: .875rem;
                    color: #333333;
                    font-weight: bold;
                }
            }
        .getPrice{
                height: 19.3125rem;
                width: 75%;
                margin-left: 12.5%;
                background: url('http://image.miduoxing.cn/12260941-0390-4c71-b169-80a59998fb0c') no-repeat center center;
                background-size: 100% 100%;
                z-index: 999;
                position: absolute;
                top: 24%;
                display: flex;
                flex-direction: column;
                align-items: center;
                 .cha{
                    height: 1.1875rem;width: 1.1875rem;
                    position: absolute;right: .3125rem;top: .25rem;
                }
                .adver{
                    height: 38.16%;
                    margin-top: 3.75rem;
                    width: 84.4%;
                }
                p:nth-child(2){
                     font-size: .875rem;
                    font-weight: bold;
                    color: #fff;
                    margin-top: 1.1875rem;
                }
                 p:nth-child(3){
                     font-size: 2.09375rem;
                     margin-top: .65625rem;
                    font-weight: bold;
                    color: #fff000;
                }
                div{
                    margin-top: .71875rem;
                    background: #ffa1a1;
                    color: #9e0707;
                    width: 9rem;
                    height: 1.625rem;
                    line-height: 1.625rem;
                    border-radius: .73875rem;
                }
        }
    }
</style>