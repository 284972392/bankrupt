
<template>
    <div class="home">
        <div class="title">
            <p>简单赚任务列表</p>
        </div>
       <div class="search">
       
                        任务名称
            <Input v-model="easyMakeName" placeholder="任务名称" style="width: 15%;" size="large"></Input>

   		       任务状态 ：          
                <Select v-model="status" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
	                   
        <ButtonGroup size="large">
                <Button type="primary" ghost @click="find" style="margin-left:20px;">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>   
                <Button type="primary" ghost @click="addTask" style="margin-left:10px;">添加任务</Button>   
           </ButtonGroup>
   

      
          
       </div>

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
   		 <Page :total='Number(totalNum)' show-elevator @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
       </tr>
    </div>

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
                   <Col span='9'>
                        <FormItem label='任务名称：' prop='name'>
                                <Input v-model="formValidate.name"  placeholder="任务名称" />
                        </FormItem> 
                        <FormItem label='任务截图说明：' prop='easyMakeExplain'>
                                <Input v-model="formValidate.easyMakeExplain"  placeholder="任务截图说明" />
                        </FormItem> 
                        <FormItem label='任务特点：' prop='characteristics'>
                                <Input v-model="formValidate.characteristics"  placeholder="任务特点" />
                        </FormItem> 
                        <FormItem prop="shelvesTime" label="预约上架时间">
                            <DatePicker type="datetime" placeholder="请预约上架时间" :options="noToday" :value="formValidate.shelvesTime" @on-change="putawayTime"></DatePicker>
                        </FormItem>    
                    </Col>
                      <Col span='9'>
                        <FormItem label='任务单价：' prop='singlePrice'>
                               <InputNumber :min="min"  v-model="formValidate.singlePrice" placeholder="请输入单价"></InputNumber> 元
                        </FormItem> 
                         <FormItem label="任务数量" prop="num">
                                <InputNumber :precision='0' :min="min"  v-model="formValidate.num" placeholder="请输入数量"></InputNumber> 个
                        </FormItem>
                        <FormItem label='任务链接：' prop='easyMakeLink'>
                                <Input v-model="formValidate.easyMakeLink"  placeholder="任务链接" />
                        </FormItem> 
                        <FormItem prop="theShelvesTime" label="预约下架时间">
                            <DatePicker type="datetime" placeholder="请预约下架时间" :options="noToday" :value="formValidate.theShelvesTime" @on-change="soldOutTime"></DatePicker>
                        </FormItem>   
                         
                      </Col>
                </Row>
                <Row>
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
                </Row>
                <Row>
                        <FormItem label='有效时间：' prop='expirationMin'>
                               <InputNumber :min="min"  v-model="formValidate.expirationMin" placeholder="请输入有效时间"></InputNumber> 分钟
                        </FormItem>       
                 </Row>
                <Row>
                    <Col span='9'>
                      <FormItem label='提示信息：' prop='cation'>
                                <Input v-model="formValidate.cation"  placeholder="提示信息" />
                        </FormItem> 
                     </Col>
                </Row>
                </Row>
                    <Row>
                       
                         <FormItem label="攻略图片">
                             <lazy :time = '200'>
                              <addpic @update="strategy()" @remove="removeStrategy()" :size='5' :defaultPic='formValidate.strategyPic' v-if="addmodal"></addpic>
                       		</lazy>
                          </FormItem>
                    </Row> 
                     <Row>
                         <FormItem label="列表图片">
                             <lazy :time = '200'>
                              <addpic @update="strategy2()" @remove="removeStrategy2()" :size='1' :defaultPic='formValidate.listPic' v-if="addmodal"></addpic>
                       		</lazy>
                          </FormItem>
                    </Row> 

            </Form>

      </Form>    
         <div slot="footer" style="text-align:center;">
            <Button v-if="!this.change" type="primary" size='large' @click="handleSubmit('formValidate')">添加</Button>
            <Button v-if="this.change" type="primary" size='large' @click="changeSubmit('formValidate')">修改</Button>
        </div>
    </Modal>	

     <Modal
        :mask-closable='false'
        v-model="checkModal"
        width="800"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>查看</span>
        </p>
        <Row>
            <Col span='12'>
                <div class="pp"> <p>任务名称：</p> <span>{{checkInfo.name}}</span></div>
                <div class="pp"> <p>截图说明：</p> <span>{{checkInfo.easyMakeExplain}}</span></div>
                <div class="pp"> <p>任务特点：</p>  <span>{{checkInfo.characteristics}}</span></div>
                <div class="pp"> <p>上架时间：</p>  <span>{{checkInfo.shelvesTime}}</span></div>
            </Col>
            <Col span='9'>
                <div class="pp"> <p>任务单价：</p> <span>{{checkInfo.singlePrice}}</span></div>
                <div class="pp"> <p>任务数量：</p> <span>{{checkInfo.num}}</span></div>
                <div class="pp"> <p>有效时间：</p> <span>{{checkInfo.expirationMin }} </span> 分钟</div>
                <div class="pp"> <p>下架时间：</p> <span>{{checkInfo.theShelvesTime}}</span></div>
            </Col>
        </Row> 
        <Row>
             <div class="pp"> <p>投放时间段：</p> <span>{{checkInfo.putInTime}}</span></div>
             <div class="pp"> <p>任务链接：</p> <span>{{checkInfo.easyMakeLink}}</span></div>
             <div class="pp"> <p>提示信息：</p> <span>{{checkInfo.cation}}</span></div>
        </Row>
        <Row>
            <Form>
                <FormItem label="攻略图片:">
                     <img :src="data" alt="" v-for="data in strPic" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg(data)">
                </FormItem>   

                <FormItem label="列表图片:">
                   <img :src="data" alt="" v-for="data in listPic" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg(data)">
                </FormItem>   
            </Form>
        </Row>
      </Modal>	

      <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>
    </div>
    
</template>


<script>
	 import lazy from "@/common/plLazy";
    import addpic from '@/common/updateNew'

    export default {
        name:'',
        components:{
            addpic,
            lazy
        },
        data(){
            const sortNumber = (rule, value, callback) => {
                if (value === 0||value == null) {
                    callback(new Error('请输入'));
                } else {
                    callback();
                }
            };
            const changeBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.formValidate = params.row
                                          this.change = true
                                          this.show = '修改'
                                          this.addmodal = true;
                                          if(params.row.putInTime){
                                              this.week = params.row.putInTime.split('*')[0].split(',')
                                             this.hour = params.row.putInTime.split('*')[1].split('-')       
                                          }else{
                                              this.week = ''
                                              this.hour = ''
                                          }
                                         
                                          console.log(this.formValidate)
                                        }
                                    }
                                }, '修改')            
             };
            const checkBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.checkInfo = params.row  
                                          if(params.row.strategyPic){
                                              this.strPic = params.row.strategyPic.split(';')
                                          }else{
                                              this.strPic = []
                                          }
                                          if(params.row.listPic){
                                              this.listPic = params.row.listPic.split(';')
                                          }else{
                                              this.listPic = []
                                          }
                                          
                                          this.checkModal = true;
                                        }
                                    }
                                }, '查看')            
             };
              const putBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.detail = params.row
                                          this.upTask()
                                        }
                                    }
                                }, '上架')            
             };
             const offBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                           this.detail = params.row
                                          this.offTask()
                                        }
                                    }
                                }, '下架')            
             };

            return{
                imgName:null,
                visible:false,
                strPic:[],
                listPic:[],
                checkInfo:{

                },
                checkModal:false,
                noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                formValidate:{
                  name:'',
                  singlePrice:1,
                  num:1,
                  easyMakeExplain:'',
                  characteristics:'',
                  easyMakeLink:'',
                  shelvesTime:'',
                  theShelvesTime:'',
                  totalPrice:1,
                  type:1,
                  createBy:'',
                  strategyPic:[],
                  listPic:'',
                  status:0,
                  putInTime:'',
                  expirationMin:0,
                  cation:''
                },
                 ruleValidate: {
                      name: [
                        { required: true, message: '请输入真实名称', trigger: 'blur' }
                    ],
                      num:[
                         {required: true,validator: sortNumber, trigger: 'change' }
                   ],
                   singlePrice:[
                         {required: true,validator: sortNumber, trigger: 'change' }
                   ],
                   easyMakeExplain: [
                       { required: true, message: '请输入任务说明', trigger: 'blur' }
                   ],
                   characteristics:[
                       { required: true, message: '请输入任务特点', trigger: 'blur' }
                   ],

                    shelvesTime: [
                        { required: true, type: 'string', message: 'Please select the date', trigger: 'change' }
                    ],
                    theShelvesTime: [
                        { required: true, type: 'string', message: 'Please select the date', trigger: 'change' }
                    ],
                    expirationMin:[
                           {required: true,validator: sortNumber, trigger: 'change' }
                    ],
                    cation:[
                        { required: true, message: '请输入提示信息', trigger: 'blur' }
                    ]
                 },
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
                week:'',
                 hour:'',
                 min:0,
                addmodal:false,
                show:'新建任务',
                change:false,
                detail:{},
                status:null,
                easyMakeName:null,
        		statusList:[
            		 {
                        value: 0,
                        label: '待上架'
                    },
                    {
                        value: 1,
                        label: '已上架'
                    },
                    {
                        value: 2,
                        label: '已下架'
                    	
                    },
            	],
                totalNum:0,
                pageNum:1,
                pageSize:9,
                 columns: [
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },

                    {
                        title: '任务名',
                        align: 'center',
                        key: 'name',
                        minWidth:100
                    },
                     {
                        title: '单价',
                        align: 'center',
                        key: 'singlePrice',
                        minWidth:100
                    },
                    {
                        title: '总价',
                        align: 'center',
                        key: 'totalPrice',
                        minWidth:100
                    },
                    {
                        title: '剩余数量',
                        align: 'center',
                        key: 'num',
                        minWidth:100
                    },
                     {
                        title: '上架时间',
                        align: 'center',
                        key: 'shelvesTime',
                        minWidth:150
                    },
                     {
                        title: '下架时间',
                        align: 'center',
                        key: 'theShelvesTime',
                        minWidth:150
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'status'
                    },
                      {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 180,
                        align: 'center',
                        render: (h, params) => { 
                      
                            if(params.row.status == '待上架'||params.row.status == '已下架'){
                                return h('div', [
                                      putBtn(h,params),
                                      checkBtn(h,params),
                                      changeBtn(h,params)
                                 ]); 
                            }else if(params.row.status == '已上架'){
                                 return h('div', [
                                      offBtn(h,params),
                                      checkBtn(h,params)
                                 ]); 
                            }
                                  
                        }
                     }

         
     
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
          viewImg(data){
                this.visible = true;
                this.imgName = data;
            },
          addTask(){
              this.change = false;
              let creatBy = JSON.parse(localStorage.getItem('TokenKey')).realName;
              this.formValidate={
                  name:'',
                  singlePrice:1,
                  num:1,
                  easyMakeExplain:'',
                  characteristics:'',
                  easyMakeLink:'',
                  shelvesTime:'',
                  theShelvesTime:'',
                  totalPrice:1,
                  type:1,
                  createBy:creatBy,
                  strategyPic:[],
                  listPic:'',
                  status:0,
                  putInTime:'',
                  expirationMin:0,
                  cation:''
                },
               this.show = '新建任务';
                this.addmodal = true;
          },
        handleSubmit(name){
         	this.$refs[name].validate((valid) => {
      		if(valid){ 
                if(this.week==''||this.hour==''||this.formValidate.strategyPic==[]||this.formValidate.listPic==''){
                     this.$Message.warning('信息没填完整');
              		    	 return;
                }else{
                    this.formValidate.putInTime = this.week.join(',')+'*'+this.hour.join('-')
                    if(typeof(this.formValidate.strategyPic)!=='string'){
                        this.formValidate.strategyPic = this.formValidate.strategyPic.join(';')
                    }
                    this.formValidate.totalPrice = (this.formValidate.singlePrice * this.formValidate.num).toFixed(2)
                    
                    this.addEasyTask()
                }
                    }
                })
        },
        changeSubmit(name){
            this.$refs[name].validate((valid) => {
               
      		if(valid){ 
                if(this.week==''||this.hour==''||this.formValidate.strategyPic==[]||this.formValidate.listPic==''){
                     this.$Message.warning('信息没填完整');
              		    	 return;
                }else{
                    
                    this.formValidate.putInTime = this.week.join(',')+'*'+this.hour.join('-')
                  
                    if(typeof(this.formValidate.strategyPic)!=='string'){
                        this.formValidate.strategyPic = this.formValidate.strategyPic.join(';')
                    }
  
                    this.formValidate.totalPrice = (this.formValidate.singlePrice * this.formValidate.num).toFixed(2)
                    this.formValidate.status = '0'
                    this.changeTask()
                }
                    }
            })
        },
        // 修改任务
        changeTask(){
               let info = this.formValidate
          
             this.$http({
						method:'POST',
						url: this.allUrlThree.updateEasyMake,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.resultCode=='1'){
                                this.$Message.success('修改成功');
                                this.addmodal = false
                                this.handlePageSize(this.pageNum)
                            }else{
                                this.$Message.error(response.data.resultMessage);
                            }
                    })
        },
        // 添加任务
        addEasyTask(){
            let info = this.formValidate
             this.$http({
						method:'POST',
						url: this.allUrlThree.addEasyMake,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.resultCode=='1'){
                                this.$Message.success('添加成功');
                                this.addmodal = false
                                this.handlePageSize(this.pageNum)
                            }else{
                                this.$Message.error(response.data.resultMessage);
                            }
                    })

        },
        putawayTime(data){
                this.formValidate.shelvesTime = data;
                },
        soldOutTime(data){
                this.formValidate.theShelvesTime = data;
                },
                  // 获取攻略图片
            strategy(){
                 if(typeof(this.formValidate.strategyPic)=='string'){
                    this.formValidate.strategyPic = this.formValidate.strategyPic.split(';')
                }
                this.formValidate.strategyPic.push(this.$store.state.shareUrl.url);
            },
            // 删除当前攻略图片
            removeStrategy(){
                if(typeof(this.formValidate.strategyPic)=='string'){
                    this.formValidate.strategyPic = this.formValidate.strategyPic.split(',')
                }
                // index对应第几个说明，delectIndex对应说明里的第几张图片
                let delectIndex = this.$store.state.imgIndex
                this.formValidate.strategyPic.splice(delectIndex,1)
            },
            // 列表图片
             strategy2(){
                     this.formValidate.listPic = this.$store.state.shareUrl.url     
             },
             removeStrategy2(){
                  this.formValidate.listPic = ''
             },

        // 上架
        upTask(){
             let info = {
                   id:this.detail.id,
                   status:1,
               }
              this.$http({
						method:'POST',
						url: this.allUrlThree.easyMakeupdateEasyMakeStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        console.log(response)
                          if(response.data.resultCode=='1'){
                                this.$Message.success('上架成功');
                                this.handlePageSize(this.pageNum)
                            }else{
                                this.$Message.error(response.data.resultMessage);
                            }
                    })

        },
       // 下架
        offTask(){
             let info = {
                   id:this.detail.id,
                   status:2,
               }
              this.$http({
						method:'POST',
						url: this.allUrlThree.easyMakeupdateEasyMakeStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        console.log(response)
                          if(response.data.resultCode=='1'){
                                this.$Message.success('下架成功');
                                this.handlePageSize(this.pageNum)
                            }else{
                                this.$Message.error(response.data.resultMessage);
                            }
                    })
        },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
             handlePageSize(value) {
                 this.pageNum = value;
                  	this.get(this.allUrlThree.getEasyMakePage,{page:this.pageNum,size:9,status:this.status,easyMakeName:this.easyMakeName}).then((res)=>{
            		res.data.data.records.forEach((i,index)=>{
                        i.status = this.changeStatus(i.status)
                         i.shelvesTime = this.changeTime(i.shelvesTime)
                         i.theShelvesTime = this.changeTime(i.theShelvesTime)
                    })
                      this.data1 = res.data.data.records;
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            	})

             },
            //  查询
              find(){
                  this.pageNum = 1;
                
            	this.get(this.allUrlThree.getEasyMakePage,{page:1,size:9,status:this.status,easyMakeName:this.easyMakeName}).then((res)=>{
            		res.data.data.records.forEach((i,index)=>{
                        i.status = this.changeStatus(i.status)
                         i.shelvesTime = this.changeTime(i.shelvesTime)
                         i.theShelvesTime = this.changeTime(i.theShelvesTime)
                    })
                      this.data1 = res.data.data.records;
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            	})
			
			
               
            },
            clear(){
                this.easyMakeName = null
                this.status = null
            },
            changeStatus(data){
                let result = '';
                if(data== '0'){
                    result = '待上架'
                }else if(data=='1'){
                    result = '已上架'
                }else if(data=='2'){
                    result = '已下架'
                }
                return result;
            }
            
            },
 
            mounted(){
                this.formValidate.createBy = JSON.parse(localStorage.getItem('TokenKey')).realName;
                this.get(this.allUrlThree.getEasyMakePage,{page:1,size:9,status:this.status,easyMakeName:this.easyMakeName}).then((res)=>{
               		  this.data1 = res.data.data.records;
            		res.data.data.records.forEach((i,index)=>{
                         i.status = this.changeStatus(i.status)	
                           i.shelvesTime = this.changeTime(i.shelvesTime)
                         i.theShelvesTime = this.changeTime(i.theShelvesTime)
            		})
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            	})
           },
            
    }
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}   
</script>

<style scoped lang="scss">
.pp{
   height: 50px;
    display: flex;
    p{
        width: 100px;
    }
    span{
        color: red;
 
    }
}
.ivu-col-span-13 {
    display: block;
    width: 27.166667%;
}
    .home{
        width:98%;height: 100%;
        margin: 20px 20px 0px 20px; 
        background: #fff;

        .title{
            height: 51px;width: 100%;line-height: 51px;
            padding-left: 40px;font-size: 28px;
            padding-right: 40px;
            text-align: left;
            border-bottom:1px solid #000000;
            display: flex; justify-content: space-between;
        }
        .search{
           line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
        }
   	     .all_users{
            height: 40px;line-height: 40px;width: 180px;text-align: center;
            background: #0099cc;color: #ffffff;margin:20px 0;font-size: 18px;
            margin-left: 40px;cursor: pointer;
        }
       .table{
           margin-left: 40px;
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