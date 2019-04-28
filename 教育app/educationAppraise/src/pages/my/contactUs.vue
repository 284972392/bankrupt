<template>
	<div class="contactUs">
        <headBar :titleName='titleName' :isShow='true'></headBar>
		<div class="erweima">
			<img src="../../assets/my/erweima.png"/>
		</div>
		<p class="p1">截图保存二维码，微信识别关注</p>
		<p class="p2">教育点评</p>
		<p class="p3">教育点评是一款为家长和孩子解决选择教育课程学习的
			一款软件。提供国内外知名教育机构的学习课程和优惠
			信息，并提供了广大消费者的体验评价，为家长和孩子
			解决如何选择课程的难题。</p>
	</div>
</template>

<script>
import headBar from '@/components/head'
	export default {
	    components:{
			  headBar
		  },
		      data() {
      return {
      titleName:'联系我们',
    
      }
    },
	}
</script>

<style scoped lang="scss">
.contactUs{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #ffffff;
	.erweima{
		width:10rem;
		height: 10rem;
		margin: 0 auto;
		margin-top: 5.28rem;
			img{
				width: 100%;
				height: 100%;
				-webkit-touch-callout:default;
				pointer-events:auto;
			}
	}
	.p1{
		width: 100%;
		height: 1.06rem;
		text-align: center;
		line-height: 1.06rem;
		margin-top: 1.06rem;
		font-size: 0.75rem;
		color: #666666;
		letter-spacing: 0;
	}
	.p2{
		width: 100%;
		height: 1.56rem;
		text-align: center;
		line-height: 1.56rem;
		font-size: 1.12rem;
		color: #333333;
		letter-spacing: 0;
		margin-top: 2.68rem;
	}
	.p3{
		text-align: left;
		line-height: 1.25rem;
		width: 100%;
		height: 5.31rem;
		padding: 0 1.25rem;
		font-size: 0.87rem;
color: #333333;
letter-spacing: 0;
margin-top: 1.25rem;
	}
}
</style>