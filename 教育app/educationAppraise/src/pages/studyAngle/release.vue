<template>
	<div class="release">
        <headBar :titleName='titleName' :isShow='true'></headBar>
		<div class="title1">选择话题</div>
		<div class="chooseTopic">
			<div v-for="(list,index) in navLists" :key="list.text" class="nav" :class="{ red:changeRed == index}" @click="reds(index,list)">{{list.text}}</div>
			<div class="block"></div>
		</div>
		<div class="title1">填写标题</div>
		<!--<input class="text1" type="text" placeholder="请输入标题，不超过40个字哦～"/>-->
		<textarea class="text1" name="" rows="" cols="" placeholder="请输入标题，不超过40个字哦～"></textarea>	
		
		<div class="title1">填写详细内容</div>
		<textarea class="text2" name="" rows="" cols="" placeholder="请输入详细内容～"></textarea>	
		<div class="title1">填写详细内容   <span>(做多上传3张图)</span></div>
		
		<upload></upload>
		 <div style="width: 88%;margin: 1.25rem auto;">
                    <mu-button full-width color="#4BC1DD">确定</mu-button>
  		 </div>
	</div> 
</template>

<script>
	import headBar from '@/components/head'
	import upload from '@/components/upload'
	export default {
	components:{
			  headBar,upload
		  },
		  data(){
		  	return{
		  		value:'',
				titleName:"发布内容",
				navLists:[{"text":"幼儿心得"},{"text":"名师主题"},{"text":"辅导提分心得"},{"text":"素质拓展心得"},{"text":"用户活动阻止"}],
				changeRed:null,
		  		chooseMn:'',
		  	}
		  },
		  methods:{
  				reds(index,list){
				this.changeRed = index;
				let htmltext = list.text
				this.chooseMn = htmltext
			},
		  }
		 }
</script>

<style scoped lang="scss">
 .release{
 	width: 100%;
 	height:100%;
 	background: #ffffff;
 	overflow-x: hidden;
 	overflow-y: scroll;
 	text-align: left;
 	padding-top: 3rem;
 	.title1{
 		width: 100%;
 		height: 1.31rem;
 		line-height: 1.31rem;
 		font-size: 0.93rem;
 		padding-left: 1rem;
 		font-weight: 600;
		color: #333333;
 		margin-top: 1.37rem;
 		span{
 			font-size: 0.75rem;
color: #ABABAB;
 		}
 	}
 	.chooseTopic{
 		width: 91.46%;
 		height: 4.93rem;
 		margin: 0 auto;
 		margin-top: 0.68rem;
 		display: flex;
 		flex-wrap: wrap;
 		justify-content:space-between;
 		
 		.nav{
 		width: 6.37rem;
 		height: 2.12rem;
 		text-align: center;
 		line-height: 2.12rem;	
 		background: #F6F6F6;
		border: 1px solid #EEEEEE;
		border-radius: 0.25rem;
		font-size: 0.87rem;
		color: #666666;
 		}
 		.nav:nth-child(4),.nav:nth-child(5){
 			margin-top: 0.62rem;
 		}
 		.red{
 			background: #ffffff;
 			border: 1px solid #4BC1DD;
 			color: #4BC1DD;
 		}
 		.block{
 			width: 6.37rem;
 		}
 	}
 	.text1{
		padding-left: 0.62rem;
 		display: block;
 		border: none;
	 	border: 1px solid #EEEEEE;
		border-radius: 4px;
		width: 88%;
		height: 3.75rem;
		margin: 0 auto;
 		margin-top: 0.68rem;
 		padding-top: 0.62rem!important;
		
 	}
 	.text2{
		padding-left: 0.62rem;
 		padding-top: 0.62rem;
 		display: block;
 		border: none;
	 	border: 1px solid #EEEEEE;
		border-radius: 4px;
		width: 88%;
		height:8.43rem;
		margin: 0 auto;
 		margin-top: 0.68rem;
 		line-height: 1.22rem;
 	}
 }
</style>