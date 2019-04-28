<template>
    <div class="home">
        <div class="title">任务列表</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="任务编号/任务名称/商家名称" style="width: 15%;" size="large"></Input>
            创建人员
            <!-- <Input v-model="staff" placeholder="创建人员" style="width: 15%;" size="large"></Input> -->
            <Select v-model="staff" style="width:15%;margin-left:20px;" size="large">
                <Option v-for="item in staffList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            任务类别
            <Select v-model="model1" style="width:15%;margin-left:20px;" size="large">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>   
            </ButtonGroup>

        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllTask()">全部任务({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="Check()">待审核({{taskNum.toAudit}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="Putaway()">待上架({{taskNum.shelves}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="OnGoing()">已上架({{taskNum.ongoing}})</div>
            <div class="btn_state" :class="{active:shows==5}" @click="Pause()">已暂停({{taskNum.suspended}})</div>
            <div class="btn_state" :class="{active:shows==6}" @click="Soldout()">已下架({{taskNum.theShelves}})</div>
            <div class="btn_state" :class="{active:shows==7}" @click="Back()">已退回({{taskNum.returned}})</div>
            <div class="btn_state" :class="{active:shows==8}" @click="toSubmit()">待提交({{taskNum.toSubmit}})</div>
            <div class="btn_state" :class="{active:shows==9}" @click="toRecharge()">待充值({{taskNum.toRecharge}})</div>
            <div class="btn_state" :class="{active:shows==10}" @click="toFiCheck()">待财务审核({{taskNum.toFinancialAudit}})</div>
            <div class="btn_state" :class="{active:shows==11}" @click="FailRecharge()">充值失败({{taskNum.fail}})</div>
            <div class="btn_state" :class="{active:shows==12}" @click="closedRecharge()">已终止({{taskNum.closed}})</div>
       </div>
        
    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=495></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
                <!--<Button @click="submit()" style="margin-right: 10px;">提交</Button>
                <Button @click="Put_away()" style="margin-right: 10px;">上架</Button>
                <Button @click="remove()" style="margin-right: 10px;">删除</Button>-->

            </td>
  
              <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->
        
         <!-- 提交确认弹框 -->
        <Modal
            v-model="sub"
            title="确认提交"
            @on-ok="subOk"
           >
            <p>确认提交?</p>
        </Modal>
         <!-- 办卡提交确认弹框 -->
        <Modal
            v-model="sub2"
            title="确认提交"
            @on-ok="subOk2"
           >
            <p>确认提交?</p>
        </Modal>
         <!-- 删除确认弹框 -->
        <Modal
            v-model="delect"
            title="确认删除"
            @on-ok="delectOk"
         >
            <p>确认删除?</p>
        </Modal>
        <!-- 充值申请弹窗 -->
        <Modal
            v-model="recharge" 
         >
         <p slot="header" style="text-align:center">
            <span>充值申请</span>
        </p>
            <p style="font-size:16px;margin-bottom:10px;">商户名称&nbsp;&nbsp;&nbsp;&nbsp;{{tenantName}}</p>
            <P style="font-size:16px;margin-bottom:10px;">商户编号&nbsp;&nbsp;&nbsp;&nbsp;{{tenantId}}</P>
            <p style="font-size:16px;margin-bottom:10px;">所需金额&nbsp;&nbsp;&nbsp;&nbsp;{{amount}}</p>
            <p style="font-size:16px;margin-bottom:10px;">当前余额&nbsp;&nbsp;&nbsp;&nbsp;{{balance}}</p>
            <p class="wtf">是否已充值
                <RadioGroup v-model="preloaded">
					<Radio label='true'>
						<span>已充值</span>
					</Radio>
					<Radio label='false'>
						<span>未充值</span>
					</Radio>
				</RadioGroup>    
             </p>
           <div slot="footer">
            <Button style="color:#fff;background:#265dca;" size="large" long :loading="modal_loading" @click="rechargeOk">提交申请</Button>
           </div>
        </Modal>
        
         <!-- 上架弹框 -->
        <Modal
            v-model="reshelf"
            title="选择上架时间"
            @on-ok="reshelfOk"
          >
              <DatePicker type="date" placeholder="请选择上架时间" :options="noToday" :value="reshelfTime" @on-change="ChangereshelfTime"></DatePicker>
              <DatePicker type="date" placeholder="请选择下架时间" :options="noToday" :value="reTheShelfTime" @on-change="ChangereTheShelfTime"></DatePicker>
        </Modal>
        <!-- 补货上架弹框 -->
         <Modal
            v-model="addGoodReshelf"
            title="选择上架时间"
            @on-ok="addGoodReshelfOk"
          >
        	
           <Row>
       	 <Col span="11">      
            <p class="wtf">任务库存</p>	 		    
            <p class="wtf">设置补货数量</p>	 
            <p class="wtf">设定上架时间</p>	 
            <p class="wtf">设定下架时间</p>	 
            <p class="wtf">账户余额</p>	 
            <p class="wtf">需充值金额</p>
       	 </Col>
            <Col span="13" offset="0">
               <p class="wtf">{{addInventory}}份</p>	 		    
               <p class="wtf"><InputNumber v-model="addGoodsNum" placeholder="请输入任务数量" :min="0" :formatter="value => `${value}份`" :parser="value => value.replace('份', '')"></InputNumber></p>	 
               <p class="wtf"><DatePicker type="date" placeholder="请选择上架时间" :options="noToday" :value="reshelfTime" @on-change="ChangereshelfTime"></DatePicker></p>	 
               <p class="wtf"><DatePicker type="date" placeholder="请选择下架时间" :options="noToday" :value="reTheShelfTime" @on-change="ChangereTheShelfTime"></DatePicker></p>	 
               <p class="wtf">{{balance}}元</p>	 
               <p class="wtf">{{addNeedMoney}}元</p> 		
            </col>
       </Row>
        </Modal>
        <!-- 商户余额不足时，充值弹框 -->
            <Modal
                v-model="merchantRecharge"
                title="充值提醒"
                @on-ok="merchantRechargeOk"
                >
            <p class="wtf">账户余额不足，需要充值金额<span style="color:red;">{{addNeedMoney}}</span>元，是否提交？并确定是否已充值</p>
            <p class="wtf">是否已充值
                <RadioGroup v-model="preloaded">
					<Radio label='true'>
						<span>已充值</span>
					</Radio>
					<Radio label='false'>
						<span>未充值</span>
					</Radio>
				</RadioGroup>    
             </p>
            </Modal>
        <!-- 补货弹框 -->
        <Modal
            v-model="addGoods"
            title="补货"
            @on-ok="addGoodsOk"
          >
             
              <Row>
       	 <Col span="11">      
            <p class="wtf">任务库存</p>	 		    
            <p class="wtf">设置补货数量</p>	  
            <p class="wtf">账户余额</p>	 
            <p class="wtf">需充值金额</p>
       	 </Col>
            <Col span="13" offset="0">
               <p class="wtf">{{addInventory}}份</p>	 		    
               <p class="wtf"><InputNumber v-model="addGoodsNum" placeholder="请输入任务数量" :min="1" :formatter="value => `${value}份`" :parser="value => value.replace('份', '')"></InputNumber></p>	 
               <p class="wtf">{{balance}}元</p>	 
               <p class="wtf">{{addNeedMoney}}元</p> 		
            </col>
       </Row>
        </Modal>
        <!-- 暂停弹窗 -->
         <Modal
            v-model="pause"
            title="暂停原因"
            @on-ok="pauseOk"
          >
          <Input v-model="pauseReson" type="textarea" placeholder="请输入暂停原因" />
        </Modal>
          <!-- 下架确认弹框 -->
        <Modal
            v-model="unshelf"
            title="确认下架"
            @on-ok="unshelfOk"
         >
            <p>确认下架?</p>
        </Modal>
           <!-- 终止确认弹框 -->
        <Modal
            v-model="breakUp"
            title="确认终止"
            @on-ok="breakUpOk"
         >
            <p>确认终止?</p>
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
                staffList:[],
                noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                staff:'',
                preloaded:'false',
                breakUp:false,
                unshelf:false,
                recharge:false,
                merchantRecharge:false,
                modal_loading:false,
                delect:false,
                sub:false,
                sub2:false,
                reshelf:false,
                addGoodReshelf:false,
                // 补货上架的字段
                     //库存、补货数量
                addInventory:0,
                addGoodsNum:0,
           
                // 补货数量
                goodsNum:1,
                addGoods:false,
                tenantName:'',
                balance:0,
                singlePrice:0,
                nowType:'',
                nowStatus:'',
                taskNum:'',
                // 所需金额
                amount:0,
                 // 上架时间
                reshelfTime:'',
                reTheShelfTime:'',
                //暂停原因
                pause:false,
                pauseReson:'',
                id:'',
                tenantId:'',
                allNum:0,
                totalNum:0,
                pageNum:1,
                pageSize:9,
                shows:'1',
                value:'',
                 cityList: [
                    {
                        value: '应用赚',
                        label: '应用赚'
                    },
                    {
                        value: '注册赚',
                        label: '注册赚'
                    },
                    {
                        value: '办卡赚',
                        label: '办卡赚'
                    }
                ],
                model1: '',
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
                        title: '任务编号',
                        align: 'center',
                        key: 'id',
                        width:100
                    },
                     {
                        title: '任务类别',
                        align: 'center',
                        key: 'type',
                        width:100
                    },
                    {
                        title: '任务名称',
                        align: 'center',
                        key: 'name',
                        width:150
                    },
                    {
                        title: '商户名称',
                        align: 'center',
                        key: 'tenantName',
                        width:150
                    },
                    {
                        title: '创建人员',
                        align: 'center',
                        key: 'createBy',
                        width:100
                    },
                    {
                        title: '预约上架时间',
                        align: 'center',
                        key: 'shelvesTime',
                        width:150
                    },
                     {
                        title: '预约下架时间',
                        align: 'center',
                        key: 'theShelvesTime',
                        width:150
                    },
                     {
                        title: '任务库存',
                        align: 'center',
                        key: 'inventory',
                        width:150
                    },
                    {
                        title: '任务余额（元）',
                        align: 'center',
                        key: 'taskBalance',
                        width:150
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width:150
                    },
                    {
                        title: '操作时间',
                        align: 'center',
                        key: 'updateTime',
                        width:180
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 238,
                        fixed:'right',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.status == '待提交'){
                                //*****************************************待提交状态下******************************************* */
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                         style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                         style: {
                                        margin: '5px'
                                    },
                                        on: {
                                            click: () => {
                                                this.recompose(params)
                                            }
                                        }
                                    }, '修改'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                         style: {
                                        margin: '5px'
                                    },
                                        on: {
                                            click: () => {                                            
                                                this.subOpen(params)
                                            }
                                        }
                                    }, '提交'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                         style: {
                                        margin: '5px'
                                    },
                                        on: {
                                            click: () => {
                                                 if(params.row.type=='注册赚'||params.row.type=='应用赚'){
                                                    this.delect = true;
                                                    this.id = params.row.id;
                                                    this.tenantId = params.row.tenantId;
                                                 }
                                            }
                                        }
                                    }, '删除')
                                ]);
                            }else if(params.row.status == '待审核'){
                                //*****************************************待审核状态下******************************************* */
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.audit(params)
                                            }
                                        }
                                    }, '审核')
                                ]);
                            }else if(params.row.status == '待充值'){
                                 //**********************************************待充值状态下***************************************** */
                                 return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                               this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.recharge = true
                                                this.tenantName = params.row.tenantName
                                                this.id = params.row.id
                                                this.tenantId = params.row.tenantId
                                                this.balance = params.row.balance
                                                this.amount = params.row.totalPrice - params.row.balance
                                            }
                                        }
                                    }, '充值申请')
                                ]);
                            }else if(params.row.status == '待财务审核'){
                                 //*****************************************待财务审核状态下**************************************** */
                                      return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看')
                                ]);
                            }else if(params.row.status == '已退回'){
                                 //*******************************************已退回状态下**************************************** */
                                 return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.recompose(params)
                                            }
                                        }
                                    }, '修改')
                                ]);
                            }else if(params.row.status == '待上架'){
                                //****************************************待上架状态下***************************************** */
                                 return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.recompose(params)
                                            }
                                        }
                                    }, '修改'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.reshelfTime = '';
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                                this.reshelf = true;
                                            }
                                        }
                                    }, '上架')
                                ]);
                            }else if(params.row.status == '已上架'){
                                 //****************************************已上架状态下***************************************** */
                                   return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                               this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                               this.pauseReson = '';
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                                this.pause = true;
                                            }
                                        }
                                    }, '暂停'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                console.log(params.row)
                                                this.reshelfTime = ''
         
                                                this.balance = params.row.balance
                                                this.singlePrice = params.row.singlePrice
                                                this.addGoods = true;
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                         
                                                 this.addInventory = params.row.inventory
                                           
                                           
                                                
                                            }
                                        }
                                    }, '补货'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.unshelf = true;
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                            }
                                        }
                                    }, '下架')

                                ]);
                            }else if(params.row.status == '已暂停'){
                                  //****************************************已暂停状态下***************************************** */
                                     return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.recompose(params)
                                            }
                                        }
                                    }, '修改'),
                                          h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.breakUp = true
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                            }
                                        }
                                    }, '终止')
                                ]);
                            }else if(params.row.status == '已下架'){
                                 //****************************************已下架状态下***************************************** */
                                
                                // if(params.row.inventory>0){
                                      return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                               this.check(params)
                                            }
                                        }
                                    }, '查看'),
                         
                                                // this.addGoods = true;
                                                // this.id = params.row.id;
                                                // this.balance = params.row.balance
                                                // this.singlePrice = params.row.singlePrice
                       
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {

                                                this.singlePrice = params.row.singlePrice
                                                 this.addInventory = params.row.inventory
                                                this.addGoodReshelf = true;
                                                this.balance = params.row.balance
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                                
                                            }
                                        }
                                    }, '补货上架'),

                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                            margin: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.breakUp = true
                                                    this.id = params.row.id;
                                                    this.tenantId = params.row.tenantId;
                                                }
                                            }
                                        }, '终止')
                                        
                                    ]);
                               
                                   
                            }else if(params.row.status == '充值失败'){
                                //****************************************已关闭状态下***************************************** */
                                  return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                        margin: '5px'
                                         },
                                        on: {
                                            click: () => {
                                                this.recharge = true
                                                this.tenantName = params.row.tenantName
                                                this.id = params.row.id
                                                this.tenantId = params.row.tenantId
                                                this.balance = params.row.balance
                                                this.amount = params.row.totalPrice - params.row.balance
                                            }
                                        }
                                    }, '充值申请')
                                ]);
                            }else if(params.row.status == '已终止'){
                                //****************************************已终止状态下***************************************** */
                                  return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.check(params)
                                            }
                                        }
                                    }, '查看')
                                   
                                ]);
                            }
                          
                        }
                    }
                ],
                data1:[]
            }
        },
          computed:{
            addNeedMoney:function(){
                let a = this.balance - (this.singlePrice*this.addGoodsNum);
                return a>=0?0:-a;
            }
        },
        methods:{
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            Charge(){
                console.log('充值')
            },
            //全部任务
            AllTask(){
                this.staff = '';
                this.pageNum = 1;
                this.nowStatus = '';
                this.model1 = '';
                this.nowType = '';
                this.shows = 1;
                 this.get(this.allUrl.findTaskPage,{page:1,rows:9}).then((res)=>{
                    this.allNum = res.data.total     
                      this.data1 = res.data.rows;        
                if(res.data.total){ 
                              this.allNum = res.data.total     
                            this.totalNum = res.data.total          
                        }else{
                            this.totalNum = 0  
                            this.allNum = 0      
                            }
                    res.data.rows.forEach((i,index)=>{        
                        i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                        i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                        i.updateTime = this.changeTime(i.updateTime)
                         i.status = changeStatus(i.status)
                    })
               })
            },
            //待审核
            Check(){
                this.pageNum = 1;
                this.shows = 2
                this.nowStatus = 2
                this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //待上架
            Putaway(){
                this.pageNum = 1
                this.shows = 3
                this.nowStatus = 6
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //进行中
            OnGoing(){
                this.pageNum = 1
                this.shows = 4
                this.nowStatus = 7
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //已暂停
            Pause(){
                this.pageNum = 1
                this.shows = 5
                this.nowStatus = 8
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //已下架
            Soldout(){
                this.pageNum = 1
                this.shows = 6
                this.nowStatus = 9
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //已退回
            Back(){
                this.pageNum = 1
                this.shows = 7
                this.nowStatus = 5
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            // 待提交
            toSubmit(){
                this.pageNum = 1
                this.shows = 8
                this.nowStatus = 1
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            // 待充值
            toRecharge(){
                this.pageNum = 1
                this.shows = 9
                this.nowStatus = 3
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //待财务审核
            toFiCheck(){
                this.pageNum = 1
                this.shows = 10  
                this.nowStatus = 4
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //充值失败
            FailRecharge(){
                this.pageNum = 1
                this.shows = 11
                this.nowStatus = 11
                  this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            // 已终止
            closedRecharge(){
                this.pageNum = 1
                this.shows = 12
                this.nowStatus = 10
                this.get(this.allUrl.findTaskPage,{page:1,rows:9,type:this.nowType,status:this.nowStatus,createBy:this.staff,name:this.value}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
            },
            //************按钮****************
            //提交
            submit(){

            },
            //上架
            Put_away(){

            },
            //删除
            remove(){

            },
            search(){
                if(this.value==''&&this.model1==''&&this.staff==''){
                    this.$Message.warning('查询内容不能为空！');
                }else{
                    this.nowType = this.model1
                     this.get(this.allUrl.findTaskPage,{page:1,rows:9,name:this.value,type:this.model1,createBy:this.staff}).then((res)=>{
                        this.data1 = res.data.rows;        
                        if(res.data.total){    
                                this.totalNum = res.data.total          
                            }else{
                                this.totalNum = 0        
                                }
                            res.data.rows.forEach((i,index)=>{        
                            i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                            i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                            i.updateTime = this.changeTime(i.updateTime)
                            i.status = changeStatus(i.status)
                            })
                     })
                      this.get(this.allUrl.countTask,{type:this.model1}).then((res)=>{         
                        this.taskNum = res.data.data;
                    })
                }
            },
            clear(){
                this.model1 = '';
                this.value = '';
                this.nowType = '';
                this.staff = '';
            },
            handlePageSize(value){
                this.pageNum = value;
                  this.get(this.allUrl.findTaskPage,{page:value,rows:9,status:this.nowStatus,type:this.nowType,createBy:this.staff,name:this.value}).then((res)=>{
                      console.log(res)
                    this.data1 = res.data.rows;        
                    if(res.data.total){    
                            this.totalNum = res.data.total          
                        }else{
                            this.totalNum = 0        
                            }
                         res.data.rows.forEach((i,index)=>{        
                        i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                        i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                        i.updateTime = this.changeTime(i.updateTime)
                         i.status = changeStatus(i.status)
                    })
        
                 })
            },
              ChangereshelfTime(data){
                this.reshelfTime = data;
            },
            ChangereTheShelfTime(data){
                this.reTheShelfTime = data;
            },
            //修改
            recompose(params){
                console.log(params.row)
                if (params.row.type == "办卡赚") {
                		if (params.row.status == "已暂停") {
           					 this.$router.push({path:'/channel/task/addCardRoad',query:{id:params.row.tenantId,taskId:params.row.id,status:'stop'}})
                		}else{
            				 this.$router.push({path:'/channel/task/addCardRoad',query:{id:params.row.tenantId,taskId:params.row.id}})
                		}

                	
                }
                
                 if(params.row.type=='注册赚'||params.row.type=='应用赚'){
                     let query = {
                             tenant:params.row.tenantId,
                             type:params.row.type,
                             pro:params.row.name,
                             action:'change'
                            }           
                        this.$store.state.discountId = params.row.id;
                        this.$router.push({path:'/addTaskOne',
                                                    query:query
                                                })
                        }

            },
            //审核
            audit(params){
                    if(params.row.type=='注册赚'||params.row.type=='应用赚'){
                         this.$store.state.discountId = params.row.id
                                this.$router.push({path:'/checkTask',
                                            query: {
                                                tenantId:params.row.tenantId
                                            }
                                         })
                    }
                    if (params.row.type == "办卡赚") {
               			this.$router.push({path:"/channel/task/CardRoadReadOnly",query:{merId:params.row.tenantId,taskId:params.row.id,inWay:"审核"}})
                    }
                

                 },
            //查看
            check(params){

                if(params.row.type=='注册赚'||params.row.type=='应用赚'){
                      this.$store.state.discountId = params.row.id
                                this.$router.push({path:'/readTaskOne',
                                            query: {
                                                tenantId:params.row.tenantId,
                                                action:'check'
                                            }
                                         })
                }

                if(params.row.type=="办卡赚"){
               		this.$router.push({path:"/channel/task/CardRoadReadOnly",query:{merId:params.row.tenantId,taskId:params.row.id,inWay:"查看"}})
                	
                }

            },
            // 提交
            subOpen(params){
                if(params.row.type=='注册赚'||params.row.type=='应用赚'){
                    this.id = params.row.id;
                    this.tenantId = params.row.tenantId;
                    this.sub = true;
                }
                 if(params.row.type=="办卡赚"){
                	 this.id = params.row.id;
                    this.tenantId = params.row.tenantId;
                    this.sub2 = true;
                }
            },
            // 下架确定
            unshelfOk(){
                this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'9'
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('下架成功');
                             this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                            })
                        }
                    })
            },
            subOk(){
                this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'2',
                                failReason:''
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$store.state.discountId = this.id;
                             this.$router.push({path:'/readTaskOne',
                                                query: {
                                                     tenantId:this.tenantId,
                                                     action:'subOk'
                                                    }
                                                })
                        }
                    })
            },
            subOk2(){
            	
                this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'2',
                                failReason:''
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                             this.$router.push({path:"/channel/task/CardRoadReadOnly",
                            				 query:{merId:this.tenantId,
                             				taskId:this.id,
                          				   	inWay:"提交"}
                      				       })
                        }
                    })
            
            },
            // 删除
            delectOk(){ 
                  this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'0'
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('删除成功');
                             this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                console.log(res)
                                this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                            })
                        }
                    })
            },
            // 提交申请
            rechargeOk(){
                this.modal_loading = true;
                 this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'4',
                                amount:this.amount,
                                preloaded:this.preloaded
                            }
					}).then((response)=>{
                        this.modal_loading = false;
                        this.recharge = false;
                        console.log(response)
                        if(response.data.ret == 'ok'){
                            this.$Message.success('提交成功');
                            this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                            })
                        }else{
                            this.$Message.warning('提交失败');
                        }
                    })
                
            },
            // 上架确定
            reshelfOk(){
                if(this.reshelfTime == ''||this.reTheShelfTime == ''){
                    this.$Message.warning('请选择时间');
                }else if(this.reshelfTime>this.reTheShelfTime){
                    this.$Message.warning('上架时间不能晚于下架时间');
                }else{
                       this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'7',
                                failReason:'',
                                shelvesTime:this.reshelfTime,
                                theShelvesTime:this.reTheShelfTime
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('上架设置成功');
                             this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                 this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                             })
                            }
                        })
                    }
               },
            // 暂停确定
            pauseOk(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'8',
                                failReason:this.pauseReson
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('暂停成功');
                             this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                 this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                             })
                            }
                        })
            },
            // 终止确定
            breakUpOk(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'10'
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('终止成功');
                             this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                            })
                        }
                    })
            },
            // 补货确定
            addGoodsOk(){  
                if(this.addNeedMoney>0){
                    this.$Message.warning('商户余额不足！');
                    this.merchantRecharge = true;
                }else{
                    this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                number:this.addGoodsNum
                               
                            }
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret == 'ok'){
                            this.$Message.success('补货成功');
                             this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                 this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                             })
                            }
                        })
                }
                
            },
            // 补货上架确定
            addGoodReshelfOk(){
                
                console.log(this.id+'+'+this.addGoodsNum+'+'+this.reshelfTime+'+'+this.reTheShelfTime)
                if(this.reshelfTime == ''|| this.reTheShelfTime == ''){
                    this.$Message.warning('请输入上下架时间');
                }else if(this.reshelfTime>this.reTheShelfTime){
                    this.$Message.warning('上架时间不能晚于下架时间');
                }else if(this.addNeedMoney>0){
                    this.$Message.warning('商户余额不足');
                    this.merchantRecharge = true;
                }else{
                    this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'7',
                                failReason:'',
                                number:this.addGoodsNum,
                                shelvesTime:this.reshelfTime,
                                theShelvesTime:this.reTheShelfTime,
                                
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('补货上架设置成功');
                             this.get(this.allUrl.findTaskPage,{page:this.pageNum,rows:9}).then((res)=>{
                                 this.data1 = res.data.rows;        
                                if(res.data.total){
                                            this.totalNum = res.data.total          
                                        }else{
                                            this.totalNum = 0        
                                        }
                                res.data.rows.forEach((i,index)=>{        
                                    i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                                    i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                                    i.updateTime = this.changeTime(i.updateTime)
                                    i.status = changeStatus(i.status)
                                })
                             })
                            }
                        })
                }
            },
            // 商户快捷充值入口
            merchantRechargeOk(){
                this.$http({
						method:'POST',
						url: this.allUrl.updateTaskStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                number:this.addGoodsNum,
                                shelvesTime:this.reshelfTime,
                                theShelvesTime:this.reTheShelfTime,  
                                status:'4',
                            }
					}).then((response)=>{
                        console.log(response)
                        let tenantName = response.data.data.oriTask.tenantName;
                        let oriTask = response.data.data.oriTask.id;
                        let replenishId = response.data.data.replenishId;
                        this.$http({
						method:'POST',
						url: this.allUrl.addRechargeRecord,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:{
							amount:this.addNeedMoney,
							tenantId:this.tenantId,
                            preloaded:this.preloaded,
                            taskId:oriTask,
                            replenishId:replenishId,
                            rechargeType:'2',
                            tenantName:tenantName
                            }
                        }).then((res)=>{
                            console.log(res)
                            if(res.data.ret == "ok"){
                                this.$Message.success('充值提交成功！')
                            }
                        })

                    })

                	

            }
        },
        beforeMount() {

            //获取任务列表
            this.get(this.allUrl.findTaskPage,{page:1,rows:9}).then((res)=>{
                    this.allNum = res.data.total     
                      this.data1 = res.data.rows;        
                if(res.data.total){ 
                              this.allNum = res.data.total     
                            this.totalNum = res.data.total          
                        }else{
                            this.totalNum = 0    
                            this.allNum = 0    
                            }
                    res.data.rows.forEach((i,index)=>{        
                        i.theShelvesTime = this.changeSmallTime(i.theShelvesTime)
                        i.shelvesTime = this.changeSmallTime(i.shelvesTime)
                        i.updateTime = this.changeTime(i.updateTime)
                         i.status = changeStatus(i.status)
                    })
               })

              this.get(this.allUrl.countTask).then((res)=>{         
                this.taskNum = res.data.data;
            })
            this.get(this.allUrl.taskFindCreateBy).then((res)=>{
                this.staffList = res.data.data
            })
         
        },
        
    }

    function changeStatus(param) { 
        var info = ''
        switch(param){
            case '0':
              info = '已删除';
              break;
            case '1':
              info = '待提交'
              break;
            case '2':
              info = '待审核'
              break;
            case '3':
              info = '待充值'
              break;
            case '4':
              info = '待财务审核'
              break;
            case '5':
              info = '已退回'
              break;
            case '6':
              info = '待上架'
              break;
            case '7':
              info = '已上架'
              break;
             case '8':
              info = '已暂停'
              break;
             case '9':
              info = '已下架'
              break;
             case '10':
              info = '已终止'
              break;
             case '11':
              info = '充值失败'
              break;
        }
        return info;
     }
</script>

<style scoped lang="scss">
.wtf{
    height: 50px;
    font-size: 16px;
    color: #000000;
}
 ::-webkit-scrollbar {
        width: 2px;  /*滚动条宽度*/
         height: 3px;  /*滚动条高度*/
          background-color: #615a5a;  
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
            line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
            .ivu-input-wrapper{margin-left: 10px;margin-right: 15px;}
        }
    .state_con{
       display: -webkit-box;
       overflow-x: scroll;

        .btn_state{
            height: 37px;line-height: 37px;padding: 0 10px;text-align: center;
            background: #9e9c9c;color: #ffffff;margin:20px 0;font-size: 18px;
            margin-left: 40px;cursor: pointer;
        }
        .active{
            background: rgb(100, 190, 226);
        }
    }
        
       .table{
           margin-top: 5px;
           margin-left: 40px;
           .btn_tr{
                    width: 100%;height: 60px;
                    line-height: 60px;
                    }
            }

          
    }
</style>


