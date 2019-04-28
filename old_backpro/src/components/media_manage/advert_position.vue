<template>
    <div class="home">
        <div class="title">广告位置</div>
       <div class="search">
            搜索
            <Input v-model="med_PosName" placeholder="广告位置名称" style="width: 26%;" size="large"></Input>
           	；  位置状态
            <Select v-model="model3" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            
            <div>
            广告数量	
                    <InputNumber v-model="minAmount" placeholder="数量" :precision="0" :min="0" style="width:150px;"></InputNumber>
            
            <!--<Input v-model="minAmount" placeholder="广告个数" style="width: 10%;" size="large"></Input>-->
            	个至
                    <InputNumber v-model="maxAmount" placeholder="数量" :precision="0" :min="0" style="width:150px;"></InputNumber>
            	
            <!--<Input v-model="maxAmount" placeholder="广告个数" style="width: 10%;" size="large"></Input>-->
            	个；
          	  操作时间段
	      	<DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
	      	<DatePicker type="date" :value="endTime_" @on-change="endTime" placeholder="Select date" style="width: 200px"></DatePicker>
        	
        	
           </div>
          <div>
          	<ButtonGroup size="large">
                <Button type="primary" ghost @click="findCard">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                <Button type="primary" ghost @click="addCard" style="margin-left:10px;">添加</Button>
               
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
        title="查看广告位"
        v-model="modal1"
        width="600"
        class-name="addRoleBox">
        <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		 <FormItem label="页面">
                    <Select disabled v-model="cardDetail.pageTable" size="large">
                		<Option v-for="item in pageList" :value="item.label" :key="item.value">{{ item.value }}</Option>
            		</Select>
      		  </FormItem> 
              <FormItem label="页面位置">
                     <Select disabled v-model="cardDetail.position" size="large">
                		<Option v-for="item in positionList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>
                <FormItem label="广告数量">
                    <InputNumber readonly v-model="cardDetail.amount" placeholder="数量" :precision="0" :min="0" style="width:150px;"></InputNumber>
                	
      		  </FormItem> 
                <FormItem label="广告位结构">
                    <Input readonly v-model="cardDetail.structure"  placeholder="广告位结构" />
      		  </FormItem>
      		  <FormItem label="广告位描述">
                    <Input readonly v-model="cardDetail.alt"  placeholder="广告位描述" />
      		  </FormItem>   
      		  <FormItem label="展现形式">
                    <Select disabled v-model="cardDetail.showMode" size="large">
                		<Option v-for="item in showModeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>  
            </Col>
       </Row>
      </Form>    
    </Modal>	
      <!--引入添加对话弹框-->
        <Modal
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
                		<Option v-for="item in pageList" :value="item.label" :key="item.value">{{ item.value }}</Option>
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
    </Modal>	

     <!--引入修改对话弹框-->
        <Modal
        v-model="changemodal"
        width="600"
        @on-cancel="cancelM"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>修改广告位置</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      	 		    
      		  <FormItem label="页面">
                    <Select v-model="changePosition.pageTable" size="large">
                		<Option v-for="item in pageList" :value="item.label" :key="item.value">{{ item.value }}</Option>
            		</Select>
      		  </FormItem> 
              <FormItem label="页面位置">
                     <Select v-model="changePosition.position" size="large">
                		<Option v-for="item in positionList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>
                <FormItem label="广告数量">
                    <InputNumber v-model="changePosition.amount" placeholder="数量" :precision="0" :min="0" style="width:150px;"></InputNumber>
                	
      		  </FormItem> 
                <FormItem label="广告位结构">
                    <Input v-model="changePosition.structure"  placeholder="广告位结构" />
      		  </FormItem>
      		  <FormItem label="广告位描述">
                    <Input v-model="changePosition.alt"  placeholder="广告位描述" />
      		  </FormItem>   
      		  <FormItem label="展现形式">
                    <Select v-model="changePosition.showMode" size="large">
                		<Option v-for="item in showModeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>  
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
        <p>确认生效？</p>
    </Modal>
    <Modal
        v-model="modal3"
        title="提示"
        @on-ok="outConfirm"
        >
        <p>确认失效？</p>
    </Modal>
      <!--<Modal
        v-model="modal4"
        title="提示"
        @on-ok="delectConfirm"
        >
        <p>确认删除？</p>
    </Modal>-->
    <!--添加广告对话框-->
	<Modal
        v-model="addMedia"
        width="600"
        @on-cancel="cancelAM"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>添加广告</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>     
      		  <FormItem label="广告名称">
                    <Input v-model="addNewMedia.advertName"  placeholder="卡券名称" />
      		  </FormItem> 
              <FormItem label="商户名称">
                    <!-- <Input v-model="addNewMedia.tenantName"  placeholder="商户名称" /> -->
                    <Select v-model="addNewMedia.tenantName" size="large">
                		<Option v-for="item in tenantList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>
                <FormItem label="广告分类">
                    <Select v-model="addNewMedia.advertClass" size="large">
                		<Option v-for="item in advertClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem> 
      		  <FormItem label="优先级">

                    <InputNumber v-model="addNewMedia.priority" placeholder="优先级" :precision="0" :min="0" style="width:500px;"></InputNumber>
      		  </FormItem>
                <FormItem label="素材大标题">
                    <Input v-model="addNewMedia.headline"  placeholder="不超过10个字" />
      		  </FormItem>
      		  <FormItem label="素材小标题">
                    <Input v-model="addNewMedia.heading"  placeholder="不超过6个字" />
      		  </FormItem>   
                <FormItem label="素材有效期"> 
                            <Row>
                                <Col span="10">
                   					 <DatePicker type="date" placeholder="请选择开始日期" :options="noToday" :value="addNewMedia.validStartTime" @on-change="ChangeStartTime_change"></DatePicker>
                                </Col>
                                <Col span="7" offset="1">
                   					 <DatePicker type="date" placeholder="请选择结束日期" :options="noToday" :value="addNewMedia.validEndTime" @on-change="ChangeEndTime_change"></DatePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>   
                <FormItem label="投放日期"> 
                            <Row>
                                <Col span="10">
                   					 <DatePicker type="date" placeholder="请选择开始日期" :options="noToday" :value="addNewMedia.putStartTime" @on-change="ChangeStartTime2_change"></DatePicker>
                                </Col>
                              	  <Col span="7" offset="1">
                   					 <DatePicker type="date" placeholder="请选择结束日期" :options="noToday" :value="addNewMedia.putEndTime" @on-change="ChangeEndTime2_change"></DatePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>       
      		  <FormItem label="素材类型">
                    <Select v-model="addNewMedia.materialType" size="large">
                		<Option v-for="item in materialList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            		</Select>
      		  </FormItem>
                <FormItem label="素材链接">
                      <Input v-model="addNewMedia.link"  placeholder="素材链接" />
                </FormItem>    
                <!--<FormItem label="上传图片">
                       <addpic @update="detailPic" @remove="removeDetail" :size='1' :defaultPic="this.addNewMedia.img"></addpic>             
                </FormItem>    -->
                <lazy :time='100' v-if="addMedia">
	                <FormItem label="上传图片">
	                       <addpic @update="detailPic" @remove="removeDetail" :size='1' :defaultPic="this.addNewMedia.img"></addpic>             
	                </FormItem> 
                </lazy>
            </Col>
       </Row>
      </Form>    
             <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="addNewMediaOk">保存</Button>
        </div>
    </Modal>	
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
                                           this.cardDetail = params.row                        	                           	
                                        }
                                    }
                                }, '查看')
                   
             };
               const changebtn = (h, params) => { 
                if(params.row.status=='待生效'||params.row.status=='已失效'){
                       return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.changeButton(params)           
                                        }
                                    }
                                }, '修改')
                }
                 
                   
             };
              const putbtn = (h, params) => { 
               if(params.row.status=='待生效'||params.row.status=='已失效'){
                    return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.cardDetail = params.row     
                                            this.modal2 = true           	                           	
                                        }
                                    }
                                }, '生效')
                   }
             };
              const outbtn = (h, params) => { 
                if(params.row.status=='已生效'){
                    return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.cardDetail = params.row     
                                            this.modal3 = true                   	                           	
                                        }
                                    }
                                }, '失效')
                }
             };
			const addbtn = (h, params) => { 

                    return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	this.addNewMedia.materialType=null
                                        	this.addNewMedia.advertPositionName = params.row.advertPositionName
                                        	this.addNewMedia.advertPositionId = params.row.id
                                        	this.addNewMedia.showMode = params.row.showMode
							                this.addNewMedia.advertName = '';
							                this.addNewMedia.tenantName = '';
							                this.addNewMedia.advertClass = null;
							                this.addNewMedia.priority = null;
							                this.addNewMedia.headline = '';
							                this.addNewMedia.heading = '';
							                this.addNewMedia.putStartTime = '';
							                this.addNewMedia.putEndTime = '';
							                this.addNewMedia.validStartTime = '';
							                this.addNewMedia.validEndTime = '';
							                this.addNewMedia.link = '';
							                this.addNewMedia.img = '';
                                        	this.addMedia = true      	                           	
                                        }
                                    }
                                }, '添加广告')
             };
              

            return{
                tenantList:[],
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
                        label: '已失效'
                    },
                    {
                        value: 1,
                        label: '已生效'
                    },
                    {
                        value: 2,
                        label: '待生效'
                    	
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
                        value: "首页",
                        label: 'index'
                    },
                    {
                        value: "找优惠",
                        label: 'discount'
                    },
                    {
                        value: "聚划算",
                        label: 'bargain'
                    	
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

            	endTime_2:"",
                visible:false,
                imgName:'',
                changePosition:{
                     remark:'',type:'',id:'',name:'',title:'',putInTime:"",createTime:'',endTime:'',link:'',bannerUrl:'',recordUrl:'',count:0,weight:1,url:''
                },
                addNewMedia:{
                	materialType:null,
                	advertName:'',//广告名称
                	tenantName:'',//商户名称
                	advertClass:null,//广告分类
                	priority:null,//优先级
                	headline:'',//大标题
                	heading:'',//小标题
                	putStartTime:'',//投放起始
                	putEndTime:'',//投放结束
                	validStartTime:'',//素材有效起始时间
                	validEndTime:'',//素材有效结束时间
                	link:'',//素材链接
                	img:'',//上传传图片
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
                searchInfo:'',
                pageSize:9,
                 columns: [
                    {
                         fixed: 'left',
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
                        title: '广告位编号',
                        width: 100,
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '广告位名称',
                        width: 150,
                        
                        align: 'center',
                        key: 'advertPositionName'
                    },
                      {
                        title: '页面',
                        align: 'center',
                        width: 100,
                        
                        key: 'pageTable2'
                    },
                     {
                        title: '页面位置',
                        align: 'center',
                        width: 100,
                        key: 'position'
                    },
                    {
                        width: 100,
                        title: '广告数量',
                        align: 'center',
                        key: 'amount'
                    },
                     {
                        title: '位置宽度',
                        width: 100,
                        align: 'center',
                        key: 'locationWeight'
                    },
                     {
                        title: '位置高度',
                        width: 100,
                        align: 'center',
                        key: 'locationHeight'
                    },
                     {
                        title: '广告位结构',
                        align: 'center',
                        width: 100,
                        key: 'structure'
                    },
                    {
                        title: '广告位描述',
                        align: 'center',
                        width: 100,
                        key: 'alt'
                    },
                     {
                        title: '操作人员',
                        align: 'center',
                        width: 100,
                        key: 'operateBy'
                    },
                     {
                        title: '位置状态',
                        align: 'center',
                        width: 100,
                        key: 'status'
                    },
                     {
                        title: '操作时间',
                        width: 180,
                        align: 'center',
                        key: 'modifyTime'
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
                                outbtn(h,params),
                                addbtn(h,params)
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
		//添加广告上传图片
		detailPic(){
                this.addNewMedia.img = this.$store.state.shareUrl.url;

		},
		removeDetail(){
			this.addNewMedia.img = ''
		},
		//添加广告确认按钮
		addNewMediaOk(){
//				this.addNewMedia.img = this.addNewMedia.img.substring(7,this.addNewMedia.img.length)
		let reg = /^(http)|(https).*/.test(this.addNewMedia.img);
                if(reg){
                      this.addNewMedia.img = this.addNewMedia.img.substring(7,this.addNewMedia.img.length)
                }
			console.log( this.addNewMedia.img)
			
			if(this.addNewMedia.materialType==null||this.addNewMedia.advertName == ''||this.addNewMedia.tenantName == ''||this.addNewMedia.advertClass == null||this.addNewMedia.priority == null||this.addNewMedia.putStartTime == ''||this.addNewMedia.putEndTime == ''||this.addNewMedia.validStartTime == ''||this.addNewMedia.validEndTime == ''||this.addNewMedia.link == ''||this.addNewMedia.img == ''){
                     this.$Message.warning('请填写完整信息');
			}else if(this.addNewMedia.putStartTime > this.addNewMedia.putEndTime){
                     this.$Message.warning('投放时间写反了');
			}else if(this.addNewMedia.headline.length>10){
                     this.$Message.warning('大标题不能超过十个字！');
			}else if(this.addNewMedia.heading.length>6){
                     this.$Message.warning('小标题不能超过六个字！');
			}else{

				
                   let info3 = JSON.stringify(this.addNewMedia)
				this.$http({
						method:'POST',
						url: this.allUrl.addAdvertList,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info3
					}).then((res)=>{
						if(res.data.ret=='ok'){
							this.addMedia = false
                  		   this.$Message.warning('添加成功');
							
						}
					})
			}
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
            imgView(data){  
                this.visible = true;
                this.imgName = 'http://'+data;
            },
            changeButton(param){
                this.changemodal = true
                this.changePosition = param.row
                       if(param.row.putInTime){
                            this.week = this.changePosition.putInTime.split(';')[0].split(',')
                            this.hour = this.changePosition.putInTime.split(';')[1].split('-')     
                        }

                                           
                                          
            },
            cancelM(){
                this.changemodal = false
            },
            cancelAM(){
            	
            	this.addMedia = false
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
             handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrl.findAdvertPositionPage,{page:this.pageNum,rows:9,advertPositionName:this.searchInfo,status:this.model3,beginTime:this.startTime_,finishTime:this.endTime_,minAmount:this.minAmount,maxAmount:this.maxAmount}).then((res)=>{

 			this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                     i.status = changeStatus(i.status)
					i.pageTable2 = changePage(i.pageTable)
                })
                 })
             },
            //  查询
              findCard(){
                this.searchInfo = this.med_PosName
                   if(this.startTime_ > this.endTime_){
                     this.$Message.warning('开始时间段写反了！');
                }else{
                      this.get(this.allUrl.findAdvertPositionPage,{page:1,rows:9,advertPositionName:this.searchInfo,status:this.model3,beginTime:this.startTime_,finishTime:this.endTime_,minAmount:this.minAmount,maxAmount:this.maxAmount}).then((res)=>{
                this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                     i.status = changeStatus(i.status)
					i.pageTable2 = changePage(i.pageTable)
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
            addCardOk(){
               if(this.cardDetail.pageTable===''||this.cardDetail.position==''||this.cardDetail.amount==0||this.cardDetail.structure==''){
                   this.$Message.warning('请输入完整信息');
               }else{      

                   let info = JSON.stringify(this.cardDetail)
                    this.$http({
						method:'POST',
						url: this.allUrl.addAdvertPosition,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                   			this.addmodal = false;
                        	
                            this.$Message.success('添加成功');
                           this.get(this.allUrl.findAdvertPositionPage,{page:1,rows:9}).then((res)=>{
				                 this.data1 = res.data.rows;
				                if(res.data.total){
				                            this.totalNum = res.data.total
				                        }else{
				                            this.totalNum = 0
				                        }
				                 res.data.rows.forEach((i,index)=>{        
				                    i.modifyTime = this.changeTime(i.modifyTime)
				                     i.status = changeStatus(i.status)
					i.pageTable2 = changePage(i.pageTable)
				
				                })
				            })
                        }
                    })

               }

                
            },
            // 修改
            changePositionOk(){
            	 if(this.changePosition.pageTable===''||this.changePosition.position==''||this.changePosition.amount==0||this.changePosition.structure==''){
                   this.$Message.warning('请输入完整信息');
               }else{
                   this.changemodal = false; 
                   this.changePosition.status = 0
                   this.changePosition.modifyTime = ''
                   let info = JSON.stringify(this.changePosition)
          
                    this.$http({
						method:'POST',
						url: this.allUrl.updateAdvertPosition,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('修改成功');
						this.get(this.allUrl.findAdvertPositionPage,{page:1,rows:9}).then((res)=>{
						                 this.data1 = res.data.rows;
						                if(res.data.total){
						                            this.totalNum = res.data.total
						                        }else{
						                            this.totalNum = 0
						                        }
						                 res.data.rows.forEach((i,index)=>{        
						                    i.modifyTime = this.changeTime(i.modifyTime)
						                     i.status = changeStatus(i.status)
					i.pageTable2 = changePage(i.pageTable)
						
						                })
						            })
                        }
                    })

               }

            },
            clear(){
                
            	this.med_PosName = ''
            	this.model3 = ''
            	this.startTime_= ''
            	this.endTime_ = ''
            	this.minAmount = null
            	this.maxAmount = null
            },
            // 生效
            putConfirm(){
                    let info = {id:this.cardDetail.id,status:1}
                 this.$http({
						method:'POST',
						url: this.allUrl.updateAdvertPositionStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('已生效');
                            this.get(this.allUrl.findAdvertPositionPage,{page:1,rows:9}).then((res)=>{
				                 this.data1 = res.data.rows;
				                if(res.data.total){
				                            this.totalNum = res.data.total
				                        }else{
				                            this.totalNum = 0
				                        }
				                 res.data.rows.forEach((i,index)=>{        
				                    i.modifyTime = this.changeTime(i.modifyTime)
				                     i.status = changeStatus(i.status)
					i.pageTable2 = changePage(i.pageTable)
				
				                })
            })
                        }
                    })
            },
            // 下架
            outConfirm(){
                 let info = {id:this.cardDetail.id,status:0}
                 this.$http({
						method:'POST',
						url: this.allUrl.updateAdvertPositionStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('已失效');
                            this.get(this.allUrl.findAdvertPositionPage,{page:1,rows:9}).then((res)=>{
				                 this.data1 = res.data.rows;
				                if(res.data.total){
				                            this.totalNum = res.data.total
				                        }else{
				                            this.totalNum = 0
				                        }
				                 res.data.rows.forEach((i,index)=>{        
				                    i.modifyTime = this.changeTime(i.modifyTime)
				                     i.status = changeStatus(i.status)
					i.pageTable2 = changePage(i.pageTable)
				
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
             this.get(this.allUrl.findAdvertPositionPage,{page:1,rows:9}).then((res)=>{
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.modifyTime = this.changeTime(i.modifyTime)
                     i.status = changeStatus(i.status)
					i.pageTable2 = changePage(i.pageTable)
                })
            })
            this.get(this.allUrl.findAllTenant).then((res)=>{
                console.log(res.data.data)
                this.tenantList = res.data.data
            })
        },
    }

    function changeStatus(param) { 
        var info = ''
        switch(param){
             case 0:
              info = '已失效'
            break;
            case 1:
              info = '已生效'
            break;
            case 2:
              info = '待生效'
            break;
        }
        return info;
     }
    function changePage(param) { 
        var info1 = ''
        switch(param){
             case 'index':
              info1 = '首页'
            break;
            case 'discount':
              info1 = '找优惠'
            break;
            case 'bargain':
              info1 = '聚划算'
            break;
        }
        return info1;
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
            height: 200px;line-height: 71px;font-size: 24px;padding-left: 40px;
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