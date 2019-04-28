<template>
    <div class="home">
        <div class="title">获取规则</div>
        <div class="search">
            搜索
            <Input v-model="value" placeholder="" style="width: 26%;" size="large"></Input>
            获取项
            <Select v-model="model1" style="width:15%;margin-left:37px;" size="large">
                <Option v-for="item in getList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>


            
           <div>
          	  选择时间段
      	<DatePicker type="date" :value="startTime_" @on-change="startTime" placeholder="Select date" style="width: 200px"></DatePicker> 至
      	<DatePicker type="date" :value="endTime_" @on-change="endTime" placeholder="Select date" style="width: 200px"></DatePicker>
            <ButtonGroup size="large">
                <Button type="primary" ghost @click="search" style="margin-left:100px;">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>  
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
                                                           	                           	
                                        }
                                    }
                                }, '修改')        
                 };
                
                 const delectbtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                                           	                           	
                                        }
                                    }
                                }, '删除')        
                 };


            return{
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
                        title: '获取规则编号',
                        align: 'center',
                        key: 'a',
                    },
                    {
                        title: '获取规则',
                        align: 'center',
                        key: 'a',
                    },
                    {
                        title: '获取项',
                        align: 'center',
                        key: 'a',
                    },
                     {
                        title: '体系',
                        align: 'center',
                        key: 'a',
                    },
                      {
                        title: '规则数量',
                        align: 'center',
                        key: 'a',
                    },
                      {
                        title: '启用规则',
                        align: 'center',
                        key: 'a',
                    },
                     {
                        title: '操作人员',
                        align: 'center',
                        key: 'a',
                    },
                    {
                        title: '操作时间',
                        align: 'center',
                        key: 'a',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                          return h('div',[
                              checkbtn(h,params),
                              changebtn(h,params),
                              delectbtn(h,params)
                          ])    
                        }
                    }
                ],
                data1:[{a:1}]
            }
        },
        methods:{
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
              
            },
            search(){
                if(this.startTime_&&this.endTime_==''){
                    this.$Message.warning('请填写完整时间段')
                }else if(this.startTime_==''&&this.endTime_){
                    this.$Message.warning('请填写完整时间段')
                }else if(this.startTime_>this.endTime_){
                     this.$Message.warning('起始结束时间反了')
                }
              
            },
            clear(){
                this.value = ''
                this.model1 = ''
                this.startTime_ = ''
                this.endTime_ = ''
            }
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
</style>