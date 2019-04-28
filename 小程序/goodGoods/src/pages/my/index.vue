<template>
<!-- ham -->
  <div class="counter-warp">
    <div class="top">
      <div class="topLeft">
        <img :src='userInfo.avatarUrl' alt="" class="avatar">
        <div class="topBox">
           <span>{{userInfo.nickName}}</span>
           <div class="grade">{{grade}}</div>
        </div>
      </div>
        <div class="topright">
        	 <div class="invite" @click="invite">邀请得佣金 ></div>
       			 <div class="myTop" @click="showTop"><span v-if="haveTop">我的上级</span></div>
        </div>
       
    </div>
    <div class="card">
         <div class="topCard">
           <div class="top1" @click="checkDetail">
               <span>佣金明细</span>
               <span class="check">查看佣金明细 ></span>
           </div>
           <div class="content">
                <p><span>已收</span><span>￥{{get?get:0.00}}</span></p>
                <p><span>总预计收入</span><span>￥{{total?total:0.00}}</span></p>
                <p><span>待收</span><span>￥{{toGet?toGet:0.00}}</span></p>
           </div>
           <div class="getCash" @click="getCash">
              提现
           </div>
           
         </div>
         <div class="btmCard">
              <div class="btmT">
                  <div @click="goMyTeam"><img src="../../images/team.png" alt=""><span>我的团队</span></div>
                  <div @click="goMyOrder"><img src="../../images/order.png" alt="" style="width:66rpx;"><span>我的订单</span></div>
                  <div @click="toMyCollection"><img src="../../images/redStar.png" alt="" style="width:60rpx;"><span>我的收藏</span></div>
              </div>
              <div class="btmB" @click="contactUs">
                  <div class="left">
                      <img src="../../images/contact.png" alt="">
                      <p>联系我们</p>
                  </div>
                  <img src="../../images/right.png" alt="" class="right">
              </div>
              <div class="btmB" @click="puzzleSolve">
                  <div class="left">
                      <img src="../../images/explain.png" alt="">
                      <p>疑难解答</p>
                  </div>
                  <img src="../../images/right.png" alt="" class="right">
              </div>
              <div class="btmB" @click="goStrategy">
                  <div class="left">
                      <img src="../../images/gongl.png" alt="">
                      <p>赚钱攻略</p>
                  </div>
                  <img src="../../images/right.png" alt="" class="right">
              </div>
              <div class="btmB" @click="suggest">
                  <div class="left">
                      <img src="../../images/yinan.png" alt="">
                      <p>建议反馈</p>
                  </div>
                  <!--<div class="redBox">提意见赚<span>现金红包</span></div>-->
                  <img src="../../images/right.png" alt="" class="right">
              </div>
             

       
       

         </div>
    </div>

    <div class="canvas" v-if="showModel">
      <div class="getBox">
        <img src="../../images/wx.png" alt="">
        <p class="p1">使用微信授权登录后才允许操作哦~</p>
        <button plain='true' open-type='getUserInfo' @getuserinfo='onGotUserInfo'>允许</button>
      </div>
    </div>
  <mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask='true'></mp-loading>

<!--<div class="canvas" v-if="showModel2">
			<div class="introduce">
					<img src="http://image.miduoxing.cn/75e1b31e-c596-45c3-b69a-c0621104edb5" alt="">
					<div @click="showModel2=false">我知道了</div>
			</div>
</div>-->
<div class="canvas" v-if="showModel2" catchtouchmove="true" @click="showModel2 = false">
			<div class="introduce">
				<div class="chaBox" @click="close2">
					<img class="redCha" src="../../images/redcha@3x.png" alt="" />
				</div>

					<img class="bg" src="../../images/oneyuan@3x.png" alt="">
					<p>1元红包已发放在您的待收佣金中</p>
					<div class="toxiadan" @click="toGaoe">
						 去下单激活
					</div>
			</div>
</div>
<div class="myTopBigBox" v-if="topmodle" @click="topmodle=false">
	 <div class="smallBox">
	 	 <img class="cha" src="../../images/cha@3x.png" @click="topmodle=false" alt="" />
	 	 <p>我的上级：</p>
	 	 <div class="headPic">
	 	 	<img :src="parentHeadImgUrl" alt="" />
	 	 	<span>{{parentNickName}}</span>
	 	 </div>
	 </div>
</div>
  </div>
</template>

<script>
// Use Vuex

import store from './store'
import mpLoading from 'mpvue-weui/src/loading';

export default {
   components: {
    mpLoading,
  },
  data(){
    return{
      get:null,
      toGet:null,
      haveTop:false,
      topmodle:false,
      total:null,
      parentHeadImgUrl:'',
      parentNickName:'',
      isShowLoading:true,
      showModel:false,
      showModel2:false,
      userInfo:{},
      grade:''
    }
  },
  onShareAppMessage:()=> {
    let openId = wx.getStorageSync('appDt').openId
    let sharePath = "pages/index/main?openId=" + openId;
    wx.reportAnalytics('share_path', {
      sharepath: '我的页面',
    });
    return {
      title: '每天赚点钱，提现到账快',
      desc: 'share',
      path: sharePath
    }
    
  },
  methods: {
  	close2(){
  		this.showModel2 = false
  	},
  	toGaoe(){
        wx.navigateTo({url:'../listPage/main?name='+'高额优惠'+'&themeId='+'4398'+'&type='+'1'})
  	},
  	showTop(){
  		this.topmodle = true
  	},

    goStrategy(){
      wx.navigateTo({url:'../strategy/main'})
    },

    getCash(){
        wx.navigateTo({url:'../getCash/main'})
     
    },
    invite(){
      wx.navigateTo({url:'./invite/main'})
    },
    checkDetail(){
        wx.navigateTo({url:'./priceDetail/main'})
    },
    goMyOrder(){
        wx.navigateTo({url:'./myOrder/main'})
    },
    toMyCollection(){
        wx.navigateTo({url:'../listPage/main?type='+"collection"+"&name="+"我的收藏"})
    	
    },
    goMyTeam(){
        wx.navigateTo({url:'./myTeam/main'})
    },
    contactUs(){
      wx.navigateTo({url:'./contactUs/main'})
    },
    puzzleSolve(){
      wx.navigateTo({url:'./puzzleSolve/main'})
    },
    suggest(){
      wx.navigateTo({url:'./suggest/main'})
    },
    onGotUserInfo(e){
      console.log(e.mp.detail.userInfo)
      // updateUserInfo
      if(e.mp.detail.userInfo){
        let info = e.mp.detail.userInfo
              let session3rd = wx.getStorageSync('appDt').session3rd
              let url = this.globalUrl.updateUserInfo + '?oldSession3rd=' + session3rd
                  this.$http.post(url,{
                      city:info.city,
                      country:info.country,
                      headImgUrl:info.avatarUrl,
                      gender:info.gender,
                      language:info.language,
                      nickName:info.nickName,
                      province:info.province 
                  }).then(res =>{
											
											                            // 是否展示红包提示 
              let url2 = this.globalUrl.getNewCouple
                  this.$http.get(url2,{oldSession3rd:session3rd}).then((res)=>{
                  	 console.log(res)
                  	 if(res.data.data == 1){
												this.showModel2 = true;
                  	 }else{
												this.showModel2 = false

                  	 }
                  })
                  })
                       this.$http.get(this.globalUrl.getUserInfo,{}).then(res =>{
       this.grade = res.data.data.levelName
       this.get = res.data.data.get
       this.toGet = res.data.data.toGet
       this.total = res.data.data.total
     })
                  

            	if(wx.getStorageSync('appDt').parentHeadImgUrl){
					    	 	this.parentHeadImgUrl = wx.getStorageSync('appDt').parentHeadImgUrl
					  	};
					  	if(wx.getStorageSync('appDt').parentNickName){
					  		this.parentNickName = wx.getStorageSync('appDt').parentNickName
					  	};
					  	if(this.parentNickName == ""){
					  		this.haveTop = false
					  	}else{
					  		this.haveTop = true
					  	}
              
					
          this.showModel = false
          this.userInfo = e.mp.detail.userInfo
      }
    },
  },
 
  onHide() {
   this.$http.get(this.globalUrl.getUserInfo,{}).then(res =>{
       this.grade = res.data.data.levelName
       this.get = res.data.data.get.toFixed(2)
       this.toGet = res.data.data.toGet.toFixed(2)
       this.total = res.data.data.total.toFixed(2)
     })
  },
   onShow(){
	if(wx.getStorageSync('appDt').parentHeadImgUrl){
    	 	this.parentHeadImgUrl = wx.getStorageSync('appDt').parentHeadImgUrl
	};
	if(wx.getStorageSync('appDt').parentNickName){
		this.parentNickName = wx.getStorageSync('appDt').parentNickName
	};
	if(this.parentNickName == ""){
		this.haveTop = false
	}else{
		this.haveTop = true
	}


   	console.log(this.parentNickName)

    if(this.showModel){
       wx.getUserInfo({
            success:res=> {
              if(res.userInfo){
                this.showModel = false
                this.userInfo = res.userInfo
                this.$http.get(this.globalUrl.getUserInfo,{}).then(res =>{
                  this.grade = res.data.data.levelName
                  this.get = res.data.data.get.toFixed(2)
                  this.toGet = res.data.data.toGet.toFixed(2)
                  this.total = res.data.data.total.toFixed(2)
                })
              }else{
                this.showModel = true
              }
              this.isShowLoading = false
            },
            fail:e=>{
              this.showModel = true
              this.isShowLoading = false
            }
          })
    }
   },
mounted () {
	if(wx.getStorageSync('appDt').parentHeadImgUrl){
    	 	this.parentHeadImgUrl = wx.getStorageSync('appDt').parentHeadImgUrl
	};
	if(wx.getStorageSync('appDt').parentNickName){
		this.parentNickName = wx.getStorageSync('appDt').parentNickName
	};
	if(this.parentNickName == ""){
		this.haveTop = false
	}else{
		this.haveTop = true
	}
     this.$http.get(this.globalUrl.getUserInfo,{}).then(res =>{
       this.grade = res.data.data.levelName
       this.get = res.data.data.get.toFixed(2)
       this.toGet = res.data.data.toGet.toFixed(2)
       this.total = res.data.data.total.toFixed(2)
     })
   
          wx.getUserInfo({
            success:res=> {
              if(res.userInfo){
                this.showModel = false
                this.userInfo = res.userInfo
              }else{
                this.showModel = true
              }
              this.isShowLoading = false
            },
            fail:e=>{
              this.showModel = true
              this.isShowLoading = false
            }
          })

}
}
</script>
<style>
  page{
  height: 100%;
}
</style>

<style lang='scss' scoped>
.counter-warp{
  overflow: hidden;
  padding: 0;
  background: #f4f4f4;
  height: 109%;
  width: 100%;
  font-family: PingFangSC-Medium;
  .canvas{
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.60);
  height: 100%;
  width: 100%;
.introduce{
	width: 608rpx;
	height:692rpx;
	background: #fff;
	text-align: center;
	font-size: 28rpx;
	color: #333333;
	margin: 0 auto;
	margin-top: 150rpx;
	position: relative;
	border-radius: 8rpx;
	.bg{
		width: 100%;
	height: 100%;
	}
	.chaBox{
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		.redCha{
		width: 40rpx;
		height: 40rpx;
		margin-top: 20rpx;
	}
	}
	
	p{
		width: 100%;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 28rpx;
color: #333333;
position: absolute;
bottom: 158rpx;
	}
	.toxiadan{
		width: 342rpx;
		height: 84rpx;
		background-image: linear-gradient(0deg, #E65454 0%, #FF8686 100%);
box-shadow: 0 2px 7px 0 #FF7878;
border-radius: 21px;
position: absolute;
bottom: 46rpx;
left: 132rpx;
text-align: center;
line-height: 84rpx;
font-size: 36rpx;
color: #FFFFFF;
	}
}
.getBox{
    width: 608rpx;
    height: 481rpx;
    background: #ffffff;
    margin-left: 74rpx;
    margin-top: 262rpx;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{height: 125rpx;width: 125rpx;margin-top: 66rpx;}
    .p1{margin-top: 35rpx;font-size: 27rpx;color: #333333;font-weight: bold;}
    button{
      margin-top: 65rpx;
      height: 85rpx;
      width: 369rpx;
      text-align: center;
      line-height: 85rpx;
      font-size: 25rpx;
      color: #ffffff;
      background: #06bb14;
      border-radius: 50rpx;
      border-color: #06bb14;
    }
  }
}
}
.avatar{
  height: 140rpx;
  width: 140rpx;
  border:5rpx solid #ffffff;
  border-radius: 100%;
}
.top{
  width: 100%;
  height: 344rpx;
  background-image: -webkit-linear-gradient(top, #e95b5a, #fa7a7b); 
  padding-top:13rpx;
  padding-left: 30rpx;
  display: flex;
  justify-content: space-between;
  .topLeft{
    display: flex;
  }
}
.topright{
	margin-right: 50rpx;
	width: 170rpx;
	height: 118rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.invite{
  font-size: 26rpx;
  color: #FFFFFF;
  float: right;
  /*margin-right: 55rpx;*/
  /*margin-top: 10rpx;*/
}
.myTop{
	font-size: 26rpx;
color: #FFFFFF;
text-decoration: underline;
}
}

.topBox{
  height: 150rpx;
  margin-left: 39rpx;
}
.topBox span{
  margin-top: 25rpx;
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
}
.grade{
  margin-top: 22rpx;
  border-radius: 50rpx;
  background: #e65454;
  height: 46rpx;
  width: 152rpx;
  color: #ffffff;
  font-size: 25rpx;
  text-align: center;
  line-height: 46rpx;
  font-weight: bold;
}
.card{
  position: absolute;
  width: 700rpx;
  margin-left: 25rpx;
  height: 63.36%;
  top: 190rpx;
  padding: 0;
  .topCard{
    padding-bottom: 35rpx;
    background: #ffffff;text-align: center;
    border-radius: 15rpx;
    .getCash{
      height: 85rpx;
      line-height: 85rpx;
      width: 295rpx;
      color: #ffffff;
      display: inline-block;
      margin-top: 48rpx;
      text-align: center;
      background-image: linear-gradient(0deg, #E65454 0%, #FF8686 100%);
      box-shadow: 0 2px 7px 0 #FF7878;
      border-radius: 21px;
    }
    .content{
      display: flex;
      padding-top: 37rpx;
      justify-content: space-around;
      p{
        font-size: 24rpx;color: #666666;
        display: flex;flex-direction: column;
        text-align: center;
        span:nth-child(2){color: #343434;font-weight: bold;
                font-size: 34rpx;margin-top: 24rpx;}
      }
    }
    .top1{
      background: #ffffff;
      height: 87rpx;border-radius: 15rpx;
      line-height: 87rpx;
      border-bottom: 2rpx solid #eeeeee;
      padding-left: 29rpx;font-size: 27rpx;
      color: #3a3a3a;font-weight: bold;
      display: flex;padding-right: 28rpx;
      justify-content: space-between;
      .check{
        color: #adadad;
        font-size: 23rpx;
      }
    }
  }
  .btmCard{
    background: #ffffff;
    margin-top: 16rpx;
    border-radius: 15rpx;
    .btmT{
      height: 168rpx;
      border-bottom: 2rpx solid #eeeeee;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div{
        display: flex;flex-direction: column;
        align-items: center;
        font-size: 24rpx;
        color: #333333;
        font-weight: bold;
        img{
          width: 89rpx;height: 54rpx;
        }
        span{margin-top: 21rpx;}
      }
    }
    .btmB{
       height: 99rpx;
      border-bottom: 2rpx solid #eeeeee;
      display: flex;
      justify-content: space-between;
      padding: 0 26rpx 0 26rpx;
      font-size: 25rpx;
      color: #333333;
      font-weight: bold;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        img{
          width: 38rpx;
        height: 38rpx;
        margin-right: 23rpx;
        }
        
      }
      .redBox{
      	margin-left: 260rpx;
      	font-size: 24rpx;
			color: #666666;
			letter-spacing: 0;
			span{
				color: #E65454;
			}
      }
      .right{
        height: 28rpx;
        width: 16rpx;
      }
    }
  }
}
.myTopBigBox{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.60);
	.smallBox{
		width: 540rpx;
		height: 272rpx;
		margin: 0 auto;
		margin-top: 300rpx;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position:relative;
		.cha{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			right: 10rpx;
			top: 10rpx;
		}
		p{
			height: 42rpx;
			line-height: 42rpx;
			font-size: 30rpx;
			color: #666666;
		}
		.headPic{
			margin-top: 20rpx;
			width: 100%;
			height: 64rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width: 64rpx;
				height: 64rpx;
				border-radius: 50rpx;
			}
			span{
				display: block;
				max-width: 400rpx;
				font-size: 32rpx;
				color: #333333;
			overflow:hidden;
	    text-overflow:ellipsis;
	    white-space:nowrap;
	    margin-left: 10rpx;
			}
		}
	}
}
</style>
