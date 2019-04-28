<template>

	<div class="detail"> 
		<div class="bg">
			<div class="backBtn" @click="toIndex"></div>
		</div>
		<div class="erweima">
			<img :src="'http://'+this.erImg"/>
		</div>
		<div class="word"></div>
		<div class="questionBox"> 
			<div class="questions">
				<div class="question"  v-for="(data,index) in queList" v-if="showComponent">
					<div class="qusName"><span>{{index+1}}，</span>{{data.question}}</div>
					<div class="ans">
						<div class="abc" v-for="(item,index2) in data.answer2" @click="chooseThis(index,index2,item)">
						  <img v-if="changeIndex[index] == index2" class="choose" src="../../assets/images/xuanzhong@3x.png"/>
						  <span class="sircal"></span>	
						  <span class="nochoose" :class="{ orange:changeIndex[index] == index2}">{{item}}</span>
						 <!-- <span class="rightAns" v-if="over==true&&queList[index].answer2.indexOf(isright[index].rightAnswer) == index2">(正确答案)</span> -->
						 <!--v-if="queList.indexOf(isright[index].rightAnswer) == index2"-->
						<img class="cuowu" v-if="over==true&&changeIndex[index] == index2&&isright[index].right==false" src="../../assets/images/cuowu@3x.png" alt="" />
						 <img class="dui" v-if="over==true&&changeIndex[index] == index2&&isright[index].right==true" src="../../assets/images/dui@3x.png" alt="" />
						</div>
					</div>
				</div>
			</div>
			<!--<div class="sub" @click="sub">提交答案</div>-->
				<div class="btnBox" v-if="!wronAs">
				  <mu-flex justify-content="center" align-items="center">
						<mu-button v-if='!enough' round textColor='#000' disabled>提交答案</mu-button>
						<mu-button v-if='enough' round color="#f5bd85" textColor='#000' @click="sub">提交答案</mu-button>
						
					</mu-flex>
					
					 
				</div>
				<div class="btnBox" v-if="wronAs">
					<mu-flex justify-content="center" align-items="center">
						<mu-button v-if='!enough' round color="#f5bd85" textColor='#000' @click="toIndex">回答错误，继续答题</mu-button>
					</mu-flex>
					</div>
			<div class="tishi">都答对可得<span>{{price}}元</span>，答错任何一题没有奖励</div>
		</div>

	</div>
</template>

<script>
	export default {
		data(){
			return{
				canSub:true,
				price:'',
				sendAnser:[],
				wronAs:false,
				over:false,
				showComponent:true,
				enough:false,
				abc:'',
				erImg:'',
				isright:[],
				changeIndex:[],
				taskId:'',
				queList:[],
				stepId:null
			}
		},
		methods:{
			toIndex(){
				this.$router.go(-1)
			},
			chooseThis(index,index2,item){
				if (this.over == false) {
				this.enough = true
				this.changeIndex[index] = index2;

				this.showComponent = false
				this.showComponent = true

				let that = this;
				this.sendAnser = [];
				this.queList.forEach(function(i,index){
					i.answer = i.answer2[that.changeIndex[index]]
					if (i.answer == null||i.answer == ""||i.answer==undefined) {
						that.enough = false
					}
					that.sendAnser.push(i)
				
					
		})	
				}


			},
			sub(){
				if(this.canSub){
					let formDate = {
								oldSession3rd:this.oldSession3rd,
								questionAnswerDtos:this.sendAnser
						}
					this.canSub =false
						this.$http({
							url:this.allUrl+'/questionAnswer/answer',
							method:'post',
							data: formDate 
						})
						.then((response) =>{
							if(response.data.resultCode=="0"){
										let flag2 = true;
										this.isright = response.data.data
										this.enough = false
										this.over = true
										this.isright.forEach(function(i,index){
											if(i.right == false){
												flag2 = false
											}
										});
										if(flag2){
											this.$toast.success("回答正确")
											let that = this;
											setTimeout(function(){
												that.$router.go(-1)
											},2000)
											
										}else{
											this.wronAs = true
											this.$toast.error("回答错误，请扫描上方二维码查看答案")
										}
								 this.canSub = true
							}else{
								this.canSub = true
								this.$toast.warning(response.data.resultMessage)
								this.enough = false
								this.over = true
								this.$router.go(-1)
							}

						})
						.catch(function (error) {
							this.canSub = true
						});
								
				}
				
			}
		},
		mounted(){
					this.$http({
					url:'https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=qmxzDetail&&channel=lvtudiandian',
					method:'post'
				  })
				  .then((res)=>{
			
				  })
		},
		beforeMount(){
			
			this.oldSession3rd = this.$route.query.openId
			this.taskId = this.$route.query.id
			this.stepId = this.$route.query.stepId
			this.$http.get(this.allUrl+'/questionAnswer/getQuestionList?oldSession3rd='+this.oldSession3rd+'&taskId='+this.taskId+'&stepId='+this.stepId)
			  .then((response)=>{
	
				this.erImg = response.data.data.qrCode;
				this.queList = response.data.data.questionAnswers

				this.queList.forEach((i,index)=>{
			   	  i.answer2 = i.answer
					 i.answer2 = i.answer2.split("@@")
					 i.stepId = Number(this.stepId)
			   })
			   this.price =  response.data.data.price
			     
			})
  .catch(function (error) {
  
  });
		}
	}
</script>

<style lang="scss" scoped>
.detail{
	text-align: left;
	width: 100%;
	height: 100%;
	position: relative;
	overflow-x: hidden;
	overflow-y: scroll;
	min-height: 41.68rem;
	background: -webkit-linear-gradient(#fee5b6, #fccdab); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(#fee5b6, #fccdab); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(#fee5b6, #fccdab); /* Firefox 3.6 - 15 */
	background: linear-gradient(#fee5b6, #fccdab); /* 标准的语法 */
  .bg{
  	width: 100%;
  	height: 18.21rem;
  	background: url('http://image.miduoxing.cn/c243c209-5be2-4eaf-b550-4ae13aa7672f') no-repeat center center;
  	background-size: 100% 100%;
  	.backBtn{
  		width: 2.9rem;
  		height: 2.9rem;
  		background: url(../../assets/images/backBtn.png) no-repeat center center;
  		background-size: 100% 100%;
  		position: absolute;
  		top: 0.62rem;
  		left: 0.62rem;
  	}
  }
  .erweima{
  	width: 32.4%;
  	height: 7.28rem;
  	position: absolute;
  	top: 1.59rem;
  	left: 33.8%;
  	img{
  		width: 100%;
  		height: 100%;
  	}
  }
  .word{
  	width: 49.06%;
  	height: 1.43rem;
  	background: url(../../assets/images/ckeck@3x.png) no-repeat center center;
  	background-size: 100% 100%;
  	position: absolute;
  	top: 9.53rem;	
  	left: 25.5%;
  }
  .questionBox{
  	width: 91.2%;
  	height: 28.96rem;
  	background: #ffffff;
  	position: absolute;
  	top: 11.87rem;
  	left: 4.4%;
  	border-radius: 7px;
  	padding: 0 1.81rem;
  	padding-top: 1.75rem;
  	.questions{
  		width: 100%;
  		height: 21.06rem;
	  	overflow-x: hidden;
  		overflow-y: scroll;
  		.question{
  			width: 100%;
  			height: 8.31rem;
  			letter-spacing: 0.04rem;
  			margin-bottom: 1.56rem;
  			.qusName{
  				font-weight: 600;
  				width: 100%;
  				height: 2.43rem;
  				font-size: 0.81rem;
  				color: #333333;
  				padding-top: 0.1rem;
  				line-height: 1.0rem;
  			}
  			.ans{
  				width: 100%;
  				height: 5.87rem;
  				display: flex;
  				flex-direction: column;
  				justify-content: space-between;
  				.abc{
  					display:flex;
  					align-items:center;
  					font-weight: 600;
  					position:relative;
  					
  					.choose{
  						display: block;
  						width: 0.87rem;
  						height: 0.71rem;
  						position: absolute;
  						left: 0.08rem;
  						top: 0.28rem;
  					}
  					.sircal{
  						display: block;
  						width: 1.18rem;
  						height: 1.18rem;
  						border-radius: 50%;
  						border: 1px solid #f4af77;
  						margin-right:0.68rem;
  					}
  					.nochoose{
  						color: #666666;
  						font-size: 0.81rem;
  					}
  					.orange{
  						color: #e67339;
  					}
  					.rightAns{
  						color:#d23939 ;
  						font-size: 0.65rem;
  						margin-left: 1.25rem;
  						
  					}
  					.cuowu{
  						width: 1.25rem;
  						height: 1.25rem;
  						position: absolute;
  						right: 0;
  					}
  					.dui{
  						width: 1.25rem;
  						height: 1.25rem;
  						position: absolute;
  						right: 0;
  					}
  				}
  			}
  		}
  	}
  	  .sub{
  	width:14.81rem;
  	height: 2.53rem;
  	text-align: center;
  	line-height: 2.53rem;
  	border-radius: 50px;
  	background: #f5bd85;
	margin: 0 auto;
	font-weight: 600;
	letter-spacing: 0.1rem;
	font-size: 0.87rem;
  }
  	.btnBox{
		height: 2.53rem;
		width: 100%;
		display: flex;
		justify-content: center;
		.mu-raised-button {
			width:14.81rem;
			height: 2.53rem;
				letter-spacing: 0.1rem;
				font-size: 0.87rem;
			font-weight: bold;
		}
	}
  .tishi{
  	width: 100%;
  	height: 2.15rem;
  	text-align: center;
  	line-height: 2.15rem;
  	font-size:0.65rem; 
  	color: #b86311;
  	letter-spacing: 0.04rem;
  	span{
  		color: red;
  	}
  }
  }

}
</style>