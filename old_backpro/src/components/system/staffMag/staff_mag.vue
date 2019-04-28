<template>
    <div class="home">
        <div class="title">员工管理</div>
        <div class="search">
            搜索
            <Input v-model="search.realName" placeholder="员工姓名/员工手机号" style="width: 15%;" size="large"></Input>
          
                 <Cascader :data="Cascader " v-model="value"  style="display:inline-block;margin-right:20px;" placeholder="所在机构/角色" @on-change="getValue"></Cascader>
           
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="searchUser">查询</Button>   
            </ButtonGroup>
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="addStaff = true">添加</Button>
            </ButtonGroup>
        </div>

         <Modal v-model="addStaff" width="720">
                <p slot="header" style="color:#f60;text-align:center">
                    <span>添加员工</span>
                </p>
                <div style="text-align:center">     
                      <Form :model="addform" :label-width="60" @submit.native.prevent>
                        <Row>
                            <Col span='11'>
                            <FormItem label="姓名">
                                <Input v-model="addform.realName" placeholder="请输入姓名"></Input>
                            </FormItem>
                            </Col>
                            <Col span='11'>
                            <FormItem label="手机号">
                                <Input v-model="addform.mobiPhone" placeholder="请输入手机号"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <FormItem label="所在机构/角色" prop="value1">
                                <Cascader :data="Cascader " v-model="value1" style="width:90%;" placeholder="所在机构/角色" ref="addInfo" @on-change="getValue1"></Cascader>
                            </FormItem>
                        </Row>
                    </Form>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long :loading="modal_loading" @click="confirm()">确定</Button>
                </div>
            </Modal>

            <Modal v-model="changeStaff" width="720">
                <p slot="header" style="color:#f60;text-align:center">
                    <span>修改员工</span>
                </p>
                <div style="text-align:center">     
                      <Form :model="changeform" :label-width="80" @submit.native.prevent>
                        <Row>
                            <Col span='11'>
                            <FormItem label="姓名">
                                <Input v-model="changeform.realName" placeholder="请输入姓名"></Input>
                            </FormItem>
                            </Col>
                            <Col span='11'>
                            <FormItem label="手机号">
                                <Input v-model="changeform.mobiPhone" placeholder="请输入手机号"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Cascader :data="Cascader" v-model="value1" style="display:inline-block;width:90%;" ref="changeInfo" placeholder="所在机构/角色" @on-change="getChangeValue"></Cascader>
                        </Col>
                      </Row>

                        <FormItem label="在职状态" prop='status'>
                         <RadioGroup v-model="changeform.status">
                            <Radio :label="1" ><span>在职</span></Radio>
                            <Radio :label="0" ><span>离职</span></Radio>
                         </RadioGroup>
                       
                        </FormItem>
                    </Form>
                </div>                                                                                           
                <div slot="footer">
                    <Button type="error" size="large" long :loading="change_loading" @click="changeConfirm()">确定</Button>
                </div>
            </Modal>

    <div class="state_con">
        <div class="all_users" :class="{active:shows==1}" @click="AllStaff()">全部员工({{allUserNum}})</div>
        <div class="all_users" :class="{active:shows==2}" @click="BeOnStaff()">在职员工({{inservice}})</div>
        <div class="all_users" :class="{active:shows==3}" @click="BeOffStaff()">离职员工({{departure}})</div>
    </div>
        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right:30px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
                <!-- <Button @click="BeOn()">在职</Button>
                <Button @click="BeOff()">离职</Button> -->
            </td>
   		 <Page :total='Number(totalNum)' show-elevator @on-change='handlePageSize' show-total :current="pageNum" :page-size="pageSize" style="margin-left: 400px;"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->

        	
    </div>
    
            <foot></foot>
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
                inservice:0,
                departure:0,
                allUserNum:0,
                totalNum:0,
                pageNum:1,
                pageSize:9,
                addStaff:false,
                changeStaff:false,
                modal_loading: false,
                change_loading:false,
                shows:'1',
                search:{
                    realName:'',
                    departId:'',
                    roleId:''
                },
                Cascader :[],
                value:[],
                value1:[],
                // 添加里的机构选项
                  AddOganize:[],
                // 添加里的角色
                addRole:[ {value: 'dd',label: 'dd'}, {value: '3',label: '3'}],
                // 添加员工
                addform: {
                    realName: '',
                   mobiPhone:''
                },
                // 修改员工
                changeform:{
                   
                }, 

                model1: '全部',
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
                        title: '员工编号',
                        align: 'center',
                        key: 'id',
                        width:100
                    },
                    {
                        title: '员工账号',
                        align: 'center',
                        key: 'mobiPhone',
                        width:150
                    },
                    {
                        title: '员工姓名',
                        align: 'center',
                        key: 'realName',
                        width:120
                    },
                    {
                        title: '员工手机号',
                        align: 'center',
                        key: 'mobiPhone',
                        width:150
                    },
                     {
                        title: '所在机构',
                        align: 'center',
                        key: 'departName',
                        width:150
                    },
                     {
                        title: '角色',
                        align: 'center',
                        key: 'roleName',
                        width:120
                    },
                     {
                        title: '管辖商户数',
                        align: 'center',
                        key: 'tenantNum',
                        width:100

                    },
                     {
                        title: '在职状态',
                        align: 'center',
                        key: 'status',
                        width:120
                    },
                    {
                        title: '创建人员',
                        align: 'center',
                        key: 'createBy',
                        width:120
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createTime',
                        width:198
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        fixed:'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [ 
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                             this.checkStaff(params);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                           this.changeStaff = true;
                                           this.amend(params);
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data1:[
                  
                ]
            }
        },
        methods:{
 
            //*************筛选************** */
            //全部员工
            AllStaff(){
                
                this.shows = 1;
                this.get(this.allUrl.userPage,{page:1,rows:9}).then((res)=>{
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                    this.data1 = res.data.rows
                    res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                    if(i.status == '1'){
                        i.status = "在职"
                    }else{
                        i.status = "离职"
                    }
                    })
                })
            },
            //在职员工
            BeOnStaff(){
                this.shows = 2;
                this.get(this.allUrl.userPage,{page:1,rows:9,status:1}).then((res)=>{
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                    this.data1 = res.data.rows
                    res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                    if(i.status == '1'){
                        i.status = "在职"
                    }else{
                        i.status = "离职"
                    }
                    })
                })
            },
            //离职员工
            //***************************** */
            BeOffStaff(){
                this.shows = 3;
                 this.get(this.allUrl.userPage,{page:1,rows:9,status:0}).then((res)=>{
                if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                    this.data1 = res.data.rows
                    res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                    if(i.status == '1'){
                        i.status = "在职"
                    }else{
                        i.status = "离职"
                    }
                    })
                })
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            // 查询员工
            searchUser(){
                
               console.log(this.search)
               if(this.search.departId == ''&&this.search.realName == ''&&this.search.roleId == ''){
                   this.$Message.warning('请填写查询信息');
               }else{
                   this.get(this.allUrl.userPage,{page:1,rows:9,realName:this.search.realName,departId:this.search.departId,roleId:this.search.roleId}).then((res)=>{
                        console.log(res)
                        if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                        this.data1 = res.data.rows
                        res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        if(i.status == '1'){
                            i.status = "在职"
                        }else{
                            i.status = "离职"
                        }
                        })
                     })
               }
                    
       
            },
            //在职
            BeOn(){
              
            },
            //离职
            BeOff(){

            },
            // 添加确认
              confirm () {
                if(this.addform.realName.length!=0&&this.addform.mobiPhone.length!=0&&this.$refs.addInfo.selected.length==2){
                    if(!(/^1[0-9]{10}$/.test(this.addform.mobiPhone))){
                        this.$Message.warning('请填写正确的手机号码');
                    }else{
                         this.modal_loading = true;
                    let info = JSON.stringify(this.addform)
                     this.$http({
						method:'POST',
						url: this.allUrl.addUser,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('添加成功');
                             this.get(this.allUrl.userPage,{page:1,rows:9}).then((res)=>{
                                 if(res.data.total){
                                    this.totalNum = res.data.total
                                    this.allUserNum = res.data.total
                                }else{
                                    this.totalNum = 0
                                    this.allUserNum = 0
                                }
                                this.data1 = res.data.rows
                                res.data.rows.forEach((i,index)=>{        
                                    i.createTime = this.changeTime(i.createTime)
                                    if(i.status == '1'){
                                        i.status = "在职"
                                    }else{
                                        i.status = "离职"
                                    }
                                })
                            })
                            this.modal_loading = false;
                            this.addStaff = false;
                              this.get(this.allUrl.countUser).then((res)=>{
                                this.inservice = res.data.data.inservice;
                                this.departure = res.data.data.departure;
                            })
                        }else if(response.data.ret=='error'){
                            this.$Message.error(response.data.errordesc);
                            this.modal_loading = false;
                            this.addStaff = false;
                        }
                    })
                    }
                   
                }else{
                    this.$Message.warning('请填写完整信息');
                }
            },
            // 修改
            amend(params){
                this.change_loading = false;
                this.get(this.allUrl.findUser,{userId:params.row.id}).then((res)=>{    
                    this.changeform = res.data.data;
                    this.value1 = [res.data.data.departId,res.data.data.roleId];
                })
            },
            // 修改确认
            changeConfirm(){
     
                if(this.$refs.changeInfo.selected.length==2&&this.changeform.mobiPhone.length!=0&&this.changeform.realName.length!=0){
                     if(!(/^1[0-9]{10}$/.test(this.changeform.mobiPhone))){
                        this.$Message.warning('请填写正确的手机号码');
                    }else{
                        this.change_loading = true;
                    let info = JSON.stringify(this.changeform)
                  this.$http({
						method:'POST',
						url: this.allUrl.updateUser,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:info
					}).then((response)=>{
                        if(response.data.ret=='ok'){
                            this.$Message.success('修改成功');
                            this.get(this.allUrl.userPage,{page:this.pageNum,rows:9}).then((res)=>{
                                if(res.data.total){
                                    this.totalNum = res.data.total
                                }else{
                                    this.totalNum = 0
                                }
                                this.data1 = res.data.rows
                                res.data.rows.forEach((i,index)=>{        
                                    i.createTime = this.changeTime(i.createTime)
                                    if(i.status == '1'){
                                        i.status = "在职"
                                    }else{
                                        i.status = "离职"
                                    }
                                })
                            })
                            this.change_loading = false;
                             this.changeStaff = false;
                               this.get(this.allUrl.countUser).then((res)=>{
                                    this.inservice = res.data.data.inservice;
                                    this.departure = res.data.data.departure;
                                })
                        }else if(response.data.ret=='error'){
                            console.log(response)
                            this.$Message.error(response.data.errordesc);
                            this.change_loading = false;
                            this.changeStaff = false;
                        }
                    })
                  }
                }else{
                    this.$Message.warning('请填写完整信息');
                    
                }
                    
                
               

            },
            handlePageSize(value){
                this.pageNum = value;
                this.get(this.allUrl.userPage,{page:value,rows:9}).then((res)=>{
                    if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                         res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  if(i.status == '1'){
                      i.status = "在职"
                  }else{
                      i.status = "离职"
                  }
                })
                    this.data1 = res.data.rows

                 })
            },
            // 查看员工
            checkStaff(params){
                this.get(this.allUrl.findUser,{userId:params.row.id}).then((res)=>{
                    this.$store.state.staffInfo = res.data.data
                    this.$router.push('/system/checkStaff')
                })
                    
            },
            
            // 获取联机选择器的值
            getValue(value){
                this.search.departId = value[0]
                this.search.roleId = value[1]
            },
            getValue1(value){
                this.addform.departId = value[0]
                this.addform.roleId = value[1]
            },
            // 获取修改联机选择器的值
            getChangeValue(value){
                this.changeform.departId = value[0]
                this.changeform.roleId = value[1]
            }
        },
        updated () {
          
        },
        beforeMount() {
            
           this.get(this.allUrl.findDepart).then((res)=>{
                this.Cascader = res.data.data;    
   
            })  
            
            this.get(this.allUrl.userPage,{page:1,rows:9}).then((res)=>{
            
                if(res.data.total){
                            this.totalNum = res.data.total
                            this.allUserNum = res.data.total
                        }else{
                            this.totalNum = 0
                            this.allUserNum = 0
                        }
                this.data1 = res.data.rows
                res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  if(i.status == '1'){
                      i.status = "在职"
                  }else{
                      i.status = "离职"
                  }
                })
            })

            this.get(this.allUrl.countUser).then((res)=>{
                this.inservice = res.data.data.inservice;
                this.departure = res.data.data.departure;
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
          
            height: 71px;line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 17px;margin-right: 5px;}
        }
        .state_con{
            display: flex;
            .all_users{
                height: 40px;line-height: 40px;width: 180px;text-align: center;
                background: #9e9c9c;color: #ffffff;margin:20px 0;font-size: 18px;
                margin-left: 40px;cursor: pointer;
            }
             .active{
                    background: rgb(100, 190, 226);
                }
        }
       .table{
           margin-left: 40px;
           .btn_tr{
                    width: 100%;height: 60px;
                    line-height: 60px;
                    }
            }

          
    }
</style>