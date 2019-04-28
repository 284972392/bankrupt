<template>
    <div class="home">
        <div class="title">待审核奖励</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="领取编号/用户手机号/领取名称" style="width: 26%;" size="large"></Input>
              选择时间段
      	<!-- <DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
      	<DatePicker type="date" :value="endTime_" @on-change="endTime" placeholder="Select date" style="width: 200px"></DatePicker> -->
           <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>
            
          <div>
          	
          </div>
        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllGetRec()">全部任务({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="CheckPe()">待审核({{count.toAudit}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="FailGet()">领取失败({{count.violation}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="SucGet()">领取成功({{count.normal}})</div>
            <!-- <div class="btn_state" :class="{active:shows==5}" @click="noPass_nav()">不通过({{count.violation}})</div>
            <div class="btn_state" :class="{active:shows==6}" @click="wait()">待第三方反馈({{count.toFeedback}})</div> -->
       </div>

        <div class="state_con2">
        领取编号&nbsp;&nbsp;<i-switch v-model="show2" style="margin-right: 5px"></i-switch>
        领取名称&nbsp;&nbsp; <i-switch v-model="show3" style="margin-right: 5px"></i-switch>
        领取类别&nbsp;&nbsp;<i-switch v-model="show1" style="margin-right: 5px"></i-switch>
        申请时间&nbsp;&nbsp; <i-switch v-model="show4" style="margin-right: 5px"></i-switch>
        领取金额&nbsp;&nbsp; <i-switch v-model="show5" style="margin-right: 5px"></i-switch>
        用户名称&nbsp;&nbsp; <i-switch v-model="show6" style="margin-right: 5px"></i-switch>
        手机号&nbsp;&nbsp; <i-switch v-model="show7" style="margin-right: 5px"></i-switch>
        状态&nbsp;&nbsp; <i-switch v-model="show8" style="margin-right: 5px"></i-switch>
        审核人员&nbsp;&nbsp; <i-switch v-model="show9" style="margin-right: 5px"></i-switch>
        审核时间&nbsp;&nbsp; <i-switch v-model="show10" style="margin-right: 5px"></i-switch>
    </div>
    <div class="state_con2">
        表格尺寸&nbsp;&nbsp;
         <Radio-group v-model="tableSize" type="button">
            <Radio label="large">大</Radio>
            <Radio label="default">中</Radio>
            <Radio label="small">小</Radio>
        </Radio-group>
        
    </div>
   
    <div class="table">
        
        <Table border ref="selection"  :columns="tableColumns" :data="data1"  :size="tableSize"></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
            
            </td>
        <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->
        
        	
    </div>





    <Modal v-model="show" footer-hide  scrollable width="800" :styles="{top: '20px'}">
         <p slot="header" style="text-align:center;font-size:20px;color:#f60;"> 
            <span>查 看</span>
        </p>
        <p style="font-size: 25px;font-weight: bold;margin-bottom:10px;">初始信息</p>
         <Row>
             <Col span="12">
                <p style="height:40px;font-size:15px;">领取名称&nbsp;&nbsp;&nbsp; {{taskContent.taskName}}</p>
                <p style="height:40px;font-size:15px;">用户名称&nbsp;&nbsp;&nbsp; {{taskContent.userName==null||taskContent.userName==''?'无':taskContent.userName}}</p>
                 <p style="height:40px;font-size:15px;">用户手机号&nbsp;&nbsp;&nbsp; {{taskContent.userPhone==null||taskContent.userPhone==''?'无':taskContent.userPhone}}</p>
                <p style="height:40px;font-size:15px;">领取金额&nbsp;&nbsp;&nbsp; {{taskContent.reward}}元</p>   
                <!-- <p style="height:40px;font-size:15px;">审核时间&nbsp;&nbsp;&nbsp; {{taskContent.operationDate}}</p>     -->
                <p style="height:40px;font-size:15px;" v-if="taskContent.taskType=='办卡赚'">预留姓名&nbsp;&nbsp;&nbsp; {{taskContent.name==null||taskContent.name==''?'无':taskContent.name}}</p>
             </Col>
             <Col span="12" offset="0">
                  <p style="height:40px;font-size:15px;">用户编号&nbsp;&nbsp;&nbsp; {{taskContent.userId}}</p>    
                  <p style="height:40px;font-size:15px;">任务类别&nbsp;&nbsp; {{taskContent.taskType}}</p>  
                  <p style="height:40px;font-size:15px;">领取编号&nbsp;&nbsp;&nbsp; {{taskContent.id}}</p>
                  <p style="height:40px;font-size:15px;">申请时间&nbsp;&nbsp;&nbsp; {{taskContent.createTime}}</p>
                  <!-- <p style="height:40px;font-size:15px;">领取状态&nbsp;&nbsp;&nbsp; {{taskContent.status}}</p> -->
                  <p style="height:40px;font-size:15px;" v-if="taskContent.taskType=='办卡赚'">预留手机号&nbsp;&nbsp;&nbsp; {{taskContent.phone==null||taskContent.phone==''?'无':taskContent.phone}}</p>               
              </Col>
          </Row>
     
         
          <p style="font-size: 25px;font-weight: bold;margin-bottom:10px;">凭证</p>
          <Row>  
              <div>
                   <Col span="5" offset="0">
                        <div v-if="taskContent.taskType=='办卡赚'"><p style="height:40px;font-size:15px;">图片</p> </div>
                        <div v-if="taskContent.taskType!=='办卡赚'">
                               <p style="height:70px;font-size:15px;" v-for="data in taskContent.userFeedbackMode">
                                    {{data}}   
                                </p> 
                        </div>
                    </Col>
                    <Col span="8" offset="0">
                        <div v-if="taskContent.taskType=='办卡赚'"><p style="height:40px;font-size:15px;">图片凭证</p> </div>                 
                        <div v-if="taskContent.taskType!=='办卡赚'">
                               <p style="height:70px;font-size:15px;" v-for="data in taskContent.userFeedbackExplain">
                                    {{data}}   
                                </p> 
                        </div>
                    </Col>
                    <Col span="11" offset="0">
                        <div v-if="taskContent.taskType=='办卡赚'"><p style="height:80px;font-size:15px;">
                            <span v-for="(data,index) in taskContent.voucherUrl" v-if="taskContent.voucherUrl.length!==0">
                                <img :src="'http://'+data" alt="" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg('http://'+data)">
                            </span>       
                            <span v-if="taskContent.voucherUrl.length==0">无</span>    
                            </p>
                        </div>
                        <div v-if="taskContent.taskType!=='办卡赚'">
                             <p style="height:70px;font-size:15px;" v-for="data in voucherInfo">
                                    <span v-if="typeof(data.info)=='string'">{{data.info}}</span>
                                    <span v-if="typeof(data.info)!=='string'" v-for="msg in data.info">
                                        <img :src="'http://'+msg" alt="" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg('http://'+msg)">
                                    </span>
                             </p> 
                        </div>
                    </Col> 
              </div>             
          </Row>
          <p style="font-size: 25px;font-weight: bold;margin-bottom:10px;">结果信息</p> 
            <Row>
                <Col span="13" offset="0">
                    <p style="height:40px;font-size:15px;">领取状态&nbsp;&nbsp;&nbsp; {{taskContent.status}}</p>
                    <p style="height:40px;font-size:15px;" v-if="taskContent.status!=='待审核'">审核人员&nbsp;&nbsp;&nbsp; {{taskContent.operateBy}}</p>   
                    <div style="height:40px;font-size:15px;display:flex;" v-if="taskContent.status=='领取失败'">
                        <div>不通过原因</div> &nbsp;&nbsp;&nbsp; 
                        <span v-if="taskContent.failureReason == null||taskContent.failureReason ==''">无</span>
                        <div v-if="taskContent.failureReason!==null&&taskContent.failureReason!=''" style="width: 320px;word-wrap: break-word;word-break: normal;">{{taskContent.failureReason}}</div>
                    </div>  
                </Col>
                <Col span="8" offset="0">
                    <p style="height:40px;font-size:15px;" v-if="taskContent.status!=='待审核'">审核时间&nbsp;&nbsp;&nbsp; {{taskContent.operationDate}}</p>   
                      <p style="height:80px;font-size:15px;" v-if="taskContent.status=='领取失败'">附件&nbsp;&nbsp;&nbsp;
                            <span v-if="taskContent.attachment.length!==0" v-for="(data,index) in taskContent.attachment">
                                <img :src="data" alt="" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg(data)">
                            </span>
                            <span v-if="taskContent.attachment.length==0">无</span>     
                        </p>
                </Col>
            </Row>
            <p style="height:30px;"></p>
    </Modal>









               <!--引入审核弹框-->
        <Modal
        v-model="modal2"
        width="800"
        :styles="{top: '20px'}"
        >
         <p slot="header" style="color:#f60;text-align:center">
            <span>审核</span>
        </p>
        <p style="font-size: 25px;font-weight: bold;margin-bottom:10px;">初始信息</p>
       <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="用户名称">
     	  	 	 	{{detail.userName==''||detail.userName==null?'无':detail.userName}}
      		  </FormItem> 
            <FormItem label="用户手机号">
                    
                   {{detail.userPhone==''||detail.userPhone==null?'无':detail.userPhone}} 
      		  </FormItem> 
                 <FormItem label="领取名称">
                    
                   {{detail.taskName}} 
      		  </FormItem> 
                <FormItem label="领取金额">
     	  	 	 	<span style="color:red;font-size:15px;">{{detail.reward}} </span>元
      		  </FormItem> 
            <!-- <FormItem label="领取凭证">
                <span v-for="(data,index) in detail.voucherUrl" v-if="detail.voucherUrl.length!==0">
                        <img :src="'http://'+data" alt="" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg('http://'+data)">
                    </span>       
                      <span v-if="detail.voucherUrl.length==0">无</span>  
      		  </FormItem>  -->
     
            <!-- <FormItem label="领取状态">
     	  	 	 	{{detail.status}} 
      		  </FormItem>  -->
                <p style="height:40px;font-size:15px;" v-if="detail.taskType=='办卡赚'">预留手机号&nbsp;&nbsp;&nbsp; {{detail.phone==''||detail.phone==null?'无':detail.phone}}</p>
                 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="用户编号">
                     {{detail.userId}}
      		  </FormItem> 
            <FormItem label="任务类别">
     	  	 	 	{{detail.taskType}}
      		  </FormItem> 
             <FormItem label="申请时间">
     	  	 	 	{{detail.createTime}}
      		  </FormItem>
            <FormItem label="领取后余额">
     	  	 	 	{{(detail.balance+detail.reward).toFixed(2)}}元
      		  </FormItem> 
                <p style="height:40px;font-size:15px;" v-if="detail.taskType=='办卡赚'">预留姓名&nbsp;&nbsp;&nbsp; {{detail.name==''||detail.name==null?'无':detail.name}}</p>
                
       	 </Col>
       </Row>
      </Form>

      <p style="font-size: 25px;font-weight: bold;margin-bottom:10px;">凭证</p>
          <Row>  
              <div>
                   <Col span="5" offset="0">
                        <div v-if="detail.taskType=='办卡赚'"><p style="height:40px;font-size:15px;">图片</p> </div>
                        <div v-if="detail.taskType!=='办卡赚'">
                               <p style="height:70px;font-size:15px;" v-for="data in detail.userFeedbackMode">
                                    {{data}}   
                                </p> 
                        </div>
                    </Col>
                    <Col span="8" offset="0">
                        <div v-if="detail.taskType=='办卡赚'"><p style="height:40px;font-size:15px;">图片凭证</p> </div>                 
                        <div v-if="detail.taskType!=='办卡赚'">
                               <p style="height:70px;font-size:15px;" v-for="data in detail.userFeedbackExplain">
                                    {{data}}   
                                </p> 
                        </div>
                    </Col>
                    <Col span="11" offset="0">
                        <div v-if="detail.taskType=='办卡赚'"><p style="height:80px;font-size:15px;">
                            <span v-for="(data,index) in detail.voucherUrl" v-if="detail.voucherUrl.length!==0">
                                <img :src="'http://'+data" alt="" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg('http://'+data)">
                            </span>       
                            <span v-if="detail.voucherUrl.length==0">无</span>    
                            </p>
                        </div>
                        <div v-if="detail.taskType!=='办卡赚'">
                             <p style="height:70px;font-size:15px;" v-for="data in voucherInfo">
                                    <span v-if="typeof(data.info)=='string'">{{data.info}}</span>
                                    <span v-if="typeof(data.info)!=='string'" v-for="msg in data.info">
                                        <img :src="'http://'+msg" alt="" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg('http://'+msg)">
                                    </span>
                             </p> 
                        </div>
                    </Col> 
              </div>
               
          </Row>
           <p style="font-size: 25px;font-weight: bold;margin-bottom:10px;">结果信息</p> 
            <Row>
                     <p style="height:40px;font-size:15px;">领取状态&nbsp;&nbsp;&nbsp; {{detail.status}}</p>
            </Row>
       <div slot="footer">
            <Button  size="large"  @click="pass">通过</Button>
            <Button  size="large"  @click="noPass">不通过</Button>
        </div>
    </Modal>




        <!-- **************************************************************************************************************** -->
     <Modal
        v-model="modal3"
        title="提示"
        @on-ok="passConfirm"
        >
        <p>确认通过审核？</p>
    </Modal>

      <Modal
        v-model="modal4"
        title="提示"
        @on-ok="noPassForm"
        >
        <Form> 	
       <Row>
       	 <Col>      	 		    
      		  <FormItem label="不通过原因">
     	  	 	  <Input v-model="noPassInfo.reason" type="textarea" placeholder="请输入不通过原因" />
      		  </FormItem> 
              <FormItem label="附件">
     	  	 	  <addpic @update="detailStyle" @remove="removeDe" :size='3'></addpic>
      		  </FormItem> 
         
       	 </Col>
       </Row>  
      </Form>
    </Modal>

    <Modal
        v-model="modal5"
        title="提示"
        @on-ok="noPassFormLast"
        >
        <p>确认不通过审核？</p>
    </Modal>

    <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>

            <foot></foot>
    </div>
    
</template>

<script>
    import addpic from '@/common/update'
    import foot from '@/components/footer.vue'
    export default {
        components:{
            foot,
            addpic
        },
        name:'',
        data(){
            const checkbtn = (h, params) => { 
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
                                            
                                               this.taskContent = params.row
                                               this.voucherInfo = [];
                                                if(this.taskContent.voucherUrl!==''&&this.taskContent.voucherUrl!==null&&typeof(this.taskContent.voucherUrl)=='string'){
                                                   this.taskContent.voucherUrl = this.taskContent.voucherUrl.split(";")
                                               }else if(this.taskContent.voucherUrl==null||this.taskContent.voucherUrl==''){
                                                   this.taskContent.voucherUrl = []
                                               }

                                               if(this.taskContent.taskType!=='办卡赚'){
                                                   if(typeof(this.taskContent.userFeedbackMode)=='string'){
                                                       this.taskContent.userFeedbackMode = this.taskContent.userFeedbackMode.split(';')   
                                                   }
                                                    if(typeof(this.taskContent.userFeedbackExplain)=='string'){
                                                       this.taskContent.userFeedbackExplain = this.taskContent.userFeedbackExplain.split('%@$%')   
                                                   }                                                
                                                        let Index;let flag=false;
                                                        if(this.taskContent.userFeedbackMode){
                                                             this.taskContent.userFeedbackMode.map((val,index)=>{
                                                            if(val=='图片'){
                                                                Index = index;
                                                                flag = true;
                                                            }
                                                             })
                                                        }
                                                       
                                                        if(!flag){
                                                            if(this.taskContent.voucherContent!==null){
                                                                this.taskContent.voucherContent.split('%@$%').map((val)=>{   
                                                                this.voucherInfo.push({"info":val})
                                                                })
                                                            }
                                                        }else{
                                                            if(this.taskContent.voucherContent!==null){
                                                                this.taskContent.voucherContent.split('%@$%').map((val)=>{
                                                                    let a = {'info':val}
                                                                this.voucherInfo.push(a)                   
                                                                    })
                                                            }
                                                                this.voucherInfo.splice(Index,0,{"info":this.taskContent.voucherUrl})
                                                        }
                                                }
                                               
                                               if(this.taskContent.attachment!==null&&this.taskContent.attachment!==''&&typeof(this.taskContent.attachment)=='string'){
                                                   this.taskContent.attachment = this.taskContent.attachment.split(",")
                                               }else if(this.taskContent.attachment==''||this.taskContent.attachment==null){
                                                   this.taskContent.attachment = []
                                               }
                                               console.log(this.taskContent)
                                               this.show = true         
                                             
                                        }
                                        
                                    }
                                }, '查看')            
             };
           

             const auditBtn = (h, params) => { 
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
                                            this.voucherInfo = [];
                                             if(this.detail.voucherUrl!==null&&typeof(this.detail.voucherUrl)=='string'){
                                                   this.detail.voucherUrl = this.detail.voucherUrl.split(";")
                                               }else if(this.detail.voucherUrl==null){
                                                   this.detail.voucherUrl = []
                                               }
                                            
                                             if(this.detail.taskType!=='办卡赚'){
                                                   if(typeof(this.detail.userFeedbackMode)=='string'){
                                                       this.detail.userFeedbackMode = this.detail.userFeedbackMode.split(';')   
                                                   }
                                                    if(typeof(this.detail.userFeedbackExplain)=='string'){
                                                       this.detail.userFeedbackExplain = this.detail.userFeedbackExplain.split('%@$%')   
                                                   }                                                
                                                        let Index;let flag=false;
                                                        this.detail.userFeedbackMode.map((val,index)=>{
                                                            if(val=='图片'){
                                                                Index = index;
                                                                flag = true;
                                                            }
                                                        })
                                                        if(!flag){
                                                            if(this.detail.voucherContent!==null){
                                                                this.detail.voucherContent.split('%@$%').map((val)=>{   
                                                                this.voucherInfo.push({"info":val})
                                                                })
                                                            }
                                                        }else{
                                                            if(this.detail.voucherContent!==null){
                                                                this.detail.voucherContent.split('%@$%').map((val)=>{
                                                                    let a = {'info':val}
                                                                this.voucherInfo.push(a)                   
                                                                    })
                                                            }
                                                                this.voucherInfo.splice(Index,0,{"info":this.detail.voucherUrl})
                                                        }

                                                }


                                            this.modal2 = true    

                                        }
                                    }
                                }, '审核')            
             };

            return{
                checkbtn:checkbtn,
                auditBtn:auditBtn,
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
                show7:true,
                show8:true,
                show9:true,
                show10:true,
                voucherInfo:[],
                 selectTime_:'',
            	startTime_:"",
            	endTime_:"",

                visible:false,
                imgName:'',

                count:{},
                taskContent:{
                    voucherUrl:[]
                },
                show:false,
                nowStatus:'',
                allNum:0,
                totalNum:0,
                shows:'1',
                modal2:false,
                modal3:false,
                modal4:false,
                modal5:false,
                  detail:{
                      voucherUrl:[]
                },
                noPassInfo:{
                    reason:'',
                    attachment:[]
                },
                value:'',
                pageNum:1,
                pageSize:9,
                model1: '',
                //  columns: [
                //     {
                //         type: 'selection',
                //         width: 60,
                //         align: 'center',
                //         fixed:'left'
                //     },
                //     {
                //         title: '领取编号',
                //         align: 'center',
                //         key: 'id',
                //         minWidth:100
                //     },
                //     {
                //         title: '领取名称',
                //         align: 'center',
                //         key: 'taskName',
                //         minWidth:120
                //     },
                //      {
                //         title: '申请时间',
                //         align: 'center',
                //         key: 'createTime',
                //         minWidth:150
                //     },
                //      {
                //         title: '领取金额（元）',
                //         align: 'center',
                //         key: 'reward',
                //         minWidth:80
                //     },
                //      {
                //         title: '用户名称',
                //         align: 'center',
                //         key: 'userName',
                //         minWidth:120
                //     },
                //     {
                //         title: '用户手机号',
                //         align: 'center',
                //         key: 'userPhone',
                //         minWidth:115
                //     },
                //      {
                //         title: '状态',
                //         align: 'center',
                //         key: 'status',
                //         width:130
                //     },      
                //      {
                //         title: '审核人员',
                //         align: 'center',
                //         key: 'operateBy',
                //         minWidth:120
                //     },
                //     {
                //         title: '领取类别',
                //         align: 'center',
                //         key: 'taskType',
                //         minWidth:90
                //     },
                //       {
                //         title: '审核时间',
                //         align: 'center',
                //         key: 'operationDate',
                //         minWidth:150
                //     },
                //     {
                //         title: '操作',
                //         key: 'action',
                //         fixed:'right',
                //         width: 180,
                //         align: 'center',
                //         render: (h, params) => {      
                //             if(params.row.status == '待审核'){
                //                 return h('div', [
                //                       auditBtn(h,params),
                //                       checkbtn(h,params)
                //                  ]); 
                //             }else{
                //                 return h('div', [
                //                       checkbtn(h,params)
                //                  ]);               
                //             }         
                                  
                //         }
                //     }
                // ],
                data1:[],
                tableSize: 'default'
            }
        },
        computed:{
           tableColumns (){
               let columns = [];
                    columns.push({
                       type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed:'left'
                    })
                    columns.push({
                        type: 'index',
                        width: 60,
                        align: 'center'
                    })
                    
                if (this.show2) {
                    columns.push({
                       title: '领取编号',
                        align: 'center',
                        key: 'id',
                        minWidth:100
                    })
                }
                if (this.show3) {
                    columns.push({
                       title: '领取名称',
                        align: 'center',
                        key: 'taskName',
                        minWidth:120
                    })
                }
                if(this.show1){
                    columns.push({
                         title: '领取类别',
                        align: 'center',
                        key: 'taskType',
                        minWidth:120
                    })
                }
                if (this.show4) {
                    columns.push({
                        title: '申请时间',
                        align: 'center',
                        key: 'createTime',
                        minWidth:150
                    })
                }
                if (this.show5) {
                    columns.push({
                      title: '领取金额（元）',
                        align: 'center',
                        key: 'reward',
                        minWidth:120
                    })
                }
                if (this.show6) {
                    columns.push({
                       title: '用户名称',
                        align: 'center',
                        key: 'userName',
                        minWidth:120
                    })
                }
                if (this.show7) {
                    columns.push({
                          title: '用户手机号',
                        align: 'center',
                        key: 'userPhone',
                        minWidth:115
                    })
                }
                if (this.show8) {
                    columns.push({
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        minWidth:130
                    })
                }
                if (this.show9) {
                    columns.push({
                      title: '审核人员',
                        align: 'center',
                        key: 'operateBy',
                        minWidth:120
                    })
                }
                if (this.show10) {
                    columns.push({
                       title: '审核时间',
                        align: 'center',
                        key: 'operationDate',
                        minWidth:150
                    })
                }

                columns.push({ 
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {      
                            if(params.row.status == '待审核'){
                                return h('div', [
                                      this.auditBtn(h,params),
                                      this.checkbtn(h,params)
                                 ]); 
                            }else{
                                return h('div', [
                                      this.checkbtn(h,params)
                                 ]);               
                            }         
                                  
                        }
                })
                return columns;
           }
        },
        methods:{

        	SelectTime(data){
                  this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },

            viewImg(data){
                this.visible = true;
                this.imgName = data;
            },

             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            //全部领取记录
            AllGetRec(){
                this.nowStatus = ''
                this.shows = 1
                this.value = ''
                this.pageNum = 1
                 this.get(this.allUrl.findAppTaskRecordAuditPage,{page:1,rows:9,taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                     console.log(res)
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.operationDate = this.changeTime(i.operationDate)
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.taskType = changeType(i.taskType)
                    })
                    this.data1 = res.data.rows
                })
            },
            //待审核
            CheckPe(){
                this.shows = 2
                this.nowStatus = '5'
                this.pageNum = 1
                 this.get(this.allUrl.findAppTaskRecordAuditPage,{page:1,rows:9,status:'5',taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.operationDate = this.changeTime(i.operationDate)
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.taskType = changeType(i.taskType)
                    })
                    this.data1 = res.data.rows
                })
            },
            //失败
            FailGet(){
                this.shows = 3
                this.nowStatus = '6'
                this.pageNum = 1
                  this.get(this.allUrl.findAppTaskRecordAuditPage,{page:1,rows:9,status:'6',taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                  	console.log(res)
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.operationDate = this.changeTime(i.operationDate)
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.taskType = changeType(i.taskType)
                    })
                    this.data1 = res.data.rows
                })
            },
            //成功
            SucGet(){
                this.shows = 4
                this.nowStatus = '7'
                this.pageNum = 1
                  this.get(this.allUrl.findAppTaskRecordAuditPage,{page:1,rows:9,status:'7',taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.operationDate = this.changeTime(i.operationDate)
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.taskType = changeType(i.taskType)
                    })
                    this.data1 = res.data.rows
                })
            },

            handlePageSize(value){
                this.pageNum = value;
                this.get(this.allUrl.findAppTaskRecordAuditPage,{page:value,rows:9,status:this.nowStatus,taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                   
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.operationDate = this.changeTime(i.operationDate)
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.taskType = changeType(i.taskType)
                    })
                    this.data1 = res.data.rows
                })
            },
            search(){
//                if(this.value == ''&&this.startTime_ == ""&&this.endTime_ ==""){
//                   this.$Message.warning('查询内容不能为空！');
//              }else
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else{
                    this.nowStatus = ''
                    this.shows = 1
                     this.get(this.allUrl.findAppTaskRecordAuditPage,{page:1,rows:9,taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                   	console.log(res)
                   this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.operationDate = this.changeTime(i.operationDate)
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.taskType = changeType(i.taskType)
                    })
                    this.data1 = res.data.rows
                 })
                }
              
            },
            clear(){
                this.value = ''
                this.nowStatus = ''
                this.startTime_=""
                this.endTime_ =""
                this.selectTime_ = ''
            },
              pass(){
                this.modal2 = false
                this.modal3 = true
            },
            noPass(){
                this.modal2 = false
                this.modal4 = true
            },
            passConfirm(){
                let info = {id:this.detail.id,status:7}
                 this.$http({
						method:'POST',
						url: this.allUrl.updateAppTaskRecordStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('审核成功');
                            this.get(this.allUrl.findAppTaskRecordAuditPage,{page:this.pageNum,rows:9,status:this.nowStatus,taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{           
                                this.totalNum = res.data.total;
                                res.data.rows.forEach((i,index)=>{        
                                    i.operationDate = this.changeTime(i.operationDate)
                                    i.createTime = this.changeTime(i.createTime)
                                    i.status = changeStatus(i.status)
                                    i.taskType = changeType(i.taskType)
                                })
                                this.data1 = res.data.rows
                            })
                        }else if(response.data.ret=='error'){
                            this.$Message.error(response.data.errordesc);
                        }
                    })
            },
        
            detailStyle(){
                this.noPassInfo.attachment.push(this.$store.state.shareUrl.url)
            },
            removeDe(){
                let delectIndex = this.$store.state.imgIndex
                this.noPassInfo.attachment.splice(delectIndex,1)
            },
            noPassForm(){
                if(this.noPassInfo.reason==''){
                    this.$Message.warning('请输入原因')
                }else{
                    this.modal5 = true
                }
                
            },
            noPassFormLast(){
               let info = {
                   id:this.detail.id,
                   status:6,
                   failureReason:this.noPassInfo.reason,
                   attachment:this.noPassInfo.attachment.join(',')
               }
                   this.$http({
						method:'POST',
						url: this.allUrl.updateAppTaskRecordStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('审核成功');
                           this.get(this.allUrl.findAppTaskRecordAuditPage,{page:this.pageNum,rows:9,status:this.nowStatus,taskName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{           
                                this.totalNum = res.data.total;
                                res.data.rows.forEach((i,index)=>{        
                                    i.operationDate = this.changeTime(i.operationDate)
                                    i.createTime = this.changeTime(i.createTime)
                                    i.status = changeStatus(i.status)
                                    i.taskType = changeType(i.taskType)
                                })
                                this.data1 = res.data.rows
                            })
                        }else if(response.data.ret=='error'){
                            this.$Message.error(response.data.errordesc);
                        }
                    })
            }
        },
        beforeMount() {
            this.get(this.allUrl.findAppTaskRecordAuditPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                    i.operationDate = this.changeTime(i.operationDate)
                    i.createTime = this.changeTime(i.createTime)
                    i.status = changeStatus(i.status)
                    i.taskType = changeType(i.taskType)
                  })
                this.data1 = res.data.rows
            })
            this.get(this.allUrl.countAppTaskRecord).then((res)=>{
                this.count = res.data.data
                console.log(this.count)
            })
        },
    }


     function changeStatus(param) { 
        var info = ''
        switch(param){
            case 5:
              info = '待审核'
            break;
            case 6:
              info = '领取失败'
              break;
            case 7:
              info = '领取成功'
              break;
        }
        return info;
     }
     function changeType(param) { 
        var info = ''
        switch(param){
            case 1:
              info = '注册赚'
            break;
            case 2:
              info = '应用赚'
              break;
            case 3:
              info = '办卡赚'
              break;
            case 4:
              info = '游戏赚'
              break;
        }
        return info;
     }
    
 
</script>

<style scoped lang="scss">
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
            line-height: 71px;font-size: 24px;padding: 10px 0 10px 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 17px;margin-right: 55px;}
        }
    .state_con{
        display: flex;
        .btn_state{
            height: 40px;line-height: 40px;padding: 0 10px;text-align: center;
            background: #9e9c9c;color: #ffffff;margin:20px 0;font-size: 18px;
            margin-left: 40px;cursor: pointer;
        }
        .active{
            background: rgb(100, 190, 226);
        }
    }
    .state_con2{
        display: flex;height: 40px;margin-left: 35px;
        line-height: 28px;
    }
        
       .table{
           margin-left: 40px;
           .btn_tr{
                    width: 100%;height: 60px;
                    line-height: 60px;
                    }
            }

          
    }
</style>