<template>
	<div class="my">
		<div class="head">
			<div class="headPic">
				<img src="../../assets/my/head.png"/>
			</div>
			<div class="nickName">篱笆外的小思绪</div>
		</div>
		<div class="allMine">
			<div @click="toMyComment">
				<img src="../../assets/my/dianp@3x.png"/>
				<span>我的点评</span>
			</div>
			<div @click="tomyRelease">
				<img src="../../assets/my/fabu@3x.png"/>
				<span>我的发布</span>
			</div>
			<div @click="toMyCollection">
				<img src="../../assets/my/soucang@3x.png"/>
				<span>我的收藏</span>
			</div>
			<div @click="toMyTikit">
				<img src="../../assets/my/quan@3x.png"/>
				<span>我的优惠券</span>
			</div>
		</div>
		<div class="toChild">
			<div @click="toUserLeval">
				<img src="../../assets/my/dengji@3x.png"/>
				<span>会员等级</span>
				<img src="../../assets/my/youjiantou@3x.png"/>
			</div>
			<div @click="TocontactUs">
				<img src="../../assets/my/kef@3x.png"/>
				<span>联系我们</span>
				<img src="../../assets/my/youjiantou@3x.png"/>
			</div>
			<div @click="toTroubleshoot">
				<img src="../../assets/my/jieda@3x.png"/>
				<span>疑难解答</span>
				<img src="../../assets/my/youjiantou@3x.png"/>
			</div>
			<div @click="tosetting">
				<img src="../../assets/my/shezhi@3x.png"/>
				<span>设置中心</span>
				<img src="../../assets/my/youjiantou@3x.png"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      return {

      }
    },
	methods:{
		toUserLeval(){
				this.$router.push('/userLaval')
		},
		TocontactUs(){
				this.$router.push('/contactUs')
		},
		toTroubleshoot(){
				this.$router.push('/Troubleshoot')
		},
		tosetting(){
//				this.$router.push('/setting')
		},
		toMyComment(){
				this.$router.push('/myComment')
			 
		},
		toMyCollection(){
				this.$router.push('/myCollection')
		},
		toMyTikit(){
				this.$router.push('/myTikit')
			
		},
		tomyRelease(){
				this.$router.push('/myRelease')
		}
	}
 
  }
</script>

<style scoped lang="scss">
.my{
width: 100%;
height: 100%;
	.head{
		width: 100%;
		height:11.5rem;
		background: #E8EEF9;
		overflow: hidden;
		color: red;
		.headPic{
			width: 4rem;
			height: 4rem;
			margin: 0 auto;
			margin-top:3.31rem;
			border-radius: 50%;
				border: .125rem solid #ffffff;
			
			img{
				width: 100%;
				height: 100%;
			}
		}
		.nickName{
			width: 9.37rem;
			height: 1.37rem;
			text-align: center;
			line-height: 1.37rem;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #333333;
			letter-spacing: 0;
			margin: 0 auto;
			margin-top:0.68rem;
			
		}
	}
	.allMine{
		width: 100%;
		height: 6.25rem;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;
		align-items: center;
		div{
			width: 4.87rem;
			height: 3.45rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			img{
				width: 1.75rem;
				height: 1.56rem;
			}
			span{
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #333333;
				letter-spacing: 0;
			}
		}
	}
	.toChild{
		width: 100%;
		height: 12.5rem;
		background: #ffffff;
		margin-top: 0.5rem;
		div{
			width: 100%;
			height:3.12rem;
			padding: 0 1rem;
			display: flex;
			align-items: center;
			border-bottom:1px solid #EEEEEE ;
		}
		div{
			img:nth-child(3){
				width: 0.5rem;
				height: 0.87rem;
				margin-left: 15.37rem;
			}
			span{
				width: 3.75rem;
				font-family: PingFangSC-Medium;
				font-size:0.81rem;
				color: #333333;
				letter-spacing: 0;
				margin-left: 0.75rem;
			}
		}
		div:nth-child(1){
			img:nth-child(1){
				width: 1.31rem;
				height: 1.18rem;
			}
		}
		div:nth-child(2){
			img:nth-child(1){
				width: 1.37rem;
				height: 1.21rem;
			}
		}
		div:nth-child(3){
			img:nth-child(1){
				width: 1.25rem;
				height: 1.25rem;
			}
		}
		div:nth-child(4){
			img:nth-child(1){
				width: 1.25rem;
				height: 1.2rem;
			}
		}
	}
}
</style>