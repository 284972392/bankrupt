<style scoped>
.ivu-rate {
    font-size: .875rem !important;
}
.ivu-rate-star-chart {
    margin-right: .1875rem !important;
}
.ivu-rate-star {
   margin-right: .1875rem !important;
}
</style>

<template>
    <div class="classDetail">
        <headBar titleName='课程详情' :isShow='true'></headBar>
        <img :src="detailInfo.banner" alt="" class="banner">
        <div class="classInfo">
            <p class="title">{{detailInfo.title}}</p>
            <div class="arr2">
                <div class="left"><span>免费试听</span><p>原价：￥{{detailInfo.price}}</p></div>
                <p class="right">成交{{detailInfo.hot}}单</p>
            </div>
            <div class="star">
                <Rate v-model="detailInfo.stars" :disabled='true' allow-half/>  {{(detailInfo.stars).toFixed(1)}} 分
            </div>
            <div class="quan">
                <img src="../../assets/images/quan1.png" alt="" class="quan1">
                <img src="../../assets/images/quan2.png" alt="" class="quan2">
                <mu-button color="#4BC1DD" @click="open=true">领券</mu-button>
            </div>
        </div>

        <div class="classSpot">
            <p class="title">课程亮点</p>
            <div class="quan">
                <div style="margin-right:1rem;">在线教学</div>
                <div>名师辅导</div>
            </div>
            <p class="title">课程介绍</p>
            <div class="introduce">
                {{detailInfo.introduce}}
            </div>
            <p class="title">机构：{{organInfo.title}}</p>
            <div class="star" style="margin-top:0.5rem;">
                <Rate v-model="organInfo.stars" :disabled='true' allow-half/>  {{(organInfo.stars).toFixed(1)}} 分
            </div>
            <div class="add" style="margin-top:0.7rem;"><Icon type="ios-pin-outline" />{{organInfo.address}}</div>
            <div class="add"><Icon type="ios-call" />{{organInfo.phone}}</div>
            <div class="add"><Icon type="md-list" />{{organInfo.info}}</div> 
        </div>

        <div class="notice">
            <p class="p1">购买须知</p>
            <p class="p2">有效期：2018-06-05至2018-12-31</p>
            <p class="p2">每张订单最多1人使用</p>
            <p class="p2">规则提醒：小班授课（10）</p>
            <p class="p2">如需发票，请您在消费时向商户咨询。</p>
        </div>
        <div class="remark">
            <div class="head">网友点评(2)</div>
            <div class="remarkContent" v-for="data in remark" :key="data.id">
                <div class="top">
                    <img :src="data.img" alt="">
                    <div>
                        <p>{{data.name}}</p>
                        <span>{{data.time}}</span>
                    </div>
                </div>
                <div class="mid">
                    打分 <Rate v-model="data.stars" :disabled='true' allow-half/> 
                </div>
                <div class="btm">
                    {{data.detail}}
                </div>
            </div>
        </div>

        <div class="btmBtn">
            <mu-button color="#6297E9" @click="goCommon(detailInfo.id)">
                <mu-icon value="mode_comment" left></mu-icon>我要点评
            </mu-button>
            <mu-button color="#4BC1DD">
                <mu-icon value="headset" left></mu-icon>免费试听
            </mu-button>
        </div>

        <btmShow :open='open' @close='close'></btmShow>
    </div>
</template>

<script>
import headBar from '@/components/head'
import btmShow from './bottomSheet'
import { Rate,Icon } from 'iview';
    export default {
        components:{
			  headBar,Rate,Icon,btmShow
		  },
        data(){
            return{
                open:false,
                detailInfo:{},
                organInfo:{},
                remark:[
                    {   
                        id:1,
                        img:'static/head.png',
                        name:'篱笆外的小思绪',
                        time:'2018-12-29 12:30:41',
                        stars:5,
                        detail:'当时想给孩子学习什么课程，找了半天发现这个课程很适合我家孩子，而且老师特别用心，孩子学的很开心，我也很放心，强烈推荐！'
                    },
                    {
                        id:2,
                        img:'https://t4.ftcdn.net/jpg/01/21/92/15/240_F_121921557_w4A4aegCoL8n1Ea8pu2TMxR9wMWowknj.jpg',
                        name:'伟大的隐藏着',
                        time:'2018-12-29 12:30:41',
                        stars:4,
                        detail:'我家小孩就是在这里学的。教学质量挺不错的，老师的水平也很高。'
                    }
                    ]
            }
        },
        beforeMount(){
             this.classData.map((data)=>{
                 if(data.id == this.$route.query.id){
                     this.detailInfo = data
                     this.goodsData.map((item)=>{
                         if(item.id == data.organId){
                             this.organInfo = item
                             console.log(this.organInfo)
                         }
                     })
                 }
             })
             
        },
        methods:{
            close(){
                this.open = false;
            },
            goCommon(id){
               this.$router.push({
                path: '/comment',
                    query: {
                        type:1,
                        id: id
                    }
                })
            }
        },
        mounted(){
            // console.log(this.detailInfo)
        }
    }
</script>

<style scoped lang='scss'>
    .classDetail{
        height: 100%;
        overflow: scroll;
        padding-top: 2.75rem;
        padding-bottom: 3.375rem;
      .btmBtn{
          box-shadow: 1px 13px 7px 10px #000;
          position: fixed;bottom: 0;
          height: 3.375rem;width: 100%;
          background: #ffffff;
          display: flex;justify-content: space-around;
          align-items: center;
      }
        .banner{
            height: 11rem;
            width: 100%;
        }
        .star{font-size: .875rem;color: #FF8859;font-weight: bold;text-align: left;}
        .classInfo{
            width: 100%;
            height: 8.875rem;
            background: #ffffff;
            padding: .75rem 1rem 0 1rem;
            text-align: left;
            .title{
                font-size: 1.0625rem;
                color: #333333;font-weight: bold;
                margin-bottom: .6375rem;
            }
            .arr2{
                width: 100%;display: flex;justify-content: space-between;
                font-weight: bold;margin-bottom: .5625rem;
                .left{
                    display: flex;
                    span{font-size: 1rem;color: #4BC1DD;}
                    p{font-size: .75rem;color: #666666;margin-left: .4375rem;}
                }
                .right{font-size: .75rem;color: #ABABAB;}
            }
         
            .quan{
                width: 100%;margin-top: .6875rem;
                .quan1{height: 1.5625rem;width: 3rem;}
                .quan2{height: 1.5625rem;width: 3.4375rem;margin-left: .5rem;}
                button{height: 1.6875rem;width: 3.375rem;float: right;}
            }
        }
        .classSpot{
            background: #ffffff;
            width: 100%;padding: .875rem .3125rem .875rem 1rem;margin-top: .5rem;
            .title{
                font-size: .9375rem;color: #333333;font-weight: bold;text-align: left;
                
            }
            .quan{margin-top: .625rem;margin-bottom: 1.125rem;display: flex;
                    div{background: #EEEEEE;border-radius: .75rem;height: 1.5rem;line-height: 1.5rem;
                        font-size: .75rem;color: #666666;width: 4.3rem;font-weight: bold;
                        }
                }
            .introduce{
                height: 3.5625rem;width: 100%;font-size: .8125rem;color: #333333;
                margin-top: .5625rem;text-align: left;line-height: 1.2rem;margin-bottom: 1.125rem;
                display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;
            }
            .add{
                font-size: .8125rem;color: #333333;line-height: 1.5rem;text-align: left;
                i{margin-right: .4375rem;}
            }
        }
        .notice{
            width: 100%;height: 8.375rem;background: #ffffff;
            padding: .875rem 0 .875rem 1rem;
            margin-top: .5rem;
            text-align: left;margin-bottom: .5rem;
            .p1{
                font-size: .9375rem;color: #333333;font-weight: bold;margin-bottom: .5625rem;
            }
            .p2{font-size: .7375rem;color: #333333;line-height: 1.3rem;}
        }
        .remark{
            width: 100%;background: #ffffff;
            .head{
                height: 2.375rem;line-height: 2.375rem;
                border-bottom: .0625rem solid #EEEEEE;font-size: .9rem;
                color: #666666;padding-left: 1rem;text-align: left;
                font-weight: bold;
            }
            .remarkContent{
                width: 100%;background: #ffffff;
                border-bottom: .0625rem solid #EEEEEE;
                padding: .9375rem 1rem 1rem 1rem;
                text-align: left;
                .top{
                    height: 2.1875rem;display: flex;
                    img{height: 2.1875rem;width: 2.1875rem;margin-right: .5625rem;border-radius: 100%;}
                    p{font-size: .8125rem;color: #333333;font-weight: bold;margin-bottom: 0.3rem;}
                    span{font-size: .6875rem;color: #ABABAB;}
                }
                .mid{
                    font-size: .75rem;color: #666666;
                    margin-top: .5rem;margin-bottom: .5625rem;
                }
                .btm{
                    font-size: .875rem;color: #333333;line-height: 1.2625rem;
                }
            }
        }
    }
</style>