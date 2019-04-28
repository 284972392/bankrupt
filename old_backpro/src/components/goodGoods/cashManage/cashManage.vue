<template>
    <div class="home">
        <div class="title">
            <p>提现管理</p>
            <!--<Poptip
                confirm
                title="导出当前筛选表格?"
                @on-ok="exportData"
              >
               <Button type="primary" size="large" style="height:35px;"><Icon type="ios-download-outline"></Icon> 导出表格</Button>
            </Poptip>-->
        </div>
       <div class="search">
            用户名：
            <Input v-model="nickName" placeholder="用户名" style="width: 15%;" size="large"></Input>
	       时间段 <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
       状态              
                <Select v-model="status" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>        	
        <ButtonGroup size="large">
                <Button type="primary" ghost @click="findCard" style="margin-left:20px;">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
               
           </ButtonGroup>
      
          
       </div>

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
   		 <Page :total='Number(totalNum)' show-elevator @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->
	
    </div>
    <Modal v-model="shenheBox" width="360">
        <p slot="header" style="color:#f60;text-align:center">
           <span>提现审核</span>
        </p>
        <div style="text-align:center">
			<Input v-model="mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入订单号或者备注"></Input>
            <p>注：若提现成功则输入订单号，若提现失败则填写失败原因</p>
        </div>
        <div slot="footer" style="display: flex; justify-content: center;">
            <Button type="error"  @click="SHfail">失败</Button>
            <Button type="error"  @click="SHsuccess">成功</Button>
        </div>
    </Modal>
    <!--成功的弹框-->
    <Modal
        v-model="checkSuccess">
   	 <p slot="header" style="text-align:center">
            <span>审核成功</span>
	 </p>
        <p style="text-align: center;font-size: 20px;">订单号：{{orderId}}</p>
    <div slot="footer" style="display: flex; justify-content: center;">
        </div>
    </Modal>
        <!--失败的弹框-->
    <Modal
        v-model="checkFail">
   	 <p slot="header" style="text-align:center">
            <span>审核失败</span>
	 </p>
        <p style="text-align: center;font-size: 20px;">{{orderId}}</p>
    <div slot="footer" style="display: flex; justify-content: center;">
        </div>
    </Modal>
    </div>
    
</template>


<script>
    export default {
        name:'',
        data(){
	            const checkbtn = (h, params) => { 
                
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	//根据状态显示哪种弹框
                                        	console.log(params.row )
                                        	this.orderId = params.row.remark
                                        	if (params.row.status == "成功") {
                                        	this.checkSuccess = true                            
                                        		
                                        	}else{
                                        		this.checkFail= true
                                        	}
                                        }
                                    }
                                }, '查看')
                   
             };
        const shenHBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {    
                                            this.amount = params.row.amount
                                            this.openId = params.row.openId
                                        	this.shenHeId = params.row.id
       										this.shenheBox = true
                                        }
                                    }
                                }, '审核')
                   
             };                             
        	
            return{
                amount:null,
                openId:'',
            	status :null,
            	nickName:null,
            	beginDate:null,
            	endDate:null,
            	shenheBox:false,
            	shenHeId:'',
            	checkSuccess:false,
            	checkFail:false,
            	pageName:'',
            	orderId:"",
            	btnName:'',
            	channel:'',
            	mark:"",
            	selectTime_:'',
            	minAmount:null,
            	maxAmount:null,

            	//搜索状态
            	model3:'',
            	//权重排序搜索
            	model4:"false",
        		statusList:[
                    {
                        value: 2,
                        label: '待审核'
                    },
                    {
                        value: 1,
                        label: '审核成功'
                    	
                    },
                    {
                        value: 0,
                        label: '审核失败'
                    	
                    }
            	],
            	//搜索起始时间
            	startTime_:'',
            	endTime_:"",
            	endTime_2:"",
                visible:false,
                imgName:'',
                 noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                week:'',
                hour:'',
                cardDetail:{
                    remark:'',type:'',id:0,name:'',title:'',putInTime:"",createTime:'',endTime:'',link:'',bannerUrl:'',recordUrl:'',count:0,weight:1,url:''
                },
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                addmodal:false,
                addMedia:false,
                changemodal:false,
                totalNum:0,
                pageNum:1,
                med_PosName:'',
                med_PosName1:'',
                searchInfo:'',
                pageSize:9,
                 columns: [
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'nickName'
                    },
                      {
                        title: '收款人姓名',
                        align: 'center',
                        key: 'payeeName'
                    },
                     {
                        title: '支付宝账号',
                        align: 'center',
                        key: 'alipayAccount'
                    },
                    {
                        title: '申请提现金额',
                        align: 'center',
                        key: 'amount'
                    },
                    {
                        title: '审核人员',
                        align: 'center',
                        key: 'operateBy'
                    },
                    
                     {
                        title: '申请提现时间',
                        align: 'center',
                        key: 'createTime'
                    },
                    {
                        title: '审核状态',
                        align: 'center',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => { //根据状态显示有哪些操作
                        	if(params.row.status=='待审核'){
                                return h('div', [
                                shenHBtn(h,params)
                                    
                                ])        
                           }else{
                           	return h('div', [
                                checkbtn(h,params)
                            ])  
                           }

                       
                        }
                    }
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
      	SHsuccess(){
            let operateBy = JSON.parse(localStorage.getItem('TokenKey')).realName
      		let formItem = {
      			id:this.shenHeId,
      			remark:this.mark,
                  status:1,
                  operateBy:operateBy,
                  openId:this.openId,
                  amount:this.amount
      		}
      		if (this.mark == "") {
      			 this.$Message.error('请填写订单号');
      		}else{
                        this.$http({
                        method:'POST',
                        url:this.allUrlTwo.update,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            data:formItem
                        }).then((res)=>{
                        	if(res.data.expand == "success"){
      						 this.$Message.info(res.data.resultMessage);
                        		
                        	this.shenheBox = false;
			            	this.get(this.allUrlTwo.getWithdrawRecordPage,{currPage:1,limit:9}).then((res)=>{
			            		  console.log(res)
			               		  this.data1 = res.data.data.list;
			               		   let that =this
			            		res.data.data.list.forEach(function(i,index){
			            			i.status = that.changeStatus(i.status)
			        				// i.createTime = i.createTime * 1000
			            			i.createTime = that.changeTime(i.createTime)
			            			
			            		})
			    		              if(res.data.data.totalCount){
			                            this.totalNum = res.data.data.totalCount
			                        }else{
			                            this.totalNum = 0
			                        }
			            	})
           	
                        		
                        		
                        	}else{
      						 this.$Message.error(res.data.resultMessage);
                        	
                        	}
                        })
      		}
      	},
      	SHfail(){
            let operateBy = JSON.parse(localStorage.getItem('TokenKey')).realName
      		let formItem = {
      			id:this.shenHeId,
      			remark:this.mark,
                status:0,
                operateBy:operateBy,
                 openId:this.openId,
                 amount:this.amount
      		}
      		if (this.mark == "") {
      			 this.$Message.error('请填写失败备注');
      		}else{
                  
                        this.$http({
                        method:'POST',
                        url:this.allUrlTwo.update,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            data:formItem
                        }).then((res)=>{
                        	if(res.data.expand == "success"){
      						 this.$Message.info(res.data.resultMessage);
                        		
                        	this.shenheBox = false;
			            	this.get(this.allUrlTwo.getWithdrawRecordPage,{currPage:1,limit:9}).then((res)=>{
			            		  console.log(res)
			               		  this.data1 = res.data.data.list;
			               		   let that =this
			            		res.data.data.list.forEach(function(i,index){
			            			i.status = that.changeStatus(i.status)
			        				// i.createTime = i.createTime * 1000
			            			i.createTime = that.changeTime(i.createTime)
			            			
			            		})
			    		              if(res.data.data.totalCount){
			                            this.totalNum = res.data.data.totalCount
			                        }else{
			                            this.totalNum = 0
			                        }
			            	})
           	
                        		
                        		
                        	}else{
      						 this.$Message.error(res.data.resultMessage);
                        	
                        	}
                        })
      		}
      	},
      	 SelectTime(data){
                  this.selectTime_ = data
                this.beginDate	 = data[0]
                this.endDate = data[1]
                if (this.beginDate == ""||this.endDate == "") {
                	
                }else{
                var date = new Date(this.beginDate);
                var date2 = new Date(this.endDate);
                this.beginDate = Date.parse(date)/1000
                this.endDate = Date.parse(date2)/1000
                }

            },
      	//有效起始时间
		ChangeStartTime_change(data){
			this.addNewMedia.validStartTime = data
		},
		ChangeEndTime_change(data){
			this.addNewMedia.validEndTime = data
			
		},
		//投放时间段
		ChangeStartTime2_change(data){
			this.addNewMedia.putStartTime = data
		},
		ChangeEndTime2_change(data){
			this.addNewMedia.putEndTime = data
			
		},
        exportData(){
     
              this.get(this.allUrl.findAccessPageList,{pageName:this.pageName,btnName:this.btnName,channel:this.channel,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                  console.log(res)
                  res.data.data.appClickCacheVoList.forEach((i,index)=>{    
                         i.modifyTime = this.changeTime(i.modifyTime)
                    })
                     this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.appClickCacheVoList)
                    this.$refs.selection.exportCsv({
                                filename: '跳转点击统计表格',
                                columns:this.columns,
                                data: this.exportTable
                            });
     
                 })

        },




      	startTime(data){
        		this.startTime_ = data + " 00:00:00"
        	},
        	endTime(data){
        		this.endTime_ = data + " 23:59:59"
        	},
        	endTime2(data){
        		this.endTime_2 = data + " 23:59:59"
        	},




             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
             handlePageSize(value) {
                 this.pageNum = value;
            	this.get(this.allUrlTwo.getWithdrawRecordPage,{currPage:this.pageNum,limit:9,nickName:this.nickName,status:this.status,beginDate:this.beginDate,endDate:this.endDate}).then((res)=>{
               		  this.data1 = res.data.data.list;
               		   let that =this
            		res.data.data.list.forEach(function(i,index){
            			i.status = that.changeStatus(i.status)
            			// i.createTime = i.createTime * 1000
            			i.createTime = that.changeTime(i.createTime)
            		})
    		              if(res.data.data.totalCount){
                            this.totalNum = res.data.data.totalCount
                        }else{
                            this.totalNum = 0
                        }
            	})
             },
            //  查询
              findCard(){
                  this.pageNum = 1;

            	this.get(this.allUrlTwo.getWithdrawRecordPage,{currPage:1,limit:9,nickName:this.nickName,status:this.status,beginDate:this.beginDate,endDate:this.endDate}).then((res)=>{
            		 
               		 
               		   let that =this
            		res.data.data.list.forEach(function(i,index){
            			i.status = that.changeStatus(i.status)
                        // i.createTime = i.createTime * 1000
                        i.createTime = that.changeTime(i.createTime)
                        console.log(i.createTime)
                    })
                     this.data1 = res.data.data.list;
                      console.log(res)
    		              if(res.data.data.totalCount){
                            this.totalNum = res.data.data.totalCount
                        }else{
                            this.totalNum = 0
                        }
            	})

               
            },
            clear(){
            	this.nickName = ""
            	this.status = ""
            	this.beginDate = ""
            	this.endDate = ""
            	this.selectTime_ =""
            },
                changeStatus(data){
                let result = '';
                if(data== 0){
                    result = '失败'
                }else if(data==1){
                    result = '成功'
                }else if(data==2){
                    result = '待审核'
                }
                return result;
            }
            
            },
           
        mounted() {
            
            	this.$https.get(this.allUrlTwo.getWithdrawRecordPage,{currPage:1,limit:9}).then((res)=>{
            		  console.log(res)
               		  this.data1 = res.data.data.list;
               		   let that =this
            		res.data.data.list.forEach(function(i,index){
            			i.status = that.changeStatus(i.status)
        				// i.createTime = i.createTime * 1000
            			i.createTime = that.changeTime(i.createTime)
            			
            		})
    		              if(res.data.data.totalCount){
                            this.totalNum = res.data.data.totalCount
                        }else{
                            this.totalNum = 0
                        }
            	})
           },
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