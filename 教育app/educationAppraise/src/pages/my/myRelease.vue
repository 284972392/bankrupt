<template>
	<div class="myRelease">
        <headBar :titleName='titleName' :isShow='true'></headBar>
        <div class="totel">
        	共发布 <span>3</span>
        </div>
        <div class="content">
        	<div class="box" v-for="(data,index) in dataList" @click="toDetail">
        		<div class="headMsg">
        			<img src="../../../static/head.png"/>
        			<span>篱笆外的小思绪</span>
        			<span>{{data.time}}</span>
        		</div>
        		<p class="title">{{data.title}}</p>
        		<p class="texts">{{data.texts}}</p>
        		<div class="bottom">
        			<span>图</span>
        			<span>回帖{{data.replay}}</span>
        			<span>阅读{{data.read}}</span>
        			<span>分享{{data.share}}</span>
        		</div>
        	</div>
        </div>
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
				titleName:"我的发布",
				dataList:[
					{
						time:'1小时前',
						replay:'105',
						read:'442',
						share:'25',
						title:"我孩子的学习计划",
						texts:'我的小孩一年级了，想到了未来六年的学业，就赶紧提前准备了，分别有书本知识，还有课外知识，才艺等，我会在后面po上我制定的学习计划。'
					},
					{
						time:'3天前',
						replay:'845',
						read:'4342',
						share:'25',
						title:'让孩子集中注意力的办法，亲测有效',
						texts:'孩子的注意力容易因新的刺激发生转移。因此，要想给孩子营造一个良好的注意环境，家长首先应排除各种可能分散孩子注意力的因素，为孩子创造一个安静、祥和简单的学习…'
					},
					{
						time:'5天前',
						replay:'1045',
						read:'4425',
						share:'253',
						title:'哈哈学习的教育机构真的太棒了，强烈推荐',
						texts:'最近发现一个很好的学习机构，哈哈学习，这是一个朋友推荐给我的，我去试听了一下，真的很不错的，安利给你们啦'
						
					}
				]
			}
		},
		methods:{
			toDetail(){
				this.$router.push("/releaseDetail")
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.myRelease{
		width: 100%;
		height: 100%;
		background: #ffffff;
		overflow: hidden;
		.totel{
			width: 100%;
			height:2.65rem;
			border: 1px solid #EEEEEE;
			margin-top:2.83rem;
			padding-left: 1rem;
			text-align: left;
			line-height: 2.65rem;
			font-size: 0.87rem;
				color: #333333;
				letter-spacing: 0;
				span{
					color:  #4BC1DD;
				}
		}
		.content{
			width: 100%;

			.box{
				text-align: left;
			padding:0.84rem 1rem ;				
				border-bottom: 1px solid #EEEEEE;
				.headMsg{
					width: 100%;
					height: 1.75rem;
					line-height: 1.75rem;
					img{
						width: 1.75rem;
						height: 1.75rem;
					}
					span:nth-child(2){
						font-size: 0.75rem;
					color: #333333;
					letter-spacing: 0;
					margin-left: 0.31rem;
					}
					span:nth-child(3){
						float: right;
						font-size: 0.75rem;
						color: #666666;
						letter-spacing: 0;
					}
				}
				.title{
					margin-top: 0.43rem;
					width: 100%;
					height: 1.5rem;
					line-height: 1.5rem;
					font-size: 1.06rem;
					color: #333333;
					letter-spacing: 0;
				}
				.texts{
					font-family: PingFangSC-Medium;
					font-size: 0.81rem;
					line-height: 1.02rem;
					color: #666666;
					letter-spacing: 0;
				}
				.bottom{
					width: 100%;
					height: 1.06rem;
					line-height: 1.06rem;
					margin: 0.56rem 0;
					span{
						font-size: 0.75rem;
						margin-left: 0.62rem;
color: #ABABAB;
letter-spacing: 0;
					}
					span:nth-child(1){
						font-size: 0.75rem;
color: #4BC1DD;
margin: 0;
					}
				}
			}
		}
	}
</style>