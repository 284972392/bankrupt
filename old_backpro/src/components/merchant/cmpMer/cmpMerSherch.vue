<template>
	<div class="cmpMerSherch">
		<div class="header">查看企业商户</div>
		<div class="boxTab">
			<router-link to="/cmpMerSherch/cmpMerBase" tag="div">商户基本信息</router-link>
			<router-link to="/cmpMerSherch/cmpMerBill" tag="div">充值信息</router-link>
			<router-link to="/cmpMerSherch/cmpMerMission" tag="div">任务信息</router-link>
			<router-link to="/cmpMerSherch/cmpMerYh" tag="div">优惠信息</router-link>
			<router-link to="/cmpMerSherch/cmpMerHs" tag="div">划算信息</router-link>
		</div>
		<router-view v-bind:id_ = "id" style="flex: 1;"></router-view>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				id:''
			}
		},
		method:{
			
		},
		beforeMount(){
				this.id = this.$route.query.id
		}
	}
</script>

<style scoped lang="scss">
.cmpMerSherch{
	width: 100%;
	height:100%;
	background: #ffffff;
	display: flex;
	flex-direction: column;
  .header{
  	 text-align: left;
  	 font-size: 18px;
  	 padding-left: 20px;
  	 width: 100%;
  	height: 50px;
  	line-height: 50px;
  	border-bottom: 1px solid #cccccc;
  }
  .boxTab{
  	width: 100%;
  	height:50px;
  	display: flex;
  	justify-content: space-around;
  	font-size: 20px;
  	line-height: 50px;
  	 border-bottom: 1px solid #cccccc;
  }
  .router-link-active{
  	color: deepskyblue;
  }
 }
</style>