<template>
	<div class="taskRecord">
		<div class="header">
			任务信息
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
				data1:[],
				appUserId:0,
				columns:[
                  
                    {
                        title: '任务编号',
                        align: 'center',
                        key: 'taskId'
                    },
                    {
                        title: '任务名称',
                        align: 'center',
                        key: 'taskName'
                    },
                    {
                        title: '任务类型',
                        align: 'center',
                        key: 'taskType',
                        width:115
                    },
                    {
                        title: 'imei1',
                        align: 'center',
                        key: 'imei1'
                    },
                     {
                        title: 'imei2',
                        align: 'center',
                        key: 'imei2'
                    },
                     {
                        title: 'IP',
                        align: 'center',
                        key: 'IP'
                    },
                     {
                        title: '开始时间',
                        align: 'center',
                        key: 'partakeDate'
                    },
                     {
                        title: '完成时间',
                        align: 'center',
                        key: 'modifyTime'
                    },
                     
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status'
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
                this.get(this.allUrl.findAppTaskRecordByUserId,{page:value,rows:9,type:1}).then((res)=>{
        		console.log(res.data)
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{    
        		
        		  
                        i.taskType = changeTask(i.taskType)
					
                  i.partakeDate = this.changeTime(i.partakeDate)
//                i.endTime = this.changeTime(i.endTime)
                  i.modifyTime = this.changeTime(i.modifyTime)
                  if (i.status == 1) {
                  	i.status = '任务进行中'
                  	i.modifyTime=''
                  }
                  if (i.status ==2) {
                  	i.status = '银行审核中'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 3) {
                  	i.status = '申请失败'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 4) {
                  	i.status = '申请成功'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 5) {
                  	i.status = '平台审核中'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 6) {
                  	i.status = '领取失败'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 7) {
                  	i.status = '任务成功'
                  }
                })
        	})
            },
		},
		mounted(){
			
			this.appUserId = localStorage.getItem('appUserId')
        	this.get(this.allUrl.findAppTaskRecordByUserId,{page:1,rows:9,userId:this.appUserId}).then((res)=>{
        		console.log(res.data)
                this.totalNum = res.data.total
        		this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{    
        		
        		  
                        i.taskType = changeTask(i.taskType)
					
                  i.partakeDate = this.changeTime(i.partakeDate)
//                i.endTime = this.changeTime(i.endTime)
                  i.modifyTime = this.changeTime(i.modifyTime)
                  if (i.status == 1) {
                  	i.status = '任务进行中'
                  	i.modifyTime=''
                  }
                  if (i.status ==2) {
                  	i.status = '银行审核中'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 3) {
                  	i.status = '申请失败'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 4) {
                  	i.status = '申请成功'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 5) {
                  	i.status = '平台审核中'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 6) {
                  	i.status = '领取失败'
                  	i.modifyTime=''
                  	
                  }
                  if (i.status == 7) {
                  	i.status = '任务成功'
                  }
                })
        	})
        
		
		}
	}
	  function changeTask(param){
         var info1 = ''
             switch(param){
            case 1:
              info1 = '注册'
              break;
            case 2:
              info1 = '应用'
              break;
            case 3:
              info1 = '办卡'
              break;
            case 4:
              info1 = '蛋蛋赚游戏'
              break;
              case 5:
              info1 = '聚享玩游戏'
              break;
        }
        return info1;
    
     }
</script>

<style scoped="scoped" lang="scss">
  .taskRecord{
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