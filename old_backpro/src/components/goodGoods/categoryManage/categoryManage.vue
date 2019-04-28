<template>
    <div class="home">
        <div class="title">分类管理</div>
        <div class="search">
            <div>
           分类名称
            <Input v-model="className" placeholder="分类名称" style="width: 20%;" size="large"></Input>

            

             <ButtonGroup size="large">
                <Button type="primary" ghost @click="findClass">查询</Button>   
                <Button type="primary" ghost @click="className=''" style="margin-left:10px;">清空</Button>         
                <Button type="success" ghost @click="addClass" style="margin-left:10px;">添加分类</Button>         
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
            <span>{{isChange?'修改分类':'添加分类'}}</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">	 		    
                <FormItem label="选择分类" prop='catName'>
                    <Select v-model="formValidate.catName" filterable size="large">
                        <Option v-for="item in catList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> 
      		      </FormItem> 
                <FormItem label="优先级">
                    <InputNumber v-model="formValidate.sortId" placeholder="请输入优先级" :precision="0" :min="1"></InputNumber>
      		  </FormItem>
                 <FormItem label="上传logo" prop='icon'>
                    <lazy :time = '200'>
                        <addpic @update="updateLogo" @remove="removeLogo" :size='1' v-if="addmodal" :defaultPic='formValidate.icon'></addpic>
                    </lazy>
      		  </FormItem>

             </Form>          
          </Col>
       </Row>
     
      </Form>    
        <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="handleSubmit('formValidate')">{{isChange?'修改':'添加'}}</Button>
        </div>        
    </Modal>	
    
      <Modal title="View Image" v-model="visible">
                 <img :src='showImgSrc' v-if="visible" style="width: 100%">
          </Modal>


   </div>
</template>


<script>
    import lazy from "@/common/plLazy";
    import addpic from '@/common/update';
    import foot from '@/components/footer.vue'


    export default {
        components:{
            foot,lazy,addpic 
        },
        name:'',
        data(){
                const checkBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {    
                                            this.changeId = params.row.id
                                            this.isChange = true
                                           this.addmodal = true
                                           this.formValidate = {
                                                catName:params.row.catName+';'+params.row.catId,
                                                sortId:params.row.sortId,
                                                icon:params.row.icon
                                            }
                                      
                                        }
                                    }
                                }, '修改')
                  }

            return{
                isChange:false,
                changeId:'',
                visible:false,
                showImgSrc:'',
                catList:[],
                ruleValidate: {
                    catName: [
                        { required: true, message: '请选择分类', trigger: 'change' }
                        
                    ],
                    icon:[
                        { required: true, message: '', trigger: 'change' }
                    ]
                },
                addmodal:false,

                formValidate:{
                   catName:'',
                   sortId:1,
                   icon:''
                },

                className:'',
                totalNum:0,
                pageNum:1,
                pageSize:9,
                data1:[],
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
                        title: '分类ID',
                        align: 'center',
                        key: 'catId',
                        minWidth:130
                    },
                    {
                        title: '分类名称',
                        align: 'center',
                        key: 'catName',
                        minWidth:130
                    },
                    {
                        title: '图标',
                        align: 'center',
                        key: 'icon',
                        minWidth:150,
                       render: (h, params) => {
                           if(params.row.icon){
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
                                            this.visible = true                            
                                            this.showImgSrc = params.row.icon
                                        }
                                    }
                                }, '查看图片')
                            ]);
                           }else{
                              return h('p',['未上传图标'])
                           }
                           
                        }
                    },
                     {
                        title: '优先级',
                        align: 'center',
                        key: 'sortId',
                        minWidth:130
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => { 
                        
                                return h('div', [
                                checkBtn(h,params)
                                    
                                ])        
                        
                       
                        }
                    }
                ],
            }
        },
      methods:{
          removeLogo(){
              this.formValidate.icon = ""
              this.$refs.formValidate.validateField('icon') 
          },
          updateLogo(){
              this.formValidate.icon = this.$store.state.shareUrl.url;
              this.$refs.formValidate.validateField('icon') 
          },
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.isChange){
                             let form = {
                            catName:this.formValidate.catName.split(';')[0],
                            catId:this.formValidate.catName.split(';')[1],
                            icon:this.formValidate.icon,
                            sortId:this.formValidate.sortId,
                            status: 0,
                            id:this.changeId
                        }
                             this.$http({
                            method:'POST',
                            url: this.allUrlTwo.updateCategory,
                            headers: {
                                "content-type": "application/json"
                            },
                                responseType:'text/plain',
                                data:form
                            }).then((res)=>{
                                if(res.data.resultCode=='0'){
                                    this.addmodal = false
                                    this.$Message.success('修改成功')
                                    this.handlePageSize(this.pageNum)
                                }
                            })
                        }else{
                            // delete form[id];
                             let form = {
                                catName:this.formValidate.catName.split(';')[0],
                                catId:this.formValidate.catName.split(';')[1],
                                icon:this.formValidate.icon,
                                sortId:this.formValidate.sortId,
                                status: 0,
                            }
                             this.$http({
                            method:'POST',
                            url: this.allUrlTwo.addCategory,
                            headers: {
                                "content-type": "application/json"
                            },
                                responseType:'text/plain',
                                data:form
                            }).then((res)=>{
                                if(res.data.resultCode=='0'){
                                    this.addmodal = false
                                    this.$Message.success('添加成功')
                                    this.handlePageSize(this.pageNum)
                                }
                            })
                        }
                       
                    } else {
                        this.$Message.error('请输入完整信息!');
                    }
                })
        },
        findClass(){
             this.get(this.allUrlTwo.getCategoryPage,{currPage:1,limit:9,catName:this.className}).then((res)=>{
                 this.data1 = res.data.data.list;
                      if(res.data.data.totalCount){
                            this.totalNum = res.data.data.totalCount
                        }else{
                            this.totalNum = 0
                        }
            })
        },
      	addClass(){
           this.isChange = false
              this.formValidate = {
                   catName:'',
                   sortId:1,
                   icon:''
                },
              this.addmodal = true
      	},
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
          
             handlePageSize(value) { 
                        this.pageNum = value;
                        this.get(this.allUrlTwo.getCategoryPage,{currPage:value,limit:9,nickName:this.className}).then((res)=>{
                        this.data1 = res.data.data.list;
                        if(res.data.data.totalCount){
                                this.totalNum = res.data.data.totalCount
                            }else{
                                this.totalNum = 0
                            }
                        })
  
             },
        

       
            
            },
           
        beforeMount() {
             this.get(this.allUrlTwo.getCategoryPage,{currPage:1,limit:9}).then((res)=>{
                 console.log(res)
                 this.data1 = res.data.data.list;
                      if(res.data.data.totalCount){
                            this.totalNum = res.data.data.totalCount
                        }else{
                            this.totalNum = 0
                        }
            })
             this.get(this.allUrlTwo.getCatInfoList).then((res)=>{
                 console.log(res)
                 this.catList = res.data.data
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