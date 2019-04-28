<template>
	<div class="loginRecord">
		<div class="header">
			登录记录
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
				columns:[
                  
                    {
                        title: '设备',
                        align: 'center',
                        key: 'deviceModel',
                        width:115
                    },
                    {
                        title: '系统',
                        align: 'center',
                        key: 'deviceType'
                    },
                     {
                        title: 'IP',
                        align: 'center',
                        key: 'IP'
                    },
                     {
                        title: '登录时间',
                        align: 'center',
                        key: 'lastTime'
                    },

                ],
			}
		},
		methods:{
			 handlePageSize(value){
                this.get(this.allUrl.findAppUserPage,{page:value,rows:9,type:1}).then((res)=>{
                    this.totalNum = res.data.total
                    this.data1 = res.data.rows
                 })
            },
		},
		mounted(){
        
			let userId = localStorage.getItem('appUserId')
			this.get(this.allUrl.findAppUser,{appUserId:userId}).then((res)=>{
				this.data1.push(res.data.data)
				this.base = res.data.data
				this.base.lastTime = this.changeTime(this.base.lastTime)
				this.base.createTime = this.changeTime(this.base.createTime)
				let reg = /^(http)|(https).*/.test(this.base.headPic);
				if(!reg){
					this.base.headPic = 'http://'+this.base.headPic;
				}
			})
		             
        
		}
	}
</script>

<style scoped="scoped" lang="scss">
  .loginRecord{
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