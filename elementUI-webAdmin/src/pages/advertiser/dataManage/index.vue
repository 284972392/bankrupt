
<template>
 <!-- ham -->
    <section class="pd20">
      <el-row>
        <el-col :span="24"><div class="grid-content">
        <span class="ml10">
            广告计划名称：
            <el-input clearable size="mini" placeholder="请填写广告计划名称" class="w200" v-model="planName" @keyup.enter.native="check"></el-input>
            </span>    
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
        </div></el-col>
      </el-row>

        <el-row>
        <el-col :span="24"><div class="grid-content">
       
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

            <el-row style="display:inline-block;">
                <el-button type="danger" plain round size='mini' @click="selectDate1">今天</el-button>
                <el-button type="danger" plain round size='mini' @click="selectDate2">昨天</el-button>
                <el-button type="danger" plain round size='mini' @click="selectDate3">最近7天</el-button>
                <el-button type="danger" plain round size='mini' @click="selectDate4">最近30天</el-button>
            </el-row>
        </div></el-col>
      </el-row>

          <el-table
    :data="tableData"
    style="width: 100%"
    v-loading="loading"
    :summary-method="getSummaries"
    show-summary
    @sort-change='sortChange'>
    <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{getIndex(scope.$index)}}
        </template>
      </el-table-column>
    <el-table-column label="广告计划名称" min-width="180" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.advertName }}</span>
      </template>
    </el-table-column>
     <el-table-column label="时间" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ changeTime(scope.row.modifyTime) }}</span>
      </template>
    </el-table-column>
     <el-table-column label="曝光量（次）" min-width="160" align="center" sortable='custom' prop="exposureTime">
      <template slot-scope="scope">
        <span>{{ scope.row.exposureTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="点击（次）" min-width="180" align="center" sortable='custom' prop="clickTime">
      <template slot-scope="scope">
        <span>{{ scope.row.clickTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="点击率" min-width="180" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.clickRate }}%</span>
      </template>
    </el-table-column>
     <el-table-column label="访问PV" min-width="130" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.accessPv }}</span>
      </template>
    </el-table-column>
     <el-table-column label="转化PV" min-width="150" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.transformPv }}</span>
      </template>
    </el-table-column>
     <el-table-column label="单次价格（元）" min-width="180" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.price }}</span>
      </template>
    </el-table-column>
     <el-table-column label="总消耗（元）" min-width="180" align="center" sortable='custom' prop="totalConsume">
      <template slot-scope="scope">
        <span>{{ scope.row.totalConsume }}</span>
      </template>
    </el-table-column>
  
  </el-table>
 <el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
    </el-pagination>
    </section>
</template>

<script>
import json2csv from 'json2csv'
  import { getAdverDataList,advertQuery } from '@/api/account'
     export default {
      name:'adverdata',
    data() {
      return {
            method:'getAdverDatalist',
            visible:false,
            planName:'',
            column :'',
            isAsc : null,
            dataSelect:'',
             tableData: [],
             exportData:[]
      };
    },
    methods: {
       getParams() {
              return {
                beginDate: this.dataSelect ? this.dataSelect[0] : null,
                endDate: this.dataSelect ? this.dataSelect[1] : null,
                advertName : this.planName ? this.planName : null,
                column : this.column ? this.column : null,
                isAsc : this.isAsc,
                page: this.PAGINATION.currentPage,
                limit: this.PAGINATION.pageSize,
              }
            },
        // 导出表格
        exportTable(){
          this.advertQuery()
          this.visible = false;
          let cc = [{prop:'advertName',label:'广告计划名称'},{prop:'modifyTime',label:'时间'},{prop:'exposureTime',label:'曝光量（次）'}
          ,{prop:'clickTime',label:'点击（次）'},{prop:'clickRate',label:'点击率'},{prop:'accessPv',label:'访问PV'}
          ,{prop:'transformPv',label:'转化PV'},{prop:'price',label:'单次价格（元）'},{prop:'totalConsume',label:'总消耗（元）'}]
          this.exportData.map((val)=>{
            val.modifyTime = this.changeTime(val.modifyTime)
          })
          this.ExportCsv(this.exportData,cc,'广告数据')
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
        sortChange( column){
          this.column = column.prop
          this.isAsc = column.order=='descending'?false:true
          this.check()
        },
        selectDate1(){//今天
          this.dataSelect = []
          this.dataSelect[0] = new Date(this.getDay(0))
          this.dataSelect[1] = new Date(this.getDay(1))
          this.check()
        },
        selectDate2(){//昨天
          this.dataSelect = []
          this.dataSelect[0] = new Date(this.getDay(-1))
          this.dataSelect[1] = new Date(this.getDay(0))
          this.check()
        },
        selectDate3(){//最近7天
          this.dataSelect = []
          this.dataSelect[0] = new Date(this.getDay(-6))
          this.dataSelect[1] = new Date(this.getDay(1))
          this.check()
        },
        selectDate4(){//最近30天
          this.dataSelect = []
          this.dataSelect[0] = new Date(this.getDay(-29))
          this.dataSelect[1] = new Date(this.getDay(1))
          this.check()
        },
         getSummaries(params){
                const { columns, data } = params;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总计/均值';
                        return;
                    }else if(index === 3){
                        let sum = 0;
                        data.map((num)=>{
                            sum += Number(num.exposureTime);
                        })
                        sums[index] = sum + '次'
                        return;
                    }else if(index === 4){
                        let sum = 0
                         data.map((num)=>{
                          sum += Number(num.clickTime);
                        })
                        sums[index] = sum + '次'
                    }else if(index == 5){
                        let sum = 0;
                        data.map((num)=>{
                            sum += Number(num.clickRate);
                        })
                        sums[index] = sum/data.length.toFixed(2)+'%'
                    }else if(index === 6){
                        let sum = 0
                         data.map((num)=>{
                          sum += Number(num.accessPv);
                        })
                        sums[index] = sum
                    }else if(index === 7){
                        let sum = 0
                         data.map((num)=>{
                          sum += Number(num.transformPv);
                        })
                        sums[index] = sum
                    }else if(index === 8){
                        let sum = 0
                         data.map((num)=>{
                          sum += Number(num.price);
                        })
                        sums[index] = (sum/data.length).toFixed(2)
                    }else if(index === 9){
                        let sum = 0
                         data.map((num)=>{
                          sum += Number(num.totalConsume);
                        })
                        sums[index] = sum.toFixed(2)
                    }
                    
                    
            });

             return sums;
            },
         async getAdverDatalist() {
                this.loading = true
                let res = await getAdverDataList(this.queryParams)
             
                this.tableData = res.data.page.list
                this.PAGINATION.total = res.data.page.totalCount
                this.loading = false
              },
         async advertQuery() {
                let res = await advertQuery(this.queryParams)
                console.log(res.data.list)
                this.exportData = res.data.list
              },
    },
      created() {
          this.check()
        
        },
  }
</script> 

<style scoped>
     .grid-content {
    padding: 10px 20px;
    min-height: 36px;
    background: #ffffff;
    font-size: 16px;
  }
</style>