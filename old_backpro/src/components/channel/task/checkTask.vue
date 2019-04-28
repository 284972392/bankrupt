<template>
    <div class="shareDiscount">
        <div class="title"> 
            <p>审核任务<span>{{result}}</span></p>
            <div style="width:300px;display:flex;padding-top:15px;" v-if="isShow">
                <Button type="primary" class="change" style="width:80px;height:40px;margin-top:5.5px;" @click="pass">通过</Button>
                <Button type="primary" class="change2" style="width:80px;height:40px;margin-top:5.5px;margin-left:10px;" @click="noPass">不通过</Button>
            </div>
        </div>
       <Form :model="formItem" :label-width="130" class="form">
        <Tabs>
                <!-- ************************************** -->
                <TabPane label="应用信息">
                <div class="secTitle">商户基本信息</div>
          <Row class="basic_info">
               <Col span="12">
                <p>商户名称<span>{{tenant.name}}</span></p>
                <p>商户编号<span>{{tenant.id}}</span></p>
             </Col>
             <Col span="12" offset="0">
                  <p>商户类型<span>{{tenant.type=='0'?"企业商户":"个人商户"}}</span></p>    
                  <p>当前余额<span>{{tenant.balance}}元</span></p>  
              </Col>
          </Row>
            
                  <div class="secTitle">注册信息</div>
                  <Row>
                    <Col span="7" offset="1">
                          <FormItem label="产品名称">
                                {{this.formItem.name}}
                        </FormItem>  
                        <FormItem label="有效截止日期">
                            {{this.formItem.endTime}}
                        </FormItem>    
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="有效起始日期">
                            {{this.formItem.startTime}}
                       </FormItem>  
                    </Col>
                </Row>
                </TabPane>
                <!-- ************************************** -->
                <TabPane label="任务信息">
                      <div class="secTitle">任务信息</div>
                    <Row>
                    <Col span="7" offset="1">
                       <FormItem label="任务类型">
                           {{this.formItem.type}}
                            
                        </FormItem> 
                        <FormItem label="任务数量">
                             {{this.formItem.taskNum}}
                        </FormItem>  
                        <FormItem label="用户手机型号">
                            {{this.formItem.version}}
                        </FormItem>  
                         <FormItem label="预约上架时间">
                              {{this.formItem.shelvesTime}}
                        </FormItem>                    
                        <FormItem label="备注">
                             {{this.formItem.remark}}
                        </FormItem> 
                      
                        <FormItem label="任务特点">
                            {{this.formItem.taskCharacteristics}}
                        </FormItem> 
                         
                    </Col>
                    <Col span="7" offset="2">
                         <FormItem label="任务单价">
                              {{this.formItem.singlePrice}}
                        </FormItem>  
                        <FormItem label="任务总价">
                             {{this.formItem.totalPrice}}
                        </FormItem>  
                        <FormItem label="预约下架时间">
                            {{this.formItem.theShelvesTime}}
                        </FormItem>  
                        <FormItem label="注意事项说明">
                            {{this.formItem.cation}}
                        </FormItem> 
                           <FormItem label="设定投放时间段">
                                {{this.formItem.putInTime}}
                         </FormItem>
                    </Col>
                  </Row>
                </TabPane>
                <!-- ************************************** -->
                <TabPane label="步骤信息">
                    <div class="addInfo" v-for="(data,index) in this.formItem.taskStepVoList">
                    <div class="proHeader">
	              	 	<div>步骤 {{index+1}}</div>
	              	 </div>
                     <Row>
                    <Col span="7">
                        <FormItem label="步骤类型">
                            {{data.stepType==1?'注册步骤':data.stepType==2?'试玩步骤':'使用步骤'}}
                        </FormItem>
                        <FormItem label="步骤说明">
                            {{data.stepExplain}}
                        </FormItem>  
                         <FormItem label="任务链接地址">
                             {{data.taskLink}}
                        </FormItem>   
                 
                     
                         <FormItem label="审核时间">
                             {{data.auditTime}}
                        </FormItem>  

                    </Col>
                    <Col span="7" offset="2">
                         <FormItem label="分步骤单价">
                             {{data.stepPrice}}元
                        </FormItem>  
                        
                         <FormItem label="备注">
                             {{data.remark}}
                        </FormItem> 
                          <FormItem label="攻略图片">
                              <span v-for="info in data.strategyPic">
                                <img :src="info" alt="" @click="viewImg(info)" style="cursor:pointer;height:60px;width:60px;">
                             </span>
                         </FormItem>   
                       
                    </Col>
                  </Row>
                 </div>
                </TabPane>
                <!-- ************************************** -->
                <TabPane label="反馈信息">
                     <div class="addInfo" v-for="(data,index) in this.formItem.taskStepVoList">
                        <div class="proHeader">
                            <div>步骤 {{index+1}}</div>
                        </div>
                        <Row>
                            <Col span="7">
                                <p v-for="(msg,index) in data.userFeedbackMode">
                                     <FormItem label="用户反馈形式">
                                    <span style="color:red;">{{index+1}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{msg.info}}
                                    </FormItem> 
                                </p>
                               
                                <FormItem label="商户反馈形式">
                                    {{data.tenantFeedbackMode}}
                                </FormItem>  
                            </Col>
                            <Col span="7" offset="2">
                                <p v-for="msg in data.userFeedbackExplain">
                                    <FormItem label="用户反馈说明">
                                    <span style="color:red;">{{index+1}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{msg.info}}
                                    </FormItem> 
                                </p>
                                 
                                <FormItem label="商户反馈说明">
                                    {{data.tenantFeedbackExplain}}
                                </FormItem> 
                            </Col>
                        </Row>
                     </div>
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

         <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>

    
    </div>
</template>

<script>
    import addpic from '@/common/update'
    export default {
        components:{
            addpic
        },
        name:'add_discount',
        data(){
            return{
                visible:false,
                imgName:'',
                result:'',
                nogo:false,
                go:false,
                nogoAgin:false,
                isShow:true,
                tenant:'',
                taskId:'',
                nogoReson:'',
                formItem:{
              
                }
            }
        },
        methods: {
            viewImg(info){
                this.visible = true;
                this.imgName = info;
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
                                id:this.formItem.id,
                                status:'5',
                                failReason:this.nogoReson
                            }
					}).then((response)=>{
                        console.log(response)
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
                                id:this.formItem.id,
                                status:'6',
                                failReason:''
                            }
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret == 'ok'){
                            this.$Message.success('审核通过');
                            this.result = '审核通过';
                            this.isShow = false;           
                        }
                    })
            }
         
        },
        updated() {
             

        },
        mounted() {
             this.get(this.allUrl.findTask,{taskId:this.taskId}).then((res)=>{
                 console.log(res)
                this.formItem = res.data.data;
                  this.formItem.taskStepVoList.map((data)=>{
                    data.strategyPic  = data.strategyPic.split(',')
                    data.auditTime = timestampToTime(data.auditTime)
                    if(data.userFeedbackExplain){
                               let a = data.userFeedbackExplain.split('%@$%')
                                            a.map((val,index)=>{
                                                        a[index] = {info:val}
                                                    })
                                    data.userFeedbackExplain = a;
                           }
                           if(data.userFeedbackMode){
                               let b = data.userFeedbackMode.split(';')
                                     b.map((val,index)=>{
                                                        b[index] = {info:val}
                                                    })
                                    data.userFeedbackMode = b;
                           }     
                })
                this.formItem.endTime = timestampToTime(this.formItem.endTime)
                this.formItem.shelvesTime = timestampToTime(this.formItem.shelvesTime)
                this.formItem.startTime = timestampToTime(this.formItem.startTime)
                this.formItem.theShelvesTime = timestampToTime(this.formItem.theShelvesTime)
                this.formItem.auditTime = timestampToTime(this.formItem.auditTime)
            })
        },
        beforeMount () {
            let query = this.$route.query;
            this.taskId = this.$store.state.discountId;
             this.get(this.allUrl.findTaskProperties,{tenantId:query.tenantId}).then((res)=>{
                this.tenant = res.data.data.tenant;
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

<style scoped lang='scss'>
    .shareDiscount{
        position: relative;
        width: 100%;
        height: 97%;
        overflow-y: auto;
        text-align: left;
        padding-bottom: 80px;
        .proHeader{
            		padding-left: 40px;
            		width: 800px;
            		height: 50px;
            		line-height: 50px;
            		display: flex;
            		div:nth-child(1){
            			color: #222222;
            			font-size: 15px;
            		}
            		div:nth-child(2){
            			width: 300px;
						text-align: center;
            		}
            		div:nth-child(3){
            			width: 100px;
            			display: flex;
            			justify-content: space-between;
						text-align: center;
						color: blue;
            		}
            	}
            .addInfo{
                margin-top:30px;padding-left:50px;border-bottom: 1px solid darkcyan;
            }
        .basic_info{
            div{width: 30%;}
        }
        
        .form{
            color: #000000;
            
        }
        p{color: #000000;padding-left: 50px;
            span{margin-left: 20px;}}
         .title{
            height: 80px;width: 100%;line-height: 80px;
            position: relative;
            text-align: left;border-bottom:1px solid #000000;
            display: flex;justify-content: space-between;
            padding-right: 40px;padding-left:40px;
            p{ padding-left: 40px;font-size: 28px;line-height: 80px;
                span{font-size: 20px;margin-left: 30px;}
                }
        }
        .secTitle{
            padding-left: 5px;font-size: 20px;text-align: left;
            margin-left: 30px;margin-top: 10px;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
            .add{height: 30px;}
        }
          .change{
            margin-left: 40%;margin-top: 20px;
        }
    }
    .ivu-input-number{
        width: 100% !important;
    }
      .change{
            margin-left: 30%;margin-top: 20px;
        }
        .change2{
            margin-left: 4%;
            margin-top: 20px;
        }
</style>