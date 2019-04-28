<template>
    <div class="home">
        <div class="title">
            <p>用户管理</p>
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
            <Input v-model="nickName" placeholder="用户名称" style="width: 15%;" size="large"></Input>
       会员等级              
                <Select v-model="levelName" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.label" :key="item.value">{{ item.label }}</Option>
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
	
    </div>

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
                                        	console.log("???")
                                        	
                                        	 this.$router.push({path:'/good_goods/checkTeamUser',
                                                query: {
                                                    openId:params.row.openId
                                                }
                                            })  
                                        }
                                    }
                                }, '查看')
                   
             };
            return{
      			shows :1,
            	pageName:'',
            	nickName:null,
            	levelName:null,
            	btnName:'',
            	channel:'',
            	selectTime_:'',
            	minAmount:null,
            	maxAmount:null,

            	//搜索状态
            	model3:'',
            	//权重排序搜索
            	model4:"false",
        		statusList:[
            		 {
                        value: 0,
                        label: '普通会员'
                    },
                    {
                        value: 1,
                        label: '青铜分销员'
                    },
                    {
                        value: 2,
                        label: '白银分销员'
                    	
                    },
                    {
                        value: 3,
                        label: '黄金分销员'
                    	
                    },
                    {
                        value: 4,
                        label: '钻石分销员'
                    	
                    },
                    {
                        value: 5,
                        label: '金牌分销员'
                    	
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
                        title: '用户名称',
                        align: 'center',
                        key: 'nickName'
                    },
                      {
                        title: '会员等级',
                        align: 'center',
                        key: 'levelName'
                    },
                     {
                        title: '团队总人数(人)',
                        align: 'center',
                        key: 'totalNum'
                    },
                    {
                        title: '已收佣金(元)',
                        align: 'center',
                        key: 'receiveMoney'
                    },
                     {
                        title: '待收佣金(元)',
                        align: 'center',
                        key: 'noReceiveMoney'
                    },
                    {
                        title: '总预估收入(元)',
                        align: 'center',
                        key: 'totalReceiveMoney'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 150,
                        align: 'center',
                        render: (h, params) => { 
                            return h('div', [
                                checkbtn(h,params)
                            ])         
                            
                       
                        }
                    }
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
      	teamList(){
      		this.shows = 1
      	},
      	getList(){
      		this.shows = 2
      		
      	},
      	readyList(){
      		this.shows = 3
      		
      	},
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
        	endTime2(data){
        		this.endTime_2 = data + " 23:59:59"
        	},




             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
             handlePageSize(value) {
                 this.pageNum = value;
            	this.get(this.allUrlTwo.userManage,{page:this.pageNum,size:9,levelName:this.levelName,nickName:this.nickName}).then((res)=>{
            		  console.log(res)
               		  this.data1 = res.data.data.records;
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            	})
             },
            //  查询
              findCard(){
                  this.pageNum = 1;

            	this.get(this.allUrlTwo.userManage,{page:1,size:9,levelName:this.levelName,nickName:this.nickName}).then((res)=>{
            		  console.log(res)
               		  this.data1 = res.data.data.records;
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            	})
           

               
            },
            clear(){
            	this.levelName = "";
            	this.nickName = ""
            }
            
            },
           
        beforeMount() {
            	this.get(this.allUrlTwo.userManage,{page:1,size:9}).then((res)=>{
            		  console.log(res)
               		  this.data1 = res.data.data.records;
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
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
            text-align: left;
            border-bottom:1px solid #000000;
            display: flex; justify-content: space-between;
        }
        .search{
           line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
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