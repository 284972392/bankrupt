<template>
	<div class="rechargeReadOnly">
		<div class="header">
			<span>充值申请</span>
			<Button @click="ToRecharge">继续充值</Button>
		</div>
		<div class="chargeMessage">
        	<div><span>商户名称</span><span>{{base.tenantName}}</span></div>
        	<div><span>商户编号</span><span>{{base.tenantId}}</span></div>
        	<div>
        		<span>充值金额</span>
				<span id="qian">{{base.amount}}元</span>
        	</div>
        	<div><span>充值编号</span><span>{{base.id}}</span></div>
        	<div><span>充值状态</span><span>待财务审核</span></div>
        	<div><span>充值时间</span><span>{{base.createTime}}</span></div>
        	<div><span>当前余额</span><span>{{base.balance}}</span></div>
			<div><span>是否预充值</span><span>{{base.preloaded=='false'?'否':'是'}}</span></div>
		</div>
		
		
	
	</div>
</template>

<script>
	export default {
		data(){
			return {
				base:{},
				rechargeMn:'',
				modalone:false
			}
		},
		methods:{

			ToRecharge(){
				 this.$router.push({path:'/recharge',query:{id:this.base.tenantId}})
			}
		},
		mounted(){
			this.id = this.$route.query.orderId;
			console.log(this.id)
			this.get(this.allUrl.findRechargeRecord,{rechargeRecordId:this.id}).then((res)=>{
				console.log(res)
				this.base = res.data.data;
				this.base.createTime = this.changeTime(this.base.createTime)
			})
		}
		}
</script>

<style scoped="scoped" lang="scss">
   .rechargeReadOnly{
   		text-align: left;
   	  width: 100%;
   	  height: 600px;
   	  background: #ffffff;
   	  margin-left: 40px;
   	  margin-top: 40px;
   	  .header{
   	  	width: 100%;
   	  	height: 60px;
   	  	border-bottom:1px solid #28282E;
		display: flex;
		justify-content: space-between;
		padding: 0 50px;
		align-items: center;
		font-size: 16px;
   	  }
   	  .chargeMessage{
   	  	height: 540px;
   	  	width: 100%;
   	  	display: flex;
   	  	flex-direction: column;
   	  	justify-content: space-around;
   	  	font-size: 16px;
   	  	padding-left: 50px;
   	  	div{
   	  		height: 30px;
			font-size: 18px;
			line-height: 30px;
   	  		display: flex;
   	  		span:nth-child(1){
   	  			display: block;
   	  			width: 150px;
   	  		}
   	  		span:nth-child(2){
   	  			color: #8C8C8C;
   	  		}
   	  		
   	  	}
   	  }
   }
.ivu-modal-body{
	div{
			height: 30px;
			font-size: 18px;
			line-height: 30px;
   	  		display: flex;
   	  		span:nth-child(1){
   	  			display: block;
   	  			width: 150px;
   	  		}
   	  		span:nth-child(2){
   	  			color: #8C8C8C;
   	  		}
   	  		
   	  	
	}
}
#qian{
	color: red;
	font-size:20px;
}
</style>