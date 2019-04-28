<template>
    <div class="readDiscount">
        <div class="title">查看优惠</div>
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
          
          <Form :label-width="130" class="form">
          <div class="secTitle">卡券信息</div>
                 <Row>
                    <Col span="7" offset="1">
                         <FormItem :label="formItem.type=='优惠券'?'卡券名称':formItem.type=='福利红包'?'红包名称':'课程名称' ">
                            {{this.formItem.name}}
                        </FormItem>  
                         <FormItem label="上架平台">
                           {{this.formItem.platform}}
                        </FormItem>       
                        <FormItem label="有效截止日期">
                           {{this.formItem.endTime}}
                        </FormItem>    
                        <FormItem label="卡券详情样式">
                           <img :src="this.formItem.cardDetailPic" alt="" @click="viewImg(formItem.cardDetailPic)">
                        </FormItem>    
                        <FormItem label="领取人数">
                           {{this.formItem.receiveNum}}
                        </FormItem>                  
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem :label="formItem.type=='优惠券'?'卡券特点':formItem.type=='福利红包'?'红包特点':'课程特点' ">
                           {{this.formItem.feature}}
                        </FormItem>   
                        <FormItem label="有效起始日期">
                           {{this.formItem.startTime}}
                        </FormItem>    
                        <FormItem label="卡券列表样式">
                            <img :src="this.formItem.cardListPic" alt="" @click="viewImg(formItem.cardListPic)">
                        </FormItem>   
                        <FormItem label="优惠简介">
                            {{this.formItem.discountExplain}}
                        </FormItem>   
                    </Col>
                </Row>

                <div v-for="(data,index) in this.formItem.receiveVoList">
                 <div class="proHeader">
	              	 	<div>领取说明 {{index+1}}</div>
	              	 	<div>----------------------------------------------------</div>
	              	 </div>
                 <Row>               
                    <Col span="7" offset="1">
                        <FormItem label="领取说明">
                            {{data.receiveExplain}}
                        </FormItem>  
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="攻略图片">
                            <span v-for="info in data.strategyPic">
                                <img :src="info" alt="" @click="viewImg(info)">
                            </span>
                             
                        </FormItem>   
                    </Col>
                  </Row>
                </div>
                <div style="margin-left:40px;margin-top:20px;">
                        <Row>
                        <Col span="7">
                            <FormItem label="领取方式">
                                {{this.formItem.receiveMode}}
                            </FormItem>  
                         </Col>
                         <Col span='7'>
                              <FormItem label="页面跳转方式" v-if="formItem.receiveMode=='单链接可跳转'||formItem.receiveMode=='多个链接'">
                                  {{this.formItem.pageTurn }}
                             </FormItem>   
                         </Col>
                        </Row> 
                    </div>

             <div v-for="(data,index) in this.formItem.linkVoList">
                 <div class="proHeader">
	              	 	<div>领取链接 {{index+1}}</div>
	              	 	<div>----------------------------------------------------</div>
	              	 </div>
                  <Row>
                    <Col span="7" offset="1">
                        <FormItem label="领取平台">
                            {{data.recivePlatform}}
                        </FormItem>   
                        <FormItem label="链接地址">
                            {{data.linkAddress}}
                        </FormItem>   
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="链接说明">
                            {{data.linkExplain}}
                        </FormItem> 
                     
                            <FormItem label="logo">
                                <span v-for="info in data.logo">
                                    <img :src="info" alt="" @click="viewImg(info)">
                                </span>
                            </FormItem>   
                   
                    </Col>
                  </Row>
            </div>
                   <div class="secTitle">优惠信息</div>
                   <Row>
                    <Col span="7" offset="1">
                        <FormItem label="优惠类型">
                            {{this.formItem.type}}
                        </FormItem>  
                        <FormItem label="预约下架时间">
                            {{this.formItem.theShelvesTime}}
                        </FormItem>  
                        <FormItem label="用户反馈形式">
                            {{this.formItem.userFeedbackMode}}
                        </FormItem>  
                        <FormItem label="商户反馈形式">
                            {{this.formItem.tenantFeedbackMode}}
                        </FormItem>  
                        <FormItem label="备注">
                            {{this.formItem.remark}}
                        </FormItem> 
                        
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem label="预约上架时间">
                            {{this.formItem.shelvesTime}}
                        </FormItem>
                        <FormItem label="设定投放时间段">
                            {{this.formItem.putInTime}}
                        </FormItem>
                        <FormItem label="用户反馈说明">
                           {{this.formItem.userFeedbackExplain}}
                        </FormItem> 
                        <FormItem label="商户反馈说明">
                            {{this.formItem.tenantFeedbackExplain}}
                        </FormItem> 
                    </Col>
                  </Row>
            </Form>
           <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>
    </div>
</template>

<script>
    export default {
        name:'readDiscount',
        data(){
            return{
                visible:false,
                imgName:'',
                tenant:'',
                discountId:'',
                  formItem:{
              
                }
            }
        },
        methods:{
           viewImg(data){
               this.visible = true;
               this.imgName = data;
           }
        },
        mounted() {
            this.get(this.allUrl.findDiscount,{discountId:this.discountId}).then((res)=>{
                console.log(res)
                this.formItem = res.data.data;
                this.formItem.linkVoList.map((data)=>{
                    data.logo = data.logo.split(',')
                })
                this.formItem.receiveVoList.map((data)=>{
                    data.strategyPic = data.strategyPic.split(',')
                })            
                this.formItem.endTime = timestampToTime(this.formItem.endTime)
                this.formItem.shelvesTime = timestampToTime(this.formItem.shelvesTime)
                this.formItem.startTime = timestampToTime(this.formItem.startTime)
                this.formItem.theShelvesTime = timestampToTime(this.formItem.theShelvesTime)
                console.log(this.formItem)
            })
        },
         beforeMount() {
             let query = this.$route.query
            this.discountId = this.$store.state.discountId;
             this.get(this.allUrl.findProperty,{tenantId:query.tenantId}).then((res)=>{
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
    .readDiscount{
        width: 100%;
        height: 97%;
        overflow-y: auto;
        text-align: left;
        padding-bottom: 80px;
        img{height: 40px;width: 40px;cursor: pointer;}
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
            position: relative;
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