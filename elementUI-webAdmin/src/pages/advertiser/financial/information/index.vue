<template>
    <div class="inform">
        	<div class="bigBox">
        		<div class="left">
        			<div class="img"></div>
        			<div class="left_right">
        				<div class="left_right_top">账户余额：<span>{{user.balance}}</span></div>
        				<div class="left_right_bot">账户预算(元/天)：{{user.isLimit=="1"?user.budget:"不限"}}  
        					<div style="display: inline-block;margin-left: 30px;width: 50px;height: 30px;"><el-button @click="open1" type="primary" round>管理</el-button></div>
        				</div>
        				
        			</div>
        		</div>
        		<div class="right">今日消耗(元)：{{user.consume}}</div>
        	</div>
        	  <el-dialog title="设定每日限额" :visible.sync="dialogFormVisible" width="500px">
					  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
					    <el-form-item label="" :label-width="formLabelWidth">
					     	 <el-radio v-model="ruleForm.isLimit" label="0">不限</el-radio>
  							 <el-radio v-model="ruleForm.isLimit" label="1">限制</el-radio>
					    </el-form-item>
					    <el-form-item label="" prop="budget1" :label-width="formLabelWidth" v-if="ruleForm.isLimit=='1'" :rules="[{required: true,validator:validator_bidding, trigger: 'blur'}]">
					    	<el-input v-model.number="ruleForm.budget1" placeholder="请输入限制金额">
                      			  <template slot="append">元/天</template>
                   			 </el-input> 	
					    </el-form-item>
					  </el-form>
	 				 <div slot="footer" class="dialog-footer">
						    <el-button @click="dialogFormVisible = false">取 消</el-button>
						    <el-button type="primary" @click="next('ruleForm')">确 定</el-button>
					  </div>
				</el-dialog>
    </div>
  
</template>

<script>
	import {userInfo,userUpdate} from "@/api/account"
    export default {
        name:'inform',
        data(){
        	return{
        		user:{},
        		ruleForm:{
        			isLimit:"0"
        		},
        		dialogFormVisible:false,
        		 formLabelWidth: '0',
        		  rules:{}
        	}
        },
        methods:{
        	   async userInfo(){
        		try{
		        let res = await userInfo({})
        			this.user = res.data.user
        			console.log(this.user)
        		}catch(err){
		        console.log(err)
		        this.$message({
		          type: "error",
		          message: err.msg
		        })
        			
        		}
        	},
        	async userUpdate(){
                this.loading = true
                let res = await userUpdate({...this.ruleForm})
                 this.userInfo()
					console.log(res)
                this.loading = false
        		
        	},
        	open1(){
        		this.dialogFormVisible = true
        	},
           validator_bidding(rule, value, callback) {
           	if (value === '' || value === undefined || value === null) {
		        callback(new Error('请输入密码'));
		      } else if(typeof(value)!=='number') {
                        callback(new Error('输入金额必须为数字'))
                    }else if (value<=0) {
                      callback(new Error('请输入正确金额'))
                    }else{
                        callback()
                    }
            },
            next(ruleForm){
                 this.$refs[ruleForm].validate((valid) => {
                   
                  if (valid) {
                  	this.dialogFormVisible = false
					console.log(this.ruleForm)
					//请求之前 看看radio  如果是1的话  就把后面的参数设为“”
					if( this.ruleForm.isLimit == 1){
						this.ruleForm.budget = this.ruleForm.budget1
					}else {
						let budget = null
						this.ruleForm.budget = null
					}
                 	this.userUpdate();
                 	
                  } else {
                   
                    return false;
                  }
                });
              
            },
    },
       mounted(){
       	this.userInfo()
       }
     }
</script>

<style scoped lang="scss">
 .inform{
 	width: 100%;
 	height: 100%;
 	padding: 10px;
 	.bigBox{
 		width: 100%;
 		height: 200px;
 		background: #ffffff;
 		display: flex;
 		align-items: center;
 		box-sizing: border-box;
 		.left{
 			flex: 1;
 			display: flex;
			padding-left:150px;
 			.img{
 				width: 100px;
 				height: 100px;
 				background: url(../../../../assets/images/MN.jpg) no-repeat center center;
 				background-size:100% 100%;
 			}
 			.left_right{
 				padding-left: 30px;
 				display: flex;
 				flex-direction: column;
 				justify-content: center;
 				.left_right_top{
 					height: 26px;
 					font-size: 19px;
 					span{
 						color: red;
 						font-size: 23px;
 					}
 				}
 				.left_right_bot{
 					height: 50px;
 					line-height: 50px;
 					font-size: 19px;
 				}
 			}
 		}
 		.right{
 			flex: 1;
 			height: 80px;
 			border-left: 1px solid #B5BCC2;
 			text-align: center;
 			line-height: 80px;
 		}
 	}
 }
</style>