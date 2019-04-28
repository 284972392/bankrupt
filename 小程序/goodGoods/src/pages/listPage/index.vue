<template>
	<div class="listPage">
			<div class="pageTab" v-if="showTab">
				<!--<mp-navbar :tabs="tabs" activeIndex=0 @tabClick="wichClick"></mp-navbar>-->	
	 		   <div class="weui-navbar">
		          <block v-for="(item,index) in tabs" :key="index">
		            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="wichClick">
		              <div class="weui-navbar__title">{{item}}</div>
		            </div>
		          </block>
		          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
		        </div>
			</div>
			<div class="goodsList"  v-if="!isEmpty">
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
							<button @click.stop="" :id="data.goodsId+';'+data.goodsPrice+';'+data.couponDiscount" open-type="share">分享赚<span style="color: #e65455;">{{data.buyEarn}}</span></button >
							
						</div>
					</div>
			</div>
			<div class="empty" v-if="isEmpty">
				<img src="../../images/empty.png"/>
				<span>暂无数据</span>
			</div>
<img src="../../images/toTop.png" v-if="toTopBox" class="bottom-top" @click="toTop"/>
			
	</div>
</template>

<script>
	import mpNavbar from 'mpvue-weui/src/navbar';

	export default{
	  components: {
		    mpNavbar
		  },
		data(){
			return{
				id:'',
				name:'',
				isEmpty:false,
		  		zoroNum:1,
		  		type:'',
		  		oneNum:1,
		  		channelType:null,
		  		catId:'',
		  		twoNum:1,
		  		showTab:true,
     			 activeIndex: 0,
		  		keyword:"",
      toTopBox:false,
		  		page:1,
		  		offset:0,
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
							sharepath: '列表页商品',
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
                  			catId:this.catId,
                  			sortType:this.sortType
                  }).then(res =>{
         
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
  	loadCollection(page){
  		
          let session3rd = wx.getStorageSync('appDt').session3rd
          let url2 = this.globalUrl.getCollectionByPage
		 this.$http.get(url2,{
		 	oldSession3rd:session3rd,
		 	page:page,
		 	size:this.pageSize
		 }).then(res=>{
		 	console.log(res)
		 	this.total = res.data.data.total;
          	this.goodsList =this.goodsList.concat(res.data.data.records) 
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
  	loadPddRecommedList(offset){//Pdd专题获取列表的方法
  		
	          let session3rd = wx.getStorageSync('appDt').session3rd
              session3rd = {
              	"oldSession3rd" :session3rd
              }
              session3rd = JSON.stringify(session3rd)
              let url = this.globalUrl.PddDdkGoodsRecommendGet
                  this.$http.post(url,{
                  			customParameters:session3rd,
                  			offset:offset,
                  			limit:20,
                  			channelType:this.channelType,
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
	share(){

	},
  			toDetail(data){
	        wx.navigateTo({url:'../detail/main?id='+data.goodsId+'&&goodsUrl='+data.goodsUrl})
		  	},
		  	wichClick(data){//能获取到东西  你懂得 ，就可以双击换排序方式

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
		  	    _getRegisterInfo(){
		 
		      this.page++;
		      this.offset = (this.page-1) *20
		      console.log(this.offset)
		      if (this.total/20 > this.page - 1) {
				 	   let page =  this.page;
				      console.log(page)
				      if (this.type == "collection") {//收藏列表的 下拉
					this.loadCollection(page)
				      }else if(this.type == 0){//pdd专题列表的下拉
				      	this.loadPddRecommedList(this.offset)
				      }else if(this.type == 1){
				      	
				      }else if(this.id){
				      	
				      }else{//搜索列表的下拉
							this.loadList(page)
				      }


		      }else{
		      	 wx.showToast({
						  title: '拉到底啦',
						  icon: 'none',
						  duration: 2000
						})
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
			mounted(){
				console.log(this.type)
		if (this.showTab == true) { //搜索的列表, 分类列表进来
				this.loadList(1)
			
		}else if(this.type == "collection"){//收藏列表
			this.loadCollection(1)
		}else if(this.type == 0){
			this.loadPddRecommedList(0)
		}else{//请求banner进来的数据
			
	          let session3rd = wx.getStorageSync('appDt').session3rd
              let url = this.globalUrl.PddDdkThemeGoodsSearch
                  this.$http.post(url,{
                  			'customMap':{'oldSession3rd':session3rd},
                  			'themeId':this.id
                  }).then(res =>{
                  	console.log(res)
//                	this.total = res.data.data.total

                  	this.goodsList =res.data.data.goodsListVos
                  	if (this.goodsList.length == 0) {
          		this.isEmpty = true
          	}else{
          		this.isEmpty = false
          	}
                  	this.goodsList.forEach(function(i,index){
                  		 i.buyMoney = (i.goodsPrice-i.couponDiscount).toFixed(2)
                  	})
                  })
			
			
		}

				
//				


  	
			},
	onLoad(options){ 
	Object.assign(this.$data, this.$options.data())
	this.type = options.type
	this.channelType = options.channelType
	
		if (options.id) {
			this.id =options.id 
			this.showTab = false;
		};
		if(options.themeId){
			this.id = options.themeId 
		}
		//pdd专题进来 拿到pdd专题并转换成字段所需
		this.keyword = options.name
		this.catId = options.catId
		
		if (options.type) {
			this.showTab = false;
		}
		
		
		if (this.keyword == "今日推荐") {
			this.keyword = "推荐"
		}
	    wx.setNavigationBarTitle({  
	      title:options.name 
	    });
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
.weui-navbar{height: 97rpx;}
.weui-navbar__slider{width:25%;background: #e65454;}
.weui-navbar__item{color:#666666 ;font-size: 27rpx;font-weight: bold;}
.weui-navbar__item.weui-bar__item_on {color: #e65454 !important;font-size: 27rpx;font-weight: bold;}
</style>
<style lang="scss" scoped>
.pageTab{
	width: 100%;
	height: 97rpx;
	color:  #666666;
	background: #ffffff;
}
.empty{
	margin-top: 180rpx;
	width: 100%;
	height: 260rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	img{
		width: 200rpx;
		height: 180rpx;
	}
	span{
		font-size: 30rpx;
color: #AAAAAA;
	}
}
.goodsList{
			width: 100%;
			background: #ffffff;
			/*margin-top: 17rpx;*/
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
					position: relative;
					flex: 1;
					margin-left:14rpx;
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
	.bottom-top{
	width: 120rpx;
	height: 120rpx;
	position: fixed;
	bottom: 30rpx;
	right: 30rpx;
	z-index: 9999;
}
</style>