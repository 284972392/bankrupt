<template>
    <div class="home">
        <div class="title">卡券列表</div>
       <div class="search">
           <div>
               搜索
            <Input v-model="cardName" placeholder="卡券名称" style="width: 20%;" size="large"></Input>
                卡券类型
                <Select v-model="model2" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                 状态
                <Select v-model="model3" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        	<div>
                 
                	  开始时间段
                <DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
                <DatePicker type="date" :value="endTime_" @on-change="endTime" placeholder="Select date" style="width: 200px"></DatePicker>
                 截止时间段
	      	<DatePicker type="date" :value="startTime_2" @on-change="startTime2" placeholder="Select date" style="width: 200px"></DatePicker> 至
	      	<DatePicker type="date" :value="endTime_2" @on-change="endTime2" placeholder="Select date" style="width: 200px"></DatePicker>
            </div>

            <div>
                  权重
                <Select v-model="model4" style="width:15%;margin-left:37px;" size="large">
                    <Option v-for="item in weightList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                渠道
                 <Select v-model="selectPlaceValue" style="width:260px">
                    <Option v-for="item in placeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>   
     
          	<ButtonGroup size="large">
                <Button type="primary" ghost @click="findCard">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                <Button type="primary" ghost @click="addCard" style="margin-left:10px;">添加</Button>
               
            </ButtonGroup>
               </div>
          
        </div>
           

        <div class="all_users" @click="allCard">全部({{totalNum}})</div>

        

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
        title="查看卡券"
        v-model="modal1"
        width="600"
        class-name="addRoleBox">
        <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="卡券名称">
                    {{cardDetail.remark}}
      		  </FormItem> 
              <FormItem label="卡券类型">
                     {{cardDetail.type}}
      		  </FormItem> 
                <FormItem label="卡券编号">
                     {{cardDetail.id}}
      		  </FormItem> 
                <FormItem label="素材大标题">
                     {{cardDetail.name}}
      		  </FormItem> 
                <FormItem label="素材小标题">
                     {{cardDetail.title}}
      		  </FormItem>   
                <FormItem label="投放时间">
                     {{cardDetail.putInTime}}
      		  </FormItem>   
                   <FormItem label="设定点击量">
                       {{cardDetail.count}}
                </FormItem>
                <FormItem label="优先级">
                    {{cardDetail.weight}}
                </FormItem>  
                <FormItem label="渠道">
                	{{cardDetail.place}}
                      <!--<Select v-model="changePlaceValue" disabled multiple style="width:260px">
                        <Option v-for="item in placeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>   -->
                </FormItem>  
       	 </Col>
             <Col span="13" offset="0">
                <FormItem label="开始时间">
                        {{cardDetail.createTime}}
                </FormItem>    
                <FormItem label="结束时间">
                        {{cardDetail.endTime}}
                </FormItem>    
                <FormItem label="素材链接">
                        {{cardDetail.link}}
                </FormItem>    
                <FormItem label="详情图片">
                    <img :src="'http://'+cardDetail.bannerUrl" alt="" style="height:60px;60px;cursor:pointer;" @click="imgView(cardDetail.bannerUrl)">
                </FormItem>    
               <FormItem label="列表图片">
                    <img :src="'http://'+cardDetail.recordUrl" alt="" style="height:60px;60px;cursor:pointer;" @click="imgView(cardDetail.recordUrl)">
                </FormItem>  
                 <FormItem label="Logo图片">
                    <img :src="'http://'+cardDetail.url" alt="" style="height:60px;60px;cursor:pointer;" @click="imgView(cardDetail.url)">
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
            <span>添加卡券</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      	 		    
      		  <FormItem label="卡券名称">
                    <Input v-model="cardDetail.remark"  placeholder="卡券名称" />
      		  </FormItem> 
              <FormItem label="卡券类型">
                    <Input v-model="cardDetail.type"  placeholder="卡券类型" />
      		  </FormItem>
                 <FormItem label="渠道">
                    <Select v-model="placeValue" multiple style="width:260px">
                        <Option v-for="item in placeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>   
                </FormItem>

                  


                <FormItem label="素材大标题">
                    <Input v-model="cardDetail.name"  placeholder="素材大标题" />
      		  </FormItem> 
                <FormItem label="素材小标题">
                    <Input v-model="cardDetail.title"  placeholder="素材小标题" />
      		  </FormItem>   
                <FormItem label="投放时间"> 
                            <Row>
                                <Col span="10">
                                    <Select v-model="week" multiple style="width:220px">
                                        <Option v-for="item in weekSelect" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col span="7" offset="1">
                                     <TimePicker v-model="hour" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>   
                <FormItem label="开始时间">
                    <DatePicker type="date" placeholder="请选择开始日期" :options="noToday" :value="cardDetail.createTime" @on-change="ChangeStartTime"></DatePicker>
                </FormItem>    
                <FormItem label="结束时间">
                    <DatePicker type="date" placeholder="请选择结束日期" :options="noToday" :value="cardDetail.endTime" @on-change="ChangeEndTime"></DatePicker>
                </FormItem>    
                 <FormItem label="优先级">
                    <InputNumber v-model="cardDetail.weight" :min="2" placeholder="请输入优先级" :precision='0' style="width:150px;"></InputNumber>
                </FormItem>    
                 <FormItem label="设定点击量">
                    <InputNumber v-model="cardDetail.count" placeholder="请设定点击量" :precision='0' :min='0' style="width:150px;"></InputNumber>
                </FormItem>    
                <FormItem label="素材链接">
                      <Input v-model="cardDetail.link"  placeholder="素材链接" />
                </FormItem>    
                <FormItem label="上传详情图片">
                       <addpic @update="detailPic" @remove="removeDetail" :size='1'></addpic>
                </FormItem>    
               <FormItem label="上传列表图片">
                         <addpic @update="listPic" @remove="removeList" :size='1'></addpic>
                </FormItem>         
                 <FormItem label="上传Logo图片">
                         <addpic @update="logoPic" @remove="removeLogo" :size='1'></addpic>
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
            <span>修改卡券</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      	 		    
      		  <FormItem label="卡券名称">
                    <Input v-model="changeCard.remark"  placeholder="卡券名称" />
      		  </FormItem> 
              <FormItem label="卡券类型">
                    <Input v-model="changeCard.type"  placeholder="卡券类型" />
      		  </FormItem>
                <FormItem label="渠道">
                    <Select v-model="changePlaceValue" style="width:260px">
                        <Option v-for="item in placeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>   
                </FormItem>
                <FormItem label="素材大标题">
                    <Input v-model="changeCard.name"  placeholder="素材大标题" />
      		  </FormItem> 
                <FormItem label="素材小标题">
                    <Input v-model="changeCard.title"  placeholder="素材小标题" />
      		  </FormItem>   
                <FormItem label="投放时间"> 
                            <Row>
                                <Col span="10">
                                    <Select v-model="week" multiple style="width:220px">
                                        <Option v-for="item in weekSelect" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col span="7" offset="1">
                                     <TimePicker v-model="hour" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                                </Col>
                            </Row> 
  
      		  </FormItem>   
                <FormItem label="开始时间">
                    <DatePicker type="date" placeholder="请选择开始日期" :options="noToday" :value="changeCard.createTime" @on-change="ChangeStartTime_change"></DatePicker>
                </FormItem>    
                <FormItem label="结束时间">
                    <DatePicker type="date" placeholder="请选择结束日期" :options="noToday" :value="changeCard.endTime" @on-change="ChangeEndTime_change"></DatePicker>
                </FormItem>    
                      <FormItem label="优先级">
                    <InputNumber v-model="changeCard.weight" :min="2" placeholder="请输入优先级" :precision='0' style="width:150px;"></InputNumber>
                </FormItem>    
                 <FormItem label="设定点击量">
                    <InputNumber v-model="changeCard.count" placeholder="请设定点击量" :precision="0" :min="0" style="width:150px;"></InputNumber>
                </FormItem>    
                <FormItem label="素材链接">
                      <Input v-model="changeCard.link"  placeholder="素材链接" />
                </FormItem>    
          <lazy :time='100' v-if="changemodal">
                <FormItem label="上传详情图片">
                       <addpic @update="detailPic_change" @remove="removeDetail_change" :size='1' :defaultPic="'http://'+changeCard.bannerUrl"></addpic>             
                </FormItem>    
               <FormItem label="上传列表图片">
                         <addpic @update="listPic_change" @remove="removeList_change" :size='1' :defaultPic="'http://'+changeCard.recordUrl"></addpic>
                </FormItem>  
                  <FormItem label="上传Logo图片">
                         <addpic @update="logoPic_change" @remove="removeLogo_change" :size='1' :defaultPic="'http://'+changeCard.url"></addpic>
                </FormItem>    
              </lazy>       
            </Col>
       </Row>
      </Form>    
             <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="changeCardOk">保存</Button>
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
      <Modal
        v-model="modal4"
        title="提示"
        @on-ok="delectConfirm"
        >
        <p>确认删除？</p>
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
                                         console.log(params.row.place)
                                           if(params.row.place){
                                               this.changePlaceValue = params.row.place
                                           }                                        
       
                                        }
                                    }
                                }, '查看')
                   
             };
               const changebtn = (h, params) => { 
                if(params.row.status!=='上架'){
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
               if(params.row.status=='下架'||params.row.status=='待上架'){
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
                                }, '上架')
                   }
             };
              const outbtn = (h, params) => { 
                if(params.row.status=='上架'){
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
                                }, '下架')
                }
             };
             
              const delectbtn = (h, params) => { 
                    return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.cardDetail = params.row     
                                            this.modal4 = true                   	                           	
                                        }
                                    }
                                }, '删除')
             };

              

            return{
                selectPlaceValue:'',
                placeList:[],
                placeValue:[],
                changePlaceValue:[],
            	//卡券类型
            	model2:'',
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
            	//搜索状态
            	model3:'',
            		statusList:[
            		 {
                        value: 0,
                        label: '正常'
                    },
                    {
                        value: 1,
                        label: '下架'
                    },
                    {
                        value: 2,
                        label: '待上架'
                    	
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
            	startTime_2:'',
            	endTime_2:"",
                visible:false,
                imgName:'',
                changeCard:{
                     remark:'',type:'',id:'',name:'',title:'',putInTime:"",createTime:'',endTime:'',link:'',bannerUrl:'',recordUrl:'',count:0,weight:2,url:'',place:''
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
                    remark:'',type:'',id:0,name:'',title:'',putInTime:"",createTime:'',endTime:'',link:'',bannerUrl:'',recordUrl:'',count:0,weight:2,url:'',place:''
                },
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                addmodal:false,
                changemodal:false,
                totalNum:0,
                pageNum:1,
                cardName:'',
                searchInfo:'',
                pageSize:9,
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
                        title: '卡券编号',
                        align: 'center',
                        key: 'id',
                        width:100
                    },
                    {
                        title: '卡券名称',
                        align: 'center',
                        key: 'remark',
                        width:120
                    },
                      {
                        title: '卡券类型',
                        align: 'center',
                        key: 'type',
                        width:120
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width:120
                    },
                    {
                        title: '开始时间',
                        align: 'center',
                        key: 'createTime',
                        minWidth:150
                    },
                    {
                        title: '渠道',
                        align: 'center',
                        key: 'place',
                        minWidth:130
                    },
                     {
                        title: '截止时间',
                        align: 'center',
                        key: 'endTime',
                        minWidth:150
                    },
                    {
                        title: '权重',
                        align: 'center',
                        key: 'weight',
                        width:120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => { 
                            return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params),
                                putbtn(h,params),
                                outbtn(h,params),
                                delectbtn(h,params)
                            ])         
                            
                       
                        }
                    }
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
          changeChannel(name){
              let result = ''
              this.placeList.map((val)=>{
                  if(name==val.value){
                      result = val.label;
                  }
              })
              return result;
          },
      	startTime(data){
        		this.startTime_ = data + " 00:00:00"
        	},
        	endTime(data){
        		this.endTime_ = data + " 23:59:59"
        	},
        	startTime2(data){
        		this.startTime_2 = data + " 00:00:00"
        	},
        	endTime2(data){
        		this.endTime_2 = data + " 23:59:59"
        	},
            imgView(data){  
                this.visible = true;
                this.imgName = 'http://'+data;
            },
            changeButton(param){
                console.log(param)
                if(param.row.place){
                     this.changePlaceValue = param.row.place
                     let that = this;
                     this.placeList.forEach(function(i,index){
                     	if (that.changePlaceValue == i.label) {
                     		that.changePlaceValue = i.value
                     	}
                     })
                }
               
                this.changemodal = true
                this.changeCard = param.row
                       if(param.row.putInTime){
                            this.week = this.changeCard.putInTime.split(';')[0].split(',')
                            this.hour = this.changeCard.putInTime.split(';')[1].split('-')     
                        }

                                           
                                          
            },
            cancelM(){
                this.changemodal = false
            },
            detailPic(){
            	console.log(this.$store.state.shareUrl)
                 this.cardDetail.bannerUrl = this.$store.state.shareUrl.url;
            },
            listPic(){
                this.cardDetail.recordUrl = this.$store.state.shareUrl.url;
            },
            logoPic(){
                this.cardDetail.url = this.$store.state.shareUrl.url;
            },
            removeDetail(){
                this.cardDetail.bannerUrl = ''
            },
            removeList(){
                this.cardDetail.recordUrl = ''
            },
            removeLogo(){
                this.cardDetail.url = ''
            },
            detailPic_change(){
                this.changeCard.bannerUrl = this.$store.state.shareUrl.url;
            },
            listPic_change(){
                this.changeCard.recordUrl = this.$store.state.shareUrl.url;
            },
            logoPic_change(){
                this.changeCard.url = this.$store.state.shareUrl.url;
            },
            removeDetail_change(){
                this.changeCard.bannerUrl = ''
            },
            removeList_change(){
                this.changeCard.recordUrl = ''
            },
            removeLogo_change(){
                this.changeCard.url = ''
            },
            ChangeStartTime(data){
                this.cardDetail.createTime = data;
            },
            ChangeEndTime(data){
                this.cardDetail.endTime = data;
            },
            ChangeStartTime_change(data){
                this.changeCard.createTime = data;
            },
            ChangeEndTime_change(data){
                this.changeCard.endTime = data;
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);
            },
            allCard(){
                this.selectPlaceValue = ''
                this.pageNum = 1
            	this.cardName = ''
                this.searchInfo = ''
                this.startTime_ = ''
            	this.endTime_ = ""
            	this.startTime_2 = ''
            	this.endTime_2 = ""
            	this.model2 = ""
            	this.model3 = ""
                this.searchInfo = ''
                  this.get(this.allUrl.findPrizePage,{page:1,rows:9}).then((res)=>{
                 this.data1 = res.data.rows;
                    if(res.data.total){
                                this.totalNum = res.data.total
                            }else{
                                this.totalNum = 0
                            }
                    res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.endTime = this.changeTime(i.endTime)
                        i.status = changeStatus(i.status)
                        i.place = this.changeChannel(i.place)
                    })
                })
            },
             handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrl.findPrizePage,{page:value,rows:9,place:this.selectPlaceValue,name:this.searchInfo,status:this.model3,type:this.model2,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{
                    this.data1 = res.data.rows;
                    if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                     res.data.rows.forEach((i,index)=>{        
                           i.createTime = this.changeTime(i.createTime)
                           i.endTime = this.changeTime(i.endTime)
                            i.status = changeStatus(i.status)
                            i.place = this.changeChannel(i.place)
                    })
                 })
             },
            //  查询
              findCard(){
                  this.pageNum = 1
                this.searchInfo = this.cardName
                   if(this.startTime_ > this.endTime_){
                     this.$Message.warning('开始时间段写反了！');
                }else if(this.startTime_2 > this.endTime_2){
                     this.$Message.warning('截止时间段写反了！');
                }else{
                      this.get(this.allUrl.findPrizePage,{page:1,rows:9,place:this.selectPlaceValue,name:this.searchInfo,status:this.model3,type:this.model2,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{
                 this.data1 = res.data.rows;
                    if(res.data.total){
                                this.totalNum = res.data.total
                            }else{
                                this.totalNum = 0
                            }
                        res.data.rows.forEach((i,index)=>{        
                            i.createTime = this.changeTime(i.createTime)
                            i.endTime = this.changeTime(i.endTime)
                            i.status = changeStatus(i.status)
                             i.place = this.changeChannel(i.place)
                        })
                    })
                }
               
            },
           //添加
            addCard(){                
                    this.placeValue = []   
                      this.cardDetail = {
                           remark:'',type:'',id:0,name:'',title:'',putInTime:"",createTime:'',endTime:'',link:'',count:0,weight:2,bannerUrl:'',recordUrl:'',url:''
                      }	
                      this.addmodal = true;
            },
            addCardOk(){
                let a = new Date(this.cardDetail.createTime).getTime()
               let b = new Date(this.cardDetail.endTime).getTime() 
               console.log(this.cardDetail)
               if(a > b){
                   this.$Message.warning('请确定开始结束时间!');
               }else if(this.week==''||this.placeValue[0]==''||this.hour[0]==''||this.cardDetail.createTime==''||this.cardDetail.endTime==''||this.cardDetail.remark==''||this.cardDetail.type==''||this.cardDetail.name==''||this.cardDetail.title==''||this.cardDetail.link==''||this.cardDetail.bannerUrl==''||this.cardDetail.recordUrl==''||this.cardDetail.count==''||this.cardDetail.weight==''){
                   this.$Message.warning('请输入完整信息');
               }else{      
                   this.cardDetail.place = this.placeValue.join(';')
                   this.addmodal = false;
                   this.cardDetail.putInTime = this.week.join(',')+';'+this.hour.join('-')     
               
                     let a = this.cardDetail.bannerUrl.slice(6),
                         b = this.cardDetail.recordUrl.slice(6),
                         c = this.cardDetail.url.slice(6);
                 
                   this.cardDetail.bannerUrl = a
                   this.cardDetail.recordUrl = b   
                   this.cardDetail.url = c

                   let info = JSON.stringify(this.cardDetail)
                    this.$http({
						method:'POST',
						url: this.allUrl.addPrize,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('添加成功');
                            this.get(this.allUrl.findPrizePage,{page:this.pageNum,rows:9,place:this.selectPlaceValue,name:this.searchInfo,status:this.model3,type:this.model2,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{         
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                    res.data.rows.forEach((i,index)=>{        
                                        i.createTime = this.changeTime(i.createTime)
                                        i.endTime = this.changeTime(i.endTime)
                                            i.status = changeStatus(i.status)
                                             i.place = this.changeChannel(i.place)
                                    })
                                })
                        }
                    })

               }

                
            },
            // 修改
            changeCardOk(){
                let a = new Date(this.changeCard.createTime).getTime()
               let b = new Date(this.changeCard.endTime).getTime() 
               if(a > b){
                   this.$Message.warning('请确定开始结束时间!');
               }else if(this.changePlaceValue.length==0||this.week==''||this.hour[0]==''||this.changeCard.createTime==''||this.changeCard.endTime==''||this.changeCard.remark==''||this.changeCard.type==''||this.changeCard.name==''||this.changeCard.title==''||this.changeCard.link==''||this.changeCard.bannerUrl==''||this.changeCard.recordUrl==''||this.changeCard.weight==''||this.changeCard.count==''){
                   this.$Message.warning('请输入完整信息');
               }else{
//                 this.changeCard.place = this.changePlaceValue.join(';')
                   this.changeCard.place = this.changePlaceValue
                   this.changemodal = false;
                   this.changeCard.putInTime = this.week.join(',')+';'+this.hour.join('-')     
                     let a = this.changeCard.bannerUrl,
                         b = this.changeCard.recordUrl,
                         c = this.changeCard.url;
                   if(this.changeCard.bannerUrl.substring(0,7)=="http://"){
                       this.changeCard.bannerUrl = a.substring(7)
                   }
                    if(this.changeCard.recordUrl.substring(0,7)=="http://"){
                        this.changeCard.recordUrl = b.substring(7)
                    } 
                    if(this.changeCard.url.substring(0,7)=="http://"){
                        this.changeCard.url = c.substring(7)
                    } 

                   this.changeCard.createTime = new Date(this.changeCard.createTime).getTime()
                   this.changeCard.endTime = new Date(this.changeCard.endTime).getTime() 
                   this.changeCard.status = 2
                   let info = JSON.stringify(this.changeCard)
          
                    this.$http({
						method:'POST',
						url: this.allUrl.updatePrize,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('修改成功');

                            this.get(this.allUrl.findPrizePage,{page:this.pageNum,rows:9,place:this.selectPlaceValue,name:this.searchInfo,status:this.model3,type:this.model2,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{         
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                    res.data.rows.forEach((i,index)=>{        
                                        i.createTime = this.changeTime(i.createTime)
                                        i.endTime = this.changeTime(i.endTime)
                                            i.status = changeStatus(i.status)
                                             i.place = this.changeChannel(i.place)
                                    })
                                })
                        }
                    })

               }

            },
            clear(){
                this.cardName = ''
                this.searchInfo = ''
                this.startTime_ = ''
            	this.endTime_ = ""
            	this.startTime_2 = ''
            	this.endTime_2 = ""
            	this.model2 = ""
            	this.model3 = ""
                this.model4 = ""
                this.selectPlaceValue = ''
            },
            // 上架
            putConfirm(){
                    let info = {id:this.cardDetail.id,status:0}
                 this.$http({
						method:'POST',
						url: this.allUrl.updatePrizeStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('上架成功');
                            this.get(this.allUrl.findPrizePage,{page:this.pageNum,rows:9,place:this.selectPlaceValue,name:this.searchInfo,status:this.model3,type:this.model2,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{         
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                    res.data.rows.forEach((i,index)=>{        
                                        i.createTime = this.changeTime(i.createTime)
                                        i.endTime = this.changeTime(i.endTime)
                                            i.status = changeStatus(i.status)
                                             i.place = this.changeChannel(i.place)
                                    })
                                })
                        }
                    })
            },
            // 下架
            outConfirm(){
                 let info = {id:this.cardDetail.id,status:1}
                 this.$http({
						method:'POST',
						url: this.allUrl.updatePrizeStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret=='ok'){
                            this.$Message.success('下架成功');
                            this.get(this.allUrl.findPrizePage,{page:this.pageNum,rows:9,place:this.selectPlaceValue,name:this.searchInfo,status:this.model3,type:this.model2,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                    res.data.rows.forEach((i,index)=>{        
                                        i.createTime = this.changeTime(i.createTime)
                                        i.endTime = this.changeTime(i.endTime)
                                        i.status = changeStatus(i.status)
                                         i.place = this.changeChannel(i.place)
                                    })
                                })
                        }
                    })
            },
            // 删除
            delectConfirm(){
                 let info = {id:this.cardDetail.id}
                 this.$http({
						method:'POST',
						url: this.allUrl.deletePrize,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                    
                        if(response.data.ret=='ok'){
                            this.$Message.success('删除');
                            this.get(this.allUrl.findPrizePage,{page:this.pageNum,rows:9,place:this.selectPlaceValue,name:this.searchInfo,status:this.model3,type:this.model2,beginTime:this.startTime_,finishTime:this.endTime_,beginTime2:this.startTime_2,finishTime2:this.endTime_2,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{
                                    this.data1 = res.data.rows;
                                    if(res.data.total){
                                            this.totalNum = res.data.total
                                        }else{
                                            this.totalNum = 0
                                        }
                                    res.data.rows.forEach((i,index)=>{        
                                        i.createTime = this.changeTime(i.createTime)
                                        i.endTime = this.changeTime(i.endTime)
                                        i.status = changeStatus(i.status)
                                        i.place = this.changeChannel(i.place)
                                    })
                                })
                        }
                    })
            }
            
            },
           
        beforeMount() {
             this.get(this.allUrl.findPrizePage,{page:1,rows:9,whichProperty:"weight",ascDesc:this.model4}).then((res)=>{
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                     i.endTime = this.changeTime(i.endTime)
                     i.status = changeStatus(i.status)
                     i.place = this.changeChannel(i.place)
                })
            })
            this.get(this.allUrl.findPlaceList).then((res)=>{
            	console.log(res)
                this.placeList = res.data.data;
             
            })
        },
    }

    function changeStatus(param) { 
        var info = ''
        switch(param){
             case 0:
              info = '上架'
            break;
            case 1:
              info = '下架'
            break;
            case 2:
              info = '待上架'
            break;
        }
        return info;
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
    
            line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 5px;margin-right: 5px;}
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