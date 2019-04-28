<template>
 <!-- ham -->
    <section class="pd20">
      <el-row>
        <el-col :span="24"><div class="grid-content">
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
            <span class="ml10">
                  <el-select v-model="advertiseStatus" placeholder="请选择" size="mini" class="w200">
                    <el-option v-for="item in advertiseStatusList" :key="item.label" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check" style="margin-left:10px;">查询</el-button>
        </div></el-col>
      </el-row>

    
          <el-table
    :data="tableData"
    v-loading="loading"
    style="width: 100%">
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
     <el-table-column label="充值金额" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.amount }}</span>
      </template>
    </el-table-column>
     <el-table-column label="充值状态" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ changeType(scope.row.status)  }}</span>
      </template>
    </el-table-column>
     <el-table-column label="备注" min-width="180" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.remark }}</span>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
    </el-pagination>

    </section>
</template>

<script>
const advertiseStatusList = [
  { value: '', label: '全部' },
  { value: '1', label: '审核通过' },
  { value: '2', label: '审核中' },
  { value: '0', label: '审核拒绝' },
]
 import { getRechargeRecordList } from '@/api/account'
     export default {
      name:'advertiserPayRecord',
    data() {
      return {
         method:'getRechargeRecordList',
          advertiseStatus:'',
          advertiseStatusList:advertiseStatusList,
            dataSelect:'',
             tableData: []
      };
    },
    methods: {
      getParams() {
              return {
                beginDate: this.dataSelect ? this.dataSelect[0] : null,
                endDate: this.dataSelect ? this.dataSelect[1] : null,
                column : this.column ? this.column : null,
                status: this.advertiseStatus?this.advertiseStatus : null,
                page: this.PAGINATION.currentPage,
                limit: this.PAGINATION.pageSize,
              }
            },
             changeType(param) { 
                var info = ''
                switch(param){
                    case '1':
                      info = '审核通过'
                    break;
                    case '2':
                      info = '审核中'
                      break;
                    case '3':
                      info = '审核拒绝'
                      break;
                }
                return info;
            },
         async getRechargeRecordList() {
                this.loading = true
                let res = await getRechargeRecordList(this.queryParams)
                this.tableData = res.data.page.list
                this.PAGINATION.total = res.data.page.totalCount
                this.loading = false
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