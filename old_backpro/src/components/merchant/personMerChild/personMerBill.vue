<template>
	<!--商户名称 编号需要从上级页面传过来-->
	<div class="cmpMerBill">
		<div class="billList">充值列表</div>
		<div class="billBox" v-for="data in billList">
			<table border="" cellspacing="0" cellpadding="0">
				<tr class="thd"><td>序号</td><td>充值编号</td><td>充值金额（元）</td><td>账户余额（元）</td><td>充值人员</td><td>充值状态</td><td>充值时间</td><td>操作</td></tr>
				<tr><td>{{data.id}}</td><td>{{data.number}}</td><td class="redBill">{{data.billNum.toFixed(2)}}</td><td>{{data.sum.toFixed(2)}}</td><td>{{data.who}}</td><td>{{data.state}}</td><td>{{data.billTime}}</td><td class="look" @click="look(data)">查看</td></tr>
			</table>
		</div>
	<div class="messageBox" v-if="messageBox">
		<div class="header">
			<div></div>
			<div>查看</div>
			<div @click="cha"></div>	
		</div>
		<div class="center">
			<div><span>商户名称</span><span>杭州夏服科技有限公司</span></div>
			<div><span>商户编号</span><span>1324567</span></div>
			<div><span>充值金额</span><span>{{boxMessage.billNum}}</span></div>
			<div><span>充值编号</span><span>{{boxMessage.number}}</span></div>
			<div><span>充值状态</span><span>{{boxMessage.state}}</span></div>
			<div><span>充值时间</span><span>{{boxMessage.billTime}}</span></div>
			<div><span>当前余额</span><span>{{boxMessage.sum}}</span></div>
			<div v-show="checkState"><span>审核时间</span><span>{{boxMessage.checkTime}}</span></div>
		</div>
		<div class="bottom" v-show="checkState2">
			<div><span>拒绝原因:</span><span>{{boxMessage.reson}}</span></div>
			<div><span>附件</span><img :src=boxMessage.fuJian alt="" /></div>
		</div>
	</div>
		
	</div>
</template>

<script>
	export default{
		props:["id_"],
		data(){
			return{				
				boxMessage:{},
				messageBox : false,	
				//审核进度,是否显示审核进度
				checkState:false,
				//是否显示审核失败原因和附件
				checkState2:false,
				billList:[{
					id:1,
					number:13251434,
					billNum:111.00,
					sum:1111.01,
					who:'格格吉祥',
					state:'待审核',
					billTime:'2018-4-17 17：05：13'
				},
				{
					id:2,
					number:13251434,
					billNum:111.00,
					sum:1111.01,
					who:'格格吉祥',
					state:'通过申请',
					checkTime:'2018-4-17 17：05：13',
					billTime:'2018-4-17 17：05：13',								
				},
				{
					id:3,
					number:13251434,
					billNum:111.00,
					sum:1111.01,
					who:'格格吉祥',
					state:'申请不通过',
					billTime:'2018-4-17 17：05：13',
					checkTime:'2018-4-17 17：05：13',
					reson:'因为长得太帅， 不给你通过，因为长得太帅， 不给你通过因为长得太帅， 不给你通过因为长得太帅， 不给你通过因为长得太帅， 不给你通过',
					fuJian:'../../../../static/login.png'
				}]
			}
		},
		methods:{
			look(data){
				this.boxMessage = data;
				this.messageBox = true;
				if(data.state == "待审核"){
					this.checkState = false
				}else{
					this.checkState = true					
				};
				if (data.state == "申请不通过") {
					this.checkState2 = true										
				}else{
					this.checkState2 = false										
				}
				
			},
			cha(){
				this.messageBox = false
			}
		},
		mounted(){
			console.log(this.id_)
		}
	}
</script>

<style scoped lang="scss">
.cmpMerBill{
	width: 100%;
	height: 100%;
	overflow: auto;
	position: relative;
	.billList{
 		height: 40px;
 		padding-left: 20px;
 		line-height: 40px;
 		font-size: 20px;
 		border-left: 10px solid deepskyblue;
 		margin-left: 50px;
 		margin-top: 30px;
 		
		
	}
	.billBox{
		width: 80%;
		margin-left: 10%;
		table{
			width: 100%;
			height: 100px;
			margin-bottom: 20px;
			text-align: center;
			.thd{
				background: #CCCCCC;
			}
			.redBill{
				color: red;
			}
		}
	}
	.messageBox{
		background: #ffffff;
		font-size: 21px;
		z-index: 30;
		width: 700px;
		height: 400px;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border: 1px solid royalblue;
		display: flex;
		flex-direction: column;
		.header{
			width: 100%;
			height: 80px;
			background: #cccccc;
			display: flex;
			justify-content: space-between;
			text-align: center;
			line-height: 80px;
			div{
				width: 100px;
			}
			div:nth-child(3){
				background: url(../../../assets/cha.png) no-repeat center center;
			}
		}
		.center{
			width: 100%;
			height:220px;
			display: flex;
			flex-wrap: wrap;
			div{
				width: 50%;
				font-size: 15px;
				span:nth-child(1){
					padding-left: 20px;
				}
				span:nth-child(2){
					margin-left: 30px;
				}
			}
		}
		.bottom{
			width: 100%;
			flex: 1;
			border-top: 1px solid #8C8C8C;
			display: flex;
			div{
				flex: 1;
				padding: 10px 20px;
				font-size: 14px;
				display: flex;
				span:nth-child(1){
					width: 70px;
				}
				span:nth-child(2){
					flex: 1;
				}
				img{
					width: 100px;
					height: 100%;
				}
			}
		}
	}
}
</style>