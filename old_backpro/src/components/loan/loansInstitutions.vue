<template>
    <div class="home">
        <div class="title">
            <p>贷款机构列表</p>
            <Poptip
                confirm
                title="导出当前筛选表格?"
                @on-ok="exportData"
              >
               <Button type="primary" size="large" style="height:35px;" ghost><Icon type="ios-download-outline"></Icon> 导出表格</Button>
             
               </Poptip>
        </div>
        <div class="search">
            <div>
            <Input v-model="merName" placeholder="搜索贷款机构名称" style="width: 26%;" size="large"></Input>
             <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择操作时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            </div>
      
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="getSearch">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                <Button type="primary" ghost @click="addInstitution" style="margin-left:10px;">添加</Button>  
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
        v-model="checkShow"
        width="600"
        >
         <p slot="header" style="color:#f60;text-align:center">
            <span>查看</span>
        </p>
       <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="机构编号">
     	  	 	 	{{detail.id}}
      		  </FormItem> 
                <FormItem label="项目数量">
     	  	 	 	{{detail.projectNum}}
      		  </FormItem> 
                <FormItem label="所在地">
     	  	 	 	{{detail.address}}
      		  </FormItem> 
                <FormItem label="详细地址">
     	  	 	 	{{detail.addressDetail}}
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="机构名称">
                     {{detail.name}}
      		  </FormItem> 
            <FormItem label="操作人员">
     	  	 	 	{{detail.operatorPerson}}
      		  </FormItem> 
                <FormItem label="项目logo">
     	  	 	 	<img :src="detail.logo" alt="" style="width:50px;height:50px;cursor:pointer;" @click="view(detail.logo)">
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
                                        size: 'small',
                                        shape: "circle",
                                       
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                            this.checkShow =true
                                            this.detail = params.row                   	
                                        }
                                    }
                                }, '查看')      
             }

              const changebtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                              this.$router.push({path:'/loans/addLoansOrgan',
                                                query: {
                                                    id:params.row.id
                                                }
                                            })                   	                           	
                                        }
                                    }
                                }, '修改')      
             }
              const addbtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                       
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                             this.$router.push({path:'/loans/addLoansPro',
                                                query: {
                                                    id:params.row.id,
                                                    name:params.row.name
                                                }
                                            })                   	                           	
                                        }
                                    }
                                }, '添加贷款项目')      
             }
            return{
                imgName:'',
                visible:false,
                detail:{},
                checkShow:false,
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
            	rechargeStatus:"",
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
                        align: 'center'
                    },
                    {
                        title: '贷款机构编号',
                        align: 'center',
                        key: 'id',
                        minWidth:100
                    },
                    {
                        title:'贷款机构名称',
                        align:'center',
                        key:'name',
                        minWidth:100
                    },
                    {
                        title: '项目数量',
                        align: 'center',
                        key: 'projectNum',
                        minWidth:100
                    },
                    {
                        title: '上架数量',
                        align: 'center',
                        key: 'putAwayNum',
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
                        minWidth:150
                    },   
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 300,
                        align: 'center',
                        render: (h, params) => { 
                            return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                                addbtn(h,params)
                            ])         
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
            getSearch(){
                 this.pageNum = 1;
                this.get(this.allUrl.findLoansOrganizationPage,{page:1,rows:9,name:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total;
                    this.data1 = res.data.rows
                })
            },
            clear(){
                this.merName = ''
                this.selectTime_ = ''
                this.startTime_ = ''
                this.endTime_ = ''
            },
            addInstitution(){
                this.$router.push('/loans/addLoansOrgan')
            },
            SelectTime(data){
                this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },
            exportData(){
                this.get(this.allUrl.loansOrganizationFindAll,{name:this.merName,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                     this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.loansOrganizationVos)
                    this.$refs.selection.exportCsv({
                                filename: '贷款机构列表',
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
                this.get(this.allUrl.findLoansOrganizationPage,{page:value,rows:9}).then((res)=>{
                    this.totalNum = res.data.total;
                    this.data1 = res.data.rows
                })
            },

   
        },
        mounted(){
        	this.get(this.allUrl.findLoansOrganizationPage,{page:1,rows:9}).then((res)=>{
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
         
        	})

        }
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


