<style>
    .ivu-tabs-nav-scroll{
        padding-left: 40px;
        font-size: 18px;
        margin-top: 20px;
    }
    .ivu-tabs-tabpane{
        padding-left: 40px;
        font-size: 15px;
        color: #000;
    }
    .ivu-tabs{
        overflow: visible;
    }
</style>

<template>
    <div class="shareDiscount">
        <div class="title">
            <p>添加视屏项目</p>  
             <!-- <div style="display:flex;width:200px;">
                 <Button type="primary" style="width:80px;height:40px;margin-top:5.5px;" class="change" @click="change">修改</Button>
                <Button type="primary" style="width:80px;height:40px;margin-top:5.5px;margin-left:10px;" class="submit" @click="submit">提交</Button>
            </div> -->
        </div>
       <Form ref="allForm" :model = "allForm" :rules="ruleValidate" :label-width="100">
        <Tabs>
		        <TabPane label="项目信息">
	    	        <div class="smallTitle">
			      		      基本信息
			        </div>
			        <div class="smallTitleContent">
				        <Row>
				        	<Col span="10">
	        		       		 <FormItem label="机构" prop="organizationName">
			                           <Select placeholder="请选择教育机构，必填" v-model="allForm.organizationName" size="large">
							                <Option v-for="item in organizationList" :value="item.label" :key="item.value">{{ item.label }}</Option>
							            </Select>
						        </FormItem> 
						        <FormItem label="视屏副标题" prop="titleTwo">
						            <Input v-model="allForm.titleTwo" type="text" placeholder="请输入视屏副标题，20个字以内，必填"></Input>
						        </FormItem> 
						        <FormItem label="标签" prop="tag">
						            <Input v-model="allForm.tag" placeholder="请输入标签，多个标签输入空格"></Input>
						        </FormItem>
				        	</Col>
				        	<Col span="10" style="margin-left: 30px;">
				        		<FormItem label="视屏主标题" prop="titleOne">
						            <Input v-model="allForm.titleOne" placeholder="请输入视频主标题，10个字以内，必填"></Input>
						        </FormItem>
						        <FormItem label="视频分类" prop="typeName">
						            <Select placeholder="请输入视屏分类，必选" v-model="allForm.typeName" size="large">
							                <Option v-for="item in typeList" :value="item.label" :key="item.value">{{ item.label }}</Option>
							        </Select>
						        </FormItem>
						        <FormItem label="上传封面" prop="logo">
						            <!--<Input v-model="allForm.educationCourse.logo" placeholder="Enter your name"></Input>-->
		                             <lazy :time = '200'>
		                              <addpic @update="strategy1" @remove="removeStrategy1" :size='1' :defaultPic='allForm.logo'></addpic>
		                       		</lazy>
						        </FormItem>
				        	</Col>
				        </Row>
				        <Row>
				        	 <FormItem prop="description" label="视屏介绍">
                             <!--<Input v-model="data.stepExplain" type="textarea" placeholder="请输入步骤说明" />-->
                             <lazy :time = '200'>
                             	<div style="width: 500px;">
									<quill-editor 
							      v-model="allForm.description" 
							      ref="myQuillEditor" 
							      :options="editorOption">
							    </quill-editor>
								</div>
								</lazy>
                        </FormItem> 
				        </Row>
			        </div>
				 	 <div class="smallTitle">
			      		     联系方式
			        </div>
			        <div class="smallTitleContent">
			        	<Row>
				        	<Col span="10">
	        		       		 <FormItem label="机构对接人" prop="organizationPerson">
						            <Input v-model="allForm.organizationPerson" placeholder="请输入机构对接人，非必填"></Input>
						        </FormItem> 
						        <FormItem label="哈哈学习对接人" prop="hahaPerson">
						            <Input v-model="allForm.hahaPerson" placeholder="请选择哈哈学习对接人，必选"></Input>
						        </FormItem> 
				        	</Col>
				        	<Col span="10" style="margin-left: 30px;">
				        		<FormItem label="对接人手机号" prop="phone">
						            <Input v-model="allForm.phone" placeholder="请输入机构对接人手机号，非必填"></Input>
				        		</FormItem>
				        	</Col>
				        </Row>
			        </div>
		        </TabPane>
		        <TabPane label="课节信息">
		        	 <div class="smallTitle">
			      		      课程信息 <Button type="primary" @click="addClass">添加课程</Button>
			        </div>
			        <div class="classBox" style="min-width: 900px;width: 90%;margin-left: 60px;margin-top: 30px;" v-for="(data,index) in allForm.courseVideos">
			        	<div style="width: 100px;height: 40px;text-align: center;line-height: 40px;background: #008B8B;">课节{{index+1}}<Button style="margin-left: 5px;" type="error" size="small" @click="delClass(index)">删除</Button></div>
			        	<div style="width: 100%;border: 1px solid #cccccc;padding-top: 40px;padding-bottom: 30px;">
			        		<Row>
			        			<Col span="10">
			        				<FormItem label="课节名称" :prop="'courseVideos.' + index + '.videoName'" :rules="{required: true, message: '请填写课节名称', trigger: 'blur,change'}">
						            		<Input v-model="data.videoName" placeholder="请输入课节名称，6个字以内，必填" ></Input>
						     		</FormItem>
			        			</Col>
			        			<Col span="10">
			        				<FormItem label="上传视屏" :prop="'courseVideos.' + index + '.videoLink'" :rules="{required: true, message: '请上传课程视屏', trigger: 'blur,change'}">
			        				<!--<FormItem label="上传视屏">-->
						            	<!--<Input v-model="allForm.videoLink" placeholder="请输入机构对接人手机号，非必填"></Input>-->
		                             <lazy :time = '200'>
		                              <addvid @update="strategy2(data)" @remove="removeStrategy2(data)" :size='1' :defaultPic='data.videoLink'></addvid>
		                       		</lazy> 
			        				</FormItem>
			        			</Col>
			        		</Row>
						     
			        	</div>
			        </div>
			        <div style="width: 100%;text-align: center;margin-top: 40px;">
             			 <Button type="primary" style="width:120px;height:40px;margin-top:5.5px;" @click="save('allForm')" v-if="this.wtType!=='look'">保存</Button>
			        </div>
		        </TabPane>
 	 		  </Tabs>
   </Form>
 	   
    </div>
</template>

<script>
    import lazy from "@/common/plLazy";
    import addpic from '@/common/update';
    import addvid from '@/common/updateVideo';
    export default {
        components:{
            addpic,
            lazy,
            addvid
        },
        data(){
            return{
            	wtType:'',
            	box:{
            		
            	},
            	organizationList:[],
            	typeList:[],
            	allForm:{
            		logo:'',
            		courseVideos:[{}]
            	},
            	ruleValidate:{
            	 organizationName: [
                        { required: true, message: '请选择教育机构', trigger: 'blur,change' }
                   ],
                    titleTwo: [
                        { required: true, message: '请输入副标题', trigger: 'blur' },
                         { type: 'string', max: 20, message: '20字以内', trigger: 'blur' }
                   ],
                   tag:[
                        { required: true, message: '请输入标签信息', trigger: 'blur' }
                   ],
                     titleOne: [
                        { required: true, message: '请输入主标题标题', trigger: 'blur' },
                         { type: 'string', max: 12, message: '10字以内', trigger: 'blur' }
                        
                   ],
                   typeName:[
                        { required: true, message: '请选择视屏分类', trigger: 'blur,change' }
                   ],
                   logo:[
                        { required: true, message: '请上传封面', trigger: 'change' }
                   ],
                   description:[
                        { required: true, message: '请填写视屏介绍', trigger: 'blur' }
                   ],
                   hahaPerson:[
                        { required: true, message: '请填写哈哈学习对接人', trigger: 'blur' }
                   ]
            	},
            	     editorOption:{
                 	  modules:{
                        toolbar:[
                            ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'],         //引用，代码块
                            [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],          //列表
                            [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
                            [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
                            [{ 'direction': 'rtl' }],                         // 文本方向
                            [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         //几级标题
                            [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
                            [{ 'font': [] }],         //字体
                            [{ 'align': [] }],        //对齐方式
                            ['clean'],        //清除字体样式
                        ]
                    },
                    theme:'snow'

                 },
            }
        },
        methods: {
            strategy1(){
               this.allForm.logo = this.$store.state.shareUrl.url;
            },
         // 删除当前攻略图片
            removeStrategy1(){
               this.allForm.logo = ""
            },
            strategy2(data){

               data.videoLink = this.$store.state.shareUrl.url;
            },
                        // 删除当前攻略图片
            removeStrategy2(data){
            	console.log("???")
                data.videoLink  = ""
            },
        	addClass(){
        		this.allForm.courseVideos.push({})
        	},
        	delClass(index){
        		console.log(this.allForm.courseVideos)
        		if (this.allForm.courseVideos.length>1) {
        			if (index <this.allForm.courseVideos.length - 1) {
        					this.allForm.courseVideos[index].videoName = ""
        					this.allForm.courseVideos[index].videoLink = ""
        			}else{
		        		this.allForm.courseVideos.splice(index,1)
        				
        			}

        		}else{
      		    	this.$Message.warning('请添加课程！');
        		}
        		
        	},
        	save(name){
				console.log(this.allForm)
                 this.$refs[name].validate((valid) => {
                 	if (valid) {
                 		let that = this;

                 		let transport = {};
                 		transport.courseVideos = this.allForm.courseVideos;
                 		transport.educationCourse = this.allForm;
                 		transport.educationCourse.typeId = null;
             			this.typeList.forEach(function(i,index){
                 			if (transport.educationCourse.typeName == i.label ) {
                 				transport.educationCourse.typeId = i.value
                 			}
                 		})
             			this.organizationList.forEach(function(i,index){
             			if (transport.educationCourse.organizationName == i.label ) {
                 				transport.educationCourse.organizationId = i.value
                 			}
             			})

                 if (this.wtType == "change") {//修改
                 	transport.educationCourse.id = this.box.id;
                     this.$http({
                        method:'POST',
                        url:this.allUrl.updateEducationProject,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            data:transport
                        }).then((res)=>{
                        	console.log(res)
                            if(res.data.errorcode==0){
                                 this.$Message.success('保存成功！');
                                 this.$router.push('/haha_study/video_project')
                            }
                        })
                 
                 }else{
                     this.$http({
                        method:'POST',
                        url:this.allUrl.addEducationCourse,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            data:transport
                        }).then((res)=>{
                        	console.log(res)
                            if(res.data.errorcode==0){
                                 this.$Message.success('保存成功！');
                                 this.$router.push('/haha_study/video_project')
                            }
                        })
                 }


                 	}
                 })
        	}
        },
        updated() {
             

        },
        mounted() {
        	
        	//获取类型列表
             this.get(this.allUrl.findAllTypeName).then((res)=>{
            	this.typeList = res.data.data
            })
            //获取机构
             this.get(this.allUrl.findAllOrganizationName).then((res)=>{
            	this.organizationList = res.data.data
            })
//查看
  	      	if (this.$route.query.type == "look") {	
        		this.wtType = "look"
        	};
//修改
			if (this.$route.query.type == "change") {	
        		this.wtType = "change"
        	};
//查看或者修改
   			if (localStorage.getItem('content')!==null) {
				}

        },
        beforeMount () { 
        	//如果有传值  获取
   			if (localStorage.getItem('content')!==null) {
   				
        				this.box = JSON.parse(localStorage.getItem('content')) 
        				console.log(this.box)
//      					this.allForm = this.box
        			            //视屏列表
			             this.get(this.allUrl.findAllVideoByCourseId+'?id='+this.box.id).then((res)=>{
			             	console.log(res)
								this.box.courseVideos = res.data.data
								this.allForm.courseVideos =  res.data.data
								console.log(this.allForm.courseVideos)
								//不能直接将this.allForm = this.box  这样会出现的问题是 对视屏的增删dom不起作用
								this.allForm.titleOne =  this.box.titleOne
								
								this.allForm.organizationName =  this.box.organizationName
								
								this.allForm.titleTwo =  this.box.titleTwo
								
								this.allForm.typeName =  this.box.typeName
								
								this.allForm.typeId =  this.box.typeId
								this.allForm.logo =  this.box.logo
								this.allForm.description =  this.box.description
								this.allForm.organizationPerson =  this.box.organizationPerson
								this.allForm.hahaPerson =  this.box.hahaPerson
								this.allForm.phone =  this.box.phone
								this.allForm.id =  this.box.id
								this.allForm.tag =  this.box.tag
								
//								this.$set(this.allForm,'courseVideos',this.box.courseVideos)
								console.log(this.allForm)
			            })
				}

        }
      
    }



</script>

<style scoped lang='scss'>
    .shareDiscount{
        position: relative;
        width: 100%;
        height: 97%;
        overflow-y: auto;
        text-align: left;
        padding-bottom: 80px;
        img{height: 70px;width: 70px;}
        .proHeader{
            		padding-left: 40px;
            		width: 800px;
            		height: 50px;
            		line-height: 50px;
            		display: flex;
            		div:nth-child(1){
            			color: #222222;
            			font-size: 15px;
            		}
            		div:nth-child(2){
            			width: 300px;
						text-align: center;
            		}
            		div:nth-child(3){
            			width: 100px;
            			display: flex;
            			justify-content: space-between;
						text-align: center;
						color: blue;
            		}
            	}
            .addInfo{
                margin-top:30px;padding-left:50px;border-bottom: 1px solid darkcyan;
            }
        .basic_info{
            div{width: 30%;}
        }
        
        .form{
            color: #000000;
            
        }
        p{color: #000000;padding-left: 50px;
            span{margin-left: 20px;}}
        .title{
            line-height: 30px;height: 30px;width: 100%;
            padding-left: 20px;font-size: 20px;
            padding-right: 40px;
            text-align: left;border-bottom:1px solid #6962622f;
            display: flex;justify-content: space-between;
        }
        .title2{
            line-height: 51px;height: 51px;width: 100%;border-bottom:1px solid #6962622f;
             padding-left: 100px;font-size: 23px;color: rgb(44, 164, 243);
             box-shadow: 10px 10px 10px #3a36362f;
        }
        .secTitle{
            padding-left: 5px;font-size: 20px;text-align: left;
            margin-left: 30px;margin-top: 10px;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
            .add{height: 30px;}
        }
          
    }
    .smallTitle{
         margin-left: 70px;font-size: 20px;margin-top: 30px;margin-bottom: 25px;
        border-left: 6px solid rgb(44, 164, 243);padding-left: 20px !important;
    }
    .smallTitleContent{
		padding-left: 100px;
    }
    .content{width: 100%;padding: 10px;}
    .ivu-input-number{
        width: 100% !important;
    }
     .btm{
            padding: 0 10% 0 0;
            width: 100%;
            text-align: center;
            .save{width: 100px;}
        }
</style>