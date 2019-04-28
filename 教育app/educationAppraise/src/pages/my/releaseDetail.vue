<template>
	<div class="releaseDetail">
        <headBar :titleName='titleName' :isShow='true'></headBar>
		<div class="title">
			孩子学习注意力不集中的问题得到解决了,分享一下我的方法给各位家长看看
		</div>
		<div class="headMsg">
        			<img src="../../../static/head.png"/>
        			<span>篱笆外的小思绪</span>
        		</div>
	<div class="bottom">
		<span>回帖78</span>
		<span>阅读129</span>
		<span>分享102</span>
		<span>2018-12-27 11:16:30</span>
	</div>
	<p class="p1">
		孩子的注意力容易因新的刺激发生转移。因此，要想给
孩子营造一个良好的注意环境，家长首先应排除各种可
能分散孩子注意力的因素，为孩子创造一个安静、祥和
简单的学习环境。
	</p>
	<p class="p2">
		1.独立学习有助于孩子集中注意力 2.饮食均衡让孩子更
专注 3.睡眠是注意力集中的保证 4.用音乐培养孩子的注
意力 5.家长要以身作则 
	</p>
	<img class="twoChild" src="../../../static/class4.png" alt="" />
	<div class="block"></div>
	<div class="judgeHeader">评价(2)</div>
	<div class="box" v-for="(data,index) in judgeList">
		<div class="box_top">
			<img :src="data.headpic"/>
			<div class="center">
				<span>{{data.nickName}}</span>
				<span>{{data.time}}</span>
			</div>
		</div>
			<p class="word">{{data.word}}</p>
		
	</div>
	<div class="underBt">
		<input class="inputBox" type="text" name="" id="" placeholder="一起参与讨论吧～" />
		<div class="rightBox">
			<div class="shoucang" @click="isClick=!isClick">
            <mu-icon left value="favorite" :color="isClick?'red':'#ACACAC'"></mu-icon>
			
			<span>收藏</span>	
			</div>
			<div class="share" @click="open=true">
            <mu-icon left value="share" color='#ACACAC'></mu-icon>
				<span>分享</span>	
				
			</div>
		</div>
		</div>
        <share-sheet :open='open' @close='close'></share-sheet>
		
	</div>
</template>

<script>
	import headBar from '@/components/head'
import shareSheet from '@/pages/organDetail/shareSheet'
	
	export default {
	components:{
			  headBar,shareSheet
		  },

		data(){
			return{
                open:false,
                isClick:false,
				titleName:"话题详情",
				judgeList:[
					{
						headpic:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2491309610,1812635812&fm=200&gp=0.jpg',
						nickName:'草莓冰的浅浅',
						time:"2018-12-29 12:30:41",
						word:'感谢楼主分享，我觉得很有用，刚好可以给我周围的家长们分享点儿你的这个经验！'
					},
					{
						headpic:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2129022410,2780483248&fm=11&gp=0.jpg',
						nickName:'最帅阿加西',
						time:"2018-12-29 12:30:41",
						word:'哇塞！太有用的分享了，感谢楼主!'
					},
				]
				
			}
		},
		methods:{
             close(){
                this.open = false;
            },
		}
		}
		
</script>

<style scoped lang="scss">
	.releaseDetail{
		width: 100%;
		height: 100%;
		text-align: left;
		background: #ffffff;
		overflow-x: hidden;
		overflow-y: scroll;
		padding-bottom: 3.12rem;
		width: 100%;
		.title{
			width: 100%;
			height: 4.5rem;
			padding: 0 1rem;
			padding-top: 1.06rem;
     		margin-top:3.02rem;
     		background: #ffffff;
     		font-family: PingFangSC-Semibold;
			font-size: 1.18rem;
			color: #333333;
			letter-spacing: 0;
			line-height: 1.63rem;
			font-weight: 600;
		}
		.headMsg{
					width: 100%;
					height: 1.75rem;
					line-height: 1.75rem;
					margin-top: 1rem;
					margin-left: 1rem;
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
						.bottom{
					width: 100%;
					height: 1.06rem;
					line-height: 1.06rem;
					margin: 0.56rem 0;
					padding: 0 1rem;
					span{
						font-size: 0.75rem;
						margin-left: 0.62rem;
color: #ABABAB;
letter-spacing: 0;
					}
					span:nth-child(4){
						float: right;
					}
					span:nth-child(1){
						margin: 0;
					}
				}
				.p1,.p2{
					padding: 1rem;
					line-height: 1.43rem;
					font-family: PingFangSC-Medium;
font-size: 0.87rem;
color: #333333;
letter-spacing: 0;
				}
				.p2{
					padding-top: 0;
				}
				.twoChild{
					display: block;
					width: 88%;
					/*height: 13.68rem;*/
					margin: 0 auto;
				}
				.block{
					width: 100%;
					height: 0.5rem;
					background: #EEEEEE;
					margin-top: 1rem;
				}
		.judgeHeader{
			width: 100%;
			height: 2.34rem;
			padding-left: 1rem;
			border-bottom: 1px solid #EEEEEE;
			font-size: 0.87rem;
			line-height: 2.34rem;
			color: #666666;
			letter-spacing: 0;
		}
		.box{
			width: 100%;
			border-bottom: 1px solid #EEEEEE;
			padding: 1.09rem 1rem;
			.box_top{
				width: 100%;
				height: 1.87rem;
				display: flex;
				align-items: center;
				img{
					width: 1.75rem;
					height: 1.75rem;
					border-radius: 50%;
				}
				.center{
					width: 7.18rem;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 0.62rem;
					span:nth-child(1){
						font-size: 0.81rem;
						color: #333333;
						letter-spacing: 0;
					}
					span:nth-child(2){
						font-size: 0.68rem;
						color: #ABABAB;
						letter-spacing: 0;
					}
				}
			}
			.word{
				margin-top: 0.5rem;
				width: 100%;
				font-size: 0.87rem;
				color: #333333;
				letter-spacing: 0;
				line-height: 1.22rem;
			}
		}
		.underBt{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 3.12rem;
			background: #FFFFFF;
			box-shadow: 0 -1px 5px 0 rgba(203,203,203,0.36);
			display: flex;
			padding: 0.56rem 0.75rem;
			.inputBox{
				display: block;
				width: 12.68rem;
				height: 100%;
				background: #F3F3F3 url(../../assets/my/input.png) no-repeat 0.68rem center;
				background-size: 0.81rem 0.81rem;
				border-radius: 15.5px;
				border: none;
				padding-left: 1.87rem;
			}
			.inputBox::-webkit-input-placeholder{
				font-size: 0.75rem;
				color: #ABABAB;
				letter-spacing: 0;
			}
			.rightBox{
				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				font-size: 0.75rem;
				color: #666666;
				letter-spacing: 0;
				div{
					height: 100%;
					display:flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
				
				}
				.shoucang{}
				.share{}
			}
		}
	}
</style>