<template>
  	<div class="hostRegister">
  		<el-form :model="form" :rules="rules" ref="form" class="formBox">
  		<div class="content">
  			<div class="left">
  					<div class="p1">账户信息</div>

			  			<el-form-item prop="email" :rules="{validator:validator_userName,trigger:'blur'}">
			          <el-input v-model="form.email" @keyup.enter.native="submit('form')" placeholder="请输入确保可用的登录邮箱">
			         
			          </el-input>
			        </el-form-item>


			  			<el-form-item prop="password" :rules="{validator:validator_pass,trigger:'blur'}">
			          <el-input v-model="form.password" @keyup.enter.native="submit('form')" placeholder="请设置密码，需要6～20位英文和数字组合">
			         
			          </el-input>
			        </el-form-item>

			  		<div class="p2">联系人信息</div>

			  			<el-form-item prop="username" :rules="{validator:validator_name,trigger:'blur'}">
			          <el-input v-model="form.username" @keyup.enter.native="submit('form')" placeholder="请输入联系人姓名">
			         
			          </el-input>
			        </el-form-item>


			  			<el-form-item prop="mobile" :rules="{validator:validator_phone,trigger:'blur'}">
			          <el-input v-model="form.mobile" @keyup.enter.native="submit('form')" placeholder="请输入手机号码">
			         
			          </el-input>
			        </el-form-item>
							<el-form-item prop="qq" :rules="{validator:validator_qq,trigger:'blur'}">
			          <el-input v-model="form.qq" @keyup.enter.native="submit('form')" placeholder="请输入QQ号码">
			         
			          </el-input>
			        </el-form-item>
  			</div>
  			<div class="right">
			  		<div class="p3">公司信息</div>
  					<el-form-item prop="companyName" :rules="{validator:validator_company,trigger:'blur'}">
			          <el-input v-model="form.companyName" @keyup.enter.native="submit('form')" placeholder="请输入公司全称">
			         
			          </el-input>
			        </el-form-item>
			        <el-form-item prop="companyAddr" :rules="{validator:validator_adr,trigger:'blur'}">
			          <el-input v-model="form.companyAddr" @keyup.enter.native="submit('form')" placeholder="请输入公司地址">
			         
			          </el-input>
			        </el-form-item>
			        <el-form-item prop="businessNum" :rules="{validator:validator_ZZnumber,trigger:'blur'}">
			          <el-input v-model="form.businessNum" @keyup.enter.native="submit('form')" placeholder="请输入营业执照注册号">
			         
			          </el-input>
			        </el-form-item>
			  		<div class="p3">上传营业执照：</div>
			        
			        <el-form-item prop="businessLicense">
			      			  <upLoad ref="businessLicense" :size=1 @update="businessLicense" @remove="removeIdPic"></upLoad>
			        </el-form-item>
			        

  			</div>

  		</div>
  			<div class="btn" @click="submit('form')">
  				注册
  			</div>
  			<div class="operation">
                <input type="checkbox" id="mycheck" v-model="ischeck">
                <label for="mycheck"></label>
                <label for="mycheck"><span>我已阅读并同意</span></label>
                <span style="color: #525dd2;">《xx媒体服务条款》</span>
                <div class="forget" @click="toLogin">已有账号? <span @click="tologin">马上登陆</span></div>
        </div>
        <div class="worn" v-if="worn">您还未阅读条款</div>
  		</el-form>
  	</div>
</template>
<script>
import { register } from '@/api/account'
  import upLoad from '@/components/upLoad'
export default {
  name: 'hostRegister',
  components: {
  	upLoad
  },
  props:['message'],
  data() {
    return {
    	whichRegister:'first',
      loading: false,
    	form:{
    		businessLicense:'',
    		status:1,
    		type:'advertiser',
    		roleIdList: [2]
    	},
    	ischeck:false,
    	worn:false,
		rules:{
			businessLicense:[
				{ required: true, message: '请上传营业执照',trigger:'change'}
			]
		}

    }
  },
  watch:{
  	message:function(newval,oldval){
  		this.whichRegister = newval
  	}
  },
  methods: {
  	    async register() {
      try {
        this.loading = true
        let res = await register({ ...this.form })
        console.log(res)
         this.$message({
          type: "success",
          message: '注册成功'
        })
  		this.$emit("showLogin","showLogin")
         
      } catch (err) {
        console.log(err)
        this.$message({
          type: "error",
          message: err.msg
        })
      }
    },
  		tologin(){
  		 this.$emit("showLogin","showLogin")
  	},
  	 validator_userName(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入账号'));
      } else {
        callback()
      }
    },
        validator_pass(rule, value, callback) {
      	    let aa = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入密码'));
      } else {
      	if (aa.test(value) === true) {
        	callback()      		
      	}else{
        callback(new Error('请输入6-20位英文和数字组合的密码'));
      	}

      }
    },
    validator_name(rule, value, callback){
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入联系人姓名'));
      } else {
        callback()
      }
    	
    },
    validator_phone(rule, value, callback){
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入手机号'));
      } else {
        callback()
      }
    },
    validator_qq(rule, value, callback){
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入qq'));
      } else {
        callback()
      }
    },  
    validator_company(rule, value, callback){
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入公司名称'));
      } else {
        callback()
      }
    },
     validator_adr(rule, value, callback){
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入公司地址'));
      } else {
        callback()
      }
    },
         validator_ZZnumber(rule, value, callback){
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入营业执照编号'));
      } else {
        callback()
      }
    },
                //营业执照上传
    businessLicense(){
    if(typeof(this.form.businessLicense )=="string"){
    		if (this.form.businessLicense !== "") {
    		this.form.businessLicense = this.form.businessLicense.split(',')
    		}else{
    			this.form.businessLicense = []
    		}
    	}
		this.form.businessLicense.push(this.$store.state.shareUrl)
       this.form.businessLicense =  this.form.businessLicense.toString()
        this.$refs.form.validateField('businessLicense')     
       
//        console.log(this.$store.state.shareUrl.url)
    },
       removeIdPic(){
            	this.form.businessLicense = ""
            },
  		toLogin(){
  			this.$router.push("/login")
  		},
  		submit(formName){
  			console.log(this.whichRegister)//用于区分注册广告主还是媒体
  			
      this.$refs[formName].validate((valid) => {
        if (valid) {//表单输入完成
						if(this.ischeck==false){//没有阅读条款
			    		this.worn = true
         				 return false;
			    	}else{
			    		this.worn = false;
			    		console.log(this.form)
			    		this.register();
			    	}
        } else {
          return false;
        }
      })
    	
  			
  		}
  	},
  created() {

  },
  mounted() {

  }
}
</script>
<style lang='scss' scoped>
	.hostRegister{
width: 100%;
height: 100%;
 .formBox{
 	width: 100%;
 	height: 100%;
	.content{
		width: 100%;
		height:385px;
				display: flex;
			padding: 0 20px;
				.left,.right{
			flex: 1;
			height: 100%;
		}
		.left{
			padding-right: 13px;
			 .p1,.p2{
			 	 width: 100%;
			 	 height: 20px;
			 	 line-height: 20px;
			 	 font-size: 16px;
			 	 margin-bottom: 10px;
			 }
		}
		.right{
			padding-left: 13px;
			
			.p3{
			 	 width: 100%;
			 	 height: 20px;
			 	 line-height: 20px;
			 	 font-size: 16px;
			 	 margin-bottom: 10px;
			 
				
			}
		}

		
	}
	.btn{
		width: 70%;
		height: 50px;
		color: #ffffff;
		margin: 0 auto;
		background: #525dd2;
		text-align: center;
		line-height: 50px;
	}
		.operation{
						width: 70%;
						height: 25px;
						margin: 0 auto;
                      display: flex;
                      align-items: center;
                      #mycheck + label{
                      	height: 18px;width: 18px;
                      	border-radius: 5px;
                      	border: 1px solid #aec3ec;
                        cursor: pointer;}
                    #myCheck:checked + label{
                            background-color: #dbdada;
                        }
                        input{display: none;}
                       input[type="checkbox"]:checked + label::before {
                            content: "\2713";
                            font-size: 20px;
                            position: relative;
                            top: -10px;
                            left: 2px; 
                            color: #4069c1;
                        }
                        span{font-size: 12px;display: inline-block;height: 28px;line-height: 28px;
                            margin-left: 10px;color: #666666;
			
                           cursor: pointer;
                            }
                        .forget{height: 28px;
                        line-height: 28px;
                        font-size: 12px;
                        color: #666666;
                                position: absolute;
                                right: 15.7%;

                                cursor: pointer;
                                span{
															text-decoration: underline;
                                	color: #525dd2;
                                }
                            }
                     }
                 .worn{
                 	width: 60%;
                 	margin: 0 auto;
                 	color: red;
                 	font-size: 12px;
                 }
                 
	}
	}




</style>
