<template>
    <div class="home">
        <div class="title">
            <p>页面统计</p>
            <Poptip
                confirm
                title="导出当前筛选表格?"
                @on-ok="exportData"
              >
               <Button type="primary" size="large" style="height:35px;"><Icon type="ios-download-outline"></Icon> 导出表格</Button>
            </Poptip>
        </div>
       <div class="search">
            页面：
            <Input v-model="pageName" placeholder="页面名称/按钮名称" style="width: 26%;" size="large"></Input>
     按钮：
            <Input v-model="btnName" placeholder="页面名称/按钮名称" style="width: 26%;" size="large"></Input>
          
            <div>
            	渠道：
            <Input v-model="channel"  placeholder="渠道名称" style="width: 26%;" size="large"></Input>
          	  时间段
	       <DatePicker type="datetimerange" split-panels :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
        	<ButtonGroup size="large">
                <Button type="primary" ghost @click="findCard" style="margin-left:20px;">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
               
            </ButtonGroup>
        	
           </div>
      
          
       </div>

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right:30px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
   
            </td>
   		 <Page :total='Number(totalNum)' show-elevator style="margin-left: 400px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->
	
    </div>

    </div>
    
</template>


<script>
    export default {
        name:'',
        data(){
            return{
            	pageName:'',
            	btnName:'',
            	channel:'',
            	selectTime_:'',
            	minAmount:null,
            	maxAmount:null,

            	//搜索状态
            	model3:'',
            	//权重排序搜索
            	model4:"false",
            	weightList:[
                    {
                        value: "true",
                        label: '升序'
                    },
                    {
                        value: "false",
                        label: '降序'
                    	
                    }
            	
            	],
            	//搜索起始时间
            	startTime_:'',
            	endTime_:"",
//          	endTime_2:"",
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
                        type: 'selection',
                        align: 'center',
                        width:80,
                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '页面编号',
                        align: 'center',
                        
                        key: 'id'
                    },
                    {
                        title: '页面名称',
                        align: 'center',
                        key: 'pageName'
                    },
                      {
                        title: '按钮名称',
                        align: 'center',
                        key: 'btnName'
                    },
                     {
                        title: 'pv',
                        align: 'center',
                        key: 'accessAmount'
                    },
                    {
                        title: 'uv',
                        align: 'center',
                        key: 'accessAmountUv'
                    },
                     {
                        title: '渠道',
                        align: 'center',
                        key: 'channel'
                    },
                    {
                        title: '当天最后一次访问时间',
                        align: 'center',
                        key: 'modifyTime'
                    }
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
      	 SelectTime(data){
                  this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
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
//      	endTime2(data){
//      		this.endTime_2 = data + " 23:59:59"
//      	},




             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
             handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrl.findAccessPage,{page:this.pageNum,rows:9,pageName:this.pageName,channel:this.channel,btnName:this.btnName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{

 			this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)


                })
                 })
             },
            //  查询
              findCard(){
                  this.pageNum = 1;
              this.get(this.allUrl.findAccessPage,{page:1,rows:9,pageName:this.pageName,btnName:this.btnName,channel:this.channel,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
              	console.log(res)
                this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)

                })
                    })

               
            },
            clear(){
            	this.pageName = ''
            	this.btnName = ''
            	this.channel = ''
            	this.selectTime_ = ''
            }
            
            },
           
        beforeMount() {
             this.get(this.allUrl.findAccessPage,{page:1,rows:9}).then((res)=>{
             	console.log(res)
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)

                })
            })
            // this.get("https://journey.hzqimiao.com/pageAccess/findAccessPage",{page:1,rows:9}).then((res)=>{
            //     console.log(res)
            // })
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