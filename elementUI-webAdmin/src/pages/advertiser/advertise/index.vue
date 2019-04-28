
<template>
    <!-- ham -->
   <section class="pd20">
  <el-row>
        <el-col :span="24"><div class="grid-content grid-content2">
        <span class="ml10">
            广告计划名称：
            <el-input clearable size="mini" placeholder="请填写广告计划名称" class="w200" v-model="planName" @keyup.enter.native="check"></el-input>
            </span>
  
        <span class="ml10">
        状态：
        <el-select v-model="auditStatus" placeholder="请选择" size="mini" class="w200">
            <el-option v-for="item in auditStatusList" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        </span>
     
 
 
            <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check" style="margin-left:10px;">查询</el-button>
   
        </div></el-col>
      </el-row>

       <el-row>
        <el-col :span="24"><div class="grid-content">
            所有广告    
            <span style="margin:0 200px 0 20px;"><el-button type="danger" plain @click="addPlan">新增广告计划</el-button></span>

        </div></el-col>
      </el-row>
    
      <el-table :data="tableList" style="width: 100%" border fit highlight-current-row v-loading="loading" element-loading-text="正在查询中...">

   <el-table-column type="expand" label="查看" width="50">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="计费方式">
            <span>{{ props.row.chargeMode=='0'?'CPC':'CPA' }}</span>
          </el-form-item>
           <el-form-item label="id">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="投放平台">
            <span>{{ props.row.platform }}</span>
          </el-form-item>
          <el-form-item label="投放日期">
            <span>{{ props.row.putInDate?changeTime(props.row.putInDate[0])+'~'+changeTime(props.row.putInDate[1]):'' }}</span>
          </el-form-item>
          <el-form-item label="推广链接">
            <span>{{ props.row.promoteLink }}</span>
          </el-form-item>
          <el-form-item label="商品名称">
            <span>{{ props.row.commodityName }}</span>
          </el-form-item>
          <el-form-item label="商品说明">
            <span>{{ props.row.discountDescription }}</span>
          </el-form-item>
          <el-form-item label="商品详情图">
              &nbsp;&nbsp;&nbsp;<img :src="'http://'+props.row.detailPic" alt="" style="height:50px;width:50px;">
          </el-form-item>
          <el-form-item label="商品列表图">
            <img :src="'http://'+props.row.listPic" alt="" style="height:50px;width:50px;">
          </el-form-item>
          <el-form-item label="商品LOGO图">
            <img :src="'http://'+props.row.logoPic" alt="" style="height:50px;width:50px;">
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column type="index" label="序号" width="100" align="center" fixed>
        <template slot-scope="scope">
          {{getIndex(scope.$index)}}
        </template>
      </el-table-column>
    <el-table-column label="广告类型" min-width="120" align="center">
      <template slot-scope="scope">
        <span>互动广告</span>
      </template>
    </el-table-column>
     <el-table-column label="广告计划名称" min-width="150" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.advertName }}</span>
      </template>
    </el-table-column>
     <el-table-column label="曝光量" align="center" min-width='80'>
      <template slot-scope="scope">
        <span>{{ scope.row.exposureTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="点击量" align="center" min-width='80'>
      <template slot-scope="scope">
        <span>{{ scope.row.clickTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="已发放/库存（张）" align="center" min-width='140'>
      <template slot-scope="scope">
        <span>{{ scope.row.clickTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="消耗（元）" align="center" min-width='95'>
      <template slot-scope="scope">
        <span>{{ scope.row.totalConsume }}</span>
      </template>
    </el-table-column>
     <el-table-column label="出价（元/次）" align="center" min-width='115'>
      <template slot-scope="scope">
        <span>{{ scope.row.price }}</span>
      </template>
    </el-table-column>
     <el-table-column label="日预算（元/天）" align="center" min-width='130'>
      <template slot-scope="scope">
        <span>{{ scope.row.dailyBudget }}</span>
      </template>
    </el-table-column>
     <el-table-column label="状态" align="center" min-width='80'>
      <template slot-scope="scope">
        <span>{{ changeType(scope.row.status) }}</span>
      </template>
    </el-table-column>
 
    <el-table-column label="上/下架" align="center" min-width='140'>
      <template slot-scope="scope">
        <el-switch
            @change = "changeSwitch(scope.$index, scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text='投放'
            inactive-text='暂停'
            :disabled = "scope.row.status!=='3'&&scope.row.status!=='4'"
            :active-value="scope.row.status=='3'"
            :inactive-value="scope.row.status=='4'">
        </el-switch>
      </template>
    </el-table-column>
      <el-table-column label="操作" fixed="right" width="160">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
    <change-status :show.sync="show" :info="info" :advertiseList="advertiseList"></change-status>
    <delect-adver :show2.sync="show2" :info="info" :advertiseList="advertiseList"></delect-adver>

     <el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
    </el-pagination>

    </section>
</template>

<script>

const auditStatusList = [
  { value: null, label: '全部广告' },
  { value: '1', label: '审核中' },
  { value: '2', label: '审核拒绝' },
  { value: '3', label: '投放中' },
  { value: '4', label: '暂停' },
  { value: '5', label: '库存不足' },
  { value: '6', label: '非投放日期' }
]


  import changeStatus  from './changeStatus'
  import delectAdver  from './delectAdver'
  import { getAdverlist } from '@/api/account'
  
    export default {
        name:'adverdata',
        components:{
          changeStatus,delectAdver
        },
        data(){
            return{
                loading: false,
                method: 'getAdverlist',
                info:{},
                show:false,
                show2:false,
                listLoading: false,
                planName:'',
                advertiseType:'',
                auditStatus:null,
                auditStatusList:auditStatusList,
                adverStatus:'',
                dataSelect:'',
                tableList: []
            }
        },
        methods:{
          getParams() {
              return {
                advertName : this.planName ? this.planName : null,
                status:this.auditStatus,
                page: this.PAGINATION.currentPage,
                limit: this.PAGINATION.pageSize,
              }
            },
            changeSwitch(index, row){  
                row.status = row.status=='3'?'4':'3';            
                this.info = {...row}
                this.show = true         
            },
            addPlan(){
              this.$router.push('/index/addAdvertisePlan')
            },
            // 更改完状态刷新列表
            advertiseList(){
               this.check()
            },
            handleDelete(index, row){
                this.info = {
                  id:row.id,
                  status:'0'
                }
                this.show2 = true
            },
            handleEdit(index, row){
              this.$store.state.AdvertiseInfo = row
               this.$router.push({path:'/index/addAdvertisePlan',
                                            query: {
                                                action:'change'
                                            }
                                         })
            },
            changeType(param) { 
                switch(param){
                    case '1':
                      return '审核中'
                    case '2':
                      return '审核拒绝'
                    case '3':
                      return '投放中'
                    case '4':
                      return '暂停'
                    case '5':
                      return '库存不足'
                    case '6':
                      return '非投放日期'
                    default:
                      break
                }

            },
              getAdverlist() {
                this.loading = true

               getAdverlist(this.queryParams).then((res)=>{
                 console.log(res)
                 res.data.page.list.map((data)=>{
                  let a='';
                  if(data.platform){
                    JSON.parse(data.platform).map((res)=>{
                    if(res=='0'){
                      a += 'Android '
                    }else if(res=='1'){
                      a += 'IOS '
                    }
                    })
                    data.platform = a;
                  }
                  if(data.putInDate){
                    data.putInDate = JSON.parse(data.putInDate)
                   }                
                  })           
                  this.tableList = res.data.page.list
                  this.PAGINATION.total = res.data.page.totalCount
                  this.loading = false
               }).catch((err)=>{
                 this.PAGINATION.total = 0
                 this.loading = false
               })

                
              },
            
        },
        mounted() {
     
          this.$nextTick(()=>{
                if(!this.$route.query.status){
                  this.check()
                }else{
                  this.auditStatus = this.$route.query.status
                    this.check()
                }
                
          })
          
          

        }
    }
</script>

<style scoped>

   .grid-content {
    padding: 10px 20px;
    min-height: 36px;
    background: #fcfafa;
    font-size: 16px;
    color: rgb(241, 55, 55);
  }
  .grid-content2{
      border-bottom: 1px solid #eeeeee;
       background: #ffffff;
       color: rgb(46, 43, 43);
  }
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>