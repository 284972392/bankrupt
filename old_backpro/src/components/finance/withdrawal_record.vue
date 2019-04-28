<template>
    <div class="home">
        <div class="title">待提现审核</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="提现编号/用户手机号/提现账号" style="width: 26%;" size="large"></Input>
    	        
            <!-- 用户状态
            <Select v-model="model1" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> -->
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
            <div class="btn_state" :class="{active:shows==1}" @click="AllGetRec()">全部领取记录({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="CheckPe()">待审核({{count.toAudit}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="FailGet()">提现失败({{count.fail}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="SucGet()">提现成功({{count.success}})</div>
            <!-- <div class="btn_state" :class="{active:shows==5}" @click="noPass_nav()">不通过({{count.violation}})</div>
            <div class="btn_state" :class="{active:shows==6}" @click="wait()">待第三方反馈({{count.toFeedback}})</div> -->

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

    <Modal v-model="show" footer-hide  scrollable  :styles="{top: '200px'}">
         <p slot="header" style="text-align:center;font-size:20px;color:#f60;"> 
            <span>查 看</span>
        </p>
         <Row>
             <Col span="12">
                <p style="height:40px;font-size:15px;">用户名称&nbsp;&nbsp;&nbsp;{{cashGetRecord.userName}}</p>
                <p style="height:40px;font-size:15px;">提现通道&nbsp;&nbsp;&nbsp; {{cashGetRecord.withdrawPlace}}</p>
                <p style="height:40px;font-size:15px;">真实姓名&nbsp;&nbsp;&nbsp; {{cashGetRecord.realName}}</p>
                <div style="height:40px;font-size:15px;">提现编号&nbsp;&nbsp;&nbsp; {{cashGetRecord.id}}</div>
                <p style="height:40px;font-size:15px;">提现状态&nbsp;&nbsp;&nbsp; {{cashGetRecord.withdrawStatus}}</p>
                <p style="height:40px;font-size:15px;" v-if="cashGetRecord.withdrawStatus!='待审核'?true:false">审核时间&nbsp;&nbsp;&nbsp; {{cashGetRecord.modifyTime}}</p>
                <p style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='提现失败'?true:false">失败原因&nbsp;&nbsp;&nbsp; {{cashGetRecord.failureReason}}</p>
                <p style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='不通过'?true:false">不通过原因&nbsp;&nbsp;&nbsp; {{cashGetRecord.failureReason}}</p>
             </Col>
             <Col span="12" offset="0">
                  <p style="height:40px;font-size:15px;">用户编号&nbsp;&nbsp;&nbsp; {{cashGetRecord.userId}}</p>    
                  <p style="height:40px;font-size:15px;">提现账号&nbsp;&nbsp; {{cashGetRecord.withdrawAccount}}</p>  
                  <p style="height:40px;font-size:15px;">提现金额&nbsp;&nbsp;&nbsp; {{cashGetRecord.money}}元</p>
                  <p style="height:40px;font-size:15px;">申请时间&nbsp;&nbsp;&nbsp; {{cashGetRecord.modifyTime}}</p>
                  <p style="height:40px;font-size:15px;">账户余额&nbsp;&nbsp;&nbsp; {{cashGetRecord.balance}}元</p>
                    <div style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='提现失败'&&cashGetRecord.attachment">
                      附件&nbsp;&nbsp;&nbsp;<img v-for="data in cashGetRecord.attachment" :src="data" alt="" style="height:60px;width:60px;cursor:pointer;" @click="viewImg(data)"> 
                  </div>
                  <div style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='不通过'&&cashGetRecord.attachment">
                      附件&nbsp;&nbsp;&nbsp;<img v-for="data in cashGetRecord.attachment" :src="data" alt="" style="height:60px;width:60px;cursor:pointer;" @click="viewImg(data)"> 
                  </div>
              </Col>
          </Row>
    </Modal>

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
      		  <FormItem label="用户名称">
     	  	 	 	{{detail.userName}}
      		  </FormItem> 
            <FormItem label="提现通道">
                    <!-- <span style="color:red;font-size:15px;">{{detail.amount}} </span>元 -->
                   {{detail.withdrawPlace}} 
      		  </FormItem> 
                <FormItem label="真实姓名">
     	  	 	 	{{detail.realName}}
      		  </FormItem> 
            <FormItem label="提现编号">
     	  	 	 	{{detail.id}} 
      		  </FormItem> 
            <FormItem label="提现状态">
     	  	 	 	{{detail.withdrawStatus}} 
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="用户编号">
                     {{detail.userId}}
      		  </FormItem> 
            <FormItem label="提现账号">
     	  	 	 	{{detail.withdrawPlace}}
      		  </FormItem> 
            <FormItem label="提现金额">
                <span style="color:red;font-size:15px;">{{detail.money}} </span>元
      		  </FormItem> 
             <FormItem label="申请时间">
     	  	 	 	{{detail.createTime}}
      		  </FormItem>
            <FormItem label="提现后余额">
     	  	 	 	{{(detail.balance-detail.money).toFixed(2)}}
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
                                               this.cashGetRecord = params.row
                                               this.show = true         
                                              if(this.cashGetRecord.attachment&&typeof(this.cashGetRecord.attachment)=='string'){                          
                                                            this.cashGetRecord.attachment = params.row.attachment.split(',')            
                                                        }   
                                                console.log(this.cashGetRecord)
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
                                            console.log(params.row)
                                            this.detail = params.row  
                                            this.modal2 = true                                        	
                                        }
                                    }
                                }, '审核')            
             };

            return{
                selectTime_:'',
                nowStatus:'',
            	startTime_:"",
            	endTime_:"",

                visible:false,
                imgName:'',

                count:{},
                cashGetRecord:{},
                show:false,
                allNum:0,
                totalNum:0,
                shows:'1',
                modal2:false,
                modal3:false,
                modal4:false,
                modal5:false,
                  detail:{
                    amount:0,
                    balance:0
                },
                noPassInfo:{
                    reason:'',
                    attachment:[]
                },
                value:'',
                pageNum:1,
                pageSize:9,
                 cityList: [
                    {
                        value: '1',
                        label: '待审核'
                    },
                    {
                        value: '2',
                        label: '不通过'
                    },
                    {
                        value: '3',
                        label: '待第三方反馈'
                    },
                    {
                        value: '4',
                        label: '提现成功'
                    },
                    {
                        value: '5',
                        label: '提现失败'
                    }
                ],
                model1: '',
                 columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',

                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '提现编号',
                        align: 'center',
                        key: 'id',

                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'userName',
   
                    },
                     {
                        title: '提现金额（元）',
                        align: 'center',
                        key: 'money',

                    },
                     {
                        title: '通道',
                        align: 'center',
                        key: 'withdrawPlace',

                    },
                    {
                        title: '对方账户',
                        align: 'center',
                        key: 'withdrawAccount',

                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'withdrawStatus',

                    },
                      {
                        title: '操作时间',
                        align: 'center',
                        key: 'modifyTime',
                        width:180
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {      
                            if(params.row.withdrawStatus == '待审核'){
                                return h('div', [
                                      auditBtn(h,params),
                                      checkbtn(h,params)
                                 ]); 
                            }else{
                                return h('div', [
                                      checkbtn(h,params)
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
                this.shows = 1
                this.value = ''
                this.nowStatus = ''
                this.model1 = ''
                 this.get(this.allUrl.findAppWithdrawRecordPage,
                 		{page:1,
                 		rows:9,
                 		withdrawAccount:this.value,
                 		beginTime:this.startTime_,
                 		finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.createTime = this.changeTime(i.createTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                })
            },
            //待审核
            CheckPe(){
                this.shows = 2
                this.nowStatus = '0'
                  this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawStatus:'0',withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.createTime = this.changeTime(i.createTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
            },
            //提现失败
            FailGet(){
                this.shows = 3
                this.nowStatus = '2'
                  this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawStatus:'2',withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.createTime = this.changeTime(i.createTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
            },
            //提现成功
            SucGet(){
                this.shows = 4
                this.nowStatus = '1'
                  this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawStatus:'1',withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.createTime = this.changeTime(i.createTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
            },

            handlePageSize(value){
                this.pageNum = value;
                this.get(this.allUrl.findAppWithdrawRecordPage,{page:value,rows:9,withdrawAccount:this.value,withdrawStatus:this.nowStatus,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.createTime = this.changeTime(i.createTime)
                        i.withdrawStatus = changeStatus(i.withdrawStatus)
                        i.withdrawPlace = changeChanne(i.withdrawPlace)
                    })
                this.data1 = res.data.rows
                })
            },
            search(){
//                if(this.value == ''&& this.model1 == ''){
//                   this.$Message.warning('查询内容不能为空！');
//              }
                  if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else{
                      this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawAccount:this.value,withdrawStatus:this.nowStatus,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.createTime = this.changeTime(i.createTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
                }
              
            },
            clear(){
                this.value = ''
                this.model1 = ''
                this.startTime_ = ""
                this.endTime_ = ""
                this.nowStatus = ''
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
                let info = {id:this.detail.id,status:4}
                 this.$http({
						method:'POST',
						url: this.allUrl.updateAppWithdrawRecordStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('审核成功');
                            this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawAccount:this.value,withdrawStatus:this.nowStatus,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                        res.data.rows.forEach((i,index)=>{        
                                           i.modifyTime = this.changeTime(i.modifyTime)
                                            i.createTime = this.changeTime(i.createTime)
                                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                                            i.withdrawPlace = changeChanne(i.withdrawPlace)
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
                   status:5,
                   failureReason:this.noPassInfo.reason,
                   attachment:this.noPassInfo.attachment.join(',')
               }
                   this.$http({
						method:'POST',
						url: this.allUrl.updateAppWithdrawRecordStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('审核成功');
                            this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawAccount:this.value,withdrawStatus:this.model1,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                        res.data.rows.forEach((i,index)=>{        
                                            i.modifyTime = this.changeTime(i.modifyTime)
                                            i.createTime = this.changeTime(i.createTime)
                                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                                        })   
                                })
                        }else if(response.data.ret=='error'){
                            this.$Message.error(response.data.errordesc);
                        }
                    })
            }
        },
        beforeMount() {
            this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.createTime = this.changeTime(i.createTime)
                        i.withdrawStatus = changeStatus(i.withdrawStatus)
                        i.withdrawPlace = changeChanne(i.withdrawPlace)
                    })
                this.data1 = res.data.rows
            })
            this.get(this.allUrl.countAppWithdrawRecord).then((res)=>{        
   
                this.count = res.data.data
            })
        },
    }


     function changeStatus(param) { 
        var info = ''
        switch(param){
             case 0:
              info = '待审核'
            break;
            case 1:
              info = '提现成功'
              break;
            case 2:
              info = '提现失败'
              break;
        }
        return info;
     }
    
    function changeChanne(param){
         var info = ''
         switch(param){
             case 1:
                info = '支付宝'
                break;
             case 2:
                info = '微信'
                break;
             case 3:
                info = '话费充值'
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
        
       .table{
           margin-left: 40px;
           .btn_tr{
                    width: 100%;height: 60px;
                    line-height: 60px;
                    }
            }

          
    }
</style>