<template>
	<div class="moneyRecord">
		<div class="header">
			现金收支记录
		</div>
		<div class="search">
			搜索栏
		</div>
		<div class="table">
        
        <Table border :columns="columns" :data="data1" height=475></Table>
        <tr class="btn_tr">
            
   		   <Page :total='Number(totalNum)' show-elevator style="margin-left: 180px;" @on-change='handlePageSize' show-total
            :current="pageNum" :page-size="pageSize"></Page>
            
        </tr>
        <!-- <input type="checkbox" @click="handleSelectAll()" :checked=this.checkedAll> -->

        	
    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				totalNum:0,
				pageNum:1,
                pageSize:9,
                appUserId:0,
				data1:[],
				columns:[
                  
                    {
                        title: '编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '收支',
                        align: 'center',
                        key: 'paymentType'//1 收入 2支出
                    },
                    {
                        title: '科目',
                        align: 'center',
                        key: 'paymentName',
                        width:115
                    },
                    {
                        title: '至',
                        align: 'center',
                        key: 'userName'
                    },
                     {
                        title: '收支变化（元）',
                        align: 'center',
                        key: 'money'
                    },
                     {
                        title: '操作时间',
                        align: 'center',
                        key: 'createTime'
                    },
                    
                    {
                        title: '状态',
                        align: 'center',
                        key: 'paymentStatus'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center'
                    }
                ],
			}
		},
		methods:{
			 handlePageSize(value){
                this.get(this.allUrl.findAppCashPaymentByUserId,{page:value,rows:9,userId:this.appUserId}).then((res)=>{
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{    
        		  if(i.paymentType == 1){
        		  	i.paymentType = "收入"
        		  }else{
        		  	i.paymentType ="支出"
        		  	
        		  }
        		  
        		  if(i.paymentStatus == 0){
        		  	i.paymentStatus = "失败"
        		  }
        		  if(i.paymentStatus == 1){
        		  	i.paymentStatus = "成功"
        		  }
        		  if(i.paymentStatus == 2){
        		  	i.paymentStatus = "待审核"
        		  }
                  i.createTime = this.changeTime(i.createTime)
                  i.lastTime = this.changeTime(i.lastTime)
                })
        	})
            },
		},
		mounted(){
			this.appUserId = localStorage.getItem('appUserId')
        	this.get(this.allUrl.findAppCashPaymentByUserId,{page:1,rows:9,userId:this.appUserId}).then((res)=>{
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{    
        		  if(i.paymentType == 1){
        		  	i.paymentType = "收入"
        		  }else{
        		  	i.paymentType ="支出"
        		  	
        		  }
        		  
        		  if(i.paymentStatus == 0){
        		  	i.paymentStatus = "失败"
        		  }
        		  if(i.paymentStatus == 1){
        		  	i.paymentStatus = "成功"
        		  }
        		  if(i.paymentStatus == 2){
        		  	i.paymentStatus = "待审核"
        		  }
                  i.createTime = this.changeTime(i.createTime)
                  i.lastTime = this.changeTime(i.lastTime)
                })
        	})
        
		}
	}
</script>

<style scoped="scoped" lang="scss">
  .moneyRecord{
  	margin-top: 10px;
  	width: 100%;
  	margin-left: 30px;
  	background: #ffffff;
  	padding-top: 40px;
  	padding-left: 50px;
  	padding-right: 20px;
  	.header{
 		height: 40px;
 		padding-left: 20px;
 		line-height: 40px;
 		font-size: 20px;
 		border-left: 10px solid deepskyblue;		
 		}
 		.search{
 			width: 100%;
 			height: 50px;
 			text-align: center;
 			line-height: 50px;
 			font-size: 17px;
 			border: 1px solid #cccccc;
 			margin-left: 40px;
 			margin-top: 20px;
 		}
 		.table{
 			width: 100%;
 			margin-left: 40px;
 			padding-bottom: 20px;
 			
 		}
  }
</style>