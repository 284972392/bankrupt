<template>
    <div class="home">
        <div class="title">优惠管理</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="优惠编号/优惠名称/商家名称" style="width: 26%;" size="large"></Input>
            优惠类别
            <Select v-model="model1" style="width:15%;margin-left:37px;" size="large" @on-change='changeSelect()'>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   

                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>   
            </ButtonGroup>
      
        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="AllTask()">全部任务({{allNum}})</div>
            <div class="btn_state" :class="{active:shows==2}" @click="toSubmit()">待提交({{discountNum.toSubmit}})</div>
            <div class="btn_state" :class="{active:shows==3}" @click="Putaway()">待上架({{discountNum.toShelves}})</div>
            <div class="btn_state" :class="{active:shows==4}" @click="OnGoing()">已上架({{discountNum.ongoing}})</div>
            <div class="btn_state" :class="{active:shows==5}" @click="Pause()">已暂停({{discountNum.suspended}})</div>
            <div class="btn_state" :class="{active:shows==6}" @click="Soldout()">已下架({{discountNum.theShelves}})</div>
            <div class="btn_state" :class="{active:shows==7}" @click="toAudit()">待审核({{discountNum.toAudit}})</div>
            <div class="btn_state" :class="{active:shows==8}" @click="returned()">已退回({{discountNum.returned}})</div>
       </div>
        
       

        

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475 ></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
                <Button @click="Put_away()" style="margin-right: 10px;">上架</Button>
                <Button @click="remove()" style="margin-right: 10px;">删除</Button>
            </td>
   		 <Page :total='Number(totalNum)' show-elevator style="margin-left: 400px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->

        	
    </div>
        <!-- 提交确认弹框 -->
        <Modal
            v-model="sub"
            title="确认提交"
            @on-ok="subOk"
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
        <!-- 上架弹框 -->
        <Modal
            v-model="reshelf"
            title="选择上架时间"
            @on-ok="reshelfOk"
          >
              <DatePicker type="date" placeholder="请选择上架时间" :options="noToday" :value="reshelfTime" @on-change="ChangereshelfTime"></DatePicker>
              <DatePicker type="date" placeholder="请选择下架时间" :options="noToday" :value="reTheShelfTime" @on-change="ChangereTheShelfTime"></DatePicker>
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
                noToday: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                breakUp:false,
                unshelf:false,
                nowType:'',
                nowStatus:'',
                // 各种优惠数
                discountNum:{},
                allNum:'',
                id:'',
                tenantId:'',
                sub:false,
                delect:false,
                reshelf:false,
                 pause:false,
                 // 上架时间
                reshelfTime:'',
                reTheShelfTime:'',
                // 暂停原因
                pauseReson:'',
                totalNum:0,
                pageNum:1,
                pageSize:9,
                shows:'1',
                value:'',
                 cityList: [
                    {
                        value: '优惠券',
                        label: '优惠券'
                    },
                    {
                        value: '福利红包',
                        label: '福利红包'
                    },
                    {
                        value: '免费课程',
                        label: '免费课程'
                    }
                ],
                model1: '',
                 columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '优惠编号',
                        align: 'center',
                        key: 'id',
                        width:150
                    },
                    {
                        title: '优惠类别',
                        align: 'center',
                        key: 'type',
                        width:150
                    },
                    {
                        title: '卡券名称',
                        align: 'center',
                        key: 'name',
                        width:150
                    },
                    {
                        title: '上架平台',
                        align: 'center',
                        key: 'platform',
                        width:150
                    },
                    {
                        title: '商户名称',
                        align: 'center',
                        key: 'tenantName',
                        width:150
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
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width:128
                    },
                     {
                        title: '操作时间',
                        align: 'center',
                        key: 'updateTime',
                        width:150
                    },
                    {
                        title: '操作',
                        key: 'action',
                       width:250,
                       fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            // ********************************************待审核状态下*********************************************
                            if(params.row.status == '待审核'){
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
                                            this.check(params)
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
                                           this.audit(params)
                                        }
                                    }
                                }, '审核')
                             ]);
                           }else if(params.row.status == '已退回'){
                               // ********************************************已退回状态下*********************************************
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
                                             this.check(params)
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
                                                this.recompose(params)
                                            }
                                        }
                                    }, '修改')
                                ]);
                           }else if(params.row.status == '待上架'){
                               // ********************************************待上架状态下*********************************************
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
                                             this.check(params)
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
                                                this.recompose(params)
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
                                                 this.reshelfOpen(params);
                                            }
                                        }
                                    }, '上架')
                               
                                ]);
                           }else if(params.row.status == '已上架'){
                                  // ********************************************进行中状态下*********************************************
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
                                             this.check(params)
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
                                                this.pauseOpen(params)
                                            }
                                        }
                                    }, '暂停'),
                                      h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.unshelf = true
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                            }
                                        }
                                    }, '下架')

                                ]);
                           }else if(params.row.status == '已暂停'){
                                  // ********************************************已暂停状态下*********************************************
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
                                             this.check(params)
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
                                                this.recompose(params)
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
                                                this.breakUp = true
                                                this.id = params.row.id;
                                                this.tenantId = params.row.tenantId;
                                            }
                                        }
                                    }, '终止')
                  
                                 
                                ]);
                           }else if(params.row.status == '已下架'){
                                // ********************************************已下架状态下*********************************************
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
                                            this.check(params)
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
                                                 this.reshelfOpen(params);
                                            }
                                        }
                                    }, '上架'),
                                      h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
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
                           }else if(params.row.status == '待提交'){
                                // ********************************************待提交状态下*********************************************
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
                                            this.check(params)
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
                                                this.recompose(params)
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
                                                this.subOpen(params);
                                            }
                                        }
                                    }, '提交'),
                                     h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.delectOpen(params)
                                            }
                                        }
                                    }, '删除')
                                ]);
                           }else if(params.row.status == '已终止'){
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
                this.nowType = ''
                this.nowStatus = ''
                this.shows = 1
                this.model1 = ''
                 this.get(this.allUrl.findDiscountPage,{page:1,rows:9}).then((res)=>{
                this.data1 = res.data.rows;        
                if(res.data.total){
                            this.allNum = res.data.total       
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
                this.get(this.allUrl.countDiscount).then((res)=>{         
                     this.discountNum = res.data.data;
                 })
            },
            // 待提交
            toSubmit(){
                this.nowStatus = 1
                this.shows = 2;
                  this.get(this.allUrl.findDiscountPage,{page:1,rows:9,status:1,type:this.nowType}).then((res)=>{
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
                this.nowStatus = 4
                this.shows = 3;
                    this.get(this.allUrl.findDiscountPage,{page:1,rows:9,status:4,type:this.nowType}).then((res)=>{
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
                this.nowStatus = 5
                this.shows = 4;
                    this.get(this.allUrl.findDiscountPage,{page:1,rows:9,status:5,type:this.nowType}).then((res)=>{
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
                this.nowStatus = 6
                this.shows = 5;
                    this.get(this.allUrl.findDiscountPage,{page:1,rows:9,status:6,type:this.nowType}).then((res)=>{
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
                 this.nowStatus = 7
                this.shows = 6;
                    this.get(this.allUrl.findDiscountPage,{page:1,rows:9,status:7,type:this.nowType}).then((res)=>{
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
            // 待审核
            toAudit(){
                this.nowStatus = 2
                this.shows = 7;
                    this.get(this.allUrl.findDiscountPage,{page:1,rows:9,status:2,type:this.nowType}).then((res)=>{
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
            // 已退回
            returned(){
                this.nowStatus = 3
                this.shows = 8;
                    this.get(this.allUrl.findDiscountPage,{page:1,rows:9,status:3,type:this.nowType}).then((res)=>{
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
            //上架
            Put_away(){

            },
            //删除
            remove(){

            },
            // 查询
            search(){
                
                if(this.value==''&&this.model1==''){
                    this.$Message.warning('查询内容不能为空！');
                }else{
                    this.nowType = this.model1
                    this.get(this.allUrl.findDiscountPage,{page:1,rows:9,name:this.value,type:this.model1}).then((res)=>{
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
                    this.get(this.allUrl.countDiscount,{type:this.model1}).then((res)=>{         
                        this.discountNum = res.data.data;
                    })
                }
            },
            clear(){
                this.value = '';
                this.model1 = '';
                this.nowType = '';
            },
            handlePageSize(value) {
                 this.pageNum = value;
                this.get(this.allUrl.findDiscountPage,{page:value,rows:9,status:this.nowStatus,type:this.nowType}).then((res)=>{
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
            //  查看操作
             check(param){
                 console.log(param.row.id+'**'+param.row.tenantId)
                  this.$store.state.discountId = param.row.id;
                 this.$router.push({path:'/viewDiscount',
                                            query: {
                                                tenantId:param.row.tenantId
                                            }
                                         })
             },
            //  修改操作
            recompose(param){
                console.log(param.row.id+'**'+param.row.tenantId)
                 this.$router.push({path:'/changeDiscount',
                                            query: {
                                                tenantId:param.row.tenantId,
                                                id:param.row.id
                                            }
                                         })
            },
            ChangereshelfTime(data){
                this.reshelfTime = data;
            },
            ChangereTheShelfTime(data){
                this.reTheShelfTime = data;
            },
            // ********************************************提交确认窗口打开
            subOpen(params){
                this.id = params.row.id;
                this.tenantId = params.row.tenantId;
                this.sub = true;
            },
            subOk(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateDiscountStatus,
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
                             this.$router.push({path:'/submitOk',
                                                query: {
                                                     tenantId:this.tenantId
                                                    }
                                                })
                        }
                    })
                
            },
            // ***************************************删除确认窗口打开
            delectOpen(params){
                this.id = params.row.id;
                this.tenantId = params.row.tenantId;
                this.delect = true;
            },
             delectOk(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateDiscountStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'0',
                                failReason:''
                            }
					}).then((response)=>{
                        console.log(response)
                        if(response.data.ret == 'ok'){
                            this.$Message.success('删除成功');
                             this.get(this.allUrl.findDiscountPage,{page:this.pageNum,rows:9}).then((res)=>{
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
            // ********************************选择上架时间窗口
            reshelfOpen(params){
                this.reshelfTime = '';
                this.id = params.row.id;
                this.tenantId = params.row.tenantId;
                this.reshelf = true;
            },
            reshelfOk(){
                if(this.reshelfTime == ''||this.reTheShelfTime == ''){
                    this.$Message.warning('请选择时间');
                }else if(this.reshelfTime>this.reTheShelfTime){
                    this.$Message.warning('上架时间不能晚于下架时间');
                }else{
                       this.$http({
						method:'POST',
						url: this.allUrl.updateDiscountStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'5',
                                failReason:'',
                                shelvesTime:this.reshelfTime,
                                theShelvesTime:this.reTheShelfTime
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('上架成功');
                             this.get(this.allUrl.findDiscountPage,{page:this.pageNum,rows:9}).then((res)=>{
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
                  
                }
              
            },
            // ***********************暂停窗口打开
            pauseOpen(params){
                this.pauseReson = '';
                this.id = params.row.id;
                this.tenantId = params.row.tenantId;
                this.pause = true;
            },
            pauseOk(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateDiscountStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'6',
                                failReason:this.pauseReson
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('暂停成功');
                             this.get(this.allUrl.findDiscountPage,{page:this.pageNum,rows:9}).then((res)=>{
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
            // 确认下架
            unshelfOk(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateDiscountStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'7'    
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('下架成功');
                             this.get(this.allUrl.findDiscountPage,{page:this.pageNum,rows:9}).then((res)=>{
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
            // 确定终止
            breakUpOk(){
                 this.$http({
						method:'POST',
						url: this.allUrl.updateDiscountStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:{
                                id:this.id,
                                status:'8'    
                            }
					}).then((response)=>{
                        if(response.data.ret == 'ok'){
                            this.$Message.success('终止成功');
                             this.get(this.allUrl.findDiscountPage,{page:this.pageNum,rows:9}).then((res)=>{
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
            // 审核
            audit(params){
                  this.$store.state.discountId = params.row.id
                                this.$router.push({path:'/checkDiscount',
                                            query: {
                                                tenantId:params.row.tenantId
                                            }
                                         })
            },
            changeSelect(){
                
            }
        },
        beforeMount () {
            // 获取优惠列表
             this.get(this.allUrl.findDiscountPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total       
                this.data1 = res.data.rows;        
                if(res.data.total){
                            this.allNum = res.data.total       
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
            this.get(this.allUrl.countDiscount).then((res)=>{         
                this.discountNum = res.data.data;
            })
        }
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
              info = '已退回'
              break;
            case '4':
              info = '待上架'
              break;
            case '5':
              info = '已上架'
              break;
            case '6':
              info = '已暂停'
              break;
            case '7':
              info = '已下架'
              break;
            case '8':
              info = '已终止'
              break;
        }
        return info;
     }
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
        width: 2px;  /*滚动条宽度*/
         height: 3px;  /*滚动条高度*/
          background-color: #615a5a;  
        }
    .home{
        width:98%;
        height: 100%;
        margin: 20px 20px 0px 20px; 
        background: #fff;
        .title{
            height: 51px;
            width: 100%;
            line-height: 51px;
            padding-left: 40px;
            font-size: 28px;
            text-align: left;
            border-bottom:1px solid #000000;
        }
        .search{
            height: 71px;
            line-height: 71px;
            font-size: 24px;
            padding-left: 40px;
            border-bottom:1px solid #000000;
            text-align: left;
            .ivu-input-wrapper{
                margin-left: 17px;
                margin-right: 55px;
                }
        }
    .state_con{
        display: -webkit-box;
       overflow-x: scroll;
        .btn_state{
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            text-align: center;
            background: #9e9c9c;
            color: #ffffff;
            margin:20px 0;
            font-size: 18px;
            margin-left: 40px;
            cursor: pointer;
        }
        .active{
            background: rgb(100, 190, 226);
        }
    }
        
       .table{
           margin-left: 40px;
           .btn_tr{
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    }
            }

          
    }
</style>