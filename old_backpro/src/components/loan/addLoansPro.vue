<style>
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

<template>
    <div class="shareDiscount">
        <div class="title">
            <p>添加贷款项目</p>  

        </div>
        <div class="title2">
            基本信息
        </div>
        <div class="content">
            
             <Form :model="formItem" :label-width="120" class="form" ref="formItem" :rules="ruleValidate">     
                <p class="smallTitle">项目信息</p>
                  <Row>
                    <Col span="8" offset="2">
                         <FormItem label="贷款名称">
                            <Input v-model="formItem.loansName" placeholder="请输入贷款名称" />
                        </FormItem> 
                         <FormItem label="可借贷额度">
                             <div style="display:flex;">
                                     <InputNumber v-model="minPrice" :min="0" placeholder="请输入最低借款金额"></InputNumber>元
                                      <div style="width:50px;text-align:center;">至</div>
                                    <InputNumber v-model="maxPrice" :min="minPrice" placeholder="请输入最高借款金额"></InputNumber>元
                             </div>
                        </FormItem> 
                         <FormItem label="贷款期限">
                             <div style="display:flex;">
                                     <InputNumber v-model="loanDate" :min="0" placeholder="请输入贷款期限" :precision='0'></InputNumber>
                                <Select v-model="dataUnit">
                                    <Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                             </div>
                         
                        </FormItem> 
                         <FormItem label="通过率">
                             <div style="width:30%;display:flex;">
                                  <InputNumber v-model="formItem.passRate" placeholder="请输入通过率" :min="0" :max='100'></InputNumber>%
                             </div>
                           
                        </FormItem> 
                         <FormItem label="贷款条件" prop="paymentCondition"> 
                                 <Select v-model="formItem.paymentCondition" multiple placeholder="请选择贷款条件，可多选">
                                    <Option v-for="item in termList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                        </FormItem> 
                         <FormItem label="结算方式">
                             <Select v-model="formItem.paymentType" placeholder="请选择结算方式，必选">
                                    <Option v-for="item in styleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                        </FormItem> 
                         <FormItem label="投放数量">
                            <div style="display:flex;width:30%;"><InputNumber v-model="formItem.putOnNum" placeholder="请输入投放数量" :min="0"></InputNumber>次</div>
                             
                        </FormItem> 
                    </Col>
                     <Col span="8" offset="0">
                         <FormItem label="贷款机构">
                            {{loanName}}
                        </FormItem> 
                         <FormItem label="贷款利率">
                            <div style="display:flex;">       
                                <Select v-model="dataRate">
                                    <Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <InputNumber v-model="loanRate" :min="0" placeholder="请输入贷款利率" :precision='2'></InputNumber>%
                             </div>
                        </FormItem> 
                         <FormItem label="放款时间">
                        <div style="display:flex;">    
                                <InputNumber v-model="loanTime" :min="0" placeholder="请输入放款时间" :precision='0'></InputNumber>                               
                                <Select v-model="loanTimeUnit">
                                    <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                             </div>
                        </FormItem> 
                        <FormItem label="还款方式">
                              <Select v-model="formItem.repaymentType">
                                    <Option v-for="item in repayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                        </FormItem> 
                        <FormItem label="贷款链接">
                            <Input v-model="formItem.paymentAddress" placeholder="请输入还款链接,必填" />
                        </FormItem> 
                        <FormItem label="结算单价">
                            <div style="display:flex;width:30%;">
                                 <InputNumber v-model="formItem.paymentRadio" :min="0" placeholder="请输入结算单价，必填"></InputNumber>元
                            </div>
                            
                        </FormItem> 
                        <FormItem label="投放时间">
                             <DatePicker type="datetimerange" :options="noToday" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' @on-clear='clearTime' style="width: 300px;font-size:18px;"></DatePicker>                        
                        </FormItem> 
                    </Col>
                </Row>
                <p class="smallTitle">联系方式</p>
                 <Row>
                    <Col span="8" offset="2">
                         <FormItem label="贷款机构对接人">
                            <Input v-model="formItem.loansOrganizationName" placeholder="请输入贷款机构对接人，必填" />
                        </FormItem> 
                         <FormItem label="花嗨对接人">
                            <Input v-model="formItem.mdxName" placeholder="请输入米多星对接人，必填" />
                        </FormItem> 
                    </Col>
                     <Col span="6" offset="0">
                         <FormItem label="贷款对接人手机号">
                            <Input v-model="formItem.loansPhone" placeholder="请输入贷款对接人手机号，必填" />
                        </FormItem> 
                    </Col>
                </Row>
                    <div class="btm">
                        <Button type="primary" class="save" @click="save('formItem')">保存</Button>
                    </div>
                    
              </Form>

        </div>
    </div>
</template>

<script>
    import addpic from '@/common/update'
   
    export default {
        components:{
            addpic
        },
        data(){
            return{
                ruleValidate:{
                    paymentCondition: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one', trigger: 'change' },
                        { type: 'array', max: 3, message: 'Choose three at best', trigger: 'change' }
                    ],
                },
                noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                  isChange:false,
                  loanName:'',
                  formItem:{
                    loansName:'',//贷款名称
                    availableCredit:'',//可借贷额度
                    loansTimeLimit:'',//贷款期限
                    passRate:0,//通过率
                    paymentCondition:'',//贷款条件
                    paymentType:'CPA',//结算方式
                    putOnNum:0,//投放数量
                    loansRate:'',//贷款利率
                    loansPeriod:'',//放款时间
                    repaymentType:'不限',//还款方式
                    paymentAddress:'',//贷款链接
                    paymentRadio:0,//结算单价
                    putOnTime:'',//投放时间段
                    loansOrganizationName:'',//贷款机构对接人
                    loansPhone:'',
                    mdxName:'',
                    },
                dataList:[{value: '天',label: '天'},
                    {value: '月',label: '月'},
                    {value: '年',label: '年'},
                ],
                timeList:[
                    {value: '分钟',label: '分钟'},
                    {value: '小时',label: '小时'},
                    {value: '天',label: '天'},
                ],
                termList:[
                    {value: '实名手机号',label: '实名手机号'},
                    {value: '公积金',label: '公积金'},
                    {value: '信用卡',label: '信用卡'},
                    {value: '淘宝',label: '淘宝'},
                    {value: '京东',label: '京东'},
                    {value: '人行征信',label: '人行征信'},
                    {value: '学信网',label: '学信网'},
                    {value: '芝麻信用',label: '芝麻信用'},
                    {value: '身份证',label: '身份证'},
                    {value: '储蓄卡',label: '储蓄卡'},
                    // {value: '储蓄卡',label: '储蓄卡'},                    
                ],
                styleList:[
                    {value: 'CPA',label: 'CPA'},
                    {value: 'CPC',label: 'CPC'},
                ],
                repayList:[
                    {value: '不限',label: '不限'},
                    {value: '单期',label: '单期'},
                    {value: '多期',label: '多期'},
                ],
                // 最高最低贷款金额
                minPrice:0,
                maxPrice:1,
                // 贷款期限、单位
                loanDate:1,
                dataUnit:'天',
                // 贷款条件
                loanTerm:[],
                // 贷款利率
                dataRate:'',
                loanRate:1,
                // 放款时间
                loanTime:0,
                loanTimeUnit:'小时',
                selectTime_:'',
            }
        },
        methods: {
            save(name){
                 this.$refs[name].validate((valid) => {
                    if (valid) {
                 
                          // addLoansProject
                this.formItem.availableCredit = this.minPrice + '~' + this.maxPrice
            
                this.formItem.loansTimeLimit = this.loanDate +'/'+ this.dataUnit
              
                var a =''
                this.formItem.paymentCondition.map((res)=>{
                    a += res+','
                   
                })
                this.formItem.paymentCondition = a.slice(0,a.length-1)
       

                this.formItem.loansRate =   this.loanRate +'/'+ this.dataRate;
                this.formItem.loansPeriod = this.loanTime +'/'+ this.loanTimeUnit;

                if(this.formItem.loansName==''||this.formItem.loansOrganizationName==''||this.formItem.loansPhone==''||this.formItem.mdxName==''||this.formItem.paymentAddress==''||this.formItem.paymentCondition==''||this.formItem.putOnTime==''){
                    this.$Message.warning('请输入完整信息')
                }else{
                    let form = JSON.stringify(this.formItem)
                    if(!this.isChange){
                        this.$http({
                        method:'POST',
                        url:this.allUrl.addLoansProject,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            data:form
                        }).then((res)=>{
                            if(res.data.errordesc=='success'){
                                this.$Message.success('保存成功！');
                                this.$router.push('/loans/loans_project')
                            }
                        })
                    }else{
                        this.$http({
                        method:'POST',
                        url:this.allUrl.updateLoansProject,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            data:form
                        }).then((res)=>{
                            if(res.data.errordesc=='success'){
                                this.$Message.success('保存成功！');
                                this.$router.push('/loans/loans_project')
                            }
                        })
                    }
                     
                }



                    } else {
                        this.$Message.error('Fail!');
                    }
                })
             
                
              
            },
  
            SelectTime(data){
                if(data[0]==''){
                    this.formItem.putOnTime = ''
                }else{
                    this.formItem.putOnTime = data[0]+'~'+data[1]
                }
                
            },
            clearTime(){
                this.formItem.putOnTime = ''
            }
        },
        watch:{
            'minPrice':function(min){
                if(min>this.maxPrice){
                    this.maxPrice = min
                }
            },
  
        },
        updated() {
             

        },
        mounted() {
        
        },
        beforeMount () {
             let query = this.$route.query
             if(query.id){
                 this.formItem.loansOrganizationId = query.id
             }
             if(query.projectId){
                 this.isChange = true;
                 this.formItem.id = query.projectId;
                   this.get(this.allUrl.findLoansProjectById,{loansId:query.projectId}).then((res)=>{
                       console.log(res)
                       this.minPrice = Number(res.data.data.availableCredit.split('~')[0])
                       this.maxPrice = Number(res.data.data.availableCredit.split('~')[1])
                       var aa = res.data.data.loansTimeLimit
                       this.loanDate = Number(aa.split('/')[0])
                       this.dataUnit = aa.split('/')[1]
                       this.dataRate = res.data.data.loansRate.split('/')[1]
                       this.loanRate = Number(res.data.data.loansRate.split('/')[0])
                        this.loanTime = Number(res.data.data.loansPeriod.split('/')[0])
                        this.loanTimeUnit = res.data.data.loansPeriod.split('/')[1]
                        this.selectTime_ = res.data.data.putOnTime.split('~')
                       this.formItem =res.data.data
                       this.formItem.paymentCondition = res.data.data.paymentCondition.split(',')
                    })
             }
             if(query.copyId){
                 this.get(this.allUrl.findLoansProjectById,{loansId:query.copyId}).then((res)=>{
                       console.log(res)
                       this.minPrice = Number(res.data.data.availableCredit.split('~')[0])
                       this.maxPrice = Number(res.data.data.availableCredit.split('~')[1])
                       var aa = res.data.data.loansTimeLimit
                       this.loanDate = Number(aa.split('/')[0])
                       this.dataUnit = aa.split('/')[1]
                       this.dataRate = res.data.data.loansRate.split('/')[1]
                       this.loanRate = Number(res.data.data.loansRate.split('/')[0])
                        this.loanTime = Number(res.data.data.loansPeriod.split('/')[0])
                        this.loanTimeUnit = res.data.data.loansPeriod.split('/')[1]
                        this.selectTime_ = res.data.data.putOnTime.split('~')
                       this.formItem =res.data.data
                     
                       this.formItem.paymentCondition = res.data.data.paymentCondition.split(',')
                       this.formItem.id = ''
                    })
             }
             this.loanName = query.name
        }
      
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
        img{height: 70px;width: 70px;}
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
            padding-right: 40px;
            text-align: left;border-bottom:1px solid #6962622f;
            display: flex;justify-content: space-between;
        }
        .title2{
            line-height: 51px;height: 51px;width: 100%;border-bottom:1px solid #6962622f;
             padding-left: 100px;font-size: 23px;color: rgb(44, 164, 243);
             box-shadow: 10px 10px 10px #3a36362f;
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
    .smallTitle{
        margin-left: 100px;font-size: 20px;margin-top: 30px;margin-bottom: 25px;
        border-left: 6px solid rgb(44, 164, 243);padding-left: 20px !important;
        }
    .content{width: 100%;padding: 10px;}
    .ivu-input-number{
        width: 100% !important;
    }
     .btm{
            margin-top: 10px;
            padding: 0 10% 0 0;
            width: 100%;
            text-align: center;
            .save{width: 100px;}
        }
</style>