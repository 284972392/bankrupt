<template>
	<div class="myComment"> 
        <headBar :titleName='titleName' :isShow='true'></headBar>
        <div class="content">
	         <mu-container>
			  <mu-tabs :value.sync="active1" inverse color="#4BC1DD" indicator-color="#4BC1DD"  center>
			    <mu-tab>机构</mu-tab>
			    <mu-tab>课程</mu-tab>
			    <mu-tab>老师</mu-tab>
			  </mu-tabs> 
			  <!--机构-->
			  <div class="institution" v-if="active1 === 0">
			  		<div class="box" v-for="(data,index) in institutionList">
			  			<div class="greeBox">
			  				<img :src="data.logo"/>
			  				<div class="center">
			  					<span>{{data.title}}</span>
			  					<span>人均 ￥{{data.price}}</span>
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
			  		</div>
			  </div>
			  <!--课程-->
			  <div class="institution" v-if="active1 === 1">
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
			  		</div>
			  </div>
			  <!--老师-->
			    <div class="institution" v-if="active1 === 2">
			    <div class="box" v-for="(data,index) in teachList">
			  			<div class="greeBox">
			  				<img :src="data.logo"/>
			  				<div class="center">
			  					<span>{{data.title}}</span>
								<div class="centerTeachbox1">{{data.teacWt}} &nbsp| &nbsp{{data.age}}</div>
								<div class="star">
			  						<div class="WYJstars">
                  			  			<Rate v-model="data.stars" :disabled='true'  /> 
			  						</div>
			  						<span>{{data.juli}}条</span>
			  					</div>
			  				</div>
			  			</div>
			  		</div>
			  </div>
			  
			
			</mu-container>
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
				titleName:"我的收藏",
                  active1:0,
                  //机构列表
                  institutionList:[
                  {
                  	logo:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=832840640,4152671677&fm=26&gp=0.jpg",
                  	title:'阿凡提智能辅助',
                  	price:'1108',
                  	hot:'132145',
                  	teacWt:"钢琴老师",
                  	age:"4年",
                  	stars:5,
                  	bg:'哥伦比亚大学',
                  	juli:'806',
                  	type:"免费试听",
                  	add:'西湖区 西溪银泰城',
                  	words:"机构总体还不错，教学质量也还行，我去听了几节课感觉都挺好的，教学环境还好"
                  },
                  {
                  	logo:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3992327908,3037653052&fm=11&gp=0.jpg",
                  	title:'CCtalk',
                  	hot:'29102',
                  		teacWt:"钢琴老师",
                  	stars:5,
                  	age:"4年",
                  	juli:"1211",
                  	bg:'哥伦比亚大学',
                  	type:"免费试听",
                  	price:'869',
                  	add:'西湖区 西溪印象城',
                  	words:"特别好! 跟其它家长们组团去的，环境和教学质量都很好，强烈推荐！"
                  }
                  ],
				//课程列表
				classList:[
					{
                  	logo:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3992327908,3037653052&fm=11&gp=0.jpg",
                  	title:'在线少儿英语',
                  	stars:5,
                  	juli:"1742",
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
                  	stars:5,
                  	type:"免费试听",
                  	price:'3288.99',
                  	words:"课程还不错的，我带着孩子去试听了的，就是学费有点儿小贵，平价一点儿更好！"
					},
					{
                  	logo:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2491309610,1812635812&fm=200&gp=0.jpg",
                  	title:'外教英语 名师教学',
                  	hot:'20627',
                  	juli:"1422",
                  	stars:5,
                  	type:"免费试听",
                  	price:'3288.99',
                  	words:"课程还行吧，带着我家孩子去试听了几天的课程，孩子勉强听得懂，可能难度有点儿大，还是希望难度稍微简单点儿，适合一些笨小孩。"
					
					}
				],
				//老师列表
				teachList:[
					{
                  	logo:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2129022410,2780483248&fm=11&gp=0.jpg",
                  	title:'茱莉亚',
                  	stars:5,
                  	hot:'29102',
                  		teacWt:"钢琴老师",
                  	age:"4年",
                  	juli:"142",
                  	bg:'哥伦比亚大学',
                  	type:"免费试听",
                  	price:'869',
                  	add:'西湖区 西溪印象城',
                  	words:"老师是特别专业的，教学质量棒棒的！教课风格也很幽默风趣，孩子起来毫无压力。"
                  
					}
				]
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
			.container{
				padding: 0!important;
				
				.institution{
					.box{
						width: 100%;
						background: #ffffff;
						padding: 0.93rem 0.87rem;
						border-bottom: 1px solid #EEEEEE;
						/*margin-top: 0.09rem;*/
						.greeBox{
							width: 100%;
							height: 4.81rem;
							padding: 0.5rem;
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
								margin-left: 0.62rem;
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
					}
				}
			}
			    
		}
	}
</style>