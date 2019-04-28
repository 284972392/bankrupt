<template>
    <!-- ham -->
    <div class="advert_index">
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="4"><div class="grid-content">
                我的账户余额：<span>{{this.balance}}</span>元    
            </div></el-col>
            <el-col :span="8"><div class="grid-content">
                今日账户消耗: {{this.dayBalance}} 元
            </div></el-col>
            <el-col :span="4.5" :offset='6'><div class="grid-content">
                <el-button type="danger" @click="onPay">在线充值</el-button>    
                <el-button type="danger" @click="payRecord">充值记录</el-button>    
            </div></el-col>
        </el-row>

        <el-container>
            <el-header>广告统计<el-button type="danger" icon="el-icon-edit" style="height:40px;line-height:0px;" @click="addAdverPlan">新建广告计划</el-button></el-header>
            <el-main>
                <el-row :gutter="12">
                    <el-col :span="4">
                        <span @click="count('1')">
                            <el-card shadow="hover" :body-style="{ cursor:'pointer'}">
                            审核中：{{adverNum.toAudit}}
                            </el-card>
                        </span>     
                    </el-col>
                    <el-col :span="4">
                       <span @click="count('2')">
                            <el-card shadow="hover" :body-style="{ cursor:'pointer'}">
                            未通过：{{adverNum.notPass}}
                            </el-card>
                        </span>   
                    </el-col>
                    <el-col :span="4">
                      <span @click="count('4')">
                            <el-card shadow="hover" :body-style="{ cursor:'pointer'}">
                            暂停：{{adverNum.pause}}
                            </el-card>
                        </span>   
                    </el-col>
                     <el-col :span="4">
                      <span @click="count('6')">
                            <el-card shadow="hover" :body-style="{ cursor:'pointer'}">
                            非投放日期：{{adverNum.notPutIn}}
                            </el-card>
                        </span>   
                    </el-col>
                </el-row>
                <el-row :gutter="12">
                    <el-col :span="4">
                      <span @click="count('3')">
                            <el-card shadow="hover" :body-style="{ cursor:'pointer'}">
                            投放中：{{adverNum.putIn}}
                            </el-card>
                        </span>   
                    </el-col>
                    <el-col :span="4">
                        <span @click="count(null)">
                            <el-card shadow="hover" :body-style="{ cursor:'pointer'}">
                            总广告计划： {{adverNum.total}}
                            </el-card>
                        </span>   
                    </el-col>
                    <el-col :span="4">
                        <span @click="count('5')">
                            <el-card shadow="hover" :body-style="{ cursor:'pointer'}">
                            库存不足：{{adverNum.notEnough}}
                            </el-card>
                        </span>   
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

         <el-container>
            <el-header>数据统计
                <el-row>
                    <el-button type="danger" plain autofocus @click="selectDate3">最近7天</el-button>
                    <el-button type="danger" plain @click="selectDate4">最近30天</el-button>
                </el-row>
            </el-header>
            <el-main>
        
                          <el-table
    :data="tableData"
    style="width: 100%"
    v-loading="loading"
    :summary-method="getSummaries"
    show-summary
    >
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
     <el-table-column label="曝光量（次）" min-width="160" align="center"  prop="exposureTime">
      <template slot-scope="scope">
        <span>{{ scope.row.exposureTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="点击（次）" min-width="180" align="center"  prop="clickTime">
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
     <el-table-column label="单价（元）" min-width="180" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.price }}</span>
      </template>
    </el-table-column>
     <el-table-column label="总消耗（元）" min-width="180" align="center"  prop="totalConsume">
      <template slot-scope="scope">
        <span>{{ scope.row.totalConsume }}</span>
      </template>
    </el-table-column>
  
  </el-table>
 <el-pagination background class="pagination-container mt40" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-size="PAGINATION.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="PAGINATION.total">
    </el-pagination>
            </el-main>
        </el-container>
        <online-pay :show.sync='show' :form='form'></online-pay>
        <!-- <get-region :showRegionState="showRegionState" @changeState="showRegion" :cityList="cityList"></get-region> -->
    </div>
</template>

<script>
    import onlinePay from './onlinePay'
    import getRegion from '../../../components/region/region'
    import { getAdverDataList,advertStatistics,userInfo } from '@/api/account'
    export default {
        components:{
            onlinePay,getRegion
        },
        data(){
            return{
                form:{},
                show:false,
                method:'getAdverDatalist',
                dayBalance :'',
                dataSelect:'',
                tableData: [],
                adverNum:{},
                balance:'',
                consume:''
            }
        },
        methods:{
             getParams() {
              return {
                beginDate: this.dataSelect ? this.dataSelect[0] : null,
                endDate: this.dataSelect ? this.dataSelect[1] : null,
                column : this.column ? this.column : null,
                page: this.PAGINATION.currentPage,
                limit: this.PAGINATION.pageSize,
              }
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
            addAdverPlan(){
                 this.$router.push('/index/addAdvertisePlan')
            },
 
            payRecord(){
               this.$router.push('/financial/advertiserPayRecord')
            },
            onPay(){
                this.show = true
                this.form = {}
            },
            count(data){
                console.log(data)
                this.$router.push({path:'/advertise/adverlist',
                                            query: {
                                                status:data
                                            }
                                         })
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
             async userInfo() {
                let res = await userInfo()
                this.dayBalance = res.data.user.consume
                this.balance = res.data.user.balance                
                console.log(res)
              },
              async getAdverDatalist() {
                this.loading = true
                let res = await getAdverDataList(this.queryParams)
               
                this.tableData = res.data.page.list
                this.PAGINATION.total = res.data.page.totalCount
                this.loading = false
              },
              async advertStatistics(){
                  let res = await advertStatistics()
                  this.adverNum = res.data.data;
              }
        },
           created() {
               this.userInfo()
          this.check()
          this.advertStatistics()
        },
        
    }
</script>

<style scoped lang='less'>
.advert_index{padding: 20px;}
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
  }
  .row-bg {
     
    padding: 10px 15px;
    background-color: #f9fafc;
  }
  .el-header {
    border-bottom: 1px solid #B3C0D1;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px !important;
    line-height: 50px !important;
  }
  .el-main {
    color: #333;
    line-height: 10px;
  }
  .el-container {
    margin-bottom: 20px;
    background: #ffffff;
    padding: 10px 15px;
  }
  
</style>