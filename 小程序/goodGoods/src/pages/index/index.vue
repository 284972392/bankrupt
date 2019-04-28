<template>
  <div class="container">
			<div class="searchBox">
						<div @click="toSearch" id="searchInput">
							<span style="color:#a6a6a6;font-size:24rpx;">搜索标题、商品关键字或商品链接</span>
						</div>
						<div class="toFenL" @click="toClassification">
							<span></span>
							<span>分类</span>
						</div>
			</div>
			<!--广告swiper-->
			<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
			    <block v-for="(item, index) in images" :index="index" :key="index">
			        <swiper-item>
			        	  <image @click="toList(item)" :src="item.imageUrl" class="slide-image" mode="aspectFill"/>
			        </swiper-item>
			    </block>
			</swiper>

<!--pdd专题以及自定义专题-->
		 <div class="fiveTab" >
		 		<div v-for="(data,index) in zhuanTi" @click="toZhuanTi(data)">
		 				<img :src="data.logo"/>
		 				<span>{{data.name}}</span>
		 		</div>
		 </div>
		 <!--分类-->
		 <div class="classType">
		 	 <div class="catBox" v-for="(data,index) in classTypes" @click="classToList(data)">
		 	 	 <img :src="data.icon" alt="" />
		 	 	 <span>{{data.catName}}</span>
		 	 </div>
		 </div>
		 <!-- <div @click="getQrCode">生成二维码</div> -->
		 
		 <div class="strategy">
				<swiper class="swiper2" circular="true" :indicator-dots="false" autoplay="true" interval="3000" duration="1000">
						<block>
								<swiper-item>
									<!-- <img src="https://image.miduoxing.cn/null_4b6f3cf9-e5b8-4415-8b16-c9a70b344813" alt="" @click="goStrategy1"> -->
									<img src="../../images/sBanner.png" alt="" @click="goStrategy1">									
								</swiper-item>
						</block>
				</swiper>
		 </div>

			<div class="goodsList">
					<div class="goodBox" @click="toDetail(data)" v-for="(data,index) in goodsList" :key="key">
						<div class="logo">
								<img :src="data.goodsUrl"/>
						</div>
						<div class="content">
							<div class="title">{{data.goodsName}}</div>
							<div class="center">
								<span>券后价￥{{data.buyMoney}}</span>
								<span>￥{{data.goodsClosePrice}}</span>
							</div>
							<div class="bottom">
								<span>{{data.couponDiscount}}</span>
								<span>{{data.buyEarn}}</span>
							</div>
							<button :id="data.goodsId+';'+data.goodsPrice+';'+data.couponDiscount" @click.stop="" open-type="share">分享赚<span style="color: #e65455;">{{data.buyEarn}}</span></button >
							
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
<!--<div v-if="toTopBox" class="bottom-top" @click="toTop"> 回到顶部</div>-->
<img src="../../images/toTop.png" v-if="toTopBox" class="bottom-top" @click="toTop"/>
<!-- <img src="../../images/jihuo.png" v-if="isJh" class="jihuo" alt="" @click="showModle2"/> -->
<div class="canvas" v-if="showModel2">
			<div class="introduce">
					<img src="http://image.miduoxing.cn/75e1b31e-c596-45c3-b69a-c0621104edb5" alt="">
					<div @click="showModel2=false">我知道了</div>
			</div>
</div>
<!-- <div class="canvas" v-if="showModel2" catchtouchmove="true" @click="showModel2 = false">
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
</div> -->
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
		isShowLoading:true,
		showModel:false,
		showModel2:false,
      motto: 'Hello World',
      total:'',
      userInfo: {},
      zhuan1:{},
      zhuan2:{},
      zhuan3:{},
      zhuan4:{},
      zhuan5:{},
      isJh:false,
      goodsList:[],
      zhuanTi:[],
      toTopBox:false,
      ztImg:[
      "../../images/you@3x.png",
      "../../images/gaoquan@3x.png",
      "../../images/tuijian@3x.png",
      "../../images/tuijian@3x.png",
      "../../images/qianggou@3x.png"
      ],
      page:1,
      pageSize:20,
      images: [],
      classTypes:[]
    }
  },
  onShareAppMessage:(res)=> {

	
		 let openId = wx.getStorageSync('appDt').openId
  	if(res.from === 'button'){
				let arr = res.target.id.split(';')
		  let title = '【悠享好货】优惠券'+arr[2]+'元，券后'+Number(arr[1]-arr[2]).toFixed(2)+'元'
  					let sharePath = "pages/detail/main?openId=" + openId+'&id='+arr[0];
				wx.reportAnalytics('share_path', {
							sharepath: '首页商品',
						});
				    return {
				      title: title,
				      path: sharePath
				    }
					
  	}else{
				 let sharePath = "pages/index/main?openId=" + openId;
				wx.reportAnalytics('share_path', {
					sharepath: '首页',
				});

				    return {
				      title: '大家都在用，购物领券还返现',
				      path: sharePath
				    }
		
  	}
		 

  },
  components: {
    card
  },
  onHide(){
								let session3rd = wx.getStorageSync('appDt').session3rd
											                // 是否展示红包提示 
              let url2 = this.globalUrl.getNewCouple
                  this.$http.get(url2,{oldSession3rd:session3rd}).then((res)=>{
                  	 console.log(res)
                  	 if(res.data.data == 1){

												this.isJh = true
                  	 }else{
												this.isJh = false
                  	 }
                  })
  },
  onShow(){
	   if(this.showModel){
       wx.getUserInfo({
            success:res=> {
              if(res.userInfo){
                this.showModel = false
								this.userInfo = res.userInfo
								this.loadList(1);
								this.loadBanner();
								this.getCatAndClass();
								let session3rd = wx.getStorageSync('appDt').session3rd
								
							                // 是否展示红包提示 
              let url2 = this.globalUrl.getNewCouple
                  this.$http.get(url2,{oldSession3rd:session3rd}).then((res)=>{
                  	 console.log(res)
                  	 if(res.data.data == 1){

												this.isJh = true
                  	 }else{

												this.isJh = false
                  	 }
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
	mounted(){
		if (wx.getStorageSync('appDt').session3rd) {
			
		}

		
		
          wx.getUserInfo({
            success:res=> {
              if(res.userInfo){
                this.showModel = false
								this.userInfo = res.userInfo
								this.loadList(1);
								this.loadBanner();
								this.getCatAndClass();
								let session3rd = wx.getStorageSync('appDt').session3rd
								                // 是否展示红包提示 
              let url2 = this.globalUrl.getNewCouple
                  this.$http.get(url2,{oldSession3rd:session3rd}).then((res)=>{
                  	 console.log(res)
                  	 if(res.data.data == 1){

												this.isJh = true
                  	 }else{
												this.isJh = false
                  	 }
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
		
	},
	//监听页面滚动高度
 onPageScroll(e){
  	 	if(e.scrollTop > 1000){
					this.toTopBox = true
  	 	}else{
					this.toTopBox = false
  	 	}
  	 },
  methods: {
  	getCatAndClass(){
			  let session3rd = wx.getStorageSync('appDt').session3rd
  		
  				//获取分类位
			      let url3 = this.globalUrl.getCategoryList;

						  this.$http.get(url3,{
						  	oldSession3rd:session3rd
						  }).then(res =>{
											this.classTypes = res.data.data
								  })	
		
		
						//获取 9.9包邮 ...  那五个专题
								
	      let url2 = this.globalUrl.getChannels;
						  this.$http.get(url2,{
						  	oldSession3rd:session3rd
						  }).then(res =>{
											this.zhuanTi = res.data.data.records

								  })	
  	},
      classToList(data){
     		   wx.navigateTo({url:'../listPage/main?name='+data.catName+'&catId='+data.catId})
			},

		goStrategy1(){
		 wx.navigateTo({url:'../strategy/main'})
		},
		goActivity(){
				 wx.navigateTo({url:'../newYearActivity/main'})
		},

  	toTop(){
  		    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration:300
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
  	}
  	},
	  onGotUserInfo(e){
      // updateUserInfo
      if(e.mp.detail.userInfo){
		  this.loadList(1);
		  this.loadBanner();
								this.getCatAndClass();
		  
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
															this.isJh = true
			                  	 }else{
															this.showModel2 = false
															this.isJh = false
			                  	 }
			                  })
                  })

                  

					this.showModel = false

          this.userInfo = e.mp.detail.userInfo
      }
    },
	  getQrCode(){
 		//   this.$http.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx0e9e06dae7941822&secret=6d51bb8ad5a6a3c2d6767c2b19aa8171',{}).then(res =>{
                 
		// 				let openId = wx.getStorageSync('appDt').openId
		// 				let path = 'pages/index/main?openId='+openId
        //                 let uuu = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+res.data.access_token;
		// 				this.$http.post(uuu,{
		// 					"path": path,
		// 			    	 "width": 430
		// 				}).then(res =>{
		// 						console.log(res.data)
							
		// 						})
        
        //           })
	  },
  	toList(item){
        wx.navigateTo({url:'../listPage/main?name='+item.name+'&id='+item.id})
  		
  	},
  	loadBanner(){
  				//获取专题列表 --  拿来展示banner的那些广告专题
      let url = this.globalUrl.PddDdkThemeListGet
		  this.$http.post(url,{
		  	pageSize:5
		  }).then(res =>{
					this.images = res.data.themeListGetResponse.themeList
				  })
  	},
  	loadList(page){

  		      wx.showLoading({
			        title: '加载中',
			      })
			    

			  let session3rd = wx.getStorageSync('appDt').session3rd
		 console.log(session3rd)
			  if(!session3rd){
				  this.Login().then(res=>{
								   if(res){
										 this.loadList()
									 }
							 })
			  }else{
				  session3rd = {
              	"oldSession3rd" :session3rd
              }
			  session3rd = JSON.stringify(session3rd)
			 
              let url = this.globalUrl.pddDdkGoodsSearch
                  this.$http.post(url,{
                  			customParameters:session3rd,
                  			page:page,
                  			pageSize:this.pageSize
                  }).then(res =>{
     				  wx.hideLoading();


                  	this.total = res.data.data.total

                  	this.goodsList =this.goodsList.concat(res.data.data.goodsListVos) 
                  	this.goodsList.forEach(function(i,index){
                  		 i.buyMoney = (i.goodsPrice-i.couponDiscount).toFixed(2)
                  	})
                  })
			  }
              
  	},
  	close2(){
  		this.showModel2 = false
  	},
  	showModle2(){
  		this.showModel2 = true
  	},
  	toGaoe(){
        wx.navigateTo({url:'../listPage/main?name='+'高额优惠'+'&themeId='+'4398'+'&type='+'1'})
  	},
  	toZhuanTi(data){
        wx.navigateTo({url:'../listPage/main?name='+data.name+'&channelType='+data.channelType+'&themeId='+data.themeId+'&type='+data.type})
  		
  	},
  	toDetail(data){
				wx.navigateTo({url:'../detail/main?id='+data.goodsId+'&&goodsUrl='+data.goodsUrl})
  	},
  	toSearch(){
        wx.navigateTo({url:'../searchPage/main'})
  	},
		toClassification(){
						wx.navigateTo({url:'../classification/main'})
		},
    getUserInfo () {
      // 调用登录接口
   
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    _getRegisterInfo(){

		      this.page++;
      if (this.total/20 > this.page) {
		 	   let page =  this.page
		      console.log(page)
					this.loadList(page)
      }else{
      	 wx.showToast({
				  title: '拉到底啦',
				  icon: 'none',
				  duration: 2000
				})
      }


//    this.goodsList.push({},{},{},{},{},{})

    }
	},
	onLoad(res){		
		
		 if(res.openId){
			 wx.setStorage({
            	 key: 'shareOpenId',
               data: res.openId
           });
		 }else{
			 	 wx.setStorage({
            	 key: 'shareOpenId',
               data: ''
           });
		 }
		    
	},
// 上拉加载
onReachBottom: function () {
//执行上拉执行的功能
  this._getRegisterInfo();
},
// 停止下拉刷新
async onPullDownRefresh() {
  // to doing..
  // 停止下拉刷新
  wx.stopPullDownRefresh();
},
  created () {
    // 调用应用实例的方法获取全局数据
	// this.getUserInfo()

		  let session3rd = wx.getStorageSync('appDt').session3rd
			  if(!session3rd){
				  this.Login()
			  }

  }
}
</script>

<style scoped lang="scss">


.strategy{
	width: 100%;
	height: 154rpx;
	background: #FFFFFF;
	margin: 16rpx 0 0 0;
	padding: 16rpx 0 0 0;
	.swiper2{
		height: 184rpx;
		width: 100%;
	}
	img{
		height: 136rpx;
		width: 92.6%;
		margin-left: 3.7%;
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
	border-radius: 20rpx;
	.bg{
		width: 100%;
	height: 100%;
	border-radius: 20rpx;
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
}

	.container{
		background: #f4f4f4;
		width: 100%;
		padding: 0;
		.searchBox{
			width: 100%;
			height: 123rpx;
			background: #f4f4f4;
			align-items: center;
			display:flex;
			
			#searchInput{
				background: #ffffff url(../../images/sousuo@3x.png) no-repeat 32.8rpx center;
				background-size: 26rpx 26rpx;
				box-sizing: border-box;
				padding-left: 73rpx;
				margin-left: 35rpx;
				display: block;
				width: 617rpx;
				height: 71rpx;
				line-height: 65rpx;
				border-radius: 50px;
				box-shadow: 1px 1px 5px #eeeeee;
			}
		.toFenL{
			 flex: 1;
			 height: 68rpx;
			 display: flex;
			 flex-direction: column;
			 align-items: center;
			 justify-content: space-between;
			 span:nth-child(1){
					display: block;
					width: 40rpx;
					height: 40rpx;
					background: url(../../images/fenlei@3x.png) no-repeat center center;
					background-size: 100% 100%;
			 }
			 span:nth-child(2){
			 	font-family: PingFangSC-Medium;
				font-size: 22rpx;
				color: #666666;
				letter-spacing: 0;
			 }
		}
		}
		.swiper {
			width: 100%;
		  height: 351rpx !important;
		  		image {
		  height: 100%;
		  width: 100%;
		}
		}
		.fiveTab{
			margin-top: 15rpx;
			width: 100%;
			height: 212rpx;
			background: #ffffff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			div{
				width: 130rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				img{
					display: block;
					width: 80rpx;
					height: 80rpx;
					border-radius: 100px;
				}
				span{
					display: block;
					width: 100%;
					height: 27rpx;
					text-align: center;
					font-size: 25rpx;
					line-height: 27rpx;
					/*overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;*/
				}
			}
		}
		.classType{
			width: 100%;
			height: 368rpx;
			background: #FFFFFF;
			margin-top: 16rpx;
			display: flex;
			box-sizing: border-box;
			padding: 20rpx 0;
			justify-content:space-between;
			flex-wrap: wrap;
			.catBox:nth-child(5),.catBox:nth-child(6),.catBox:nth-child(7),.catBox:nth-child(8){
				margin-top: 22rpx;
			}
			.catBox{
				 display: flex;
				 flex-direction: column;
				 justify-content: space-between;
					align-items: center;
				 width: 25%;
				 height: 156rpx;

				 img{
				 	width: 120rpx;
				 	height: 100rpx;
				 }
				 span{
				 	font-size: 28rpx;
						color: #333333;
				 }
			}
		}
		.goodsList{
			width: 100%;
			background: #ffffff;
			margin-top: 17rpx;
			.goodBox{
				width: 100%;
				height: 268rpx;
				border-bottom: 1px solid #eeeeee;
				box-sizing: border-box;
				padding: 33rpx 28rpx;
				display:flex;
				.logo{
					width: 213rpx;
					height: 100%;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.content{
					flex: 1;
					margin-left:14rpx;
					position: relative;
					.title{
						letter-spacing: 0;
						width: 100%;
						height: 83rpx;
						color: #333333;
						font-size: 27rpx;
						line-height: 41rpx;
						font-weight: 600;
						 text-overflow: -o-ellipsis-lastline;
					  overflow: hidden;
					  text-overflow: ellipsis;
					  display: -webkit-box;
					  -webkit-line-clamp: 2;
					  line-clamp: 2;
					  -webkit-box-orient: vertical;
					}
					.center{
						width: 100%;
						height: 72rpx;
						display: flex;
						align-items: center;
						span:nth-child(1){
							color: #e65454;
							font-size: 25rpx;
						}
						span:nth-child(2){
							color: #aaaaaa;
							margin-left: 15rpx;
							text-decoration: line-through;
							font-size: 25rpx;
						}

					}
					.bottom{
						width: 100%;
						height: 60rpx;
						display: flex;
						align-items: center;
						span:nth-child(1){
							box-sizing: border-box;
							display: block;
							border-radius: 2px;
							width: 95rpx;
							height: 39rpx;
							line-height: 35rpx;
							border: 1px solid #fa947e;
							color: #f2593a;
							font-size: 17rpx;
							padding-left:  42rpx;
							background: url(../../images/quan@3x.png) no-repeat 2rpx center;
							background-size:33rpx 28rpx;
						}
							span:nth-child(2){
							box-sizing: border-box;
							display: block;
							width: 118rpx;
							height: 39rpx;
							line-height: 35rpx;
							border: 1px solid #ac6ffb;
							color: #ac6ffb;
							font-size: 17rpx;
							padding-left:  60rpx;
							background: url(../../images/fanli@3x.png) no-repeat 2rpx center;
							background-size:49.2rpx 28rpx;
							margin-left: 12rpx;
						}
						span:nth-child(3){
							width: 133rpx;
							text-align: center;
							color: #aaaaaa;
							font-size: 21rpx;
							margin-left: 90rpx;
						}
					}
						button::after {
						  border: none;
						      }
						button{
							padding: 0;
							position: absolute;
							top: 100rpx;
							right: 20rpx;
						  background-color: #fff;
						  border: none;
							display: block;
							width: 180rpx;
							height: 104rpx;
							line-height:170rpx;
							text-align: center;
							background: url(../../images/share.png) no-repeat center top;
							background-size:72rpx 72rpx;
							color: #666666;
							font-size: 24rpx;
							z-index: 999;
						}
				}
			}
		}
.bottom-top{
	width: 120rpx;
	height: 120rpx;
	position: fixed;
	bottom: 30rpx;
	right: 30rpx;
	z-index: 9999;
}
.jihuo{
	width: 140rpx;
	height: 103rpx;
	position: fixed;
	bottom: 160rpx;
	right: 30rpx;
	z-index: 9998;
}
	}
</style>
