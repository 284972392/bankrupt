<template>
    <div class="home">
        <div class="title">角色管理</div>
        <div class="search">
            搜索
            <Input v-model="RoleName" placeholder="角色名称" style="width: 26%;" size="large"></Input>
          
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="findRoleName" v-if="buttonShow.a">查询</Button>   
            </ButtonGroup>
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="addRole" v-if="buttonShow.c">添加</Button>
            </ButtonGroup>
        </div>

        <div class="all_users">全部角色({{totalRoleNum}})</div>

        

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
    <!--引入添加对话弹框-->
        <Modal
        title="添加角色"
        v-model="modal10"
        @on-ok="confirm1"
        width="600"
        class-name="addRoleBox">
       <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="角色名称">
     	  	 	<Input v-model="formItem2.roleName" placeholder="请输入角色" style="width: 200px"></Input>     		  	
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="设置权限">
        		 <Tree :data="formItem2.children"  show-checkbox multiple ref='tree'></Tree>   	 	 	
      		  </FormItem> 
       	 </Col>
       </Row>
       
        <Row>
       	 <Col>
        	<FormItem label="备注">       		
        		 <Input v-model="formItem2.remark" type="textarea" placeholder=""></Input>
      		 </FormItem> 
       	 </Col>
       </Row>     
      </Form>
    </Modal>
    <!-- 修改角色弹框 -->
    <Modal
        title="修改角色"
        v-model="modal9"
        @on-ok="confirm2"
        width="600"
        class-name="addRoleBox">
       <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="角色名称">
     	  	 	<Input v-model="formItem3.roleName" placeholder="请输入角色" style="width: 200px"></Input>     		  	
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="设置权限">
        		 <Tree :data="formItem3.children" show-checkbox multiple ref="changeTree"></Tree>   	 	 	
      		  </FormItem> 
       	 </Col>
       </Row>
       
        <Row>
       	 <Col>
        	<FormItem label="备注">       		
        		 <Input v-model="formItem3.remark" type="textarea" placeholder=""></Input>
      		 </FormItem> 
       	 </Col>
       </Row>     
      </Form>
    </Modal>

        <!--引入查看对话弹框-->
        <Modal
        title="查看角色"
        v-model="modal11"
        width="600"
        class-name="addRoleBox">
        <Form> 	
       <Row>
       	 <Col span="11">      	 		    
      		  <FormItem label="角色名称">
     	  	 	<Input readonly="readonly" v-model="formItem.roleName" placeholder="请输入角色" style="width: 200px"></Input>     		  	
      		  </FormItem> 
       	 </Col>
       	 <Col span="11" offset="2">
       	 	 <FormItem label="权限">
        		 <Tree :data="formItem.children" show-checkbox multiple></Tree>   	 	 	
      		  </FormItem> 
       	 </Col>
       </Row>
        <Row>
       	 <Col>
        	<FormItem label="备注">       		
        		 <Input readonly="readonly" v-model="formItem.remark" type="textarea"></Input>
      		 </FormItem> 
       	 </Col>
       </Row>     
      </Form>    
    </Modal>	
            <foot></foot>
    </div>
    
</template>

<script>
    import qs from 'qs';
    import foot from '@/components/footer.vue'
    export default {
        components:{
            foot
        },
        name:'',
        data(){
            const checkbtn = (h, params) => { 
              if(this.buttonShow.b){
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.checked(params)                                      	                           	
                                        }
                                    }
                                }, '查看')
                }      
             };
               const changebtn = (h, params) => { 
                   if(this.buttonShow.d){
                    return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.change(params)                      	                           	
                                        }
                                    }
                                }, '修改')
                   }
             };
              

            return{
                buttonShow:{},
                totalRoleNum:0,
                totalNum:0,
                pageNum:1,
                pageSize:9,
                //对话框
                 modal9:false,
            	 modal10: false,
            	 //查看的对话框：
            	 modal11:false,
                 //对话框提交表单
                //  查看
        		formItem:{
                    
                },
                // 添加
                formItem2:{

                },
                // 修改
                formItem3:{

                },
                RoleName:'',
                 columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色名称',
                        align: 'center',
                        key: 'roleName'
                    },
                    {
                        title: '创建人员',
                        align: 'center',
                        key: 'createBy'
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => { 
                            return h('div', [
                                checkbtn(h,params),
                                changebtn(h,params)
                            ])         
                            
                       
                        }
                    }
                ],
                data1:[
                   
                ]
            }
        },
        methods:{
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);
            },
            // 添加
            addRole(params){
                console.log(params)
            },
            // 查看
            checked(params){
                  
                // 根据id查看角色
                this.get(this.allUrl.findRole,{roleId:params.row.id}).then((res)=>{
                     this.formItem = res.data.data;
                     this.formItem.children = changeBtn(this.formItem.children)
                      this.modal11=true 
                })

            },
            // 修改
            change(params){
                    this.get(this.allUrl.findRole,{roleId:params.row.id}).then((res)=>{
                         this.formItem3 = res.data.data;         
                        this.formItem3.children = changeBtn(this.formItem3.children)
                        this.modal9 = true   
                     })
                  
            },
             handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrl.rolePage,{page:value,rows:9}).then((res)=>{
                    console.log(res.data)
                    this.data1 = res.data.rows;
                    if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                     res.data.rows.forEach((i,index)=>{        
                           i.createTime = this.changeTime(i.createTime)
                    })
                 })
             },
            //添加弹框确认
            confirm1(){
                
                 let treesLength = this.$refs.tree.getCheckedNodes().length;
                if(this.formItem2.roleName == undefined||treesLength == 0){
                    this.$Message.warning('请填写完成信息');
                }else{
                     let info = JSON.stringify(this.formItem2)
                     this.$http({
						method:'POST',
						url: this.allUrl.addRole,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret=='ok'){
                            this.$Message.success('添加成功');
                            this.get(this.allUrl.rolePage,{page:1,rows:9}).then((res)=>{
                                this.data1 = res.data.rows;
                                if(res.data.total){
                                    this.totalNum = res.data.total
                                }else{
                                    this.totalNum = 0
                                }
                                res.data.rows.forEach((i,index)=>{        
                                   i.createTime = this.changeTime(i.createTime)
                                })
                            })
                        }else if(response.data.ret=='error'){
                            this.$Message.error(response.data.errordesc);
                        }
                    })
                }
                
                
               
            },
            // 修改角色确认
            confirm2(){
                console.log(this.formItem3.children)

                //======================================
        //扩展remove方法
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        //======================================
        //获取整条数据链
        function getParent(array, childs, ids) {
          for (let i = 0; i < array.length; i++) {
            let item = array[i];
            if (Number(item.id) === Number(ids)) {
              childs.push(item);
              return childs;
            }
            if (item.children && item.children.length > 0) {
               childs.push(item);
              let rs = getParent(item.children, childs, ids);
              if (rs) {
                return rs;
              }
              else {
                childs.remove(item);
              }
            }
          }
          return false;
        }

        //获取所有选中节点
        let params = this.$refs.changeTree.getCheckedNodes();
        //所有数据
        let allData = this.formItem3.children;

        //循环执行所有选中的节点链，放到arr1数组里
        let arr1 = [];
        for (let i = 0; i < params.length; i++) {
          //单条数据链
          let aData = getParent(allData, [], params[i].id);//方法入口在这里

          for (let y = 0; y < aData.length; y++) {
            //拆分成单个json数组放到arr1里
            arr1.push(aData[y]);
          }
        }

        //arr1去重 es6的set方法
        function dedupe(array) {
          return Array.from(new Set(array));
        }

        arr1 = dedupe(arr1);
        console.log(arr1)

            let treeLen = this.$refs.changeTree.getCheckedNodes().length;
            if(this.formItem3.roleName==''||treeLen == 0){
                 this.$Message.info('权限和角色名称不能为空！');
            }else{
               
                 let info = this.formItem3
                 info.children = arr1
                info = JSON.stringify(info)

                  this.$http({
						method:'POST',
						url: this.allUrl.updateRole,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('修改成功');
                            this.get(this.allUrl.rolePage,{page:this.pageNum,rows:9}).then((res)=>{
                                this.data1 = res.data.rows;
                                if(res.data.total){
                                    this.totalNum = res.data.total
                                }else{
                                    this.totalNum = 0
                                }
                                res.data.rows.forEach((i,index)=>{        
                                   i.createTime = this.changeTime(i.createTime)
                                })
                            })
                        }else if(response.data.ret=='error'){
                            this.$Message.error(response.data.errordesc);
                        }
                    })
            }
            
               

               


            },
            //添加角色
            addRole(){
          	    this.modal10 = true                                       	
            },
            // 查询角色
            findRoleName(){
                 this.get(this.allUrl.rolePage,{page:1,rows:9,roleName:this.RoleName}).then((res)=>{
                    this.data1 = res.data.rows;
                    if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                    res.data.rows.forEach((i,index)=>{        
                       i.createTime = this.changeTime(i.createTime)
                })
            })

            }
        },
        beforeMount() {
    
            let a = this.findButton('角色管理')
            this.buttonShow = {
                    a:this.isButtonShow(a,'查询'),
                    b:this.isButtonShow(a,'查看'),
                    c:this.isButtonShow(a,'添加'),
                    d:this.isButtonShow(a,'修改')
            }
           

 


            // 角色列表
            this.get(this.allUrl.roleList).then((res)=>{
                this.formItem2.children = res.data.data;
                this.formItem2.children = changeBtn(this.formItem2.children)
                // console.log(this.formItem2)
            })
           
             this.get(this.allUrl.rolePage,{page:1,rows:9}).then((res)=>{
                //  console.log(res)
                this.data1 = res.data.rows;
                if(res.data.total){
                            this.totalNum = res.data.total
                            this.totalRoleNum = res.data.total
                        }else{
                            this.totalNum = 0
                            this.totalRoleNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                })
            })
           

        },
    }

    
    //将按钮加进 tree控件中
    function changeBtn(param){
        var ss = param;
         var a = function(params){
             params.forEach((i,index)=>{
                if(i.buttons){       
                    i.children = i.children.concat(i.buttons)
                }
                if(i.children){
                    a(i.children)
                }
            })
         }
         a(ss);
        return ss;
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
            height: 71px;line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 17px;margin-right: 55px;}
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
        .ivu-modal{
        top: 388px!important;
        }
    }
</style>