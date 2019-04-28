<template>
	<div class="userleval">
        <headBar :titleName='titleName' :isShow='true'></headBar>
        <div class="step"></div>
        <div class="bg">
        	<div class="d1">您当前的用户等级</div>
        	<div class="d2">秀才</div>
        	<div class="d3">获得1000积分</div>
        	<div class="d4">
        		<div>
        			<span>点评达人等级</span>
        			<span>LV1</span>
        		</div>
        		<div>
        			<span>社交达人等级</span>
        			<span>LV1</span>
        		</div>
        	</div>

        	
        </div>
		<div class="rule"></div>
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
		  		titleName:'会员等级'
		  	}
		  }
	}
</script>


<style scoped lang="scss">
	.userleval{
		overflow: hidden;
			width: 100%;
			.bg{
				margin-top: 2.75rem;
				width: 100%;
				height: 18.43rem;
				background: url(../../assets/my/userBg.png) no-repeat center center;
				background-size: 100% 100%;
				overflow:hidden;
				.d1{
					width: 100%;
					height: 1.12rem;
					text-align: center;
					line-height: 1.12rem;
					font-size: 0.81rem;
					color: #466478;
					margin-top: 0.87rem;
				}
				.d2{
					width: 100%;
					height: 2.06rem;
					line-height: 2.06rem;
					text-align: center;
					font-size: 1.5rem;
					color: #333333;
					letter-spacing: 0;
					margin-top: 0.31rem;
				}
				.d3{
					width: 5.81rem;
					height: 1.31rem;
					text-align: center;
					margin: 0 auto;
					margin-top: 0.12rem;
					line-height: 1.31rem;
					font-size: 0.75rem;
						color: #4BC1DD;
						letter-spacing: 0;
					background: #FFFFFF;
					border-radius: 10.5px;
				}
				.d4{
					margin: 0 auto;
					margin-top: 0.93rem;
					width: 16.43rem;
					height: 2.81rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					div{
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						span:nth-child(1){
							font-size: 0.81rem;
							color: #466478;
							letter-spacing: 0;
						}
						span:nth-child(2){
							font-size: 1.12rem;
								color: #333333;
								letter-spacing: 0;
						}
					}
				}

			}
				.step{
				width: 91.46%;
				height: 16rem;
				background: url(../../assets/my/fd6652a187b66328ccceb7845118ddc.png) no-repeat center center;
				background-size: 100% 100%;
				position: absolute;
				top: 12.98rem;
				left: 4.27%;
			}
			.rule{
				width: 100%;
				height: 37.62rem;
				margin-top: 8.12rem;
				background: url(../../assets/my/userWords.png) no-repeat center center;
				background-size: 100% 100%;
			}
	}
</style>