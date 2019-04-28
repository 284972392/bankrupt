<template>
    <!-- ham -->
    <div class="home">
        <div class="title">公众号管理</div>
        <div class="search">
            <div>
           公众号名称
            <Input v-model="LinkName" placeholder="公众号名称" style="width: 20%;" size="large"></Input>
            状态
             <Select v-model="linkStatus" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
            

             <ButtonGroup size="large">
                <Button type="primary" ghost @click="findLink">查询</Button>   
                <Button type="primary" ghost @click="LinkName='',linkStatus=''" style="margin-left:10px;">清空</Button>         
                <Button type="success" ghost @click="add" style="margin-left:10px;">新建任务</Button>         
            </ButtonGroup>
            </div>
        </div>
 

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right:30px;">全选</Button>
            </td>
   		 <Page :total='Number(totalNum)' show-elevator style="margin-left: 400px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
        </tr>
    </div>

    <!-- 添加 -->
     <Modal
        :mask-closable='false'
        v-model="addmodal"
        width="800"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>{{this.show}}</span>
        </p>
        <Form> 	
      
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">	 		    
              <Row>
              	 <Col span="9" offset="1">      
                <FormItem label="公众号真实名称" prop='realName'>
                        <Input v-model="formValidate.realName"  placeholder="请输入真实名称" />
                </FormItem> 
                <FormItem label="公众号展示名称" prop='showName'>
                        <Input v-model="formValidate.showName"  placeholder="请输入展示名称" />
                </FormItem>
                <FormItem label="任务数量" prop="number">
                        <InputNumber :precision='0' :min="min"  v-model="formValidate.number" placeholder="请输入数量"></InputNumber> 个
                </FormItem>
                </Col>
                 <Col span="7" offset="1">  
                    <FormItem label="任务单价" prop="price">
                        <InputNumber :min="min"  v-model="formValidate.price" placeholder="请输入单价"></InputNumber> 元
                </FormItem>
                <FormItem label="上传二维码" prop='logo'>
                    <lazy :time = '200'>
                      <addpic @update="strategy" @remove="removeStrategy" :size='1' v-if="addmodal" :defaultPic="formValidate.logo?'http://'+formValidate.logo:''"></addpic>
                    </lazy>
                </FormItem>
               </Col>
            </Row>

            <Row>
                <Col span='10'>
                 <FormItem label="问题1：" prop='question1'>
                        <Input v-model="formValidate.question1"  placeholder="请输入问题1" />
                </FormItem> 
                </Col>
            </Row>

                <Row>
                    <Col span='9'>
                        <FormItem label='答案选项：' prop='option11'>
                                <Input v-model="formValidate.option11"  placeholder="选项1" />
                        </FormItem> 
                    </Col>
                    <Col span='6'>
                        <FormItem prop='option12' :label-width='5'>
                                <Input v-model="formValidate.option12"  placeholder="选项2" />
                        </FormItem> 
                    </Col>
                    <Col span='6'>
                        <FormItem prop='option13' :label-width='5'>
                                <Input v-model="formValidate.option13"  placeholder="选项3" />
                        </FormItem> 
                    </Col>
                </Row>
                <Row>
                    <Col span='10'>
                    <FormItem label="正确答案" prop='answer1'>
                            <Input v-model="formValidate.answer1"  placeholder="请输入正确答案" />
                    </FormItem> 
                    </Col>
               </Row>

               <Row>
                <Col span='10'>
                 <FormItem label="问题2：" prop='question2'>
                        <Input v-model="formValidate.question2"  placeholder="请输入问题2" />
                </FormItem> 
                </Col>
            </Row>
                <Row>
                    <Col span='9'>
                        <FormItem label='答案选项：' prop='option21'>
                                <Input v-model="formValidate.option21"  placeholder="选项1" />
                        </FormItem> 
                    </Col>
                    <Col span='6'>
                        <FormItem prop='option22' :label-width='5'>
                                <Input v-model="formValidate.option22"  placeholder="选项2" />
                        </FormItem> 
                    </Col>
                    <Col span='6'>
                        <FormItem prop='option23' :label-width='5'>
                                <Input v-model="formValidate.option23"  placeholder="选项3" />
                        </FormItem> 
                    </Col>
                </Row>
                <Row>
                    <Col span='10'>
                    <FormItem label="正确答案" prop='answer2'>
                            <Input v-model="formValidate.answer2"  placeholder="请输入正确答案" />
                    </FormItem> 
                    </Col>
               </Row>
            

                </Form>
       
      </Form>    
         <div slot="footer" style="text-align:center;" v-if="!this.check">
            <Button v-if="!this.change" type="primary" size='large' @click="handleSubmit('formValidate')">添加</Button>
            <Button v-if="this.change" type="primary" size='large' @click="changeSubmit('formValidate')">修改</Button>
        </div>
    </Modal>	





   </div>
</template>


<script>
    import lazy from "@/common/plLazy";
    import addpic from '@/common/update';
    import foot from '@/components/footer.vue'

    export default {
        components:{
            foot,lazy,addpic
            
        },
        name:'',
        data(){
            const sortNumber = (rule, value, callback) => {
               
                if (value === 0||value == null) {
                    callback(new Error('请输入'));
                } else {
                    callback();
                }
                
                
            };
             const upBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {    
                                            this.changeState(params.row.id,1)
                                        }
                                    }
                                }, '上线')
                  }

              const endBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small',
                                        ghost:true
                                    },
                                    style: {
                                        margin: '5px',
                                        color:'#3a7bf4'
                                         },
                                    on: {
                                        click: () => {    
                                             this.changeState(params.row.id,3)
                                        }
                                    }
                                }, '结束任务')
                  }

                const changeBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small',
                                        ghost:true
                                    },
                                    style: {
                                        margin: '5px',
                                        color:'#3a7bf4'
                                         },
                                    on: {
                                        click: () => { 
                                            this.show = '修改任务'
                                            this.canUp = true   
                                            this.check = false
                                            this.change = true
                                            this.id = params.row.id
                                            this.findTaskById(params.row.id)
                                        }
                                    }
                                }, '修改')
                  }

              const offBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {    
                                             this.changeState(params.row.id,2)
                                        }
                                    }
                                }, '下线')
                  }

                 const reupBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {    
                                             this.changeState(params.row.id,1)
                                        }
                                    }
                                }, '重新上线')
                  }

                  const checkBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small',
                                        ghost:true
                                    },
                                    style: {
                                        margin: '5px',
                                        color:'#000'
                                         },
                                    on: {
                                        click: () => {    
                                            this.show = '查看详情'
                                            this.check = true
                                            this.findTaskById(params.row.id)
                                        }
                                    }
                                }, '查看详情')
                  }

            return{
                show:'新建任务',
                canUp:true,
                check:false,
                id:null,
                change:false,
                min:0,
                formValidate:{
                    realName:'',
                    showName:'',
                    logo:'',
                    number:0,
                    price:0,
                    question1:'',
                    option11:'',
                    option12:'',
                    option13:'',
                    answer1:'',
                    question2:'',
                    option21:'',
                    option22:'',
                    option23:'',
                    answer2:''
                },
                ruleValidate: {
                    realName: [
                        { required: true, message: '请输入真实名称', trigger: 'blur' }
                    ],
                    showName: [
                        { required: true, message: '请输入展示名称', trigger: 'blur' }
                    ],
        	       logo:[
                        { required: true, message: '请上传logo', trigger: 'change' }
                   ],
                    number:[
                         {required: true,validator: sortNumber, trigger: 'change' }
                   ],
                   price:[
                         {required: true,validator: sortNumber, trigger: 'change' }
                   ],
                   question1: [
                        { required: true, message: '请输入问题1', trigger: 'blur' }
                    ],
                    option11:[
                        { required: true, message: '请输入选项1', trigger: 'blur' }
                    ],
                    option12:[
                        { required: true, message: '请输入选项2', trigger: 'blur' }
                    ],
                    option13:[
                        { required: true, message: '请输入选项3', trigger: 'blur' }
                    ],
                   answer1:[
                        { required: true, message: '请输入正确答案', trigger: 'blur' }
                   ],
                   question2: [
                        { required: true, message: '请输入问题1', trigger: 'blur' }
                    ],
                    option21:[
                        { required: true, message: '请输入选项1', trigger: 'blur' }
                    ],
                    option22:[
                        { required: true, message: '请输入选项2', trigger: 'blur' }
                    ],
                    option23:[
                        { required: true, message: '请输入选项3', trigger: 'blur' }
                    ],
                   answer2:[
                        { required: true, message: '请输入正确答案', trigger: 'blur' }
                   ]
                },
                addmission:false,
                linkStatus:'',
                statusList:[
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value:0,
                        label: '未上线'	
                    },
                    {
                        value:1,
                        label: '已上线'	
                    },
                     {
                        value:2,
                        label: '已下线'	
                    },
                    {
                        value:3,
                        label: '已结束'	
                    }
                    
            	],

                LinkName:'',
                addmodal:false,
                totalNum:0,
                pageNum:1,
                pageSize:9,
                 columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed:'left'
                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                     {
                        title: '公众号名称',
                        align: 'center',
                        key: 'realName',
                        minWidth:130
                    },
                    {
                        title: '任务数量',
                        align: 'center',
                        key: 'num',
                        minWidth:130
                    },
   
                      {
                        title: '任务单价（元）',
                        align: 'center',
                        tooltip:'true',
                        key: 'price',
                        minWidth:200
                    },
                        {
                        title: '答对数量',
                        align: 'center',
                        tooltip:'true',
                        key: 'consumeNum',
                        minWidth:200
                    },
                      {
                        title: '上线时间',
                        align: 'center',
                        tooltip:'true',
                        key: 'putawayTime',
                        minWidth:200
                    },
                     {
                        title: '下线时间',
                        align: 'center',
                        tooltip:'true',
                        key: 'soldOutTime',
                        minWidth:200
                    },
                     {
                        title: '状态',
                        align: 'center',
                        tooltip:'true',
                        key: 'status',
                        minWidth:200
                    },
                      {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => { //根据状态显示有哪些操作
                                if(params.row.status=='未上线'){
                                        return h('div', [
                                             upBtn(h,params),
                                             endBtn(h,params),
                                             changeBtn(h,params)
                                        ])        
                                   }else if(params.row.status=='已上线'){
                                         return h('div', [
                                             offBtn(h,params),
                                        ])        
                                   }else if(params.row.status=='已下线'){
                                         return h('div', [
                                             reupBtn(h,params),
                                              endBtn(h,params),
                                              changeBtn(h,params),
                                        ])        
                                   }else if(params.row.status=='已结束'){
                                         return h('div', [
                                            checkBtn(h,params)
                                        ])        
                                   }
                             

                       
                        }
                    }
                    
                ],
                data:[

                ]
            }
        },
      methods:{
          handleSubmit(name){
      	this.$refs[name].validate((valid) => {
      		if(valid){
                  let formData = {
                      task:{
                          name:this.formValidate.showName,
                          realName:this.formValidate.realName,
                          num:this.formValidate.number,
                          price:this.formValidate.price,
                          logo:this.formValidate.logo
                      },
                      questionAnswers:[
                          {
                              question:this.formValidate.question1,
                              answer:this.formValidate.option11+'@@'+this.formValidate.option12+'@@'+this.formValidate.option13,
                              rightAnswer:this.formValidate.answer1
                          },
                          {
                              question:this.formValidate.question2,
                              answer:this.formValidate.option21+'@@'+this.formValidate.option22+'@@'+this.formValidate.option23,
                              rightAnswer:this.formValidate.answer2
                          }
                      ]
                  }
                this.addVipcn(formData)
  
  		      }
          })
          }
          ,
          changeSubmit(name){
      	this.$refs[name].validate((valid) => {
      		if(valid){
                  let formData = {
                      task:{
                          name:this.formValidate.showName,
                          realName:this.formValidate.realName,
                          num:this.formValidate.number,
                          price:this.formValidate.price,
                          logo:this.formValidate.logo,
                          id:this.id
                      },
                      questionAnswers:[
                          {
                              question:this.formValidate.question1,
                              answer:this.formValidate.option11+'@@'+this.formValidate.option12+'@@'+this.formValidate.option13,
                              rightAnswer:this.formValidate.answer1
                          },
                          {
                              question:this.formValidate.question2,
                              answer:this.formValidate.option21+'@@'+this.formValidate.option22+'@@'+this.formValidate.option23,
                              rightAnswer:this.formValidate.answer2
                          }
                      ]
                  }
                this.changeVipcn(formData)
  
  		      }
          })
          },

          //添加公众号
        addVipcn(form){
            let forms = JSON.stringify(form)
            if(this.canUp){
                this.canUp = false
                 this.$http({
						method:'POST',
						url: this.allUrlThree.addTask,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:forms
					}).then((res)=>{
                        this.canUp = true
						if (res.data.resultCode == "0") {
                                 this.$Message.success('添加成功');
                      this.handlePageSize(this.pageNum)
							  this.addmodal = false
						}else{
                                 this.$Message.success(res.data.resultMessage);
							
						}
					}).catch((err)=>{
                        this.canUp = true
                    })
            }
           
        },
        // 修改公众号
        changeVipcn(form){
              let forms = JSON.stringify(form)
              if(this.canUp){
                  this.canUp = false
                    this.$http({
						method:'POST',
						url: this.allUrlThree.updateTask,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:forms
					}).then((res)=>{
                        this.canUp = true
						if (res.data.resultCode == "0") {
                                 this.$Message.success('修改成功');
                      this.handlePageSize(this.pageNum)
							  this.addmodal = false
						}else{
                                 this.$Message.warning(res.data.resultMessage);
							
						}
					}).catch((err)=>{
                        this.canUp = true
                    })
              }
          
        },
        //修改公众号状态
        changeState(id,status){
            this.get(this.allUrlThree.updateTaskStatus,{taskId:id,status:status}).then((res)=>{
                if (res.data.resultCode == "0") {
                     this.$Message.success(res.data.resultMessage);
                      this.handlePageSize(this.pageNum)
                }else{
                        this.$Message.warning(res.data.resultMessage);
						}
            })
        },
        // 查询单个公众号
        findTaskById(id){
                this.get(this.allUrlThree.findTaskById,{taskId:id}).then((res)=>{
                     let list = res.data.data;
                     this.formValidate = {
                            realName:list.task.realName,
                            showName:list.task.name,
                            logo:list.task.logo,
                            number:list.task.num,
                            price:list.task.price,
                            question1:list.questionAnswers[0].question,
                            option11:list.questionAnswers[0].answer.split('@@')[0].substr(2),
                            option12:list.questionAnswers[0].answer.split('@@')[1].substr(2),
                            option13:list.questionAnswers[0].answer.split('@@')[2].substr(2),
                            answer1:list.questionAnswers[0].rightAnswer.substr(2),
                            question2:list.questionAnswers[1].question,
                            option21:list.questionAnswers[1].answer.split('@@')[0].substr(2),
                            option22:list.questionAnswers[1].answer.split('@@')[1].substr(2),
                            option23:list.questionAnswers[1].answer.split('@@')[2].substr(2),
                            answer2:list.questionAnswers[1].rightAnswer.substr(2)
                        }
                    this.addmodal = true
                })
        },
      	add(){
              this.show = '新建任务'
              this.check = false
              this.formValidate = {
                    realName:'',
                    showName:'',
                    logo:'',
                    number:0,
                    price:0,
                    question1:'',
                    option11:'',
                    option12:'',
                    option13:'',
                    answer1:'',
                    question2:'',
                    option21:'',
                    option22:'',
                    option23:'',
                    answer2:''
                }
              this.addmodal = true
              this.change = false
          },
          strategy(){
              this.formValidate.logo = this.$store.state.shareUrl.url.substr(7);
          },
          removeStrategy(){
              this.formValidate.logo = ""
          },
  
          findLink(){
              this.handlePageSize(1)
          },
           
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
          
             handlePageSize(value) { 
                 this.pageNum = value;
                  this.get(this.allUrlThree.getAfterTaskList,{realName:this.LinkName,status:this.linkStatus,page:value,size:9}).then((res)=>{
                        this.data = res.data.data.records
                        this.totalNum = res.data.data.total
                        this.data.forEach(function(i,index){
                            if (i.status == 0) {
                                i.status = "未上线"
                            }else if(i.status == 1){
                                i.status = "已上线"
                            }else if(i.status == 2){
                                i.status = "已下线"
                            }else if(i.status == 3){
                                i.status = "已结束"
                            }
                        })
                    })
             },
        

       
            
            },
           
        beforeMount() {
            this.get(this.allUrlThree.getAfterTaskList,{page:1,size:9}).then((res)=>{
                this.data = res.data.data.records
                 this.totalNum = res.data.data.total
                 this.data.forEach(function(i,index){
                    if (i.status == 0) {
                        i.status = "未上线"
                    }else if(i.status == 1){
                        i.status = "已上线"
                    }else if(i.status == 2){
                        i.status = "已下线"
                    }else if(i.status == 3){
                        i.status = "已结束"
                    }
                 })
            })
        },
    }

   
      
</script>

<style scoped lang="scss">
.style{
            color: red;
            font-size: 16px;
        }
    .home{
        width:98%;height: 100%;
        margin: 20px 20px 0px 20px; 
        background: #fff;
        
        .title{
            height: 51px;width: 100%;line-height: 51px;
            padding-left: 40px;font-size: 28px;
            text-align: left;border-bottom:1px solid #000000;
        }
        .search{
    
            line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 5px;margin-right: 5px;}
        }
        .all_users{
            height: 40px;line-height: 40px;width: 180px;text-align: center;
            background: #0099cc;color: #ffffff;margin:20px 0;font-size: 18px;
            margin-left: 40px;cursor: pointer;
        }
       .table{
           margin-left: 40px;
           margin-top: 10px;
           .btn_tr{
                    width: 100%;height: 60px;
                    line-height: 60px;
                    }
            }

          
    }
    .addRoleBox{      
        margin-bottom: 20px;
        .ivu-modal{
        top: 388px!important;
        
        }
    }
</style>