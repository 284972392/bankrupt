<template>
	<div class="myComment"> 
        <headBar :titleName='titleName' :isShow='true'></headBar>
        <div class="content">
			  <!--课程-->
			  <div class="institution">
			    <div class="box" v-for="(data,index) in classList">
			  			<div class="greeBox">
			  				<img :src="data.logo"/>
			  				<div class="center">
			  					<span>{{data.title}}</span>
								<div class="centerDiv">{{data.type}}   &nbsp; <span>原价￥{{data.price}}</span></div>
			  					<div class="star">
			  						<div class="WYJstars">
                  			  			<Rate v-model="data.stars" :disabled='true'  /> 
			  						</div>
			  						<span>{{data.juli}}条</span>
			  					</div>
			  				</div>
			  				<div class="right">
			  					<span>热度{{data.hot}}</span>
			  				</div>
			  			</div>
			  			<div class="tiketBox">
			  				<img v-for="img in data.imgList" :src="img.img"/>
			  			</div>
			  		</div>
			  </div>

			  
			

        </div>
	</div>
</template>

<script>
import headBar from '@/components/head'
import { Rate } from 'iview';
	
	export default {
		    components:{
			  headBar,Rate
		  },
		data(){
			return{
				titleName:"我的优惠券",
                  active1:0,
				//课程列表
				classList:[
					{
                  	logo:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3992327908,3037653052&fm=11&gp=0.jpg",
                  	title:'在线少儿英语',
                  	stars:5,
                  	juli:"1742",
                  	imgList:[
                  	 {img:"https://front.miduoxing.cn/meters/appImg/4.png"}
                  	],
                  	hot:'15867',
                  	type:"免费试听",
                  	price:'1188.99',
                  	words:"课程很好，很适合小孩子学习，难易程度刚好适合上小学的孩子们学习，给好评！"
					},
					{
                  	logo:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2977413697,1803119135&fm=200&gp=0.jpg",
                  	title:'专业在线少儿英语',
                  	hot:'206841',
                  	juli:"1442",
  	                  	imgList:[
                  	 {img:"https://front.miduoxing.cn/meters/appImg/1.png"},
                  	 {img:"https://front.miduoxing.cn/meters/appImg/2.png"}
                  	],
                  	stars:5,
                  	type:"免费试听",
                  	price:'3288.99',
                  	words:"课程还不错的，我带着孩子去试听了的，就是学费有点儿小贵，平价一点儿更好！"
					},
					{
                  	logo:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2491309610,1812635812&fm=200&gp=0.jpg",
                  	title:'外教英语 名师教学',
                  	hot:'20627',
                  	imgList:[
                  	 {img:"https://front.miduoxing.cn/meters/appImg/3.png"}
                  	],
                  	juli:"1422",
                  	stars:5,
                  	type:"免费试听",
                  	price:'3288.99',
                  	words:"课程还行吧，带着我家孩子去试听了几天的课程，孩子勉强听得懂，可能难度有点儿大，还是希望难度稍微简单点儿，适合一些笨小孩。"
					
					}
				],

			}
		}
	}
</script>

<style scoped  lang="scss">
.mu-tabs-center{
				  justify-content: space-around;
				  color: #666666;
				  font-weight: bold;
				  margin-top: .5rem;
				  background: #FFFFFF;
				}
	.myComment{
		width: 100%;
		height:100%;
		/*overflow: hidden;*/
		overflow-x: hidden;
		overflow-y: scroll;
		.content{
			margin-top: 2.88rem;
			width: 100%;
				
				.institution{
					.box{
						width: 100%;
						background: #ffffff;
						padding: 0.93rem 0;
						margin-bottom: 0.5rem;
						.greeBox{
							width: 100%;
							height: 4.81rem;
							padding: 0.5rem;
							border-bottom: 1px solid #EEEEEE;
							display: flex;

							img{
								width: 3.75rem;
								height: 100%;
								border: 1px solid #EEEEEE;
								border-radius: 4px;
							}
							.center{
								margin-left: 0.75rem;
								width:10.5rem;
								height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: space-around;
								align-items:flex-start;
								span:nth-child(1){
									font-size: 0.81rem;
									color: #333333;
									font-weight: 600;
									letter-spacing: 0;
											}
											span:nth-child(2){
									font-size: 0.93rem;
									color: #333333;
									letter-spacing: 0;
											}
											span:nth-child(3){
									font-size: 0.68rem;
									color: #333333;
									letter-spacing: 0;
											}
								.star{
								 display: flex;
								 span{
								 	font-size: 0.68rem;
							color: #ABABAB;
							letter-spacing: 0;
							margin-left: 0.62rem;
								 }	
								}
								.centerDiv{
									color: #666666;
									font-size: 0.81rem;
									span{
										color: #ABABAB;
										font-size: 0.68rem;
									}
								}
								.centerTeachbox1{
									font-size: 0.75rem;
									color: #666666;
									letter-spacing: 0;
								}
								.centerTeachbox2{
									font-size: 0.75rem;
									color: #666666;
								}
							}
							.right{
								margin-left: 1.92rem;
								margin-top: 1.95rem;
								display: flex;
								flex-direction: column;
								height: 2.25rem;
								justify-content: space-around;
								span:nth-child(1){
									font-size: 0.68rem;
							color: #ABABAB;
								}
								span:nth-child(2){
									font-size: 0.68rem;
							color: #666666;
								}
							}
						}
						.tiketBox{
							width: 88%;
							margin: 0 auto;

							img{
								width: 100%;
								height: 4rem;
							margin-top: 0.87rem;
								
							}
							
						}
					}
				}

			    
		}
	}
</style>