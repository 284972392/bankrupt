<template>
	<div class="classification">
		<scroll-view class="menu-wrapper" scroll-y="true">
  <ul>
    <li class="menu-item"
        v-for="(item,index) in goods"
        :class="index===currentIndex ? 'current' : 'nocurrent'"
        :key="index"
        @tap="selectMenu(index,item)">
           {{item.catName}}
    </li>
  </ul>
</scroll-view>
<scroll-view  scroll-y="true" class="foods-wrapper">
	<div class="bigBox" v-for="(data,index) in twoList" :key="index">
		<div class="title">
			<span>{{data.catName}}</span>
			<span @click="tolistPage(data)">查看全部</span>
		</div>
		<div class="goods">
			<div class="good" @click="toList(data2)" :class="index%3==0?'good2':index%2==0?'good3':''" v-for="(data2,index2) in data.catsVoList" :key="index2">
			   {{data2.catName}}
			
			</div>
		</div>
	</div>
</scroll-view>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataList:[],
				twoList:[],
				goods: [],
		    contentId: '', // 每个food-list的id，scroll-into-view滚动到对应的id
		    currentIndex: 0

			}
		},
		methods:{
			tolistPage(data){
     		   wx.navigateTo({url:'../listPage/main?name='+data.catName+'&catId='+data.catId})				
			},
			toList(data2){
     		   wx.navigateTo({url:'../listPage/main?name='+data2.catName+'&catId='+data2.catId})
			},
			  selectMenu(index,item) {
     console.log(item.catId)
    this.contentId = `con_${index}`
    this.currentIndex = index
     wx.showLoading({
        title: '玩命加载中',
      })
       let url = this.globalUrl.PddGoodsLevel3CatsGet
      this.$http.post(url,{
      			parentCatId:item.catId
      }).then(res =>{
      	console.log(res)
//    	this.goods = res.data
      	this.twoList = res.data
    	 wx.hideLoading();
      })

     
  },

		},
	onLoad(options){  
	    wx.setNavigationBarTitle({  
	      title:'商品分类'  
	    });
                  let url = this.globalUrl.PddGoodsLevel3CatsGet
                  this.$http.post(url,{
                  			parentCatId:0
                  }).then(res =>{
                  	console.log(res)
                  	this.goods = res.data
                  	this.twoList = res.data[0].catsVoList
                  })
  }
	}
</script>

<style scoped lang="scss">
	.classification{
		/*display: flex;*/
		width: 100%;
		height: 100%;
		.menu-wrapper{
			position: absolute;
			left: 0;
			height: 100%;
			width: 188rpx;
			
			ul{
				background: #f6f6f6;
				width: 100%;
				height: 100%;
				li{
					font-weight: bold;
					background: #ffffff;
					color: #666666;
					width: 100%;
					height: 92rpx;
					font-family: PingFangSC-Medium;
					font-size: 28rpx;
					color: #666666;
					letter-spacing: 0;
					text-align: center;
					line-height: 92rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					box-sizing: border-box;
					padding: 0 10px;
				}
				.current{
					background: #ffffff;
					color: #E65454;
				}
			}
		}
		.foods-wrapper{
			/*flex: 1;*/
			position: absolute;
			right: 0;
			width: 562rpx;
			height: 100%;
			padding: 0 44rpx;
			box-sizing: border-box;
			.bigBox{
				width: 100%;
				border-bottom: 1px solid #EEEEEE;
				box-sizing: border-box;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				.title{
					width: 100%;
					height:36rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					span:nth-child(1){
						font-family: PingFangSC-Medium;
						font-size: 26rpx;
						color: #323232;
						font-weight: bold;
						letter-spacing: 0;
					}
					span:nth-child(2){
						display: block;
						width: 120rpx;
						height:32rpx;
						line-height: 32rpx;
						background: url(../../images/jianyou@3x.png) no-repeat 102rpx center;
						background-size: 16rpx 24rpx;
						font-family: PingFangSC-Medium;
						font-size: 22rpx;
						color: #aaaaaa;
						letter-spacing: 0;
					}
				}
				.goods{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					align-items: center;
					margin-top: 30rpx;
					.good{
						width: 145rpx;
						height: 53rpx;
						line-height: 53rpx;
						text-align: center;
						background: #fbf1fc;
						border-radius: 100rpx;
						margin: 15rpx 0 15rpx 0;
						font-family: PingFangSC-Medium;
						font-size: 22rpx;
						color: #a871ab;
						letter-spacing: 0;
						overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					}
					.good2{
						background: #f1f1fd;color: #7271b3;
					}
					.good3{
						background: #fcf2f1;color: #c38588;
					}
				}
			}
		}
		::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
	}
	

</style>