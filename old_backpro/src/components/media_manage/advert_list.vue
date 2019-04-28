<template>
    <div class="home">
        <div class="title">广告列表</div>
       <div class="search">
           
            <Input v-model="advertName" placeholder="搜索广告名称/商家名称" style="width: 26%;" size="large"></Input>
            <Input v-model="advertPositionName" placeholder="广告位置名称" style="width: 26%;" size="large"></Input>
            <Select placeholder="创建人员" v-model="operateBy" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in pepoList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="广告状态" v-model="status" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
	    <div style="font-size: 15px;">
	    	 素材有效开始时间：
            <DatePicker  type="date" :value="minValidStartTime" @on-change="minValidStartTime_" placeholder="Select date" style="width: 200px"></DatePicker> 至
	      	<DatePicker type="date" :value="maxValidStartTime" @on-change="maxValidStartTime_" placeholder="Select date" style="width: 200px"></DatePicker>
	    	； 素材有效结束时间：
            <DatePicker  type="date" :value="minValidEndTime" @on-change="minValidEndTime_" placeholder="Select date" style="width: 200px"></DatePicker> 至
	      	<DatePicker type="date" :value="maxValidEndTime" @on-change="maxValidEndTime_" placeholder="Select date" style="width: 200px"></DatePicker>
	    
	    </div>
          <div style="font-size: 15px;">
            	 投放开始时间：
            <DatePicker  type="date" :value="minPutStartTime" @on-change="minPutStartTime_" placeholder="Select date" style="width: 200px"></DatePicker> 至
	      	<DatePicker type="date" :value="maxPutStartTime" @on-change="maxPutStartTime_" placeholder="Select date" style="width: 200px"></DatePicker>
	    	

          	  ；投放结束时间
	      	<DatePicker type="date" :value="minPutEndTime" @on-change="minPutEndTime_" placeholder="Select date" style="width: 200px"></DatePicker> 至
	      	<DatePicker type="date" :value="maxPutEndTime" @on-change="maxPutEndTime_" placeholder="Select date" style="width: 200px"></DatePicker>
        	
        	
           </div>
           <div>
           		 操作时间段：
            <DatePicker  type="date" :value="beginTime" @on-change="beginTime_" placeholder="Select date" style="width: 200px"></DatePicker> 至
	      	<DatePicker type="date" :value="finishTime" @on-change="finishTime_" placeholder="Select date" style="width: 200px"></DatePicker>
	    	<ButtonGroup size="large">
                <Button type="primary" ghost @click="findCard">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                <!--<Button type="primary" ghost @click="addCard" style="margin-left:10px;">添加</Button>-->
               
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

    <!--引入查看对话弹框-->
        <Modal
        title="查看广告"
        v-model="modal1"
        width="600"
        class-name="addRoleBox">
        <Form> 	
       <Row>
       	 <Col>     
      		  <FormItem label="广告名称">
                    <Input readonly v-model="addNewMedia.advertName"  placeholder="卡券名称" />
      		  </FormItem> 
              <FormItem label="商户名称">
                    <Input readonly v-model="addNewMedia.tenantName"  placeholder="卡券类型" />
      		  </FormItem>
                <FormItem label="广告分类">
                    <Select disabled v-model="addNewMedia.advertClass" size="large">
                		<Option v-for="item in advertClassList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem> 
      		  <FormItem label="优先级">

                    <InputNumber readonly v-model="addNewMedia.priority" placeholder="数量" :precision="0" :min="0" style="width:500px;"></InputNumber>
      		  </FormItem>
                <FormItem label="素材大标题">
                    <Input readonly v-model="addNewMedia.headline"  placeholder="素材小标题" />
      		  </FormItem>
      		  <FormItem label="素材小标题">
                    <Input readonly v-model="addNewMedia.heading"  placeholder="素材小标题" />
      		  </FormItem>   
                <FormItem label="素材有效期"> 
                            <Row>
                                <Col span="10">
                   					 <DatePicker readonly type="date" placeholder="请选择开始日期" :options="noToday" :value="addNewMedia.validStartTime"></DatePicker>
                                </Col>
                                <Col span="7" offset="1">
                   					 <DatePicker readonly type="date" placeholder="请选择结束日期" :options="noToday" :value="addNewMedia.validEndTime"></DatePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>   
                <FormItem label="投放日期"> 
                            <Row>
                                <Col span="10">
                   					 <DatePicker readonly type="date" placeholder="请选择开始日期" :options="noToday" :value="addNewMedia.putStartTime" ></DatePicker>
                                </Col>
                              	  <Col span="7" offset="1">
                   					 <DatePicker readonly type="date" placeholder="请选择结束日期" :options="noToday" :value="addNewMedia.putEndTime"></DatePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>       
      		  <FormItem label="素材类型">
                    <Select disabled v-model="addNewMedia.materialType" size="large">
                		<Option v-for="item in materialList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>
                <FormItem label="素材链接">
                      <Input readonly v-model="addNewMedia.link"  placeholder="素材链接" />
                </FormItem>    
                <!--<FormItem label="上传图片">
                       <addpic @update="detailPic" @remove="removeDetail" :size='1'></addpic>             
                </FormItem> -->
                <FormItem label="上传图片">
                    <img :src="addNewMedia.img" alt="" style="height:60px;60px;cursor:pointer;" @click="imgView(addNewMedia.img)">
                </FormItem>
            </Col>
       </Row>
      </Form>    
    </Modal>	
      <!--引入添加对话弹框-->
        <!--<Modal
        v-model="addmodal"
        width="600"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>添加广告位</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      	 		    
      		  <FormItem label="页面">
                    <Select v-model="cardDetail.pageTable" size="large">
                		<Option v-for="item in pageList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem> 
              <FormItem label="页面位置">
                     <Select v-model="cardDetail.position" size="large">
                		<Option v-for="item in positionList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>
                <FormItem label="广告数量">
                    <InputNumber v-model="cardDetail.amount" placeholder="数量" :precision="0" :min="0" style="width:150px;"></InputNumber>
                	
      		  </FormItem> 
                <FormItem label="广告位结构">
                    <Input v-model="cardDetail.structure"  placeholder="广告位结构" />
      		  </FormItem>
      		  <FormItem label="广告位描述">
                    <Input v-model="cardDetail.alt"  placeholder="广告位描述" />
      		  </FormItem>   
      		  <FormItem label="展现形式">
                    <Select v-model="cardDetail.showMode" size="large">
                		<Option v-for="item in showModeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>  
                
                 
            </Col>
       </Row>
      </Form>    
             <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="addCardOk">添加</Button>
        </div>
    </Modal>	-->

     <!--引入修改对话弹框-->
        <Modal
        v-model="changemodal"
        width="600"
        @on-cancel="cancelM"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>修改广告</span>
        </p>
        <Form> 	
      <Row>
       	 <Col>     
      		  <FormItem label="广告名称">
                    <Input v-model="changeMedia.advertName"  placeholder="卡券名称" />
      		  </FormItem> 
              <FormItem label="商户名称">
                    <Input v-model="changeMedia.tenantName"  placeholder="卡券类型" />
      		  </FormItem>
                <FormItem label="广告分类">
                    <Select v-model="changeMedia.advertClass" size="large">
                		<Option v-for="item in advertClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem> 
      		  <FormItem label="优先级">

                    <InputNumber v-model="changeMedia.priority" placeholder="数量" :precision="0" :min="0" style="width:500px;"></InputNumber>
      		  </FormItem>
                <FormItem label="素材大标题">
                    <Input v-model="changeMedia.headline"  placeholder="素材小标题" />
      		  </FormItem>
      		  <FormItem label="素材小标题">
                    <Input v-model="changeMedia.heading"  placeholder="素材小标题" />
      		  </FormItem>   
                <FormItem label="素材有效期"> 
                            <Row>
                                <Col span="10">
                   					 <DatePicker type="date" placeholder="请选择开始日期" :options="noToday" :value="changeMedia.validStartTime" @on-change="ChangeStartTime_change"></DatePicker>
                                </Col>
                                <Col span="7" offset="1">
                   					 <DatePicker type="date" placeholder="请选择结束日期" :options="noToday" :value="changeMedia.validEndTime" @on-change="ChangeEndTime_change"></DatePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>   
                <FormItem label="投放日期"> 
                            <Row>
                                <Col span="10">
                   					 <DatePicker type="date" placeholder="请选择开始日期" :options="noToday" :value="changeMedia.putStartTime" @on-change="ChangeStartTime2_change"></DatePicker>
                                </Col>
                              	  <Col span="7" offset="1">
                   					 <DatePicker type="date" placeholder="请选择结束日期" :options="noToday" :value="changeMedia.putEndTime" @on-change="ChangeEndTime2_change"></DatePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>       
      		  <FormItem label="素材类型">
                    <Select v-model="changeMedia.materialType" size="large">
                		<Option v-for="item in materialList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>
                <FormItem label="素材链接">
                      <Input  v-model="changeMedia.link"  placeholder="素材链接" />
                </FormItem>  
                <lazy :time='100' v-if="changemodal">
	                <FormItem label="上传图片">
	                       <addpic @update="detailPic" @remove="removeDetail" :size='1' :defaultPic="changeMedia.img"></addpic>             
	                </FormItem> 
              </lazy>       
                
            </Col>
       </Row>
      </Form>    
             <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="changePositionOk">保存</Button>
        </div>
    </Modal>	

     <Modal
        v-model="modal2"
        title="提示"
        @on-ok="putConfirm"
        >
        <p>确认上架？</p>
    </Modal>
    <Modal
        v-model="modal3"
        title="提示"
        @on-ok="outConfirm"
        >
        <p>确认下架？</p>
    </Modal>
      <!--<Modal
        v-model="modal4"
        title="提示"
        @on-ok="delectConfirm"
        >
        <p>确认删除？</p>
    </Modal>-->

     <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>

            <foot></foot>
    </div>
    
</template>


<script>
import lazy from "@/common/plLazy";
  import addpic from '@/common/update'
    import foot from '@/components/footer.vue'
    export default {
        components:{
            foot,
            addpic,
            lazy
        },
        name:'',
        data(){
            const checkbtn = (h, params) => { 
                
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                           this.modal1 = true  
                                           this.addNewMedia = params.row    

                                        }
                                    }
                                }, '查看')
                   
             };
               const changebtn = (h, params) => { 
                if(params.row.status=='待上架'||params.row.status=='已下架'){
                       return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	console.log(params.row.advertClass)
                                            this.changeButton(params)           
                                        }
                                    }
                                }, '修改')
                }
                 
                   
             };
              const putbtn = (h, params) => { 
               if(params.row.status=='待上架'||params.row.status=='已下架'){
                    return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.Media_ = params.row     
                                            this.modal2 = true           	                           	
                                        }
                                    }
                                }, '上架')
                   }
             };
              const outbtn = (h, params) => { 
                if(params.row.status=='已上架'){
                    return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.Media_ = params.row     
                                            this.modal3 = true                   	                           	
                                        }
                                    }
                                }, '下架')
                }
             };

              

            return{
            	addNewMedia:{},
            	changeMedia:{},
            	minAmount:null,
            	maxAmount:null,
            	//          	卡券类型列表
            	cardTypeList:[
            		 {
                        value: '优惠券',
                        label: '优惠券'
                    },
                    {
                        value: '流量卡',
                        label: '流量卡'
                    }
            	],
            	//展现形式
            	showModeList:[
            		 {
                        value:  0,
                        label: '静态页'
                    },
                    {
                        value: 1,
                        label: '轮播图'
                    }
            	],
            	//搜索状态
            	model3:'',
            		statusList:[
            		 {
                        value: 0,
                        label: '已下架'
                    },
                    {
                        value: 1,
                        label: '已上架'
                    },
                    {
                        value: 2,
                        label: '待上架'
                    	
                    }
            	],
            	//素材类型
            	materialList:[
            		 {
                        value: 0,
                        label: '静态图片'
                    },
                    {
                        value: 1,
                        label: '动态图片'
                    }
            	],
            	//页面位置
            	positionList:[
            		 {
                        value: 0,
                        label: 'top'
                    },
                    {
                        value: 1,
                        label: 'center'
                    },
                    {
                        value: 2,
                        label: 'bottom'
                    	
                    }
            	],
            	//页面位置
            	pageList:[
            		 {
                        value: 0,
                        label: '去赚钱'
                    },
                    {
                        value: 1,
                        label: '找优惠'
                    },
                    {
                        value: 2,
                        label: '购划算'
                    	
                    }
            	],
            	//权重排序搜索
            	model4:"false",
            	//广告类型
            	advertClassList:[
            		 {
                        value: 1,
                        label: '任务'
                    },
                    {
                        value: 2,
                        label: '卡券'
                    },
                    {
                        value: 3,
                        label: '商品'
                    },
                    {
                        value: 4,
                        label: '内部活动'
                    }
            	],
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

            	endTime_2:"",
                visible:false,
                imgName:'',
                changePosition:{
                     remark:'',type:'',id:'',name:'',title:'',putInTime:"",createTime:'',endTime:'',link:'',bannerUrl:'',recordUrl:'',count:0,weight:1,url:''
                },
                 noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                week:'',
                hour:'',
                 weekSelect: [
                    {
                        value: '周一',
                        label: '周一'
                    },
                    {
                        value: '周二',
                        label: '周二'
                    },
                    {
                        value: '周三',
                        label: '周三'
                    },
                    {
                        value: '周四',
                        label: '周四'
                    },
                    {
                        value: '周五',
                        label: '周五'
                    },
                    {
                        value: '周六',
                        label: '周六'
										},
										{
                        value: '周天',
                        label: '周天'
                    }
                ],
                cardDetail:{
                    remark:'',type:'',id:0,name:'',title:'',putInTime:"",createTime:'',endTime:'',link:'',bannerUrl:'',recordUrl:'',count:0,weight:1,url:''
                },
                Media_:{},
                advertName:'',
                operateBy:'',
                advertPositionName:'',
                status:null,
                minValidStartTime:'',
                maxValidStartTime:'',
                minValidEndTime:'',
                maxValidEndTime:'',
                minPutStartTime:'',
                maxPutStartTime:'',
                minPutEndTime:'',
                maxPutEndTime:'',
                beginTime:"",
                finishTime:'',
                pepoList:[],
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                addmodal:false,
                changemodal:false,
                totalNum:0,
                pageNum:1,
                med_PosName:'',
                searchInfo:'',
                pageSize:9,
                 columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '广告编号',
                        width: 100,
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '广告名称',
                        width: 100,
                        align: 'center',
                        key: 'advertName'
                    },
                      {
                        title: '商户名称',
                        align: 'center',
                        width: 100,
                        key: 'tenantName'
                    },
                    {
                        title: '广告位名称',
                        align: 'center',
                        width: 100,
                        key: 'advertPositionName'
                    },
                     {
                        title: '优先级',
                        align: 'center',
                        width: 100,
                        key: 'priority'
                    },
                     {
                        title: '展现形式',
                        align: 'center',
                        width: 100,
                        key: 'showMode'
                    },
                    {
                        title: '素材有效期',
                        width: 100,
                        align: 'center',
                        key: 'validStartTime'
                    },
                     {
                        title: '投放日期',
                        align: 'center',
                        width: 100,
                        key: 'putStartTime'
                    },
                     {
                        title: '上架时间（天）',
                        width: 100,
                        align: 'center',
                        key: 'shelfDay'
                    },
                     {
                        title: '独立点击次数（次）',
                        align: 'center',
                        width: 100,
                        key: 'click'
                    },
                    {
                        title: '操作员',
                        align: 'center',
                        width: 100,
                        key: 'operateBy'
                    },
                    {
                        title: '广告状态',
                        width: 100,
                        align: 'center',
                        key: 'status'
                    },
                    {
                        title: '操作时间',
                        align: 'center',
                        width: 100,
                        key: 'operateTime'
                    },
                    {
                        title: '操作',
                         fixed: 'right',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => { 
                            return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                                putbtn(h,params),
                                outbtn(h,params)
                            ])         
                            
                       
                        }
                    }
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
      	//有效起始时间
		ChangeStartTime_change(data){
			this.changeMedia.validStartTime = data
		},
		ChangeEndTime_change(data){
			this.changeMedia.validEndTime = data
			
		},
		//投放时间段
		ChangeStartTime2_change(data){
			this.changeMedia.putStartTime = data
		},
		ChangeEndTime2_change(data){
			this.changeMedia.putEndTime = data
			
		},
			//添加广告上传图片
		detailPic(){
                this.changeMedia.img = this.$store.state.shareUrl.url;

		},
		removeDetail(){
			this.changeMedia.img = ''
		},
        	minValidStartTime_(data){
        		this.minValidStartTime = data + " 00:00:00"
        	},
        	maxValidStartTime_(data){
        		this.maxValidStartTime = data + " 23:59:59"
        	},
        	minValidEndTime_(data){
        		this.minValidEndTime = data + " 00:00:00"
        	},
        	maxValidEndTime_(data){
        		this.maxValidEndTime = data + " 23:59:59"
        	},
        	minPutStartTime_(data){
        		this.minPutStartTime = data + " 23:59:59"
        	},
        	maxPutStartTime_(data){
        		this.maxPutStartTime = data + " 23:59:59"
        	},
        	minPutEndTime_(data){
        		this.minPutEndTime = data + " 23:59:59"
        	},
        	maxPutEndTime_(data){
        		this.maxPutEndTime = data + " 23:59:59"
        	},
        	beginTime_(data){
        		this.beginTime = data + " 23:59:59"
        	},
        	finishTime_(data){
        		this.finishTime = data + " 23:59:59"
        	},
            imgView(data){  
                this.visible = true;
                this.imgName = data;
            },
            changeButton(param){
            	console.log( param.row)
           			     this.changeMedia = param.row
					
               		 this.changeMedia.operateTime = "";
               		 this.changeMedia.putStartTime = this.changeMedia.putStartTime.substr(0,10)
               		 this.changeMedia.putEndTime = this.changeMedia.putEndTime.substr(0,10)
               		 this.changeMedia.validEndTime = this.changeMedia.validEndTime.substr(0,10)
               		 this.changeMedia.validStartTime = this.changeMedia.validStartTime.substr(0,10)
					if (this.changeMedia.advertClass == '任务') {
						this.changeMedia.advertClass = 1
					}else if (this.changeMedia.advertClass == "卡券") {
						this.changeMedia.advertClass = 2
					}else if (this.changeMedia.advertClass == "商品") {
						this.changeMedia.advertClass = 3
					}else if (this.changeMedia.advertClass == "内部活动") {
						this.changeMedia.advertClass = 4
					}
      			 	if (this.changeMedia.materialType == "静态图片") {
						this.changeMedia.materialType = 0
					}else if (this.changeMedia.materialType == "动态图片") {
						this.changeMedia.materialType = 1
					}
                this.changemodal = true


            },
            cancelM(){
                this.changemodal = false
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
             handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrl.findAdvertListPage,
                      	{page:this.pageNum,
                      	rows:9,
                      	advertName:this.advertName,
                      	advertPositionName:this.advertPositionName,
                      	status:this.status,
                      	operateBy:this.operateBy,
                      	minValidStartTime:this.minValidStartTime,
                      	maxValidStartTime:this.maxValidStartTime,
                      	minValidEndTime:this.minValidEndTime,
                      	maxValidEndTime:this.maxValidEndTime,
                      	minPutStartTime:this.minPutStartTime,
                      	maxPutStartTime:this.maxPutStartTime,
                      	minPutEndTime:this.minPutEndTime,
                      	maxPutEndTime:this.maxPutEndTime,
                      	beginTime:this.beginTime,
                      	finishTime:this.beginTime
                      	}).then((res)=>{
               this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                       i.img = 'http://'+ i.img
                    
                    
                    i.validStartTime = this.changeTime(i.validStartTime)
                    i.validEndTime = this.changeTime(i.validEndTime)
                    i.putStartTime = this.changeTime(i.putStartTime)
                    i.putEndTime = this.changeTime(i.putEndTime)
                    i.operateTime = this.changeTime(i.operateTime)
                     i.status = changeStatus(i.status)

					i.showMode = changeMode(i.showMode)

                })
                    })
 			this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                     i.status = changeStatus(i.status)

                })

             },
            //  查询
              findCard(){
              	
              	
              	if (this.minValidStartTime >this.maxValidStartTime) {
                     this.$Message.warning('素材有效开始时间段写反了！');
              	}else if(this.minValidEndTime >this.maxValidEndTime){
                     this.$Message.warning('素材有效结束时间段写反了！');
              	}else if(this.minPutStartTime >this.maxPutStartTime){
                     this.$Message.warning('投放开始时间段写反了！');
              	}else if(this.minPutEndTime >this.maxPutEndTime){
                     this.$Message.warning('投放结束时间段写反了！');
              	}else if(this.beginTime >this.finishTime){
                     this.$Message.warning('操作时间段写反了！');
              	}else{
                      this.get(this.allUrl.findAdvertListPage,
                      	{page:1,
                      	rows:9,
                      	advertName:this.advertName,
                      	advertPositionName:this.advertPositionName,
                      	status:this.status,
                      	operateBy:this.operateBy,
                      	minValidStartTime:this.minValidStartTime,
                      	maxValidStartTime:this.maxValidStartTime,
                      	minValidEndTime:this.minValidEndTime,
                      	maxValidEndTime:this.maxValidEndTime,
                      	minPutStartTime:this.minPutStartTime,
                      	maxPutStartTime:this.maxPutStartTime,
                      	minPutEndTime:this.minPutEndTime,
                      	maxPutEndTime:this.maxPutEndTime,
                      	beginTime:this.beginTime,
                      	finishTime:this.beginTime
                      	}).then((res)=>{
               this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                    
                       i.img = 'http://'+ i.img
                    
                    i.validStartTime = this.changeTime(i.validStartTime)
                    i.validEndTime = this.changeTime(i.validEndTime)
                    i.putStartTime = this.changeTime(i.putStartTime)
                    i.putEndTime = this.changeTime(i.putEndTime)
                    i.operateTime = this.changeTime(i.operateTime)
                     i.status = changeStatus(i.status)

					i.showMode = changeMode(i.showMode)

                })
                    })
                }
               
            },
           //添加
            addCard(){                   
                      this.cardDetail = {
                      	pageTable:'',position:'',amount:0,structure:'',alt:'',showMode:1
                      }	
                      this.addmodal = true;
            },
//          addCardOk(){
//             if(this.cardDetail.pageTable===''||this.cardDetail.position==''||this.cardDetail.amount==0||this.cardDetail.structure==''){
//                 this.$Message.warning('请输入完整信息');
//             }else{      
//                 this.addmodal = false;
//                 let info = JSON.stringify(this.cardDetail)
//                  this.$http({
//						method:'POST',
//						url: this.allUrl.addAdvertPosition,
//						headers: {
// 							 "content-type": "application/json"
//						 },
//						responseType:'text/plain',
//						data:info
//					}).then((response)=>{
//                      if(response.data.ret=='ok'){
//                          this.$Message.success('添加成功');
//                         this.get(this.allUrl.findAdvertPositionPage,{page:1,rows:9}).then((res)=>{
//				                 this.data1 = res.data.rows;
//				                if(res.data.total){
//				                            this.totalNum = res.data.total
//				                        }else{
//				                            this.totalNum = 0
//				                        }
//				                 res.data.rows.forEach((i,index)=>{        
//				                    i.modifyTime = this.changeTime(i.modifyTime)
//				                     i.status = changeStatus(i.status)
//				
//				                })
//				            })
//                      }
//                  })
//
//             }
//
//              
//          },
            // 修改
            changePositionOk(){
//			this.addNewMedia.img = this.addNewMedia.img.substring(7,this.addNewMedia.img.length)
			let reg = /^(http)|(https).*/.test(this.changeMedia.img);
                if(reg){
                      this.changeMedia.img = this.changeMedia.img.substring(7,this.changeMedia.img.length)
                }
            	 if(this.changeMedia.materialType==null||this.changeMedia.advertName == ''||this.changeMedia.tenantName == ''||this.changeMedia.advertClass == null||this.changeMedia.priority == null||this.changeMedia.putStartTime == ''||this.changeMedia.putEndTime == ''||this.changeMedia.validStartTime == ''||this.changeMedia.validEndTime == ''||this.changeMedia.link == ''||this.changeMedia.img == ''){
                     this.$Message.warning('请填写完整信息');
			}else if(this.changeMedia.putStartTime > this.changeMedia.putEndTime){
                     this.$Message.warning('投放时间写反了');
			}else if(this.changeMedia.validStartTime>this.changeMedia.validEndTime){
                     this.$Message.warning('有效时间写反了');
			}else{
             console.log(this.changeMedia)	
               		 this.changeMedia.status = "";
             this.changeMedia.showMode="";
                   let info = JSON.stringify(this.changeMedia)

                    this.$http({
						method:'POST',
						url: this.allUrl.updateAdvertList,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                   this.changemodal = false; 
                            this.$Message.success('修改成功');
						this.get(this.allUrl.findAdvertListPage,{page:1,rows:9}).then((res)=>{
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{    
                       i.img = 'http://'+ i.img
                 	
                    i.modifyTime = this.changeTime(i.modifyTime)
                    i.validStartTime = this.changeTime(i.validStartTime)
                    i.validEndTime = this.changeTime(i.validEndTime)
                    i.putStartTime = this.changeTime(i.putStartTime)
                    i.putEndTime = this.changeTime(i.putEndTime)
                    i.operateTime = this.changeTime(i.operateTime)
                     i.status = changeStatus(i.status)

					i.showMode = changeMode(i.showMode)

                })
            })
                        }
                    })

               }

            },
            clear(){
            			this.advertName="",
                      	this.advertPositionName="",
                      	this.status=null,
                      	this.operateBy="",
                      	this.minValidStartTime='',
                      	this.maxValidStartTime='',
                      	this.minValidEndTime='',
                      	this.maxValidEndTime='',
                      	this.minPutStartTime='',
                      	this.maxPutStartTime='',
                      	this.minPutEndTime='',
                      	this.maxPutEndTime='',
                      	this.beginTime='',
                      	this.finishTime=''
            },
            // 上架
            putConfirm(){
                    let info = {id:this.Media_.id,status:1}
                 this.$http({
						method:'POST',
						url: this.allUrl.updateAdvertListStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('已上架');
                             this.get(this.allUrl.findAdvertListPage,{page:1,rows:9}).then((res)=>{
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                    
                       i.img = 'http://'+ i.img
                    
                    i.validStartTime = this.changeTime(i.validStartTime)
                    i.validEndTime = this.changeTime(i.validEndTime)
                    i.putStartTime = this.changeTime(i.putStartTime)
                    i.putEndTime = this.changeTime(i.putEndTime)
                    i.operateTime = this.changeTime(i.operateTime)
                     i.status = changeStatus(i.status)

					i.showMode = changeMode(i.showMode)

                })
            })

                        }
                    })
            },
            // 下架
            outConfirm(){
                 let info = {id:this.Media_.id,status:0}
                 this.$http({
						method:'POST',
						url: this.allUrl.updateAdvertListStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('已下架');
                             this.get(this.allUrl.findAdvertListPage,{page:1,rows:9}).then((res)=>{
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                       i.img = 'http://'+ i.img
                    
                    
                    i.validStartTime = this.changeTime(i.validStartTime)
                    i.validEndTime = this.changeTime(i.validEndTime)
                    i.putStartTime = this.changeTime(i.putStartTime)
                    i.putEndTime = this.changeTime(i.putEndTime)
                    i.operateTime = this.changeTime(i.operateTime)
                     i.status = changeStatus(i.status)

					i.showMode = changeMode(i.showMode)

                })
            })
                        }
                    })
            },
            // 删除
//          delectConfirm(){
//               let info = {id:this.cardDetail.id}
//               this.$http({
//						method:'POST',
//						url: this.allUrl.deletePrize,
//						headers: {
// 							 "content-type": "application/json"
//						 },
//						responseType:'text/plain',
//						params:info
//					}).then((response)=>{
//                      if(response.data.ret=='ok'){
//                          this.$Message.success('删除');
//                          this.get(this.allUrl.findPrizePage,{page:this.pageNum,rows:9}).then((res)=>{
//                                  this.data1 = res.data.rows;
//                                  if(res.data.total){
//                                          this.totalNum = res.data.total
//                                      }else{
//                                          this.totalNum = 0
//                                      }
//                                  res.data.rows.forEach((i,index)=>{        
//                                      i.createTime = this.changeTime(i.createTime)
//                                      i.endTime = this.changeTime(i.endTime)
//                                          i.status = changeStatus(i.status)
//                                  })
//                              })
//                      }
//                  })
//          }
            
            },
           
        beforeMount() {
             this.get(this.allUrl.findAdvertListPage,{page:1,rows:9}).then((res)=>{

                 this.data1 = res.data.rows;
             	console.log(this.data1)
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{     
                       i.img = 'http://'+ i.img
                 	
                    i.modifyTime = this.changeTime(i.modifyTime)
                    
                    
                    i.validStartTime = this.changeTime(i.validStartTime)
                    i.validEndTime = this.changeTime(i.validEndTime)
                    i.putStartTime = this.changeTime(i.putStartTime)
                    i.putEndTime = this.changeTime(i.putEndTime)
                    i.operateTime = this.changeTime(i.operateTime)
                     i.status = changeStatus(i.status)

					i.showMode = changeMode(i.showMode)

                })
            });
            
            //获取操作人员
            this.get(this.allUrl.findOperatorList).then((res)=>{
            	this.pepoList = res.data.data
            })
            
            
        },
    }

    function changeStatus(param) { 
        var info = ''
        switch(param){
             case 0:
              info = '已下架'
            break;
            case 1:
              info = '已上架'
            break;
            case 2:
              info = '待上架'
            break;
        }
        return info;
     }
    function changeClass(param) { 
        var info2 = ''
        switch(param){
             case 1:
              info2 = '任务'
            break;
            case 2:
              info2 = '卡券'
            break;
            case 3:
              info2 = '商品'
            break;
            case 4:
              info2 = '内部活动'
            break;
        }
        return info2;
    }
    function changeMode(param) { 
        var info3 = ''
        switch(param){
             case 0:
              info3 = "静态"
            break;
            case 1:
              info3 = '轮播'
            break;
        }
        return info3;
     }
    function changeMaterial(param){ 
        var info4 = ''
        switch(param){
             case 0:
              info4 = "静态图片"
            break;
            case 1:
              info4 = '动态图片'
            break;
        }
        return info4;
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
            text-align: left;border-bottom:1px solid #000000;
        }
        .search{
            height: 300px;line-height: 71px;font-size: 24px;padding-left: 40px;
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
    .ivu-date-picker {
    	width: 150px!important;
    }
</style>