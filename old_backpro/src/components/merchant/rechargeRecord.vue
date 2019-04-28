<template>
    <div class="home">
        <div class="title">
            <p>充值记录</p>
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
            <Input v-model="merName" placeholder="充值编号/商户名称/商户编号" style="width: 26%;" size="large"></Input>
            选择时间段
             <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            </div>
            是否预充值
            <Select v-model="model_preloaded" style="width:15%;margin-left:3px;" size="large">
                <Option v-for="item in getpreloaded" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             余额范围
            <InputNumber v-model="balance_f" :min='0' style="width:100px;"></InputNumber> 元
            ☞
            <InputNumber v-model="balance_s" :min='0' style="width:100px;"></InputNumber> 元
            
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="getSearch">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>
        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllRecord()">全部充值记录({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="charSuc()">充值成功({{userNum.success}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="charFail()">充值失败({{userNum.fail}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="charToAudit()">待审核({{userNum.toAudit}})</div>
       </div>
        
       

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
<!--                <Button @click="Rechar()" style="margin-right: 10px;">重新充值</Button>-->
      
            </td>
   		 <!--<Page :total='200' show-elevator style="margin-left: 180px;"></Page>-->
   		 <Page :total='Number(totalNum)' show-elevator @on-change = 'handlePageSize' show-total :current="pageNum" :page-size="pageSize" style="margin-left: 400px;"></Page>
   		 
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->

        	
    </div>
    
    		 <!--查看充值弹框弹框-->
             <Modal v-model="checkout1" width="600" title="查看">
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
                model_preloaded:'',
                getpreloaded:[
                     {
                        value: 'false',
                        label: '否'
                    },
                    {
                        value: 'true',
                        label: '是'
                    },
                    {
                        value: '',
                        label: '全部'
                    }
                ],
                startTime_:"",
            	endTime_:"",
                selectTime_:'',
            	rechargeStatus:"",
            	isfail:false,
            	isCheckTime:true,
            	rechargeRecord:{},
            	checkout1:false,
            	merName:'',
            	userNum:{},
            	allNum:0,
            	allNum2:0,
            	pageNum:1,
                shows:'1',
                pageSize:9,
                value:'',
                model1: '全部',
                totalNum:1,
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
                        title:'是否预充值',
                        align:'center',
                        key:'preloaded'
                    },
                    {
                        title: '商户名称',
                        align: 'center',
                        key: 'tenantName'
                    },
                    {
                        title: '充值金额',
                        align: 'center',
                        key: 'amount'
                    },
                    {
                        title: '充值状态',
                        align: 'center',
                        key: 'status'
                    },
                     {
                        title: '充值时间',
                        align: 'center',
                        key: 'createTime',
                        width:200
                    },   
                     {
                        title: '余额',
                        align: 'center',
                        key: 'balance'
                    },
                    {
                        title: '充值人员',
                        align: 'center',
                        key: 'createBy'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                                 // **************************************充值失败状态下****************************
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
                                        			this.checkRecharge(params)		                			         
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
        	startTime(data){
        		this.startTime_ = data + " 00:00:00"
        	},
        	endTime(data){
        		this.endTime_ = data + " 23:59:59"
        	},
            clear(){
                this.balance_f = 0
                this.balance_s = 0
                this.model_preloaded = ''
                this.merName = ''
                this.rechargeStatus = ""
                this.beginTime = ''
                this.endTime_ = ''
                this.selectTime_  = ''
                this.shows = 1
                this.startTime_ = ''
                this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9}).then((res)=>{
                  this.allNum = res.data.total     
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  i.status = changeStatus(i.status)
                  i.preloaded = changePreloaded(i.preloaded)
                })
            	});
            },
            SelectTime(data){
                this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },
            exportData(){
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f > this.balance_s){
                    this.$Message.warning('余额填反了')
                }else{
                    this.get(this.allUrl.findRechargeRecordList,{tenantName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_,preloaded:this.model_preloaded,minBalance:this.balance_f,maxBalance:this.balance_s}).then((res)=>{
                        console.log(res)
                    res.data.data.rechargeRecordList.forEach((i,index)=>{    
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.preloaded = changePreloaded(i.preloaded)
                    })
                    this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.rechargeRecordList)
                    this.$refs.selection.exportCsv({
                                filename: '充值记录表格',
                                columns:this.columns,
                                data: this.exportTable
                            });
                  })
                }
                 
            },
        	checkRecharge(params){
        		console.log(params.row)
        			 this.checkout1 = true;
        			 this.get(this.allUrl.findRechargeRecord,{rechargeRecordId:params.row.id}).then((res)=>{
        			 	console.log(res)
						this.rechargeRecord = res.data.data
               		    this.rechargeRecord.rechargeType = changeType(this.rechargeRecord.rechargeType)
						this.rechargeRecord.createTime = this.changeTime(this.rechargeRecord.createTime)
                        this.rechargeRecord.updateTime = this.changeTime(this.rechargeRecord.updateTime)
						if (this.rechargeRecord.status == "0") {
		                  	this.isCheckTime = true
							this.isfail = true
		                  	this.rechargeRecord.status = "失败"
		                  }
		                  if (this.rechargeRecord.status == "1") {
		                  	this.isCheckTime = true
							this.isfail = false
		                  	this.rechargeRecord.status = "成功"
		                  }
		                  if (this.rechargeRecord.status == "2") {
		                  	this.isCheckTime = false
							this.isfail = false
		                  	this.rechargeRecord.status = "待审核"
		                  }
        			 })
        
        	},
        	getSearch(){
        		  if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f > this.balance_s){
                    this.$Message.warning('余额填反了')
                }else{
                    this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,tenantName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_,preloaded:this.model_preloaded,minBalance:this.balance_f,maxBalance:this.balance_s}).then((res)=>{
                    this.totalNum = res.data.total
                    this.data1 = res.data.rows
                    res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                    i.status = changeStatus(i.status)
                    i.preloaded = changePreloaded(i.preloaded)
                    })
                  })
                }
            	
        	},
        	
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            Charge(){

            },
             //分页点击
            handlePageSize(value){
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f > this.balance_s){
                    this.$Message.warning('余额填反了')
                }else{
                        this.get(this.allUrl.findRechargeRecordPage,{page:value,rows:9,status:this.rechargeStatus,tenantName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_,preloaded:this.model_preloaded,minBalance:this.balance_f,maxBalance:this.balance_s}).then((res)=>{
                        this.totalNum = res.data.total
                        this.data1 = res.data.rows
                        res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                    i.status = changeStatus(i.status)
                    i.preloaded = changePreloaded(i.preloaded)
                    })
                    })
                }
                
            },
            //全部充值记录
            AllRecord(){
            	this.rechargeStatus = ""
                this.shows = 1
                //获取个人商户列表列表
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f > this.balance_s){
                    this.$Message.warning('余额填反了')
                }else{
                    this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,tenantName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_,preloaded:this.model_preloaded,minBalance:this.balance_f,maxBalance:this.balance_s}).then((res)=>{

                  this.allNum = res.data.total     
        		
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  i.status = changeStatus(i.status)
                  i.preloaded = changePreloaded(i.preloaded)
                })
        	})
                }
        	
        	
            },
            //充值成功
            charSuc(){
            	this.rechargeStatus = "1"
                this.shows = 2
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f > this.balance_s){
                    this.$Message.warning('余额填反了')
                }else{
                    this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,status:"1",tenantName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_,preloaded:this.model_preloaded,minBalance:this.balance_f,maxBalance:this.balance_s}).then((res)=>{
                  this.allNum2 = res.data.total     
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  i.status = changeStatus(i.status)
                  i.preloaded = changePreloaded(i.preloaded)
                })
        	})
                }
        		//获取个人商户列表列表
        	
        	
            
            },
            charFail(){
                this.shows = 3
                this.rechargeStatus = "0"
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f > this.balance_s){
                    this.$Message.warning('余额填反了')
                }else{
                    this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,status:"0",tenantName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_,preloaded:this.model_preloaded,minBalance:this.balance_f,maxBalance:this.balance_s}).then((res)=>{ 
                        this.totalNum = res.data.total
                        this.data1 = res.data.rows;
                        res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.preloaded = changePreloaded(i.preloaded)
                        })
                    })
                }
                
            },
            charToAudit(){  
                this.rechargeStatus = "2"
                this.shows = 4
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else if(this.balance_f > this.balance_s){
                    this.$Message.warning('余额填反了')
                }else{
                     this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9,status:"2",tenantName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_,preloaded:this.model_preloaded,minBalance:this.balance_f,maxBalance:this.balance_s}).then((res)=>{ 
                        this.totalNum = res.data.total
                        this.data1 = res.data.rows;
                        res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.status = changeStatus(i.status)
                        i.preloaded = changePreloaded(i.preloaded)
                        })
                    })
                }
               
            },
            //************按钮****************
            //重新充值
            Rechar(){

            }
         
        },
        mounted(){
        			//获取个人商户列表列表
        	this.get(this.allUrl.findRechargeRecordPage,{page:1,rows:9}).then((res)=>{
                  this.allNum = res.data.total     
                this.totalNum = res.data.total
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  i.status = changeStatus(i.status)

                  i.preloaded = changePreloaded(i.preloaded)
                })
                this.data1 = res.data.rows;
                console.log(this.data1)
        	});
        	
		 this.get(this.allUrl.countRechargeRecord).then((res)=>{
                this.userNum = res.data.data;
            })
        }
    }


    function changeStatus(param) { 
        var info = ''
        switch(param){
            case 0:
              info = '失败'
            break;
            case 1:
              info = '成功'
              break;
            case 2:
              info = '待审核'
              break;
        }
        return info;
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
      function changePreloaded(param) { 
        var info = ''
        switch(param){
            case 'false':
              info = '否'
            break;
            case 'true':
              info = '是'
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
    .searchBox{
    	width: 100%;
    	height: 100%;
    	display: flex;
    	flex-wrap: wrap;
    	div{
    		width: 50%;
    		height: 30px;
    		display: flex;
    		span:nth-child(1){
    			display: block;
    			width: 100px;
    		}
    	}
    	.failBox{
    		width: 100%;
    		height: 50px;
    		border-top: 1px solid #8C8C8C;
    		display: flex;
    		align-items: center;
    	}
    }
</style>


