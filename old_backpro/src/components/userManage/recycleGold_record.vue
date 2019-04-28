<template>
    <div class="recycleGold">
        <div class="title">金币回收记录</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="用户名称/用户手机号" style="width: 26%;" size="large"></Input>
            
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
            </ButtonGroup>

        </div>
       
       <div class="state_con">
            <div class="btn_state" :class="{active:shows==1}" @click="allRecord()">全部记录({{allNum}})</div>


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

     <Modal v-model="showForm" footer-hide  scrollable  :styles="{top: '200px'}">
         <p slot="header" style="text-align:center;font-size:20px;color:#f60;"> 
            <span>查 看</span>
        </p>
         <Row>
             <Col span="12">
                <p style="height:40px;font-size:15px;">用户名称&nbsp;&nbsp;&nbsp; {{goldContent.userName}}</p>
                <p style="height:40px;font-size:15px;">用户手机号&nbsp;&nbsp;&nbsp; {{goldContent.userPhone}}</p>

                <p style="height:40px;font-size:15px;">回收时间&nbsp;&nbsp;&nbsp; {{goldContent.createTime}}</p>
                <p style="height:40px;font-size:15px;">金币余额（个）&nbsp;&nbsp;&nbsp; {{goldContent.goldAmount}}个</p>
             </Col>
             <Col span="12" offset="0">
                  <p style="height:40px;font-size:15px;">用户编号&nbsp;&nbsp;&nbsp; {{goldContent.userId}}</p>    
                <p style="height:40px;font-size:15px;">回收数量（个）&nbsp;&nbsp;&nbsp; {{goldContent.coinNumber}}个</p>
                  <p style="height:40px;font-size:15px;">回收编号&nbsp;&nbsp;&nbsp; {{goldContent.id}}</p>
                  <p style="height:40px;font-size:15px;">回收状态&nbsp;&nbsp;&nbsp; {{goldContent.coinStatus}}</p>
              </Col>
          </Row>
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
                                      
                                      this.goldContent = params.row
                                      this.showForm = true
                                }
                            }
                        }, '查看')                       
                    ]);   
             };

            return{
                goldContent:{},
                showForm:false,
                goldNum:{
                    success:0,
                    fail:0
                },
                allNum:0,
                pageNum:1,
                pageSize:9,
                totalNum:0,
                nowStatus:'',
                shows:'1',
                value:'',
                model1: '',
                
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
                        title: '回收编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'userName'
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'userPhone'
                    },
                     {
                        title: '回收数量（个）',
                        align: 'center',
                        key: 'coinNumber'
                    },
                     {
                        title: '回收时间',
                        align: 'center',
                        key: 'createTime',
                        width:180
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'coinStatus'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:130,
                        align: 'center',
                        render: (h, params) => {
                            return checkbtn(h,params)                                               
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
            //全部记录
            allRecord(){
                this.nowStatus = ''
                this.shows = 1
                this.value = ''

                 this.get(this.allUrl.findRecycleAppGoldCoinRecordPage,{page:1,rows:9}).then((res)=>{
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.coinStatus = cgState(i.coinStatus)
                        i.accessSource = cgSource(i.accessSource)
                    })
                this.data1 = res.data.rows
                  })
            },
     

            search(){
                  if(this.value==''&&this.model1==''){
                     this.$Message.warning('查询内容不能为空！');
                }else{
                      this.get(this.allUrl.findRecycleAppGoldCoinRecordPage,{page:1,rows:9,userName:this.value}).then((res)=>{
                   this.totalNum = res.data.total       
                    res.data.rows.forEach((i,index)=>{        
                           i.createTime = this.changeTime(i.createTime)
                           i.coinStatus = cgState(i.coinStatus)
                           i.accessSource = cgSource(i.accessSource)
                        })
                        this.data1 = res.data.rows
                    })
                }
            },
            clear(){
                this.value = ''

            },
            handlePageSize(value){
                     this.pageNum = value;
                 this.get(this.allUrl.findRecycleAppGoldCoinRecordPage,{page:value,rows:9,userName:this.value}).then((res)=>{
                   this.totalNum = res.data.total       
                    res.data.rows.forEach((i,index)=>{        
                           i.createTime = this.changeTime(i.createTime)
                           i.coinStatus = cgState(i.coinStatus)
                           i.accessSource = cgSource(i.accessSource)
                        })
                        this.data1 = res.data.rows
                    })
            }

        },
        beforeMount(){
            this.get(this.allUrl.findRecycleAppGoldCoinRecordPage,{page:1,rows:9}).then((res)=>{
                console.log(res)
                this.allNum = res.data.total;
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.createTime = this.changeTime(i.createTime)
                        i.coinStatus = cgState(i.coinStatus)
                        i.accessSource = cgSource(i.accessSource)
                    })
                this.data1 = res.data.rows
            })
            
            this.get(this.allUrl.countObtainAppGoldCoinRecord).then((res)=>{         
                this.goldNum = res.data.data;
            })
        }
    }


     function cgState(param) { 
        var info = ''
        switch(param){
            case '1':
              info = '已回收'
              break;
            case '0':7
              info = '已回收'
              break;
        }
        return info;
     }
     function cgSource(param){
         var info = ''
        return info;
     }
</script>

<style scoped lang="scss">
    .recycleGold{
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