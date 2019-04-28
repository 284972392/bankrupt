<template>
    <div class="checkStaff">
        <!-- <Button type="info" @click="userGrade='boss'">老板</Button>
        <Button type="info" @click="userGrade='organize'">机构负责人</Button>
         <Button type="info" @click="userGrade='operate'">运营</Button>
          <Button type="info" @click="userGrade='finance'">财务</Button> -->
        
        <Row>
       <Col span="11">
            <Card>
                <p slot="title">员工信息</p>
                <div class="staff_info">
                    <div class="top">基本信息</div>
                    <div class="content">
                         <div class="left"><img :src='staffInfo.headPic' alt=""></div> 
                         <!--<div class="left"><img src='http://p7u7xbigs.bkt.clouddn.com/null_b40ec5b3-f032-4f9d-ab79-a56d08fd07e0' alt=""></div>-->
                        <div class="right">
                            <p><span>姓名</span><span>{{staffInfo.realName}}</span></p>
                            <p><span>手机号</span><span>{{staffInfo.mobiPhone}}</span></p>
                            <p><span>所在机构</span><span>{{staffInfo.departName}}</span></p>
                            <p><span>角色</span><span>{{staffInfo.roleName}}</span></p>
                            <p><span>员工编号</span><span>{{staffInfo.id}}</span></p>
                            <p><span>QQ</span><span>{{staffInfo.qq}}</span></p>
                            <p><span>邮箱</span><span>{{staffInfo.email}}</span></p>
                            <p><span>固定电话</span><span>{{staffInfo.telPhone}}</span></p>
                            <p><span>加入时间</span><span>{{staffInfo.createTime}}</span></p>
                            <p><span>在职状态</span><span>{{staffInfo.status}}</span></p>
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
        <!-- ********************************************************高级管理员、总经理、董事长********************************************************* -->
        <!-- <Col span="11" offset="1" v-if="this.userGrade=='boss'?true:false">
            <Card>
                <p slot="title">平台信息</p>
                <div class="top">平台商户</div>
                 <Table border :columns="plaMer" :data="plaMer_data"></Table>
                 <div class="top">平台用户</div>
                 <Table border :columns="plaUser" :data="plaUser_data"></Table>
                 <div class="top">平台任务</div>
                 <Table border :columns="plaTask" :data="plaTask_data"></Table>
                 <div class="top">平台优惠</div>
                 <Table border :columns="plaSale" :data="plaSale_data"></Table>
            </Card>
        </Col> -->
        <!-- *********************************************************机构负责人********************************************************************* -->
         <!-- <Col span="11" offset="1"  v-if="this.userGrade=='organize'?true:false">
            <Card style="margin-bottom:20px;">
                <p slot="title">机构管辖信息</p>
                <div class="top">管辖商户</div>
                <Table border :columns="orgMer" :data="orgMer_data"></Table>
                <div class="top">管辖任务</div>
                <Table border :columns="orgTask" :data="orgTask_data"></Table>
                <div class="top">管辖优惠</div>
                <Table border :columns="orgDic" :data="orgDic_data"></Table>
            </Card>
            <Card>
                <p slot="title">个人管辖信息</p>
                <div class="top">管辖商户</div>
                <Table border :columns="orgMer" :data="orgMer_data"></Table>
                <div class="top">管辖任务</div>
                <Table border :columns="orgTask" :data="orgTask_data"></Table>
                <div class="top">管辖优惠</div>
                <Table border :columns="orgDic" :data="orgDic_data"></Table>
            </Card>
        </Col> -->
        <!-- *********************************************************运营********************************************************************* -->
        <!-- <Col span="11" offset="1"  v-if="this.userGrade=='operate'?true:false">
            <Card>
                <p slot="title">个人管辖信息</p>
                <div class="top">管辖商户</div>
                <Table border :columns="opeMer" :data="opeMer_data"></Table>
                <div class="top">管辖任务</div>
                <Table border :columns="opeTask" :data="opeTask_data"></Table>
                <div class="top">管辖优惠</div>
                <Table border :columns="opeDic" :data="opeDic_data"></Table>
            </Card>
        </Col> -->
        <!-- ********************************************************财务*********************************************************************** -->
        <!-- <Col span="11" offset="1" v-if="this.userGrade=='finance'?true:false">
            <Card>
                <p slot="title">平台信息</p>
                <div class="top">充值信息</div>
                 <Table border :columns="reCharge" :data="reCharge_data"></Table>
                 <div class="top">提现信息</div>
                 <Table border :columns="draw" :data="draw_data"></Table>
                 <div class="top">领取信息</div>
                 <Table border :columns="get" :data="get_data"></Table> 
            </Card>
        </Col> -->
    </Row>
    </div>
</template>










<script>
    export default {
        name:'checkStaff',
        data(){
            return{
                //  staffInfo:{},
                userGrade:'boss',//boss高级管理员、总经理、董事长
                 // *******************************************************高级管理员、总经理、董事长*********************************************************
                //******************************平台商户***************************
                plaMer:[
                    {title: '商户数量',key: 'plaMer_num'},
                    {title: '累计充值金额（元）',key: 'plaMer_sum'},
                    {title: '账户余额（元）',key: 'plaMer_balance'},
                    {title: '任务库存',key: 'plaMer_rep'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showPlaMer(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                plaMer_data:[
                    {plaMer_num:'很多商户',plaMer_sum:'10000',plaMer_balance:'1232',plaMer_rep:'30'}
                ],
                //********************************平台用户*******************************
                plaUser:[
                    {title: '用户数量',key: 'plaUser_num'},
                    {title: '累计充值金额（元）',key: 'plaUser_sum'},
                    {title: '账户余额（元）',key: 'plaUser_balance'},
                    {title: '任务库存',key: 'plaUser_rep'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showPlaUser(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                plaUser_data:[
                     {plaUser_num:'很多用户',plaUser_sum:'10000',plaUser_balance:'1232',plaUser_rep:'30'}
                ],
                // ****************************平台任务**********************************
                plaTask:[
                    {title: '任务数量',key: 'plaTask_num'},
                    {title: '任务库存',key: 'plaTask_rep'},
                    {title: '任务总金额（元）',key: 'plaTask_sum'},
                    {title: '待支出金额（元）',key: 'plaTask_wait'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showPlaTask(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                plaTask_data:[
                    {plaTask_num:'很多任务',plaTask_rep:'30',plaTask_sum:'1000',plaTask_wait:'8000'}
                    ],
                // ************************************平台优惠********************************
                plaSale:[
                     {title: '优惠总价（元）',key: 'plaSale_sum'},
                      {title: '操作',key: 'action',render: (h, params) => {
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
                                             this.showPlaSale(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                plaSale_data:[{plaSale_sum:'300'}],
                 // *******************************************************机构负责人****************************************************************
                //  ***************管辖商户***************
                  orgMer:[
                    {title: '商户数量',key: 'orgMer_num'},
                    {title: '累计充值金额（元）',key: 'orgMer_sum'},
                    {title: '账户余额（元）',key: 'orgMer_balance'},
                    {title: '任务库存',key: 'orgMer_rep'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showOrgMer(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                orgMer_data:[
                    {orgMer_num:'很多管辖商户',orgMer_sum:'10000',orgMer_balance:'1232',orgMer_rep:'30'}
                ],
                // *****************管辖任务****************
                  orgTask:[
                    {title: '任务数量',key: 'orgTask_num'},
                    {title: '任务库存',key: 'orgTask_rep'},
                    {title: '任务总金额（元）',key: 'orgTask_sum'},
                    {title: '待支出金额（元）',key: 'orgTask_wait'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showOrgTask(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                orgTask_data:[
                    {orgTask_num:'很多管辖任务',orgTask_rep:'10000',orgTask_sum:'1232',orgTask_wait:'30'}
                ],
                // ***************************管辖优惠**********
                 orgDic:[
                    {title: '优惠总价（元）',key: 'orgDic_sum'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showOrgDic(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                orgDic_data:[
                    {orgDic_sum:'很多管辖优惠'}
                ],
          
             // *******************************************************运营****************************************************************
                //  ***************管辖商户***************
                  opeMer:[
                    {title: '商户数量',key: 'opeMer_num'},
                    {title: '累计充值金额（元）',key: 'opeMer_sum'},
                    {title: '账户余额（元）',key: 'opeMer_balance'},
                    {title: '任务库存',key: 'opeMer_rep'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showOpeMer(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                opeMer_data:[
                    {opeMer_num:'很多管辖商户',opeMer_sum:'10000',opeMer_balance:'1232',opeMer_rep:'30'}
                ],
                // *****************管辖任务****************
                  opeTask:[
                    {title: '任务数量',key: 'opeTask_num'},
                    {title: '任务库存',key: 'opeTask_rep'},
                    {title: '任务总金额（元）',key: 'opeTask_sum'},
                    {title: '待支出金额（元）',key: 'opeTask_wait'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showOpeTask(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                opeTask_data:[
                    {opeTask_num:'很多管辖任务',opeTask_rep:'10000',opeTask_sum:'1232',opeTask_wait:'30'}
                ],
                // ***************************管辖优惠**********
                 opeDic:[
                    {title: '优惠总价（元）',key: 'opeDic_sum'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showOpeDic(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                opeDic_data:[
                    {opeDic_sum:'很多管辖优惠'}
                ],
                // ******************************************************************************财务****************************************************
                // **充值信息**
                reCharge:[
                    {title: '充值金额（元）',key: 'reCharge_num'},
                    {title: '商户账户余额（元）',key: 'reCharge_balance'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showReCharge(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                reCharge_data:[
                    {reCharge_num:'很多财务',reCharge_balance:'10000'}
                ],
                // **提现信息**
                draw:[
                    {title: '已提现金额（元）',key: 'draw_num'},
                    {title: '待审核金额（元）',key: 'draw_balance'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showDraw(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                draw_data:[
                    {draw_num:'很多提现',draw_balance:'10000'}
                ],
                // **领取信息**
                 get:[
                    {title: '已提现金额（元）',key: 'get_num'},
                    {title: '待审核金额（元）',key: 'get_balance'},
                    {title: '操作',key: 'action',render: (h, params) => {
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
                                            this.showGet(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }}
                ],
                get_data:[
                    {get_num:'很多领取',get_balance:'10000'}
                ]
            }
               
        },
        methods:{
            // *******************************************************高级管理员、总经理、董事长*********************************************************
            // 查看平台商户
             showPlaMer (index) {
                this.$Modal.info({
                    title: 'title',
                    content: `${this.plaMer_data[index].plaMer_num}`
                })
            },
            // 查看平台用户
            showPlaUser(index) {
                this.$Modal.info({
                    title: 'title',
                    content: `${this.plaUser_data[index].plaUser_num}`
                })
            },
            // 查看平台任务
            showPlaTask(index) {
                this.$Modal.info({
                    title: 'title',
                    content: `${this.plaTask_data[index].plaTask_num}`
                })
            },
            // 查看平台优惠
            showPlaSale(index) {
                this.$Modal.info({
                    title: 'title',
                    content: `${this.plaSale_data[index].plaSale_sum}`
                })
                },
            // ******************************************************************机构负责人**********************************************************************
            //管辖商户
            showOrgMer(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.orgMer_data[index].orgMer_num}`
                })
            },
            // 管辖任务
            showOrgTask(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.orgTask_data[index].orgTask_num}`
                })
            },
            // 管辖优惠
            showOrgDic(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.orgDic_data[index].orgDic_sum}`
                })
            },
            // ******************************************************************运营**********************************************************************
            //管辖商户
            showOpeMer(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.orgMer_data[index].orgMer_num}`
                })
            },
            // 管辖任务
            showOpeTask(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.orgTask_data[index].orgTask_num}`
                })
            },
            // 管辖优惠
            showOpeDic(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.orgDic_data[index].orgDic_sum}`
                })
            },
            // *****************************************************************财务****************************************************
            // 充值信息
            showReCharge(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.reCharge_data[index].reCharge_num}`
                })
            },
            // 提现信息
            showDraw(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.draw_data[index].draw_num}`
                })
            },
            // 领取信息
            showGet(index){
                this.$Modal.info({
                    title: 'title',
                    content: `${this.get_data[index].get_num}`
                })
            }
        },
        computed: {
			staffInfo() {
                let info = this.$store.state.staffInfo;
      
                info.createTime = changeTime(info.createTime);
                if(info.status == '1'){
                    info.status = "在职"
                }else{
                    info.status = "离职"
                }
                return info;
			}
		},
		
        beforeMount () {
          
          }
    }

     function changeTime(param) { 
             var d = new Date(param);
            var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
             return times;
          }

</script>

<style scoped lang='scss'>
    .checkStaff{
        height: 100%;
        width: 100%;
        padding: 30px;
        text-align: left;
        overflow: auto;
         .top{
                font-weight: bold;
                margin-bottom: 20px;
                margin-top: 10px;
            }
        .staff_info{
            .content{
                display: flex;
                .left{
                    width: 30%;
                    margin-left: 30px;
                    img{
                        border: 1px solid #000;
                        width: 100px;height: 100px;
                        display: inline-block;
                        }
                }
                .right{
                    p{
                        line-height: 50px;color:#000;
                        span:nth-child(1){
                            display: inline-block;
                            width: 100px;
                        }
                        }
                }
            }
        }
    }
</style> 