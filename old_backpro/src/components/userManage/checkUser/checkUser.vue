<template>
	<div class="checkUser">
		<div class="header">查看用户</div>
	<div class="userTab">
			<router-link to="/checkUser/userBase" tag="div">用户基本信息</router-link>
			<router-link to="/checkUser/taskRecord" tag="div">任务记录</router-link>
			<router-link to="/checkUser/moneyRecord" tag="div">现金收支记录</router-link>
			<router-link to="/checkUser/cornRecord" tag="div">金币收支记录</router-link>
			<router-link to="/checkUser/teamMates" tag="div">团队成员</router-link>
			<router-link to="/checkUser/loginRecord" tag="div">登录记录</router-link>
	</div>

	<router-view></router-view>
	
	</div>

</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped" lang="scss">
   .checkUser{
   	width: 100%;
   	height: 100%;
   	background: #D7DDE4;
   	text-align: left;
   	padding-top: 30px;
   	overflow: scroll;
   	.header{
   		background: #ffffff;
   		width: 100%;
   		margin-left: 30px;
   		height: 40px;
   		line-height: 40px;
   		font-size: 16px;
   		padding-left: 30px;
   		color: #000000;
   		font-weight: 600;
   		border-bottom: 1px solid #CCCCCC;

   	}
   	.userTab{
   		width: 100%;
   		height: 40px;
   		background: #ffffff;
   		margin-left: 30px;
   		display: flex;

   		justify-content: space-around;
   		div{
   			flex: 1;
   			height: 100%;
   			line-height: 40px;
   			text-align: center;
   			font-size: 16px;
   			color: gray;
   			font-size: 600;

   			
   		}
   		.router-link-active{
   			color: dodgerblue;
   		}
   	}
   }
</style>