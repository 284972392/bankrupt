<template>
	<div class="userBase">
		<div class="content">
			<div><span>用户编号</span><span>{{base.id}}</span></div>
			<div><span>用户名称</span><span>{{base.nickName}}</span></div>
			<div><span>用户手机号</span><span>{{base.phone}}</span></div>
			<div><span>账户现金余额</span><span>{{base.balance}}(元)</span></div>
			<div><span>账户金币余额</span><span>{{base.goldAmount}}</span></div>
			<div><span>头像</span>
				
				<img :src="base.headPic"/>
			</div>
			<div><span>地区</span><span>{{base.area}}</span></div>
			<div><span>注册时间</span><span>{{base.createTime}}</span></div>
			<div><span>设备类型</span><span>{{base.deviceType}}</span></div>
			<div><span>设备型号</span><span>{{base.deviceModel}}</span></div>
			<div><span>上级用户</span><span>{{base.parentName}}</span></div>
			<div><span>下级总用户</span><span>{{base.subordinateNum}}</span></div>
			<div><span>下级无效用户数</span><span>{{base.invalidSubordinateNum}}</span></div>
			<div><span>最后登录时间</span><span>{{base.lastTime}}</span></div>
			<div><span>微信账号</span><span>{{base.wechat}}</span></div>
			<div><span>微信银行卡姓名</span><span>{{base.wechatCardName}}</span></div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				base:{}
			}
		},
		methods:{
			
		},
		mounted(){
			let userId = localStorage.getItem('appUserId')
			this.get(this.allUrl.findAppUser,{appUserId:userId}).then((res)=>{
				console.log(res)
				this.base = res.data.data
				this.base.lastTime = this.changeTime(this.base.lastTime)
				this.base.createTime = this.changeTime(this.base.createTime)
				let reg = /^(http)|(https).*/.test(this.base.headPic);
				if(!reg){
					this.base.headPic = 'http://'+this.base.headPic;
				}
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
  .userBase{
  	margin-top: 10px;
  	width: 100%;
  	margin-left: 30px;
  	background: #ffffff;
  	padding-top: 40px;
  	padding-left: 50px;
  	.content{
  		width: 100%;
  		height: 100%;
  		display: flex;
  		flex-wrap: wrap;
  		div{
  			width: 49%;
  			height: 60px;
  			line-height: 60px;
  			font-size: 16px;
  			display: flex;
  			span:nth-child(1){
  				display: flex;
  				width: 24%;
  			}
  			span:nth-child(2){
  				margin-left: 30px;
  			}
  		}
  	}
  }
  img{
  	width: 63px;
  	height: 63px;
  	margin-left: 30px;
  }
</style>