<template>
    <div class="home">
        <div class="title">获取内容</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="获取内容" style="width: 26%;" size="large"></Input>
            获取项
            <Select v-model="model1" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in getList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>


            
           <div>
          	  选择时间段
      	<DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
      	<DatePicker type="date" :value="endTime_" @on-change="endTime" placeholder="Select date" style="width: 200px"></DatePicker>
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
                <Button type="primary" ghost @click = "addGet" style="margin-left:10px;">添加</Button>  

            </ButtonGroup>
          </div>
      
        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllGetRec()">全部领取记录({{allNum}})</div>

       </div>
        
    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
            
            </td>
        <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->
        
        	
    </div>

			<Modal
            v-model="chakan"
            title="查看获取内容"
           >
			<div class="chakanBox">
				<div><span>获取编号</span><span>{{lookContent.id}}</span></div>
				<div><span>获取内容</span><span>{{lookContent.detail}}</span></div>
				<div><span>获取项</span><span>{{lookContent.obtain}}</span></div>
				<div><span>体系</span><span>{{lookContent.system}}</span></div>
				<div><span>操作人员</span><span>{{lookContent.operateBy}}</span></div>
				<div><span>操作时间</span><span>{{lookContent.operateTime}}</span></div>
			</div>
        </Modal>
        <Modal
            v-model="tianjia"
            title="添加获取内容"
            @on-ok="addOk"
           >
			<div class="chakanBox">
				
				<div v-if="isChange">
					<span>获取编号</span>
					<span>xxxx</span>
				</div>
				<div>
					<span>获取内容</span>
            <Input v-model="addGetContent.value" placeholder="请输入获取内容" size="large"></Input>
			
				</div>
				<div><span>获取项</span>
					<Select v-model="addGetContent.which" style="width:15%;" size="large">
              		  <Option v-for="item in getList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          		  </Select>
				</div>
				<div><span>体系</span>
					<Select v-model="addGetContent.tixi"style="width:15%;"  size="large">
              		  <Option v-for="item in tixiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          		  </Select>
				</div>
			</div>
        </Modal>
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
             const checkbtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                             this.check(params)
                                        }
                                    }
                                }, '查看')        
             };
             const changebtn = (h, params) => { 
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
             };
             const addbtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                             this.add(params)
                                        }
                                    }
                                }, '添加规则')        
             };
             const delbtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                             this.del(params)
                                        }
                                    }
                                }, '删除')        
             };

            return{
            	lookContent:{},
            	addGetContent:{
            		value:"",
            		which:"",
            		tixi:''
            	},
            	getList:[
            		{
            			value:0,
            			label:"签到赚"
            		},
            		{
            			value:1,
            			label:"组团队"
            		},
            		{
            			value:2,
            			label:"购划算"
            		}
            	],
            	tixiList:[
            		{
            			value:1,
            			label:"积分"
            		},
            		{
            			value:0,
            			label:"会员"
            		}
            	],
            	isChange:true,
            	chakan:false,
            	tianjia:false,
            	startTime_:"",
            	startTime_:"",
            	endTime_:"",
                allNum:0,
                totalNum:0,
                shows:'1',
                value:'',
                pageNum:1,
                pageSize:9,
                model1: '',
                 columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '获取内容编号',
                        align: 'center',
                        key: 'id',
                    },
                    {
                        title: '获取内容',
                        align: 'center',
                        key: 'detail',
                    },
                    {
                        title: '获取项',
                        align: 'center',
                        key: 'obtain',
                    },
                     {
                        title: '体系',
                        align: 'center',
                        key: 'system',
                    },
                     {
                        title: '操作人员',
                        align: 'center',
                        key: 'operateBy',
                    },
                    {
                        title: '操作时间',
                        align: 'center',
                        key: 'operateTime',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                          return h('div',[
                              checkbtn(h,params),
                              changebtn(h,params),
                              addbtn(h,params),
                              delbtn(h,params)
                          ])    
                        }
                    }
                ],
                data1:[]

            }
        },
        methods:{
        	//查看按钮
        	check(params){
        		 this.get(this.allUrl.findContent,{contentId:params.row.id}).then((res)=>{
						this.lookContent = res.data.data
						if(this.lookContent.obtain == 0){
							this.lookContent.obtain = "签到赚"
						}
						if(this.lookContent.obtain == 1){
							this.lookContent.obtain = "组团队"
						}
						if(this.lookContent.obtain == 2){
							this.lookContent.obtain = "购划算"
						}
						if(this.lookContent.system == 0){
							this.lookContent.system = "会员"
						}
						if(this.lookContent.system == 1){
							this.lookContent.system = "积分"
						}
						this.lookContent.operateTime = this.changeTime(this.lookContent.operateTime)
                 })
				this.chakan = true
        	},
        	//添加确认保存按钮
        	addOk(){
        		this.$http({
						method:'POST',
						url: this.allUrl.addContent,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:{
							type:0,
							detail:this.addGetContent.value,
							obtain:this.addGetContent.which,
							system:this.addGetContent.tixi
						}
					}).then((res)=>{
						console.log(res)
					})
        		
        		
        	},
        	//修改
        	change(params){
        		this.isChange = true;
            	this.tianjia = true;
            	//将params里面的字段提取出来 放进addGetContent 进行展示
        		
        	},
        	add(params){
        		console.log("reeeeee")
        		this.$router.push("/integral_member/getcontent/addRole")
        	},
        	del(params){
                    this.$Message.warning('现在还不给删');
        	},
        	startTime(data){
        		this.startTime_ = data + " 00:00:00"
        	},
        	endTime(data){
        		this.endTime_ = data + " 23:59:59"
        		console.log(this.endTime_)
        		
        	},
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },
            //全部领取记录
            AllGetRec(){
                this.shows = 1
                this.value = ''
                this.model1 = ''
            
            },
         
            handlePageSize(value){
                this.pageNum = value;
             this.get(this.allUrl.findContentPage,{page:value,rows:9,type:0,obtain:this.model1,detail:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
             	console.log(res)
                 this.data1 = res.data.rows;
                  this.allNum =res.data.total
                  if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.operateTime = this.changeTime(i.operateTime) 
					if (i.obtain == 0) {
						i.obtain = "签到赚"
					}
					if (i.obtain == 1) {
						i.obtain = "组团队"
					}
					if (i.obtain == 2) {
						i.obtain = "购划算"
					}
					if(i.system ==0 ){
						i.system = "会员"
					}
					if(i.system ==1 ){
						i.system = "积分"
					}
					
                 })
            })
                
            },
            search(){
                //   if(this.value == ''&& this.model1 == ''){
                //      this.$Message.warning('查询内容不能为空！');
                // }else{
                   
                // }
                if(this.startTime_ > this.endTime_){
                    this.$Message.warning('时间段填反了')
                }else{
                	
             this.get(this.allUrl.findContentPage,{page:1,rows:9,type:0,obtain:this.model1,detail:this.value,beginTime:this.startTime_,finishTime:this.endTime_}).then((res)=>{
             	console.log(res)
                 this.data1 = res.data.rows;
                  this.allNum =res.data.total
                  if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.operateTime = this.changeTime(i.operateTime) 
					if (i.obtain == 0) {
						i.obtain = "签到赚"
					}
					if (i.obtain == 1) {
						i.obtain = "组团队"
					}
					if (i.obtain == 2) {
						i.obtain = "购划算"
					}
					if(i.system ==0 ){
						i.system = "会员"
					}
					if(i.system ==1 ){
						i.system = "积分"
					}
					
                 })
            })
                }
                
              
            },
            clear(){
                this.value = ''
                this.model1 = ''
                  this.startTime_ =""
                this.endTime_ =""
            },
            //添加获取按钮
            addGet(){
        		this.isChange = false;
            	this.addGetContent = {};
            	this.tianjia = true;

            }
        },
        mounted(){
             this.get(this.allUrl.findContentPage,{page:1,rows:9,type:0}).then((res)=>{
             	console.log(res)
                 this.data1 = res.data.rows;
                  this.allNum =res.data.total
                  if(res.data.total){
                            this.totalNum = res.data.total
                        }else{
                            this.totalNum = 0
                        }
                 res.data.rows.forEach((i,index)=>{        
                    i.operateTime = this.changeTime(i.operateTime) 
					if (i.obtain == 0) {
						i.obtain = "签到赚"
					}
					if (i.obtain == 1) {
						i.obtain = "组团队"
					}
					if (i.obtain == 2) {
						i.obtain = "购划算"
					}
					if(i.system ==0 ){
						i.system = "会员"
					}
					if(i.system ==1 ){
						i.system = "积分"
					}
					
                 })
            })

            
        },
        beforeMount() {
        
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
            height: 142px;line-height: 71px;font-size: 24px;padding-left: 40px;
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
    .chakanBox{
    	width: 100%;
    	display: flex;
    	flex-direction: column;
    	padding-left: 40px;
    	justify-content: space-around;
    	div{
    		width: 100%;
    		height: 50px;
    		display: flex;
    		align-items: center;
    		span:nth-child(1){
    			display: block;
    			width: 100px;
    		}
    	}
    }
</style>