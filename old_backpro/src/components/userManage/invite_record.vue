<template>
    <div class="home">
        <div class="title">邀请记录</div>
        <div class="search">
            <div>
                搜索
                <Input v-model="value" placeholder="搜索用户编号/用户手机号/用户名称" style="width: 25%;" size="large"></Input>
                时间段
                <DatePicker type="datetimerange" :value='selectTime_' placeholder="请选择时间段" @on-change='SelectTime' style="width: 300px;font-size:18px;"></DatePicker>
            </div>
            <div>
                状态
                <Select v-model="selectStatus" style="width:200px;margin-right:15px;margin-left:15px;">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                通道
                <Select v-model="selectChannel" style="width:200px">
                    <Option v-for="item in channelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>

                 <ButtonGroup size="large">
                    <Button type="primary" ghost @click="search">查询</Button>   
                    <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                </ButtonGroup>
            </div>

             <Modal
				        title="查看"
				        v-model="checkModel"
				        width="400"
				        class-name="delateBox">
				     
                      <Row>
                        <Col span="12">	 		    
                           <p class="wtf">用户名称</p>   
                           <p class="wtf">用户手机号</p>   
                           <p class="wtf">状态</p>    
                           <p class="wtf">被邀请人名称</p>   
                           <p class="wtf">被邀请人手机号</p>   
                           <p class="wtf">用户编号</p>   
                           <p class="wtf">邀请通道</p>    
                           <p class="wtf">邀请时间</p>   
                           <p class="wtf">被邀请人编号</p>   
                        </Col>
                         <Col span="12" offset="0">   	 		    
                           <p class="wtf">{{checkInfo.userName}}</p>
                           <p class="wtf">{{checkInfo.userPhone}}</p>
                           <p class="wtf">{{checkInfo.status}}</p>
                           <p class="wtf">{{checkInfo.invitedUserName}}</p>
                           <p class="wtf">{{checkInfo.invitedUserPhone}}</p>
                           <p class="wtf">{{checkInfo.userId}}</p>
                           <p class="wtf">{{checkInfo.channel}}</p>
                           <p class="wtf">{{checkInfo.inviteTime}}</p>
                           <p class="wtf">{{checkInfo.invitedUserId}}</p>
                        </Col>
                    </Row>  
				    </Modal>

           
            
        </div>
       
       <div class="state_con">
            <div class="btn_state active" @click="All()">全部用户({{totalNum}})</div>
       </div>
        

        
    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
            </td>
   		   <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>

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
                checkInfo:{},
                checkModel:false,
                selectChannel:'',
                selectStatus:'',
                statusList:[
                    {
                        value: '1',
                        label: '正常用户'
                    },
                    {
                        value: '0',
                        label: '违规用户'
                    },
                    {
                        value: '',
                        label: '全部'
                    }
                ],
                channelList:[
                    {
                        value: 'QQ',
                        label: 'QQ'
                    },
                    {
                        value: '朋友圈',
                        label: '朋友圈'
                    },
                    {
                        value: '微信',
                        label: '微信'
                    },
                    {
                        value: 'QQ空间',
                        label: 'QQ空间'
                    },
                    {
                        value: '二维码',
                        label: '二维码'
                    },
                    {
                        value: '链接',
                        label: '链接'
                    },
                    {
                        value: '',
                        label: '全部'
                    }
                ],
                selectTime_:'',
            	startTime_:"",
            	endTime_:"",
                value:'',
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
                        title: '用户编号',
                        align: 'center',
                        key: 'id',
                        width:112
                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'userName',
                        width:130
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'userPhone',
                        width:180
                    },
                    {
                        title: '通道',
                        align: 'center',
                        key: 'channel',
                        width:120
                    },
                     {
                        title: '邀请时间',
                        align: 'center',
                        key: 'inviteTime',
                        width:180
                    },
                     {
                        title: '被邀请人编号',
                        align: 'center',
                        key: 'invitedUserId',
                        width:200
                    },

                     {
                        title: '被邀请人名称',
                        align: 'center',
                        key: 'invitedUserName',
                        width:150
                    },
                     {
                        title: '被邀请人手机号',
                        align: 'center',
                        key: 'invitedUserPhone',
                        width:180
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width:127
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:200,
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
                                           this.checkUser(params)
                                        }
                                    }
                                    }, '查看')
                               ]);
                          
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
                this.selectChannel = ''
                this.selectStatus = ''
        	},
        	checkUser(params){
                console.log(params.row)
                this.checkInfo = params.row;
                this.checkModel = true
            },

             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);

            },
            //全部用户
            All(){
                this.value = ''
                this.startTime_=""
                this.endTime_ =""
                this.selectTime_ = ''
                this.selectChannel = ''
                this.selectStatus = ''
                this.pageNum = 1
                 this.get(this.allUrl.findAppInviteRecordPage,{page:1,rows:9}).then((res)=>{
                    this.totalNum = res.data.total       
                        res.data.rows.forEach((i,index)=>{        
                                i.status = changeStatus(i.status)
                            })
                        this.data1 = res.data.rows
                    })
  
            },
        
            handlePageSize(value){
                 this.pageNum = value;
                 this.get(this.allUrl.findAppInviteRecordPage,{page:value,rows:9,userName:this.value,status:this.selectStatus,beginTime:this.startTime_,finishTime:this.endTime_,channel:this.selectChannel}).then((res)=>{
                 this.totalNum = res.data.total       
                    res.data.rows.forEach((i,index)=>{        
                            i.status = changeStatus(i.status)
                        })
                    this.data1 = res.data.rows
                })
            },
            search(){
               
                    this.pageNum = 1;
                    this.get(this.allUrl.findAppInviteRecordPage,{page:1,rows:9,userName:this.value,status:this.selectStatus,beginTime:this.startTime_,finishTime:this.endTime_,channel:this.selectChannel}).then((res)=>{
                    this.totalNum = res.data.total       
                        res.data.rows.forEach((i,index)=>{        
                                 i.status = changeStatus(i.status)
                            })
                        this.data1 = res.data.rows
                    })
                }
             
            
        },
        beforeMount () {
            this.get(this.allUrl.findAppInviteRecordPage,{page:1,rows:9}).then((res)=>{
                if(res.data.total){
                    this.totalNum = res.data.total    
                }else{
                    this.totalNum = 0
                }
                 console.log(res.data)
                res.data.rows.forEach((i,index)=>{        
                         i.status = changeStatus(i.status)
                    })
                 this.data1 = res.data.rows
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
.wtf{
    height: 50px;
    font-size: 16px;
    color: #000000;
}
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
            .ivu-input-wrapper{margin-left: 15px;margin-right: 5px;}
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