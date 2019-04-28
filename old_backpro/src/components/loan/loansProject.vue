<style>
     .ivu-form-item-label{font-size: 15px;}
</style>


<template>
    <div class="home">
        <div class="title">
            <p>贷款项目列表</p>
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

            <Input v-model="merName" placeholder="搜索贷款项目名称" style="width: 26%;" size="large"></Input>

             <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            </div>
      
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="getSearch">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>
        </div>

        
       

        

    <div class="table">
        
        <Table stripe border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
  
            </td>
   		 <Page :total='Number(totalNum)' show-elevator @on-change = 'handlePageSize' show-total :current="pageNum" :page-size="pageSize" style="margin-left: 400px;"></Page>
   		 
            
        </tr>


        	
    </div>

        <Modal
            v-model="upShow"
            title="上架"
            @on-ok="upConfirm"
           >
            <p>确认上架？</p>
        </Modal>
          <Modal
            v-model="downShow"
            title="下架"
            @on-ok="downConfirm"
           >
            <p>确认下架？</p>
        </Modal>
         <Modal
            v-model="delectShow"
            title="删除"
            @on-ok="delectConfirm"
           >
            <p>确认删除？</p>
        </Modal>

          <Modal
        v-model="checkShow"
        width="700"
        >
         <p slot="header" style="color:#f60;text-align:center">
            <span>查看</span>
        </p>
       <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="贷款名称">
                    <p class="pp">{{detail.loansName}}</p>	 	
      		  </FormItem> 
              <FormItem label="可借贷额度">
                  <p class="pp">{{detail.availableCredit}}元</p>	
      		  </FormItem> 
              <FormItem label="贷款期限">
                  <p class="pp">{{this.detail.loansTimeLimit.split('/')[0]+this.detail.loansTimeLimit.split('/')[1]}}</p>
      		  </FormItem> 
              <FormItem label="通过率">
                  <p class="pp">{{detail.passRate}}%</p>
      		  </FormItem>
              <FormItem label="贷款条件">
                  <p class="pp">{{detail.paymentCondition}}</p>	
      		  </FormItem> 
              <FormItem label="结算方式">
                  <p class="pp">{{detail.paymentType}}</p>
      		  </FormItem> 
              <FormItem label="投放数量">
                  <p class="pp">{{detail.putOnNum}}</p>
      		  </FormItem> 
              <FormItem label="贷款机构对接人">
                  <p class="pp">{{detail.loansOrganizationName}}</p>
      		  </FormItem> 
              <FormItem label="米多星对接人">
                  <p class="pp">{{detail.mdxName}}</p>
      		  </FormItem> 
       	 </Col>
       	 <Col span="13" offset="0">
       	 	 <FormItem label="机构名称">
                     <p class="pp">{{detail.organizationName}}</p>    
      		  </FormItem> 
             <FormItem label="贷款利率">
                 <p class="pp">{{this.detail.loansRate.split('/')[0]+"%/"+ this.detail.loansRate.split('/')[1]}}</p>
      		  </FormItem> 
             <FormItem label="放款时间">
                 <p class="pp">{{this.detail.loansPeriod.split('/')[0] + this.detail.loansPeriod.split('/')[1]}}</p>    
      		  </FormItem> 
             <FormItem label="还款方式">
                 <p class="pp">{{detail.repaymentType}}</p>             
      		  </FormItem> 
             <FormItem label="贷款链接">
                 <p class="pp">{{detail.paymentAddress}}</p>     
      		  </FormItem> 
             <FormItem label="结算单价">
                 <p class="pp">{{detail.paymentRadio}}元</p>     
      		  </FormItem> 
            <FormItem label="投放时间">
                <p class="pp">{{detail.putOnTime}}</p>  
      		  </FormItem> 
            <FormItem label="贷款对接人手机号">
                <p class="pp">{{detail.loansPhone}}</p>                    
      		  </FormItem> 
             <FormItem label="机构logo">
                <img :src="detail.logoPic" alt="" style="width:50px;height:50px;cursor:pointer;" @click="view(detail.logoPic)">        
      		  </FormItem> 
       	 </Col>
       </Row>
      </Form>
    </Modal>
        <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
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
             const checkbtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {

                                            this.checkShow = true;
                                            this.detail = params.row
                                        }
                                    }
                                }, '查看')      
             }
             const delectbtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                            this.delectShow = true
                                            this.projectId = params.row.id              	                           	
                                        }
                                    }
                                }, '删除')      
             }

              const changebtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                                this.$router.push({path:'/loans/addLoansPro',
                                                    query: {
                                                        projectId:params.row.id,
                                                        name:params.row.organizationName
                                                    }        	              	
                                                })
                                        }
                                    }
                                }, '修改')      
             }
              const copybtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                                this.$router.push({path:'/loans/addLoansPro',
                                                    query: {
                                                        name:params.row.organizationName,
                                                        copyId:params.row.id
                                                    }        	              	
                                                })
                                        }
                                    }
                                }, '复制')      
             }
              const putbtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                            this.upShow = true
                                            this.projectId = params.row.id         	                           	
                                        }
                                    }
                                }, '上架')      
             }
              const soldbtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                            this.downShow = true
                                            this.projectId = params.row.id              	                           	
                                        }
                                    }
                                }, '下架')      
             }
            return{
                imgName:'',
                visible:false,
                detail:{
                   loansPeriod: "0.01/小时",
                   loansRate: "0.03/天",
                   loansTimeLimit: "1/月"
                },
                checkShow:false,
                projectId:'',
                downShow:false,
                upShow:false,
                delectShow:false,
                exportTable:[],
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
            	merName:'',
            	pageNum:1,
                pageSize:9,
                totalNum:1,
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
                        align: 'center',
                    },
                    {
                        title: '贷款项目编号',
                        align: 'center',
                        key: 'id',
                        minWidth:130
                    },
                    {
                        title:'贷款机构名称',
                        align:'center',
                        key:'organizationName',
                        minWidth:130
                    },
                    {
                        title: '贷款项目名称',
                        align: 'center',
                        key: 'loansName',
                        minWidth:130
                    },
                    {
                        title: '贷款金额（元）',
                        align: 'center',
                        key: 'availableCredit',
                        minWidth:140
                    },
                    {
                        title: '结算单价',
                        align: 'center',
                        key: 'paymentRadio',
                        minWidth:100
                    },
                     {
                        title: '投放数量',
                        align: 'center',
                        key: 'putOnNum',
                        minWidth:120
                    },   
                     {
                        title: '消耗数量',
                        align: 'center',
                        key: 'consumeNum',
                        minWidth:100
                    },
                     {
                        title: '投放时间',
                        align: 'center',
                        key: 'putOnTime',
                        minWidth:160
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'state',
                        minWidth:100
                    },
                     {
                        title: '操作人员',
                        align: 'center',
                        key: 'operatorPerson',
                        minWidth:100
                    },
                     {
                        title: '操作时间',
                        align: 'center',
                        key: 'modifyTime',
                        width:150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        fixed:'right',
                        render: (h, params) => { 
                           if(params.row.state=='已上架'){
                                return h('div', [
                                    checkbtn(h,params),
                                     soldbtn(h,params),
                                ])        
                           }else if(params.row.state=='已下架'){
                                return h('div', [
                                    checkbtn(h,params),
                                    changebtn(h,params),
                                    putbtn(h,params),
                                    copybtn(h,params)
                                ])     
                           }else if(params.row.state=='待上架'){
                                 return h('div', [
                                     checkbtn(h,params),
                                    changebtn(h,params),
                                    putbtn(h,params),
                                    delectbtn(h,params)
                                ])     
                           }
                            
                        }
                    }
                ],
                data1:[{id:1,name:'s',proNum:1,putNum:2,operator:'ss',operTime:'12'}]   
            }
        },
        methods:{
             view(data){
                this.visible = true;
                this.imgName = data;
            },
            // 上架
            upConfirm(){
                this.get(this.allUrl.updateLoanState,{id:this.projectId,state:1}).then((res)=>{
                     if(res.data.errordesc=='success'){
                                this.$Message.success('上架成功！');
                                this.get(this.allUrl.findLoansProjectPage,{page:this.pageNum,rows:9,loansName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                                    this.totalNum = res.data.total;
                                    res.data.rows.forEach((i,index)=>{        
                                    i.state = this.changeStatus(i.state)
                                    i.modifyTime = this.changeTime(i.modifyTime)
                         i.modifyTime =  i.modifyTime.replace(/\-/g,"\/");
                                    
                                    })
                                        this.data1 = res.data.rows
                                    })
                        }
                })
            },
            // 下架
            downConfirm(){
                this.get(this.allUrl.updateLoanState,{id:this.projectId,state:2}).then((res)=>{
                     if(res.data.errordesc=='success'){
                                this.$Message.success('下架成功！');
                                this.get(this.allUrl.findLoansProjectPage,{page:this.pageNum,rows:9,loansName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                                    this.totalNum = res.data.total;
                                    res.data.rows.forEach((i,index)=>{        
                                    i.state = this.changeStatus(i.state)
                                    i.modifyTime = this.changeTime(i.modifyTime)
                         i.modifyTime =  i.modifyTime.replace(/\-/g,"\/");
                                    
                                    })
                                        this.data1 = res.data.rows
                                    })
                        }
                })
            },
            // 删除
            delectConfirm(){
                 this.get(this.allUrl.delLoanProject,{id:this.projectId}).then((res)=>{
                      if(res.data.errordesc=='success'){
                                this.$Message.success('删除成功！');
                                this.get(this.allUrl.findLoansProjectPage,{page:this.pageNum,rows:9,loansName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                                    this.totalNum = res.data.total;
                                    res.data.rows.forEach((i,index)=>{        
                                    i.state = this.changeStatus(i.state)
                                    i.modifyTime = this.changeTime(i.modifyTime)
                         i.modifyTime =  i.modifyTime.replace(/\-/g,"\/");
                                    
                                    })
                                        this.data1 = res.data.rows
                                    })
                        }
                 })
            },
            changeStatus(data){
                let result = '';
                if(data==0){
                    result = '待上架'
                }else if(data==1){
                    result = '已上架'
                }else if(data==2){
                    result = '已下架'
                }
                return result;
            },
            getSearch(){
                 this.pageNum = 1;
                this.get(this.allUrl.findLoansProjectPage,{page:1,rows:9,loansName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                       i.state = this.changeStatus(i.state)
                       i.modifyTime = this.changeTime(i.modifyTime)
                         i.modifyTime =  i.modifyTime.replace(/\-/g,"\/");
                       
                    })
                    this.data1 = res.data.rows
                })
            },
            clear(){
                this.merName = ''
                this.selectTime_ = ''
                this.endTime_ = ''
                this.startTime_ = ''
            },
            SelectTime(data){
                this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },
            exportData(){
                  this.get(this.allUrl.loansProjectFindAll,{loansName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                   res.data.data.loansProjects.forEach((i,index)=>{    
                        i.state = this.changeStatus(i.state)
                        i.modifyTime = this.changeTime(i.modifyTime)
                         i.modifyTime =  i.modifyTime.replace(/\-/g,"\/");
                        
                    })
                     this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.loansProjects)
                    this.$refs.selection.exportCsv({
                                filename: '贷款项目列表',
                                columns:this.columns,
                                data: this.exportTable
                            });
                 })
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);

            },
            Charge(){

            },
             //分页点击
            handlePageSize(value){
                 this.pageNum = value;
                this.get(this.allUrl.findLoansProjectPage,{page:value,rows:9,loansName:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    res.data.rows.forEach((i,index)=>{        
                       i.state = this.changeStatus(i.state)
                       i.modifyTime = this.changeTime(i.modifyTime)
                         i.modifyTime =  i.modifyTime.replace(/\-/g,"\/");
                       
                    })
                    this.data1 = res.data.rows
                })
            },

   
        },
        mounted(){
            this.get(this.allUrl.findLoansProjectPage,{page:1,rows:9}).then((res)=>{
                console.log(res)
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                       i.state = this.changeStatus(i.state)
                       i.modifyTime = this.changeTime(i.modifyTime)
                         i.modifyTime =  i.modifyTime.replace(/\-/g,"\/");
                    })
                this.data1 = res.data.rows
         
        	})

        }
    }


  
</script>

<style scoped lang="scss">
 .pp{color: #dd1111;font-size: 15px;
    width: 68%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
 }
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
            .ivu-input-wrapper{margin-right: 25px;}
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


