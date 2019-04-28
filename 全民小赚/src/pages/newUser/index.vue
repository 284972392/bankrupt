<template>
	<div class="newUser">
		<div class="gold"></div>
		<div class="myqian"> 我的钱包</div>
		<div class="money">￥<span>{{balance.toFixed(2)}}</span></div>
		<div class="btnBox">
		  <mu-flex justify-content="center" align-items="center">
				<mu-button round color="#07c160" textColor='#ffffff' @click="getCash" >提现</mu-button>
			</mu-flex>
		</div>
		<div class="p1">1元新人现金红包已到账</div>
		<div class="p2">完成以下任务达到<span>2元</span>即可提现</div>
		<div class="messinListBox">
			<div class="qusetionBox" v-for="(data,index) in dataList">
   		 		<span>{{index+1}}</span>
   		 		<span>{{data.name}}</span>
   		 		<span>{{data.price}}元</span>
   		 		<span v-if="data.state == 0" class="weiLQ" @click="todetail(data)">领取</span>
   		 		<span v-if="data.state == 1"  class="successLQ">已完成</span>
   		 		<!-- <span v-if="data.state == 0"  class="failLQ">领取失败</span> -->
   		 	</div>
		</div>
	</div>
</template>

<script>
	export default{
    data() {
      return {
    dataList:[],
    openId:"",
	 balance: 0,
	 oldSession3rd:''
    

      }
    },
    methods:{
    			reload(){
				 let url = this.allUrl + '/wechatUserInfo/getWechatUserInfo'
							this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
							.then((response)=>{
								this.balance = response.data.data.hisTotal   
							})
		},
      todetail(data){      
        // this.$router.push({
        //   path: '/detail',
        //   query: {
		// 				id: data.id,
		// 				openId:this.oldSession3rd
        //   }
		// })
		 this.$router.push({
          path: '/step',
          query: {
						id: data.id,
						openId:this.oldSession3rd
          }
        })
      },
      		getCash(){

			if(this.balance<2){
				this.$toast.error("您的余额不足两元，请先完成任务")
			}else{
				

				let form = {
					oldSession3rd:this.oldSession3rd,
					amount:2
				}
				let url2 = this.allUrl + '/withdrawRecord/withdraw'
				this.$http({
					url:url2,
					method:'post',
					params: form 
				  })
				  .then((response) =>{
					  this.reload()
					  this.$toast.success(response.data.resultMessage)

				  })
				  .catch(function (error) {
					  this.$toast.error('提现失败')
				  });

			
			}
		},
    },
    mounted(){    				
			this.$http({
			url:'https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=qmxzNewUser&&channel=lvtudiandian',
			method:'post'
		  })
		  .then((res)=>{

		  })
    	this.$http.get(this.allUrl+'/task/getTaskList?oldSession3rd='+this.oldSession3rd)
  .then((response)=>{

    this.dataList = response.data.data.reverse()
  })
  .catch(function (error) {

  });
		},
		beforeMount(){
	
			this.oldSession3rd = this.$route.query.openId
					 let url = this.allUrl + '/wechatUserInfo/getWechatUserInfo'
            this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
			  .then((response)=>{

				  this.balance = response.data.data.hisTotal    
			   })
		}

 
  }
</script>

<style scoped lang="scss">
.newUser{
		width: 100%;
		height: 100%;
		min-height: 41.68rem;
		background: #ffffff;
		overflow: scroll;
		padding-bottom: 1.93rem;
		.gold{
			width: 3.43rem;
			height: 3.43rem;
			background: url(../../assets/images/gold.png) no-repeat center center;
			background-size: 100% 100%;
			margin: 0 auto;
			margin-top: 1.5rem;
		}
		.myqian{
			width: 100%;
			height: 3.12rem;
			text-align: center;
			line-height: 3.12rem;
			font-size: 0.87rem;
			color: #333333;
		}
		.money{
			width: 100%;
			height: 2.68rem;
			text-align: center;
			line-height: 1.98rem;
			font-size: 1.21rem;
			span{
				font-size: 2.09rem;
				font-weight: 600;
			}
		}
		.btnBox{
			width: 11.96rem;
			height: 2.75rem;
			margin: 0 auto;
			margin-top:1.06rem;
		.mu-raised-button {
			width: 11.96rem;
			height:  2.75rem;
			font-size: .96875rem;

		}
		}
		.p1{
			width: 100%;
			height: 1.62rem;
			text-align: center;
			line-height: 1.62rem;
			font-size: 0.87rem;
			color: #343434;
			margin-top: 1.06rem;
			letter-spacing: 0.051rem;
			
		}
		.p2{
			width: 100%;
			height: 2rem;
			text-align: center;
			line-height: 2rem;
			font-size: 0.87rem;
			color: #343434;
			letter-spacing: 0.051rem;
		  span{
		  	color: #fe0000;
		  	font-size: 1rem;
		  	font-weight: bold;
		  }
			
		}
		.messinListBox{
			width: 21.25rem;
			/*height: 19.81rem;*/
			margin: 0 auto;
			margin-top: 1.18rem;
			border-radius: 6px;
			box-shadow:#ccc 0px 0px 10px;
			overflow-x:hidden;
			overflow-y: scroll;
			.qusetionBox{
			width: 94.63%;
			height: 3.95rem;
			margin: 0 auto;
			border-bottom: 1px solid #eeeeee;
			padding: 0 0.53rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
				font-weight: 600;
			
			span:nth-child(1){
				display: block;
				width: 1.56rem;
				height: 1.56rem;
				border-radius: 50%;
				background: #f2c7bf;
				text-align: center;
				line-height: 1.56rem;
				font-size: 0.75rem;color: #333333;
			}
			span:nth-child(2){
				display: block;
				height: 1.3rem;
				line-height: 1.3rem;
				color: #333333;
				font-size: 0.96rem;
				width: 6.96rem;
				text-align: left;
				padding-left: 0.43rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			span:nth-child(3){
				color: #d23939;
				/*margin-left: 0.62rem;*/
			}
			.weiLQ{
				display: block;
			    width: 4.43rem;
			    height: 1.62rem;
			    background: #f5bd85;
			    color: #ffffff;
			    border-radius: 30px;
			    text-align: center;
			    line-height: 1.8rem;
			}
			.successLQ{
				display: block;
			    width: 4.43rem;
			    height: 1.92rem;
				color: #68d0d2;
				text-align: center;
			    line-height: 1.92rem;
			}
			.failLQ{
				display: block;
			    width: 4.43rem;
			    height: 1.92rem;
				color: #eaa327;
				text-align: center;
			    line-height: 1.92rem;
			}
		}
		}
}
</style>