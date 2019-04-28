<template>
    <div class="home">
        <div class="home_top">
            <div class="box1">
                <div class="content_box">
                    <div class="left" style="line-height:30px;">
                        商户余额<p></p>
                        <=2000元
                    </div>
                        <div class="right" style="padding-top:24px;">
                          <p>用户8</p>
                        </div>
                </div>
                <div class="content_box">
                    <div class="left">商户任务减少</div>
                    <div class="right">
                        <p>用户8</p>
                        <p>金额20</p>
                    </div>
                </div>
                <div class="content_box">
                    <div class="left">低迷用户</div>
                    <div class="right" style="padding-top:24px;">
                        <p>数量8</p>
                    </div>
                </div>
                <div class="content_box">
                    <div class="left">疑似违规用户</div>
                    <div class="right">
                        <p>人数5</p>
                        <p>金额1000</p>
                    </div>
                </div>
            </div>
            <div class="box1 box2">
                 <div class="content_box">
                    <div class="left">待提现</div>
                    <div class="right">
                        <p>数量1000</p>
                        <p>金额100000</p>
                    </div>
                </div>
                <div class="content_box">
                    <div class="left">待审核</div>
                    <div class="right">
                        <p>数量1000</p>
                        <p>金额100000</p>
                    </div>
                </div>
                <div class="content_box">
                    <div class="left">待处理问题</div>
                    <div class="right" style="padding-top:24px;">
                        <p>数量999</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="chart1">
           <ve-pie :data="chartData" :settings="chartSettings" height='100%'></ve-pie>
        </div>

        <div class="chart1">
             <ve-line :data="chartData2" :settings="chartSettings2" height='100%'></ve-line>
        </div>
        
        <div class="all_amount">
            <div class="amount"><ve-histogram :data="chartData3" :settings="chartSettings3" height='100%'></ve-histogram></div>
            <div class="amount"><ve-heatmap :data="chartData4" :settings="chartSettings4" height='100%'></ve-heatmap></div>
        </div>
        
        <div class="data_info">
            <div class="moredata">更多详尽数据请参考</div>
            <div class="data_manage">数据管理</div>
        </div>
     
    <foot></foot>
        

    </div>
</template>

<script>
    import foot from '@/components/footer.vue'
    export default {
        name:'home',
        components:{
            foot
        },
         data(){
         return{
             
         }
         },    
        methods:{

        },
        mounted() {
        //   console.log(this.$store.getters)
        },
        created: function () {
            this.chartData = {
                    columns: ['日期', '成本', '利润'],
                    rows: [
                    { '日期': '1月1号', '成本': 123, '利润': 3 },
                        { '日期': '1月2号', '成本': 1223, '利润': 6 },
                        { '日期': '1月3号', '成本': 2123, '利润': 90 },
                        { '日期': '1月4号', '成本': 4123, '利润': 12 },
                        { '日期': '1月5号', '成本': 3123, '利润': 15 },
                        { '日期': '1月6号', '成本': 7123, '利润': 20 }
                        ]
                    }
                    this.chartSettings = {
                        limitShowNum: 5,
                        legendName: {
                        '其他': '别的时间的时候biu~'
                        },
                        offsetY: 150
                    }
            this.chartData2 = {
                columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
                rows: [
                    { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                    { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
                    { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
                    { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
                    { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                    { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
                ]
                }
                this.chartSettings2 = {}
                  this.chartData3 = {
                        columns: ['日期', '成本', '利润', '占比', '其他'],
                        rows: [
                        { '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
                        { '日期': '1月2日', '成本': 1223, '利润': 1921, '占比': 0.345, '其他': 100 },
                        { '日期': '1月3日', '成本': 2123, '利润': 5523, '占比': 0.7, '其他': 100 },
                        { '日期': '1月4日', '成本': 4123, '利润': 6523, '占比': 0.31, '其他': 100 }
                        ]
                    }
                    this.chartSettings3 = {
                        metrics: ['成本', '利润'],
                        stack: { '单价': ['成本', '利润'] }
                    }

                this.chartData4 = {
                            columns: ['lat', 'lng', '人数'],
                            rows: [
                            { 'lat': 115.892151, 'lng': 28.676493, '人数': 1000 },
                            { 'lat': 117.000923, 'lng': 36.675807, '人数': 400 },
                            { 'lat': 113.665412, 'lng': 34.757975, '人数': 800 },
                            { 'lat': 114.298572, 'lng': 30.584355, '人数': 200 },
                            { 'lat': 112.982279, 'lng': 28.19409, '人数': 100 },
                            { 'lat': 113.280637, 'lng': 23.125178, '人数': 300 },
                            { 'lat': 110.33119, 'lng': 20.031971, '人数': 800 },
                            { 'lat': 104.065735, 'lng': 30.659462, '人数': 700 },
                            { 'lat': 108.948024, 'lng': 34.263161, '人数': 300 },
                            { 'lat': 103.823557, 'lng': 36.058039, '人数': 500 }
                            ]
                        }
                        this.chartSettings4 = {
                            position: 'china',
                            type: 'map',
                            geo: {
                            label: {
                                emphasis: {
                                show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                                },
                                emphasis: {
                                areaColor: '#2a333d'
                                }
                            }
                            }
                        }








        }
    }
</script>

<style scoped lang="scss">
    .home{
        height: 100%;width: 100%;
        background: #f2f2f2;
        overflow: hidden;
        overflow-y: scroll;
  
        .home_top{
            height: 260px;width: 100%;
            .box1{
                height: 70px;width: 100%;padding: 0 20px;
                margin-top: 15px;display: flex;
                justify-content: space-between;
                margin-bottom: 50px;
                .content_box{
                    height: 68px;width:280px;
                    box-shadow: 3px 3px 3px #838084; 
                    display: flex;
                    .left{width: 42%;background: #ff0000;
                         height: 68px;line-height: 68px;
                         color: #ffffff;font-size: 10px;
                         }
                    .right{width: 58%;height: 68px;
                           padding-top: 10px;font-size: 15px;
                           line-height: 24px;color: #525252;
                           font-weight: bolder;text-align: center;
                            
                            }
                }
            }
            .box2{
                padding: 0 220px;
                .content_box{
                     .left{background: #f2f2f2 !important;color: #525252;}
                     .right{background: #ffffff;}
                }
            }
        }
        .chart1{
            height: 273px;width: 98%;
            margin: 0 20px 20px 20px;
            background: #ffffff;
            line-height: 273px;font-size: 30px;
        }
        .all_amount{
            height: 372px;width: 98%;
            margin: 0 20px 20px 20px;
            display: flex;justify-content: space-between;
            .amount{
                width: 800px;height: 100%;
                background: #ffffff;
                line-height: 372px;
                font-size: 30px;
            }
        }
        .data_info{
            height: 184px;width: 98%;
            margin: 0 20px 20px 20px;
            background: #ffffff;
            display: flex;
            font-size: 30px;
            .moredata{
                height: 100%;
                line-height: 184px;
                width: 22%;
                background: #ffffff;
            }
            .data_manage{
                height: 100%;
                line-height: 184px;
                width: 78%;
                background: #cccccc;
            }
        }
  
        
    }
</style>