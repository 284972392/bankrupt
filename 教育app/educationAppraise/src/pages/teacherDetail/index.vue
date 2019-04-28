<style lang='scss' scoped>
.mu-raised-button{
    box-shadow: none;
    
}
</style>
<template>
    <div class="teacherDetail">
        <headBar :titleName='titleName' :isShow='true'></headBar>

      <div class="Ttop">
          <img :src="teacherDetail.imgSrc" alt="" class="left">
          <div>
               <p class="p1">{{teacherDetail.name}}</p>
                 <p class="p2">{{teacherDetail.info}}</p>
                  <div class="back">{{teacherDetail.back}}</div>
              <div class="rate">
                  <Rate v-model="teacherDetail.stars" :disabled='true' allow-half /> {{(teacherDetail.stars).toFixed(1)}} 分
              </div>
          </div>
      </div>

      <div class="bright">
          <p class="title">教学亮点</p>
           <div class="quan">
                <div style="margin-right:1rem;">幽默</div>
                <div>换位思考</div>
            </div>
            <p class="title">个人简介</p>
            <div class="introduce">
                {{teacherDetail.jianjie}}
            </div>
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
            <mu-button color="#fff" @click="isClick=!isClick" style="border-right: .0625rem solid #EEEEEE;">
            <mu-icon left value="favorite" :color="isClick?'red':'#ACACAC'"></mu-icon>
            <span style="color:#ACACAC">收藏</span> 
         </mu-button>
         <mu-button color="#fff" @click="open=true">
            <mu-icon left value="share" color='#ACACAC'></mu-icon>
            <span style="color:#ACACAC">分享</span> 
         </mu-button>

         <mu-button color="#4BC1DD" class="dp" @click="goCommon(teacherDetail.id)" style="height:100%;">
            <mu-icon left value="share" color='#fff'></mu-icon>
            <span style="color:#fff">我要点评</span> 
         </mu-button>
        </div>
        
    <share-sheet :open='open' @close='close'></share-sheet>

    </div>
</template>

<script>
import headBar from '@/components/head'
import shareSheet from '../organDetail/shareSheet'

import { Rate,Icon } from 'iview';
    export default {
        components:{
			  headBar,Rate,Icon,shareSheet
		  },
        data(){
            return{
                open:false,
                isClick:false,
                titleName:'老师详情',
                teacherDetail:{},
                  remark:[
                    {   
                        id:1,
                        img:'static/head.png',
                        name:'篱笆外的小思绪',
                        time:'2018-12-29 12:30:41',
                        stars:5,
                        detail:'这个老师可是我精挑细选出来的，人不仅温柔，对孩子很关爱，教学质量也是有保证，孩子水平有了很大的提升，我也很放心!'
                    },
                    {
                        id:2,
                        img:'https://t4.ftcdn.net/jpg/01/21/92/15/240_F_121921557_w4A4aegCoL8n1Ea8pu2TMxR9wMWowknj.jpg',
                        name:'伟大的隐藏着',
                        time:'2018-12-29 12:30:41',
                        stars:4,
                        detail:'我家小孩就是在这里学的,教学质量挺不错的，老师很随和孩子们都很喜欢。孩子能喜欢上学习也要感谢老师的帮助！'
                    }
                    ]
            }
        },
        methods:{
            close(){
                this.open = false;
            },
            goCommon(id){
               this.$router.push({
                path: '/comment',
                    query: {
                        type:3,
                        id: id
                    }
                })
            }
        },
        beforeMount(){
            this.teacherInfo.map((data)=>{
                if(data.id == this.$route.query.id){
                    this.teacherDetail = data
                }
            })
        }
    }
</script>

<style scoped lang='scss'>
.btmBtn{
    z-index: 999;
          position: fixed;bottom: 0;
          height: 3.375rem;width: 100%;
          background: #ffffff;
          display: flex;
          align-items: center;
          button{height: 95%;margin-right: .125rem;}
          .dp{width: 11.7rem;}
          
      }
    .teacherDetail{
        padding-top: 2.75rem;
        padding-bottom: 2.75rem;
        .Ttop{
            background: #FFFFFF;
            height: 8.5625rem;
            width: 100%;
            padding: 1rem;
            display: flex;
            img{height: 6.5625rem;width: 6.5625rem;margin-right: .75rem;}
            text-align: left;
             .p1{
             font-size: .9375rem;color: #333333;font-weight: bold;line-height: 1.5rem;
         }
         .p2{
             font-size: .875rem;color: #666666;margin-top: .375rem;margin-bottom: .5375rem;
         }
         .back{
             font-size: .75rem;color: #666666;margin-top: .375rem;margin-bottom: .35rem;
         }
         .rate{
             height: 2.375rem;line-height: 2.35rem;font-size: .875rem;color: #FF8859;font-weight: bold;
         }
         
        }
        .bright{
            padding: .875rem .375rem 1rem 1rem;
            width: 100%;background: #ffffff;
            margin-top: .5rem;margin-bottom: .5rem;
             .title{
                font-size: .9375rem;color: #333333;font-weight: bold;text-align: left;    
            }
            .quan{margin-top: .625rem;margin-bottom: 1.125rem;display: flex;
                    div{background: #EEEEEE;border-radius: .75rem;height: 1.5rem;line-height: 1.5rem;
                        font-size: .75rem;color: #666666;width: 4.3rem;font-weight: bold;
                        }
                }
            .introduce{
                width: 100%;font-size: .8125rem;color: #333333;
                margin-top: .5625rem;text-align: left;line-height: 1.2rem;
                
            }
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