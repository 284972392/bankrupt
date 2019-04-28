<template>
	<div class="detailPage">
		<div class="already">已有{{goodInfo.soldQuantity}}人购买</div>
		<div class="pics">
			<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="5000" duration="500">
			    <block v-for="(item, index) in goodInfo.galleryPics" :index="index" :key="key">
			        <swiper-item>
			        	  <image :src="item" class="slide-image" mode="aspectFill"/>
			        </swiper-item>
			    </block>
			</swiper>
		</div>
	
		<div class="content">
			<div class="yuan">拼</div>
			<div class="contentBox">
				<div class="title">{{goodInfo.goodsName}}</div>
				<div class="money">
						<span>￥{{goodInfo.goodsPrice}}</span>
						<span>￥{{goodInfo.goodsClosePrice}}</span>
						<span>{{goodInfo.couponDiscount}}</span>
						<span>已拼{{goodInfo.soldQuantity}}单</span>
				</div>
			</div>
		</div>
		<div v-if="goodInfo.couponDiscount" class="tiket">
			<img src="../../images/daquan@3x.png" style="position: absolute;display:block;width: 93%;height: 160rpx;position: absolute;"/>
			<div class="tiketBg" @click="buySelf">
				<div class="lefts">
					<div>{{goodInfo.couponDiscount}}<span>元优惠券</span></div>
					<div>有效期:{{goodInfo.couponStartTime}}至{{goodInfo.couponEndTime}}</div>
				</div>
				<div class="right">
					<span>立即</span>
					<span>领券</span>
				</div>
			</div>
			<div class="resum">优惠券剩余数量：<span>{{goodInfo.couponRemainNum}}</span>/{{goodInfo.couponTotalNum}}</div>
		</div>
		<div class="licheng">
			<div class="title"><img src="../../images/two.jpg"/>购物返现省钱流程<img src="../../images/two.jpg"/></div>
			<div class="line">
				<span class="num">1</span>
				<span class="xian"></span>
				<span class="num">2</span>
				<span class="xian"></span>
				<span class="num">3</span>
				<span class="xian"></span>
				<span class="num">4</span>
			</div>
			<div class="fourBox">
				<div>
					<img src="../../images/detail1.png" style="width: 60rpx;height: 39rpx;"/>
					<span>领券购买</span>
				</div>
				<div>
					<img src="../../images/detail2.png" style="width: 60rpx;height: 53rpx;"/>
					<span>跳转拼多多</span>
				</div>
				<div>
					<img src="../../images/detail3.png" style="width: 45rpx;height: 45rpx;"/>
					<span>优惠下单</span>
				</div>
				<div>
					<img src="../../images/detail4.png" style="width: 61rpx;height: 51rpx;"/>
					<span>等待返现</span>
				</div>
			</div>
		</div>
		<div class="detailWords">
			<div class="title"><span></span>商品详情</div>
			<p class="p1">
				当前商品来自拼多多精选类目，原价{{goodInfo.goodsClosePrice}}。 <span>悠享好货平台折扣价{{goodInfo.goodsPrice}}，并提供了{{goodInfo.couponDiscount}}元的优惠券</span>，点击<span>自买赚</span>领取优惠券后可以以{{onlyNum4}}得价格购买，购买成功收货后可获得{{goodInfo.buyEarn}}元返现，相当于购买商品只花了{{onlyNum5}}-{{goodInfo.buyEarn}}={{onlyNum}}元。
			</p>
			<p class="p2">
				如果你把商品再分享出去给好友，好友购买了你还可以赚的最高{{goodInfo.buyEarn}}元的佣金。这么一算，购买该商品最终只需要{{onlyNum2}}元，比从拼多多上直接购买省了整整{{onlyNum3}}元。
			</p>
			<div class="title"><span></span>详细流程</div>
			<p class="p3">
				领券购买得详细流程：<span>领券购买--->跳转拼多多--->确认领券--->优惠购买--->返回悠享好货坐等返现</span>
			</p>
		</div>
		<img v-if="goodInfo.mainPic" style="margin-top: 16rpx;width: 100%;" :src="goodInfo.mainPic"/>

		<div class="threeBtn">
			<div class="shareBox" v-if="showShare">
				<span class="cha" @click="cha"></span>
				<button :id='id' open-type="share">
					<span>微信</span>
				</button>
				<div @click="copy">
					<img src="../../images/copyword.png"/>
					<span>复制文案</span>
				</div>
			</div>
			<div class="toIndex" @click="toIndex">
				<span></span>
				<span>首页</span>
			</div>
			<div class="collection" @click="toCollection">
				<img v-if="isRed" src="../../images/greeStar.png"/>
				<img v-if="!isRed" src="../../images/redStar.png"/>
				<span>收藏</span>
			</div>
			<div @click="share" class="shareLink">分享赚{{goodInfo.buyEarn}}</div>
			<div class="toPDD" @click="buySelf">自买赚{{goodInfo.buyEarn}}</div>
		</div>
		
		<div class="canvas" v-if="showModel">
      <div class="getBox">
        <img src="../../images/wx.png" alt="">
        <p class="p1">使用微信授权登录后才允许操作哦~</p>
        <button plain='true' open-type='getUserInfo' @getuserinfo='onGotUserInfo'>允许</button>
      </div>
    </div>
<!--<div class="canvas" v-if="showModel2">
			<div class="introduce">
					<img src="http://image.miduoxing.cn/75e1b31e-c596-45c3-b69a-c0621104edb5" alt="">
					<div @click="showModel2=false">我知道了</div>
			</div>
</div>-->
<div class="canvas" v-if="showModel2" catchtouchmove="true" @click="showModel2 = false">
			<div class="introduce">
				<div class="chaBox" @click="close2">
					<img  class="redCha" src="../../images/redcha@3x.png" alt="" />
				</div>

					<img class="bg" src="../../images/oneyuan@3x.png" alt="">
					<p>1元红包已发放在您的待收佣金中</p>
					<div class="toxiadan" @click="toGaoe">
						 去下单激活
					</div>
			</div>
</div>


	</div>
</template>

<script>
	var shareInfo = ''
	export default{
		data(){
			return{
				showModel:false,
				showModel2:false,
				copyData:'',
				showShare:false,
				id:null,
				goodsUrl:'',
				shareOpenId:null,
				openId:'',
				onlyNum:'',
				onlyNum2:'',
				onlyNum3:'',
				onlyNum4:'',
				onlyNum5:'',
				year:"",
				isRed:true,
				goodInfo:{},//当前商品信息
				pddGoodsInfo:{},//拼多多商品详情信息
				CustomParams:'',//自定义参数
	      images: []
			}
		},
		onLoad(options){  
		  	Object.assign(this.$data, this.$options.data())
			
			
		// options.openId是分享者的openId，如果有需要带到拼多多里
		    this.openId = wx.getStorageSync('appDt').openId
			this.shareOpenId = ''

			this.goodInfo = {}
			this.id = options.id
			this.goodsUrl = options.goodsUrl
		 if(options.openId){
			 this.shareOpenId = options.openId
			 wx.setStorage({
            	 key: 'shareOpenId',
                 data: options.openId
			 })
		 }else{
			  wx.setStorage({
            	 key: 'shareOpenId',
                 data: ''
           });
		 }
		this.getGoodsInfo()
	    
		
			
	    wx.setNavigationBarTitle({  
	      title:'详情页'  
	    });
  },
mounted(){

	   wx.getUserInfo({
            success:res=> {
              if(res.userInfo){
                this.showModel = false				
              }else{
                this.showModel = true
              }
            
            },
            fail:e=>{
              this.showModel = true
    
            }
          })
	
	 var date=new Date;
			 var year=date.getFullYear(); 
			  this.year = year
},
  onShareAppMessage:(res)=> {
	
	
	let openId = wx.getStorageSync('appDt').openId
			  		let title = '【悠享好货】优惠券'+shareInfo.couponDiscount+'元，券后'+Number(shareInfo.goodsPrice-shareInfo.couponDiscount).toFixed(2)+'元'
  					let sharePath = "pages/detail/main?openId=" + openId+'&id='+shareInfo.goodsId;
	wx.reportAnalytics('share_path', {
			sharepath: '商品详情',
		});

				    return {
				      title: title,
				      path: sharePath
				    }
		
  		
    
  },
  methods:{
  	  	close2(){
  		this.showModel2 = false
  	},
  	toGaoe(){
        wx.navigateTo({url:'../listPage/main?name='+'高额优惠'+'&themeId='+'4398'+'&type='+'1'})
  	},
	 onGotUserInfo(e){
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
        
                  })
                // 是否展示红包提示 
              let url2 = this.globalUrl.getNewCouple
                  this.$http.get(url2,{oldSession3rd:session3rd}).then((res)=>{
                  	 if(res.data.data == 1){
							this.showModel2 = true;
                  	 }else{
							this.showModel2 = false
                  	 }
                  })
					this.showModel = false

      }
    },
  	toCollection(){

  console.log(this.goodInfo)
	  let session3rd = wx.getStorageSync('appDt').session3rd
  let hasCoupon = 0;
  if (this.goodInfo.couponDiscount > 0) {
  	hasCoupon = 1
  }else{
  	hasCoupon = 0
  	
  }
  let formData = {  	
		  "buyEarn": this.goodInfo.buyEarn,
		  "couponDiscount": this.goodInfo.couponDiscount,
		  "goodsClosePrice": this.goodInfo.goodsClosePrice,
		  "goodsId":this.goodInfo.goodsId,
		  "goodsName": this.goodInfo.goodsName,
		  "goodsPrice": this.goodInfo.goodsPrice,
		  "goodsUrl": this.goodsUrl,
		  "hasCoupon": hasCoupon,
		  "openId": session3rd,
		  "shareEarn": this.goodInfo.shareEarn,
		  "soldQuantity":this.goodInfo.soldQuantity
  };
  /*收藏*/
		if (this.isRed == true) {
			let url = this.globalUrl.addCollection
			this.$http.post(url,formData).then(res =>{
							if (res.data.resultCode == "0") {
									wx.showToast({
								  title: '收藏成功',
								  icon: 'success',
								  duration: 2000
								});
							this.isRed = !this.isRed
							}
						})
		}else{
			let url2 = this.globalUrl.delCollection;
			this.$http.get(url2,{
				oldSession3rd : session3rd,
				goodsId : this.goodInfo.goodsId
			}).then(res =>{
			if (res.data.resultCode == "0") {
								wx.showToast({
							  title: '删除成功',
							  icon: 'success',
							  duration: 2000
							});
						this.isRed = !this.isRed
					}
				
		})
			}
  	},
  	copy(){

		this.copyData ="限时抢购"+ this.goodInfo.goodsName +"\n" +"【团购价】" +this.goodInfo.goodsPrice +"\n" + "【自买价】" +this.goodInfo.goodsClosePrice +"\n" +"【下单地址】"+this.pddGoodsInfo.mobileShortUrl+"\n"+"-----------"+"\n" +"1.长按识别二维码" +"\n" + "2.一键抢券"+"\n"+"3.立即购买，输入收货信息下单"+"\n"+"4.微信付款，等待收货即刻！"

  		wx.setClipboardData({
			  data: this.copyData,
			  success (res) {
			    wx.getClipboardData({
			      success (res) {
			      }
			    })
			  }
			})
  	},
  	cha(){
  		this.showShare = false
  		
  	},
  	share(){
  		this.showShare = true
//		document.getElementsByClassName("shareBox")[0].style.top = "-200rpx";
  		
  	},
  	toIndex(){
        wx.switchTab({url:'../index/main'})
	  },
	  getGoodsInfo(){
		
			  let session3rd = wx.getStorageSync('appDt').session3rd
	
			  if(!session3rd){
				  this.Login().then(res=>{
								   if(res){
										 this.getGoodsInfo()
									 }
							 })
							 
			  }else{
				  	session3rd = {
						"oldSession3rd" :session3rd
					}
					session3rd = JSON.stringify(session3rd)
					let url = this.globalUrl.pddDdkGoodDetail
						this.$http.post(url,{
									customParameters:session3rd,
									goodsIdList:[this.id]
						}).then(res =>{
							this.goodInfo = res.data.data
							this.onlyNum = this.goodInfo.goodsPrice-this.goodInfo.couponDiscount-this.goodInfo.buyEarn
							this.onlyNum2 = this.onlyNum - this.goodInfo.buyEarn
							this.onlyNum  = Number(this.onlyNum).toFixed(2)
							this.onlyNum2  = Number(this.onlyNum2).toFixed(2)
							this.onlyNum3 = this.goodInfo.goodsClosePrice-this.onlyNum2
							this.onlyNum3  = Number(this.onlyNum3).toFixed(2)
							this.onlyNum4 = this.goodInfo.goodsPrice-this.goodInfo.couponDiscount
							this.onlyNum4  = Number(this.onlyNum4).toFixed(2)
							this.onlyNum5  = this.goodInfo.goodsPrice-this.goodInfo.couponDiscount
							this.onlyNum5  = Number(this.onlyNum5).toFixed(2)
							shareInfo = res.data.data
							if (this.goodInfo.collection == false) {
								this.isRed = true
							}else{
								this.isRed = false
							}
							this.returnCommissionCustomParams()

						})
			  }
            
			
	  },
	  PddDdkGoodsPromotionUrlGenerate(){//获取拼多多商品信息
			let promoteId = wx.getStorageSync('appDt').promoteId//推广位ID
			let _this = this
			// let selfPrame = JSON.stringify({test=tt})
		  	let url = this.globalUrl.PddDdkGoodsPromotionUrlGenerate
						this.$http.post(url,{
							 goodsIdList:[this.id],
							 pid:promoteId,
							 generateWeApp:true,
							 customParameters:this.CustomParams
						}).then(res =>{
							console.log(res)
							this.pddGoodsInfo = res.data.goodsPromotionUrlGenerateResponse.goodsPromotionUrlList[0];
							
							
						})
	  },
	  returnCommissionCustomParams(){//获取自定义参数
			  this.$http.get(this.globalUrl.returnCommissionCustomParams,{
				  openId:this.openId,
				  shareOpenId:this.shareOpenId,
				  goodsPrice:this.goodInfo.goodsPrice,
				  buyEarn:this.goodInfo.buyEarn,
				  commissiondivide:this.goodInfo.totalCommission
			  }).then(res =>{
	
				this.CustomParams = JSON.stringify(JSON.parse(res.data.data))
				this.PddDdkGoodsPromotionUrlGenerate()
	
			})
	  },
	  buySelf(){
		  console.log(this.pddGoodsInfo)
		//   console.log(this.id)
		wx.navigateToMiniProgram({
			appId: this.pddGoodsInfo.weAppInfo.appId,
			path: this.pddGoodsInfo.weAppInfo.pagePath,
			// extraData: {
				
			// },
			success(res) {
				// 打开成功
			}
		})	

	  }
  }
	}
</script>

<style scoped lang="scss">


.canvas{
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.60);
  height: 100%;
  width: 100%;
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
}

 .detailPage{
 	overflow: hidden;
		background: #f4f4f4;
 	width: 100%;
 	height: 100%;
 	box-sizing: border-box;
 	padding-bottom: 112rpx;
 	.already{
 		padding: 0 10rpx;
 		z-index: 88;
		height: 36rpx;
		line-height: 36rpx;
		border-radius: 50rpx;
		font-size: 14px;
		color: #333333;
		background: rgba(255,192,203,.5);
 		position: absolute;
 		top: 20rpx;
 		left: 10rpx;
 		text-align: center;

 	}
 	.pics{
 		width: 100%;
 		height:763rpx;
				.swiper {
			width: 100%;
		  height: 751rpx !important;
		  		image {
		  height: 100%;
		  width: 100%;
		}
		}
 	}
 	.content{
 			background: #ffffff;
 		
 		width: 100%;
 		height: 194rpx;
 		box-sizing: border-box;
 		padding: 34rpx 30rpx;
 		display: flex;
 		border-bottom: 1px solid #eeeeee;
 		.yuan{
 			width: 45rpx;
 			height: 45rpx;
 			border-radius: 100%;
 			background: #db4d4c;
 			color: #ffffff;
 			font-size: 30rpx;
 			text-align: center;
 			line-height: 45rpx;
 		}
 		.contentBox{

 			flex: 1;
 			height: 100%;
 			box-sizing: border-box;
 			padding-left: 18rpx;
 			.title{
 				width: 100%;
 				line-height: 43rpx;
 				letter-spacing: 0;
 				height: 84rpx;
 				font-size: 29rpx;
 				color: #333333;
					 text-overflow: -o-ellipsis-lastline;
					  overflow: hidden;
					  text-overflow: ellipsis;
					  display: -webkit-box;
					  -webkit-line-clamp: 2;
					  line-clamp: 2;
					  -webkit-box-orient: vertical;
 			}
 			.money{
 				width: 100%;
 				height: 39rpx;
 				display: flex;
 				align-items: center;
 				margin-top: 20rpx;
 				span:nth-child(1){
 					color: #e65455;
 					font-size: 25rpx;
 				}
 				span:nth-child(2){
 					color: #aaaaaa;
 					font-size: 18rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
 				}
 				span:nth-child(3){
 					box-sizing: border-box;
 					display: block;
 					/*width: 95rpx;*/
 					height: 39rpx;
 					color: #f46a4e;
 					font-size: 16rpx;
					margin-left: 28rpx;
					border: 1px solid #f9937d;
					padding-left: 41rpx;
					line-height: 39rpx;
					background: url(../../images/quan@3x.png) no-repeat 2rpx center;
					background-size: 33rpx 28rpx;
 				}
 				span:nth-child(4){
 					font-size: 21rpx;
 					color: #aaaaaa;
 					margin-left: 120rpx;
 				}
 			}
 		}
 	}
 	.tiket{
 		position: relative;
 		width: 100%;
 		height: 270rpx;
 		background: #ffffff;
 		box-sizing: border-box;
 		padding: 26rpx 32rpx;
 		.tiketBg{
 			position: absolute;
 			width: 93%;
 			height: 160rpx;
 			display: flex;
 			.lefts{
				flex: 1;
				height: 100%;
				box-sizing: border-box;
				padding-top: 30rpx;
				div:nth-child(1){
					width: 100%;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					font-family: PingFangSC-Medium;
					font-size: 44rpx;
					color: #FFFFFF;
					letter-spacing: 0;
					span{
						font-size: 36rpx;
					}
				}
				div:nth-child(2){
					width: 100%;
					height: 34rpx;
					text-align: center;
					line-height: 34rpx;
					font-family: PingFangSC-Medium;
					font-size: 24rpx;
					color: #FFFFFF;
					letter-spacing: 0;
					margin-top: 12rpx;
				}
 			}
 			.right{
 				width:190rpx;
 				height: 100%;
 				display: flex;
 				flex-direction: column;
				justify-content: center;
				font-family: PingFangSC-Medium;
				font-size: 34rpx;
				color: #FFFFFF;
				letter-spacing: 0;
				align-items: center;
 			}
 		}
 		.resum{
 			position: absolute;
 			top: 193rpx;
 			width: 100%;
 			height: 34rpx;
 			line-height: 34rpx;
 			margin-top: 22rpx;
 			font-family: PingFangSC-Medium;
				font-size: 24rpx;
				color: #666666;
				letter-spacing: 0;
				span{
					color:#E65454;
				}
 		}
 	}
 	.threeBtn{
 		.shareBox{
 			z-index: 10;
 			width: 100%;
 			height: 200rpx;
 			background: #ffffff;
 			position: absolute;
 			display: flex;
 			align-items: center;
 			justify-content: space-around;
 			top: -200rpx;
	  	    transition: all 1s;
	  	    .cha{
	  	    	width:38rpx;
	  	    	height:38rpx;
	  	    	display: block;
	  	    	position: absolute;
	  	    	right: 10rpx;
	  	    	top: 10rpx;
	  	    	background: url(../../images/cha@3x.png) no-repeat center center;
	  	    	background-size: 38rpx 38rpx;
	  	    }
			button::after {
						  border: none;
			      }
			      button{
	  	   	background: #ffffff;
	  	   	display: block;
	  	   	border: none;
	  	   	padding: 0;
	  	   	margin: 0;
	    	width: 120rpx;
	    	height: 135rpx;
	    	background: url(../../images/wechant@3x.png) no-repeat center top;
	    	background-size:92rpx 92rpx;
			text-align: center;
			line-height: 229rpx;
			font-family: PingFangSC-Medium;
				font-size: 28rpx;
				color: #888888;
				letter-spacing: 0;

	  	    }
	  	   div{
	  	   	background: #ffffff;
	  	   	display: block;
	  	   	border: none;
	  	   	padding: 0;
	  	   	margin: 0;
	  	    	width: 120rpx;
	  	    	height: 135rpx;
	  	    	display: flex;
	  	    	flex-direction: column;
	  	    	justify-content: space-between;
	  	    	align-items: center;
	  	    	img{
	  	    		width: 92rpx;
	  	    		height: 92rpx;
	  	    	}
	  	    	span{
	  	    		text-align: center;
	  	    		font-family: PingFangSC-Medium;
						font-size: 28rpx;
						color: #888888;
						letter-spacing: 0;
	  	    	}
	  	    }
 		}
 		width: 100%;
 		height: 112rpx;
 		background: #ffffff;
 		position: fixed;
 		z-index: 50;
		bottom: 0;
		display: flex;
		.toIndex{
			z-index: 20;
			width: 121rpx;
			height: 100%;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-shadow: 0 -2px 8px 0 #EAEAEA;
			span:nth-child(1){
				width: 37.4rpx;
				height: 37rpx;
				background: url(../../images/souy@3x.png) no-repeat center center;
				background-size: 100% 100%;
			}
			span:nth-child(2){
				font-size: 22rpx;
				color: #333333;
				margin-top: 5px;
			}
		}
		.collection{
			z-index: 20;
			flex: 1;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-shadow: 0 -2px 8px 0 #EAEAEA;
			img{
				width: 38.4rpx;
				height: 37rpx;
			}
			span{
				margin-top: 4px;
				font-size: 22rpx;
color: #333333;
			}
		}
		.shareLink{
			z-index: 20;
			
			width: 252rpx;
			height: 100%;
			font-family: PingFangSC-Medium;
			line-height: 112rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			letter-spacing: 0;
			box-sizing: border-box;
			padding-left: 82rpx;
			background:#FF9E5A url(../../images/share@3x2.png) no-repeat 30rpx center;
			background-size: 36rpx 40rpx;
		}
		.toPDD{
			z-index: 20;
			
			width:252rpx;
			height: 100%;
			font-family: PingFangSC-Medium;
			line-height: 112rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			letter-spacing: 0;
			box-sizing: border-box;
			padding-left: 82rpx;
			background:#E65454 url(../../images/gouwucar@3x.png) no-repeat 30rpx center;
			background-size: 36rpx 40rpx;
		}
 	}
 	.licheng{
 		width: 100%;
 		height: 362rpx;
 		background: #ffffff;
 		margin-top: 20rpx;
 		overflow: hidden;
 		.title{
 			width: 100%;
 		 height: 50rpx;
 		 text-align: center;
 		 margin-top: 33rpx;
 		 font-size: 28rpx;
 		 line-height: 50rpx;
 		 
 		 img{
 		 	width: 29rpx;
 		 	height: 25rpx;
 		 	margin: 0 30rpx;
 		 }
 		 /*span{
 		 	width: 70rpx;
 		 	height: 100%;
 		 	background: urltwourl(../../images/two.jpg) no-repeat center center;
 		 	background-size: 29rpx 25rpx;
 		 }*/
 		}
 		.line{
 			width: 100%;
 			height: 91rpx;
 			box-sizing: border-box;
 			padding: 0 95rpx;
 			display: flex;
 			justify-content: space-between;
 			align-items: center;
 			.num{
 				width: 33rpx;
 				height: 33rpx;
 				text-align: center;
 				line-height: 33rpx;
 				background: #f85a59;
 				color: #ffffff;
 				border-radius: 33rpx;
 				font-size: 19rpx;
 			}
 			.xian{
 				width: 90rpx;
 				height: 1px;
 				border-bottom: 1rpx solid #f3332e;
 			}
 		}
 		.fourBox{
 			width: 100%;
 			height: 143rpx;
 			box-sizing: border-box;
 			padding: 0 34rpx;
 			display: flex;
 			justify-content: space-between;
 			div{
 				width: 136rpx;
 				height: 100%;
 				background: #fff6f5;
 				display: flex;
 				flex-direction: column;
 				align-items: center;
 				justify-content: space-between;
 				box-sizing: border-box;
 				padding: 26rpx 0;
 				img{
 					width: 56rpx;
 					height: 43rpx;
 				}
 				span{
 					font-size: 23rpx;
 				}
 			}
 		}
 	}
 	.detailWords{
 		width: 100%;
 		height: 633rpx;
 		background: #ffffff;
 		padding:0  34rpx;
 		box-sizing: border-box;
 		margin-top: 18rpx;
 		overflow: hidden;
 		.title{
 			margin-top: 27rpx;
 			width: 100%;
 			height: 34rpx;
 			line-height: 34rpx;
 			font-size: 28rpx;
 			color: #282828;
 			box-sizing: border-box;
 			display: flex;
 			padding-left: 11rpx;
 			
 			span{
 				display: block;
 				width: 18rpx;
 				height:19rpx;
 				border-left: 3px solid #ed2528;
 				margin:auto 0;
 			}
 		}
 		.p1,.p2,.p3{
 			margin-top: 27rpx;
 			text-indent:52rpx;
 			width: 100%;
 			height: 181rpx;
 			font-size: 24rpx;
 			line-height: 44rpx;
 			span{
 				color: #ed2528;
 			}
			
 		}
 		.p2{
 			height: 147rpx;
 			margin-top: 17rpx;
 		}
 		.p3{
 			height: 136rpx;
 		}
 	}
 	img{
 		width: 100%;
 	}
 }
</style>