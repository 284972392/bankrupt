<template>
    <div class="readDiscount">
        <div class="title"><p>审核划算</p> <p>{{result}}</p></div>
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
                        <FormItem label="商品名称">
                            {{this.formItem.name}}
                        </FormItem>  
                         <FormItem label="商品原价">
                             {{this.formItem.price}}
                        </FormItem>       
                        <FormItem label="上架平台">
                            {{this.formItem.platform}}
                        </FormItem>     
                         <FormItem label="有效截止日期">
                            {{this.formItem.endTime}}
                        </FormItem>    
                         <FormItem label="页面跳转方式">
                                {{this.formItem.pageTurn}}
                             </FormItem>        
                          <FormItem label="销量">
                               {{this.formItem.sales}}
                        </FormItem>             
                    </Col>
                    <Col span="7" offset="2">
                        <FormItem :label="formItem.type=='购买券'?'券后价':formItem.type=='0元购'?'统一价':'特卖价' ">
                            {{this.formItem.preferentialPrice}}
                        </FormItem>   
                        <FormItem label="购买券金额">
                            {{this.formItem.buyTicketPrice}}
                        </FormItem>    
                        <FormItem label="有效起始日期">
                              {{this.formItem.startTime}}
                        </FormItem>   
                        <FormItem label="商品列表样式">
                            <img :src="this.formItem.productListPic" alt="">
                        </FormItem>   
                        <FormItem label="购买链接">
                            {{this.formItem.buyLink}}
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



    </div>
</template>

<script>
    export default {
        name:'readDiscount',
        data(){
            return{
                result:'',
                tenant:'',
                bargainId:'',
                  formItem:{
              
                }
            }
        },
        methods:{
       
        },
        mounted() {
            this.get(this.allUrl.findBargain,{bargainId:this.bargainId}).then((res)=>{
                this.formItem = res.data.data;
                this.formItem.endTime = timestampToTime(this.formItem.endTime)
                this.formItem.shelvesTime = timestampToTime(this.formItem.shelvesTime)
                this.formItem.startTime = timestampToTime(this.formItem.startTime)
                this.formItem.theShelvesTime = timestampToTime(this.formItem.theShelvesTime)
            })
        },
         beforeMount() {
             let query = this.$route.query
             this.result = query.result;
            this.bargainId = this.$store.state.discountId;
             this.get(this.allUrl.findBargainPro,{tenantId:query.tenantId}).then((res)=>{
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
        img{height: 40px;width: 40px;}
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
            height: 80px;width: 100%;
            position: relative;
            text-align: left;border-bottom:1px solid #000000;
            p:nth-child(1){
                font-size: 28px;
            }
             p:nth-child(2){
                font-size: 18px;
            }
            p{ padding-left: 40px;}
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
            margin-left: 30%;margin-top: 20px;
        }
        .change2{
            margin-left: 4%;
            margin-top: 20px;
        }
    }
</style>