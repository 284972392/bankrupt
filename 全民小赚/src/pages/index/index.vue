<template>
	<div class="index">
       	<div class="header"></div>
       	<div class="topBox">
   			 <div class="qusetionList">
			 <div class="title">
				 <p> <span>钱包余额:</span> <span>￥{{balance}}</span> </p>
				 <mu-ripple class="mu-ripple-demo getCash" @click="goCash">
					去提现
				</mu-ripple>
			  </div>
   		 	<div class="qusetionBox" v-for="(data,index) in dataList">
   		 		<span>{{index+1}}</span>
   		 		<span>{{data.name}}</span>
   		 		<span>{{data.price.toFixed(2)}}元</span>
   		 		<span v-if="data.state == 0" class="weiLQ" @click="todetail(data)">领取</span>
   		 		<span v-if="data.state == 1"  class="successLQ">已完成</span>
   		 		<!-- <span v-if="data.state == 0"  class="failLQ">领取失败</span> -->
   		 	</div>
			 <div class="more">
				 <div class="moreTi">
					 更多任务即将上新，敬请期待
				 </div>
			 </div>
	   		 </div>
	       	<div class="bg">
	       		<p>答题完成后，可在"提现"中去提现</p>
	       	</div>
       	</div>

    </div>

</template>

<script>


export default {
    data() {
      return {
    dataList:[],
	openId:"",
	balance:'0.00'

      }
    },
    methods:{
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
	  goCash(){
		 this.$router.push({
          path: '/my',
          query: {
						openId:this.oldSession3rd
          }
        })
	  }
    },
    mounted(){
		this.$http({
		url:'https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=qmxzIndex&&channel=lvtudiandian',
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
				  this.balance = Number(response.data.data.hisTotal).toFixed(2)   	
			   })
		}

 
  }
</script>

<style scoped lang="scss">
.index{

	overflow: hidden;
	width: 100%;
	height: 100%;
	min-height: 41.6875rem;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow-x:hidden;
	overflow-y: scroll;
	box-sizing: border-box;
	padding-bottom: 3.68rem;
	background: -webkit-linear-gradient(#fcd8b0, #fcceab); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(#fcd8b0, #fcceab); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(#fcd8b0, #fcceab); /* Firefox 3.6 - 15 */
	background: linear-gradient(#fcd8b0, #fcceab); /* 标准的语法 */
	.header{
		width: 100%;
		height: 18.06rem;
		background: url('http://image.miduoxing.cn/ff49a165-9713-49f7-aab0-14a91276a498') no-repeat center center;
		background-size: 100% 100%;
	}
	.topBox{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	.more{
		width: 100%;
		height: 5.71875rem;
		display: flex;
		align-items: center;
		justify-content: center;
		.moreTi{
			height: 2.34375rem;
			line-height: 2.34375rem;
			width: 13.75rem;
			background: #f4f4f4;
			color: #919191;
			font-size: .78125rem;
			border-radius: .9375rem;
		}
	}
	.title{
		height: 5.4375rem;
		width: 100%;
		padding-top: .71875rem;
		border-bottom: 1px solid #eeeeee;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 1.03125rem;
		padding-right: .875rem;
		p{
			display: flex;
			align-items: center;
			span:nth-child(1){
				font-size: .875rem;color: #676767;
			}
			span:nth-child(2){
				font-size: 1.40625rem;color: #333333;
			}
		}
		.getCash{
			
			border: .08125rem solid #e5872d;
			color: #e5872d;
			line-height: 1.96875rem;
		
		}
		.mu-ripple-demo{
			position: relative;
           width: 4.84375rem;
			height: 1.96875rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: .9375rem;
		}
	}
	.qusetionList{
		width: 92%;
		/*height: 25.25rem;*/
		/*position: absolute;
		top: 12.75rem;
		left: 4%;*/
		margin: 0 auto;
		margin-top: 12.75rem;
		background: #ffffff;
		border-radius: 7px;
		z-index: 999;
		.qusetionBox{
			width: 94.63%;
			height: 4.1rem;
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
	.bg{
		padding-bottom: 3.9375rem;
		p{
			width: 100%;
			height: 3rem;
			text-align: center;
			line-height: 3rem;
			/*margin-top: 19.93rem;*/
			font-size: 0.78rem;
			color: #333333;
			font-weight: 600;
		}
	}
	}
}

</style>