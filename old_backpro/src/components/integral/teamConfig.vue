<template>
    <div class="rateRule">
        <div class="title"><p>组团队规则配置</p>
            <!-- <Button class="submit" type="primary">提交</Button> -->
        </div>

        <div class="content">
        
                 <Form :model="formItem" :label-width="200" class="form">
                   
                  <Row>
                    <Col span="15" offset="1">
                    <!-- <Divider orientation="left" style="font-size:18px;font-weight:blod;">奖励配置</Divider> -->
                    <p style="font-size:18px;font-weight:blod;">奖励配置</p>
                         <FormItem>
                             徒弟完成任务，师傅可获得徒弟完成任务总额
                                  <InputNumber
                                    :max="100"
                                    v-model="formItem.LevelOne"
                                    :formatter="LevelOne => `${LevelOne}%`"
                                    :parser="LevelOne => LevelOne.replace('%', '')">
                                </InputNumber>
                             的等比金币奖励
                         </FormItem>    
                         <FormItem>
                             徒孙完成任务，师傅可获得徒孙完成任务总额
                                  <InputNumber
                                    :max="100"
                                    v-model="formItem.LevelTwo"
                                    :formatter="LevelTwo => `${LevelTwo}%`"
                                    :parser="LevelTwo => LevelTwo.replace('%', '')">
                                </InputNumber>
                             的等比金币奖励
                         </FormItem>   
                         <!-- <Divider orientation="left" style="font-size:18px;font-weight:blod;">奖励范围</Divider> -->
                         <p style="font-size:18px;font-weight:blod;">奖励范围</p>
                         <FormItem>
                                应用赚&nbsp;&nbsp;&nbsp;&nbsp;
                                  <RadioGroup v-model="formItem.apps">   
                                      <Radio label='1'>
                                        <span>开启</span>
                                     </Radio> 
                                     <Radio label='0'>
                                        <span>关闭</span>
                                     </Radio> 
                                </RadioGroup>
                         </FormItem>  
                         <FormItem>
                                注册赚&nbsp;&nbsp;&nbsp;&nbsp;
                                  <RadioGroup v-model="formItem.register">    
                                    <Radio label='1'>
                                        <span>开启</span>
                                     </Radio> 
                                     <Radio label='0'>
                                        <span>关闭</span>
                                     </Radio> 
                                </RadioGroup>
                         </FormItem>  
                         <FormItem>
                                办卡赚&nbsp;&nbsp;&nbsp;&nbsp;
                                  <RadioGroup v-model="formItem.card">    
                                    <Radio label='1'>
                                        <span>开启</span>
                                     </Radio> 
                                     <Radio label='0'>
                                        <span>关闭</span>
                                     </Radio> 
                                </RadioGroup>
                         </FormItem>  
                    </Col>
                    
                </Row>
                
                    <div class="btm">
                        <Button type="primary" class="save" @click="save">保存</Button>
                    </div>
                    
              </Form>
       
            
  
           
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formItem:{
                    LevelOne:0,
                    LevelTwo:0,
                    apps:'',
                    register:'',
                    card:''
                },
                info:{
              
                }

            }
        },
        methods:{
            save(){
              let data = {constantConfigVos:[
                  {id:2,value:this.formItem.LevelOne},
                  {id:3,value:this.formItem.LevelTwo},
                  {id:4,value:this.formItem.apps},
                  {id:5,value:this.formItem.register},
                  {id:6,value:this.formItem.card}
              ]}
              console.log(data)
            //   updateTeamConstantConfig
            this.$http({
						method:'POST',
						url: this.allUrl.updateTeamConstantConfig,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:data
					}).then((res)=>{
                        if(res.data.ret == "ok"){
                            this.$Message.success('保存成功！');
                        }
                    })

            }
        },
        beforeMount(){
            // this.formItem = this.$store.state.config
            // if(this.formItem.value < 1){
            //     this.formItem.value *= 100;
            // }
            this.get(this.allUrl.findTeamConstantConfig).then((res)=>{
                console.log(res.data)
                this.formItem.LevelOne = Number(res.data[1].value);
                this.formItem.LevelTwo = Number(res.data[2].value);
                this.formItem.apps = res.data[3].value;
                this.formItem.register = res.data[4].value;
                this.formItem.card = res.data[5].value;

            })
        }
    }

       function changeStatus(param) { 
        var info = ''
        switch(param){
            case '关闭':
              info = 0
              break;
            case '开启':
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