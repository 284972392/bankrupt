<template>
    <div class="home">
        <div class="title">跳转链接列表</div>
        <div class="search">
            <div>
               搜索
            <Input v-model="LinkName" placeholder="链接名" style="width: 20%;" size="large"></Input>
             <ButtonGroup size="large">
                <Button type="primary" ghost @click="findLink">查询</Button>   
                <Button type="primary" ghost @click="LinkName=''" style="margin-left:10px;">清空</Button>         
            </ButtonGroup>
            </div>
        </div>
        <div class="all_users" @click="addmodal=true">添加链接</div>

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


       <Modal
        v-model="addmodal"
        width="600"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>添加链接</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">	 		    
      		  <FormItem label="链接名" prop='key'>
                    <Input v-model="formValidate.key"  placeholder="请输入链接名" />
      		  </FormItem> 
              <FormItem label="链接" prop='value'>
                    <Input v-model="formValidate.value"  placeholder="请输入链接" />
      		  </FormItem>
             </Form>
          </Col>
       </Row>
      </Form>    
             <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="handleSubmit('formValidate')">添加</Button>
        </div>
    </Modal>	




   </div>
</template>


<script>

    import foot from '@/components/footer.vue'
    export default {
        components:{
            foot
            
        },
        name:'',
        data(){
            return{
                LinkName:'',
                ruleValidate: {
                    key: [
                        { required: true, message: '请输入链接名', trigger: 'blur' }
                    ],
                    value: [
                        { required: true, message: '请输入链接', trigger: 'blur' }
                    ],
                },
                addmodal:false,
                formValidate:{
                    key:'',
                    value:''
                },
                
                totalNum:0,
                pageNum:1,
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
                        title: '链接名',
                        align: 'center',
                        key: 'key',
                        minWidth:130
                    },
                    {
                        title: '链接',
                        align: 'center',
                        key: 'value',
                        minWidth:200
                    },
                    {
                        title: '生成后的链接',
                        align: 'center',
                        minWidth:200,
                         render: (h, params) => {
                              let show = 'https://cloud.hzqimiao.com/help/' + params.row.key
                              return h('p',[show])
                           
                           
                        }
                    },
                    {
                        title: '更新时间',
                        align: 'center',
                        key: 'updateTime',
                        minWidth:150
                    },
                    {
                        title: '操作人员',
                        align: 'center',
                        key: 'operateBy',
                        width:120,
                        fixed:'right'
                    },
                    
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
          findLink(){
                this.get(this.allUrl.findRedirectUrlPage,{page:1,rows:9,key:this.LinkName}).then((res)=>{
                    this.data1 = res.data.rows;
                    if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                     res.data.rows.forEach((i,index)=>{        
                           i.updateTime = this.changeTime(i.updateTime)
                    })
                 })
          },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formValidate.value = this.formValidate.value
                     let info = JSON.stringify(this.formValidate)
                   
                    this.$http({
						method:'POST',
						url: this.allUrl.addRedirectUr,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        console.log(response)
                        if(response.data.errordesc == 'success'){
                            this.addmodal = false;
                            let show = 'https://cloud.hzqimiao.com/help/' + this.formValidate.key
                             this.$Notice.success({
                                title: '添加成功,生成链接为',
                                desc: show,
                                duration: 0
                            });
                            this.formValidate = {
                                        key:'',
                                        value:''
                                    }
                      
                            this.handlePageSize(this.pageNum)
                        }
                    })

                  } 
                })
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);
            },
          
             handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrl.findRedirectUrlPage,{page:value,rows:9}).then((res)=>{
                    this.data1 = res.data.rows;
                    if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                     res.data.rows.forEach((i,index)=>{        
                           i.updateTime = this.changeTime(i.updateTime)
                    })
                 })
             },
        

       
            
            },
           
        beforeMount() {
             this.get(this.allUrl.findRedirectUrlPage,{page:1,rows:9}).then((res)=>{            
                 this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                     i.updateTime = this.changeTime(i.updateTime)
                })
            })
         
        },
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