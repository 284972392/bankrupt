<template>

	<div class="my">
		<div class="top">
			<img src="../../../static/gold.png" alt="">
			<p>我的钱包</p>
			<span><span style="font-size:1.3125rem">￥</span>{{balance.toFixed(2)}}</span>
		</div>

		<div class="bigBox">
			<div class="box">
				 <div class="btn oneYuan" :class="{'on':tab==2}" @click="tab=2" style="width:14.875rem;">2元快速提现</div>
				 <div class="btn" :class="{'on':tab==5}" @click="tab=5">5元</div>
				 <div class="btn" :class="{'on':tab==10}" @click="tab=10">10元</div>
				 <div class="btn" :class="{'on':tab==20}" @click="tab=20">20元</div>
				 <div class="btn" :class="{'on':tab==30}" @click="tab=30">30元</div>
			</div>
		</div>

	<div class="btnBox">
	  <mu-flex justify-content="center" align-items="center">
			<mu-button v-if='!enough'  textColor='#000' disabled>余额不足</mu-button>
			<mu-button v-if='enough'  color="#07c160" textColor='#fff' @click="getCash">{{show}}</mu-button>
		</mu-flex>
	</div>

	<div class="btnBox2">
	  <div class="bb">
				<mu-button round textColor='#666666' @click="goTaskRecord">收入记录</mu-button>
		  	<mu-button round textColor='#666666' @click="goCashRecord">提现记录</mu-button>
		</div>
	</div>

	<!-- <div class="remined">
		<div style="width:4.3rem;">提现规则: </div>
		<div>
			<p>每天9:00/12:00/15:00/20:00</p> 
			整点发放1000元提现额度</div>
	</div> -->

		

	</div>
</template>

<script>
export default {
    data() {
      return {
				 balance: 0,
				 tab:2,
				 show:'提 现',
				 enough:true,
				 upload:false
      }
    },
	methods:{
		reload(){
				 let url = this.allUrl + '/wechatUserInfo/getWechatUserInfo'
							this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
							.then((response)=>{
								this.balance = response.data.data.hisTotal   
									if(this.balance<this.tab){
										this.enough = false
									}else{
										this.enough = true
									}   
							})
		},
		getCash(){

			if(!this.upload){
				this.upload = true 
				let form = {
					oldSession3rd:this.oldSession3rd,
					amount:this.tab
				}
				let url2 = this.allUrl + '/withdrawRecord/withdraw'
				this.$http({
					url:url2,
					method:'post',
					params: form 
				  })
				  .then((response) =>{
					  this.reload()
					  this.upload = false	 
					  this.$toast.success(response.data.resultMessage)

				  })
				  .catch(function (error) {
					  this.upload = false
					  this.$toast.error('提现失败')
				  });

			}
		},
		goTaskRecord(){
			 this.$router.push({
          path: '/taskRecord',
          query: {
						openId:this.oldSession3rd
          }
        })
			
		},
		goCashRecord(){
				 this.$router.push({
          path: '/getCashRecord',
			query: {
							openId:this.oldSession3rd
			}
			})
		},
	
	},
	watch: {
      tab(val) {
       	if(this.balance<val){
					this.enough = false
				}else{
					this.enough = true
				}
      }
    },
	mounted(){
					this.$http({
					url:'https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=qmxzMy&&channel=lvtudiandian',
					method:'post'
				  })
				  .then((res)=>{
			
				  })
		},
	beforeMount(){
		this.oldSession3rd = this.$route.query.openId

		 let url = this.allUrl + '/wechatUserInfo/getWechatUserInfo'
            this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
			  .then((response)=>{
			  	
				  this.balance = response.data.data.hisTotal   
				  	if(this.balance<this.tab){
						this.enough = false
					}else{
						this.enough = true
					}   
			   })

	
	}
 
  }
</script>

<style scoped lang="scss">
.my{
	width: 100%;
	height: 100%;

	.top{
		width: 100%;
		img{
			height: 3.4375rem;
			width: 3.4375rem;
			margin-top: 1.5rem;
		}
		p{
			margin-top: 1.1875rem;
			margin-bottom: 1.25rem;
			font-size: .875rem;
			font-weight: bold;
			color: #333333;
			}
		span{
			
			color: #1d1d1d;
			font-size: 1.875rem;
		}
	}
	.bigBox{
		margin-top: 2.53125rem;
		height: 13.125rem;
		width: 100%;
		display: flex;
		justify-content: center;
		.box{
			width: 14.875rem;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.oneYuan{
				background: url('../../../static/zhuanxiang.png') no-repeat center right;
				background-size: 25% 100%;
			}
			.btn{
				width: 6.59375rem;
				height: 3.125rem;
				line-height: 3.125rem;
				text-align: center;
				font-weight: bold;
				font-size: .875rem;
				color: #333333;
				border: .08125rem solid #e2e2e2;
				border-radius: .5rem;
			}
			.on{
				color: #07c160;
				border: .08125rem solid #07c160;
			}
		}
	}
	.btnBox{
		height: 3.125rem;
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 1rem;
		.mu-raised-button {
			width: 17.53125rem;
			height: 3.125rem;
			font-size: .96875rem;
			font-weight: bold;
		}
	}
	.btnBox2{
		height: 1.78125rem;
		margin-top: 1.75rem;
		width: 100%;
		display: flex;
		justify-content:center;
		.mu-raised-button {
			width: 4.6875rem;
			height: 1.8125rem;
			font-size: .78125rem;
			font-weight: bold;
		}
		.bb{
			width: 17.21875rem;
			display: flex;
			justify-content: space-between;
	
		}
	}
	.remined{
		margin-top: 1.375rem;
		width: 75%;
		margin-left: 12%;
		text-align: left;
		color: #000;
		font-size: .9rem;
		display: flex;
		line-height: 1.2rem;
	
	}
	
}
</style>