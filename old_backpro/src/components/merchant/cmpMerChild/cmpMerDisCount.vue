<template>
	<!--商户名称 编号需要从上级页面传过来-->
	<div class="cmpMerBill">
		<div class="billList">充值列表</div>
		<div class="table">
        
        <Table border ref="selection"  :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            <td>
                <Button @click="handleSelectAll()" style="margin-right: 40px;">全选</Button>
            </td>
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
                        title: '充值编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '充值金额（元）',
                        align: 'center',
                        key: 'tenantName'
                    },
                    {
                        title: '充值人员',
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
			handleSelectAll(){
				
			},
			handlePageSize(){
				
			}
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