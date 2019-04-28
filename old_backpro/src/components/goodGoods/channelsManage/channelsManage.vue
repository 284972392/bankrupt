<template>
    <div class="home">
        <div class="title">频道管理</div>
        <div class="search">
            <div>
           频道名称
            <Input v-model="LinkName" placeholder="频道名称" style="width: 20%;" size="large"></Input>
            频道类型
             <Select v-model="linkStatus" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
            

             <ButtonGroup size="large">
                <Button type="primary" ghost @click="findLink">查询</Button>   
                <Button type="primary" ghost @click="LinkName='',linkStatus=''" style="margin-left:10px;">清空</Button>         
                <Button type="success" ghost @click="addChannels" style="margin-left:10px;">添加频道</Button>         
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
            <span>添加频道</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">	 		    
      		  <!--<FormItem label="频道类型" prop='key'>
                  <Select v-model="formValidate.type" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
      		  </FormItem> -->
      		  <FormItem label="频道名" prop='name'>
                    <Input v-model="formValidate.name"  placeholder="请输入链接名" />
      		  </FormItem> 
              <FormItem label="链接" prop='theme'>
                    <Input v-model="formValidate.theme"  placeholder="请输入链接" />
      		  </FormItem>
      		  <FormItem label="上传logo" prop='logo'>
                    <!--<Input v-model="formValidate.value"  placeholder="请输入链接" />-->
      		 <lazy :time = '200'>
                  <addpic @update="strategy1" @remove="removeStrategy1" :size='1' :defaultPic='formValidate.logo'></addpic>
           		</lazy>
      		  </FormItem>
      		  <FormItem label="序列" prop="sort">
                    <!--<Input v-model="formValidate.sort"  placeholder="请输入1～5的序列" />-->
                    <InputNumber :precision='0' :min="min"  v-model="formValidate.sort" placeholder="序列"></InputNumber>
      		  	
                 <!--<Select v-model="formValidate.sort" size="large">
                    <Option v-for="item in sortList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select> -->
      		  </FormItem>
             </Form>
          </Col>
       </Row>
      </Form>    
             <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="handleSubmit('formValidate')">添加</Button>
        </div>
    </Modal>	


<!--修改-->

       <Modal
        v-model="addmoda2"
        width="600"
        class-name="addRoleBox">
         <p slot="header" style="color:#f60;text-align:center">
            <span>修改频道</span>
        </p>
        <Form> 	
       <Row>
       	 <Col>      
             <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">	 		    
      		  <FormItem label="频道类型">
                  <Select disabled v-model="formValidate2.type" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
      		  </FormItem> 
      		  <FormItem label="频道名">
                    <Input disabled v-model="formValidate2.name"  placeholder="请输入链接名" />
      		  </FormItem> 
              <FormItem label="链接">
                    <Input disabled v-model="formValidate2.theme"  placeholder="请输入链接" />
      		  </FormItem>
      		  <FormItem label="上传logo">
      		  	<img :src="formValidate2.logo"/>
      		  </FormItem>
      		  <FormItem label="序列" prop="sort">
                    <!--<Input v-model="formValidate.sort"  placeholder="请输入1～5的序列" />-->
                    <InputNumber :precision='0' :min="min"  v-model="formValidate2.sort" placeholder="序列"></InputNumber>
      		  	
                 <!--<Select v-model="formValidate.sort" size="large">
                    <Option v-for="item in sortList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select> -->
      		  </FormItem>
             </Form>
          </Col>
       </Row>
      </Form>    
             <div slot="footer" style="text-align:center;">
            <Button type="primary" size='large' @click="handleSubmit2('formValidate2')">确认修改</Button>
        </div>
    </Modal>

        <Modal title="View Image" v-model="visible">
             <div>
                 <img :src='checkImg' v-if="visible" style="width: 100%">
             </div>
              
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
        	 const sortNumber = (rule, value, callback) => {

                if (value === 0) {
                    callback(new Error('请输入排序'));
                } else {
                    callback();
                }
                
                
            };
        	
        	const themeText = (rule, value, callback) => {
		var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        	 	console.log(reg.test(value))
                if (value == "") {
                    callback(new Error('请输入网址链接'));
                }else if(!reg.test(value)){
		              callback(new Error('请输入正确网址'));
                	
                } else {
                    callback();
                }
                
                
            };
        	
                  const checkBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {    
                                              this.get(this.allUrlTwo.delChannels,{id:params.row.id}).then((res)=>{
                                 this.$Message.success('删除成功');
                                                 this.handlePageSize(this.pageNum)
                                              })
                                        }
                                    }
                                }, '删除')
                  }
				 const updateBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                         },
                                    on: {
                                        click: () => {    
                                        	  this.formValidate2 = params.row
                                        	  this.upId = params.row.id
                                             this.addmoda2 = true;
                                        }
                                    }
                                }, '修改')
                  }
            return{
                visible:false,
                addmoda2:false,
                upId:'',
                checkImg:"",
                min:0,
                linkStatus:'',
                statusList:[
                    {
                        value: 0,
                        label: '官方频道'
                    },
                    {
                        value:1,
                        label: '自建频道'
                    	
                    }
                    
            	],
            	sortList:[
                    {
                        value: 0,
                        label: '1'
                    },
                    {
                        value:1,
                        label: '2'
                    	
                    },
                    {
                        value:2,
                        label: '3'
                    	
                    },
                    {
                        value:3,
                        label: '4'
                    	
                    },
                    {
                        value:4,
                        label: '5'
                    	
                    },
            	],
                LinkName:'',
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入频道名', trigger: 'blur' }
                    ],
                    theme: [
                        { required: true, validator: themeText, trigger: 'blur' }
                    ],
        	       logo:[
                        { required: true, message: '请上传logo', trigger: 'change' }
                   ],
                   sort:[
                         {required: true,validator: sortNumber, trigger: 'change' }
                   ]
                },
                ruleValidate2:{
                	sort:[
                         {required: true,validator: sortNumber, trigger: 'change' }
                   ]
                },
                addmodal:false,
                formValidate2:{},
                formValidate:{
                	name:'',
                	theme:'',
                	sort:0,
                	logo:''
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
                        title: '频道类型',
                        align: 'center',
                        key: 'type',
                        minWidth:130
                    },
                    {
                        title: '频道名称',
                        align: 'center',
                        key: 'name',
                        minWidth:130
                    },
                    {
                        title: '上传图片',
                        align: 'center',
                        key: 'logo',
                        minWidth:150,
                       render: (h, params) => {
                           if(params.row.logo){
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
                                           this.checkImg = params.row.logo
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
                        title: '优先级',
                        align: 'center',
                        tooltip:'true',
                        key: 'sort',
                        minWidth:200
                    },
                        {
                        title: '创建时间',
                        align: 'center',
                        tooltip:'true',
                        key: 'createTime',
                        minWidth:200
                    },
                      {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 150,
                        align: 'center',
                        render: (h, params) => { //根据状态显示有哪些操作
                                return h('div', [
                                checkBtn(h,params),
                                updateBtn(h,params)
                                ])        

                       
                        }
                    }
                    
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
      	handleSubmit2(name){
      	this.$refs[name].validate((valid) => {
      		if(valid){
      			 this.get(this.allUrlTwo.updateChannels,{id:this.upId,sort:this.formValidate2.sort}).then((res)=>{
      			 	console.log(res)
      			 	if (res.data.resultCode == "0") {
                                 this.$Message.success('修改成功');
      			 		
      			 		this.addmoda2 = false
                      this.handlePageSize(this.pageNum)
      			 	}

                  })
  		}
      	})
      		
      	},
      	handleSubmit(name){
      	this.$refs[name].validate((valid) => {
      		if (valid) {
   console.log(this.formValidate)
   
	this.$http({
						method:'POST',
						url: this.allUrlTwo.addChannels,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:this.formValidate
					}).then((res)=>{
						console.log(res)
						if (res.data.resultCode == "0") {
                                 this.$Message.success('添加成功');
                      this.handlePageSize(this.pageNum)
							  this.addmodal = false
						}else{
                                 this.$Message.success(res.data.resultMessage);
							
						}
					})
				    
      		}
      	})
      	},
      	addChannels(){
      		this.addmodal = true
      	},
       		 strategy1(){
               this.formValidate.logo = this.$store.state.shareUrl.url;
            },
         // 删除当前攻略图片
            removeStrategy1(){
               this.formValidate.logo = ""
            },
          findLink(){
              this.get(this.allUrlTwo.getBackChannels,{name:this.LinkName,type:this.linkStatus,page:1,size:9}).then((res)=>{
                 this.data1 = res.data.data.records;
                 this.data1.forEach(function(i,index){
                 if (i.type == 0) {
                 	 i.type = "官方频道"
                 }else{
                 	 i.type = "自建频道"
                 }
                 })
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
                this.get(this.allUrlTwo.getBackChannels,{name:this.LinkName,type:this.linkStatus,page:value,size:9}).then((res)=>{
             console.log(res)
                 this.data1 = res.data.data.records;
                 this.data1.forEach(function(i,index){
                 if (i.type == 0) {
                 	 i.type = "官方频道"
                 }else{
                 	 i.type = "自建频道"
                 }
                 })
                if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
              
            
            })
             },
        

       
            
            },
           
        beforeMount() {
             this.get(this.allUrlTwo.getBackChannels,{page:1,size:9}).then((res)=>{
             	console.log(res)
                 this.data1 = res.data.data.records;
                 this.data1.forEach(function(i,index){
                 if (i.type == 0) {
                 	 i.type = "官方频道"
                 }else{
                 	 i.type = "自建频道"
                 }
                 })
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