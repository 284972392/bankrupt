<template>
	<div class="suggestRecord">
		<div class="bogBox" v-if="!isEmpty" v-for="(data,index) in dataList" :key="index">
			<div class="header">
				<span>{{data.createTime}}</span>
				<span>{{data.state}}</span>
			</div>
			<div class="greeBox">
				<p class="suggesetWord">{{data.feedContent}}</p>
				<div class="imgBox" v-if="data.url.length > 0">
					<img v-for="(img,i) in data.url" :key = "i" :src="img" alt="" />
				</div>
			</div>
		</div>
		<div class="empty" v-if="isEmpty">
				<img src="../../../images/empty.png"/>
		</div>
	</div>
</template>

<script>
	export default {
	onLoad(options){  
      wx.setNavigationBarTitle({  
        title:'反馈记录'
      });
  },
  data(){
  	return{
  		dataList:[],
  		isEmpty:false
  	}
  },
  mounted(){
  	let session3rd = wx.getStorageSync('appDt').session3rd
          let url = this.globalUrl.findPersonFeedBack
  		              
                  this.$http.get(url,{
                  			oldSession3rd:session3rd
                  }).then(res =>{
                  	console.log(res)

                  	res.data.data.forEach(function(i,index){
                  		if (i.state==0) {
                  			i.state="待审核"
                  		}else{
                  			i.state="审核完成"
                  		};
                  		if (i.url == null) {
                  			i.url = []
                  		}else{
                  			i.url = i.url.split(",")
                  		}

                  	})
                  	this.dataList = res.data.data
                  	if (this.dataList.length == 0) {
          				this.isEmpty = true
		          	}else{
		          		this.isEmpty = false
		          	}
                  })
  }
	}
</script>

<style scoped lang="scss">
.suggestRecord{
	width: 100%;
	height: 100%;
	overflow: hidden;
		.bogBox{
			width: 100%;
			box-sizing: border-box;
			border-bottom:1px solid #EEEEEE;
			padding: 0 28rpx;
			padding-top: 20rpx;
			padding-bottom: 26rpx;
			.header{
				width: 100%;
				height: 36rpx;
				display: flex;
				 justify-content: space-between;
				 align-items: center;
				 span{
				 	font-size: 26rpx;
color: #333333;
				 }
			}
			.greeBox{
				width: 100%;
				background: #F5F5F5;
				border-radius: 4px;
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 11px 9px 15.6px 9px;
				.suggesetWord{
					width: 100%;
					font-size: 28rpx;
color: #666666;
letter-spacing: 0;
				}
				.imgBox{
					width: 100%;
					height: 180.8rpx;
					margin-top: 22rpx;
					img{
						width: 160rpx;
						height: 180.4rpx;
						margin-right: 18rpx;
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
}
</style>