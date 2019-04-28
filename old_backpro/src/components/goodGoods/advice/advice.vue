<template>
    <div class="home">
        <div class="title">建议反馈列表</div>
        <div class="search">
            <div>
               搜索
            <Input v-model="LinkName" placeholder="用户名" style="width: 20%;" size="large"></Input>
            反馈状态
             <Select v-model="linkStatus" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
            

             <ButtonGroup size="large">
                <Button type="primary" ghost @click="findLink">查询</Button>   
                <Button type="primary" ghost @click="LinkName='',linkStatus=''" style="margin-left:10px;">清空</Button>         
            </ButtonGroup>
            </div>
        </div>
 

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right:30px;">全选</Button>
            </td>
   		 <Page :total='Number(totalNum)' show-elevator style="margin-left: 400px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>

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

        <Modal title="View Image" v-model="visible">
             <div v-for="data in checkImg" :key="data">
                 <img :src='data' v-if="visible" style="width: 100%">
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
                  const checkBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {    
                                              this.get(this.allUrlTwo.updateState,{id:params.row.id,state:1}).then((res)=>{
                                                  this.handlePageSize(this.pageNum)
                                              })
                                        }
                                    }
                                }, '审核')
                  }

            return{
                visible:false,
                checkImg:[],
                linkStatus:'',
                statusList:[
            		 {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 0,
                        label: '待审核'
                    },
                    {
                        value:1,
                        label: '已审核'
                    	
                    }
                    
            	],
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
                        title: '用户名称',
                        align: 'center',
                        key: 'nickName',
                        minWidth:130
                    },
                    {
                        title: '建议反馈',
                        align: 'center',
                        tooltip:'true',
                        key: 'feedContent',
                        minWidth:200
                    },
                    {
                        title: '上传图片',
                        align: 'center',
                        key: 'url',
                        minWidth:150,
                       render: (h, params) => {
                           if(params.row.url){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {                                      
                                           this.checkImg = params.row.url.split(',')
                                           this.visible = true
                                        }
                                    }
                                }, '查看图片')
                            ]);
                           }else{
                              return h('p',['未上传图片'])
                           }
                           
                        }
                    },
                    {
                        title: '反馈时间',
                        align: 'center',
                        key: 'createTime',
                        width:180,
                    },
                      {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => { //根据状态显示有哪些操作
                        	if(params.row.state==0){
                                return h('div', [
                                checkBtn(h,params)
                                    
                                ])        
                           }else{
                           	return h('p',['已审核'])
                           }

                       
                        }
                    }
                    
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
          findLink(){
              this.get(this.allUrlTwo.findFeedBackByPage,{page:1,size:9,nickName:this.LinkName,state:this.linkStatus}).then((res)=>{   
                  console.log(res)     
                 this.data1 = res.data.data.records;
                if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            
            })
          },
           
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
          
             handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrlTwo.findFeedBackByPage,{page:value,size:9,nickName:this.LinkName,state:this.linkStatus}).then((res)=>{
                    this.data1 = res.data.data.records;
                    if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
                 })
             },
        

       
            
            },
           
        beforeMount() {
             this.get(this.allUrlTwo.findFeedBackByPage,{page:1,size:9}).then((res)=>{     
                 this.data1 = res.data.data.records;
                if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
              
            
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
           margin-top: 10px;
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