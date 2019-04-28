<template>
	<div class="home"> 
	    <div class="title">
	    	<p>购买记录</p>
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
            	
            <!--<Input v-model="merName" placeholder="搜索视屏项目名称/机构名称" style="width: 26%;" size="large"></Input>-->
             <Select placeholder="选择视屏分类" v-model="typeName" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in typeList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
			<Select placeholder="选择哈哈学习对接人" v-model="person" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in pepoList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <div>
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
       <Form :label-width="100"> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="购买编号">
     	  	 	 	{{detail.id}}
      		  </FormItem> 
                <FormItem label="视屏项目名称">
     	  	 	 	{{detail.courseName}}
      		  </FormItem> 
                <FormItem label="视频分类">
     	  	 	 	{{detail.typeName}}
      		  </FormItem> 
                <FormItem label="结算单价(元)">
     	  	 	 	{{detail.closePrice}}
      		  </FormItem> 
      		     <FormItem label="购买时间">
     	  	 	 	{{detail.buyTime}}
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="购买设备">
                     {{detail.deviceSign}}
      		  </FormItem> 
            <FormItem label="机构名称">
     	  	 	 	{{detail.organizationName}}
      		  </FormItem> 
      		    <FormItem label="视屏价格(元)">
     	  	 	 	{{detail.price}}
      		  </FormItem> 
                <FormItem label="哈哈学习对接人">
     	  	 	 	{{detail.person}}
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
		name:'buyRecord',
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

			return {
				visible:false,
				checkShow:false,
				detail:{},
				person:null,
				merName:null,
				courseName:null,
				organizationName:null,
                selectTime_:'',
                typeName:null,
                beginTime:null,
                finishTime:null,
				startTime_:null,
				endTime_:null,
				typeList:[],
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
                        title: '购买编号',
                        align: 'center',
                        key: 'id',
                        minWidth:100
                    },
                     {
                        title: '购买设备',
                        align: 'center',
                        key: 'deviceSign',
                        minWidth:100
                    },
                    {
                        title:'视屏项目名称',
                        align:'center',
                        key:'courseName',
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
                        title: '视屏价格(元)',
                        align: 'center',
                        key: 'price',
                        minWidth:100
                    },
                     {
                        title: '结算单价(元)',
                        align: 'center',
                        key: 'closePrice',
                        minWidth:150
                    },
                    {
                        title: '哈哈学习对接人',
                        align: 'center',
                        key: 'person',
                        minWidth:150
                    }, 
                    {
                        title: '购买时间',
                        align: 'center',
                        key: 'buyTime',
                        minWidth:150
                    }, 
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 120,
                        align: 'center',
                        render: (h, params) => { 
                            return h('div', [
                                checkbtn(h,params)
                            ])         
                        }
                    }
                ]
			}
		},
		methods:{
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
            				
        	this.get(this.allUrl.findEducationRecordPage,{page:1,rows:9,organizationName:this.organizationName,courseName:this.courseName,typeName:this.typeName,person:this.person,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
            	console.log(res)
                 this.totalNum = res.data.total;
                  this.data1 = res.data.rows
        	})
            },
            //清空
            clear(){
            	this.selectTime_ = null
            	this.typeName = null
            	this.organizationName = null
            	this.courseName = null
            	this.person = null
            	this.beginTime = null
            	this.finishTime =null
            
            },

            //导出
            exportData(){
                this.get(this.allUrl.findAllEducationRecord,{organizationName:this.organizationName,courseName:this.courseName,typeName:this.typeName,person:this.person,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                     console.log(res)
                     this.exportTable = [];
                    this.exportTable = this.exportTable.concat(res.data.data.educationRecordVos)
                    this.$refs.selection.exportCsv({
                                filename: '购买记录',
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
                this.get(this.allUrl.findEducationRecordPage,{page:value,rows:9,organizationName:this.organizationName,courseName:this.courseName,typeName:this.typeName,person:this.person,beginTime:this.beginTime,finishTime:this.finishTime}).then((res)=>{
                    this.totalNum = res.data.total;
                    this.data1 = res.data.rows
                })
            },
		},
		mounted(){
        	this.get(this.allUrl.findEducationRecordPage,{page:1,rows:9}).then((res)=>{
        		console.log(res)
                 this.totalNum = res.data.total;
                  this.data1 = res.data.rows
         
        	})

        
//			            获取操作人员
            this.get(this.allUrl.selectAllWorkName).then((res)=>{

            	this.pepoList = res.data.data
            });
            //视屏分类
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