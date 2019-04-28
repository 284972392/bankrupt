<template>
    <div class="home">
        <div class="title">企业商户</div>
        <div class="search">
            搜索
            <Input v-model="merName" placeholder="商户编号/商户名称" style="width: 26%;" size="large"></Input>
            
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="findRoleName">查询</Button>   
            </ButtonGroup>
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="addCmp">添加</Button>
            </ButtonGroup>
        </div>

      <div class="btn_state"  @click="AllTask()">全部任务({{allNum}})</div>

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
                <!--<Button type="primary" @click="Charge()">充值</Button>-->
            </td>
   		 <Page :total='Number(totalNum)' show-elevator @on-change = 'handlePageSize' show-total :current="pageNum" :page-size="pageSize" style="margin-left: 400px;"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->

        	
    </div>
    
            <foot></foot>
            
            <!--发布任务弹框-->
             <Modal v-model="road" width="600" title="选择渠道类型" @on-ok="ok">
		      		<div>
					<span> 选择渠道：</span>		      			
		      			<Select v-model="firstLeval" clearable style="width:200px" @on-change = "firstChange">
		                        <Option v-for="item in domain" :value="item.id" :key="item.id">{{ item.label }}</Option>
		                 </Select>
		                 <Select v-model="secondLeval" clearable style="width:200px" @on-change = "secondChange">
		                        <Option v-for="item in domain2" :value="item.id" :key="item.id">{{ item.label }}</Option>
		                 </Select>

		      		</div>
		               <div style="margin-top: 20px;" v-if="product">
		               	<span>产品</span>
			               	<Select v-model="threeLeval" clearable style="width:200px">
			                        <Option v-for="item in domain3" :value="item.name+'*'+item.id" :key="item.id">{{ item.name }}</Option>
			                 </Select>
               				 <Button @click="toAddCmp">添加产品</Button>
			                 
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
            	allNum:'',
            	product:false,
            	road:false,
            	//一级目录
            	domain:[
                         {
                            id:1,
                            label: '发布任务'
                            },
                             {
                            id: 2,
                            label: '发布优惠'
                            },
                            {
                            id:3,
                            label: '发布划算'
                            }
                    ],
                    //二级目录
                    domain2:[],
                    //产品列表
                    domain3:[],
                    //商户ID
                    merId:'',
                    //应用类型
                    proType:'',
                    firstLeval:'',
                    secondLeval:'',
                    threeLeval:'',
               totalNum:1,
                pageNum:1,
                pageSize:9,
                value:'',
                merName:'',
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
                        title: '商户编号',
                        align: 'center',
                        key: 'id',
                        width:150
                    },
                    {
                        title: '商户名称',
                        align: 'center',
                        key: 'name',
                        width:200
                    },
                    {
                        title: '商户电话',
                        align: 'center',
                        key: 'mobiPhone',
                        width:170
                    },
                    {
                        title: '累计充值金额（元）',
                        align: 'center',
                        key: 'totalAmount',
                        width:157
                    },
                     {
                        title: '账户余额（元）',
                        align: 'center',
                        key: 'balance',
                        width:150
                    },
                     {
                        title: '任务库存',
                        align: 'center',
                        key: 'inventory',
                        width:150
                    },
                     {
                        title: '创建人',
                        align: 'center',
                        key: 'createBy',
                        width:150
                    },
                     {
                        title: '创建时间',
                        align: 'center',
                        key: 'createTime',
                        width:200
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
                                        	this.checkCmpMer(params)		                			         
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
                                            this.Recharge(params)
                                        }
                                    }
                                }, '充值'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	this.changeCmpMer(params)		                			     
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	this.giveRoad(params)		                			     
                                        }
                                    }
                                }, '发布任务')
                            ]);
                        }
                    }
                ],
                data1:[]
            }
        },
        methods:{
        	Recharge(params){
				 this.$router.push({path:'/recharge',query:{id:params.row.id}})
        	},
        	toAddCmp(){
        		this.$router.push({path:'/addCmpMer',query:{id:this.merId}})
        	},
        	firstChange(value){
        		if(value == 1){
        			this.product = true;
        			
        			this.domain2 = [
                         {
                            id:1,
                            label: '应用赚'
                            },
                             {
                            id: 2,
                            label: '注册赚'
                            },
                            {
                            id:3,
                            label: '办卡赚'
                            }
        			]
        		};
        		if( value == 2){
        			this.product = false;
        			
        			this.domain2 = [
                         {
                            id:4,
                            label: '优惠券'
                            },
                             {
                            id: 5,
                            label: '福利红包'
                            },
                            {
                            id:6,
                            label: '免费课程'
                            }
        			]
        		};
        		if( value == 3){
        			this.product = false;
        			
        			this.domain2 = [
                         {
                            id:7,
                            label: '购买券'
                            },
                             {
                            id: 8,
                            label: '0元购'
                            },
                            {
                            id:9,
                            label: '特卖商城'
                            }
        			]
        		}
        	},
        	AllTask(){
        		//获取个人商户列表列表
        	this.get(this.allUrl.findTenantPage,{page:1,rows:9,type:0}).then((res)=>{
        		console.log(res)
                   this.allNum = res.data.total     
        		
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                })
        	})
        	},
        	secondChange(value){
        		if (value == 1) {
        			this.proType = 1;
        		};
        		if (value == 2) {
        			this.proType = 2;
        		};
        		if (value == 3) {
        			this.proType = 3;
        		};
        		
        		this.get(this.allUrl.getProduct,{tanantId:this.merId,type:this.proType}).then((res)=>{
            		this.domain3 = res.data.data.products
            	})
        	},
        	showRoad(){

        	},
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            //添加
            addCmp(){              
                this.$router.push('/addCmpMer')
            },
	
            Charge(){
            	
                console.log('充值')
            },
            //分页点击
            handlePageSize(value){
                this.get(this.allUrl.findTenantPage,{page:value,rows:9,type:0}).then((res)=>{
                    this.totalNum = res.data.total
                    this.data1 = res.data.rows
                     res.data.rows.forEach((i,index)=>{        
                    i.createTime = this.changeTime(i.createTime)
                    })
                })
            },
            //查询按钮点击个人商户
            findRoleName(){
            	this.get(this.allUrl.findTenantPage,{page:1,rows:9,type:0,name:this.merName}).then((res)=>{
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                })
        	})
            },
             //查看企业商户详情
            checkCmpMer(params){
            	localStorage.setItem("merSherchId",params.row.id)
            	this.$router.push({path:'/cmpMerSherch',query:{id:params.row.id}})
            },
            //修改企业商户
            changeCmpMer(params){
            	this.$router.push({path:'/addCmpMer',query:{id:params.row.id}})
            },
            //获取产品数组
            giveRoad(params){
                this.firstLeval = ''
                this.secondLeval = ''
                this.threeLeval = ''
                
        		this.road = true;
        		this.merId = params.row.id
            	
            },
            ok(){
            	//办卡赚跳转
				if (this.secondLeval == 3) {
					if (this.threeLeval == "") {
						this.$Message.warning("暂无办卡任务 请前往添加")
					}else{
            			this.$router.push({path:'/channel/task/addCardRoad',query:{name:this.threeLeval,id:this.merId}})				
					}
				}
                //跳转到发布任务页面

                var typeS = ''
                if(this.secondLeval == 4){
                    typeS = '优惠券'
                }else if(this.secondLeval == 5){
                    typeS = '福利红包'
                }else if(this.secondLeval == 6){
                    typeS = '免费课程'
                }else if(this.secondLeval == 7){
                    typeS = '购买券'
                }else if(this.secondLeval == 8){
                    typeS = '0元购'
                }else if(this.secondLeval == 9){
                    typeS = '特卖商城'
                }else if(this.secondLeval == 1){
                    typeS = '应用赚'
                }else if(this.secondLeval == 2){
                    typeS = '注册赚'
                }


                if(this.secondLeval == 4||this.secondLeval == 5||this.secondLeval == 6){
                    this.$router.push({ path:'/shareDiscount',
                                query: {
                                   tenant:this.merId,
                                   type:typeS
                                }
                                })
                }else if(this.secondLeval == 7||this.secondLeval == 8||this.secondLeval == 9){
                      this.$router.push({ path:'/addBargain',
                                query: {
                                   tenant:this.merId,
                                   type:typeS
                                }
                                })
                }else if(this.secondLeval == 1||this.secondLeval == 2){
                    if(this.threeLeval==''){
                        this.$Message.warning('请选择产品!');
                    }else{
                         this.$router.push({ path:'/addTaskOne',
                                query: {
                                   tenant:this.merId,
                                   pro:this.threeLeval,
                                   type:typeS
                                }
                                })
                    }
                }
                     

                
            }
        },
        mounted(){
        	//获取个人商户列表列表
        	this.get(this.allUrl.findTenantPage,{page:1,rows:9,type:0}).then((res)=>{
        		console.log(res)
                   this.allNum = res.data.total     
        		
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                })
        	})
        }
    }

    
</script>

<style scoped="scoped" lang="scss">
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
        .btn_state{
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
</style>