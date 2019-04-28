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
	<div class="addCardRoad">
		<div class="title1">
				 <p>发布任务</p>
				<Button class="1" type="primary" style="width:120px;height:40px;margin-top:5.5px;" @click="save('allForm')" v-if="!isChange">保存</Button>
              	<Button class="2" type="primary" style="width:120px;height:40px;margin-top:5.5px;" @click="changeSave('allForm')" v-if="isChange">保存</Button>
		</div>
      <Form ref="allForm" :model="allForm" :label-width="110" class="form" :rules="ruleValidate">
		<Tabs>
                <!-- ***************商户基本信息*********************** -->
            <TabPane label="卡片信息">
                
		<div class="merMessage">
			
			<h2>商户基本信息</h2>
			<div class="merZiduan">
				<div><span>商户名</span><span>{{background.name}}</span></div>
				<div><span>商户类型</span><span>{{type}}</span></div>
				<div><span>商户编号</span><span>{{background.id}}</span></div>
				<div><span>当前余额</span><span>{{background.balance}}</span></div>
			</div>
		</div>
		<div class="cardMessage">
			<h2>卡片信息 <Button @click="addCard">添加卡片</Button></h2>
          	 
          	 <div class="cardBox" v-for="(card,index) in allForm.cardInfoVoList">
          	 	<div class="title">
          	 		<span>卡片{{index+1}}</span>
          	 		<span style="color: #f9006a;" @click="delet(index)">删除</span>
          	 	</div>
          	 	<Row>
                    <Col span="10" offset="1">
                       <FormItem label="卡片名称">
                            <Input readonly="readonly" v-model="card.cardName"/>
                        </FormItem>  
                        <FormItem label="* 卡片数量" >
                            <!--<Input type="text" v-model="card.cardNum" @on-change="numChange(card)"/>-->
            	 			<InputNumber v-model="card.cardNum" placeholder="数量"  @on-change="numChange(card)" v-if="pause"></InputNumber>
            	 			<InputNumber v-model="card.cardNum" placeholder="数量"  @on-change="numChange(card)" v-if="!pause" readonly></InputNumber>
                            
                        </FormItem>
                        
                           <FormItem :prop="'cardInfoVoList.' + index + '.createTime'" :rules="{required: true, message: 'please select the date',type: 'date',trigger: 'change'}" label="有效起始日期">
                            <DatePicker type="date" v-model = "card.createTime" placeholder="请选择有效起始日期" :options="noToday" :value="card.createTime" @on-change="putawayTime(card)"></DatePicker>
                        </FormItem>                  
                        
                    </Col>
                    <Col span="10" offset="2">
                    	<FormItem label="* 卡片单价">
                            <!--<Input  type="text" v-model="card.cardPrice" @on-change="priceChange(card)"/>-->
            	 		<InputNumber v-model="card.cardPrice" placeholder="单价"  @on-change="priceChange(card)" v-if="pause"></InputNumber>
            	 		<InputNumber v-model="card.cardPrice" placeholder="单价"  @on-change="priceChange(card)" v-if="!pause" readonly></InputNumber>
                            
                        </FormItem>
                        <FormItem label="卡片总价">
                            <Input  type="text" readonly="readonly" v-model="card.cardTotal"/>
                        </FormItem>
                          
                        <FormItem :prop="'cardInfoVoList.' + index + '.endTime'" :rules="{required: true, message: 'please select the date',type: 'date',trigger: 'change'}" label="有效截止日期">
                            <DatePicker type="date" v-model = "card.endTime" format="yyyy-MM-dd" placeholder="请选择有效截止日期" :options="noToday"  @on-change="soldOutTime(card)"></DatePicker>
                        </FormItem> 
                    </Col>
                  </Row>
                  <Modal
				        title="确认删除"
				        v-model="modal2"
				        @on-ok="ok2"
				        width="400"
				        class-name="delateBox">
				        <div>是否删除该条数据，如果删除，之前填写的数据将被清除，无法找回！</div>
				    </Modal>
          	 </div>
		</div>
		 </TabPane>
                <!-- ****************任务信息********************** -->
        <TabPane label="卡片信息">
		 

			<h2>任务信息</h2>
			<Row>
                    <Col span="6" offset="1">
                       <FormItem label="卡片类型">
                    			       办卡类
                        </FormItem>  
                       <FormItem label="设定投放时间段       *">
                            <Row>
                                <Col span="13">
                                    <Select v-model="week" multiple style="width:220px">
                                        <Option v-for="item in weekSelect" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col span="7" offset="2">
                                     <TimePicker v-model="hour" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                                </Col>
                            </Row> 
                        </FormItem>
                        <FormItem prop="cation" label="注意事项说明">
                            <Input  type="textarea" v-model="allForm.cation "/>
                        </FormItem>
                        </FormItem> 
                             <FormItem prop="taskCharacteristics" label="任务特点">
                            <Input v-model="allForm.taskCharacteristics" type="textarea" placeholder="请输入任务特点" />
                        </FormItem> 
                    </Col>
                    <Col span="7" offset="2">
                    	<FormItem prop="shelvesTime" label="预约上架时间">
                            <DatePicker v-model="allForm.shelvesTime " type="date" placeholder="请预约上架时间" :options="noToday" :value="date" @on-change="putawayTime2"></DatePicker>
                        </FormItem>
                         <FormItem prop="theShelvesTime" label="预约下架时间">
                            <DatePicker v-model="allForm.theShelvesTime " type="date" placeholder="请预约下架时间" :options="noToday" :value="date" @on-change="soldOutTime2"></DatePicker>
                        </FormItem>
                        
                        <FormItem label="办卡审核时间       *">
                             <InputNumber v-model="checkDay" placeholder="请输入办卡审核天数" >
            				    </InputNumber>
		                         <span>天</span>
                        </FormItem>
                        <FormItem label="备注">
                            <Input  type="textarea" v-model="allForm.remark"/>
                        </FormItem>
                    </Col>
                  </Row>
                </TabPane>  
                
                <!-- ****************步骤信息********************** -->
                <TabPane label="步骤信息">
                <h2>卡片信息 <Button @click="addStrategy">添加任务攻略</Button></h2>
             
              
              <div class="strategyBox" v-for="(strategy,index) in allForm.taskStepVoList">
          	 	<div class="title">
          	 		<span>攻略{{index+1}}</span>
          	 		<span style="color: #f9006a;" @click="deletStrategy(index)">删除</span>
          	 	</div>
          	 	<!--富文本-->
          	 	<Row>
          	 		 <Col span="10" offset="2">
          	 		 	<FormItem label="攻略说明  *">
            		<lazy :time = '200'>
          	 		 	
          	 		 	<div class="wenben">
									<quill-editor 
							      v-model="strategy.stepExplain" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>
							</div>
            		</lazy>
							
                         </FormItem>
							
          	 		 </Col>
          	 		 <Col span="8" offset="2">
          	 		 	<FormItem label="攻略图片 *">
            		<lazy :time = '200'>
                              <addpic @update="strategy1(index)" @remove="removeStrategy1(index)" :size='5' :defaultPic='strategy.strategyPic '></addpic>
            		</lazy>
                         
          	 		 	</FormItem>
          	 		 </Col>
          	 	</Row>
          	 			
          	 	
							 
               
              
              </div>
                        
               </TabPane>    
                <!-- ****************反馈信息********************** -->
                <TabPane label="反馈信息">
             
          	 		<div class="proHeader">
                            <div>步骤 1 &nbsp;&nbsp;&nbsp;&nbsp;  </div>  
                  </div>
                   <Row>
                                     <Col span="7">
                                     <!--<div  v-for="(msg,num) in userFeedbackMode">-->
                                        <FormItem label="用户反馈形式">
                                            <!--<div style="display:flex;height:52px;">
                                                {{num+1}}&nbsp;&nbsp;&nbsp;
                                                <Select disabled v-model="msg.info">
                                                    <Option v-for="item in userFeedback" :value="图片" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                            </div>-->
                                        			    图片
                                        </FormItem>  
                                         <!--</div>-->
                                    </Col>
                               
                        
                            <Col span="15" offset="1">
                              <!--<div v-for="(msg,num) in userFeedbackExplain" style="display:flex;">-->
                                <FormItem label="用户反馈说明">
                                    <!--<div style="display:flex">
                                        {{num+1}}&nbsp;&nbsp;&nbsp;
                                        <Input v-model="msg.info" type="textarea" placeholder="请输入用户反馈说明" />
                                    </div>-->
                                    图片凭证
                                </FormItem> 
                                <!--<Button type="primary" @click="delectFeedback(num)" style="height:30px;margin:10px 0 0 10px;" v-if="num!==0">删除用户反馈{{num+1}}</Button>-->
                                 <!--</div>-->
                            </Col>
                             
                       
                            
                         </Row>
                         <Row>
                            <Col span="7"> 
                                <FormItem label="商户反馈形式       *">
                                    <Select v-model="tenantFeedbackMode">
                                        <Option v-for="item in tenantFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>  
                            </Col>
                            <Col span="7" offset="2">
                                <FormItem label="商户反馈说明    *">
                                    <Input v-model="tenantFeedbackExplain" type="textarea" placeholder="请输入商户反馈说明" />
                                </FormItem>    
                            </Col>
                        </Row>
			 </TabPane>
		 </Tabs>
		</Form>
		 		<Modal
				        title="确认删除"
				        v-model="modal3"
				        @on-ok="ok3"
				        width="400"
				        class-name="delateBox">
				        <div>是否删除该条数据，如果删除，之前填写的数据将被清除，无法找回！</div>
				    </Modal>
		 <!--添加卡片的会话弹框-->
					    <Modal
					        title="选取卡片"
					        v-model="modal1"
					        @on-ok="ok1"
					        width="600"
					        class-name="hostBox">
				      			  
						         <Select v-model="mer_card" @on-change='changeID'  clearable style="width:200px">
		                        	<Option  v-for="item in domain"  :value="item.name" :key="item.label">{{ item.name}}</Option>
		                    	</Select>
					    </Modal>
               
					    
	</div>
</template>

<script>
	 import lazy from "@/common/plLazy";
    import addpic from '@/common/update';
	export default{
		components:{
            addpic,
            lazy
        },
		data(){
			return{
				//暂停状态
				pause: true,
				//分步骤富文本对应的步骤下标
				tinymceIndex:"",
				//审核天数
					checkDay:0,
                    userFeedbackExplain:[{info:''}],
                    userFeedbackMode:[{info:''}],
                    tenantFeedbackMode:'',
                    tenantFeedbackExplain:'',
                    
				//富文本配置
				 editorSetting: { // 配置富文本编辑器高
		          height: 300,
		          language_url:"/static/langs/zh_CN.js",
                    skin_url: "/static/skins/lightgray"
       				 },
			        Url: 'http://testbackend.miduoxing.cn/uploadPic/uploadPic', // 图片对应的上传地址
			        MaxSize: 757650000, // 文件大小
			        Accept: 'image/jpeg, image/png', // 文件格式
			        withCredentials: true,
			        content: '' ,// 富文本编辑器双向绑定的内容
      
				 ruleValidate: {
                    startTime: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    shelvesTime: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    theShelvesTime: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    taskCharacteristics: [
                        { required: true, message: 'Please enter the information', trigger: 'blur' },
                    ],
                    cation: [
                        { required: true, message: 'Please enter the information', trigger: 'blur' },
                    ],

                    
                },
				flag2:true,
				flag3:true,
				flag4:true,
				isChange:false,
				userFeedback:[],
				tenantFeedback:[],
				week:'',
                 hour:'',
                 weekSelect: [
                    {
                        value: '周一',
                        label: '周一'
                    },
                    {
                        value: '周二',
                        label: '周二'
                    },
                    {
                        value: '周三',
                        label: '周三'
                    },
                    {
                        value: '周四',
                        label: '周四'
                    },
                    {
                        value: '周五',
                        label: '周五'
                    },
                    {
                        value: '周六',
                        label: '周六'
										},
										{
                        value: '周天',
                        label: '周天'
                    }
                ],
				cardRoad:{},
				cardID:'',
				noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                date:'',
                name:"",
                id:'',
                background:{},
                type:'',
                
                modal1:false,
                modal2:false,
                modal3:false,
                mer_card:'',
                domain:[],
                  cardIndex:'',
                  strategyIndex:'',
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
                  //整页的表单
                 allForm: {
					taskCharacteristics:'',
					productId:'',
                 	name:'',
                 	tenantId:'',
                 	tenantName:"",
                 	status:"1",
                 	type:'办卡赚',
                 	cardInfoVoList:[{
                	cardName:'',
                	cardPrice:0,
                	cardNum:0,
                	cardTotal:'',
                	endTime:'',
                	createTime:''
                }
                ],
                 taskStepVoList:[
                  {
			      checkDay: 0,
			      remark: "",
			      stepExplain: "",
			      strategyPic: [],
			      tenantFeedbackExplain: "",//商户反馈说明
			      tenantFeedbackMode: "",//商户反馈形式
			      userFeedbackExplain: "",//用户反馈说明
			      userFeedbackMode: ""//用户反馈形式
                  }
                  ],
                 }
			}
		},
		methods:{
			changeID(value){
				console.log(this.domain)
				let that = this;
				this.domain.forEach(function(i,index){
					if (value == i.name) {
						that.cardID = i.id
					}
				})
			},
		 onEditorBlur(){//失去焦点事件
           },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },
            delectFeedback(num){
                this.userFeedbackMode.splice(num,1)
                this.userFeedbackExplain.splice(num,1)
			},
			showIndex(index){

			},
			priceChange(card){
				card.cardTotal = card.cardPrice*card.cardNum
			},
			numChange(card){
				card.cardTotal = card.cardPrice*card.cardNum
			},
			putawayTime(card){
				if (card.createTime > card.endTime) {
					
				}

			},
			soldOutTime(data){

			},
			addCard(){
				this.modal1 = true
			},
			ok1(){
				if (this.mer_card !=="") {
					let a = {
                	cardName:this.mer_card,
                	productId:this.cardID,
                	cardPrice:0,
                	cardNum:0,
                	cardTotal:'',
                	endTime:'',
                	createTime:''
							}
					let that = this
					let flag = true
					that.allForm.cardInfoVoList.forEach(function(e){
						if (that.mer_card == e.cardName) {
							that.$Message.warning("有了这个卡片了你还添加干嘛！！打你龟儿")
							flag = false
						}
						
					})
					if(flag){
							that.allForm.cardInfoVoList.push(a)
						}
					
					
					
				}
			},
			//删除卡片确认按钮
			ok2(){
				if (this.allForm.cardInfoVoList.length == 1) {
						this.$Message.warning("就一张了你还删！")
				}else{
	          	  this.allForm.cardInfoVoList.splice(this.cardIndex,1)					
				}

			},
			ok3(){
				if (this.allForm.taskStepVoList.length == 1) {
						this.$Message.warning("就一个攻略了你还删！")
				}else{
				this.allForm.taskStepVoList.splice(this.strategyIndex,1)
				}
				

				
			},
			delet(index){
				this.modal2 = true
				this.cardIndex = index
			},
			deletStrategy(index){
				this.modal3 = true
				this.strategyIndex = index
			},
            //预约下架时间
            soldOutTime2(){
            	
            },
            //预约上架时间
            putawayTime2(){
            	
            },
            //添加攻略按钮
            addStrategy(){
            	let a = {
			      checkDay: 0,
			      remark: "",
			      stepExplain: "",
			      strategyPic: [],
			      tenantFeedbackExplain: "",//商户反馈说明
			      tenantFeedbackMode: "",//商户反馈形式
			      userFeedbackExplain: "",//用户反馈说明
			      userFeedbackMode: ""//用户反馈形式
            	}
				this.allForm.taskStepVoList.push(a)
            },
            strategy1(index){
                 if(typeof(this.allForm.taskStepVoList[index].strategyPic)=='string'){
                    this.allForm.taskStepVoList[index].strategyPic = this.allForm.taskStepVoList[index].strategyPic.split(',')
                }
                this.allForm.taskStepVoList[index].strategyPic.push(this.$store.state.shareUrl.url);
            },
            removeStrategy1(index){
                if(typeof(this.allForm.taskStepVoList[index].strategyPic)=='string'){
                    this.allForm.taskStepVoList[index].strategyPic = this.allForm.taskStepVoList[index].strategyPic.split(',')
                }
                // index对应第几个说明，delectIndex对应说明里的第几张图片
                let delectIndex = this.$store.state.imgIndex
                this.allForm.taskStepVoList[index].strategyPic.splice(delectIndex,1)
            },
            //上传攻略
            strategyStyle(index){
            	if(typeof(this.allForm.taskStepVoList[index].strategyPic)=="string"){
            	
            	if (this.allForm.taskStepVoList[index].strategyPic !== "") {
            		this.allForm.taskStepVoList[index].strategyPic = this.allForm.taskStepVoList[index].strategyPic.split(',')
            		}else{
            			this.allForm.taskStepVoList[index].strategyPic = []
            		}
            	}
                this.allForm.taskStepVoList[index].strategyPic.push(this.$store.state.shareUrl.url);
               this.allForm.taskStepVoList[index].strategyPic = this.allForm.taskStepVoList[index].strategyPic.toString()
            },
            //删除
            removetrategy(index){
                // 如果是字符串,将其转换为数组
                if(typeof(this.allForm.taskStepVoList[index].strategyPic)=="string"){
                    this.allForm.taskStepVoList[index].strategyPic = this.allForm.taskStepVoList[index].strategyPic.split(',')
                }
                // index对应第几个说明，delectIndex对应说明里的第几张图片
                let delectIndex = this.$store.state.imgIndex
                this.allForm.taskStepVoList[index].strategyPic.splice(delectIndex,1)
               this.allForm.taskStepVoList[index].strategyPic = this.allForm.taskStepVoList[index].strategyPic.toString()
                
            },
            save(name){

					let aa = this;
					let ss='';
					this.allForm.cardInfoVoList.forEach(function(i,index){
						ss += i.productId +';'
						aa.allForm.productId = ss.substring(0,ss.length-1);
					})
            	   this.$refs[name].validate((valid) => {})
        	   		this.allForm.taskStepVoList[0].userFeedbackExplain ="图片凭证" 
                    this.allForm.taskStepVoList[0].userFeedbackMode = "图片"
               		 this.allForm.taskStepVoList[0].checkDay = this.checkDay
                 	  this.allForm.taskStepVoList[0].tenantFeedbackMode = this.tenantFeedbackMode
                       this.allForm.taskStepVoList[0].tenantFeedbackExplain = this.tenantFeedbackExplain
            	   
               	 let that = this;
               	 that.flag2 = true;
				 that.flag3 = true;
				that.allForm.name = that.allForm.cardInfoVoList[0].cardName;
				
				//表单校验
				if(that.allForm.theShelvesTime == ""||that.allForm.cation == ""||that.allForm.taskCharacteristics==""||that.allForm.shelvesTime == ""||that.allForm.week ==""||that.hour[0]==""){
						that.$Message.warning("带  *  号的填完哈 兄弟")
						return;
				}
				
            	//上下架时间做判断
            	
            	if(that.allForm.shelvesTime >that.allForm.theShelvesTime ){
						that.$Message.warning("预约上下架时间填错了！！打你龟儿")
						return;
            	}
            	if(that.week==''||that.hour[0]==''||that.allForm.shelvesTime==''||that.allForm.theShelvesTime==''){
                   that.$Message.warning('请讲投放时间及上下架时间输入完整!');
					return;
               }
            	
	            if(that.allForm.cardInfoVoList.length !== 0){
	            	that.allForm.cardInfoVoList.forEach(function(i,index){
	            		 if (i.cardNum == ""||i.endTime == ""||i.cardPrice == ""||i.createTime == "") {
		              		     that.$Message.warning('卡片信息没填完整，注意带  * 的字段');
		              		     that.flag2 = false
	            		 }
//	            		 else{
//	            		 	that.flag2 = true
//	            		 }
	            	})
	            }
	            let diyi =this.allForm.taskStepVoList[0]
	            if (diyi.userFeedbackExplain==""||diyi.tenantFeedbackExplain == ""||diyi.userFeedbackMode == ""||diyi.tenantFeedbackMode == ""||diyi.checkDay == "") {
              		    	 that.$Message.warning('攻略没填完整，注意带  * 的字段');
	            	 	 	that.flag4 = false
	            	 	 }
	            if(that.allForm.taskStepVoList.length!==0){
	            	 that.allForm.taskStepVoList.forEach(function(i,index){
	            	 	if(typeof(i.strategyPic)!=="string"){
                            i.strategyPic = i.strategyPic.join(',')
                            
                        }

	            	 	 if (i.stepExplain =="") {
              		    	 that.$Message.warning('攻略没填完整，注意带  * 的字段');
	            	 	 	that.flag3 = false
	            	 	 }
	            	 	  
//	            	 	 else{
//	            	 	 	that.flag3 = true
//	            	 	 }
	            	 })
	            }
            	if(that.flag2 == true&&that.flag3 == true&&that.flag4==true){

            	let mysecondPromise = new Promise(function(resolve,reject){
            		//将投放时间打包发给天成
                      that.allForm.putInTime = that.week.join(',')+'*'+that.hour.join('-');
                      
                      
            		that.allForm.cardInfoVoList.forEach(function(i,index){
            		if(i.createTime > i.endTime){
						that.$Message.warning("卡片"+(index+1)+"起始时间和结束时间填错了！！打你龟儿")
						resolve(false)
            		}else{
            			resolve(true)
            		}
            	})
            	})
            mysecondPromise.then((isTrue)=>{
            		console.log(that.allForm)
            	
            				if(isTrue){
            					that.$http({
                                method:'POST',
                                url: that.allUrl.addTask,
                                headers: {
                                    "content-type": "application/json"
                                },
                                responseType:'text/plain',
                                data:that.allForm
                          }).then((res)=>{
                           	
                            	if(res.data.ret == "ok"){
                            		that.$router.push({path:"/channel/task/CardRoadReadOnly",query:{merId:that.id,taskId:res.data.data.taskId}})
                            	}
                            })
            				}
              	          
            })
              }
            },
            changeSave(name){
            	console.log(this.allForm.cardInfoVoList)
            		let aa = this;
					let ss='';
					this.allForm.cardInfoVoList.forEach(function(i,index){
						ss += i.productId +';'
						aa.allForm.productId = ss.substring(0,ss.length-1);
					})
            	console.log(this.allForm.productId)
					
            	   this.$refs[name].validate((valid) => {})
				 	 let that = this;
				 	 that.flag2 = true;
				 	 that.flag3 = true;
				that.allForm.name = that.allForm.cardInfoVoList[0].cardName;
				
				//表单校验
				if(that.allForm.theShelvesTime == ""||that.allForm.cation == ""||that.allForm.taskCharacteristics==""||that.allForm.shelvesTime == ""||that.allForm.week ==""||that.hour[0]==""){
						that.$Message.warning("带  *  号的填完哈 兄弟")
						return;
				}

				
            	//上下架时间做判断
            	if(that.allForm.shelvesTime >that.allForm.theShelvesTime ){
						that.$Message.warning("预约上下架时间填错了！！打你龟儿")
						return;
            	}
            	if(that.week==''||that.hour[0]==''||that.allForm.shelvesTime==''||that.allForm.theShelvesTime==''){
                   that.$Message.warning('请讲投放时间及上下架时间输入完整!');
					return;
               }
            	
	            if(that.allForm.cardInfoVoList.length !== 0){
	            	that.allForm.cardInfoVoList.forEach(function(i,index){
//	            		if (i.cardNum == ""&&i.endTime == ""&&i.cardPrice == ""&&i.createTime == "") {
//	            			that.$Message.warning('卡片信息没填完整，注意带  * 的字段');
//		              		     that.flag2 = false
//	            		}else 
	            		if(i.cardNum == ""||i.endTime == ""||i.cardPrice == ""||i.createTime == ""||i.cardTotal == "0") {
		              		     that.$Message.warning('卡片信息没填完整，注意带  * 的字段');
		              		     that.flag2 = false
	            		 }
//	            		else{
//	            		 	that.flag2 = true
//	            		 }
	            	})
	            }
	         let diyi =this.allForm.taskStepVoList[0]
	            if (diyi.userFeedbackExplain==""||diyi.tenantFeedbackExplain == ""||diyi.userFeedbackMode == ""||diyi.tenantFeedbackMode == ""||diyi.checkDay == "") {
              		    	 that.$Message.warning('攻略没填完整，注意带  * 的字段');
	            	 	 	that.flag4 = false
	            	 	 }
	            if(that.allForm.taskStepVoList.length!==0){
	            	 that.allForm.taskStepVoList.forEach(function(i,index){
	            	 	if(typeof(i.strategyPic)!=="string"){
                            i.strategyPic = i.strategyPic.join(',')
                        }
	            	 	 if (i.stepExplain =="") {
              		    	 that.$Message.warning('攻略没填完整，注意带  * 的字段');
	            	 	 	that.flag3 = false
	            	 	 }
	            	 	  
//	            	 	 else{
//	            	 	 	that.flag3 = true
//	            	 	 }
	            	 })
	            }
	            
            	if (that.flag2 == true&&that.flag3 == true&&this.flag4==true){
               	let that = this;
            	let myFirstPromise = new Promise(function(resolve,reject){
                      that.allForm.putInTime = that.week.join(',')+'*'+that.hour.join('-')
            		that.allForm.cardInfoVoList.forEach(function(i,index){
            		if(i.createTime > i.endTime){
						that.$Message.warning("卡片"+(index+1)+"卡片的起始时间和结束时间填错了！！打你龟儿")
						resolve(false)
            		}else{
            			resolve(true)
            		}
            	})
            	})
            myFirstPromise.then((isTrue)=>{
            				if(isTrue){
            						that.$http({
                                method:'POST',
                                url: that.allUrl.updateTask,
                                headers: {
                                    "content-type": "application/json"
                                },
                                responseType:'text/plain',
                                data:that.allForm
                           }).then((res)=>{
                            	if(res.data.ret == "ok"){
                            		that.$router.push({path:"/channel/task/CardRoadReadOnly",query:{merId:that.id,taskId:that.$route.query.taskId}})
                            	}
                            })
            				}
              	          
            })
              }
            }
		},
		mounted(){

			
			this.id = this.$route.query.id;
			this.allForm.tenantId = this.$route.query.id;
			//获取反馈形式
			 this.get(this.allUrl.findProperty,{tenantId:this.id}).then((res)=>{
                this.userFeedback = res.data.data.userFeedback;
                this.tenantFeedback = res.data.data.tenantFeedback;
            })
			 
			 
			 this.get(this.allUrl.findTenant,{tenantId:this.id}).then((res)=>{
			 			console.log(res)
						this.background = res.data.data
						 this.allForm.tenantName =this.background.name
						if (this.background.type == "1") {
							this.type = "个人商户"
						}else{
							this.type = "企业商户"
						}
						
						let that = this;
				that.background.children.forEach(function(i,index){
					if (i.type == 3) {
						that.domain.push(i)
						i.label = i.id
					}

				});	
					console.log(this.domain)
				
            	})
			if (this.$route.query.name) {
				this.allForm.cardInfoVoList[0].cardName = this.$route.query.name.split('*')[0];
				this.allForm.cardInfoVoList[0].productId = this.$route.query.name.split('*')[1];
//				this.allForm.productId = this.$route.query.name.split('*')[1];
			}
			//修改
            if (this.$route.query.taskId) {
					if (this.$route.query.status == 'stop') {
							this.pause = false 
					}
//				this.allForm.taskStepVoList.forEach(function(i){
////						i.strategyPic = i.strategyPic.split(',')
//					console.log(i.strategyPic)
//					})
            	this.isChange = true;
            	 this.get(this.allUrl.findTask,{taskId:this.$route.query.taskId}).then((res)=>{
            	 	console.log(res)
					this.allForm = res.data.data
					
					this.checkDay = this.allForm.taskStepVoList[0].checkDay
					this.tenantFeedbackMode = this.allForm.taskStepVoList[0].tenantFeedbackMode
			 this.tenantFeedbackExplain = this.allForm.taskStepVoList[0].tenantFeedbackExplain
			let userFeedbackExplain1 = this.allForm.taskStepVoList[0].userFeedbackExplain.split("%@$%")
			let userFeedbackMode1 = this.allForm.taskStepVoList[0].userFeedbackMode.split(";")
			let that = this;
			that.userFeedbackExplain=[]
			userFeedbackExplain1.forEach(function(i,index){
				that.userFeedbackExplain.push({info:i})
			})
				that.userFeedbackMode=[]
			userFeedbackMode1.forEach(function(i,index){

				that.userFeedbackMode.push({info:i})
			})

					this.allForm.theShelvesTime = new Date(this.allForm.theShelvesTime)
					this.allForm.shelvesTime = new Date(this.allForm.shelvesTime)
						this.allForm.cardInfoVoList.forEach(function(i){
							i.createTime = new Date(i.createTime)
							i.endTime = new Date(i.endTime)
							that.domain.forEach(function(j,index){
							  if (j.name == i.cardName) {
							  	     i.productId = j.id
							  }
							})
						})
						console.log(this.allForm.cardInfoVoList)
					this.week = this.allForm.putInTime.split('*')[0].split(',')
             	    this.hour = this.allForm.putInTime.split('*')[1].split('-')

					//图片回归
					this.allForm.taskStepVoList.forEach(function(i,index){
				
//				if (typeof(i.strategyPic)=="string") {
//					if (i.strategyPic.charAt(0) ==",") {
//						i.strategyPic=i.strategyPic.substring(1)
//						console.log(i.strategyPic)
//						
//						i.strategyPic = i.strategyPic.split(',')
//					}else{
//						i.strategyPic = i.strategyPic.split(',')
//					}
//
//					
//				}


					})	
				})
            }
				
		}
	}
</script>

<style scoped="" lang="scss">
h2{
			text-align: left;
			border-left:5px solid #007AFF;
			padding-left: 10px;
			margin-bottom: 20px;
		}
.addCardRoad{
	width: 100%;
	height: 96%;
	overflow-y: scroll;
	overflow-x:hidden ;
	text-align: left;
	 .title1{
            line-height: 51px;height: 51px;width: 100%;
            padding-left: 40px;font-size: 28px;
            padding-right: 40px;
            text-align: left;border-bottom:1px solid #000000;
            display: flex;justify-content: space-between;
        }
	.Roadheader{
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #cccccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40px;
		span{
			font-size: 18px;
		}
	}
	.merMessage{
		width: 100%;
		margin-top: 20px;
		padding-left: 60px;
		
		.merZiduan{
			padding: 0 50px;
			width: 100%;
			height: 100px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			font-size: 18px;
			div{
				width: 50%;
				display: flex;
				span{
					display: block;
				}
				span:nth-child(1){
					margin-right: 20px;
					width: 100px;
				}
				span:nth-child(2){
					color: #8C8C8C;
				}
			}
		}
	}
	.cardMessage{
		width: 100%;
		padding-left: 60px;
		.ivu-btn{
			margin-left: 50px;
		}
		.cardBox{
			width: 100%;
			margin-top: 20px;
			.title{
				width: 100px;
				height: 40px;
				font-size: 18px;
				align-items: center;
				display: flex;
				justify-content: space-between;
					background: #99cccc;
				
			}
			.ivu-row{
				border: 1px solid #ccc;
			}
		}
	}
		.strategyBox{
			width: 100%;
			margin-top: 20px;
			.title{
				margin-left: 5%;
				width: 100px;
				height: 40px;
				font-size: 18px;
				align-items: center;
				display: flex;
				justify-content: space-between;
			background: #99cccc;
				
			}
		}

}
.ivu-form-item{
	margin-bottom: 15px!important;
}
    .ivu-input-number{
        width: 90% !important;
    }
    .wenben{
    	width: 100%;
    }
    .quill-editor{
		width: 400px;
		height: 300px;
	}
</style>