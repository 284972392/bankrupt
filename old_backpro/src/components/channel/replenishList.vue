<template>
    <div class="home">
        <div class="title">补货记录</div>
        <div class="search">
            <div class="line">
                 <Input v-model="value" placeholder="补货编号/充值编号/任务名称/商户名称" style="width: 300px;" size="large"></Input>
            <Select v-model="replenishType" placeholder="补货项" style="width: 100px;margin-right:10px;">
                <Option value=0>补货</Option>
                <Option value=1>补货上架</Option>
                <Option value="">全部</Option>
            </Select>
             <Select v-model="taskType" placeholder="任务类别" style="width: 100px;margin-right:10px;">
                <Option value=1>注册赚</Option>
                <Option value=2>应用赚</Option>
                <Option value=3>办卡赚</Option>
                <Option value="">全部</Option>
            </Select>
           <DatePicker type="datetimerange" :value='shelvesTime_' placeholder="选择上架时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            </div>
            <div class="line">
                <DatePicker type="datetimerange" :value='theShelvesTime_' placeholder="选择下架时间段" @on-change='SelectTime2' style="width: 300px;font-size:18px;margin-right:10px"></DatePicker>
                <DatePicker type="datetimerange" :value='replenishTime_' placeholder="选择补货时间段" @on-change='SelectTime3' style="width: 300px;font-size:18px;margin-right:10px"></DatePicker>
                <DatePicker type="datetimerange" :value='operateTime_' placeholder="选择操作时间段" @on-change='SelectTime4' style="width: 300px;font-size:18px;margin-right:10px"></DatePicker>
            </div>
            <div class="line">
                充值金额:&nbsp;&nbsp;&nbsp;
                <InputNumber v-model="minAmount" :min='0' style="width:150px;margin-top:10px;"></InputNumber>&nbsp;至&nbsp;&nbsp;&nbsp; 
                <InputNumber v-model="maxAmount" :min='this.minAmount' style="width:150px;margin-top:10px;"></span></InputNumber>
                <ButtonGroup size="large">
                <Button type="primary" ghost @click="search" style="margin-left:10px;margin-top:10px;">查询</Button>  
                <Button type="primary" ghost @click="clear" style="margin-left:10px;margin-top:10px;">清空</Button>  
            </ButtonGroup>
            </div>
            
            
          <div>
          	
          </div>
        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllGetRec()">全部任务({{allNum}})</div>
       </div>
        
    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=485></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
 
            </td>
        <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
 
        
        	
    </div>

    <Modal v-model="show" footer-hide  scrollable width="600" :styles="{top: '200px'}">
         <p slot="header" style="text-align:center;font-size:20px;color:#f60;"> 
            <span>查 看</span>
        </p>
         <Row>
             <Col span="12">
                <p style="height:40px;font-size:15px;">补货编号&nbsp;&nbsp;&nbsp;{{replenishInfo.id}} </p>
                <p style="height:40px;font-size:15px;">补货项&nbsp;&nbsp;&nbsp; {{replenishInfo.replenishType}}</p>
                <p style="height:40px;font-size:15px;">任务名称&nbsp;&nbsp;&nbsp; {{replenishInfo.taskName}}</p>
                <p style="height:40px;font-size:15px;">任务库存&nbsp;&nbsp;&nbsp; {{replenishInfo.taskInventory}}</p>        
                <p style="height:40px;font-size:15px;">设定上架时间&nbsp;&nbsp;&nbsp; {{replenishInfo.shelvesTime}}</p>  
                <p style="height:40px;font-size:15px;">账户余额&nbsp;&nbsp;&nbsp;{{replenishInfo.balance}}</p>  
                <p style="height:40px;font-size:15px;">补货时间&nbsp;&nbsp;&nbsp;{{replenishInfo.replenishTime}}</p>  
                <p style="height:40px;font-size:15px;">操作时间&nbsp;&nbsp;&nbsp;{{replenishInfo.operateTime}}</p>  
            </p>
               
                
             </Col>
             <Col span="12" offset="0">
                  <p style="height:40px;font-size:15px;">充值编号&nbsp;&nbsp;&nbsp; {{replenishInfo.rechargeId}}</p>    
                  <p style="height:40px;font-size:15px;">任务类别&nbsp;&nbsp; {{replenishInfo.taskType}}</p>  
                  <p style="height:40px;font-size:15px;">商户名称&nbsp;&nbsp;&nbsp; {{replenishInfo.tenantName}}</p>
                  <p style="height:40px;font-size:15px;">设置补货数量&nbsp;&nbsp;&nbsp; {{replenishInfo.replenishAmount}}</p>
                  <p style="height:40px;font-size:15px;">设定下架时间&nbsp;&nbsp;&nbsp; {{replenishInfo.theShelvesTime}}</p>
                  <p style="height:40px;font-size:15px;">充值金额&nbsp;&nbsp;&nbsp; {{replenishInfo.amount}}</p>
                  <p style="height:40px;font-size:15px;">补货人员&nbsp;&nbsp;&nbsp; {{replenishInfo.replenishBy}}</p>
                  <p style="height:40px;font-size:15px;">补货状态&nbsp;&nbsp;&nbsp; {{replenishInfo.status}}</p>  
              </Col>
          </Row>
      
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
                return h('div', [
                    h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                                style: {
                                marginRight: '5px'
                            },
                            on: {
                                  click: () => {
                                    this.show = true;
                                    this.replenishInfo = params.row;
                                }
                            }
                        }, '查看')                       
                    ]);   
             };
            return{
                replenishInfo:{},

                value:'',
                replenishType:'',
                taskType:'',
                shelvesTime_:'',
            	startTime_:"",
                endTime_:"",
                theShelvesTime_:'',
                startTime_2:"",
                endTime_2:"",
                replenishTime_:'',
                startTime_3:"",
                endTime_3:"",
                operateTime_:'',
                startTime_4:"",
                endTime_4:"",
                minAmount:"",
                maxAmount:"",
                
                visible:false,
                imgName:'',
                count:{},
                show:false,
                nowStatus:'',
                allNum:0,
                totalNum:0,
                shows:'1',  
                pageNum:1,
                pageSize:9,
                model1: '',
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
                        title: '补货编号',
                        align: 'center',
                        key: 'id',
                        width:80
                    },
                    {
                        title: '充值编号',
                        align: 'center',
                        key: 'rechargeId',
                        width:80
                    },
                     {
                        title: '补货项',
                        align: 'center',
                        key: 'replenishType',
                        width:80
                    },
                     {
                        title: '任务类别',
                        align: 'center',
                        key: 'taskType',
                        width:80
                    },
                    {
                        title: '任务名称',
                        align: 'center',
                        key: 'taskName',
                        width:100
                    },
                     {
                        title: '商户名称',
                        align: 'center',
                        key: 'tenantName',
                        width:100
                    },
                      {
                        title: '任务库存（份）',
                        align: 'center',
                        key: 'taskInventory',
                        width:80
                    },
                    {
                        title: '设置补货数量（份）',
                        align: 'center',
                        key: 'replenishAmount',
                        width:80
                    },
                    {
                        title: '设定上架时间',
                        align: 'center',
                        key: 'shelvesTime',
                        width:150
                    },
                    {
                        title: '设定下架时间',
                        align: 'center',
                        key: 'theShelvesTime',
                        width:150
                    },
                    {
                        title: '账户余额（元）',
                        align: 'center',
                        key: 'balance',
                        width:80
                    },
                    {
                        title: '充值金额（元）',
                        align: 'center',
                        key: 'amount',
                        width:80
                    },
                    {
                        title: '补货人员',
                        align: 'center',
                        key: 'replenishBy',
                        width:80
                    },
                    {
                        title: '补货时间',
                        align: 'center',
                        key: 'replenishTime',
                        width:150
                    },
                    {
                        title: '补货状态',
                        align: 'center',
                        key: 'status',
                        width:120
                    },
                    {
                        title: '操作时间',
                        align: 'center',
                        key: 'operateTime',
                        width:150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        fixed:'right',
                         render: (h, params) => {
                            return checkbtn(h,params)                                               
                           }
                    }
                ],
                data1:[]
            }
        },
        methods:{
        	SelectTime(data){
                this.shelvesTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },
            SelectTime2(data){
                this.theShelvesTime_ = data
                this.startTime_2 = data[0]
                this.endTime_2 = data[1]
            },
            SelectTime3(data){
                this.replenishTime_ = data
                this.startTime_3 = data[0]
                this.endTime_3 = data[1]
            },
            SelectTime4(data){
                this.operateTime_ = data
                this.startTime_4 = data[0]
                this.endTime_4 = data[1]
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
                this.pageNum = 1;
                 this.get(this.allUrl.findReplenishRecordPage,{page:1,rows:9}).then((res)=>{
                    this.allNum = res.data.total;
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                        i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                        i.replenishTime = this.changeTime(i.replenishTime)
                        i.operateTime = this.changeTime(i.operateTime)
                        i.taskType = changeType(i.taskType)
                        i.status = changeStatus(i.status)
                        i.replenishType = changeReplenishType(i.replenishType)
                    })
                    this.data1 = res.data.rows
                })
            },
            handlePageSize(value){
                this.pageNum = value;
                this.get(this.allUrl.findReplenishRecordPage,{page:value,rows:9,taskType:this.taskType,replenishType:this.replenishType,minAmount:this.minAmount,maxAmount:this.maxAmount,taskName:this.value,
                minShelvesTime:this.startTime_,maxShelvesTime:this.endTime_,minTheShelvesTime:this.startTime_2,maxTheShelvesTime:this.endTime_2,minReplenishTime:this.startTime_3,
                maxReplenishTime:this.endTime_3,minOperateTime:this.startTime_4,maxOperateTime:this.endTime_4}).then((res)=>{
                    this.allNum = res.data.total;
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                         i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                        i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                        i.replenishTime = this.changeTime(i.replenishTime)
                        i.operateTime = this.changeTime(i.operateTime)
                        i.taskType = changeType(i.taskType)
                        i.status = changeStatus(i.status)
                        i.replenishType = changeReplenishType(i.replenishType)
                    })
                    this.data1 = res.data.rows
                })
            },
            search(){
                this.pageNum = 1;
                this.get(this.allUrl.findReplenishRecordPage,{page:1,rows:9,taskType:this.taskType,replenishType:this.replenishType,minAmount:this.minAmount,maxAmount:this.maxAmount,taskName:this.value,
                minShelvesTime:this.startTime_,maxShelvesTime:this.endTime_,minTheShelvesTime:this.startTime_2,maxTheShelvesTime:this.endTime_2,minReplenishTime:this.startTime_3,
                maxReplenishTime:this.endTime_3,minOperateTime:this.startTime_4,maxOperateTime:this.endTime_4
                }).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                        i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.replenishTime = this.changeTime(i.replenishTime)
                            i.operateTime = this.changeTime(i.operateTime)
                            i.taskType = changeType(i.taskType)
                            i.status = changeStatus(i.status)
                            i.replenishType = changeReplenishType(i.replenishType)
                    })
                    this.data1 = res.data.rows
                })
            },
            clear(){
                this.value=''
                this.replenishType=''
                this.taskType=''
                this.shelvesTime_=''
            	this.startTime_=""
                this.endTime_=""
                this.theShelvesTime_=''
                this.startTime_2=""
                this.endTime_2=""
                this.replenishTime_=''
                this.startTime_3=""
                this.endTime_3=""
                this.operateTime_=''
                this.startTime_4=""
                this.endTime_4=""
                this.minAmount=''
                this.maxAmount=''
            },
        },
        beforeMount() {
            this.get(this.allUrl.findReplenishRecordPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                       i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                        i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                        i.replenishTime = this.changeTime(i.replenishTime)
                        i.operateTime = this.changeTime(i.operateTime)
                        i.taskType = changeType(i.taskType)
                        i.status = changeStatus(i.status)
                        i.replenishType = changeReplenishType(i.replenishType)
                  })
                this.data1 = res.data.rows
            })
        },
    }


     function changeStatus(param) { 
        var info = ''
        switch(param){
            case 0:
              info = '补货失败'
            break;
            case 1:
              info = '补货成功'
              break;
            case 2:
              info = '待财务审核'
              break;
        }
        return info;
     }
     function changeReplenishType(param) { 
        var info = ''
        switch(param){
            case 0:
              info = '补货'
            break;
            case 1:
              info = '补货上架'
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
            .ivu-input-wrapper{margin-right: 15px;}
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
    .line{
        display: flex;
        height: 60px;
        line-height: 60px;
    }
          
    }
</style>