
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
            用户名称：
            <Input v-model="nickName" placeholder="页面名称/按钮名称" style="width: 15%;" size="large"></Input>
                        商品名称：
            <Input v-model="goodsName" placeholder="商品名称" style="width: 15%;" size="large"></Input>
                        提现编号：
            <Input v-model="orderSn" placeholder="订单编号" style="width: 15%;" size="large"></Input>
   	<div>
   		       状态 ：          
                <Select v-model="orderStatus" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
	       提现时间： <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
                
        <ButtonGroup size="large">
                <Button type="primary" ghost @click="findCard" style="margin-left:20px;">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
               
           </ButtonGroup>
   	</div>    

      
          
       </div>

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
   		 <Page :total='Number(totalNum)' show-elevator @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
       </tr>
	
    </div>

    </div>
    
</template>


<script>
//	require("es6-promise").polyfill();
//	require('isomorphic-fetch');
    export default {
        name:'',
        data(){
            return{
      			shows :1,
            	pageName:'',
            	btnName:'',
            	channel:'',
            	selectTime_:'',
            	minAmount:null,
            	maxAmount:null,
				orderStatus:null,
				goodsName:null,
				orderSn:null,
				nickName:null,
				beginDate:null,
				endDate:null,
            	//搜索状态
            	model3:'',
            	//权重排序搜索
            	model4:"false",
        		statusList:[
            		 {
                        value: -1,
                        label: '未支付'
                    },
                    {
                        value: 0,
                        label: '已支付'
                    },
                    {
                        value:1,
                        label: '已成团'
                    	
                    },
                    {
                        value: 2,
                        label: '确认收货'
                    	
                    },
                    {
                        value: 3,
                        label: '审核成功'
                    	
                    },
                    {
                        value: 4,
                        label: '审核失败'
                    	
                    },
                    {
                        value: 5,
                        label: '已经结算'
                    	
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
                        title: '商品名',
                        align: 'center',
                        key: 'goodsName'
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'nickName'
                    },
                      {
                        title: '购买数量',
                        align: 'center',
                        key: 'goodsQuantity'
                    },
                     {
                        title: '购买金额(元)',
                        align: 'center',
                        key: 'orderAmount'
                    },
                    {
                        title: '付款时间',
                        align: 'center',
                        key: 'orderPayTime'
                    },
                     {
                        title: '订单编号',
                        align: 'center',
                        key: 'orderSn'
                    },
                    {
                        title: '订单状态',
                        align: 'center',
                        key: 'orderStatus'
                    }
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
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
					let that = this;
            	this.get(this.allUrlTwo.getPddOrderPage,{currPage:this.pageNum,limit:9,orderStatus:this.orderStatus,goodsName:this.goodsName,orderSn:this.orderSn,nickName:this.nickName,beginDate:this.beginDate,endDate:this.endDate}).then(function(res){
            		  console.log(res)
               		  that.data1 = res.data.data.list;
            		res.data.data.list.forEach(function(i,index){
            			i.orderAmount = i.orderAmount/100;
            			i.orderPayTime = i.orderPayTime * 1000
            			i.orderPayTime = that.changeTime(i.orderPayTime)
            			i.orderStatus = that.changeStatus(i.orderStatus)
            			
            			
            		})
    		              if(res.data.data.totalCount){
                            that.totalNum = res.data.data.totalCount
                        }else{
                            that.totalNum = 0
                        }
            	})
             },
            //  查询
              findCard(){
                  this.pageNum = 1;
			
            	let that = this;
            	this.get(this.allUrlTwo.getPddOrderPage,{currPage:1,limit:9,orderStatus:this.orderStatus,goodsName:this.goodsName,orderSn:this.orderSn,nickName:this.nickName,beginDate:this.beginDate,endDate:this.endDate}).then(function(res){
            		  console.log(res)
               		  that.data1 = res.data.data.list;
            		res.data.data.list.forEach(function(i,index){
            			i.orderAmount = i.orderAmount/100;
            			i.orderPayTime = i.orderPayTime * 1000
            			i.orderPayTime = that.changeTime(i.orderPayTime)
            			i.orderStatus = that.changeStatus(i.orderStatus)
            			
            			
            		})
    		              if(res.data.data.totalCount){
                            that.totalNum = res.data.data.totalCount
                        }else{
                            that.totalNum = 0
                        }
            	})
			
			
               
            },
            clear(){
            	this.orderStatus =""
            	this.goodsName =""
            	this.orderSn =""
            	this.nickName =""
            	this.beginDate =""
            	this.endDate =""
            	this.selectTime_ =""
            	
            },
            changeStatus(data){
                let result = '';
                if(data== -1){
                    result = '未支付'
                }else if(data==0){
                    result = '已支付'
                }else if(data==1){
                    result = '已成团'
                }else if(data==2){
                    result = '确认收货'
                }else if(data==3){
                    result = '审核成功'
                }else if(data==4){
                    result = '审核失败'
                }else if(data==5){
                    result = '已经结算'
                }else if(data==8){
                    result = '非多多进宝商品'
                }
                return result;
            }
            
            },
            mounted(){
            	
            	
            	let that = this;
            	this.get(this.allUrlTwo.getPddOrderPage,{currPage:1,limit:9}).then(function(res){
            		  console.log(res)
               		  that.data1 = res.data.data.list;
            		res.data.data.list.forEach(function(i,index){
            			i.orderAmount = i.orderAmount/100;
            			i.orderPayTime = i.orderPayTime * 1000
            			i.orderPayTime = that.changeTime(i.orderPayTime)
            			i.orderStatus = that.changeStatus(i.orderStatus)
            			
            			
            		})
    		              if(res.data.data.totalCount){
                            that.totalNum = res.data.data.totalCount
                        }else{
                            that.totalNum = 0
                        }
            	})
           }
    }
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
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