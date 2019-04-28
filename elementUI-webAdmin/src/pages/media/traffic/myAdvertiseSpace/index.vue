<template>
 <!-- ham -->
    <section class="pd20">
      <el-row>
        <el-col :span="24"><div class="grid-content">
            <span class="ml10">
                <el-input v-model="Name" placeholder="请输入广告位名称" size="mini" @keyup.enter.native="check"></el-input>
           </span>
             <span class="ml10">
              <el-input v-model="Id" placeholder="请输入广告位ID" size="mini" @keyup.enter.native='check'></el-input>
            </span>
            <span class="ml10">
                  <el-select v-model="status" placeholder="请选择" size="mini" class="w200">
                    <el-option key="0" label="关闭" value="0"></el-option>
                    <el-option key="1" label="开启" value="1"></el-option>
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
       <el-table-column label="广告位名称" min-width="140" align="center">
      <template slot-scope="scope">
        <div>{{ scope.row.positionName }}</div>
        <span>ID: {{ scope.row.id }}</span>
      </template>
    </el-table-column>
       <el-table-column label="所属媒体" min-width="140" align="center">
      <template slot-scope="scope">
          <div>{{scope.row.mediaName}}</div>
        <span>ID: {{ scope.row.mediaId }}</span>
      </template>
    </el-table-column>
       <el-table-column label="广告位规格" min-width="140" align="center">
      <template slot-scope="scope">
        <div>手动投放</div>
        <span>自定义(尺寸：{{scope.row.specs}})</span>
      </template>
    </el-table-column>
       <el-table-column label="修改日期" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{changeTime(scope.row.modifyTime)}}</span>
      </template>
    </el-table-column>

       <el-table-column label="广告位状态" min-width="140" align="center">
      <template slot-scope="scope">
        <el-switch
            @change = "changeSwitch(scope.$index, scope.row)"
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text='开启'
            inactive-text='关闭'
            :active-value=1
            :inactive-value=0
            >
        </el-switch>
      </template>
    </el-table-column>
    
    <el-table-column label="操作" fixed="right" width="200" align='center'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          v-if="scope.row.status==0"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          v-if="scope.row.status==0"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>

  </el-table>
   <el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
    </el-pagination>
    <delectAdverSpace :show.sync="show" :info="info" :advertiseList="advertiseList"></delectAdverSpace>
    <changeStatus :show2.sync="show2" :info="info" :advertiseList="advertiseList"></changeStatus>
    <addAdverPosition :showPosition.sync='showPosition' :change='true' v-if="showPosition"></addAdverPosition>
    </section>
</template>

<script>

 import { getAdvertisePositionList } from '@/api/account'
 import delectAdverSpace  from './delectAdverSpace'
 import changeStatus  from './changeStatus'
 import addAdverPosition from '../../addAdverPosition'
     export default {
      name:'myAdvertisePosition',
      components:{
          delectAdverSpace,changeStatus,addAdverPosition
        },
    data() {
      return {
         method:'getAdvertisePositionList',
         tableData: [],
         Name:'',
         Id:'',
         loading:false,
         show:false,
         status:'',
         info:{},
         show:false,
         show2:false,
         showPosition:false
      };
    },
    methods: {
        changeSwitch(index, row){   
                row.status = row.status==1?0:1; 
                this.info = {...row}
                // console.log(this.info)
                 this.show2 = true         
            },
        handleEdit(index, row){
          console.log(row)
          this.showPosition = true
          this.$store.state.adverPositionInfo = row
        },
        handleDelete(index,row){
             this.info = {
                  id:row.id,
                  status: 2
                }
                this.show = true
        },
        advertiseList(){
            this.check()
        },
      getParams() {
              return {
                column : this.column ? this.column : null,
                page: this.PAGINATION.currentPage,
                limit: this.PAGINATION.pageSize,
                advertPositionName: this.Name ? this.Name : null,
                id: this.Id ? this.Id : null,
                status:this.status ? this.status :null
              }
            },
         async getAdvertisePositionList() {
                this.loading = true
                try{
                   let res = await getAdvertisePositionList(this.queryParams)
                   console.log(res)
                this.tableData = res.data.page.list
                this.PAGINATION.total = res.data.page.totalCount
                this.loading = false
                }catch(err){
                  console.log(err)
                   this.$message({
                    type: 'error',
                        message: '加载失败'
                    })
                    this.loading = false
                }
               
              },
    },
      created() {
          this.check()
        
        },
  }
</script> 

<style scoped>
     .grid-content {
         display: flex;
    padding: 10px 20px;
    min-height: 36px;
    background: #ffffff;
    font-size: 16px;
  }
</style>