<template>
    <div class="home">
        <div class="title">现金领取记录</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="任务名称/用户手机号" style="width: 26%;" size="large"></Input>
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
            <div class="btn_state" :class="{active:shows==3}" @click="FailGet()">领取失败({{count.fail}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="SucGet()">领取成功({{count.success}})</div>

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
                <p style="height:40px;font-size:15px;">任务名称&nbsp;&nbsp;&nbsp; {{cashGetRecord.paymentName}}</p>
                <p style="height:40px;font-size:15px;">领取金额&nbsp;&nbsp;&nbsp; {{cashGetRecord.money}}元</p>
                <div style="height:80px;font-size:15px;">领取凭证&nbsp;&nbsp;&nbsp; <img :src="cashGetRecord.receiveUrl" alt="" style="height:60px;width:60px;"></div>
                <p style="height:40px;font-size:15px;">领取状态&nbsp;&nbsp;&nbsp; {{cashGetRecord.paymentStatus}}</p>
                <p style="height:40px;font-size:15px;" v-if="cashGetRecord.paymentStatus!='待审核'?true:false">审核时间&nbsp;&nbsp;&nbsp; {{cashGetRecord.modifyTime}}</p>
                <p style="height:60px;font-size:15px;" v-if="cashGetRecord.paymentStatus =='领取失败'?true:false">拒绝原因&nbsp;&nbsp;&nbsp; {{cashGetRecord.failureReason}}</p>
             </Col>
             <Col span="12" offset="0">
                  <p style="height:40px;font-size:15px;">用户编号&nbsp;&nbsp;&nbsp; {{cashGetRecord.userId}}</p>    
                  <p style="height:40px;font-size:15px;">任务类别&nbsp;&nbsp; {{cashGetRecord.taskType}}</p>  
                  <p style="height:40px;font-size:15px;">领取编号&nbsp;&nbsp;&nbsp; {{cashGetRecord.id}}</p>
                  <p style="height:40px;font-size:15px;">申请时间&nbsp;&nbsp;&nbsp; {{cashGetRecord.createTime}}</p>
                  <p style="height:40px;font-size:15px;">账户余额&nbsp;&nbsp;&nbsp; {{cashGetRecord.balance}}元</p>
                  <div style="height:60px;font-size:15px;" v-if="cashGetRecord.paymentStatus =='领取失败'?true:false">附件&nbsp;&nbsp;&nbsp;<img :src="cashGetRecord.attachment" alt="" style="height:60px;width:60px;"> </div>
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
                nowState:'',
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
                 cityList: [
                    {
                        value: '0',
                        label: '领取失败'
                    },
                    {
                        value: '1',
                        label: '领取成功'
                    },
                    {
                        value: '2',
                        label: '待审核'
                    }
                ],
                model1: '',
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
                        title: '领取编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'userName'
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'userPhone'
                    },
                     {
                        title: '领取名称',
                        align: 'center',
                        key: 'paymentName'
                    },
                     {
                        title: '领取金额（元）',
                        align: 'center',
                        key: 'money'
                    },
                     {
                        title: '申请时间',
                        align: 'center',
                        key: 'createTime',
                        width:180
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'paymentStatus'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                                    this.show = true
                                                    console.log(this.cashGetRecord)
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
              SelectTime(data){
                  this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
                console.log(this.selectTime_)
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
                this.model1 = ''
                this.nowState = ''
                 this.get(this.allUrl.findAppCashPaymentPage,{page:1,rows:9,paymentName:this.value,paymentStatus:this.nowState,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{     
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.paymentStatus = changeStatus(i.paymentStatus)
                        })
                    this.data1 = res.data.rows
                })
            },
            //待审核
            CheckPe(){
                this.nowState = '0'
                this.shows = 2
                  this.get(this.allUrl.findAppCashPaymentPage,{page:1,rows:9,paymentStatus:'0',paymentName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.paymentStatus = changeStatus(i.paymentStatus)
                        })
                    this.data1 = res.data.rows
                    })
            },
            //领取失败
            FailGet(){
                this.nowState = '2'
                this.shows = 3
                  this.get(this.allUrl.findAppCashPaymentPage,{page:1,rows:9,paymentStatus:'2',paymentName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.paymentStatus = changeStatus(i.paymentStatus)
                        })
                    this.data1 = res.data.rows
                    })
            },
            //领取成功
            SucGet(){
                this.nowState = '1'
                this.shows = 4
                  this.get(this.allUrl.findAppCashPaymentPage,{page:1,rows:9,paymentStatus:'1',paymentName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.paymentStatus = changeStatus(i.paymentStatus)
                        })
                    this.data1 = res.data.rows
                    })
            },

            handlePageSize(value){
                this.pageNum = value;
                this.get(this.allUrl.findAppCashPaymentPage,{page:value,rows:9,paymentName:this.value,paymentStatus:this.nowState,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.paymentStatus = changeStatus(i.paymentStatus)
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
                      this.get(this.allUrl.findAppCashPaymentPage,{page:1,rows:9,paymentName:this.value,paymentStatus:this.nowState,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.modifyTime = this.changeTime(i.modifyTime)
                            i.paymentStatus = changeStatus(i.paymentStatus)
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
                this.nowState = ''
                this.selectTime_ = ''
            }
        },
        beforeMount() {
            this.get(this.allUrl.findAppCashPaymentPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.modifyTime = this.changeTime(i.modifyTime)
                        i.paymentStatus = changeStatus(i.paymentStatus)
                    })
                this.data1 = res.data.rows
            })
            this.get(this.allUrl.countAppCashPayment).then((res)=>{            
                this.count = res.data.data
            })
        },
    }

     function changeStatus(param) { 
        var info = ''
        switch(param){
            case 2:
              info = '领取失败'
            break;
            case 1:
              info = '领取成功'
              break;
            case 0:
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