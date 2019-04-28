<template>
  	<div class="changePsw">
  		<div class="header">忘记密码</div>
      <el-form :model="changeForm" ref="changeForm" class="mt20">
        <el-form-item prop="email" :rules="{validator:validator_userName,trigger:'blur'}">
          <el-input v-model="changeForm.email" @keyup.enter.native="submit('changeForm')" placeholder="请输入确保可用的登录邮箱">
          </el-input>
        </el-form-item>
		<el-form-item class="verification" prop="validateCode" :rules="{validator:validator_verification,trigger:'blur'}">
          <el-input class="Input" v-model="changeForm.validateCode" @keyup.enter.native="submit('changeForm')" placeholder="请输入验证码">
          </el-input>
  		<div class="get_code">
			<span v-if="show" class="getcode" @click="getCode">获取验证码</span>
			<span v-if="!show" class="count">约{{count}}s后获取</span>
		</div>
        </el-form-item>
        <el-form-item prop="newPassword1" :rules="{validator:validator_password,trigger:'blur'}">
          <el-input type="password" v-model="changeForm.newPassword1" @keyup.enter.native="submit('changeForm')" placeholder="6～20字母与数字组合的新密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" :rules="{validator:validator_surepassword,trigger:'blur'}">
          <el-input type="password" v-model="changeForm.newPassword" @keyup.enter.native="submit('changeForm')" placeholder="请确认新密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submit('changeForm')" :loading="loading">确认修改</el-button>
        </el-form-item>
        <div class="noId">还没有账号？<span @click="toReGister">创建新账号</span></div>
        
      </el-form>
  	</div>

</template>
<script>
	import { sendEmail,forgetPsw } from '@/api/account'
export default {
  name: 'changePsw',
  components: {

  },
  data() {
    return {
    	show:true,
  		count: '',
		timer: null,
      loading: false,
    	changeForm:{}
    }
  },
  watch:{
  	
  },
  methods: {
  	    validator_userName(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入账号'));
      } else {
        callback()
      }
    },
    validator_verification(rule, value, callback){
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入验证码'));
      } else {
        callback()
      }
    },
      	    validator_password(rule, value, callback) {
      	    	
      	    let aa = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入新密码'));
      } else {
      	if (aa.test(value) === true) {
        	callback()      		
      	}else{
        callback(new Error('请输入6-20位英文和数字组合的密码'));
      		
      	}

      }
    },
      	    validator_surepassword(rule, value, callback) {
      	    	
      	    let aa = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请确认信密码'));
      } else {
      	if (aa.test(value) === true) {
        	callback()      		
      	}else{
        callback(new Error('请输入6-20位英文和数字组合的密码'));
      		
      	}

      }
    },
  	 submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        	if (this.changeForm.newPassword1 == this.changeForm.newPassword) {
        		this.forgetPsw()
        	}else{
        		this.$message({
		          type: "warning",
		          message: '两次输入的密码不同'
		        })
        	}

        } else {
          return false;
        }
      })
    },
    toReGister(){
    	this.$emit("toGister","toGister")
    },
    //验证码
	getCode(){
		console.log(this.show)
		if(this.changeForm.email == undefined ||this.changeForm.email == ""){
			  this.$message({
		          type: "warning",
		          message: '请输入正确的邮箱'
		        })
		}else{
			//倒计时
		const TIME_COUNT = 60;
		if (!this.timer) {
		this.count = TIME_COUNT;
		this.show = false;
		this.timer = setInterval(() => {
		if (this.count > 0 && this.count <= TIME_COUNT) {
					this.count--;
					} else {
					this.show = true;
					clearInterval(this.timer);
					this.timer = null;
					}
				}, 1000)
		};
			
			
		//调接口（验证码的)
		this.sendEmail()
		}

	},
	async forgetPsw(){
		try{
       	 let res = await forgetPsw({...this.changeForm})
       	 console.log(res)
			this.$message({
		          type: "success",
		          message: res.data.msg
		        })
			
			if(res.data.msg == 'success'){
				console.log("????")
				this.$emit("showLgin","showLogin")
			}
		}catch(err){
        console.log(err)
        this.$message({
          type: "error",
          message: err.msg
        })
		}
	},
	async sendEmail(){
		try{
       	 let res = await sendEmail({email:this.changeForm.email})
				console.log(res)
		this.$message({
          type: "success",
          message: res.data.msg
       })
		
		}catch(err){
        this.$message({
          type: "error",
          message: err.msg
        })
	
		}
	}
  },
  created() {

  },
  mounted() {

  }
}
</script>
<style lang='scss' scoped>

	.changePsw{
  position: absolute;
   top: 22.96%;
   left: 32.5%;
 height: 470px;
 width: 35%;
 background: #ffffff;
 border-radius: 10px;
 overflow: hidden;
 .header{
 	width: 100%;
 	height: 60px;
 	background: #f2f2f5;
 	text-align: center;
 	line-height: 60px;
 	color: #525dd2;
 	font-size: 18px;
 	font-weight: 600;
 }
 .mt20{
 	width: 100%;
 	height:390px;
 	padding: 20px 60px;
 	.verification{
		position: relative;
		.get_code{
 		position: absolute;
 		right: 0px;
 		top: 0;
 	}
 	}
 	.get_code{
 		width: 100px;
 		height: 100%;
 		background: #409eff;
 		text-align: center;
 		border-top-right-radius: 5px;
 		border-bottom-right-radius: 5px;
 		
 	}
 	
 	.noId{
	width: 100%;
	height: 53px;
	text-align: center;
	line-height: 53px;
	span{
		color: #525dd2;
	}
}
 }
 
 }


</style>
