
<template>
   <section class="pd20">
  	<el-row>
  		<el-col :span="24">
  	<div class="grid-content">
  		       <span class="ml10">
            <el-date-picker
                size='mini'
                v-model="dataSelect"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            </span>
            <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check" style="margin-left:10px;">查询</el-button>
             <span style="margin:0 200px 0 20px;">
              <el-popover
                placement="top"
                width="160"
                v-model="visible">
                <p>确认导出表格吗？</p>
                <div style="text-align: right; margin: 10px 0 0 0;">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="exportTable">确定</el-button>
                </div>
                <el-button slot="reference" type="primary" icon="el-icon-download">导出表格</el-button>
              </el-popover>
          </span>
          </div>
         </el-col>
  	</el-row>
  	   <el-table :data="tableData" style="width: 100%" border fit highlight-current-row v-loading="listLoading" element-loading-text="正在查询中...">
                        <el-table-column type="index" label="序号" width="100" align="center">
				        <template slot-scope="scope">
				          {{getIndex(scope.$index)}}
				        </template>
				      </el-table-column>
				       <el-table-column label="日期" min-width="180" align="center">
					      <template slot-scope="scope">
					        <span>{{ changeTime(scope.row.createTime) }}</span>
					      </template>
					    </el-table-column>
                       <el-table-column label="总存入（元）" min-width="180" align="center">
					      <template slot-scope="scope">
					        <span style="color: #F44336;">{{scope.row.deposit}}</span>
					      </template>
					    </el-table-column>
					     <el-table-column label="总支出（元）" min-width="180" align="center">
					      <template slot-scope="scope">
					        <span style="color: #FF0000;">{{scope.row.spending}}</span>
					      </template>
					    </el-table-column>
                     <el-table-column label="备注" min-width="180" align="center">
					      <template slot-scope="scope">
					        <span>{{scope.row.remark}}</span>
					      </template>
					    </el-table-column>
                   </el-table>
                <el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
				 </el-pagination>   
   </section>
</template>

<script>
import json2csv from 'json2csv'
  import { financeRecordRecord,financeRecordQuery } from '@/api/account'
	
    export default {
        name:'financeRecordRecord',
        data(){
        	return{
        		method:'financeRecordRecord',
          	    visible:false,
                show:false,
                info:{},
                listLoading: false,
                dataSelect:'',
        		tableData:[],
        		exportData:[]
        	}
        },
        methods:{
          getParams() {
              return {
                   beginDate: this.dataSelect ? this.dataSelect[0] : null,
                   endDate: this.dataSelect ? this.dataSelect[1] : null,
//              advertName : this.planName ? this.planName : null,
//              status:this.advertiseType,
                column : this.column ? this.column : null,
           		  page: this.PAGINATION.currentPage,
                limit: this.PAGINATION.pageSize,
              }
            },
        	async financeRecordRecord(){
                this.loading = true
                let res = await financeRecordRecord(this.queryParams)
                this.tableData = res.data.page.list
                this.PAGINATION.total = res.data.page.totalCount
                console.log(res)
                this.loading = false
           	
          },
               async financeRecordQuery() {
                let res = await financeRecordQuery(this.queryParams)
                console.log(res.data.page)
                this.exportData = res.data.page
              },
	        // 导出表格
	        exportTable(){
	          this.financeRecordQuery()
	          this.visible = false;
	          let cc = [{prop:'createTime',label:'日期'},{prop:'deposit',label:'总存入(元)'},{prop:'spending',label:'总支出(元)'}
	          ,{prop:'remark',label:'备注'}]
	          this.exportData.map((val)=>{
	            val.createTime = this.changeTime(val.createTime)
	          })
	          this.ExportCsv(this.exportData,cc,'财务记录')
	        },
         ExportCsv(data, columns, fileName) {
      　//导出的数据行
        const rows = data.map(t => this.getRow(t, columns))
        //导出的数据列标题
        const fields = columns.map(t => { return {value:t.prop,label:t.label}})
        try {
          const result =json2csv.parse(rows, { fields: fields,excelStrings:true});
          const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + result
          const link = document.createElement('a')
          link.href = encodeURI(csvContent)
          link.download = `${fileName}.csv`
          document.body.appendChild(link) // Required for FF
          link.click()
          document.body.removeChild(link) // Required for FF
        } catch (err) {
          alert(err)
        }
      },
            getRow(row, columns) {
        let obj = {}
        console.log(columns)
        columns.forEach(col => {
          let val = row[col.prop]
      
          if (col.formatter) {
            val = col.formatter(row, col, val)
          }
          obj[col.prop] = val;
        })
      
        return obj
      },
             // 更改完状态刷新列表
            advertiseList(){

                // this.tableData[0].date = !this.tableData[0].date   
               
            }
        },
        mounted(){
        	this.check()
        }
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
