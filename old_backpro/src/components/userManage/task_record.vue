 <template>
    <div class="appTaskRecord">
        <div class="title">
            <p>任务记录</p>
            <Poptip
                confirm
                title="导出当前筛选表格?"
                @on-ok="exportData"
              >
               <Button type="primary" size="large" style="height:35px;"><Icon type="ios-download-outline"></Icon> 导出表格</Button>
            </Poptip>
        </div>
        
        <div class="search">
            搜索
            <Input v-model="value" placeholder="任务名称/用户手机号" style="width: 16%;" size="large"></Input>
            状态    
            <Select v-model="model1" style="width:15%;margin-left:10px;margin-right:25px;" size="large">
                <Option v-for="item in userStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            参与时间
          <DatePicker type="datetimerange" :value='selectTime_2' placeholder="请选择时间段" @on-change='SelectTime2' style="width: 280px;font-size:18px;"></DatePicker>
            
            <div>
          	  <!-- 选择时间段
      	<DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
      	<DatePicker type="date" :value="endTime_" @on-change="endTime"  placeholder="Select date" style="width: 200px"></DatePicker> -->
          
          操作时间
           <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 280px;font-size:18px;margin-right:20px;"></DatePicker>
          
          任务类型    
            <Select v-model="model_task" style="width:15%;margin-right:37px;" size="large">
                <Option v-for="item in taskStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>
          </div>
      
        </div>
       
       <div class="state_con">
            <div class="btn_state active" @click="AllRecord()">全部记录({{allNum}})</div>

       </div>
        
       

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
                 
             
            </td>

   	
            <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>

        </tr>
    
    
        	
    </div>
    
            <foot></foot>
     <!-- <Modal v-model="show" footer-hide  scrollable  :styles="{top: '200px'}" width='600' >
         <p slot="header" style="text-align:center;font-size:20px;color:#f60;"> 
            <span>查 看</span>
        </p>
         <Row>
             <Col span="12">
                <p style="height:40px;font-size:15px;">任务编号&nbsp;&nbsp;&nbsp; {{taskContent.id}}</p>
                <p style="height:40px;font-size:15px;">用户名称&nbsp;&nbsp;&nbsp; {{taskContent.userName}}</p>
                <p style="height:40px;font-size:15px;">任务状态&nbsp;&nbsp;&nbsp; {{taskContent.status}}</p>
                <p style="height:40px;font-size:15px;">任务金额&nbsp;&nbsp;&nbsp; {{taskContent.reward}}元</p>
                 <p style="height:40px;font-size:15px;" v-if="taskContent.taskType==3">预留手机号&nbsp;&nbsp;&nbsp; {{taskContent.phone}}</p>
                  <p style="height:80px;font-size:15px;">领取凭证&nbsp;&nbsp;&nbsp; 
                       <span v-for="(data,index) in taskContent.voucherUrl" v-if="taskContent.voucherUrl.length!==0">
                        <img :src="'http://'+data" alt="" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg('http://'+data)">
                    </span>       
                      <span v-if="taskContent.voucherUrl.length==0">无</span>  
                </p>
             </Col>
             <Col span="12" offset="0">
                  <p style="height:40px;font-size:15px;">任务名称&nbsp;&nbsp;&nbsp; {{taskContent.taskName}}</p>    
                  <p style="height:40px;font-size:15px;">用户手机号&nbsp;&nbsp; {{taskContent.userPhone}}</p>  
                  <p style="height:40px;font-size:15px;">操作时间&nbsp;&nbsp;&nbsp; {{taskContent.modifyTime}}</p>
                  <p style="height:40px;font-size:15px;" v-if="taskContent.taskType==3">预留姓名&nbsp;&nbsp;&nbsp; {{taskContent.name}}</p>
                   <p style="height:40px;font-size:15px;">任务状态&nbsp;&nbsp;&nbsp; {{taskContent.status}}</p>
                  
              </Col>
          </Row>
    </Modal> -->

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




    <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>
    </div>
    
</template>

<script>
    import foot from '@/components/footer.vue'
    export default {
        components:{
            foot
        },
        name:'',
        data(){
            return{
                 voucherInfo:[],
                visible:false,
                imgName:'',
                selectTime_:'',
                selectTime_2:'',
            	startTime_:"",
                endTime_:"",
                startTime_2:'',
                endTime_2:'',
                show:false,
                taskContent:{
                    voucherUrl:[]
                },
                exportTable:[],
                allNum:0,
                totalNum:0,
                pageNum:1,
                pageSize:9,
                shows:'1',
                value:'',
                 userStatus: [
                    {
                        value: 1,
                        label: '任务进行中'
                    },
                    {
                        value: 5,
                        label: '平台审核中'
                    },
                    {
                        value: 6,
                        label: '领取失败'
                    },
                    {
                        value: 7,
                        label: '任务成功'
                    },
                    {
                        value:'',
                        label:'全部'
                    }
                ],
                model1: '',
                taskStatus:[
                     {
                        value: 1,
                        label: '注册赚'
                    },
                    {
                        value: 2,
                        label: '应用赚'
                    },
                    {
                        value: 3,
                        label: '办卡赚'
                    },
                    {
                        value: 4,
                        label: '游戏赚'
                    },
                    {
                        value:'',
                        label:'全部'
                    }
                ],
                model_task:'',
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
                        title: '任务记录编号',
                        align: 'center',
                        key: 'id',
                        width:120
                    },
                    {
                        title: '任务编号',
                        align: 'center',
                        key: 'taskId',
                        width:120
                    },
                    {
                        title: '任务名称',
                        align: 'center',
                        key: 'taskName',
                        width:150
                    },
                    {
                        title: '任务金额(元)',
                        align: 'center',
                        key: 'reward',
                        width:120
                    },
                     {
                        title: '任务类型',
                        align: 'center',
                        key: 'taskType',
                        width:150
                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'userName',
                        width:150
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'userPhone',
                        width:150
                    },
                     {
                        title: '预留姓名',
                        align: 'center',
                        key: 'name',
                        width:150
                    },
                      {
                        title: '预留手机号',
                        align: 'center',
                        key: 'phone',
                        width:150
                    },
                     {
                        title: '参与时间',
                        align: 'center',
                        key: 'partakeDate',
                        width:180
                    },
                     {
                        title: '操作时间',
                        align: 'center',
                        key: 'operationDate',
                        width:180
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width:150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                         
                            return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {                          
                                                    this.taskContent = params.row;
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
                                                        this.taskContent.userFeedbackMode.map((val,index)=>{
                                                            if(val=='图片'){
                                                                Index = index;
                                                                flag = true;
                                                            }
                                                        })
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
                                 ]);
                        
                            }
                    }
                ],
                data1:[]
            }
        },
        methods:{
            exportData(){
                this.get(this.allUrl.findAppTaskRecordList,{taskName:this.value,status:this.model1,beginTime:this.startTime_,finishTime:this.endTime_,taskType:this.model_task,beginTime2:this.startTime_2,finishTime2:this.endTime_2}).then((res)=>{
                    console.log(res.data.data.appTaskRecordVoList)
                    res.data.data.appTaskRecordVoList.forEach((i,index)=>{    
                        console.log(1)    
                         i.modifyTime = this.changeTime(i.modifyTime)
                         i.createTime = this.changeTime(i.createTime)
                         i.partakeDate = this.changeTime(i.partakeDate)
                         i.operationDate = this.changeTime(i.operationDate)
                         i.status = changeStatus(i.status)
                         i.taskType = changeTask(i.taskType)
                    })
                    this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.appTaskRecordVoList)
                    this.$refs.selection.exportCsv({
                                filename: '任务记录表格',
                                columns:this.columns,
                                data: this.exportTable
                            });
                 })
            },
            viewImg(data){
                this.visible = true;
                this.imgName = data;
            },
            SelectTime(data){
                this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },
            SelectTime2(data){
                this.selectTime_2 = data
                this.startTime_2 = data[0]
                this.endTime_2 = data[1]
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
            //全部领取记录
            AllRecord(){
                this.get(this.allUrl.findAppTaskRecordPage,{page:1,rows:9,taskType:this.model_task,taskName:this.value,status:this.model1,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.createTime = this.changeTime(i.createTime)
                        i.partakeDate = this.changeTime(i.partakeDate)
                        i.operationDate = this.changeTime(i.operationDate)
                        i.status = changeStatus(i.status)
                        i.taskType = changeTask(i.taskType)
                    })
                this.data1 = res.data.rows
                 })
            },
             handlePageSize(value){
                 this.pageNum = value;
                 this.get(this.allUrl.findAppTaskRecordPage,{page:value,rows:9,taskType:this.model_task,taskName:this.value,status:this.model1,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2}).then((res)=>{
                 this.totalNum = res.data.total       
                    res.data.rows.forEach((i,index)=>{        
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.createTime = this.changeTime(i.createTime)
                            i.partakeDate = this.changeTime(i.partakeDate)
                            i.operationDate = this.changeTime(i.operationDate)
                            i.status = changeStatus(i.status)
                            i.taskType = changeTask(i.taskType)
                        })
                    this.data1 = res.data.rows
                })
            },
            search(){
//              if(this.value==''&&this.model1==''){
//                   this.$Message.warning('查询内容不能为空！');
//              }
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.startTime_2 > this.endTime_2){
                    this.$Message.warning('时间段填反了')
                }else{
                    this.pageNum = 1
                     this.get(this.allUrl.findAppTaskRecordPage,{page:1,rows:9,taskType:this.model_task,taskName:this.value,status:this.model1,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2}).then((res)=>{
                    this.allNum = res.data.total
                    this.totalNum = res.data.total
                        res.data.rows.forEach((i,index)=>{        
                                i.modifyTime = this.changeTime(i.modifyTime)
                                i.createTime = this.changeTime(i.createTime)
                                i.partakeDate = this.changeTime(i.partakeDate)
                                i.operationDate = this.changeTime(i.operationDate)
                                i.status = changeStatus(i.status)
                                i.taskType = changeTask(i.taskType)
                            })
                        this.data1 = res.data.rows
                    })
                }
                
            },
            clear(){
                this.model1 = ''
                this.value = ''
                this.startTime_ = ""
                this.endTime_ = ""
                this.selectTime_ = ""
                this.startTime_2 = ""
                this.endTime_2 = ""
                this.selectTime_2 = ""
                this.model_task = ""
                this.get(this.allUrl.findAppTaskRecordPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.createTime = this.changeTime(i.createTime)
                        i.partakeDate = this.changeTime(i.partakeDate)
                        i.operationDate = this.changeTime(i.operationDate)
                         i.status = changeStatus(i.status)
                         i.taskType = changeTask(i.taskType)
                    })
                this.data1 = res.data.rows
               })
            }


 
        },
        beforeMount() {
            this.get(this.allUrl.findAppTaskRecordPage,{page:1,rows:9}).then((res)=>{
                console.log(res)
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.createTime = this.changeTime(i.createTime)
                        i.partakeDate = this.changeTime(i.partakeDate)
                        i.operationDate = this.changeTime(i.operationDate)
                         i.status = changeStatus(i.status)
                         i.taskType = changeTask(i.taskType)
                    })
                this.data1 = res.data.rows
            })
            
        },
    }

     function changeStatus(param) { 
        var info = ''
        switch(param){
            case 1:
              info = '任务进行中'
              break;
            case 2:
              info = '银行审核中'
              break;
            case 3:
              info = '申请失败'
              break;
            case 4:
              info = '申请成功'
              break;
            case 5:
              info = '平台审核中'
              break;
            case 6:
              info = '领取失败'
              break;
            case 7:
              info = '任务成功'
              break;
        }
        return info;
     }

      function changeTask(param){
         var info1 = ''
             switch(param){
            case 1:
              info1 = '注册'
              break;
            case 2:
              info1 = '应用'
              break;
            case 3:
              info1 = '办卡'
              break;
            case 4:
              info1 = '蛋蛋赚游戏'
              break;
              case 5:
              info1 = '聚享玩游戏'
              break;
        }
        return info1;
    
     }
</script>

<style scoped lang="scss">
    .appTaskRecord{
        width:98%;height: 100%;
        margin: 0px 20px 0px 20px; 
        background: #fff;
        overflow: auto;
   
        .title{
            height: 51px;width: 100%;line-height: 51px;
            padding-left: 40px;font-size: 28px;
            padding-right: 40px;
            text-align: left;border-bottom:1px solid #000000;
            display: flex; justify-content: space-between;
        }
        .search{
            line-height: 71px;font-size: 24px;padding-left: 40px;
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
        
       .table{
           margin-left: 40px;
           .btn_tr{
                    width: 100%;height: 60px;
                    line-height: 60px;
                    }
            }

    }
</style>