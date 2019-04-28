<template>
 <el-container>
  <el-header>欢迎XXX科技网络有限公司</el-header>
   <el-main>
       <el-button type="primary" @click="show=true">新建媒体</el-button>
       <el-button type="primary">查看媒体数据</el-button>
   </el-main>
   <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>媒体收益</span>
    </div>
    <div class="cardContent">
        <div>昨日预计收益</div><div>近7日收益</div><div>本月收益</div><div>累计收益</div>
        <div class="yield">-元</div>
        <div class="yield">0.52元</div>
        <div class="yield">0.15元</div>
        <div class="yield">2232.24元</div>
    </div>
    </el-card>

    <select-platform :show='show' @close='show=false'></select-platform>
</el-container>

</template>

<script>
    import selectPlatform from '@/components/selectPlatform'
    export default {
        data(){
            return{
                show:false
            }
        },
        components:{
            selectPlatform
        },
        methods:{

        }
    }
</script>

<style scoped>

 .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    font-size: 25px;
    padding: 20px 50px 0 100px;
    font-weight: bold;
  }
    .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: right;
    padding-right: 250px;
  }
  .box-card {
    margin:50px;
  }
  .cardContent{
      display: flex;
      flex-wrap:wrap;
  }
  .cardContent div{
      width: 25%;
      line-height: 40px;
  }
  .yield{
      font-weight: bold;
      font-size: 18px;
  }
</style>