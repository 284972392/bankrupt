<template>
    <div class="home">
        <div class="title">配置管理</div>
       <div class="state_con">

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

        <Modal v-model="show" footer-hide  scrollable :styles="{top: '200px'}">
         <p slot="header" style="text-align:center;font-size:20px;color:#f60;"> 
            <span>查 看</span>
        </p>
         <Row>
             <p style="height:40px;font-size:15px;">配置名称：&nbsp;&nbsp;&nbsp; {{config.key}}</p>     
             <p style="height:40px;font-size:15px;">配置值&nbsp; &nbsp;： &nbsp;&nbsp;&nbsp; {{config.value*100}}%</p>     
             <p style="height:40px;font-size:15px;">是否启用：&nbsp;&nbsp;&nbsp; {{config.status}}</p>     
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
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.config = params.row
                                           this.show = true                	                           	
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
                                            // console.log(params.row.id)
                                            this.$store.state.config = params.row;
                                             this.$router.push({path:'/integral_member/addGoldRateRule',
                                                                    query: {
                                                                        'change':true
                                                                    }
                                                                })     
                                                        	                           	
                                        }
                                    }
                                }, '修改')        
                 };
                
            return{
                config:{},
                show:false,
            	startTime_:"",
            	endTime_:"",
                allNum:0,
                totalNum:0,
                shows:'1',
                value:'',
                pageNum:1,
                pageSize:9,
                 getList: [
                    {
                        value: '1',
                        label: '全部'
                    }
                ],
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
                        title: '管理编号',
                        align: 'center',
                        key: 'id',
                    },
                    {
                        title: '配置名称',
                        align: 'center',
                        key: 'key',
                    },
                    {
                        title: '配置值',
                        align: 'center',
                        key: 'value',
                    },
                     {
                        title: '是否启用',
                        align: 'center',
                        key: 'status',
                    },
                      {
                        title: '操作人员',
                        align: 'center',
                        key: 'operateBy',
                    },
                      {
                        title: '创建时间',
                        align: 'center',
                        key: 'updateTime',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                          return h('div',[
                              checkbtn(h,params),
                              changebtn(h,params)
                          ])    
                        }
                    }
                ],
                data1:[{a:1}]
            }
        },
        methods:{
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                // console.log(document.getElementsByClassName('ivu-checkbox-input')[0].checked)
                this.$refs.selection.selectAll(status);

            },

         
            handlePageSize(value){
                this.pageNum = value;
                   this.get(this.allUrl.findConstantConfigPage,{page:value,rows:9}).then((res)=>{
                        res.data.rows.forEach((i,index)=>{        
                                i.updateTime = this.changeTime(i.updateTime)
                                i.status = changeStatus(i.status)
                                i.value = Number(i.value).toFixed(2)
                            })
                        this.data1 = res.data.rows
                    })
            },

        },
        beforeMount() {
             this.get(this.allUrl.findConstantConfigPage,{page:1,rows:9}).then((res)=>{
                this.totalNum = res.data.total;
                res.data.rows.forEach((i,index)=>{        
                        i.updateTime = this.changeTime(i.updateTime)
                        i.status = changeStatus(i.status)
                        i.value = Number(i.value).toFixed(2)
                    })
                this.data1 = res.data.rows
            })

        },
    }


   function changeStatus(param) { 
        var info = ''
        switch(param){
            case 0:
              info = '否'
              break;
            case 1:
              info = '是'
              break;
        }
        return info;
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
        height: 20px;
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