
<template>
    <div class="home">
        <div class="title">
            <p>简单赚记录列表</p>
        </div>
       <div class="search">
            昵称：
            <Input v-model="nickName" placeholder="用户昵称" style="width: 15%;" size="large"></Input>
                        电话
            <Input v-model="phone" placeholder="电话" style="width: 15%;" size="large"></Input>
                        任务名称
            <Input v-model="easyMakeName" placeholder="任务名称" style="width: 15%;" size="large"></Input>
   	<div>
   		       任务状态 ：          
                <Select v-model="status" style="width:15%;margin-left:7px;" size="large">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
	                   
        <ButtonGroup size="large">
                <Button type="primary" ghost @click="find" style="margin-left:20px;">查询</Button>   
                <Button type="primary" ghost @click="clear" style="margin-left:10px;">清空</Button>   
           </ButtonGroup>
   	</div>    

      
          
       </div>

    <div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
   		 <Page :total='Number(totalNum)' show-elevator @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
       </tr>
    </div>

    <Modal v-model="modal" width="800" :styles="{top: '20px'}">
        <p style="height:40px;font-size:15px;">任务名称&nbsp;&nbsp;&nbsp; {{detailInfo.easyMakeName}}</p>
        <p style="height:40px;font-size:15px;">手机号&nbsp;&nbsp;&nbsp; {{detailInfo.phone}}</p>
        <img :src="data" alt="" v-for="data in voucherUrl" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg(data)">

        <div slot="footer">
            <Button  size="large"  @click="pass">通过</Button>
            <Button  size="large"  @click="noPass">不通过</Button>
        </div>
    </Modal>

        <Modal title="View Image" v-model="visible">
              <img :src='imgName' v-if="visible" style="width: 100%">
          </Modal>

      <Modal
        v-model="modal2"
        title="提示"
        @on-ok="passConfirm"
        >
        <p>确认通过审核？</p>
    </Modal>

      <Modal
        v-model="modal3"
        title="提示"
        @on-ok="noPassForm"
        >
        <Form> 	
       <Row>
       	 <Col>      	 		    
      		  <FormItem label="不通过原因">
     	  	 	  <Input v-model="NoPassReason" type="textarea" placeholder="请输入不通过原因" />
      		  </FormItem> 
       	 </Col>
       </Row>  
      </Form>
    </Modal>

    <Modal v-model="modalCheck" width="800" :styles="{top: '20px'}">
        <p style="height:40px;font-size:15px;">任务名称:&nbsp;&nbsp;&nbsp; {{detailInfo.easyMakeName}}</p>
        <p style="height:40px;font-size:15px;">手机号:&nbsp;&nbsp;&nbsp; {{detailInfo.phone}}</p>
        <p style="height:40px;font-size:15px;">失败原因:&nbsp;&nbsp;&nbsp; {{detailInfo.failReason}}</p>
        <img :src="data" alt="" v-for="data in voucherUrl" style="height:60px;width:60px;cursor:pointer;display:inline-block;" @click="viewImg(data)">

    </Modal>

   
    </div>
    
</template>


<script>

    export default {
        name:'',
        data(){
             const auditBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          console.log(params.row)
                                          this.detailInfo = params.row;
                                          this.voucherUrl = params.row.voucherUrl.split(';')
                                          this.modal = true;
                                          console.log(this.detailInfo)
                                        }
                                    }
                                }, '审核')            
             };

             const checkBtn = (h, params) => { 
                  return  h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.detailInfo = params.row;
                                          this.voucherUrl = params.row.voucherUrl.split(';')
                                          this.modalCheck = true;
                                          
                                        }
                                    }
                                }, '查看')            
             };

            return{
                modalCheck:false,
                operateBy:'',
                NoPassReason:'',
                modal2:false,
                modal3:false,
                imgName:null,
                visible:false,
                voucherUrl:[],
                detailInfo:{
                    beginDate: null,
                    easyMakeName: "",
                    endDate: null,
                    failReason: null,
                    nickName: "",
                    page: null,
                    phone: "",
                    singlePrice: null,
                    size: null,
                    status: "",
                    voucherUrl: "",
                    _index: null
                },
                modal:false,
                status:null,
				nickName:null,
                phone:null,
                easyMakeName:null,
        		statusList:[
            		 {
                        value: 2,
                        label: '待审核'
                    },
                    {
                        value: 6,
                        label: '申请失败'
                    },
                    {
                        value:7,
                        label: '任务成功'
                    	
                    },
            	],
                totalNum:0,
                pageNum:1,
                pageSize:9,
                 columns: [
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },

                    {
                        title: '用户名',
                        align: 'center',
                        key: 'nickName',
                        minWidth:100
                    },
                     {
                        title: '任务名称',
                        align: 'center',
                        key: 'easyMakeName',
                        minWidth:100
                    },
                    {
                        title: '任务单价',
                        align: 'center',
                        key: 'singlePrice',
                        minWidth:100
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'phone',
                        minWidth:150
                    },
                       {
                        title: '开始时间',
                        align: 'center',
                        key: 'createTime',
                        minWidth:150
                    },
                    {
                        title: '审核时间',
                        align: 'center',
                        key: 'modifyTime',
                        minWidth:150
                    },
                     {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        minWidth:100
                    },
                         {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {      
                            if(params.row.status == '待审核'){
                                return h('div', [
                                      auditBtn(h,params)
                                 ]); 
                            }else{
                                return h('div', [
                                      checkBtn(h,params)
                                 ]); 
                            
                            }
                                  
                        }
                     }
       
         
     
                ],
                data1:[
                   
                ]
            }
        },
      methods:{
          noPassForm(){
            
              if(this.NoPassReason == ''){
                this.$Message.error('请输入原因');
              }else{
                let info = {
                   id:this.detailInfo.id,
                   status:6,
                   failReason:this.NoPassReason,
                    openId:this.detailInfo.openId,
                    operateBy:this.operateBy,
                    easyMakeId:this.detailInfo.easyMakeId,
                    easyMakeName:this.detailInfo.easyMakeName,
                }
           
                 this.$http({
						method:'POST',
						url: this.allUrlThree.updateEasyMakeStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                          if(response.data.resultCode=='1'){
                                this.$Message.success('审核成功');
                                this.handlePageSize(this.pageNum)
                            }else{
                                console.log(response)
                                this.$Message.error(response.data.resultMessage);
                            }
                    })

              }
          },
          passConfirm(){
             let info = {
                   id:this.detailInfo.id,
                   status:7,
                   openId:this.detailInfo.openId,
                   operateBy:this.operateBy,
                   easyMakeId:this.detailInfo.easyMakeId,
                   easyMakeName:this.detailInfo.easyMakeName,
                   
               }
                   this.$http({
						method:'POST',
						url: this.allUrlThree.updateEasyMakeStatus,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						params:info
					}).then((response)=>{
                        console.log(response)
                          if(response.data.resultCode=='1'){
                                this.$Message.success('审核成功');
                                this.handlePageSize(this.pageNum)
                            }else{
                                this.$Message.error(response.data.resultMessage);
                            }
                    })
          },
          viewImg(data){
                this.visible = true;
                this.imgName = data;
            },
            pass(){
                this.modal = false
                this.modal2 = true
            },
            noPass(){
                this.modal = false
                this.modal3 = true
            },
             handleSelectAll () {
                let status = !document.getElementsByClassName('ivu-checkbox-input')[0].checked
                this.$refs.selection.selectAll(status);
            },
             handlePageSize(value) {
                 this.pageNum = value;
                	this.get(this.allUrlThree.getEasyMakeRecordPage,{page:this.pageNum,size:9,status:this.status,nickName:this.nickName,phone:this.phone,easyMakeName:this.easyMakeName}).then((res)=>{
                        res.data.data.records.forEach((i,index)=>{
                            i.status = this.changeStatus(i.status)
                            i.modifyTime = this.changeTime(i.modifyTime)
                         i.createTime = this.changeTime(i.createTime)
                        })
                        this.data1 = res.data.data.records;
                            if(res.data.data.total){
                                this.totalNum = res.data.data.total
                            }else{
                                this.totalNum = 0
                            }
                    })

             },
            //  查询
              find(){
                  this.pageNum = 1;
                
            	this.get(this.allUrlThree.getEasyMakeRecordPage,{page:1,size:9,status:this.status,nickName:this.nickName,phone:this.phone,easyMakeName:this.easyMakeName}).then((res)=>{
            		res.data.data.records.forEach((i,index)=>{
                        i.status = this.changeStatus(i.status)
                        i.modifyTime = this.changeTime(i.modifyTime)
                         i.createTime = this.changeTime(i.createTime)
                    })
                      this.data1 = res.data.data.records;
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            	})
			
			
               
            },
            clear(){
            	this.nickName =null
                this.phone = null
                this.easyMakeName = null
                this.status = null
            	
            },
            changeStatus(data){
                console.log(data)
                let result = '';
                if(data== '2'){
                    result = '待审核'
                }else if(data=='6'){
                    result = '申请失败'
                }else if(data=='7'){
                    result = '任务成功'
                }
                return result;
            }
            
            },
            mounted(){
                this.operateBy = JSON.parse(localStorage.getItem('TokenKey')).realName
                this.get(this.allUrlThree.getEasyMakeRecordPage,{page:1,size:9,status:this.status,nickName:this.nickName,phone:this.phone,easyMakeName:this.easyMakeName}).then((res)=>{
                         this.data1 = res.data.data.records;
                         
            		res.data.data.records.forEach((i,index)=>{
                         i.status = this.changeStatus(i.status)	
                         i.modifyTime = this.changeTime(i.modifyTime)
                         i.createTime = this.changeTime(i.createTime)
            		})
    		              if(res.data.data.total){
                            this.totalNum = res.data.data.total
                        }else{
                            this.totalNum = 0
                        }
            	})
           }
    }
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
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
            padding-right: 40px;
            text-align: left;
            border-bottom:1px solid #000000;
            display: flex; justify-content: space-between;
        }
        .search{
           line-height: 71px;font-size: 24px;padding-left: 40px;
            border-bottom:1px solid #000000;text-align: left;
        }
   	     .all_users{
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
    .addRoleBox{      
        margin-bottom: 20px;
        .ivu-modal{
        top: 388px!important;
        
        }
    }
</style>