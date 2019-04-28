<template>
	<div class="home"> 
	    <div class="title">
	    	<p>机构列表</p>
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
            <Input v-model="name" placeholder="搜索机构名称" style="width: 26%;" size="large"></Input>
             <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择操作时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
             <Select placeholder="创建人员" v-model="createBy" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in pepoList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
      
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="getSearch">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                <Button type="primary" ghost @click="addInstitution" style="margin-left:10px;">添加机构</Button>  
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
                <FormItem label="所在地址">
     	  	 	 	{{detail.address}}
      		  </FormItem> 
                <FormItem label="项目数量">
     	  	 	 	{{detail.courseNum}}
      		  </FormItem> 
                <FormItem label="创建时间">
     	  	 	 	{{detail.createTime}}
      		  </FormItem> 
      		     <FormItem label="操作时间">
     	  	 	 	{{detail.modifyTime}}
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="机构名称">
                     {{detail.name}}
      		  </FormItem> 
            <FormItem label="创建人员">
     	  	 	 	{{detail.createBy}}
      		  </FormItem> 
      		    <FormItem label="投放次数">
     	  	 	 	{{detail.putNum}}
      		  </FormItem> 
                <FormItem label="机构logo">
     	  	 	 	<img :src="detail.logo" alt="" style="width:50px;height:50px;cursor:pointer;" @click="view(detail.logo)">
      		  </FormItem> 
       	 </Col>
       </Row>
      </Form>
    </Modal>
        <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>
          
    <Modal v-model="isDel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p>确认删除?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long  @click="del">Delete</Button>
        </div>
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
		name:'organizationList',
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
                                        type: 'warning',
                                        size: 'small',
                                    
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                              this.$router.push({path:'/haha_study/addOrganization',
                                                query: {
                                                    id:params.row.id,
                                                    name:params.row.name,
                                                    address:params.row.address,
                                                    logo:params.row.logo
                                                }
                                            })                   	                           	
                                        }
                                    }
                                }, '修改')      
             }
              const delbtn = (h, params) => {  
                  return  h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                       
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                        	this.deleteEducationOrganization(params.row.id);
//                                           this.$router.push({path:'/loans/addLoansPro',
//                                              query: {
//                                                  id:params.row.id,
//                                                  name:params.row.name
//                                              }
//                                          })                   	                           	
                                        }
                                    }
                                }, '删除')      
             }
			return {
				delId:'',
				isDel:false,
                exportTable:[],
				visible:false,
				checkShow:false,
				detail:{},
				name:"",
                selectTime_:'',
				beginTime:'',
				finishTime:'',
				createBy:'',
				pepoList:[],
				data1:[],
            	pageNum:1,
                pageSize:9,
                totalNum:1,
                columns:[
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
                        title: '机构编号',
                        align: 'center',
                        key: 'id',
                        minWidth:100
                    },
                    {
                        title:'机构名称',
                        align:'center',
                        key:'name',
                        minWidth:100
                    },
                    {
                        title: '项目数量',
                        align: 'center',
                        key: 'courseNum',
                        minWidth:100
                    },
                    {
                        title: '投放次数',
                        align: 'center',
                        key: 'putNum',
                        minWidth:100
                    },
                    {
                        title: '创建人员',
                        align: 'center',
                        key: 'createBy',
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
                        	if (params.row.courseNum == 0) {
                        		  return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                                delbtn(h,params)
                            ]) 
                        	}else{
                        		  return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                            ]) 
                        	}
                                  
                        }
                    }
                ]
			}
		},
		methods:{
			deleteEducationOrganization(id){
				this.delId = id
				this.isDel = true
			},
			del(){
					 this.$http({
                        method:'POST',
                        url:this.allUrl.deleteEducationOrganization+"?id="+this.delId,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain'
                        }).then((res)=>{
								if (res.data.errorcode == 0) {
                                 this.$Message.success('删除成功！');
                                 this.isDel = false;
				               	this.get(this.allUrl.findEducationOrganizationPage,{page:1,rows:9}).then((res)=>{
				                  this.totalNum = res.data.total;
				                  this.data1 = res.data.rows
				         
				        	})
								}else{
                                 this.$Message.success(res.data.errordesc);
								}
									
                        })
			},
			//查看图片         
			view(data){
                this.visible = true;
                this.imgName = data;
            },
			  SelectTime(data){
                this.selectTime_ = data
                this.beginTime = data[0]
                this.finishTime = data[1]
            },
            //查询
            getSearch(){
                this.get(this.allUrl.findEducationOrganizationPage,{page:1,rows:9,name:this.name,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                    this.totalNum = res.data.total;
                    this.data1 = res.data.rows
                })
            },
            //清空
            clear(){
            	this.name = ""
            	this.createBy = ""
            	this.beginTime =""
            	this.finishTime =""
            },
            //添加机构
            addInstitution(){
             this.$router.push('/haha_study/addOrganization')
            },
            //导出
            exportData(){
                this.get(this.allUrl.educationOrganizationAll,{name:this.name,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                     this.exportTable = [];
                     console.log(res)
                    this.exportTable = this.exportTable.concat(res.data.data.educationOrganizationVos)
                    this.exportTable.modifyTime = this.changeTime(this.exportTable.modifyTime)
                    this.$refs.selection.exportCsv({
                                filename: '教育机构机构列表',
                                columns:this.columns,
                                data: this.exportTable
                            });
                 })

            },
            //全选
           handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);

            },
             //分页点击
            handlePageSize(value){
               this.pageNum = value;
                this.get(this.allUrl.findEducationOrganizationPage,{page:value,rows:9,name:this.name,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                    this.totalNum = res.data.total;
                    this.data1 = res.data.rows
                })
            },
		},
		mounted(){
			
        	this.get(this.allUrl.findEducationOrganizationPage,{page:1,rows:9}).then((res)=>{
        		console.log(res)
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
         
        	})

        
			            //获取操作人员
            this.get(this.allUrl.selectAllWorkName).then((res)=>{
            	console.log(res)
            	this.pepoList = res.data.data
            })
		}
	}
</script>

<style scoped lang="scss">
.home{
	 width:98%;height: 100%;
        /*min-height: 864px;*/
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
       
    
</style>