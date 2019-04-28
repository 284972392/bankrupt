<template>
    <div class="shareDiscount">
        <div class="title">发布划算</div>
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
             <Form :model="formItem" :label-width="130" class="form">
                  <div class="secTitle">商品信息</div>
                  <Row>
                    <Col span="7" offset="1">
                        <FormItem label="商品名称     *">
                            <Input v-model="formItem.name" placeholder="请输入商品名称"></Input>
                        </FormItem>  
                         <FormItem label="商品原价     *">
                             <InputNumber v-model="formItem.price " placeholder="请输入商品原价" ></InputNumber>
                        </FormItem>       
                        <FormItem label="上架平台     *">
                            <Select v-model="formItem.platform">
                                <Option v-for="item in platform" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                             <Input v-model="formItem.platform" v-if="formItem.platform!='淘宝'&&formItem.platform!='天猫'&&formItem.platform!='京东'&&formItem.platform!='聚美优品'&&formItem.platform!='网易优选'"/>
                        </FormItem>     
                         <FormItem label="有效截止日期     *">
                            <DatePicker type="date" placeholder="请选择有效截止日期" :options="noToday" :value="formItem.endTime" @on-change="ChangeEndTime"></DatePicker>
                        </FormItem>    
                         <FormItem label="页面跳转方式     *">
                                <Select v-model="formItem.pageTurn">
                                    <Option v-for="item in jumpway" :value="item.label" :key="item.value">{{ item.label }}</Option>
                                </Select>
                             </FormItem>    
                        <FormItem label="销量     *">
                             <InputNumber v-model="formItem.sales" placeholder="请输入默认销量" :min="0" :precision='0'></InputNumber>
                        </FormItem>               
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem :label="formItem.type=='购买券'?'券后价     *':formItem.type=='0元购'?'统一价     *':'特卖价     *' ">
                            <InputNumber v-if="formItem.type!=='0元购'" v-model="formItem.preferentialPrice" placeholder="请输入券后价" ></InputNumber>
                            <InputNumber v-if="formItem.type=='0元购'" readonly v-model="formItem.preferentialPrice" placeholder="请输入券后价" ></InputNumber>
                        </FormItem>    
                        <FormItem label="购买券金额     *">
                            <InputNumber v-model="formItem.buyTicketPrice" placeholder="请输入购买券金额"  readonly></InputNumber>
                        </FormItem>    
                        <FormItem label="有效起始日期     *">
                              <DatePicker type="date" placeholder="请选择有效起始日期" :options="noToday" :value="formItem.startTime" @on-change="ChangeStartTime"></DatePicker>
                        </FormItem>   
                        <FormItem label="商品列表样式     *">
                            <lazy :time='200'>
                            <addpic @update="listStyle" @remove="removelist" :size='1' :defaultPic="formItem.productListPic"></addpic>
                             </lazy>
                        </FormItem>   
                        <FormItem label="购买链接     *">
                            <Input v-model="formItem.buyLink" type="textarea" placeholder="请输入购买链接" />
                        </FormItem> 
                    </Col>
                </Row>
              

                 <!-- **********************划算信息************************* -->
                 <div class="secTitle">划算信息</div>
                    <Row>
                    <Col span="7" offset="1">
                        <FormItem label="划算类型">
                            {{this.formItem.type}}
                        </FormItem>  
                        <FormItem label="预约下架时间     *">
                            <DatePicker type="date" placeholder="请预约下架时间" :options="noToday" :value="formItem.theShelvesTime" @on-change="soldOutTime"></DatePicker>
                        </FormItem>  
                        <FormItem label="用户反馈形式     *">
                             <Select v-model="formItem.userFeedbackMode">
                                <Option v-for="item in userFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>  
                        <FormItem label="商户反馈形式     *">
                            <Select v-model="formItem.tenantFeedbackMode">
                                <Option v-for="item in tenantFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>  
                        <FormItem label="备注">
                            <Input v-model="formItem.remark" type="textarea" placeholder="请输入备注" />
                        </FormItem> 
                        
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="预约上架时间     *">
                            <DatePicker type="date" placeholder="请预约上架时间" :options="noToday" :value="formItem.shelvesTime" @on-change="putawayTime"></DatePicker>
                        </FormItem>
                          <FormItem label="设定投放时间段     *">
                            <Row>
                                <Col span="13">
                                    <Select v-model="week" multiple style="width:220px">
                                        <Option v-for="item in weekSelect" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col span="7" offset="2">
                                     <TimePicker v-model="hour" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                                </Col>
                            </Row> 
                        </FormItem>
                        <FormItem label="用户反馈说明     *">
                            <Input v-model="formItem.userFeedbackExplain" type="textarea" placeholder="请输入用户反馈说明" />
                        </FormItem> 
                        <FormItem label="商户反馈说明     *">
                            <Input v-model="formItem.tenantFeedbackExplain" type="textarea" placeholder="请输入商户反馈说明" />
                        </FormItem> 
                    </Col>
                  </Row>
             </Form>

               <div style="width:100%;padding-left:40%;margin-top:50px;"><Button type="primary" style="width:120px;height:40px;" @click="save">保存</Button></div>

    </div>
</template>

<script>
    import lazy from "@/common/plLazy";
    import addpic from '@/common/update'
    export default {
        components:{
            addpic,
            lazy
        },
        name:'add_discount',
        data(){
            return{
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
                noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                tenant:'',
                formItem:{
 
                },
                // 页面跳转方式选项
                jumpway:[{
                         value: 'H5',
                        label: 'H5'
                        },
                        {
                         value: 'App',
                        label: 'App'
                        }
                    ],
                // 上架平台选项
                platform:[],
                // 用户反馈形式选项
                userFeedback:[],
                // 商户反馈形式
                tenantFeedback:[]
            }
        },
        methods: {
            ChangeStartTime(data){
                this.formItem.startTime = data;
            },
            ChangeEndTime(data){
                this.formItem.endTime = data;
            },
            soldOutTime(data){
                this.formItem.theShelvesTime = data;
            },
            putawayTime(data){
                this.formItem.shelvesTime = data;
            },
            // 获取卡片列表样式
            listStyle(){
                this.formItem.productListPic  = this.$store.state.shareUrl.url;
            },
            // 删除卡片列表样式
            removelist(){
                this.formItem.productListPic  = '';
            },
            // 保存表单
            save(){
               if (this.formItem.name ==""||this.formItem.price==""||this.formItem.platform==""||this.formItem.endTime==""||this.formItem.pageTurn==""||this.formItem.startTime == ""||this.formItem.productListPic==""||this.formItem.buyLink =="") {
                   this.$Message.warning('请完善商品信息表单，注意带 * 号的字段');
             		return;
             	}
             if (this.formItem.theShelvesTime==""||this.formItem.userFeedbackMode==""||this.formItem.tenantFeedbackMode==""||this.formItem.shelvesTime==""||this.week==""||this.hour[0]==""||this.formItem.userFeedbackExplain==""||this.formItem.tenantFeedbackExplain=="") {
              	this.$Message.warning('请将划算信息填写完整，注意  * 字段');
                   return
              }
	             let c = new Date(this.formItem.startTime).getTime()
	               let d = new Date(this.formItem.endTime).getTime() 
	               if(c > d){
	                   this.$Message.warning('有效起始时间不能大于截止时间!');
	                   return;
	               }
                 let a = new Date(this.formItem.shelvesTime).getTime()
               let b = new Date(this.formItem.theShelvesTime).getTime() 
               if(a > b){
                   this.$Message.warning('上架时间不能大于下架时间!');
               }else if(this.week==''||this.hour[0]==''||this.formItem.shelvesTime==''||this.formItem.theShelvesTime==''){
                   this.$Message.warning('请输入投放时间及上下架时间!');
               }else{
                    this.formItem.putInTime = this.week.join(',')+'*'+this.hour.join('-')

                   var forms = JSON.stringify(this.formItem)

                this.$http({
						method:'POST',
						url: this.allUrl.updateBargain,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:forms
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret == 'ok'){                 
                             this.$Message.success('保存成功！');
                             this.$store.state.discountId = this.formItem.id
                             let dd = this.formItem.tenantId
                                this.$router.push({path:'/readBargain',
                                            query: {
                                                tenantId:dd
                                            }
                                         })
                                                  
                        }else{
                            this.$Notice.warning({
                                title: 'warning',
                                desc: '保存失败！'
                            });                  
                        }


                    })
               }
                

            }
  
            
        },
         watch: {
          formItem: {
        　　　　handler(newValue, oldValue) {

        　　　　},
        　　　　deep: true
        　　},
          'formItem.price':function(val,oldval){
                 this.formItem.buyTicketPrice = val - this.formItem.preferentialPrice
            },
           'formItem.preferentialPrice':function (val,oldval) {
               this.formItem.buyTicketPrice = this.formItem.price - val
             }
        },
        updated() {
            
        },
        beforeMount () {
             let query = this.$route.query
            this.get(this.allUrl.findBargainPro,{tenantId:query.tenantId}).then((res)=>{
                  console.log(res)
                this.tenant = res.data.data.tenant;
                this.platform = res.data.data.platform;
                this.userFeedback = res.data.data.userFeedback;
                this.tenantFeedback = res.data.data.tenantFeedback;
            })
              this.get(this.allUrl.findBargain,{bargainId:query.id}).then((res)=>{
                  console.log(res)
                this.formItem = res.data.data;
                this.formItem.endTime = timestampToTime(this.formItem.endTime)
                this.formItem.shelvesTime = timestampToTime(this.formItem.shelvesTime)
                this.formItem.startTime = timestampToTime(this.formItem.startTime)
                this.formItem.theShelvesTime = timestampToTime(this.formItem.theShelvesTime)
              
                this.week = this.formItem.putInTime.split('*')[0].split(',')
                this.hour = this.formItem.putInTime.split('*')[1].split('-')
                   if(res.data.data.status == '3'){
                            this.$Modal.confirm({
                                title: '修改任务',
                                content: '<p>审核人员:&nbsp;&nbsp;'+this.formItem.checkPerson+'</p><p>审核时间:&nbsp;&nbsp;'+timestampToTime(this.formItem.updateTime)+'</p><P>审核不通过—原因:&nbsp;&nbsp;'+this.formItem.failReason+'</P>'
                            });
                    }else if(res.data.data.status == '6'){

                        this.$Modal.confirm({
                                title: '修改任务',
                                content: '<p>暂停时间:&nbsp;&nbsp;'+ timestampToTime(this.formItem.updateTime) +'</p><P>暂停原因:&nbsp;&nbsp;'+this.formItem.failReason+'</P>'
                            });
                    }

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
            line-height: 51px;height: 51px;width: 100%;
            padding-left: 40px;font-size: 28px;
            text-align: left;border-bottom:1px solid #000000;
        }
        .secTitle{
            padding-left: 5px;font-size: 20px;text-align: left;
            margin-left: 30px;margin-top: 10px;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
            .add{height: 30px;}
        }
    }
      .ivu-input-number{
        width: 100% !important;
    }
</style>