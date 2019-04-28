<template>
    <div class="shareDiscount">
        <div class="title">发布优惠</div>
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
                  <div class="secTitle">卡券信息</div>
                  <Row>
                    <Col span="7" offset="1">
                        <FormItem :label="formItem.type=='优惠券'?'卡券名称    *':formItem.type=='福利红包'?'红包名称    *':'课程名称    *' ">
                            <Input v-model="formItem.name" placeholder="请输入名称"></Input>
                        </FormItem>  
                         <FormItem label="上架平台    *">
                            <Select v-model="formItem.platform">
                                <Option v-for="item in platform" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                             <Input v-model="formItem.platform" v-if="formItem.platform!='淘宝'&&formItem.platform!='天猫'&&formItem.platform!='京东'&&formItem.platform!='聚美优品'&&formItem.platform!='网易优选'"/>
                        </FormItem>       
                        <FormItem label="有效截止日期    *">
                            <DatePicker type="date" placeholder="请选择有效截止日期" :options="noToday" :value="formItem.endTime" @on-change="ChangeEndTime"></DatePicker>
                        </FormItem>    
                        <FormItem label="卡券详情样式    *">
                             <addpic @update="detailStyle" @remove="removeDe" :size='1'></addpic>
                        </FormItem>         
                        <FormItem label="领取人数     *">
                             <InputNumber v-model="formItem.receiveNum" placeholder="请输入默认领取人数" :min="0" :precision='0'></InputNumber>
                        </FormItem>           
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem :label="formItem.type=='优惠券'?'卡券特点   *':formItem.type=='福利红包'?'红包特点   *':'课程特点   *' ">
                            <Input v-model="formItem.feature" placeholder="请输入优惠券特点"></Input>
                        </FormItem>   
                        <FormItem label="有效起始日期   *">
                            <DatePicker type="date" placeholder="请选择有效起始日期" :options="noToday" :value="formItem.startTime" @on-change="ChangeStartTime"></DatePicker>
                        </FormItem>    
                        <FormItem label="卡券列表样式   *">
                              <addpic @update="listStyle" @remove="removelist" :size='1'></addpic>
                        </FormItem>   
                        <FormItem label="优惠简介   *">
                            <Input v-model="formItem.discountExplain" type="textarea" placeholder="请输入说明" />
                        </FormItem>   
                    </Col>
                </Row>
                <div style="margin-left:40px;"><Button size='large' type="primary" @click="addExp">添加领取说明</Button></div>
                <!-- 添加领取说明 -->
                 <div class="addInfo" v-for="(data,index) in this.formItem.receiveVoList">
                    <div class="proHeader">
	              	 	<div>领取说明 {{index+1}}</div>
	              	 	<div>----------------------------------------------------</div>
	              	 	<div @click="delateExp(index)"  v-if="formItem.receiveVoList.length>1"><span style="cursor:pointer;">删除</span></div>
	              	 </div>
                     <Row>
                    <Col span="7">
                        <FormItem label="领取说明   *">
                            <Input v-model="data.receiveExplain" type="textarea" placeholder="请输入领取说明" />
                        </FormItem>  
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="攻略图片">
                              <addpic @update="strategy(index)" @remove="removeStrategy(index)" :size='3'></addpic>
                        </FormItem>   
                    </Col>
                  </Row>
                 </div>

                <!-- 选择领取方式 -->
                    <div style="margin-left:40px;margin-top:20px;">
                        <Row>
                        <Col span="7">
                            <FormItem label="领取方式   *">
                                <Select v-model="formItem.receiveMode" @on-change="changeGet()">
                                    <Option v-for="item in getway" :value="item.label" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>  
                         </Col>
                         <Col span='7'>
                              <FormItem label="页面跳转方式   *" v-if="formItem.receiveMode=='单链接可跳转'||formItem.receiveMode=='多个链接'">
                                <Select v-model="formItem.pageTurn">
                                    <Option v-for="item in jumpway" :value="item.label" :key="item.value">{{ item.label }}</Option>
                                </Select>
                             </FormItem>   
                         </Col>
                        </Row> 
                    </div>
                <!-- 领取方式一 单个链接可跳转 -->
                <div v-if="formItem.receiveMode=='单链接可跳转'">
                   <Row>
                    <Col span="7">
                      <FormItem label="链接地址    *">
                             <Input v-model="formItem.linkVoList[0].linkAddress" type="textarea" placeholder="请输入链接地址" />
                        </FormItem>   
                    </Col>
                    <Col span="7" offset="2">
                  
                    </Col>
                  </Row>
                 </div>
                 <!-- 领取方式二 单个链接不可跳转 -->
                <div v-if="formItem.receiveMode=='单链接不可跳转'">
                   <Row>
                    <Col span="7">
                      <FormItem label="链接地址   *">
                             <Input v-model="formItem.linkVoList[0].linkAddress" type="textarea" placeholder="请输入链接地址" />
                        </FormItem>   
                    </Col>
                    <Col span="7" offset="2">
                    </Col>
                  </Row>
                 </div>
                 <!-- 领取方式三  多个链接 -->
                <div v-if="formItem.receiveMode=='多个链接'">
                    <Row>
                    <Col span="7" offset="1">
                       
                    </Col>                 
                  </Row>           
                <div style="margin-left:40px;margin-top:20px;"><Button size='large' type="primary" @click="addLink">添加领取链接</Button></div>
                 <div class="addInfo" v-for="(data,index) in this.formItem.linkVoList ">
                    <div class="proHeader">
	              	 	<div>链接 {{index+1}}</div>
	              	 	<div>----------------------------------------------------</div>
	              	 	<div @click="delateLink(index)" v-if="formItem.linkVoList.length>1"><span style="cursor:pointer;">删除</span></div>
	              	 </div>
                     <Row>
                    <Col span="7">
                        <FormItem label="领取平台   *">
                             <Input v-model="data.recivePlatform"  placeholder="请输入领取平台" />
                        </FormItem>   
                        <FormItem label="链接地址   *">
                             <Input v-model="data.linkAddress" type="textarea" placeholder="请输入链接地址" />
                        </FormItem>   
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="链接说明   *">
                             <Input v-model="data.linkExplain"  placeholder="请输入链接说明" />
                        </FormItem> 
                        <FormItem label="logo   *">
                              <addpic @update="logo(index)" @remove="removeLogo(index)" :size='3'></addpic>
                        </FormItem>   
                    </Col>
                  </Row>
                 </div>
                 </div>


                 <!-- **********************优惠信息************************* -->
                 <div class="secTitle">优惠信息</div>
                    <Row>
                    <Col span="7" offset="1">
                        <FormItem label="优惠类型">
                            {{this.formItem.type}}
                        </FormItem>  
                        <FormItem label="预约下架时间   *">
                            <DatePicker type="date" placeholder="请预约下架时间" :options="noToday" :value="formItem.theShelvesTime" @on-change="soldOutTime"></DatePicker>
                        </FormItem>  
                        <FormItem label="用户反馈形式   *">
                             <Select v-model="formItem.userFeedbackMode">
                                <Option v-for="item in userFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>  
                        <FormItem label="商户反馈形式   *">
                            <Select v-model="formItem.tenantFeedbackMode">
                                <Option v-for="item in tenantFeedback" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>  
                        <FormItem label="备注">
                            <Input v-model="formItem.remark" type="textarea" placeholder="请输入备注" />
                        </FormItem> 
                        
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="预约上架时间   *">
                            <DatePicker type="date" placeholder="请预约上架时间" :options="noToday" :value="formItem.shelvesTime" @on-change="putawayTime"></DatePicker>
                        </FormItem>
                         <FormItem label="设定投放时间段   *">
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
                        <FormItem label="用户反馈说明   *">
                            <Input v-model="formItem.userFeedbackExplain" type="textarea" placeholder="请输入用户反馈说明" />
                        </FormItem> 
                        <FormItem label="商户反馈说明   *">
                            <Input v-model="formItem.tenantFeedbackExplain" type="textarea" placeholder="请输入商户反馈说明" />
                        </FormItem> 
                    </Col>
                  </Row>
             </Form>

               <div style="width:100%;padding-left:40%;margin-top:50px;"><Button type="primary" style="width:120px;height:40px;" @click="save">保存</Button></div>

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
            		flag:true,
            		flag2:true,
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
                    receiveNum:0,
                    // 优惠券Id
                    id:'',
                    // 商户ID
                    tenantId:'',
                    tenantName:'',
                    // 优惠券名称
                    name:'',
                    // 卡券特点
                    feature:'',
                    // 优惠类型
                    type:'',
                    // 上架平台
                    platform:'',
                    // 有效起始日期
                    startTime:'',
                    // 有效截止日期
                    endTime:'',
                    // 卡券列表url
                    status:'1',
                    cardListPic:'',
                    // 卡券详情url
                    cardDetailPic:'',
                    //优惠简介
                    discountExplain:'',
                    // 领取说明
                     receiveVoList:[{discountId :'',id :'',receiveExplain :'',strategyPic :[]}],
                    // 领取链接
                     linkVoList :[{discountId :'',id:'',linkAddress:'',logo:[],linkExplain:'',recivePlatform:''}],
                    // 页面跳转方式
                    pageTurn:'H5',
                    // 预约下架时间
                    theShelvesTime:'',
                    // 预约上架时间
                    shelvesTime:'',
                    // 投放时间段
                    putInTime:'',
                    // 用户反馈形式
                    userFeedbackMode:'',
                    // 商户反馈形式
                    tenantFeedbackMode:'',
                    // 备注
                    remark:'',
                    // 用户反馈说明
                    userFeedbackExplain:'',
                    // 商户反馈说明
                    tenantFeedbackExplain:'',
                    // 领取方式
                    receiveMode:'单链接可跳转'
                },
                // 领取方式选项
                 getway:[{
                         value: '单链接可跳转',
                        label: '单链接可跳转'
                        },
                        {
                         value: '单链接不可跳转',
                        label: '单链接不可跳转'
                        },
                        {
                         value: '多个链接',
                        label: '多个链接'
                        },
                        {
                         value: '无链接',
                        label: '无链接'
                        }
                    ],
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
            // 添加领取说明
            addExp(){
                let a = {
                   discountId :'',id :'',receiveExplain :'',strategyPic :[]
                }
                this.formItem.receiveVoList.push(a)
            },
            // 删除领取说明
            delateExp(index){
              
                this.formItem.receiveVoList.splice(index,1)
            },
            // 添加领取链接
            addLink(){
                let a = {discountId :'',id:'',linkAddress:'',logo:[],linkExplain:'',recivePlatform:''}                
                this.formItem.linkVoList.push(a)
            },
            // 删除领取链接
            delateLink(index){
                this.formItem.linkVoList.splice(index,1)
            },
            // 获取卡片详情样式
            detailStyle(){
                this.formItem.cardDetailPic = this.$store.state.shareUrl.url;
            },
            // 删除卡片详情样式
            removeDe(){
                this.formItem.cardDetailPic = '';
            },
            // 获取卡片列表样式
            listStyle(){
                this.formItem.cardListPic = this.$store.state.shareUrl.url;
            },
            // 删除卡片列表样式
            removelist(){
                this.formItem.cardListPic = '';
            },
            // 获取攻略图片
            strategy(index){
                this.formItem.receiveVoList[index].strategyPic.push(this.$store.state.shareUrl.url);
            },
            // 删除当前攻略图片
            removeStrategy(index){
                // index对应第几个说明，delectIndex对应说明里的第几张图片
                let delectIndex = this.$store.state.imgIndex
                this.formItem.receiveVoList[index].strategyPic.splice(delectIndex,1)
            },
            // 获取logo图片
            logo(index){
                this.formItem.linkVoList[index].logo.push(this.$store.state.shareUrl.url);
            },
            // 删除当前logo图片
            removeLogo(index){
                let delectIndex = this.$store.state.imgIndex
                this.formItem.linkVoList[index].logo.splice(delectIndex,1)
            },
            // 保存表单
            save(){
            	this.flag = true;
            	this.flag2 = true;
              if (this.formItem.name ==""||this.formItem.platform==""||this.formItem.endTime ==""||this.formItem.cardDetailPic==""||this.formItem.feature == ""||this.formItem.startTime==""||this.formItem.cardListPic==""||this.formItem.discountExplain=="") {
                   this.$Message.warning('请将卡券信息填写完整，注意  * 字段');
                   return
              }
             
              if(this.formItem.receiveVoList.length!==0){
              	let that =this;
              		that.formItem.receiveVoList.forEach(function(i,index){
              			if (i.receiveExplain == "") {
              		that.$Message.warning('请将领取说明填写完整，注意  * 字段');
              				that.flag = false;
              			}
              		})
              }
	              if (this.formItem.receiveMode == "") {
	              		this.$Message.warning('请选取领取方式');
	              		return;
	              }
	          	if(this.formItem.receiveMode == "单链接可跳转"){
	              		if (this.formItem.pageTurn==""||this.formItem.linkVoList[0].linkAddress =="") {
	              		this.$Message.warning('请选取页面跳转方式以及链接地址');
	              		return;
	              		 }
	              	}
          		if(this.formItem.receiveMode == "单链接不可跳转"){
              		if (this.formItem.linkVoList[0].linkAddress =="") {
              		this.$Message.warning('请填写链接地址');
              		return;
              		 }
              	}
              	 if(this.formItem.receiveMode == "多个链接"){//动态添加的还没有判断
              		if (this.formItem.pageTurn=="") {
              		this.$Message.warning('请选择页面跳转方式');
              		return;
              		 }
              		let that = this;
              		that.formItem.linkVoList.forEach(function(i,index){
              			if (i.recivePlatform == ""||i.linkExplain==""||i.logo==""||i.linkAddress == "") {
              					that.$Message.warning('请将领取链接填写完整');
              					that.flag2 = false
              			}
              		})
              	}
              
               if (this.formItem.theShelvesTime==""||this.formItem.userFeedbackMode==""||this.formItem.tenantFeedbackMode==""||this.formItem.shelvesTime==""||this.week==""||this.hour[0]==""||this.formItem.userFeedbackExplain==""||this.formItem.tenantFeedbackExplain=="") {
              	this.$Message.warning('请将优惠信息填写完整，注意  * 字段');
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
                   return;
               }
               if(this.flag == true&& this.flag2 ==true){
                   this.formItem.putInTime = this.week.join(',')+'*'+this.hour.join('-')
                    this.formItem.receiveVoList.map((data)=>{
                        if(typeof(data.strategyPic)!=="string"){
                            data.strategyPic = data.strategyPic.join(',')
                        }
                    })
                        this.formItem.linkVoList.map((data)=>{
                            if(typeof(data.logo)!=="string"){
                                data.logo = data.logo.join(',')
                            }
                        })
                    var forms = JSON.stringify(this.formItem)
                this.$http({
						method:'POST',
						url: this.allUrl.addDiscount,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:forms
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret == 'ok'){
                           
                             this.$Message.success('保存成功！');
                             this.$store.state.discountId = response.data.data.discountId
                                this.$router.push({path:'/readDiscount',
                                            query: {
                                                tenantId:this.$route.query.tenant
                                            }
                                         })
                        }else{
                            this.$Notice.warning({
                                title: 'warning',
                                desc: '保存失败！'
                            });
                            // 刷新当前页面
                            // this.$router.go(0)
                        }
                        
                    })
               }

               

            },
            // 改变领取方式时，将数据清空
            changeGet(){
                this.formItem.linkVoList =[{discountId :'',id:'',linkAddress:'',logo:[],linkExplain:'',recivePlatform:''}]              
                if(this.formItem.receiveMode == '单链接可跳转'||this.formItem.receiveMode == '多个链接'){
                     this.formItem.pageTurn = 'H5';
                }else{
                    this.formItem.pageTurn = '';
                }
            }
            
        },
        updated() {
            
        },
        beforeMount () {
             let query = this.$route.query;
             this.formItem.type = query.type;
             this.formItem.tenantId = query.tenant;
             this.get(this.allUrl.findProperty,{tenantId:query.tenant}).then((res)=>{
                this.formItem.tenantName = res.data.data.tenant.name;
                this.tenant = res.data.data.tenant;
                this.platform = res.data.data.platform;
                this.userFeedback = res.data.data.userFeedback;
                this.tenantFeedback = res.data.data.tenantFeedback;
            })

        }
      
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
</style>