
<template>
   <section class="pd20">
  	<el-row>
  		<el-col :span="24">
  	<div class="grid-content">
  		        <span class="ml10">
            审核状态：
            <el-select v-model="advertiseType" placeholder="请选择" size="mini" class="w200">
                <el-option v-for="item in adverTypeList" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            </span>
            <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check" style="margin-left:10px;">查询</el-button>
			<el-button type="danger" size="mini" class="w80" style="margin-left:10px;" @click="addqualification">新增资质</el-button>
          </div>
         </el-col>
  	</el-row>
  	   <el-table :data="tableData" style="width: 100%" border fit highlight-current-row v-loading="listLoading" element-loading-text="正在查询中...">
                         <el-table-column type="index" label="序号" width="100" align="center" fixed>
					        <template slot-scope="scope">
					          {{getIndex(scope.$index)}}
					        </template>
					      </el-table-column>
					          <el-table-column label="广告行业" min-width="120" align="center">
						      <template slot-scope="scope">
						        <span>{{ changeType(scope.row.industry) }}</span>
						      </template>
						    </el-table-column>
						    <el-table-column label="资质列表" min-width="150" align="center">
						      <template slot-scope="scope">
						      	<div style="width: 100%;text-align: left;" v-for="(data,index) in scope.row.qualificationName">{{(index+1)+'、'+data}}</div>
						        <!--<span>{{ scope.row.qualificationName }}</span>-->
						      </template>
						    </el-table-column>
						    <el-table-column label="到期时间" min-width="120" align="center">
						      <template slot-scope="scope">
						      	<div style="width: 100%;text-align: left;" v-for="(data,index) in scope.row.validDate">{{(index+1)+'、'+changeTime(data)}}</div>
						      	
						        <!--<span>{{ changeTime(scope.row.validDate) }}</span>-->
						      </template>
						    </el-table-column>
						    <el-table-column label="资质状态" min-width="120" align="center">
						      <template slot-scope="scope">
						      	<div style="width: 100%;text-align: left;" v-for="(data,index) in scope.row.status">{{(index+1)+'、'+changeStatus(data)}}</div>
						      	
						        <!--<span>{{ changeStatus(scope.row.status) }}</span>-->
						      </template>

                        <!--</el-table-column>
                        <el-table-column
                        prop="amount2"
                        	align="center"
                        label="行业状态">-->

                        </el-table-column>
                        
                         <el-table-column
                        	align="center"
                      		  label="操作">
		     				 <template slot-scope="scope">
								<el-button @click="changeBtn(scope.$index, scope.row)" type="primary" size="mini" class="w80" style="margin-left:10px;">编辑</el-button>
							 </template>					
                        </el-table-column>
                   </el-table>
                  <!--<el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
   				 </el-pagination>    -->
   </section>
</template>

<script>
  import { qualificationList } from '@/api/account'
    export default {
        name:'qualificationList',
        data(){
        	return{
            	method:'qualificationList',
        		advertiseType:null,
        		adverTypeList : [
				  { value: null, label: '全部' },
				  { value: "1", label: '待审' },
				  { value: "2", label: '通过' },
				  { value: "3", label: '拒绝' },
				],
          	    visible:false,
                show:false,
                info:{},
                listLoading: false,
                dataSelect:'',
        		tableData:[]
        	}
        },
        methods:{
        	  getParams() {
              return {
                // beginDate: this.dataSelect ? this.dataSelect[0] : null,
                // endDate: this.dataSelect ? this.dataSelect[1] : null,
//              advertName : this.planName ? this.planName : null,
                status:this.advertiseType,
                page: 1,
                limit: 100,
              }
            },
        	addqualification(){
				 this.$store.commit('qualification_list', "新增")
        		this.$router.push('/index/addqualification')
        	},
        	// 导出表格
	        exportTable(){
	          this.visible = false;
	        },
             // 更改完状态刷新列表
            advertiseList(){

                // this.tableData[0].date = !this.tableData[0].date   
               
            },
            changeBtn(index, row){
              row = JSON.stringify(row);
//				sessionStorage.setItem("qualification_list",row)
				 this.$store.commit('qualification_list', row)
//				 this.$store.state.qualification_list =  row
            	
//          	console.log(index);

        		this.$router.push('/index/addqualification')
            	
            },
             changeType(param) { 
                var info = ''
                switch(param){
                    case 0:
                      info = '小额贷款'
                    break;
                    case 1:
                      info = '保险类'
                      break;
                    case 2:
                      info = 'P2P网贷平台'
                      break;
                    case 3:
                      info = '彩票'
                      break;
                    case 4:
                      info = '酒类'
                      break;
                    case 5:
                      info = '教育培训'
                      break;
                }
                return info;
            },
            changeTime(param){
            	if(param == null){
            		return "永久"
            	}else{
            	         let date = new Date(param);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				        let Y = date.getFullYear() + '-';
				        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				        let D = date.getDate() + ' ';
				        return Y+M+D;
            	}

            },
            changeStatus(param){ 
                let info1 = ''
                switch(param){
                    case "1":
                      info1 = '待审'
                      break;
                    case "2":
                      info1 = '通过'
                      break;
                    case "3":
                      info1 = '拒绝'
                      break;
                }
                return info1;
            },
           async qualificationList(){
                this.loading = true
                this.tableData = []
                let that = this;
                let res = await qualificationList(this.queryParams)
             	  console.log(res)

	  			Object.keys(res.data.data).forEach(function(key){
	  				if (key == 0) {
	  					res.data.data[key].industry = 0
	  					that.tableData.push(res.data.data[key])
	  				}else if (key == 1) {
	  					res.data.data[key].industry = 1
	  					
	  					that.tableData.push(res.data.data[key])
	  				}else if (key == 2) {
	  					res.data.data[key].industry = 2
	  					
	  					that.tableData.push(res.data.data[key])
	  				}else if (key == 3) {
	  					res.data.data[key].industry = 3
	  					
	  					that.tableData.push(res.data.data[key])
	  				}else if (key == 4) {
	  					res.data.data[key].industry = 4
	  					
	  					that.tableData.push(res.data.data[key])
	  				}else if (key == 5) {
	  					res.data.data[key].industry = 5
	  					
	  					that.tableData.push(res.data.data[key])
	  				}
	  			})
               		
			this.tableData.forEach(function(i,index){
					that.tableData[index].qualificationName = []
               		that.tableData[index].validDate = []
               		that.tableData[index].status = []
               	i.forEach(function(j,index2){

               		if (j.industry == 0) {
               			 that.tableData[0].qualificationName.push(j.qualificationName) 
               			 that.tableData[0].validDate.push(j.validDate) 
               			 that.tableData[0].status.push(j.status) 
               		}
               		if (j.industry == 1) {
               			 that.tableData[1].qualificationName.push(j.qualificationName) 
               			 that.tableData[1].validDate.push(j.validDate) 
               			 that.tableData[1].status.push(j.status) 
               		}
               		if (j.industry == 2) {
               			 that.tableData[2].qualificationName.push(j.qualificationName) 
               			 that.tableData[2].validDate.push(j.validDate) 
               			 that.tableData[2].status.push(j.status) 
               		}
               		if (j.industry == 3) {
               			 that.tableData[3].qualificationName.push(j.qualificationName) 
               			 that.tableData[3].validDate.push(j.validDate) 
               			 that.tableData[3].status.push(j.status) 
               		}
               		if (j.industry == 4) {
               			 that.tableData[4].qualificationName.push(j.qualificationName) 
               			 that.tableData[4].validDate.push(j.validDate) 
               			 that.tableData[4].status.push(j.status) 
               		}
               		if (j.industry == 5) {
               			 that.tableData[5].qualificationName.push(j.qualificationName) 
               			 that.tableData[5].validDate.push(j.validDate) 
               			 that.tableData[5].status.push(j.status) 
               		}
               	})
              })
//              this.tableData = res.data.page.list
//              this.PAGINATION.total = res.data.page.totalCount
                this.loading = false
           	
           }
        },
         created() {
          this.check()
        },
    }
</script>

<style scoped lang="scss">
   .grid-content {
    padding: 10px 20px;
    min-height: 36px;
    background: #fcfafa;
    font-size: 16px;
      border-bottom: 1px solid #eeeeee;
  }
</style>
