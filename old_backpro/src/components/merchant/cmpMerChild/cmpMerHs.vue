<template>
	<!--商户名称 编号需要从上级页面传过来-->
	<div class="cmpMerBill">
		<div class="billList">划算列表</div>
		<div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
   		 <Page :total='Number(totalNum)' show-elevator @on-change = 'handlePageSize' show-total :current="pageNum" :page-size="pageSize" style="margin-left: 400px;"></Page>
        </tr>

        	
    </div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data1:[],
				totalNum:1,
				pageSize:9,
				pageNum:1,
				columns:[
                    
                    {
                        title: '优惠编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '商品名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '预约上架时间',
                        align: 'center',
                        key: 'shelvesTime'
                    },
                    {
                        title: '预约下架时间',
                        align: 'center',
                        key: 'theShelvesTime'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status'
                    },
                     {
                        title: '操作时间',
                        align: 'center',
                        key: 'updateTime'
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
				this.$Message.warning("在渠道管理里面查看")
			},
			handlePageSize(value){
					this.get(this.allUrl.findBargainPageBytenantId,{page:value,rows:9,tenantId:this.tenantId}).then((res)=>{
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.updateTime = this.changeTime(i.updateTime)
                  i.theShelvesTime = this.changeTime(i.theShelvesTime)
                  i.shelvesTime = this.changeTime(i.shelvesTime)
 					if (i.status == "0") {
                  	i.status = "已删除"
                  }
                  if (i.status == "1") {
                  	i.status = "待提交"
                  }
                  if (i.status == "2") {
                  	i.status = "待审核"
                  }
                  if (i.status == "3") {
                  	i.status = "已退回"
                  }
                  if (i.status == "4") {
                  	i.status = "待上架"
                  }
                  if (i.status == "5") {
                  	i.status = "进行中"
                  }
                  if (i.status == "6") {
                  	i.status = "已暂停"
                  }
                  if (i.status == "7") {
                  	i.status = "已下架"
                  }
                  if (i.status == "8") {
                  	i.status = "已终止"
                  }
                })
        });
		
			}
		},
		mounted(){
			this.tenantId = localStorage.getItem("merSherchId")
			this.get(this.allUrl.findBargainPageBytenantId,{page:1,rows:9,tenantId:this.tenantId}).then((res)=>{
				console.log(res)
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.updateTime = this.changeTime(i.updateTime)
                  i.theShelvesTime = this.changeTime(i.theShelvesTime)
                  i.shelvesTime = this.changeTime(i.shelvesTime)
 					if (i.status == "0") {
                  	i.status = "已删除"
                  }
                  if (i.status == "1") {
                  	i.status = "待提交"
                  }
                  if (i.status == "2") {
                  	i.status = "待审核"
                  }
                  if (i.status == "3") {
                  	i.status = "已退回"
                  }
                  if (i.status == "4") {
                  	i.status = "待上架"
                  }
                  if (i.status == "5") {
                  	i.status = "进行中"
                  }
                  if (i.status == "6") {
                  	i.status = "已暂停"
                  }
                  if (i.status == "7") {
                  	i.status = "已下架"
                  }
                  if (i.status == "8") {
                  	i.status = "已终止"
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
</style>