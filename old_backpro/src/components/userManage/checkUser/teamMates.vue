<template>
	<div class="teamMates">
		<div class="header">
			团队成员
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
                        title: '用户编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '用户名称',
                        align: 'center',
                        key: 'invitedUserName'
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'invitedUserPhone',
                        width:115
                    },
                    {
                        title: '用户关系',
                        align: 'center',
                        key: 'relationShip'
                    },
                     {
                        title: '上级用户',
                        align: 'center',
                        key: 'userName'
                    },
                     {
                        title: '贡献金币（个）',
                        align: 'center',
                        key: 'contributionGold'
                    },
                     {
                        title: '邀请时间',
                        align: 'center',
                        key: 'inviteTime'
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
                this.get(this.allUrl.findTeamInfoPage,{page:value,rows:9,userId:this.userId}).then((res)=>{
                    this.totalNum = res.data.total
                    this.data1 = res.data.rows
                     res.data.rows.forEach((i,index)=>{        
                   i.status = changeStatus(i.status)
                })
                 })
            },
		},
		mounted(){
        	this.get(this.allUrl.findTeamInfoPage,{page:1,rows:9,userId:this.userId}).then((res)=>{
                console.log(res)
                this.totalNum = res.data.total
                this.data1 = res.data.rows;
        		 res.data.rows.forEach((i,index)=>{        
                   i.status = changeStatus(i.status)
                })
        	})
        
		},
		beforeMount(){
			this.userId = localStorage.getItem("appUserId")
		}
    }
    function changeStatus (param) {  
         if(param == '1'){
             return '正常用户'
         }else if(param == '0'){
             return '违规用户'
         }
     }
</script>

<style scoped="scoped" lang="scss">
  .teamMates{
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