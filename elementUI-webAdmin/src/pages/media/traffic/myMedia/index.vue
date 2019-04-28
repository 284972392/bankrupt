<template>
 <!-- ham -->
    <section class="pd20">
      <el-row>
        <el-col :span="24"><div class="grid-content">
            <span class="ml10">
                <el-input v-model="mediaName" placeholder="请输入名称" size="mini" @keyup.enter.native="check"></el-input>
           </span>
             <span class="ml10">
              <el-input v-model="id" placeholder="请输入ID" size="mini" @keyup.enter.native='check'></el-input>
            </span>
            <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check" style="margin-left:10px;">查询</el-button>
            <el-button type="danger" size="mini" class="w100" style="margin-left:10px;" @click="show=true">新建媒体</el-button>
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
       <el-table-column label="媒体名称" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
       <el-table-column label="创建时间" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ changeTime(scope.row.createTime) }}</span>
      </template>
    </el-table-column>
       <el-table-column label="平台" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ changePlatform(scope.row.platform) }}</span>
      </template>
    </el-table-column>
       <el-table-column label="appKey" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.appKey }}</span>
      </template>
    </el-table-column>
       <el-table-column label="appSecret" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.appSecret }}</span>
      </template>
    </el-table-column>
       <el-table-column label="状态" min-width="140" align="center">
      <template slot-scope="scope">
        <span>{{ changeType(scope.row.status) }}</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作" fixed="right" width="200" align='center'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          v-if="scope.row.status=='2'"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="primary"
          v-if="scope.row.status=='2'"
          @click="handleCreate(scope.$index, scope.row)">新建广告位</el-button>
      </template>
    </el-table-column>

  </el-table>
   <el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
    </el-pagination>
 <select-platform :show='show' @close='show=false'></select-platform>
 <addAdverPosition :showPosition.sync='showPosition' :mediaId='mediaId' :sendMediaName='sendMediaName' v-if="showPosition"></addAdverPosition>

    </section>
</template>

<script>
import selectPlatform from '@/components/selectPlatform'
import addAdverPosition from '../../addAdverPosition'
 import { getMediaList } from '@/api/account'
     export default {
      name:'myMedia',
    data() {
      return {
         method:'getMediaList',
         tableData: [],
         mediaName:'',
         mediaId:'',
         sendMediaName:'',
         id:'',
         loading:false,
         show:false,
         showPosition:false
      };
    },
     components:{
            selectPlatform,addAdverPosition
        },
    methods: {
      getParams() {
              return {
                column : this.column ? this.column : null,
                page: this.PAGINATION.currentPage,
                limit: this.PAGINATION.pageSize,
                mediaName: this.mediaName ? this.mediaName : null,
                id: this.id ? this.id : null
              }
            },
         changeType(param) { 
                switch(param){
                    case '0':
                      return '审核中'
                    case '1':
                      return '审核拒绝'
                    case '2':
                      return '审核通过'
                    default:
                      break
                }
            },
          changePlatform(param){
            switch(param){
                    case '0':
                      return 'Android'
                    case '1':
                      return 'IOS'
                    case '2':
                      return 'H5'
                    case '3':
                      return '公众号'
                    case '4':
                      return '小程序'
                    default:
                      break
                }
          },
        handleEdit(index,row){
          this.$store.state.MediaInfo = row
          this.$store.state.selectPlatform = row.platform
           this.$router.push({path:'/media/addNewMedia',
                                            query: {
                                                action:'change'
                                            }
                                         })
        },
        handleCreate(index,row){
          this.mediaId = row.id
          this.sendMediaName = row.name
          this.showPosition = true
        },
         async getMediaList() {
                this.loading = true
                try{
                   let res = await getMediaList(this.queryParams)
                this.tableData = res.data.page.list
                this.PAGINATION.total = res.data.page.totalCount
                this.loading = false
                }catch(err){
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