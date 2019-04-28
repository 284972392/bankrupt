<template>
    <div class="home">
        <div class="title">
            <p>现金提现记录</p>    
            <Poptip
                confirm
                title="导出当前筛选表格?"
                @on-ok="exportData"
              >
               <Button type="primary" size="large" style="height:35px;"><Icon type="ios-download-outline"></Icon> 导出表格</Button>
            </Poptip>
        </div>
        <div class="search">
             <div>
                  搜索
            <Input v-model="value" placeholder="提现编号/用户手机号/提现账号" style="width: 26%;" size="large"></Input>
            	  选择时间段
             <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
             </div>
          
            提现通道
            <Select v-model="model_channel" style="width:15%;margin-left:3px;" size="large">
                <Option v-for="item in getChannel" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            余额范围
            <InputNumber v-model="balance_f" :min='0' style="width:100px;"></InputNumber> 元
            ☞
            <InputNumber v-model="balance_s" :min='0' style="width:100px;"></InputNumber> 元

            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>
              <!-- <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon> 导出表格</Button> -->
               <div>
          
          </div>
          
      
        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllGetRec()">全部领取记录({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="CheckPe()">待审核({{count.toAudit}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="FailGet()">提现失败({{count.fail}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="SucGet()">提现成功({{count.success}})</div>
            <!-- <div class="btn_state" :class="{active:shows==5}" @click="noPass()">不通过({{count.violation}})</div>
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
                  <p style="height:40px;font-size:15px;">申请时间&nbsp;&nbsp;&nbsp; {{cashGetRecord.createTime}}</p>
                  <p style="height:40px;font-size:15px;">账户余额&nbsp;&nbsp;&nbsp; {{cashGetRecord.balance}}元</p>
                  <!-- <div style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='提现失败'?true:false">附件&nbsp;&nbsp;&nbsp;<img :src="cashGetRecord.attachment" alt="" style="height:60px;width:60px;"> </div>
                  <div style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='不通过'?true:false">附件&nbsp;&nbsp;&nbsp;<img :src="cashGetRecord.attachment" alt="" style="height:60px;width:60px;"> </div> -->

                    <div style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='提现失败'&&cashGetRecord.attachment">
                      附件&nbsp;&nbsp;&nbsp;<img v-for="data in cashGetRecord.attachment" :src="data" alt="" style="height:60px;width:60px;"> 
                  </div>
                  <div style="height:60px;font-size:15px;" v-if="cashGetRecord.withdrawStatus =='不通过'&&cashGetRecord.attachment">
                      附件&nbsp;&nbsp;&nbsp;<img v-for="data in cashGetRecord.attachment" :src="data" alt="" style="height:60px;width:60px;"> 
                  </div>
              </Col>
          </Row>
    </Modal>

            <foot></foot>
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
                exportTable:[],
                balance_f:0,
                balance_s:0,
                nowStatus:'',
                selectTime_:'',
            	startTime_:"",
            	endTime_:"",
                count:{},
                cashGetRecord:{},
                show:false,
                allNum:0,
                totalNum:0,
                shows:'1',
                value:'',
                pageNum:1,
                pageSize:9,
                getChannel:[
                     {
                        value: '1',
                        label: '支付宝'
                    },
                    {
                        value: '2',
                        label: '微信'
                    },
                    {
                        value: '3',
                        label: '话费充值'
                    },
                    {
                        value:'',
                        label:'全部'
                    }
                ],
                model_channel:'',
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
                        title: '提现编号',
                        align: 'center',
                        key: 'id',
                        width:100
                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'userName',
                        width:200
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'userPhone',
                        width:200
                    },
                     {
                        title: '提现金额（元）',
                        align: 'center',
                        key: 'money',
                        width:170
                    },
                     {
                        title: '通道',
                        align: 'center',
                        key: 'withdrawPlace',
                        width:180
                    },
                    {
                        title: '对方账户',
                        align: 'center',
                        key: 'withdrawAccount',
                        width:200
                    },
                     {
                        title: '申请时间',
                        align: 'center',
                        key: 'createTime',
                        width:200
                    },
                    {
                        title: '余额',
                        align: 'center',
                        key: 'balance',
                        width:120
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'withdrawStatus',
                        width:180
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        fixed:'right',
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
                                                    this.cashGetRecord = params.row
                                                    if(this.cashGetRecord.attachment&&typeof(this.cashGetRecord.attachment)=='string'){                              
                                                            this.cashGetRecord.attachment = params.row.attachment.split(',')            
                                                        }   
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
                 if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f>this.balance_s){
                    this.$Message.warning('余额范围填反了')
                }else{
                    let a = 0,b=0;
                    if(this.balance_s==0&&this.balance_f==0){
                        a='',b=''
                    }else{
                        a = this.balance_f,b=this.balance_s
                    }
                     this.get(this.allUrl.findAppWithdrawRecordList,{withdrawStatus:this.nowStatus,withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_,withdrawPlace:this.model_channel,minBalance:a,maxBalance:b}).then((res)=>{
                    res.data.data.appWithdrawRecordVoList.forEach((i,index)=>{    
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                    })
                    this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.appWithdrawRecordVoList)
                    this.$refs.selection.exportCsv({
                                filename: '现金提现记录表格',
                                columns:this.columns,
                                data: this.exportTable
                            });
                  })
                }
                 
 
            },
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
            //全部领取记录
            AllGetRec(){
                this.pageNum = 1
                this.nowStatus = ''
                this.shows = 1
                 if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f>this.balance_s){
                    this.$Message.warning('余额范围填反了')
                }else{
                    let a = 0,b=0;
                    if(this.balance_s==0&&this.balance_f==0){
                        a='',b=''
                    }else{
                        a = this.balance_f,b=this.balance_s
                    }
                     this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_,withdrawPlace:this.model_channel,minBalance:a,maxBalance:b}).then((res)=>{     
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                        this.data1 = res.data.rows
                    })
                }
                
            },
            //待审核
            CheckPe(){
                this.pageNum = 1
                this.nowStatus = '0'
                this.shows = 2
                 if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f>this.balance_s){
                    this.$Message.warning('余额范围填反了')
                }else{
                    let a = 0,b=0;
                    if(this.balance_s==0&&this.balance_f==0){
                        a='',b=''
                    }else{
                        a = this.balance_f,b=this.balance_s
                    }
                    this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawStatus:'0',withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_,withdrawPlace:this.model_channel,minBalance:a,maxBalance:b}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
                }    
                  
            },
            //提现失败
            FailGet(){
                this.pageNum = 1
                this.nowStatus = '2'
                this.shows = 3
                 if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f>this.balance_s){
                    this.$Message.warning('余额范围填反了')
                }else{
                    let a = 0,b=0;
                    if(this.balance_s==0&&this.balance_f==0){
                        a='',b=''
                    }else{
                        a = this.balance_f,b=this.balance_s
                    }
                    this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawStatus:'2',withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_,withdrawPlace:this.model_channel,minBalance:a,maxBalance:b}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
                }
                  
            },
            //提现成功
            SucGet(){
                this.pageNum = 1
                this.nowStatus = '1'
                this.shows = 4
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f>this.balance_s){
                    this.$Message.warning('余额范围填反了')
                }else{
                    let a = 0,b=0;
                    if(this.balance_s==0&&this.balance_f==0){
                        a='',b=''
                    }else{
                        a = this.balance_f,b=this.balance_s
                    }
                     this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawStatus:'1',withdrawAccount:this.value,beginTime:this.startTime_,finishTime:this.endTime_,withdrawPlace:this.model_channel,minBalance:a,maxBalance:b}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
                }
                 
            },
            handlePageSize(value){
                this.pageNum = value;
                 if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f>this.balance_s){
                    this.$Message.warning('余额范围填反了')
                }else{
                    let a = 0,b=0;
                    if(this.balance_s==0&&this.balance_f==0){
                        a='',b=''
                    }else{
                        a = this.balance_f,b=this.balance_s
                    }
                    this.get(this.allUrl.findAppWithdrawRecordPage,{page:value,rows:9,withdrawAccount:this.value,withdrawStatus:this.nowStatus,beginTime:this.startTime_,finishTime:this.endTime_,withdrawPlace:this.model_channel,minBalance:a,maxBalance:b}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
                }   
           
            },
            search(){
//                if(this.value == ''&& this.model1 == ''){
//                   this.$Message.warning('查询内容不能为空！');
//              }
                  if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f>this.balance_s){
                    this.$Message.warning('余额范围填反了')
                }else{
                    let a = 0,b=0;
                    if(this.balance_s==0&&this.balance_f==0){
                        a='',b=''
                    }else{
                        a = this.balance_f,b=this.balance_s
                    }
                      this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9,withdrawAccount:this.value,withdrawStatus:this.nowStatus,beginTime:this.startTime_,finishTime:this.endTime_,withdrawPlace:this.model_channel,minBalance:a,maxBalance:b}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.withdrawStatus = changeStatus(i.withdrawStatus)
                            i.withdrawPlace = changeChanne(i.withdrawPlace)
                        })
                    this.data1 = res.data.rows
                    })
                }
              
            },
            clear(){
                this.shows = 1
                this.value = ''
                this.model1 = ''
                this.startTime_ = ""
                this.endTime_ = ""
                this.nowStatus = ''
                this.selectTime_ = ''
                this.model_channel = ''
                this.balance_f = 0
                this.balance_s = 0
                this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.withdrawStatus = changeStatus(i.withdrawStatus)
                        i.withdrawPlace = changeChanne(i.withdrawPlace)
                    })
                this.data1 = res.data.rows
                  })
            }
        },
        beforeMount() {
            this.get(this.allUrl.findAppWithdrawRecordPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.modifyTime = this.changeTime(i.modifyTime)
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
            padding-right: 40px;
            text-align: left;border-bottom:1px solid #000000;
            display: flex; justify-content: space-between;
        }
        .search{
            line-height: 71px;font-size: 24px;padding: 10px 0 10px 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 17px;margin-right: 55px;}
        }
    .state_con{
        display: flex;
        .btn_state{
            height: 40px;line-height: 40px;text-align: center;padding: 0 10px;
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