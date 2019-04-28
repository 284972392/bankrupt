<template>
	<!--删除的上传还有bug-->
	<div class="addqualification">
      <el-form :model="form" :rule="rule" ref="form" class="mt20">
      	<div class="header">
      		 <el-form-item label="选择广告行业:" prop="industry">
	        	<el-select v-if="disabled" v-model="industry" @change="industryListChange" placeholder="请选择一个行业" size="mini" class="w200" disabled>
	                <el-option v-for="item in industryList" :key="item.label" :label="item.label" :value="item.value">
	           		 </el-option>
	           </el-select>
	           <el-select v-if="!disabled" v-model="industry" @change="industryListChange" placeholder="请选择一个行业" size="mini" class="w200">
	                <el-option v-for="item in industryList" :key="item.label" :label="item.label" :value="item.value">
	           		 </el-option>
	           </el-select>
     	 	 </el-form-item>
     	 	 
      		 <!--<el-form-item label="行业资质要求:">-->
      		 	<div>行业资质要求:</div>
      		 	<div style="margin-left: 80px;" v-for="(data,index) in qualiList">{{index+1}}、{{data.label}}</div>	
     	 	 <!--</el-form-item>-->
     	 	  
      	</div>
      	<div class="upqualiList" v-for="(data,index) in form.upqualiList" v-if="!(industry === '')">
      		<el-form-item :prop="'upqualiList.'+index+'.qualificationName'"  :label="'资质'+(index+1)+'名称:'" :key="data.key" :rules="{validator:validator_qualificationName,trigger:'change'}">
	        	<el-select v-model="data.qualificationName" placeholder="请选择一项资质" size="mini" class="w200">
	                <el-option v-for="item in qualiList" :key="item.label" :label="item.label" :value="item.label">
	           		 </el-option>
	           </el-select>
     	 	  </el-form-item>
     	 	   <el-form-item label="上传资质:" :prop="'upqualiList.'+index+'.url'">
			      	 <upLoad :ref="'url'+index" :size=1 @update="businessLicense(data,index)" @remove="removeIdPic(data)" :defaultPic = "data.url?'http://'+data.url:'' "></upLoad>
			  </el-form-item>
			  <el-form-item label="有效期至:" :prop="'upqualiList.'+index+'.isValid'" :rules="{validator:validator_isValid,trigger:'change'}">
			  		 <el-radio-group v-model="data.isValid">
			  		 	<el-radio :label="1">永久</el-radio>
	  					<el-radio :label="0">非永久</el-radio>
			  		 </el-radio-group>
					
  					 <el-date-picker
  					 		v-if="data.isValid==0"
					      v-model="data.validDate"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
			  </el-form-item>
		  <el-button type="danger" @click="del(index)">删除本条资质</el-button>
			  
      	</div>
	<div class="btngroup" style="width: 100%;height: 90px;display: flex;align-items: center;justify-content: center;" v-if="!(industry === '')">
		  <el-button type="primary" @click="continuAdd">继续添加资质</el-button>
      	  <el-button type="primary" @click="submit('form')">提交审核</el-button>
	</div>
      	 
	  	
	  	 
      </el-form>
	</div>
</template>

<script>
  import upLoad from '@/components/upLoad';
import { qualificationSave, qualificationUpdate} from '@/api/account'
  

	
	export default{
		name:"addqualification",
		 components: {
  			upLoad
  		},
		data(){
			return{
				disabled:false,
				form:{
					upqualiList:[{}]
				},
				rule:{
					upUrl:[
				{ required: true, message: '请上传资质',trigger:'change'}
					]
				},
				flag1:true,
				industry:"",
				industryList:[
				  { value: 0, label: '小额贷款类' },
				  { value: 1, label: '保险类' },
				  { value: 2, label: 'P2P网贷平台' },
				  { value: 3, label: '彩票' },
				  { value: 4, label: '酒类' },
				  { value: 5, label: '教育培训' },
				],
				qualiList:[],
				xiaoE:[
				{value:0,label:'《营业执照》'},
				{value:1,label:'《小额贷款业务资格文件》'}
				],
				baoX:[
				{value:2,label:'《经营保险业务许可证》'},
				{value:3,label:'《经营保险经纪业务许可证》'},
				{value:4,label:'《经营保险公估业务许可证》'},
				{value:5,label:'《经营保险代理业务许可证》'},
				{value:6,label:'《营业执照》'}
				],
				p2p:[
				{value:7,label:'《银行资金托管证明》'},
				{value:8,label:'《营业执照》'}
				],
				caiP:[
				{value:9,label:'《彩票代销合同》'},
				{value:10,label:'《彩票代销证》'},
				{value:11,label:'《彩票合作协议》'},
				{value:12,label:'《营业执照》'}
				],
				jiuL:[
				{value:13,label:'《酒类零售许可证》'},
				{value:14,label:'《酒类批发许可证》'},
				{value:15,label:'《酒类流通备案登记表》'},
				{value:16,label:'《酒类产销许可证》'},
				{value:17,label:'《营业执照》'}
				],
				jiaoY:[
				{value:18,label:'《营业执照》'},
				{value:19,label:'《办学许可证》'},
				{value:20,label:'《招生许可证》'},

				]
			}
		},
		methods:{
			async qualificationUpdate(){
		      try {
		        this.loading = true
		        let res = await qualificationUpdate([...this.form.upqualiList ])
		        console.log(res)
		         this.$message({
		          type: "success",
		          message: '修改成功，等待平台审核'
		        })
		         this.$router.go(-1)
		      } catch (err) {
		        console.log(err)
		        this.$message({
		          type: "error",
		          message: err.msg
		        })
		      }
    
				
			},
			 async qualificationSave() {
			      try {
			        this.loading = true
			        let res = await qualificationSave([...this.form.upqualiList ])
			        console.log(res)
			         this.$message({
			          type: "success",
			          message: '上传成功，等待平台审核'
			        })
		         this.$router.go(-1)
			         
			      } catch (err) {
			        console.log(err)
			        this.$message({
			          type: "error",
			          message: err.msg
			        })
			      }
			    },
			validator_qualificationName(rule, value, callback){
		      if (value === '' || value === undefined || value === null) {
		        callback(new Error('请选择资质名称'));
		      } else {
		        callback()
		      }
		    },
		    validator_isValid(rule, value, callback){
				      if (value === '' || value === undefined || value === null) {
				        callback(new Error('请选择到期时间'));
				      } else {
				        callback()
				      }
		    },
			
			
			
			industryListChange(data){
				this.form.upqualiList = [{}]
				if (data == "0") {
					this.qualiList = this.xiaoE
				}else if(data == "1"){
					this.qualiList = this.baoX
				}else if(data == "2"){
					this.qualiList = this.p2p
				}else if(data == "3"){
					this.qualiList = this.caiP
				}else if(data == "4"){
					this.qualiList = this.jiuL
				}else if(data == "5"){
					this.qualiList = this.jiaoY
				}
			},
			businessLicense(data,index){
				let updom = 'url' + index
				console.log(updom)
				console.log(data)
				data.url = this.$store.state.shareUrl
//      		this.$refs.updom.validateField('upUrl')     
				
			},
			removeIdPic(data){
				data.url = ""
			},
			continuAdd(){
				 this.$nextTick(()=>{
					this.form.upqualiList.push({})
					console.log(this.form)
				 })
				
			},
			del(index){
				 this.$nextTick(()=>{
				 	console.log(this)
				 	console.log(index)
					this.form.upqualiList.splice(index,1)
				 })

			},
			submit(formName){
			      this.$refs[formName].validate((valid) => {
			        if (valid) {//表单输入完成

			        	this.flag1 = true;
			        	let that =this;
			        	this.form.upqualiList.forEach(function(i,index){
			        	//将行业塞进单个资质中
			        	i.industry = that.industry;
			        	//如果非永久， 时间填没有
			        		if (i.isValid == "0") {
			        			if (i.validDate == ""||i.validDate==undefined||i.validDate==null) {
			        				that.$message.error('请填写资质'+(index+1)+'到期时间');	
			        				that.flag1 = false;
			        				return;
			        			}
			        		}else{
			        			i.validDate = ""
			        		};
			        	//判断上传没得，  自带的表单验证 实在是搞不懂异步上传怎么搞了 mmp
			        	if (i.url == ""||i.url==undefined||i.url==null) {
			        		that.$message.error('请上传资质'+(index+1)+'的资质');	
			        				that.flag1 = false;
			        				return;
			        	}
			        	})
			        	if(this.flag1 == true){
			        		if(this.disabled == false){
			        			this.qualificationSave()
			        		}else{
			        			this.qualificationUpdate()
			        			
			        		}
			        	
			        	}
						
			        } else {
			          return false;
			        }
			      })
    	
  			
  		}
		},
		mounted(){	
			let that =this;
			if (sessionStorage.getItem("qualification_list")) {
				if (sessionStorage.getItem("qualification_list") == "new") {
					this.form.upqualiList = []
				}else{
						this.disabled = true
					console.log(JSON.parse(sessionStorage.getItem("qualification_list")))
					this.form.upqualiList = JSON.parse(sessionStorage.getItem("qualification_list"))
					this.form.upqualiList.forEach(function(i,index){
						that.industry =  i.industry
						console.log(i.isValid)
					})
	
					if (this.industry == "0") {
						this.qualiList = this.xiaoE
					}else if(this.industry == "1"){
						this.qualiList = this.baoX
					}else if(this.industry == "2"){
						this.qualiList = this.p2p
					}else if(this.industry == "3"){
						this.qualiList = this.caiP
					}else if(this.industry == "4"){
						this.qualiList = this.jiuL
					}else if(this.industry == "5"){
						this.qualiList = this.jiaoY
					}
				}
				
			}
			console.log(this.form)

		}
		
	}
</script>

<style lang="scss" scoped>
.addqualification{
	width: 100%;
	height: 100%;
	padding: 20px;
	.mt20{
		background: #ffffff;
		.header{
			height: 210px;
		padding-top: 20px;
		padding-left: 100px;
		width: 100%;
		border-bottom: 1px solid #e4e7ed;
		}
		.upqualiList{
			width: 100%;
			height: 370px;
			padding-top: 40px;
			border-bottom: 1px solid #e4e7ed;
			padding-left: 100px;
		}
	}
}
</style>