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
        overflow: visible !important;
    }
</style>

<template>
    <div class="shareDiscount">
        <div class="title">
            <p>发布任务</p>
              <Button type="primary" style="width:120px;height:40px;margin-top:5.5px;" @click="save('formItem')" v-if="!this.isChange">保存</Button>
              <Button type="primary" style="width:120px;height:40px;margin-top:5.5px;" @click="changeSave('formItem')" v-if="this.isChange">保存</Button>
        </div>

        <Form ref="formItem" :model="formItem" :label-width="130" class="form" :rules="ruleValidate">
            <Tabs>
                <!-- ************************************** -->
                <TabPane label="应用信息">
                    <div class="secTitle">商户基本信息</div>
                    <Row class="basic_info">
                        <Col span="12">
                            <p style="margin-bottom:20px;">商户名称<span>{{tenant.name}}</span></p>
                            <p>商户编号<span>{{tenant.id}}</span></p>
                        </Col>
                        <Col span="12" offset="0">
                            <p style="margin-bottom:20px;">商户类型<span>{{tenant.type=='0'?"企业商户":"个人商户"}}</span></p>    
                            <p>当前余额<span>{{tenant.balance}}元</span></p>  
                        </Col>
                    </Row>
                      <div class="secTitle">应用信息</div>
                    <Row>
                        <Col span="7">
                            <FormItem label="产品名称">
                                    {{this.formItem.name}}
                            </FormItem>  
                            <FormItem prop="endTime" label="有效截止日期">
                                <DatePicker type="date" :options="noToday" placeholder="请选择有效截止日期" :value="formItem.endTime" @on-change="ChangeEndTime"></DatePicker>
                            </FormItem>    
                        </Col>
                        <Col span="7" offset="1">
                            <FormItem prop="startTime" label="有效起始日期">
                                <DatePicker type="date" :options="noToday" placeholder="请选择有效起始日期" :value="formItem.startTime" @on-change="ChangeStartTime"></DatePicker>
                            </FormItem>  
                        </Col>
                    </Row>
                </TabPane>
                <!-- ************************************** -->
                <TabPane label="任务信息">
                     <div class="secTitle">任务信息</div>
                    <Row>
                    <Col span="7" offset="1">
                       <FormItem label="任务类型">
                            {{this.formItem.type}}
                        </FormItem> 
                        <FormItem label="任务数量" :rules="{required: true, message: 'Item can not be empty', trigger: 'blur'}">
                            <InputNumber v-model="formItem.taskNum" placeholder="请输入任务数量" :formatter="value => `${value}份`" :parser="value => value.replace('份', '')" v-if="!isPause"></InputNumber>
                            <InputNumber v-model="formItem.taskNum" placeholder="请输入任务数量" :formatter="value => `${value}份`" :parser="value => value.replace('份', '')" v-if="isPause" readonly></InputNumber>
                        </FormItem>  
                        <FormItem prop="version" label="用户手机型号 *">
                             <Select v-model="version" multiple style="width:220px">
                                <Option v-for="item in phoneVersion" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                             </Select>
                        </FormItem>  
                         <FormItem prop="theShelvesTime" label="预约下架时间">
                            <DatePicker type="date" placeholder="请预约下架时间" :options="noToday" :value="formItem.theShelvesTime" @on-change="soldOutTime"></DatePicker>
                        </FormItem>                     
                        <FormItem label="备注">
                            <Input v-model="formItem.remark" type="textarea" placeholder="请输入备注" />
                        </FormItem> 
                        <FormItem prop="taskCharacteristics" label="任务特点">
                            <Input v-model="formItem.taskCharacteristics" type="textarea" placeholder="请输入任务特点" />
                        </FormItem> 
                    </Col>
                    <Col span="7" offset="2">
                         <FormItem label="任务单价">
                            <InputNumber v-model="formItem.singlePrice" :min="0" placeholder="请输入任务单价" v-if="!isPause"></InputNumber>
                            <InputNumber v-model="formItem.singlePrice" :min="0" placeholder="请输入任务单价" v-if="isPause" readonly></InputNumber>
                        </FormItem>  
                        <FormItem label="任务总价">
                            <InputNumber v-model="formItem.totalPrice" readonly placeholder="请输入任务总价" :precision='2' :formatter="value => `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
                        </FormItem>  
                        
                        <FormItem prop="shelvesTime" label="预约上架时间">
                            <DatePicker type="date" placeholder="请预约上架时间" :options="noToday" :value="formItem.shelvesTime" @on-change="putawayTime"></DatePicker>
                        </FormItem>    
                        <FormItem prop="cation" label="注意事项说明">
                            <Input v-model="formItem.cation" type="textarea" placeholder="请输入注意事项说明" />
                        </FormItem> 
                           <FormItem prop="check" label="设定投放时间段 *">
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
                    </Col>
                  </Row>
                </TabPane>
                <!-- ************************************** -->
                <TabPane label="步骤信息">
                    <div style="margin-left:40px;"><Button size='large' type="primary" @click="addTask">添加分步骤任务</Button></div>
                     <div class="addInfo" v-for="(data,index) in this.formItem.taskStepVoList">
                    <div class="proHeader">
	              	 	<div>步骤 {{index+1}}</div>
	              	 	<div>----------------------------------------------------</div>
	              	 	<div @click="delate(index)" v-if="index !== 0"><span style="cursor:pointer;">删除</span></div>
	              	 </div>
                     <Row>
                    <Col span="7">
                        <FormItem prop="check" label="步骤类型">
                            <Select v-model="data.stepType"  style="width:220px">
                                <Option v-for="item in taskStyle" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                             </Select>
                        </FormItem>
                         
                         <FormItem :prop="'taskStepVoList.' + index + '.taskLink'" :rules="{required: true, message: 'please enter the information', trigger: 'blur'}" label="任务链接地址">
                             <Input v-model="data.taskLink" type="textarea" placeholder="请输入任务链接地址" />
                        </FormItem>   
                       <!-- <FormItem label="用户反馈说明      *">
                            <Input v-model="data.userFeedbackExplain" type="textarea" placeholder="请输入用户反馈说明" />
                        </FormItem> 
                        <FormItem label="商户反馈说明      *">
                            <Input v-model="data.tenantFeedbackExplain" type="textarea" placeholder="请输入商户反馈说明" />
                        </FormItem>  -->
                     
                         <FormItem :prop="'taskStepVoList.' + index + '.auditTime'" :rules="{required: true, message: 'please select the date',type: 'date',trigger: 'change'}" label="审核时间">
                            <DatePicker type="date" placeholder="请输入审核时间" :options="noToday" v-model="data.auditTime"></DatePicker>
                        </FormItem>  
                    	
                        
                    </Col>
                    <Col span="7" offset="2">
                         <FormItem label="分步骤单价">
                             <InputNumber v-model="data.stepPrice"  placeholder="请输入分步骤单价" :formatter="value => `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
                        </FormItem>  
                        <!-- <FormItem label="用户反馈形式      *">
                             <Select v-model="data.userFeedbackMode">
                                <Option v-for="item in userFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>  
                        <FormItem label="商户反馈形式      *">
                            <Select v-model="data.tenantFeedbackMode">
                                <Option v-for="item in tenantFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>   -->
                         <FormItem label="备注">
                            <Input v-model="data.remark" type="textarea" placeholder="请输入备注" />
                        </FormItem> 
                          <FormItem label="攻略图片">
                             <lazy :time = '200'>
                              <addpic @update="strategy1(index)" @remove="removeStrategy1(index)" :size='5' :defaultPic='data.strategyPic '></addpic>
                       		</lazy>
                          </FormItem>   

                       
                        </Col>
                    </Row>
                    <Row>
                    	 <FormItem :prop="'taskStepVoList.' + index + '.stepExplain'" :rules="{required: true, message: 'please enter the information', trigger: 'blur'}" label="步骤说明">
                             <!--<Input v-model="data.stepExplain" type="textarea" placeholder="请输入步骤说明" />-->
                             <lazy :time = '200'>
                             <div>
									<quill-editor 
							      v-model="data.stepExplain" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>
								</div>
								</lazy>
                        </FormItem> 
                    </Row>
                 </div>
                </TabPane>
                <!-- ************************************** -->
                <TabPane label="反馈信息">

                    <div class="addInfo" v-for="(data,index) in this.formItem.taskStepVoList">
                        <div class="proHeader">
                            <div>步骤 {{index+1}} &nbsp;&nbsp;&nbsp;&nbsp; <Button type="primary" @click="addFeedback(index)">添加反馈</Button> </div>  
                        </div>

                        <!-- userFeedbackExplain -->
                        
                           
                            <Row>
                                     <Col span="7">
                                     <div  v-for="(msg,num) in data.userFeedbackMode">
                                        <FormItem label="用户反馈形式">
                                            <div style="display:flex;height:52px;">
                                                {{num+1}}&nbsp;&nbsp;&nbsp;
                                                <Select v-model="msg.info">
                                                    <Option v-for="item in userFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                            </div>
                                        </FormItem>  
                                         </div>
                                    </Col>
                               
                        
                            <Col span="15" offset="1">
                              <div v-for="(msg,num) in data.userFeedbackExplain" style="display:flex;">
                                <FormItem label="用户反馈说明*必填.">
                                    <div style="display:flex">
                                        {{num+1}}&nbsp;&nbsp;&nbsp;
                                        <Input v-model="msg.info" type="textarea" placeholder="请输入用户反馈说明" />
                                    </div>
                                </FormItem> 
                                <Button type="primary" @click="delectFeedback(index,num)" style="height:30px;margin:10px 0 0 10px;" v-if="num!==0">删除用户反馈{{num+1}}</Button>
                                 </div>
                            </Col>
                             
                       
                            
                         </Row>
                 
                        


                        <Row>
                            <Col span="7"> 
                                <FormItem :prop="'taskStepVoList.' + index + '.tenantFeedbackMode'" :rules="{required: true, message: 'please enter the information', trigger: 'change'}" label="商户反馈形式">
                                    <Select v-model="data.tenantFeedbackMode">
                                        <Option v-for="item in tenantFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>  
                            </Col>
                            <Col span="7" offset="2">
                                <FormItem :prop="'taskStepVoList.' + index + '.tenantFeedbackExplain'" :rules="{required: true, message: 'please enter the information', trigger: 'blur'}" label="商户反馈说明">
                                    <Input v-model="data.tenantFeedbackExplain" type="textarea" placeholder="请输入商户反馈说明" />
                                </FormItem>    
                            </Col>
                        </Row>
                     </div>
                </TabPane>
            </Tabs>

     
                
             </Form>

             
    </div>
</template>

<script>
	 import lazy from "@/common/plLazy";
    import addpic from '@/common/update'
    export default {
        components:{
            addpic,
            lazy
        },
        name:'add_discount',
        data(){
            return{
                isPause:false,
                ruleValidate: {
                    endTime: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
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
            	flag:true,
                isChange:false,
                version:[],
                 modal:false,
                 taskType:'注册步骤',
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
                phoneVersion:[
                         {
                        value: '华为',
                        label: '华为'
                    },
                    {
                        value: 'OPPO',
                        label: 'OPPO'
                    },
                    {
                        value: 'vivo',
                        label: 'vivo'
                    },
                     {
                        value: '小米',
                        label: '小米'
                    },
                     {
                        value: '锤子',
                        label: '锤子'
                    },
                     {
                        value: 'HTC',
                        label: 'HTC'
                    },
                    {
                        value: '三星',
                        label: '三星'
                    },
                    {
                        value: '魅族',
                        label: '魅族'
                    },
                    {
                        value: '1加手机',
                        label: '1加手机'
                    },
                    {
                        value: '诺基亚',
                        label: '诺基亚'
                    },
                    {
                        value: '不限定',
                        label: '不限定'
                    }
                ],
                taskStyle:[
                       {
                        value: '1',
                        label: '注册步骤'
                    },
                    {
                        value: '2',
                        label: '试玩步骤'
                    },
                    {
                        value: '3',
                        label: '使用步骤'
                    }
                ],
                noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                tenant:'',
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
                formItem:{
                    amount:'',
                    balance:'',
                    cation:'',
                    createBy:'',
                    createTime:'',
                    endTime:'',
                    id:'',
                    name:'',
                    orderStr:'',
                    page:'',
                    putInTime:'',
                    remark:'',
                    rows:'',
                    shelvesTime:'',
                    singlePrice:1,
                    startTime:'',
                    status:'1',
                    taskNum:1,
                    taskStepVoList:[{
                            auditTime:'',
                            checkDay:'',
                            createBy:'',
                            createTime:'',
                            id:'',
                            remark:'',
                            stepExplain:'',
                            stepPrice:0,
                            stepType:'1',
                            strategyPic:[],
                            taskId:'',
                            taskLink:'',
                            tenantFeedbackExplain:'',
                            tenantFeedbackMode:'',
                            tryTime:'',
                            updateTime:'',
                            userFeedbackExplain:[{info:''}],
                            userFeedbackMode:[{info:''}]
                    }],
                    tenantId:'',
                    productId:'',             
                    taskCharacteristics:'',
                    tenantName:'',
                    theShelvesTime:'',
                    totalPrice:1,
                    tryTime :'',
                    type:'',
                    updateTime:'',
                    version:''
                },
                // 用户反馈形式选项
                userFeedback:[],
                // 商户反馈形式
                tenantFeedback:[]
            }
        },
        methods: {
        	onEditorBlur(){//失去焦点事件
            	console.log(this.allForm)
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },
            addFeedback(index){
                this.formItem.taskStepVoList[index].userFeedbackMode.push({info:''})
                this.formItem.taskStepVoList[index].userFeedbackExplain.push({info:''})
            },
            delectFeedback(index,num){
                this.formItem.taskStepVoList[index].userFeedbackMode.splice(num,1)
                this.formItem.taskStepVoList[index].userFeedbackExplain.splice(num,1)
            },
             ChangeStartTime(data){
                this.formItem.startTime = data;
                },
                ChangeEndTime(data){
                    this.formItem.endTime = data;
                },
                putawayTime(data){
                this.formItem.shelvesTime = data;
                },
                soldOutTime(data){
                this.formItem.theShelvesTime = data;
                },
                addTask(){
                  let a = {
                            auditTime:'',
                            checkDay:'',
                            createBy:'',
                            createTime:'',
                            id:'',
                            remark:'',
                            stepExplain:'',
                            stepPrice:0,
                            stepType:'1',
                            strategyPic:[],
                            taskId:'',
                            taskLink:'',
                            tenantFeedbackExplain:'',
                            tenantFeedbackMode:'',
                            tryTime:'',
                            updateTime:'',
                            userFeedbackExplain:[{info:''}],
                            userFeedbackMode:[{info:''}]
                        }
                        this.formItem.taskStepVoList.push(a)
                },
    
                delate(index){
                    this.formItem.taskStepVoList.splice(index,1)
                },
                  // 获取攻略图片
            strategy1(index){
                 if(typeof(this.formItem.taskStepVoList[index].strategyPic)=='string'){
                    this.formItem.taskStepVoList[index].strategyPic = this.formItem.taskStepVoList[index].strategyPic.split(',')
                }
                this.formItem.taskStepVoList[index].strategyPic.push(this.$store.state.shareUrl.url);
            },
            // 删除当前攻略图片
            removeStrategy1(index){
                if(typeof(this.formItem.taskStepVoList[index].strategyPic)=='string'){
                    this.formItem.taskStepVoList[index].strategyPic = this.formItem.taskStepVoList[index].strategyPic.split(',')
                }
                // index对应第几个说明，delectIndex对应说明里的第几张图片
                let delectIndex = this.$store.state.imgIndex
                this.formItem.taskStepVoList[index].strategyPic.splice(delectIndex,1)
            },
            save(name){
                 this.$refs[name].validate((valid) => {})

              		this.flag = true
            	if (this.formItem.endTime == ""||this.formItem.startTime == ""||this.formItem.totalPrice == 0||this.version.length == 0 ||this.formItem.shelvesTime == ""||this.formItem.taskCharacteristics == ""||this.formItem.theShelvesTime == ""||this.formItem.cation == ""||this.week == ""||this.hour[0] =="") {
              		    	 this.$Message.warning('信息没填完整，注意带  * 的字段');
              		    	 return;
            	}
            	if (this.formItem.taskStepVoList.length ==0) {
                   this.$Message.warning('至少添加一个分步骤任务!');
                   return;
            	}else{
            		let that = this;
            		let sum = 0;
            		that.formItem.taskStepVoList.forEach(function(i,index){
						sum = i.stepPrice + sum
            			if (i.stepType == ""||i.stepExplain ==""||i.taskLink ==""||i.userFeedbackExplain ==""||i.tenantFeedbackExplain ==""||i.auditTime ==""||i.stepPrice ==null||i.userFeedbackMode ==""||i.tenantFeedbackMode =="") {
              		    	 that.$Message.warning('步骤字段没填完整，注意带  * 的字段');
              		    	 that.flag = false
            			}
            		})
            		if (sum !== this.formItem.singlePrice) {
            			this.$Message.warning('分步骤的单价加起来要等于任务单价！！格格！！！！');
              		    	that.flag = false
            			}
                }

                let a = new Date(this.formItem.shelvesTime).getTime()
               let b = new Date(this.formItem.theShelvesTime).getTime()    
               if(a > b){
                   this.$Message.warning('上架时间不能大于下架时间!');
                   return;
               }
                let c = new Date(this.formItem.startTime).getTime()
	               let d = new Date(this.formItem.endTime).getTime() 
	               if(c > d){
	                   this.$Message.warning('有效起始时间不能大于截止时间!');
	                   return;
	               }
              if(this.flag == true){
                   this.formItem.putInTime = this.week.join(',')+'*'+this.hour.join('-')            
                    this.formItem.taskStepVoList.map((data)=>{
                        if(typeof(data.strategyPic)!=="string"){
                            data.strategyPic = data.strategyPic.join(',')
                        }
                        if(typeof(data.userFeedbackExplain)!=="string"){
                            let a = []
                             data.userFeedbackExplain.map((val)=>{
                                 a.push(val.info)
                             })
                            data.userFeedbackExplain = a.join('%@$%')
                        }
                        if(typeof(data.userFeedbackMode)!=="string"){
                            let b = []
                            data.userFeedbackMode.map((val)=>{
                                 b.push(val.info)
                             })
                            data.userFeedbackMode = b.join(';')
                        }
                    })
                    this.formItem.version = this.version.join(',')
                     let form = JSON.stringify(this.formItem)
                      console.log(this.formItem)
                      console.log(form)
                        this.$http({
                                method:'POST',
                                url: this.allUrl.addTask,
                                headers: {
                                    "content-type": "application/json"
                                },
                                responseType:'text/plain',
                                data:form
                            }).then((response)=>{
                                console.log(response)
                                if(response.data.ret == 'ok'){
                           
                                this.$Message.success('保存成功！');
                                this.$store.state.discountId = response.data.data.taskId
                                this.$router.push({path:'/readTaskOne',
                                            query: {
                                                tenantId:this.$route.query.tenant
                                            }
                                         })
                                }else{
                                    this.$Notice.warning({
                                        title: 'warning',
                                        desc: '保存失败！'
                                    });
                                }
                            })


                     }
            },
            //修改保存
            changeSave(name){
                this.$refs[name].validate((valid) => {})
                console.log(this.version)
             		this.flag = true
            	if (this.formItem.endTime == ""||this.formItem.startTime == ""||this.formItem.totalPrice == 0||this.version.length == 0 ||this.formItem.shelvesTime == ""||this.formItem.taskCharacteristics == ""||this.formItem.theShelvesTime == ""||this.formItem.cation == ""||this.week == ""||this.hour[0] =="") {
              		    	 this.$Message.warning('信息没填完整，注意带  * 的字段');
              		    	 return;
            	}
            	if (this.formItem.taskStepVoList.length ==0) {
                   this.$Message.warning('至少添加一个分步骤任务!');
                   return;
            	}else{
            		let that = this;
            		let sum = 0;
            		that.formItem.taskStepVoList.forEach(function(i,index){
                                sum = i.stepPrice + sum
                                console.log(i)
            			if (i.stepType == ""||i.stepExplain ==""||i.taskLink ==""||i.userFeedbackExplain ==""||i.tenantFeedbackExplain ==""||i.auditTime ==""||i.stepPrice ==null||i.userFeedbackMode ==""||i.tenantFeedbackMode =="") {
              		    	that.$Message.warning('步骤字段没填完整，注意带  * 的字段');
              		    	 that.flag = false
            			}
            		})
            		if (sum !== this.formItem.singlePrice) {
            			this.$Message.warning('分步骤的单价加起来要等于任务单价！！格格！！！！');
              		    	that.flag = false
            			}
            	}
                 let a = new Date(this.formItem.shelvesTime).getTime()
               let b = new Date(this.formItem.theShelvesTime).getTime()    
               if(a > b){
                   this.$Message.warning('上架时间不能大于下架时间!');
                   return;
               }
               let c = new Date(this.formItem.startTime).getTime()
	               let d = new Date(this.formItem.endTime).getTime() 
	               if(c > d){
	                   this.$Message.warning('有效起始时间不能大于截止时间!');
	                   return;
	               }
               if(this.flag==true){
                   this.formItem.putInTime = this.week.join(',')+'*'+this.hour.join('-')            
                    this.formItem.taskStepVoList.map((data)=>{
                        if(typeof(data.strategyPic)!=="string"){
                            data.strategyPic = data.strategyPic.join(',')
                        }
                        if(typeof(data.userFeedbackExplain)!=="string"){
                            let a = []
                             data.userFeedbackExplain.map((val)=>{
                                 a.push(val.info)
                             })
                            data.userFeedbackExplain = a.join('%@$%')
                        }
                        if(typeof(data.userFeedbackMode)!=="string"){
                            let b = []
                            data.userFeedbackMode.map((val)=>{
                                 b.push(val.info)
                             })
                            data.userFeedbackMode = b.join(';')
                        }
                    })
                    this.formItem.version = this.version.join(',')
                     let form = JSON.stringify(this.formItem)
                        this.$http({
                                method:'POST',
                                url: this.allUrl.updateTask,
                                headers: {
                                    "content-type": "application/json"
                                },
                                responseType:'text/plain',
                                data:form
                            }).then((response)=>{
                                console.log(response)
                                if(response.data.ret == 'ok'){
                                this.$Message.success('保存修改成功！');
                                this.$store.state.discountId = this.formItem.id
                                this.$router.push({path:'/readTaskOne',
                                            query: {
                                                tenantId:this.$route.query.tenant
                                            }
                                         })
                                }else{
                                    this.$Notice.warning({
                                        title: 'warning',
                                        desc: '保存失败！'
                                    });
                                }
                            })
               }

                
            }
        },
        updated() {
             

        },
        watch: {
          formItem: {
        　　　　handler(newValue, oldValue) {

        　　　　},
        　　　　deep: true
        　　},
          'formItem.taskNum':function(val,oldval){
                 this.formItem.totalPrice = val * this.formItem.singlePrice.toFixed(2)
            },
           'formItem.singlePrice':function (val,oldval) {
               this.formItem.totalPrice = this.formItem.taskNum * val.toFixed(2)
             }
        },
        mounted () {


        
        },
        beforeMount () {
            let query = this.$route.query;
            this.formItem.type = query.type;
            this.formItem.name = query.pro.split('*')[0];
            this.formItem.productId = query.pro.split('*')[1];
            this.formItem.tenantId = query.tenant;
              this.get(this.allUrl.findTaskProperties,{tenantId:query.tenant}).then((res)=>{
                this.formItem.tenantName = res.data.data.tenant.name;
                this.tenant = res.data.data.tenant;
                this.userFeedback = res.data.data.userFeedback;
                this.tenantFeedback = res.data.data.tenantFeedback;
            })
           
            if(query&&query.action=='change'){
                this.isChange = true;
                this.get(this.allUrl.findTask,{taskId:this.$store.state.discountId}).then((res)=>{
                    res.data.data.startTime = timestampToTime(res.data.data.startTime)
                    res.data.data.endTime = timestampToTime(res.data.data.endTime)
                    res.data.data.shelvesTime = timestampToTime(res.data.data.shelvesTime)
                    res.data.data.theShelvesTime = timestampToTime(res.data.data.theShelvesTime)
                	this.week = res.data.data.putInTime.split('*')[0].split(',')
                    this.hour = res.data.data.putInTime.split('*')[1].split('-')
                    if(res.data.data.version){
                        this.version = res.data.data.version.split(',')
                    }
                    console.log(res.data.data.taskStepVoList)
                   res.data.data.taskStepVoList.map((data)=>{
                          data.auditTime = this.changeTime(data.auditTime)
                           if(data.userFeedbackExplain){
                               let a = data.userFeedbackExplain.split('%@$%')   
                                       a.map((val,index)=>{
                                                        a[index] = {info:val}
                                                    })
                                data.userFeedbackExplain = a;
                           }
                           if(data.userFeedbackMode){
                               let b = data.userFeedbackMode.split(';')
                                     b.map((val,index)=>{
                                                        b[index] = {info:val}
                                                    })
                                    data.userFeedbackMode = b;
                           }     
                    })
                    this.formItem = res.data.data;           
                    if(res.data.data.status == '5'){
                            this.$Modal.confirm({
                                title: '修改任务',
                                content: '<p>审核人员:&nbsp;&nbsp;'+this.formItem.checkPerson+'</p><p>审核时间:&nbsp;&nbsp;'+timestampToTime(this.formItem.updateTime)+'</p><P>审核不通过—原因:&nbsp;&nbsp;'+this.formItem.failReason+'</P>'
                            });
                    }else if(res.data.data.status == '8'){
                        this.isPause = true;
                        this.$Modal.confirm({
                                title: '修改任务',
                                content: '<p>暂停时间:&nbsp;&nbsp;'+ timestampToTime(this.formItem.updateTime) +'</p><P>暂停原因:&nbsp;&nbsp;'+this.formItem.failReason+'</P>'
                            });
                    }
                    
                })
                
            }

        }
      
    }
    function timestampToTime(timestamp) {
        var date = new Date(timestamp);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
      
        return y + '-' + m + '-' + d; 
    }


</script>

<style scoped lang='scss'>
    .shareDiscount{
        width: 100%;
        height: 97%;
        overflow-y: auto;
        text-align: left;
        padding-bottom: 80px;
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
            line-height: 51px;height: 51px;width: 100%;
            padding-left: 40px;font-size: 28px;
            padding-right: 40px;
            text-align: left;border-bottom:1px solid #000000;
            display: flex;justify-content: space-between;
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
    .ivu-input-number{
        width: 100% !important;
    }
     .quill-editor{
		width: 500px;
	}
</style>