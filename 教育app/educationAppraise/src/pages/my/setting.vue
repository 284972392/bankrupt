<template>
	<div class="setting">
        <headBar :titleName='titleName' :isShow='true'></headBar>
		<div class="div1">
			<img src="../../assets/my/weichat.png"/>
			<span>微信绑定</span>
			<span>已绑定</span>
		</div>
		<div class="div2">
			<img src="../../assets/my/phone.png"/>
			<span>手机绑定</span>
			<span>已绑定</span>
		</div>
		<!--<div class="logOut">退出登录</div>-->
		<mu-button class="logOut" color="#F6F6F6">退出登录</mu-button>
	</div>
</template>

<script>
import headBar from '@/components/head'
		export default {
		    components:{
			  headBar
		  },
		  data(){
		  	return{
		  		titleName:'设置中心'
		  	}
		  }
	}
</script>

<style lang="scss" scoped>
.setting{
	width: 100%;
	height: 100%;
	background: #ffffff;
	overflow: hidden;
	.div1{
		margin-top: 2.75rem;
	}
	.div1{
		img{
			width: 1.25rem;
			height: 1rem;
		}
				span:nth-child(2){
			font-size: 0.87rem;
			margin-left: 1.06rem;
			color: #333333;
			letter-spacing: 0;
		}
	}
		.div2{
		img{
			width: 0.75rem;
			height: 1.15rem;
		}
				span:nth-child(2){
			font-size: 0.87rem;
			margin-left: 1.46rem;
			color: #333333;
			letter-spacing: 0;
		}
	}
	.div1,.div2{
		width: 100%;
		height: 3.43rem;
		display: flex;
		align-items: center;
		padding: 0 1rem;
		border-bottom: 1px solid #EEEEEE;;
		span:nth-child(3){
			font-size: 0.87rem;
			color: #ABABAB;
			margin-left: 12.12rem;
			letter-spacing: 0;
		}
	}
	.logOut{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3.12rem;
		text-align: center;
		line-height: 3.12rem;
		/*background: #F6F6F6;*/
		font-size: 1rem;
		color: #4BC1DD;
		letter-spacing: 0;
	}
}
</style>