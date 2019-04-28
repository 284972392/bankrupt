<template>
    <div class="changePsw">

    		<el-form label-width="100px" :model="form" ref="form" class="mt20">
			    	<div style="width: 500px;">
				    			
				      	 <el-form-item label="请输入原密码" prop="oldPassword" :rules="{validator:validator_pass,trigger:'blur'}">
				          <el-input type="password" v-model="form.oldPassword" @keyup.enter.native="submit('form')" placeholder="请输入登录密码">
				            
				          </el-input>
				        </el-form-item>
				        <el-form-item label="请输入新密码" prop="newPassword" :rules="{validator:validator_newpassword,trigger:'blur'}">
				          <el-input type="password" v-model="form.newPassword" @keyup.enter.native="submit('form')" placeholder="请输入新密码，需要6～20位英文和数字组合">
				            
				          </el-input>
				        </el-form-item>
				        <el-form-item label="请确认新密码" prop="password" :rules="{validator:validator_newpassword1,trigger:'blur'}">
				          <el-input type="password" v-model="form.password" @keyup.enter.native="submit('form')" placeholder="请确认新密码">
				            
				          </el-input>
				        </el-form-item>
			    	</div>
		        <div class="btn" style="margin-left: 200px;">
		        	 <el-button type="danger" round @click="submit('form')">确认修改</el-button>
		        </div>
		      </el-form>

      
    </div>
</template>

<script>
	import { changePassword } from '@/api/account'
    export default {
        name:'pswSafe',
        data(){
        	return{
        		form:{}
        	}
        },
        methods:{
        	async changePassword(){
        		
		      try {
		        let res = await changePassword({ ...this.form })
		        console.log(res)
		         this.$message({
		          type: "success",
		          message: res.data.msg
		        })
		         if(res.data.msg == "success"){
		         	 this.$router.push('/login')
		         }else{
		         	this.$message({
		          type: "error",
		          message: res.data.msg
		        })
		         }
		     
		    } catch (err) {
		        console.log(err)
		        this.$message({
		          type: "error",
		          message: err.msg
		        })
		      }
    
        	},
       validator_pass(rule, value, callback){
		      if (value === '' || value === undefined || value === null) {
		        callback(new Error('请输入旧密码'));
		      } else {
		        callback()
		      }
   	 },
   	 validator_newpassword(rule, value, callback){
      	    let aa = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
		      if (value === '' || value === undefined || value === null) {
		        callback(new Error('请输入新密码密码'));
		      } else {
      	if (aa.test(value) === true) {
        	callback()      		
      	}else{
        callback(new Error('请输入6-20位英文和数字组合的密码'));
      		
      	}

      }
   	 
   	 	
   	 },
   	 validator_newpassword1(rule, value, callback){
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
        	if (this.form.password == this.form.newPassword) {
				this.changePassword()
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
        }
    }
</script>

<style scoped lang="scss">
.changePsw{
	width: 100%;
	height: 100%;
	padding:0 20px;
	.mt20{
		width: 100%;
		height: 100%;
		padding: 80px;
		background: #ffffff;
	}
}

</style>