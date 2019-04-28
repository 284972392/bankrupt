<template>
	<div class="customerInformation">
		<el-row type="flex">
			<el-col style="text-align: right;width: 30%;">
				<div style="height: 60px;line-height: 60px;">公司全名：</div>
				<div style="height: 60px;line-height: 60px;">营业执照注册号：</div>
				<div style="height: 100px;line-height: 60px;">营业执照照片：</div>
				<div style="height: 60px;line-height: 60px;">公司地址：</div>
			</el-col>
			<el-col style="margin-left: 50px;">
				<div style="height: 60px;line-height: 60px;">{{user.companyName}}</div>
				<div style="height: 60px;line-height: 60px;">{{user.businessNum}}</div>
				<div style="height: 100px;line-height: 60px;"><img style="width: 100px;height: 100px;" :src="'http://'+user.businessLicense" alt="" /></div>
				<div style="height: 60px;line-height: 60px;">{{user.companyAddr}}</div>
				
			</el-col>
		</el-row>
		<div class="xian"></div>
		<div class="lianxi">联系人信息</div>
		<div class="readOnly" v-if="readOnly">
			<el-row type="flex">
				<el-col style="text-align: right;width: 30%;">
					<div style="height: 60px;line-height: 60px;">注册邮箱：</div>
					<div style="height: 60px;line-height: 60px;">联系人姓名：</div>
					<div style="height: 60px;line-height: 60px;">手机号码：</div>
					<div style="height: 60px;line-height: 60px;">QQ号码：</div>
				</el-col>
				<el-col style="margin-left: 50px;">
					<div style="height: 60px;line-height: 60px;">{{user.email}}</div>
					<div style="height: 60px;line-height: 60px;">{{user.username}}</div>
					<div style="height: 60px;line-height: 60px;">{{user.mobile}}</div>
					<div style="height: 60px;line-height: 60px;">{{user.qq}}</div>
				</el-col>
			</el-row>
			<div class="change">
				<el-button type="primary" @click="changeBtn" style="margin: 0 auto;">修改</el-button>
			</div>

		</div>
		<div class="update" v-if="!readOnly">
			<el-form :model="form" ref="form" label-width="110px" class="demo-ruleForm">
				<el-form-item label="联系人邮箱:">
		          {{user.email}}
		        </el-form-item>
		        <el-form-item label="联系人姓名:" prop="username" :rules="{validator:validator_username,trigger:'blur'}">
			          <el-input v-model="form.username" @keyup.enter.native="submit('form')" placeholder="请输入联系人姓名">
			         
			          </el-input>
			   </el-form-item>
			   	<el-form-item label="手机号码:" prop="mobile" :rules="{validator:validator_phone,trigger:'blur'}">
			          <el-input v-model="form.mobile" @keyup.enter.native="submit('form')" placeholder="请输入手机号码">
			         
			          </el-input>
		        </el-form-item>
				<el-form-item  label="QQ号码:" prop="qq" :rules="{validator:validator_qq,trigger:'blur'}">
		          <el-input v-model="form.qq" @keyup.enter.native="submit('form')" placeholder="请输入QQ号码">
		         
		          </el-input>
		        </el-form-item>
			</el-form>
			<div class="change">
				<el-button @click="submit('form')" type="primary" style="margin: 0 auto;">保存</el-button>
				<el-button @click="notSub" type="primary" style="margin: 0 auto;">取消</el-button>
			</div>

		</div>
		
	</div>
</template>

<script>
	import {userInfo,userUpdate} from "@/api/account"
	
export default {
        name:'customerInformation',
        data(){
        	return{
        		user:{},
        		form:{},
        		readOnly:true,
        	}
        },
        methods:{
        	async userInfo(){
        		try{
		        let res = await userInfo({})
		        console.log(res)
        			this.user = res.data.user
        		}catch(err){
		        console.log(err)
		        this.$message({
		          type: "error",
		          message: err.msg
		        })
        			
        		}
        	},
        	async userUpdate(){
        		try{
		        let res = await userUpdate({ ...this.form })
        			console.log(res)
        			 this.$message({
		          type: "success",
		          message: res.data.msg
		        })
        		this.userInfo()
				this.readOnly = true
        		
        		}catch(err){
		        console.log(err)
		        this.$message({
		          type: "error",
		          message: err.msg
		        })
        			
        		}
        	
        		
        	},
        	 validator_username(rule, value, callback) {
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
    changeBtn(){
    	this.readOnly = false
    },
      submit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {//表单输入完成
        	this.userUpdate();

        } else {
          return false;
        }
      })
    	
  			
  		},
  		notSub(){
			this.readOnly = true
  			
  		}
       },
       mounted(){
       	this.userInfo()
       }
    }
</script>

<style scoped lang="scss">
.customerInformation{
	width: 100%;
	background: #ffffff;
	/*padding: 30px;*/
	.xian{
		width: 100%;
		height: 1px;
		border-bottom: 1px solid #e4e7ed;
	}
	.lianxi{
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding-left: 30px;
		font-size: 18px;
		color: #555C66;
		font-weight: 600;
	}
	.change{
		width: 100%;
		padding-left: 400px;
	}
	.update{
		margin-left: 14%;
	}
}
.demo-ruleForm{
        width: 60%;
    }
</style>