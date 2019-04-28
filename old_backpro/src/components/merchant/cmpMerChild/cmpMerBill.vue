<template>
	<!--商户名称 编号需要从上级页面传过来-->
	<div class="cmpMerBill">
		<div class="billList">充值列表</div>
		<div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">

   		 <Page :total='Number(totalNum)' show-elevator @on-change = 'handlePageSize' show-total :current="pageNum" :page-size="pageSize" style="margin-left: 400px;"></Page>
        </tr>

        	
    </div>
		<!--查看充值弹框弹框-->
             <Modal v-model="checkout1" width="600" title="查看">
		      		<div class="searchBox">
		      			<div><span>商户名称</span><span>{{rechargeRecord.tenantName}}</span></div>
		      			<div><span>商户编号</span><span>{{rechargeRecord.tenantId}}</span></div>
		      			<div><span>充值金额</span><span  style="color: red;font-size: 16px;">{{rechargeRecord.amount}}元</span></div>
		      			<div><span>充值编号</span><span>{{rechargeRecord.id}}</span></div>
		      			<div><span>充值状态</span><span>{{rechargeRecord.status}}</span></div>
		      			<div><span>充值时间</span><span>{{rechargeRecord.createTime}}</span></div>
		      			<div><span>当前余额</span><span>{{rechargeRecord.balance}}</span></div>
		      			<div v-if="isCheckTime"><span>审核时间</span><span>{{rechargeRecord.updateTime}}</span></div>
		      			<div v-if="isfail" class="failBox">
		      				<div><span>拒绝原因</span><span>{{rechargeRecord.failReason}}</span></div>
		      				<div v-if="rechargeRecord.attachment !== null"><span>附件</span><img :src = rechargeRecord.attachment alt=""/></div>
		      			</div>
						<div><span>是否预充值</span><span>{{rechargeRecord.preloaded=='false'?'否':'是'}}</span></div>
		      		</div>
  		 	 </Modal>
	</div>
</template>

<script>
	export default{
		data(){
			return{
            	checkout1:false,
            	isfail:false,
            	rechargeRecord:{},
            	isCheckTime:true,
				tenantId:'',
				data1:[],
				totalNum:1,
				pageSize:9,
				pageNum:1,
				columns:[
                    {
                        title: '充值编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '充值金额（元）',
                        align: 'center',
                        key: 'amount'
                    },
                    {
                        title: '充值状态',
                        align: 'center',
                        key: 'status'
                    },
                     {
                        title: '充值时间',
                        align: 'center',
                        key: 'createTime'
                    },
                    {
                        title: '充值人员',
                        align: 'center',
                        key: 'createBy'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                                 // **************************************充值失败状态下****************************
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
                                        			this.checkRecharge(params)		                			         
                                        	   }
                                        }
                                    }, '查看')                                                         
                                ]);
                           
                        }
                    }
                ]
			}
		},
		methods:{
			checkRecharge(params){
        			 this.checkout1 = true;
        			 this.get(this.allUrl.findRechargeRecord,{rechargeRecordId:params.row.id}).then((res)=>{
						this.rechargeRecord = res.data.data
						console.log(this.rechargeRecord)
						this.rechargeRecord.createTime = this.changeTime(this.rechargeRecord.createTime)
						this.rechargeRecord.updateTime = this.changeTime(this.rechargeRecord.updateTime)
						if (this.rechargeRecord.status == "0") {
		                  	this.isCheckTime = true
							this.isfail = true
		                  	this.rechargeRecord.status = "失败"
		                  }
		                  if (this.rechargeRecord.status == "1") {
		                  	this.isCheckTime = true
							this.isfail = false
		                  	this.rechargeRecord.status = "成功"
		                  }
		                  if (this.rechargeRecord.status == "2") {
		                  	this.isCheckTime = false
							this.isfail = false
		                  	this.rechargeRecord.status = "待审核"
		                  }
        			 })
        
        },
			  handlePageSize(value){
                this.get(this.allUrl.findRecordPageBytenantId,{page:value,rows:9,tenantId:this.tenantId}).then((res)=>{
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  if (i.status == "0") {
                  	i.status = "失败"
                  }
                  if (i.status == "1") {
                  	i.status = "成功"
                  }
                  if (i.status == "2") {
                  	i.status = "待审核"
                  }
                })
        	})
            },
		},
		mounted(){
			this.tenantId = localStorage.getItem("merSherchId")
			this.get(this.allUrl.findRecordPageBytenantId,{page:1,rows:9,tenantId:this.tenantId}).then((res)=>{
				console.log(res)
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  if (i.status == "0") {
                  	i.status = "失败"
                  }
                  if (i.status == "1") {
                  	i.status = "成功"
                  }
                  if (i.status == "2") {
                  	i.status = "待审核"
                  }
                })
        	});
		}
	}
</script>

<style scoped lang="scss">
.cmpMerBill{
	width: 100%;
	height: 100%;
	overflow: auto;
	position: relative;
	text-align: left;
	.billList{
 		height: 40px;
 		padding-left: 20px;
 		line-height: 40px;
 		font-size: 20px;
 		border-left: 10px solid deepskyblue;
 		margin-left: 50px;
 		margin-top: 30px;
	}
	  
}
  .searchBox{
    	width: 100%;
    	height: 100%;
    	display: flex;
    	flex-wrap: wrap;
    	div{
    		width: 50%;
    		height: 30px;
    		display: flex;
    		span:nth-child(1){
    			display: block;
    			width: 100px;
    		}
    	}
    	.failBox{
    		width: 100%;
    		height: 50px;
    		border-top: 1px solid #8C8C8C;
    		display: flex;
    		align-items: center;
    	}
    }
</style>