<template>
	<div class="cornRecord">
		<div class="header">
			金币收支记录
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
				userId:'',
				totalNum:0,
				pageNum:1,
                pageSize:9,
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
                        key: 'type' // 1：收入  ，  2 .3 支出
                    },
                    {
                        title: '科目',
                        align: 'center',
                        key: 'accessSource', 
                        width:115
                    },
                    {
                        title: '收支变化',
                        align: 'center',
                        key: 'coinNumber'
                    },
                    
                   
                     {
                        title: '操作时间',
                        align: 'center',
                        key: 'createTime'
                    },

                     
                    {
                        title: '状态',
                        align: 'center',
                        key: 'coinStatus'   // 0 失败   1 成功
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
                this.get(this.allUrl.findAppGoldCoinRecordByUserId,{page:value,rows:9,userId:this.userId}).then((res)=>{
                    this.totalNum = res.data.total
                    this.data1 = res.data.rows
                    res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  i.lastTime = this.changeTime(i.lastTime)
                  if( i.type == "1"){
                  	 i.type = "收入";
                  	 i.coinNumber = "+"+i.coinNumber
                  	 
                  }else{
                  	 i.type = "支出"
                  	 i.coinNumber = -i.coinNumber
                  	 
                  	
                  };
                  if(i.coinStatus == "0"){
                  	i.coinStatus = "失败"
                  }else{
                  	i.coinStatus = "成功"
                  }
                  
                 if(i.accessSource == "0"){
                  	i.accessSource = "签到"
                  }
                  if (i.accessSource == "1") {
                  	i.accessSource = "关注"
                  }
                  if (i.accessSource == "2") {
                  	i.accessSource = "手机绑定"
                  }
                  if (i.accessSource == "3") {
                  	i.accessSource = "徒弟完成任务"
                  }
                  if (i.accessSource == "4") {
                  	i.accessSource = "徒孙完成任务"
                  }
                })
                 })
            },
		},
		mounted(){
        	this.get(this.allUrl.findAppGoldCoinRecordByUserId,{page:1,rows:9,userId:this.userId}).then((res)=>{
        		console.log(res)
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                  i.createTime = this.changeTime(i.createTime)
                  i.lastTime = this.changeTime(i.lastTime)
                  if( i.type == "1"){
                  	 i.type = "收入"
                  	 i.coinNumber = "+"+i.coinNumber
                  	 
                  }else{
                  	 i.type = "支出"
                  	 i.coinNumber = -i.coinNumber
                  	 
                  	
                  };
                  if(i.coinStatus == "0"){
                  	i.coinStatus = "失败"
                  }else{
                  	i.coinStatus = "成功"
                  };
                  
                  if(i.accessSource == "0"){
                  	i.accessSource = "签到"
                  }
                  if (i.accessSource == "1") {
                  	i.accessSource = "关注"
                  }
                  if (i.accessSource == "2") {
                  	i.accessSource = "手机绑定"
                  }
                  if (i.accessSource == "3") {
                  	i.accessSource = "徒弟完成任务"
                  }
                  if (i.accessSource == "4") {
                  	i.accessSource = "徒孙完成任务"
                  }
                })
        	})
        
		},
//		appUserId
		beforeMount(){
			this.userId = localStorage.getItem('appUserId')
		}
	}
</script>

<style scoped="scoped" lang="scss">
  .cornRecord{
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