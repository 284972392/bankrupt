<template>
    <div class="rateRule">
        <div class="title"><p>添加金币兑换规则</p>
            <!-- <Button class="submit" type="primary">提交</Button> -->
        </div>

        <div class="content">
         <Tabs type="card">
            <TabPane label="通用规则">
                 <Form :model="formItem" :label-width="200" class="form">
                  <Row>
                    <Col span="9" offset="1">
                          <FormItem label="消耗形式">
                                {{formItem.key}}
                         </FormItem>   
                         <FormItem label="是否启用">
                                <RadioGroup v-model="formItem.status">
                                    <Radio label="否"></Radio>
                                    <Radio label="是"></Radio>
                                </RadioGroup>
                         </FormItem> 
                    </Col>
                    <Col span="9" offset="2">
                              <FormItem label="消耗汇率">
                                  <InputNumber
                                    :max="100"
                                    v-model="formItem.value"
                                    :formatter="value => `${value}%`"
                                    :parser="value => value.replace('%', '')">
                                </InputNumber>
                         </FormItem> 
                    </Col>
                </Row>
                    <div class="btm">
                        <Button type="primary" class="save" @click="save">保存</Button>
                    </div>
                    
              </Form>
            </TabPane>
        </Tabs>
            
             
           
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formItem:{

                },
                info:{
                    key:'',
                    id:'',
                    status:'',
                    value:''
                }

            }
        },
        methods:{
            save(){
                this.info.key = this.formItem.key
                this.info.id = this.formItem.id
                this.info.status = changeStatus(this.formItem.status)
                this.info.value = this.formItem.value*0.01;
                 this.$http({
						method:'POST',
						url: this.allUrl.updateConstantConfig,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:this.info
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret == 'ok'){
                             this.$Message.success('修改成功');
                                this.$router.push('/integral_member/consumerule')     
                        }
                    })

            }
        },
        beforeMount(){
            this.formItem = this.$store.state.config
            if(this.formItem.value < 1){
                this.formItem.value *= 100;
            }
        }
    }

       function changeStatus(param) { 
        var info = ''
        switch(param){
            case '否':
              info = 0
              break;
            case '是':
              info = 1
              break;
        }
        return info;
     }
</script>

<style scoped lang='scss'>
    .rateRule{
        position: relative;
        width: 100%;
        height: 97%;
        overflow-y: auto;
        text-align: left;
        padding-bottom: 80px;

        .title{
            display: flex;
            justify-content: space-between;
            background: #ffffff;
            height: 60px;
            line-height: 60px;
            font-size: 18px;
            padding: 0 40px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .content{
            background: #ffffff;
            padding: 50px;
        }
        .btm{
            padding: 0 10% 0 0;
            width: 100%;
            text-align: center;
            .save{width: 100px;}
        }
    }
</style>