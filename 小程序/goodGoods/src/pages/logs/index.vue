<template>
  <div class="team">
		<div class="bgBox">
			<span>您当前等级</span>
			<span>{{grade}}</span>
			<span>团队人数:{{total}}</span>
		</div>
		<div class="sixHead">
			<div class="xian"></div>
			<div class="title">等级说明</div>
			<div class="headsBox">
				 <div class="line1">
				 		<div class="person1 person" @click="putong">
				 			  <img src="../../images/putong@3x.png"/>
				 			 <div>普通会员</div>
				 			 <div>查看说明</div>
				 		</div>
				 		<div class="rightLine"></div>
				 		<div class="person2 person" @click="qingtong">
				 			 <img src="../../images/qingtong@3x.png"/>
				 			 <div>青铜分销员</div>
				 			 <div>查看说明</div>
				 			 
				 		</div>
				 		<div class="rightLine"></div>
				 		<div class="person3 person" @click="baiyin">
				 			 <img src="../../images/baiyin@3x.png"/>
				 			 <div>白银分销员</div>
				 			 <div>查看说明</div>
				 			 
				 		</div>
				 </div>
				 <div class="line2"></div>
				  <div class="line3">
				 		<div class="person1 person" @click="jinpai">
				 			  <img src="../../images/jinpai@3x.png"/>
				 			 <div>金牌分销员</div>
				 			 <div>查看说明</div>
				 			 
				 		</div>
				 		<div class="leftLine"></div>
				 		<div class="person2 person" @click="zuanshi">
				 			 <img src="../../images/zuanshi@3x.png"/>
				 			 <div>钻石分销员</div>
				 			 <div>查看说明</div>
				 			 
				 		</div>
				 		<div class="leftLine"></div>
				 		<div class="person3 person" @click="huangjin">
				 			 <img src="../../images/huangjin@3x.png"/>
				 			 <div>黄金分销员</div>
				 			 <div>查看说明</div>
				 			 
				 		</div>
				 </div>
			</div>
		</div>
		<div class="ruleBox">
				<div class="xian"></div>
				<div class="title">规则说明</div>
				<div class="threeHead">
					<div class="user">
							<img src="../../images/yonghu1@3x.png"/>
							<div>用户<span>(一级)</span></div>
					</div>
					<div class="greeLine"></div>
					<div class="user">
							<img src="../../images/yonghu1@3x.png"/>
							<div>用户B<span>(二级)</span></div>
					</div>
					<div class="greeLine"></div>
					<div class="user">
							<img src="../../images/yonghu1@3x.png"/>
							<div>用户C<span>(三级)</span></div>
					</div>
				</div>
				<div class="buyGift">
					<div class="title">购买奖励</div>
					<p>操作：用户购买商品</p>
					<p>购买奖励：用户完成订单，用户获得购买奖励</p>
				</div>
				<div class="shareGift">
					<div class="title">分享奖励</div>
					<p>操作：用户A分享商品给用户B</p>
						<div  style="display: flex;margin-top: 20rpx;">
							<p style="width: 180rpx;">分享奖励:</p>
							<p>用户B通过用户A分享的商品链接成交后 ,用户A可以获得分享奖励</p>
						</div>
						<!--<p style="margin-top: 20rpx;">1. A等级小于或者等于B:  B获得A购买奖励的5%</p>
						<div style="display: flex;margin-top: 20rpx;">
							<p style="width: 171rpx;">2. A等级>B：</p>
							<p>B获得(A等级比例-B等级比例)*平台</p>
						</div>-->
				</div>
				<div class="tiChGift">
					<div class="title">提成奖励</div>
					<p>操作：用户A是用户B上级，用户B是用户C上级</p>
					<div  style="display: flex;margin-top: 20rpx;">
						<p style="width: 176rpx;">提成奖励:</p>
						<p>C完成订单，B获得提成，B完成订单, A获得提成，仅奖励上一级</p>
					</div>
<!--					<p style="margin-top: 10rpx;">提成奖励：同分享奖励</p>-->
				</div>
				<div class="teamGift">
					<div class="title">团队分成</div>
					<p>操作：用户A是用户B上级，用户B是用户C上级</p>
					<p style="margin-top: 13rpx;">团队提成：用户C完成订单，用户A拿到团队提成</p>
					<p style="margin-top: 13rpx;">团队分成：为下级分享奖励的50%</p>
				</div>
		</div>
		<div class="tankuang" v-if="isShow" @click="cha">
				<div class="bigBox">
					<div class="cha" @click="cha"></div>
					<div class="headPic">
						<img :src="headPic"/>
					</div>
					<p class="title">{{grade}}说明</p>
					<p>{{words}}</p>
					<p>购买奖励：商品收益<span style="color: #002424;">{{pesent}}</span></p>
					<p>分享奖励：(1)A等级小于或者等于B：B获得C购买奖励的5%</p>
					<p>(2)A等级>b：B获得(A等级比例-B等级比例)*平台总佣金</p>
					<p>购买提成：同分享奖励</p>
					<p>团队分成：分享奖励*50%</p>
				</div>
		</div>
		<div class="BB">最终解释权归搜奖网络科技有限公司所有</div>
  </div>
</template>

<script>


export default {
  components: {
  },

  data () {
    return {
			isShow:false,
			headPic:'../../images/putong@3x.png',
			grade:'',
			words:'',
			pesent:'',
			grade:'',
			total:''
    }
  },
  methods:{
  	cha(){
  		this.isShow = false
  	},
  	putong(){
			this.headPic = '../../images/putong@3x.png',
			this.grade='普通会员',
			this.words='购买佣金、分享佣金、邀请奖励，建议您成为分销员得到更多奖励权益。',
			this.pesent='55%',
		 this.isShow = true;
  		 
  	},
  	qingtong(){
			this.headPic = '../../images/qingtong@3x.png',
			this.grade='青铜分销员',
			this.words='会员通过购买商品，完成订单即可成为青铜分销员',
			this.pesent='58%',
		 this.isShow = true;
  		 
  	},
  	baiyin(){
			this.headPic = '../../images/baiyin@3x.png',
			this.grade='白银分销员',
			this.words='青铜分销员通过分享商品或推广链接，拉取5个新用户，即可成为白银分销员',
			this.pesent='61%',
		 this.isShow = true;
  		 
  	},
  	jinpai(){
			this.headPic = '../../images/jinpai@3x.png',
			this.grade='金牌分销员',
			this.words='钻石分销员通过分享商品或推广链接，拉取50个新用户，并产生购买即可成为金牌分销员',
			this.pesent='70%',
		 this.isShow = true;
  		 
  	},
  	zuanshi(){
			this.headPic = '../../images/zuanshi@3x.png',
			this.grade='钻石分销员',
			this.words='黄金分销员通过分享商品或推广链接，拉取30个新用户，并产生购买即可成为钻石分销员',
			this.pesent='67%',
		 this.isShow = true;
  		 
  	},
  	huangjin(){
			this.headPic = '../../images/huangjin@3x.png',
			this.grade='黄金分销员',
			this.words='白银分销员通过分享商品或推广链接，拉取15个新用户，并产生购买即可成为黄金分销员',
			this.pesent='64%',
		 this.isShow = true;
  		 
  	
  		
  	}
  },
	mounted(){
		
   this.$http.get(this.globalUrl.getUserInfo,{}).then(res =>{
       this.grade = res.data.data.levelName
     })
   this.$http.get(this.globalUrl.wechatUserFindCommissionTotal,{}).then((res)=>{
               this.total = res.data.data
            })
	},
	onShow(){
		
   this.$http.get(this.globalUrl.getUserInfo,{}).then(res =>{
       this.grade = res.data.data.levelName
    });
     this.$http.get(this.globalUrl.wechatUserFindCommissionTotal,{}).then((res)=>{
               this.total = res.data.data
            })
  
	}
  
}
</script>

<style scoped lang="scss">
.team{
	width: 100%;
	height: 2372rpx;
	background: #f4f4f4;
	
	position: relative;
	.bgBox{
		width: 100%;
		height: 434rpx;
		background-image: linear-gradient(-180deg, #E65454 3%, #FF8585 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing:border-box;
		color: #FFFFFF;
		padding-top:22rpx;
		span:nth-child(1){
			font-size: 24rpx;
		}
		span:nth-child(2){
			margin-top: 12rpx;
			display: block;
			width: 200rpx;
			height:54rpx ;	
			text-align: center;
			line-height: 54rpx;
			background: #DD4848;
			border-radius: 13.5px;
				font-size: 34rpx;
		}
		span:nth-child(3){
			font-size: 22rpx;
			margin-top: 16rpx;
		}
	}
	.sixHead{
		width: 702rpx;
		height:648rpx;
		background: #FFFFFF;	
		border-radius: 4px;
		position: absolute;
		top: 200rpx;
		left: 24rpx;
		.xian{
			width: 392rpx;
			height: 1px;
			border-top: 1px solid #DEDEDE;
			margin:  0 auto;
			margin-top: 46rpx;
		}
		.title{
			width: 150rpx;
			height: 42rpx;
			text-align: center;
			line-height: 42rpx;
			background: #ffffff;
			font-family: PingFangSC-Medium;
			font-size: 30rpx;
			color: #333333;
			letter-spacing: 0;
			position: absolute;
			top: 23rpx;
			left: 282rpx;
		}
		.headsBox{
			height: 426rpx;
			width: 624rpx;
			margin: 0 auto;
			margin-top: 46rpx;
			.line1,.line3{
				width: 100%;
				height: 232rpx;
				display: flex;
				.person{
					width: 132rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
				  img{
						width: 138rpx;
						height: 132rpx;
					}
					div{
						font-family: PingFangSC-Medium;
						font-size: 26rpx;
						color: #333333;
						letter-spacing: 0;
					}
					div:nth-child(3){
						font-size: 24rpx;
						color: #AAAAAA;
						text-decoration: underline;
					}
				}
				.rightLine{
					width: 84rpx;
					height: 20rpx;
					background: url(../../images/zhixian@3x.png) no-repeat center center;
					background-size: 100%;
					margin: 56rpx 16rpx;
				}
				.leftLine{
					width: 84rpx;
					height: 20rpx;
					background: url(../../images/zhixian@3x.png) no-repeat center center;
					background-size: 100%;
					margin: 56rpx 16rpx;
					transform:rotate(180deg);
				-ms-transform:rotate(180deg); /* Internet Explorer */
				-moz-transform:rotate(180deg); /* Firefox */
				-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
				-o-transform:rotate(180deg); /* Opera */
					
				}
			}
			.line2{
				width:	58rpx;;
				height:	58rpx;
				background: url(../../images/zhixian@3x.png) no-repeat center center;
				background-size:40rpx 10rpx;
				transform:rotate(90deg);
				-ms-transform:rotate(90deg); /* Internet Explorer */
				-moz-transform:rotate(90deg); /* Firefox */
				-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
				-o-transform:rotate(90deg); /* Opera */
				margin-left: 521rpx;
			}
		}
	}
	.ruleBox{
		 position: relative;
			width: 702rpx;
		height:1418rpx;
		background: #FFFFFF;	
		border-radius: 4px;
		margin: 0 auto;
		margin-top: 430rpx;
		overflow: hidden;
		.xian{
			width: 392rpx;
			height: 1px;
			border-top: 1px solid #DEDEDE;
			margin:  0 auto;
			margin-top: 46rpx;
		}
		.title{
			width: 150rpx;
			height: 42rpx;
			text-align: center;
			line-height: 42rpx;
			background: #ffffff;
			font-family: PingFangSC-Medium;
			font-size: 30rpx;
			color: #333333;
			letter-spacing: 0;
			position: absolute;
			top: 23rpx;
			left: 282rpx;
		}
		.threeHead{
			width:564rpx;
			height: 154rpx;
			margin: 0 auto;
			margin-top:44rpx;
			display: flex;
			justify-content: space-between;
			.user{
				width: 160rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				img{
					width: 104rpx;
					height: 104rpx;
				}
				div{
					font-family: PingFangSC-Medium;
				font-size: 26rpx;
				color: #666666;
				letter-spacing: 0;
				span{
					color: #AAAAAA;
				}
				}
			}
			.greeLine{
				width: 76rpx;
				height: 15rpx;
				background: url(../../images/xianhui@3x.png) no-repeat center center;
				background-size: 100% 100%;
				margin-top: 50rpx;
			}
		}
		.buyGift,.shareGift,.tiChGift,.teamGift{
			width: 630rpx;
			position: relative;
			border-radius: 4px;
			margin: 0 auto;
			margin-top: 74rpx;
			box-sizing: border-box;
			padding-top: 54rpx;
			padding-left: 24rpx;
			padding-right: 24rpx;
			font-family: PingFangSC-Medium;
			font-size: 26rpx;
			color: #333333;
			letter-spacing: 0;
			.title{
				width: 158rpx;
				height: 60rpx;
				border-radius: 4px;	
				position: absolute;
				top: -30rpx;
				left:236rpx;
				text-align: center;
				line-height: 60rpx;
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0;
			}
		}
		.buyGift{
			height: 174rpx; 
			background:#FBF5F1;
			.title{
				background: #F39B60;
			}
			p{
				font-family: PingFangSC-Medium;
				font-size: 26rpx;
				color: #333333;
				letter-spacing: 0;
			}
		}
		.shareGift{

			height: 210rpx; 
			background: #F6F4FD;
			.title{
				background: #9782E2;
			}
		}
		.tiChGift{
			height: 210rpx;
			background: #FEF5FA;
			.title{
				background: #F17272;
			}
		}
		.teamGift{
			height: 226rpx;
		background: #F5F8FE;
			.title{
				background: #7198E6;
			}
		}
	}
	.tankuang{

		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.6);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 50;
		.bigBox{
			padding: 0 26rpx;
			box-sizing: border-box;
			padding-top: 88rpx;
			width: 630rpx;
			height: 562rpx;
			background: #FFFFFF;
			margin: 0 auto;
			margin-top: 190rpx;
			border-radius: 4px;
			position: relative;
			font-family: PingFangSC-Medium;
			font-size: 26rpx;
			color: #333333;
			letter-spacing: 0;
			.cha{
				width: 38.6rpx;
				height: 38.6rpx;
			  position:absolute;
			  top: 9.3px;
			  left: 572.8rpx;
				background:url(../../images/cha@3x.png) no-repeat center center;
				background-size: 19.3px 19.3px;
			}
			.headPic{
				width: 140rpx;
			  height: 132rpx;
			  position:absolute;
			  top:-66rpx;
			  left:252rpx;
			  
			  img{
			  	width: 100%;
			  	height: 100%;
			  }
			}
			.title{
				width: 100%;
				height: 48rpx;
				text-align: center;
				line-height: 48rpx;
				font-size: 34rpx;
				margin: 0 auto;
			}
			p{
				margin-top: 8rpx;
			}
		}
	}
	.BB{
		width: 100%;
		height: 92rpx;
		text-align: center;
		line-height: 92rpx;
		font-size: 22rpx;
			color: #AAAAAA;
			background:#f4f4f4;
	}
}


</style>
