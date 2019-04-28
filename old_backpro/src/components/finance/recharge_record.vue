<template>

    <div class="home">
 
        <div class="title">待充值审核</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="充值编号/商户名称/商户编号" style="width: 15%;" size="large"></Input>
            创建人员
            <!-- <Input v-model="staff" placeholder="创建人员" style="width: 15%;" size="large"></Input> -->
            <Select v-model="staff" style="width:15%;margin-left:20px;" size="large">
                <Option v-for="item in staffList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
     	 选择时间段
      	<!-- <DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
      	<DatePicker type="date" :value="endTime_" @on-change="endTime" placeholder="Select date" style="width: 200px"></DatePicker> -->
          <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
           
            
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>

        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllRecord()">全部充值记录({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="charSuc()">充值成功({{rechargeNum.success}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="charFail()">充值失败({{rechargeNum.fail}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="charAudit()">待审核({{rechargeNum.toAudit}})</div>

       </div>
        
       

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
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
    
            <foot></foot>

               <!--引入审核弹框-->
        <Modal
        v-model="modal2"
        width="600"
        >
         <p slot="header" style="color:#f60;text-align:center">
            <span>审核</span>
        </p>
       <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="商户名称">
     	  	 	 	{{detail.tenantName}}
      		  </FormItem> 
            <FormItem label="充值金额">
                    <span style="color:red;font-size:15px;">{{detail.amount}} </span>元
      		  </FormItem> 
                <FormItem label="充值状态">
     	  	 	 	待财务审核
      		  </FormItem> 
            <FormItem label="当前余额">
     	  	 	 	{{detail.balance}} 元
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="商户编号">
                     {{detail.tenantId}}
      		  </FormItem> 
            <FormItem label="充值编号">
     	  	 	 	{{detail.id}}
      		  </FormItem> 
            <FormItem label="充值时间">
     	  	 	 	{{detail.updateTime}}
      		  </FormItem> 
             <FormItem label="是否已充值">
     	  	 	 	{{detail.preloaded=='false'?'否':'是'}}
      		  </FormItem> 
              
       	 </Col>
       </Row>
      </Form>
       <div slot="footer">
            <Button  size="large"  @click="pass">通过</Button>
            <Button  size="large"  @click="noPass">不通过</Button>
        </div>
    </Modal>

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

   <Modal v-model="checkModal" footer-hide  scrollable  :styles="{top: '200px'}">
         <p slot="header" style="text-align:center;font-size:20px;color:#f60;"> 
            <span>查 看</span>
        </p>
         <Row>
             <Col span="12">
                <p style="height:40px;font-size:15px;">商户名称&nbsp;&nbsp;&nbsp;{{rechargeRecord.tenantName}}</p>
                <p style="height:40px;font-size:15px;">充值项&nbsp;&nbsp;&nbsp;{{rechargeRecord.rechargeType}}</p>
                <p style="height:40px;font-size:15px;">商户名称&nbsp;&nbsp;&nbsp;{{rechargeRecord.tenantName}}</p>
                <p style="height:40px;font-size:15px;">充值金额&nbsp;&nbsp;&nbsp; {{rechargeRecord.amount}}元</p>
                <p style="height:40px;font-size:15px;">充值人员&nbsp;&nbsp;&nbsp; {{rechargeRecord.createBy}}</p>
                <p style="height:40px;font-size:15px;">充值状态&nbsp;&nbsp;&nbsp; {{rechargeRecord.status}}</p>
                <p style="height:40px;font-size:15px;">当前余额&nbsp;&nbsp;&nbsp; {{rechargeRecord.balance}}元</p>
                
                <p style="height:40px;font-size:15px;" v-if="rechargeRecord.status=='充值失败'">拒绝原因&nbsp;&nbsp;&nbsp; {{rechargeRecord.failReason}}</p>

             </Col>
             <Col span="12" offset="0">
                  <p style="height:40px;font-size:15px;">项目编号&nbsp;&nbsp;&nbsp; {{rechargeRecord.taskId}}</p>    
                  <p style="height:40px;font-size:15px;">充值内容&nbsp;&nbsp;&nbsp; {{rechargeRecord.rechargeContent}}</p>    
                  <p style="height:40px;font-size:15px;">商户手机号&nbsp;&nbsp;&nbsp; {{rechargeRecord.tenantPhone}}</p>    
                  <p style="height:40px;font-size:15px;">充值编号&nbsp;&nbsp; {{rechargeRecord.id}}</p>  
                  <p style="height:40px;font-size:15px;">充值时间&nbsp;&nbsp;&nbsp; {{rechargeRecord.createTime}}</p>
                  <p style="height:40px;font-size:15px;" v-if="rechargeRecord.status!=='待审核'">审核时间&nbsp;&nbsp;&nbsp; {{rechargeRecord.updateTime}}</p>
         
                  <div style="height:60px;font-size:15px;" v-if="rechargeRecord.status =='充值失败'&&rechargeRecord.attachment">
                      附件&nbsp;&nbsp;&nbsp;<img v-for="data in rechargeRecord.attachment" :src="data" alt="" style="height:60px;width:60px;"> 
                  </div>
                  <p style="height:40px;font-size:15px;">是否已充值&nbsp;&nbsp;&nbsp; {{rechargeRecord.preloaded=='false'?'否':'是'}}</p>
              </Col>
          </Row>
    </Modal>
 
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
              const checkBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.checkModal = true
                                            this.rechargeRecord = params.row     
                                            if(this.rechargeRecord.attachment){                              
                                                 this.rechargeRecord.attachment = this.rechargeRecord.attachment.split(',')                        
                                            }                                         
                                            console.log(this.rechargeRecord)      
                                        }   
                                    }
                                }, '查看')            
             };

             const auditBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.detail = params.row  
                                            this.modal2 = true          	                           	
                                        }
                                    }
                                }, '审核')            
             };

            return{
                staffList:[],
                staff:'',
                 selectTime_:'',
            	startTime_:"",
            	endTime_:"",
                rechargeRecord:{},
                checkModal:false,
                rechargeNum:{},
                allNum:0,
                nowStatus:'',
                modal2:false,
                modal3:false,
                modal4:false,
                modal5:false,
                totalNum:0,
                pageNum:1,
                noPassInfo:{
                    reason:'',
                    attachment:[]
                },
                pageSize:9,
                shows:'1',
                value:'',
                serachValue:'',
                detail:{
                    amount:0,
                    balance:0
                },
                model1: '全部',
                 columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '充值编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title:'充值人员',
                        align:'center',
                        key:'createBy'
                    },
                    {
                        title: '商户名称',
                        align: 'center',
                        key: 'tenantName'
                    },
                    {
                        title: '充值金额(元)',
                        align: 'center',
                        key: 'amount'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status'
                    },
                     {
                        title: '操作时间',
                        align: 'center',
                        key: 'updateTime',
                        width:200
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.status == '待审核'){
                                // *******************************待审核状态下****************************************
                                 return h('div', [
                                   checkBtn(h,params),
                                   auditBtn(h,params)
                                ]);
                            }else if(params.row.status == '充值成功'){
                                // **************************************充值成功状态下****************************
                                 return h('div', [
                                   checkBtn(h,params)                           
                                ]);
                            }else{
                                 // **************************************充值失败状态下****************************
                                 return h('div', [
                                  checkBtn(h,params)                                 
                                ]);
                            }
                           
                        }
                    }
                ],
                data1:[]   
            }
        },
        methods:{
        	SelectTime(data){
                  this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            Charge(){
                console.log('充值')
            },
            search(){
           
                this.serachValue = this.value;
//              if(this.value == ''&&this.startTime_ == ""&&this.endTime_ ==""){
//                  this.$Message.warning('查询内容不能为空！')
//              }else
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else{
                     this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                     console.log(res)
                     this.data1 = res.data.rows;
                       if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                        res.data.rows.forEach((i,index)=>{   
                    i.rechargeType = changeType(i.rechargeType)
                        	
                            i.updateTime = this.changeTime(i.updateTime) 
                            i.createTime = this.changeTime(i.createTime)
                            i.status =  changeStatus(i.status)
                        })    
                   })
                }
               
            },
            clear(){
                this.staff = ''
                this.value = ''
                this.nowStatus = ''
                this.serachValue = ''
                this.startTime_ =""
                this.endTime_ =""
                this.selectTime_ = ""
                this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9}).then((res)=>{
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.allNum = res.data.total
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{      
                    i.rechargeType = changeType(i.rechargeType)
                 	
                    i.updateTime = this.changeTime(i.updateTime) 
                    i.createTime = this.changeTime(i.createTime)
                    i.status = changeStatus(i.status)
                 })
                })
            },
            //全部充值记录
            AllRecord(){
                this.staff = ''
                this.serachValue =''
                this.value = ''
                this.shows = 1
                 this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                     this.data1 = res.data.rows;
                       if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                        res.data.rows.forEach((i,index)=>{ 
                    i.rechargeType = changeType(i.rechargeType)
                        	
                            i.updateTime = this.changeTime(i.updateTime) 
                            i.createTime = this.changeTime(i.createTime)
                            i.status =  changeStatus(i.status)
                        })
        
                 })
               
            },
            //充值成功
            charSuc(){
                this.serachValue = ''
                this.value = ''
                this.shows = 2
                this.nowStatus = 1
                 this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,status:1,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                    this.data1 = res.data.rows;
                       if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                        res.data.rows.forEach((i,index)=>{  
                    i.rechargeType = changeType(i.rechargeType)
                        	
                            i.updateTime = this.changeTime(i.updateTime) 
                            i.createTime = this.changeTime(i.createTime)
                            i.status =  changeStatus(i.status)
                        })
        
                 })
            },
            //充值失败
            charFail(){
                this.serachValue = ''
                this.value = ''
                this.shows = 3
                 this.nowStatus = 0
                 this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,status:0,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                     this.data1 = res.data.rows;
                       if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                        res.data.rows.forEach((i,index)=>{  
                    i.rechargeType = changeType(i.rechargeType)
                        	
                            i.updateTime = this.changeTime(i.updateTime) 
                            i.createTime = this.changeTime(i.createTime)
                            i.status =  changeStatus(i.status)
                        })
        
                 })
            },
            //待审核
            charAudit(){
                this.serachValue = ''
                this.shows = 4
                 this.nowStatus = 2
                 this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,status:2,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                     this.data1 = res.data.rows;
                       if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                        res.data.rows.forEach((i,index)=>{   
                    i.rechargeType = changeType(i.rechargeType)
                        	
                            i.updateTime = this.changeTime(i.updateTime) 
                            i.createTime = this.changeTime(i.createTime)
                            i.status =  changeStatus(i.status)
                        })
        
                 })
            },

            handlePageSize(value){
                this.pageNum = value;
                  this.get(this.allUrl.findRechargeRecordPage,{page:value,rows:9,status:this.nowStatus,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                      this.data1 = res.data.rows;
                       if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                        res.data.rows.forEach((i,index)=>{        
                    i.rechargeType = changeType(i.rechargeType)
                        	
                            i.updateTime = this.changeTime(i.updateTime) 
                            i.createTime = this.changeTime(i.createTime)
                            i.status =  changeStatus(i.status)
                        })   
                 })
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
                let info = {id:this.detail.id,status:1}
                 this.$http({
						method:'POST',
						url: this.allUrl.updateRechargeRecordStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('审核成功');
                            this.get(this.allUrl.findRechargeRecordPage,{page:this.pageNum,rows:9,status:this.nowStatus,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                        res.data.rows.forEach((i,index)=>{        
                                            i.updateTime = this.changeTime(i.updateTime) 
                    i.rechargeType = changeType(i.rechargeType)
                                            
                                            i.createTime = this.changeTime(i.createTime)
                                            i.status =  changeStatus(i.status)
                                        })   
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
                this.modal5 = true
            },
            noPassFormLast(){
               let info = {
                   id:this.detail.id,
                   status:0,
                   failReason:this.noPassInfo.reason,
                   attachment:this.noPassInfo.attachment.join(',')
               }
                   this.$http({
						method:'POST',
						url: this.allUrl.updateRechargeRecordStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret=='ok'){
                            this.$Message.success('审核不通过');
                            this.get(this.allUrl.findRechargeRecordPage,{page:this.pageNum,rows:9,status:this.nowStatus,tenantName:this.value,beginTime:this.startTime_,finishTime:this.endTime_,createBy:this.staff}).then((res)=>{
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                        res.data.rows.forEach((i,index)=>{        
                                            i.updateTime = this.changeTime(i.updateTime) 
                                            i.createTime = this.changeTime(i.createTime)
                    i.rechargeType = changeType(i.rechargeType)
                                            
                                            i.status =  changeStatus(i.status)
                    					i.rechargeType = changeType(i.rechargeType)
                                            
                                        })   
                                })
                        }else if(response.data.ret=='error'){
                            this.$Message.error(response.data.errordesc);
                        }
                    })
            }
         
        },
        beforeMount(){
             this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9}).then((res)=>{
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.allNum = res.data.total
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.updateTime = this.changeTime(i.updateTime) 
                    i.createTime = this.changeTime(i.createTime)
                    i.rechargeType = changeType(i.rechargeType)
                    i.status = changeStatus(i.status)
                 })
            })

                 this.get(this.allUrl.countRechargeRecord).then((res)=>{
                     this.rechargeNum = res.data.data
                 })

            this.get(this.allUrl.rechargeFindCreateBy).then((res)=>{
                this.staffList = res.data.data
            })
            
        }
    }

	
	function changeType(param) {
		var info1 = ''
		switch(param){
            case '0':
              info1 = '商户充值';
              break;
            case '1':
              info1 = '任务充值'
              break;
            case '2':
              info1 = '补货充值'
              break;
              case '3':
              info1 = '补货上架充值'
              break;
        }
        return info1;
		
	}
      function changeStatus(param) { 
        var info = ''
        switch(param){
            case '0':
              info = '充值失败';
              break;
            case '1':
              info = '充值成功'
              break;
            case '2':
              info = '待审核'
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
            .ivu-input-wrapper{margin-left: 10px;margin-right: 15px;}
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