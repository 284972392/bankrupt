<template>
	<div class="bigBox">
  <div class="login">
  	<div class="bg">
  	<div class="logo">
  		        <img src="../../assets/images/logo.png" alt="">
            <p>广告后台管理系统</p>
  	</div>
	<register @showLgin="isShowLogin" v-if="isRegister"></register>
  	<changePsw @toGister="isShowRegister" @showLgin="isShowLogin" v-if="isChangePsw"></changePsw>
    <div class="login-panel"  v-if="isLogin">
      <h2 class="login-title tc">登录</h2>
      <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   				<el-menu-item index="1">广告主登录</el-menu-item>
   				<el-menu-item index="2">媒体登录</el-menu-item>
   				<el-menu-item index="3">平台方登录</el-menu-item>
      </el-menu>-->

      <el-form :model="form" ref="form" class="mt20">
        <el-form-item prop="email" :rules="{validator:validator_userName,trigger:'blur'}">
          <el-input v-model="form.email" @keyup.enter.native="submit('form')" placeholder="请输入确保可用的登录邮箱">
            <template slot="prepend">
              <img :src="require('@/assets/images/user.png')" width="18" height="14">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="{validator:validator_pass,trigger:'blur'}">
          <el-input type="password" v-model="form.password" @keyup.enter.native="submit('form')" placeholder="请输入登录密码，需要6～20位英文和数字组合">
            <template slot="prepend">
              <img :src="require('@/assets/images/pass.png')" width="18" height="15">
            </template>
          </el-input>
        </el-form-item>
        <div class="operation">
                <input type="checkbox" id="mycheck2" v-model="ischeck">
                <label for="mycheck2"></label>
                <label for="mycheck2"><span>记住密码</span></label>
                <div class="forget" @click="forgetPsw">忘记密码?</div>
        </div>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submit('form')" :loading="loading">登录</el-button>
        </el-form-item>
        <div class="noId">还没有账号？<span @click="toReGister">创建新账号</span></div>
      </el-form>
    </div>
    </div>
  </div>

 </div> 
</template>
<script>
import { login, my } from '@/api/account'
import register from '@/components/register/index'
import changePsw from '@/components/changePsw/index'
export default {
  name: 'login',
  components: {
			register,changePsw
  },
  data() {

    return {
    	//广告主：1 ；  媒体：2 ； 平台方：3
    	whichHost:1,
        ischeck:false,
    	activeIndex:"1",
      loading: false,
      rememberPass: false,
      form: {
        email: '',
        password: ''
      },
      isLogin:true,
      isRegister:false,
      isChangePsw:false,
      ischeck:false
    }
  },
  	methods: {
  		isShowLogin(data){
  			if (data == "showLogin") {
  				this.isLogin = true;
				this.isChangePsw = false;
  				this.isRegister =false
  			}
  		},
  		isShowRegister(data){
  			if (data == "toGister") {
  				this.isLogin = false;
				this.isChangePsw = false;
  				this.isRegister =true
  			}
  		},
  	//注册
  	toReGister(){
		this.isRegister = true
		this.isChangePsw = false;
		this.isLogin = false
  	},
  	//忘记密码
  	forgetPsw(){
  		console.log("忘记密码")
		this.isChangePsw = true;
		this.isLogin = false;
		this.isRegister = false;
  	},
  	 handleSelect(key, keyPath) {
        this.whichHost = key;
      },
    validator_userName(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入账号'));
      } else {
        callback()
      }
    },
    validator_pass(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入密码'));
      } else {
        callback()
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false;
        }
      })
    },
//  async my() {
//    try {
//      this.loading = true
//      let res = await my()
//      this.$message({
//        type: "success",
//        message: '登录成功'
//      })
//      this.$store.dispatch('setUserInfo', res.data)
//      this.$store.dispatch('delAllViews')
//      this.$router.push('/')
//    } catch (err) {
//      this.loading = false
//      this.$message({
//        type: "error",
//        message: err.msg
//      })
//    }
//
//  },
    async  login() {
      try {
        let res = await login({ ...this.form })
        console.log(res)
         this.$message({
          type: "success",
          message: res.data.msg
        })
         if(res.data.msg == "success"){
    	    this.loading = true
         	   if(this.ischeck){
		            let info = {email:this.form.email,password:this.form.password,ischeck:true}
		            info = JSON.stringify(info)
		            localStorage.setItem('autoLogin',info)
		        }else{
		            localStorage.removeItem('autoLogin')
		        }
		         this.$store.dispatch('setUserInfo', res)
		       	 this.$store.dispatch('delAllViews')
		       	 
		       	 //放vux里面 监管token
		       	 let data = res.data.token
		       	 console.log(data + "172")
				 this.$store.commit('set_token', data)
				 
				 
             this.$router.push('/')
             
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
    }
  },
  created() {

  },
  mounted() {
            let info = JSON.parse(localStorage.getItem('autoLogin'))
            if(info){
                this.form.email = info.email
                this.form.password = info.password
                this.ischeck = info.ischeck
            }
  }
}
</script>
<style lang='scss' scoped>
.bigBox{
	 width: 100%;
  height: 100%;

.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../../assets/images/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  .bg{
  	width: 100%;
  	height: 100%;
  	background: rgba(0,0,0,.5);

	.logo{
						width: 100%;
            position: absolute;
            top: 13.5vh;
            /*left: 37vw;*/

            display: flex;
            justify-content: center;
            
            img{height: 2.66vw;width: 2.66vw;}
            p{height: 2.66vw;line-height: 2.66vw;font-size: 2.12vw;
                color: #ffffff;margin-left: 1.59vw;}
        
		
	}
	.operation{
									margin-bottom: 3.425vh;
                      margin-top: 2.82vh;
                      display: flex;
                      #mycheck2 + label{
                      	height: 28px;width: 28px;
                      	border-radius: 5px;
                      	border: 2px solid #aec3ec;
                        cursor: pointer;}
                    #mycheck2:checked + label{
                            background-color: #dbdada;
                        }
                        input{display: none;}
                       input[type="checkbox"]:checked + label::before {
                            content: "\2713";
                            font-size: 20px;
                            position: relative;
                            top: -2px;
                            left: 4px; 
                            color: #4069c1;
                        }
                        span{font-size: 15px;display: inline-block;height: 28px;line-height: 28px;
                            margin-left: 10px;color: #666666;
			
                           cursor: pointer;
                            }
                        .forget{height: 28px;
                        line-height: 28px;
                        font-size: 15px;
                        color: #666666;
                                position: absolute;
                                right: 14.7%;
															text-decoration: underline;
                                cursor: pointer;
                            }
                     }
.el-input-group__prepend{
	background-color: #ffffff!important;
}
.noId{
	width: 100%;
	height: 73px;
	text-align: center;
	line-height: 73px;
	span{
		color: #525dd2;
	}
}
}

.login-panel {
	min-width: 400px;
  position: absolute;
   top: 22.96%;
   left: 35%;
 height: 430px;
 width: 30%;
 background: #ffffff;
 border-radius: 15px;
  padding: 15px 35px 15px 35px;
}

.login-title {
height: 50px;
line-height: 50px;
  font-size: 26px;
  font-weight: 400;
  color: #525dd2;
  text-align: center;
}
  }
}
  
</style>
