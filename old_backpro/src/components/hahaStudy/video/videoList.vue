<template>
	<div class="home"> 
	    <div class="title">
	    	<p>视屏项目列表</p>
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

             <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择操作时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            <Select placeholder="创建人员" v-model="createBy" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in pepoList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
      		<div>
            <Input v-model="organizationName" placeholder="机构名称" style="width: 26%;" size="large"></Input>
      			
      		
            <Select placeholder="选择视屏分类" v-model="typeName" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in typeList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
      		</div>
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="getSearch">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                <Button type="primary" ghost @click="addInstitution" style="margin-left:10px;">添加视频项目</Button>  
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
            <span>添加投放</span>
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
					 	
					 </InputNumber>元
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
        <Modal v-model="modal3">
       	 <p>该项目已经上架，暂时不允许添加新的投放任务！</p>
    	</Modal>
    	<Modal v-model="modal4">
       	 <p>该项目已经添加投放，请在投放列表中管理！</p>
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
		name:'videoList',
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
                                        	params = JSON.stringify(params.row)
                                        	localStorage.setItem('content',params)
                                        	this.$router.push({
                                        		path:'/haha_study/addvideoPro',
                                        		query:{type:'look'}
                                        	})
                                        }
                                    }
                                }, '查看')      
             }
			   const addPut= (h, params) => {
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
                                        	console.log(params.row.status)
                                        	if (params.row.status == 2) {
                                        		this.modal3 = true
                                        	}else if (params.row.status == 1) {
                                        		this.modal4 = true
                                        	}else{
                                        		this.allForm.putNum = params.row.putNum
                                        	this.checkShow =true
                                            this.allForm.titleOne =  params.row.titleOne
                                            this.allForm.id =  params.row.id
                                        	}
                                          
//                                          this.detail = params.row                   	
                                        }
                                    }
                                }, '添加投放')      
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
                                        	params = JSON.stringify(params.row)
                                        	localStorage.setItem('content',params)
                                        	this.$router.push({
                                        		path:'/haha_study/addvideoPro',
                                        		query:{type:'change'}
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
                                        	this.deleteVideo(params.row.id)
                                        }
                                    }
                                }, '删除')      
             }
			return {
				allForm:{
					price:null,
					putAmount:null,
					buyAmount:null,
					
				},
				modal3:false,
				modal4:false,
				visible:false,
				exportTable:[],
				isDel:false,
				checkShow:false,
				detail:{},
				courseName:'',
				typeName:'',
				organizationName:"",
                selectTime_:'',
                selectTime2_:'',
				beginTime:'',
				finishTime:'',
				createBy:'',
				pepoList:[],
				jiesuanList:[
					{
						value:0,
						label:"CPA"
					},
					{
						value:1,
						label:"CPC"
					},
				],
				typeList:[],
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
                        title: '视屏项目编号',
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
                        title: '机构名称',
                        align: 'center',
                        key: 'organizationName',
                        minWidth:100
                    },
                    {
                        title: '视屏分类',
                        align: 'center',
                        key: 'typeName',
                        minWidth:100
                    },
                    {
                        title: '投放次数',
                        align: 'center',
                        key: 'putNum',
                        minWidth:100
                    },
                     {
                        title: '哈哈学习对接人',
                        align: 'center',
                        key: 'hahaPerson',
                        minWidth:150
                    },
                    {
                        title: '创建人员',
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
                        	if (params.row.putNum == 0) {
                        		 return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                                delbtn(h,params),
                                addPut(h,params)
                           	 ]) 
                        	}else{
                        		 return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                                addPut(h,params)
                           	 ]) 
                        	}
                        	
                        	
                                   
                        }
                    }
                ]
			}
		},
		methods:{
			deleteVideo(id){
				this.delId = id
				this.isDel = true
			},
			del(){
					 this.$http({
                        method:'GET',
                        url:this.allUrl.delProject+"?id="+this.delId,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain'
                        }).then((res)=>{
                        	console.log(res)
								if (res.data.errorcode == 0) {
                                 this.$Message.success('删除成功！');
                                 this.isDel = false;
				               	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"1"}).then((res)=>{
				
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
            SelectTime2(data){
                this.selectTime2_ = data
                this.allForm.putStartTime = data[0]
                this.allForm.putEndTime = data[1]
            
            },
            //查询
            getSearch(){
            this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"1",organizationName:this.organizationName,courseName:this.courseName,typeName:this.typeName,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
         
        	})
            },
            //清空
            clear(){
            	this.organizationName = ""
            	this.courseName = ""
            	this.typeName = ""
            	this.createBy = ""
            	this.selectTime_ = ""
            	this.beginTime = ""
            	this.finishTime = ""
            },
            //添加机构
            addInstitution(){
            	localStorage.removeItem('content')
            	this.$router.push({
            		path:'/haha_study/addvideoPro',
            		query:{type:'add'}
            	})
                                        
            },
            //添加投放
            ok1(){

            	console.log(this.allForm)
            	if (this.allForm.closePrice == null||this.allForm.price == null||this.allForm.putAmount == null||this.allForm.paymentMethod == ""||this.selectTime2_ == "") {
      		    	this.$Message.warning('请填写完整信息');
            		
            		this.checkShow = true
            	}else{
            		//添加了投放方式就报400了
            		this.$http({
                                method:'POST',
                                url: this.allUrl.addPut,
                                headers: {
                                    "content-type": "application/json"
                                },
                                responseType:'text/plain',
                                data:this.allForm
                            }).then((res)=>{
                            	if (res.data.errorcode == 0) {
      		    				this.$Message.warning('添加投放成功，在投放列表查看');
                            		
                            		this.checkShow = false
                            	}
                            })
            	}
            	   
            },
            //导出
            exportData(){
                this.get(this.allUrl.educationCourseFindAll,{type:"1",organizationName:this.organizationName,courseName:this.courseName,typeName:this.typeName,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                     this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.educationCourses)
//                  this.exportTable.modifyTime = this.changeTime(this.exportTable.modifyTime)
                    this.$refs.selection.exportCsv({
                                filename: '视屏项目导出',
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
                this.get(this.allUrl.findEducationProjectPage,{page:value,rows:9,type:"1",organizationName:this.organizationName,courseName:this.courseName,typeName:this.typeName,createBy:this.createBy,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                    this.totalNum = res.data.total;
                    this.data1 = res.data.rows
                })
            },
		},
		mounted(){
			
        	this.get(this.allUrl.findEducationProjectPage,{page:1,rows:9,type:"1"}).then((res)=>{
					console.log(res)
                  this.totalNum = res.data.total;
                  this.data1 = res.data.rows
         
        	})
			
        
//			            获取操作人员
            this.get(this.allUrl.selectAllWorkName).then((res)=>{
            	this.pepoList = res.data.data
            });
            this.get(this.allUrl.findAllTypeName).then((res)=>{
            	this.typeList = res.data.data
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
       
    
</style>