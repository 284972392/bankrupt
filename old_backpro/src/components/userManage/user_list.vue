<template>
    <div class="home">
        <div class="title">用户列表</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="用户编号/用户手机号/用户名称" style="width: 26%;" size="large"></Input>
            <!-- 用户等级
            <Select v-model="model1" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> -->
            
          	  选择时间段
                 <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
      	<!-- <DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
      	<DatePicker type="date" :value="endTime_" @on-change="endTime" placeholder="Select date" style="width: 200px"></DatePicker> -->
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>
          
            <!-- <ButtonGroup size="large">
                <Button type="primary" ghost>清空</Button>
            </ButtonGroup> -->
        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="All()">全部用户({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="Normal()">正常用户({{userNum.normal}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="illegal()">违规用户({{userNum.violation}})</div>
       </div>
        
       

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->

                <!-- <Button @click="blacklist1()" style="margin-right: 10px;">拉入黑名单</Button>
                <Button @click="Unblacklist()" style="margin-right: 10px;">取消黑名单</Button> -->

            </td>
   		   <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->

         <!-- 拉入黑名单确认弹框 -->
        <Modal
            v-model="blacklist"
            title="确认拉入黑名单"
            @on-ok="goBlack"
         >
            <p>确认拉入黑名单?</p>
        </Modal>
          <!-- 取消黑名单确认弹框 -->
        <Modal
            v-model="whitelist"
            title="确认取消黑名单"
            @on-ok="goWhite"
         >
            <p>确认拉入黑名单?</p>
        </Modal>

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
                selectTime_:'',
            	startTime_:"",
            	endTime_:"",
                appUserId:'',
                whitelist:false,
                blacklist:false,
                userNum:{},
                shows:'1',
                value:'',
                allNum:0,
                status:'',
                totalNum:0,
                 pageNum:1,
                pageSize:9,
                 cityList: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '填',
                        label: '填'
                    },
                    {
                        value: '啥',
                        label: '啥'
                    },
                    {
                        value: '啊',
                        label: '啊'
                    },
                    {
                        value: '晕',
                        label: '晕'
                    },
                    {
                        value: '死',
                        label: '死'
                    }
                ],
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
                        title: '用户编号',
                        align: 'center',
                        key: 'id',
                        width:112
                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'nickName',
                        width:100
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'phone',
                        width:115
                    },
                    {
                        title: '账户余额（元）',
                        align: 'center',
                        key: 'balance',
                        width:100
                    },
                     {
                        title: '金币余额（个）',
                        align: 'center',
                        key: 'goldAmount',
                        width:100
                    },
                     {
                        title: 'device',
                        align: 'center',
                        key: 'device',
                        width:200
                    },

                     {
                        title: '地区',
                        align: 'center',
                        key: 'area',
                        width:150
                    },
                     {
                        title: '上级用户',
                        align: 'center',
                        key: 'parentName',
                        width:100
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width:100
                    },
                    {
                        title: '注册时间',
                        align: 'center',
                        key: 'createTime',
                        width:150
                    },
                    {
                        title: '距离上次登录时间',
                        align: 'center',
                        key: 'lastTime',
                        width:150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:200,
                        fixed:'right',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.status == '正常用户'){
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
                                           this.checkUser(params)
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
                                                this.blacklist = true
                                                this.appUserId = params.row.id
                                            }
                                        }
                                    }, '拉入黑名单')
                               ]);
                            }else{
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
                                         this.checkUser(params)
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
                                                this.whitelist = true
                                                this.appUserId = params.row.id
                                            }
                                        }
                                    }, '取消黑名单')
                               ]);
                            }
                           
                        }
                    }
                ],
                data1:[]
            }
        },
        methods:{
        	SelectTime(data){
                  this.selectTime_ = data
                this.startTime_ = data[0]
                this.endTime_ = data[1]
            },
        	clear(){
                this.value = ''
                this.startTime_=""
                this.endTime_ =""
                this.selectTime_ = ''
        	},
        	checkUser(params){
        		localStorage.setItem("appUserId",params.row.id)
        		this.$router.push('/checkUser')

        	},
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            Charge(){
            },
            //全部用户
            All(){
                this.status = ''
                this.shows = 1
                this.value = ''
                
                 this.get(this.allUrl.findAppUserPage,{page:1,rows:9,nickName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total       
                        res.data.rows.forEach((i,index)=>{        
                                i.lastTime = this.changeTime(i.lastTime)
                                i.createTime = this.changeTime(i.createTime)
                                 i.status = changeStatus(i.status)
                            })
                        this.data1 = res.data.rows
                    })
  
            },
            //正常用户
            Normal(){
                this.shows = 2
                this.status = 1
                 this.get(this.allUrl.findAppUserPage,{page:1,rows:9,status:1,nickName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total       
                        res.data.rows.forEach((i,index)=>{        
                                i.lastTime = this.changeTime(i.lastTime)
                                i.createTime = this.changeTime(i.createTime)
                                 i.status = changeStatus(i.status)
                            })
                        this.data1 = res.data.rows
                    })
            },
            //违规用户
            illegal(){
                this.shows = 3
                   this.status = 0
                 this.get(this.allUrl.findAppUserPage,{page:1,rows:9,status:0,nickName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total       
                        res.data.rows.forEach((i,index)=>{        
                                i.lastTime = this.changeTime(i.lastTime)
                                i.createTime = this.changeTime(i.createTime)
                                 i.status = changeStatus(i.status)
                            })
                        this.data1 = res.data.rows
                    })
            },
            // 拉入黑名单
            goBlack(){               
                this.$http({
						method:'POST',
						url: this.allUrl.updateAppUserStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.appUserId,
                                status:'0'
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('已拉入黑名单');
                             this.get(this.allUrl.findAppUserPage,{page:this.pageNum,rows:9,nickName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                                 this.data1 = res.data.rows;        
                                  this.totalNum = res.data.total          
                                res.data.rows.forEach((i,index)=>{        
                                  i.lastTime = this.changeTime(i.lastTime)
                                  i.createTime = this.changeTime(i.createTime)
                                  i.status = changeStatus(i.status)
                                })
                             })
                            }
                        })
            },
            // 取消黑名单
            goWhite(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateAppUserStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.appUserId,
                                status:'1'
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('已取消黑名单');
                             this.get(this.allUrl.findAppUserPage,{page:this.pageNum,rows:9,nickName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                                 this.data1 = res.data.rows;        
                                  this.totalNum = res.data.total          
                                res.data.rows.forEach((i,index)=>{        
                                  i.lastTime = this.changeTime(i.lastTime)
                                  i.createTime = this.changeTime(i.createTime)
                                  i.status = changeStatus(i.status)
                                })
                             })
                            }
                        })
            },
            //************按钮****************

            //筛选拉入黑名单
            blacklist1(){

            },
            //筛选取消黑名单
            Unblacklist(){
                
            },
            handlePageSize(value){
                 this.pageNum = value;
                 this.get(this.allUrl.findAppUserPage,{page:value,rows:9,nickName:this.value,status:this.status,nickName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                 this.totalNum = res.data.total       
                    res.data.rows.forEach((i,index)=>{        
                            i.lastTime = this.changeTime(i.lastTime)
                            i.createTime = this.changeTime(i.createTime)
                             i.status = changeStatus(i.status)
                        })
                    this.data1 = res.data.rows
                })
            },
            search(){
//              if(this.value == ''){
//                  this.$Message.warning('查询内容不能为空！');
//              }
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else{
                    this.pageNum = 1;
                    this.get(this.allUrl.findAppUserPage,{page:1,rows:9,nickName:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
                    this.totalNum = res.data.total       
                        res.data.rows.forEach((i,index)=>{        
                                i.lastTime = this.changeTime(i.lastTime)
                                i.createTime = this.changeTime(i.createTime)
                                i.status = changeStatus(i.status)
                            })
                        this.data1 = res.data.rows
                    })
                }
             
            }
        },
        beforeMount () {
            

            this.get(this.allUrl.findAppUserPage,{page:1,rows:9}).then((res)=>{
            	console.log(res)
                if(res.data.total){
                    this.totalNum = res.data.total    
                    this.allNum = res.data.total   
                }else{
                    this.totalNum = 0
                    this.allNum = 0
                }
                 
                res.data.rows.forEach((i,index)=>{        
                        i.lastTime = this.changeTime(i.lastTime)
                        i.createTime = this.changeTime(i.createTime)
                         i.status = changeStatus(i.status)
                    })
                 this.data1 = res.data.rows
                })
            this.get(this.allUrl.countAppUser).then((res)=>{
                this.userNum = res.data.data;
            })
        }
    }

     function changeStatus (param) {  
         if(param == '1'){
             return '正常用户'
         }else if(param == '0'){
             return '违规用户'
         }
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
           line-height: 71px;font-size: 24px;padding: 10px 0 10px 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 17px;margin-right: 55px;}
        }
    .state_con{
        display: flex;
        .btn_state{
            height: 40px;line-height: 40px;padding: 0 10px;text-align: center;
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