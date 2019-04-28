<template>
	<div class="container">
		<div class="searchBox">
		  <input v-model="keyword" type="text" confirm-type="search" @confirm="confirm($event)" focus=true placeholder="搜索标题、商品关键字或商品链接" id="searchInput" placeholder-style="color:#a6a6a6;font-size:24rpx;"/>
		  <div class="searchBtn" @click="search">搜索</div>
		</div>
		<div class="sortTab" v-if="isTab">
			<!--<list v-if="this.goodsList.length >0" :goodsList = "this.goodsList"></list>-->
			<!--<mp-navbar :tabs="tabs" activeIndex=0 @tabClick="tabClick"></mp-navbar>-->	
	 		   <div style="position: relative;width: 100%;height: 66rpx;">
	 		   	 <div class="weui-navbar">
		          <block v-for="(item,index) in tabs" :key="index">
		            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
		              <div class="weui-navbar__title">{{item}}</div>
		            </div>
		          </block>
		          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
		       </div>
	 		   </div>
	 		  

			<div class="goodsList" v-if="!isEmpty">
						<div class="goodBox" @click="toDetail(data)" v-for="(data,index) in goodsList" :key="key">
						<div class="logo">
								<img :src="data.goodsUrl"/>
						</div>
						<div class="content">
							<div class="title">{{data.goodsName}}</div>
							<div class="center">
								<span>券后价￥{{data.goodsPrice}}</span>
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
			<div class="empty" v-if="isEmpty">
				<img src="../../images/empty.png" alt="" />
			</div>
		</div>
		<div class="searchHistory" v-if="isHistory">
			<div class="title">
				<span>历史搜索</span>
				<span @click="delHistory"></span>
			</div>
			<div class="historyBox" >
				<div v-for="(data,index) in historyList" :key="key" @click="hisSearch(data)">{{data}}</div>
			</div>
		</div>
<img src="../../images/toTop.png" v-if="toTopBox" class="bottom-top" @click="toTop"/>
		
	</div>
</template>

<script>
	import mpNavbar from 'mpvue-weui/src/navbar';

		export default {
		  components: {
		    mpNavbar
		  },
		  data(){
		  	return{
		  		zoroNum:1,
		  		oneNum:1,
		  		twoNum:1,
     			 activeIndex: 0,
		  		keyword:"",
		  		isEmpty:false,
     		    toTopBox:false,
		  		page:1,
     			 pageSize:20,
     			 sortType:0,
		  		isHistory:true,
		  		isTab:false,
		  		tabs: ["综合", "佣金比例", "销量","价格"],
		  		historyList:[],
		  		goodsList:[]		
		  	}
		  },
    onShareAppMessage:(res)=> {
		 let openId = wx.getStorageSync('appDt').openId
  	
  	if(res.from === 'button'){
		  	let arr = res.target.id.split(';')
		  let title = '【悠享好货】优惠券'+arr[2]+'元，券后'+Number(arr[1]-arr[2]).toFixed(2)+'元'
  					let sharePath = "pages/detail/main?openId=" + openId+'&id='+arr[0];
				wx.reportAnalytics('share_path', {
							sharepath: '搜索页商品',
						});
				    return {
				      title: title,
				      path: sharePath
				    }
  	}else{
				let sharePath = "pages/index/main?openId=" + openId;
				    return {
				      title: '大家都在用，购物领券还返现',
				      path: sharePath
				    }
  	}
		 

  },
		  onLoad(){
		  	//初始化页面。 不做缓存， 让页面数据跑一次
		  	Object.assign(this.$data, this.$options.data())
		  },
		  mounted(){
//读取缓存  用同步的方式
				try {
				  var value = wx.getStorageSync('historyList')
				  if (value) {
				  	this.historyList = value
				  }
				} catch (e) {
				  this.historyList = []
				}
				this.loadList(1)
		  },
		  	//监听页面滚动高度
 		onPageScroll(e){
  	 	if(e.scrollTop > 1000){
					this.toTopBox = true
  	 	}else{
					this.toTopBox = false
  	 	}
  	 },
		  methods:{
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
		  	  	loadList(page){
  		          let session3rd = wx.getStorageSync('appDt').session3rd
              session3rd = {
              	"oldSession3rd" :session3rd
              }
              session3rd = JSON.stringify(session3rd)
              let url = this.globalUrl.pddDdkGoodsSearch
                  this.$http.post(url,{
                  			customParameters:session3rd,
                  			page:page,
                  			pageSize:this.pageSize,
                  			keyword:this.keyword,
                  			sortType:this.sortType
                  }).then(res =>{
                  	console.log(res)
                  	this.total = res.data.data.total
                  	this.goodsList =this.goodsList.concat(res.data.data.goodsListVos) 
                  	if (this.goodsList.length == 0) {
		          		this.isEmpty = true
		          	}else{
		          		this.isEmpty = false
		          	}
                  	this.goodsList.forEach(function(i,index){
                  		 i.buyMoney = (i.goodsPrice-i.couponDiscount).toFixed(2)
                  	})
                  })
  	},
		  	confirm(e){//键盘点击确认触发， 请求接口。渲染列表
		  		this.keyword = e.target.value;
		  		this.isTab = true;
		  		this.isHistory = false;
		  		this.setHistory();
				this.goodsList = [];
				this.loadList(1)
		  	},
	  	  	toDetail(data){
	        wx.navigateTo({url:'../detail/main?id='+data.goodsId+'&&goodsUrl='+data.goodsUrl})
		  	},
		  	share(){
		  		console.log("分享")
		  	},
		  	delHistory(){
		  		wx.removeStorage({
				  key: 'historyList'
				})
		  		this.historyList = []
		  	},
		  	search(){
		  		this.isTab = true;
		  		this.isHistory = false;
		  		this.setHistory();
		  		let page = 1;
				this.goodsList = [];
		  		this.loadList(page)
		  		//按了搜索按钮做缓存
		  	},
		  	tabClick(data){//能获取到东西  你懂得 ，就可以双击换排序方式

     		 this.activeIndex = data.currentTarget.id;
		  		console.log(this.activeIndex)
		  		if ( this.activeIndex == 0) {
		  			this.sortType = 0
		  		};
		  		if ( this.activeIndex == 1) { // 后面俩一起
		  			this.zoroNum ++; 
		  			 if(this.zoroNum%2 == 1){
		  				this.sortType = 1
		  			 }else{
		  				this.sortType = 2
		  			 }
		  		};
		  		if ( this.activeIndex == 2) {
		  			this.oneNum ++;
		  			console.log(this.oneNum)
		  			 if(this.oneNum%2 == 1){
		  				this.sortType = 5
		  			 }else{
		  				this.sortType = 6
		  			 }
		  			
		  		};
		  		if ( this.activeIndex == 3) {
	  				this.twoNum ++; 
		  			 if(this.twoNum%2 == 1){
		  				this.sortType = 3
		  			 }else{
		  				this.sortType = 4
		  			 }
		  			
		  		};
		  		this.goodsList = []
		  		this.loadList(1)
		  		
		  		
		  	},
		  	hisSearch(data){
		  		console.log(data);
		  		//请求搜索接口， 然后把搜索历史组件隐藏 展示列表组件
		  		this.isHistory = false;
		  		this.isTab = true;
		  		this.keyword = data
		  		this.goodsList = []
		  		this.loadList(1)
		  		
		  	},
		  	    _getRegisterInfo(){

		      this.page++;
		      if (this.total/20 > this.page) {
				 	   let page =  this.page;
				      console.log(page)
					this.loadList(page)
		      }else{
		      	 wx.showToast({
						  title: '拉到底啦',
						  icon: 'none',
						  duration: 2000
						})
		      }
    },
			setHistory(){
	  			if(this.keyword==""||this.keyword==null||this.keyword==undefined){
		  		}else{
					if (this.historyList.length == 0) {//如果没有 则直接添加
		  					this.historyList.push(this.keyword)
						  			wx.setStorage({
					  				key:'historyList',
					  				data:this.historyList
					  			})
					}else{
		  				
			  			if(this.historyList.indexOf(this.keyword) == -1){//判断是否搜索的元素已经搜索过了
			  					this.historyList.push(this.keyword);
			  				
			  				if (this.historyList.length <8 ) {

			  				}else{//判断数组是否已经有8个  有的话 把之前第一个删掉
			  					this.historyList.splice(0,1)
			  				}
						  			wx.setStorage({
					  				key:'historyList',
					  				data:this.historyList
					  			})
			  			};

					}
		  		};
			}
		  },
		      computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
      if (this.activeIndex == 3) {
        return 'weui-navbar__slider_3'
      }
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
		}
</script>
<style scoped>
.weui-navbar__slider_0 {
  left: 0rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 29rpx;
  transform: translateX(160rpx);
}
.weui-navbar__slider_2 {
  left:29rpx;
  transform: translateX(350rpx);
}
.weui-navbar__slider_3 {
  left:29rpx;
  transform: translateX(540rpx);
}
.weui-navbar{
	height: 97rpx;
	
	}
.weui-navbar__slider{width:25%;background: #e65454;}
.weui-navbar__item{color:#666666;font-size: 27rpx;font-weight: bold;}
.weui-navbar__item.weui-bar__item_on {color: #e65454 !important;font-size: 27rpx;font-weight: bold;}
</style>
<style scoped lang="scss">
 .container{
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
		/*margin-top: 27rpx;*/
		display: block;
		width: 560rpx;
		height: 71rpx;
		border-radius: 50px;
		box-shadow: 1px 1px 5px #eeeeee;
	}
	.searchBtn{
		width: 100rpx;
		height: 60rpx;
		color: #ffffff;
		font-size: 25rpx;
		border-radius: 5px;
		text-align: center;
		line-height: 60rpx;
		margin-left: 26rpx;
		background: -moz-linear-gradient(top, #fe8483 0%, #e75555 100%) ;
	    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fe8483), color-stop(100%,#e75555))  ;
	    background: -webkit-linear-gradient(top, #fe8483 0%,#e75555 100%) ;
	    background: -o-linear-gradient(top, #fe8483 0%,#e75555 100%) ;
	    background: -ms-linear-gradient(top, #fe8483 0%,#e75555 100%) ;

	}
}
.sortTab{
	width: 100%;
	color: #666666!important;
	.weui-tab.data-v-78a8b720{
		.weui-navbar-content__slider.data-v-78a8b720 {
		.weui-navbar-slider.data-v-78a8b720 {
			.weui-navbar-slider-on.data-v-78a8b720{
		 	background: red!important;
		 }
			}
	}
	}
	.empty{
	margin-top: 300rpx;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	img{
		width: 600rpx;
		height: 400rpx;
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
						}
				}
			}
		}
}
.searchHistory{
	width: 100%;
	.title{
		width: 100%;
		height:112rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 33rpx;
		justify-content: space-between;
		align-items: center;
		font-size: 27rpx;
		color: #333333;
		font-weight: 600;
		span:nth-child(2){
			display: block;
			width: 28rpx;
			height: 38rpx;
			background: url(../../images/shanc@3x.png) no-repeat center center;
			background-size: 100% 100%;
		}
	}
	.historyBox{
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 0 33rpx;
		width: 100%;
		display: flex;
		flex-flow: wrap;
		/*justify-content: space-between;*/
		div{
			box-sizing: border-box;
			padding: 0 10rpx;
			height: 55rpx;
			min-width:118rpx;
			background: #f0f0f0;
			color: #696969;
			font-size: 26rpx;
			text-align: center;
			line-height: 55rpx;
			border-radius: 15px;
			margin-top: 20rpx;
			margin-left: 20rpx;
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
 }

</style>