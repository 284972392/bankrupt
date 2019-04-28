<template>
	<div class="recharge">
		<div class="header">
			<span>充值申请</span>
			<Button @click="addRecharge">提交</Button>
		</div>
		<div class="chargeMessage">
        	<div><span>商户名称</span><span>{{base.name}}</span></div>
        	<div><span>商户编号</span><span>{{base.id}}</span></div>
        	<div>
        		<span>充值金额</span>
				   <InputNumber v-model="rechargeMn" placeholder="请输入金额" :min="1" :formatter="value => `${value}元`" :parser="value => value.replace('元', '')" style="width:150px;"></InputNumber>
                 <!-- <input v-model="rechargeMn" placeholder='请输入金额'></Input>元  -->
        	</div>
			<div>
				<span>是否已充值</span>
				<RadioGroup v-model="preloaded">
					<Radio label='false'>
						<span>已充值</span>
					</Radio>
					<Radio label='true'>
						<span>未充值</span>
					</Radio>
				</RadioGroup>
			</div>
        	<div><span>当前余额</span><span>{{base.balance}}</span></div>
		</div>
		
		
		<Modal
	        title="确认充值信息"
	        v-model="modalone"
	        @on-ok="okone"
	        width="400"
	        class-name="delateBox">
	        <div><span>商户名称</span><span>{{base.name}}</span></div>
        	<div><span>商户编号</span><span>{{base.id}}</span></div>
        	<div>
        		<span>充值金额</span>
                <span id="qian">{{rechargeMn}}</span>元
        	</div>
			<div>
				<span>是否预充值</span>
				<span>{{preloaded=='false'?'否':'是'}}</span>
			</div>
	    </Modal>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				base:{},
				rechargeMn:null,
				modalone:false,
				preloaded:'false'
			}
		},
		methods:{
			okone(){
			
				this.$http({
						method:'POST',
						url: this.allUrl.addRechargeRecord,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:{
							amount:this.rechargeMn,
							tenantId:this.base.id,
							tenantName:this.base.name,
							preloaded:this.preloaded,
							rechargeType:'0'
						}
				}).then((res)=>{
					console.log(res)
					if(res.data.ret == "ok"){
						this.$router.push({path:'/rechargeReadOnly',
											query:{
												orderId:res.data.data.rechargeRecordId
											}
						})
					}
				})
			},
			addRecharge(){
				if (this.rechargeMn == null) {
						this.$Message.warning("大哥，咱先说钱的事")
				}else{
					this.modalone = true
				}
				


			}
		},
		mounted(){
			this.id = this.$route.query.id;
			this.get(this.allUrl.findTenant,{tenantId:this.id}).then((res)=>{
				console.log(res)
				this.base = res.data.data;

			})
		}
		}
</script>

<style scoped="scoped" lang="scss">
   .recharge{
   		text-align: left;
   	  width: 100%;
   	  height: 300px;
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
   	  	height: 240px;
   	  	width: 100%;
   	  	display: flex;
   	  	flex-direction: column;
   	  	justify-content: space-around;
   	  	font-size: 16px;
   	  	padding-left: 50px;
   	  	div{
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