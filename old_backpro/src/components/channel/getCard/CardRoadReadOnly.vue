<template>
	<div class="CardRoadReadOnly">
      <Form  :label-width="100" class="form">
		<div class="Roadheader">
			<span>发布任务</span>
          	 <Button type="primary" @click="Sub" v-if="isCheck">提交</Button>
		</div>
		<!--<div class="merMessage">
			<h2>商户基本信息</h2>
			<div class="merZiduan">
				<div><span>商户名</span><span>{{background.name}}</span></div>
				<div><span>商户类型</span><span>{{type}}</span></div>
				<div><span>商户编号</span><span>{{background.id}}</span></div>
				<div><span>当前余额</span><span>{{background.balance}}</span></div>
			</div>
		</div>
		<div class="cardMessage">
			<h2>卡片信息</h2>
          	
          	 <div class="cardBox" v-for="(card,index) in allForm.cardInfoVoList">
          	 	<div class="title">
          	 		<span>卡片{{index+1}}</span>
          	 	</div>
          	 	<Row>
                    <Col span="8" offset="1">
                       <FormItem label="卡片名称">
                      	 	{{card.cardName}}
                        </FormItem>  
                        <FormItem label="卡片数量" >
                         {{card.cardNum}}
                        </FormItem>
                        <FormItem label="有效截止日期">
                        	{{card.endTime}}
                        </FormItem>                    
                        
                    </Col>
                    <Col span="8" offset="2">
                    	<FormItem label="卡片单价">
                    		{{card.cardPrice}}
                        </FormItem>
                        <FormItem label="卡片总价">
                        	{{card.cardTotal}}
                        </FormItem>
                        <FormItem label="有效起始日期">
                        	{{card.createTime}}
                        </FormItem>                
                    </Col>
                 </Row>                
          	 </div>
		</div>
		
		<div class="messionMessage">
			<h2>任务信息</h2>
			<Row>
                    <Col span="6" offset="1">
                       <FormItem label="卡片名称">
                    			       办卡类
                        </FormItem>  
                        <FormItem label="预约下架时间">
                        	{{allForm.theShelvesTime }}
                        </FormItem>
                        <FormItem label="注意事项说明">
                        	{{allForm.cation }}
                        </FormItem>
						 <FormItem label="任务特点">
                            {{allForm.taskCharacteristics}}
                        </FormItem> 
                        
                    </Col>
                    <Col span="7" offset="2">
                    	<FormItem label="预约上架时间">
                    		{{allForm.shelvesTime }}
                        </FormItem>
                        <FormItem label="设定投放时间段">
                            {{allForm.putInTime }}
                        </FormItem>
                        <FormItem label="备注">
                        	{{allForm.remark}}
                        </FormItem>
                    </Col>
                 </Row>
              
              <div class="strategyBox" v-for="(strategy,index) in allForm.taskStepVoList">
          	 	<div class="title">
          	 		<span>攻略{{index+1}}</span>
          	 	</div>
          	 	<Row>
                    <Col span="6" offset="1">
                       <FormItem label="攻略说明">
                       	{{strategy.stepExplain}}
                        </FormItem>  
                        <FormItem label="用户反馈说明">
                        	{{strategy.userFeedbackExplain}}
                        </FormItem> 
                        <FormItem label="商户反馈说明">
                        	{{strategy.tenantFeedbackExplain}}
                        </FormItem> 
                        <FormItem label="备注">
                        	{{strategy.remark}}
                        </FormItem> 
                        
                    </Col>
                    <Col span="7" offset="2">
                    	<FormItem label="用户反馈形式">
                    		{{strategy.userFeedbackMode}}
                        </FormItem>  
                        <FormItem label="商户反馈形式">
                        	{{strategy.tenantFeedbackMode}}
                        </FormItem> 
                    	<FormItem label="办卡审核时间">
                    		{{strategy.checkDay}}
                        </FormItem>
                        <FormItem label="攻略图片">
                            <img v-if="src_ !== ''" v-for="(src_,index) in strategy.strategyPic" :src="src_" style="height:60px;width:60px;cursor:pointer;" @click="viewImg(src_)"/>
                        </FormItem> 
                    </Col>
                 </Row>
          	 </div>
		</div>-->
		<Tabs>
                <!-- ***************商户基本信息*********************** -->
            <TabPane label="应用信息">
                
		<div class="merMessage">
			
			<h2>商户基本信息</h2>
			<div class="merZiduan">
				<div><span>商户名</span><span>{{background.name}}</span></div>
				<div><span>商户类型</span><span>{{type}}</span></div>
				<div><span>商户编号</span><span>{{background.id}}</span></div>
				<div><span>当前余额</span><span>{{background.balance}}</span></div>
			</div>
		</div>
		<div class="cardMessage">
          	 <div class="cardBox" v-for="(card,index) in allForm.cardInfoVoList">
          	 	<div class="title">
          	 		<span>卡片{{index+1}}</span>
          	 	</div>
          	 	<Row>
                    <Col span="10" offset="1">
                       <FormItem label="卡片名称">
                       	{{card.cardName}}
                        </FormItem>  
                        <FormItem label="卡片数量" >
                           {{card.cardNum}} 
                        </FormItem>
                        <FormItem prop="endTime" label="有效截止日期">
                        	{{card.endTime}}
                            <!--<DatePicker type="date" v-model = "card.endTime" format="yyyy-MM-dd" placeholder="请选择有效截止日期" :options="noToday"  @on-change="soldOutTime(card)"></DatePicker>-->
                        </FormItem>                    
                        
                    </Col>
                    <Col span="10" offset="2">
                    	<FormItem prop="cardPrice" label="卡片单价">
                    		{{card.cardPrice}}
                            <!--<Input  type="text" v-model="card.cardPrice" @on-change="priceChange(card)"/>-->
            	 		<!--<InputNumber v-model="card.cardPrice" placeholder="单价"  @on-change="priceChange(card)"></InputNumber>-->
                            
                        </FormItem>
                        <FormItem label="卡片总价">
                            <!--<Input  type="text" readonly="readonly" v-model="card.cardTotal"/>-->
                            {{card.cardTotal}}
                        </FormItem>
                        <FormItem prop="createTime" label="有效起始日期">
                            <!--<DatePicker type="date" v-model = "card.createTime" placeholder="请选择有效起始日期" :options="noToday" :value="card.createTime" @on-change="putawayTime(card)"></DatePicker>-->
                            {{card.createTime}}
                        </FormItem>                
                    </Col>
                 </Row>
          	 </div>
		</div>
		 </TabPane>
                <!-- ****************任务信息********************** -->
        <TabPane label="任务信息">
		 

			<h2>任务信息</h2>
			<Row>
                    <Col span="6" offset="1">
                       <FormItem label="卡片类型">
                    			       办卡类
                        </FormItem>  
                        <FormItem prop="theShelvesTime" label="预约下架时间">
                            <!--<DatePicker v-model="allForm.theShelvesTime " type="date" placeholder="请预约下架时间" :options="noToday" :value="date" @on-change="soldOutTime2"></DatePicker>-->
                            {{allForm.theShelvesTime}}
                        </FormItem>
                        <FormItem prop="cation" label="注意事项说明">
                            <!--<Input  type="textarea" v-model="allForm.cation "/>-->
                            {{allForm.cation}}
                        </FormItem>
                           <FormItem prop="taskCharacteristics" label="任务特点">
                            <!--<Input v-model="allForm.taskCharacteristics" type="textarea" placeholder="请输入任务特点" />-->
                            {{allForm.taskCharacteristics}}
                        </FormItem> 
                    </Col>
                    <Col span="7" offset="2">
                    	<FormItem prop="shelvesTime" label="预约上架时间">
                            <!--<DatePicker v-model="allForm.shelvesTime " type="date" placeholder="请预约上架时间" :options="noToday" :value="date" @on-change="putawayTime2"></DatePicker>-->
                            {{allForm.shelvesTime}}
                        </FormItem>
                        <FormItem label="设定投放时间段 ">
								{{allForm.putInTime }}
                        </FormItem>
                        <FormItem label="办卡审核时间*">
                        	{{checkDay}}
                             <!--{{strategy.checkDay}}-->
                        </FormItem>
                        <FormItem label="备注">
                            <!--<Input  type="textarea" v-model="allForm.remark"/>-->
                            {{allForm.remark}}
                        </FormItem>
                    </Col>
                  </Row>
                </TabPane>  
                
                <!-- ****************步骤信息********************** -->
                <TabPane label="步骤信息">
             
              
              <div class="strategyBox" v-for="(strategy,index) in allForm.taskStepVoList">
          	 	<div class="title">
          	 		<span>攻略{{index+1}}</span>
          	 	</div>
          	 	<!--富文本-->
          	 	
          	 		<!--<div class="app-container calendar-list-container">
				        <div style="margin:0 5%; width: 90%;">
				          <editor
				            class="editor"
				            :value="content"
				            :setting="editorSetting"
				            @show="editors"
				            :url              = "Url"
				            :max-size         = "MaxSize"
				            :accept           = "Accept"
				            :with-credentials = "withCredentials"
				            @on-upload-fail         = "onEditorReady"
				            @on-upload-success= "onEditorUploadComplete"></editor>
				        </div>
 					 </div>-->
  				
              <Row>
              	<Col span="7">
              		<div id="stepExplain" v-html="strategy.stepExplain">
  					{{stepExplain}}
  					</div>
              	</Col>
              	<Col span="7">
              		<FormItem label="攻略图片">
                              <span v-for="info in strategy.strategyPic">
                                <img :src="info" alt="" @click="imgView(info)" style="cursor:pointer;">
                             </span>
                     </FormItem> 
              	</Col>
              </Row>
              </div>
                        
               </TabPane>    
                <!-- ****************反馈信息********************** -->
                <TabPane label="反馈信息">
          	 		<div class="proHeader">
                  </div>
                   <Row>
                                     <Col span="7">
                                     <div  v-for="(msg,num) in userFeedbackMode">
                                        <FormItem label="用户反馈形式">
                                            
                                            {{msg}}
                                        </FormItem>  
                                         </div>
                                    </Col>
                               
                        
                            <Col span="15" offset="1">
                              <div v-for="(msg,num) in userFeedbackExplain" style="display:flex;">
                                <FormItem label="用户反馈说明">
                                    
                                    {{msg}}
                                </FormItem> 
                                 </div>
                            </Col>
                             
                       
                            
                         </Row>
                         <Row>
                            <Col span="7"> 
                                <FormItem label="商户反馈形式       *">
                                   
                                    {{tenantFeedbackMode}}
                                </FormItem>  
                            </Col>
                            <Col span="7" offset="2">
                                
                                {{tenantFeedbackExplain}}
                            </Col>
                        </Row>
			 </TabPane>
		 </Tabs>
	</Form>
	      <Modal
            v-model="nogo"
            title="确认提交"
            @on-ok="nogoOk"
           >
        <Input v-model="nogoReson" type="textarea" placeholder="请输入不通过原因" />
        </Modal>
	<Modal
            v-model="go"
            title="确认提交"
            @on-ok="goOk"
           >
            <p>确认通过审核？</p>
        </Modal>

        <Modal
            v-model="nogoAgin"
            title="确认提交"
            @on-ok="noGo"
           >
            <p>确认不通过审核？</p>
        </Modal>
        <Modal
            v-model="sub"
            title="提交审核"
            @on-ok="subOk"
          >
            <p>确认提交至审核？</p>
        </Modal>

		 <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>

     <div v-if="isCheck" style="width:100%;padding-left:40%;margin-top:50px;"><Button type="primary" style="width:120px;height:40px;" @click="change">修改</Button></div>
     <div v-if="isShow" style="width:100%;padding-left:40%;margin-top:50px;">
     	<Button type="primary" style="width:120px;height:40px;" @click="pass">通过</Button>
     	<Button type="primary" style="width:120px;height:40px;" @click="noPass">不通过</Button>
     </div>
	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				stepExplain:'',
				checkDay:'',
				userFeedbackExplain:[],
				userFeedbackMode:[],
				tenantFeedbackMode:'',
				tenantFeedbackExplain:'',
				visible:false,
				imgName:'',
				sub:false,
				isShow:false,// 审核按钮就
				isCheck:true,//修改那妞
				type:'',
				background:{},
				allForm:{},
				nogoAgin:false,
				go:false,
				nogo:false,
				nogoReson:''
			}
		},
		methods:{
       	 imgView(data){
                this.visible = true;
                this.imgName = data;
           },
			Sub(){
				this.sub = true
			},
			subOk(){
				
                 this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.$route.query.taskId,
                                status:'2'
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success({
                                content:'提交成功',
                                duration: 5
                                });
                                this.isCheck =false;
                        }else{
                              this.$Message.error({
                                content:'提交失败',
                                duration: 5
                                });
                        }
                    })
            
			},
			change(){
            this.$router.push({path:'/channel/task/addCardRoad',query:{id:this.$route.query.merId,taskId:this.$route.query.taskId}})
			},
			 pass(){
                this.go = true;
            },
            noPass(){
                this.nogo = true;
            },
              nogoOk(){
                if(this.nogoReson == ''){
                      this.$Message.warning('请输入不通过原因');
                }else{
                    this.nogoAgin = true;
                }
            },
            noGo(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.$route.query.taskId,
                                status:'5',
                                failReason:this.nogoReson
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('审核不通过');
                            this.result = '审核不通过-原因:'+this.nogoReson;
                            this.isShow = false;           
                        }
                    })
            },
            goOk(){
                  this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.$route.query.taskId,
                                status:'6',
                                failReason:''
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('审核通过');
                            this.result = '审核通过';
                            this.isShow = false;           
                        }
                    })
            }
		},
		mounted(){
			if(this.$route.query.inWay == "审核"){
				this.isShow = true  
				this.isCheck = false
			}
			if(this.$route.query.inWay == "查看"){
				this.isShow = false
				this.isCheck = false
			}
			if(this.$route.query.inWay == "提交"){
				this.isShow = false
				this.isCheck = false
                this.$Message.success('提交成功');
				
			}
			//获取商户基本信息
			console.log(this.$route.query.merId)
			this.get(this.allUrl.findTenant,{tenantId:this.$route.query.merId}).then((res)=>{

						this.background = res.data.data
						if (this.background.type == "1") {
							this.type = "个人商户"
						}else{
							this.type = "企业商户"
						}		
            	})
			//根据taskId查询任务
			this.get(this.allUrl.findTask,{taskId:this.$route.query.taskId}).then((res)=>{
			this.allForm = res.data.data
			this.allForm.theShelvesTime =timestampToTime(this.allForm.theShelvesTime)
			this.allForm.shelvesTime = timestampToTime(this.allForm.shelvesTime)
			let that = this;
			 this.tenantFeedbackMode = this.allForm.taskStepVoList[0].tenantFeedbackMode
			 this.tenantFeedbackExplain = this.allForm.taskStepVoList[0].tenantFeedbackExplain
			this.userFeedbackExplain = this.allForm.taskStepVoList[0].userFeedbackExplain.split("%@$%")
			this.userFeedbackMode = this.allForm.taskStepVoList[0].userFeedbackMode.split(";")
			this.checkDay = this.allForm.taskStepVoList[0].checkDay
//			this.stepExplain = this.allForm.taskStepVoList[0].stepExplain
			that.allForm.cardInfoVoList.forEach(function(i){
						i.createTime = timestampToTime(i.createTime)
						i.endTime =timestampToTime(i.endTime)
						})
			that.allForm.taskStepVoList.forEach(function(i){
						i.strategyPic = i.strategyPic.split(',')
					})
			
			})
		}
	}
	 function timestampToTime(timestamp) {
        var date = new Date(timestamp);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
      
        return y + '-' + m + '-' + d; 
    }
</script>

<style scoped="" lang="scss">
h2{
			text-align: left;
			border-left:5px solid #007AFF;
			padding-left: 10px;
			margin-bottom: 20px;
		}
.CardRoadReadOnly{
	width: 100%;
	height: 96%;
	overflow-y: scroll;
	overflow-x:hidden ;
	text-align: left;
	.Roadheader{
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #cccccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40px;
		span{
			font-size: 18px;
		}
	}
	.merMessage{
		width: 100%;
		margin-top: 20px;
		padding-left: 60px;
		
		.merZiduan{
			padding: 0 50px;
			width: 100%;
			height: 100px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			font-size: 18px;
			div{
				width: 50%;
				display: flex;
				span{
					display: block;
				}
				span:nth-child(1){
					margin-right: 20px;
					width: 100px;
				}
				span:nth-child(2){
					color: #8C8C8C;
				}
			}
		}
	}
	.cardMessage{
		width: 100%;
		padding-left: 60px;
		.ivu-btn{
			margin-left: 50px;
		}
		.cardBox{
			border-bottom: 1px solid #CCCCCC;
			font-size: 18px;
			width: 100%;
			margin-top: 20px;
			.title{
				width: 100%;
				height: 40px;
				font-size: 18px;
				margin-left: 50px;
				display: flex;
				
			}
		}
	}
	.messionMessage{
		width: 100%;
		padding-left: 60px;
		.ivu-btn{
			margin-left: 50px;
		}
		.strategyBox{
			width: 100%;
			margin-top: 20px;
			.title{
				width: 100%;
				height: 40px;
				font-size: 18px;
				margin-left: 50px;
				display: flex;
			}
		}
	}
	}
	img{
		margin-right: 20px;
		width: 50px;
		height: 50px;
	}
	    .ivu-tabs-nav-scroll{
        padding-left: 40px;
        font-size: 18px;
        margin-top: 20px;
    }
    .ivu-tabs-tabpane{
        padding-left: 40px;
        font-size: 15px;
        color: #000;
    }
    .ivu-tabs{
        overflow: visible;
    }
</style>