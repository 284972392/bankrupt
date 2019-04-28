<template>
	<div class="home"> 
	    <div class="title">
	    	<p>投放列表</p>
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
            <Input v-model="courseName" placeholder="搜索视屏项目名称" style="width: 26%;" size="large"></Input>
            <Input v-model="organizationName" placeholder="机构名称" style="width: 26%;" size="large"></Input>
             
             <Select placeholder="创建人员" v-model="createBy" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in pepoList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>

            </div>
            <div>
            <Input v-model="priceDown" placeholder="输入视屏价格下限" style="width: 16%;" size="large"></Input>-
            <Input v-model="priceUp" placeholder="输入视屏价格上限" style="width: 16%;" size="large"></Input>
             <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择操作时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            
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
        v-model="checkShow"
        width="600"
        >
         <p slot="header" style="color:#f60;text-align:center">
            <span>查看</span>
        </p>
       <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="投放编号">
     	  	 	 	{{detail.id}}
      		  </FormItem> 
                <FormItem label="视屏价格">
     	  	 	 	{{detail.price}}
      		  </FormItem> 
                <FormItem label="消耗数量">
     	  	 	 	{{detail.putNum}}
      		  </FormItem> 
                <FormItem label="投放时间">
     	  	 	 	{{detail.putStartTime}}
      		  </FormItem> 
      		     <FormItem label="操作人员">
     	  	 	 	{{detail.createBy}}
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="视频主标题">
                     {{detail.titleOne}}
      		  </FormItem> 
            <FormItem label="投放数量">
     	  	 	 	{{detail.putAmount}}
      		  </FormItem> 
      		    <FormItem label="结算单价">
     	  	 	 	{{detail.buyAmount}}
      		  </FormItem> 
                <FormItem label="状态">
     	  	 	 	{{detail.status}}
				
      		  </FormItem> 
      		   <FormItem label="操作时间">
     	  	 	 	{{detail.modifyTime}}
				
      		  </FormItem> 
       	 </Col>
       </Row>
      </Form>
    </Modal>
    <!--修改-->
        <Modal
        v-model="checkShow2"
        width="600"
        >
         <p slot="header" style="color:#f60;text-align:center">
            <span>修改投放</span>
        </p>
       <Form :model = "allForm" :label-width="100"> 	

      		  <FormItem label="视屏主标题">
					 <Input v-model="allForm.titleOne" readonly="readonly" placeholder="请输入视屏副标题，20个字以内，必填"></Input>
      		  </FormItem> 
                <FormItem label="视屏价格">
					 <InputNumber style="width:90%" v-model="allForm.price" placeholder="请输入视屏价格">
					 	
					 </InputNumber>元
      		  </FormItem> 
                <FormItem label="投放数量">
     	  	 	 	<InputNumber style="width:90%" v-model="allForm.putAmount" placeholder="请输入投放数量">
					 	
					 </InputNumber>个
      		  </FormItem> 
                <FormItem label="结算方式">
     	  	 	  <Select  placeholder="请选择结算方式" v-model="allForm.paymentMethod" style="width:90%;" size="large">
             		   <Option v-for="item in jiesuanList" :value="item.label" :key="item.value">{{ item.label }}</Option>
          		  </Select>
      		  </FormItem> 
      		     <FormItem label="结算单价">
     	  	 	 	<InputNumber style="width:90%" v-model="allForm.closePrice" placeholder="请输入结算单价">
					 	
					 </InputNumber>个
      		  </FormItem> 


       	 	 <FormItem label="投放日期">
             <DatePicker type="datetimerange" :value='selectTime2_' placeholder="请选择操作时间段" @on-change='SelectTime2' style="width: 300px;font-size:18px;"></DatePicker>
                   
      		  </FormItem> 


      </Form>
     	<div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="ok1">添加</Button>
        </div>
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
        <Modal
        v-model="isUp"
        title="信息"
        width="300">
        <p style="text-align: center;">确定上架</p>
		<div slot="footer">
            <Button type="warning" size="large" long  @click="sureUp">确认</Button>
        </div>
   		 </Modal>
   		   <Modal
        v-model="isDown"
        title="信息"
        width="300">
        <p style="text-align: center;">确定下架</p>
		<div slot="footer">
            <Button type="warning" size="large" long  @click="sureDown">确认</Button>
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
		name:'putIn',
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
			   const up= (h, params) => {
                  return  h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                        shape: "circle",
                                       
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                            this.upId = params.row.id                   	
                                        	
                                        	this.isUp = true
//                                          this.checkShow =true

                                        }
                                    }
                                }, '上架')      
             }
   			   const down= (h, params) => {
                  return  h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                        shape: "circle",
                                       
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {
                                            this.downId = params.row.id                   	
                                        	this.isDown = true
                                        	
//                                          this.checkShow =true
//                                          this.detail = params.row                   	
                                        }
                                    }
                                }, '下架')      
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
                                        	console.log(params.row)
                                        	this.selectTime2_ = []
                                        	 this.allForm = params.row 

                                        	 this.selectTime2_.push(this.allForm.putStartTime+' 00:00:00')
                                        	 this.selectTime2_.push(this.allForm.putEndTime+' 00:00:00')
                                        	this.checkShow2 = true                 	                           	
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
                                        	this.deletePut(params.row.id)
                                        	
//                                      	
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
				visible:false,
				checkShow:false,
				checkShow2:false,
				isDel:false,
				isDown:false,
				isUp:false,
				detail:{},
				merName:"",
                selectTime_:'',
                allForm:{},
				beginTime:'',
				createBy:'',
				selectTime2_:'',
				courseName:'',
				priceDown:'',
				priceUp:'',
				organizationName:'',
				jiesuanList:[
					{
						value:1,
						label:"CPA"
					},
					{
						value:2,
						label:"CPC"
					},
				],
				finishTime:'',
				operateBy:'',
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
                        title: '投放编号',
                        align: 'center',
                        key: 'id',
                        minWidth:100
                    },
                    {
                        title:'视屏项目名称',
                        align:'center',
                        key:'titleOne',
                        minWidth:100
                    },
                    {
                        title: '教育机构名称',
                        align: 'center',
                        key: 'organizationName',
                        minWidth:100
                    },
                    {
                        title: '视屏价格(元)',
                        align: 'center',
                        key: 'price',
                        minWidth:100
                    },
                    {
                        title: '投放数量',
                        align: 'center',
                        key: 'putAmount',
                        minWidth:100
                    },
                     {
                        title: '消耗数量',
                        align: 'center',
                        key: 'putNum',
                        minWidth:150
                    },
                    {
                        title: '结算单价(元)',
                        align: 'center',
                        key: 'closePrice',
                        minWidth:150
                    }, 
                    {
                        title: '投放日期',
                        align: 'center',
                        key: 'putStartTime',
                        minWidth:150
                    }, 
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        minWidth:150
                    }, 
                    {
                        title: '操作人员',
                        align: 'center',
                        key: 'createBy',
                        minWidth:150
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
                        	if (params.row.status == "待上架") {
                        		return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                                delbtn(h,params),
                                up(h,params),

                            ])  
                        	}else if(params.row.status == "已上架"){
                        		return h('div', [
                                down(h,params),
                                checkbtn(h,params)
                                
                            ])  

                        	}else{
                        		return h('div', [
                                checkbtn(h,params),

                            ])  
                        	}
                                   
                        }
                    }
                ]
			}
		},
		methods:{
			//删除投放
			deletePut(id){
				this.delId = id
				this.isDel = true
			},
				del(){
					 this.$http({
                        method:'POST',
                        url:this.allUrl.delPut+"?id="+this.delId,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain'
                        }).then((res)=>{
                        	console.log(res)
								if (res.data.errorcode == 0) {
                                 this.$Message.success('删除成功！');
                                 this.isDel = false;
					        	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"2"}).then((res)=>{
										console.log(res)
					                  this.totalNum = res.data.total;
					                  this.data1 = res.data.rows
					                  let that = this;
					                  this.data1.forEach(function(i,index){
					                  	 i.status = that.changeStatus(i.status)
					                  })
					                  
					         
					        	})
								}else{
                                 this.$Message.success(res.data.errordesc);
								}
									
                        })
			},
			sureDown(){
				 this.$http({
                        method:'GET',
                        url:this.allUrl.updatePutState+"?id="+this.downId+"&&status="+3,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain'
                        }).then((res)=>{
                        	console.log(res)
                        	if (res.data.errorcode == 0) {
                                 this.$Message.success("下架成功");
                 	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"2"}).then((res)=>{
					console.log(res)
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
                  let that = this;
                  this.data1.forEach(function(i,index){
                  	 i.status = that.changeStatus(i.status)
                  })
                  
         
        	})
                        		this.isDown = false
                        	}else{
                                 this.$Message.success(res.data.errordesc);
                        	}
                        })
			},
			sureUp(){
				 this.$http({
                        method:'GET',
                        url:this.allUrl.updatePutState+"?id="+this.upId+"&&status="+2,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain'
                        }).then((res)=>{
                        	if (res.data.errorcode == 0) {
                                 this.$Message.success("上架成功");
	        	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"2"}).then((res)=>{
					console.log(res)
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
                  let that = this;
                  this.data1.forEach(function(i,index){
                  	 i.status = that.changeStatus(i.status)
                  })
                  
         
        	})
                        		this.isUp = false
                        	}else{
                                 this.$Message.success(res.data.errordesc);
                        	}
                        })
			
				
			},
			SelectTime2(data){
				console.log(data)
                this.selectTime2_ = data
                this.allForm.putStartTime = data[0]
                this.allForm.putEndTime = data[1]
			},
            changeStatus(data){
                let result = '';
                if(data==0){
                    result = '待投放'
                }else if(data==1){
                    result = '待上架'
                }else if(data==2){
                    result = '已上架'
                }else if(data==3){
                    result = '已下架'
                }
                return result;
            },
			ok1(){
            	console.log(this.allForm)
            	if (this.allForm.closePrice == null||this.allForm.price == null||this.allForm.putAmount == null||this.allForm.paymentMethod == ""||this.selectTime2_ == "") {
      		    	this.$Message.warning('请填写完整信息');
            		this.checkShow2 = true
            	}else{
            		//添加了投放方式就报400了
                	 this.allForm.status = null;
            		this.$http({
                                method:'POST',
                                url: this.allUrl.updatePut,
                                headers: {
                                    "content-type": "application/json"
                                },
                                responseType:'text/plain',
                                data:this.allForm
                            }).then((res)=>{
                            	console.log(res)
                            	if (res.data.errorcode == 0) {
      		    				this.$Message.warning('修改投放成功，在投放列表查看');
                            		
                            		this.checkShow2 = false
	        	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"2"}).then((res)=>{
					console.log(res)
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
                  let that = this;
                  this.data1.forEach(function(i,index){
                  	 i.status = that.changeStatus(i.status)
                  })
                  
         
        	})
                            	}else{
                            		this.checkShow2 = true
                            		
                            	}
                            })
            	}
            	   
            
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
        	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"2",organizationName:this.organizationName,courseName:this.courseName,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime,priceUp:this.priceUp,priceDown:this.priceDown}).then((res)=>{
					console.log(res)
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
	                  let that = this;
                  this.data1.forEach(function(i,index){
                  	 i.status = that.changeStatus(i.status)
                  })
        	})
            },
            //清空
            clear(){
            	this.organizationName = ""
            	this.courseName = ""
            	this.createBy = ""
            	this.beginTime = ""
            	this.finishTime =""
            	this.priceUp = ""
            	this.priceDown = ""
            },
            //导出
            exportData(){
                this.get(this.allUrl.educationCourseFindAll,{type:"2",organizationName:this.organizationName,courseName:this.courseName,typeName:this.typeName,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                     console.log(res)
                     this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.educationCourses)
                    this.$refs.selection.exportCsv({
                                filename: '投放项目导出',
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
                this.get(this.allUrl.findEducationProjectPage,{page:value,rows:9,type:"2",organizationName:this.organizationName,courseName:this.courseName,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime,priceUp:this.priceUp,priceDown:this.priceDown}).then((res)=>{
                    this.totalNum = res.data.total;
                    this.data1 = res.data.rows
                                      let that = this;
                  this.data1.forEach(function(i,index){
                  	 i.status = that.changeStatus(i.status)
                  })
                })
            },
		},
		mounted(){
			
			
        	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"2"}).then((res)=>{
					console.log(res)
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
                  let that = this;
                  this.data1.forEach(function(i,index){
                  	 i.status = that.changeStatus(i.status)
                  })
                  
         
        	})
//			            获取操作人员
            this.get(this.allUrl.selectAllWorkName).then((res)=>{
            	this.pepoList = res.data.data
            });
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
       
    
</style>