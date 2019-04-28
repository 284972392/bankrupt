<style lang='scss' scoped>
.mu-raised-button{
    box-shadow: none;
    
}
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
    .organDetail{
        padding-top: 2.75rem;
        .headContent{
            width: 100%;height: 13.9375rem;background: #ffffff;margin-bottom: .5rem;
            .top{
                position: relative;
                height: 7.5rem;width: 100%;padding: 1rem;
                border-bottom: .0625rem solid #EEEEEE;display: flex;
                img{height: 5.5rem;width: 5.5rem;margin-right: .75rem;}
                .center{
                    text-align: left;
                    div{height: 2.375rem;line-height: 2.35rem;font-size: .875rem;color: #FF8859;font-weight: bold;}
                    p{font-size: 1.0625rem;color: #333333;font-weight: bold;line-height: 1.5rem;}
                    span{font-size: 1.0625rem;color: #666666;line-height: 1.5rem;}
                }
                .right{
                    position: absolute;
                    right: 1rem;
                    text-align: right;
                    div{
                        margin-top: 2rem;
                        margin-bottom: .6rem;
                    }
                    span{
                        font-size: .6875rem;color: #ABABAB;
                        margin-right: 0.5rem;
                    }
                }
            }
            .btm{
                padding-left: 1rem;
               
                .add{
                font-size: .8125rem;color: #333333;line-height: 1.5rem;text-align: left;
                i{margin-right: .4375rem;}
             }
            }
        }
    }
    
</style>
<template>
    <div class="organDetail">
        <headBar :titleName='titleName' :isShow='true'></headBar>
        <div class="headContent">
            <div class="top">
                <img :src="ognDetail.imgSrc" alt="">
                <div class="center">
                    <p>{{ognDetail.title}}</p>
                    <div><Rate v-model="ognDetail.stars" :disabled='true' allow-half/> {{(ognDetail.stars).toFixed(1)}} 分</div>
                    <span>人均： {{ognDetail.averge}}</span>
                </div>
                <div class="right">
                    <div>
                        <mu-button color="#666666" small flat>查看评价</mu-button>
                    </div>
                     
                    <span>热度{{ognDetail.hot}}</span>
                </div>
            </div>
            <div class="btm">
                   <div class="add" style="margin-top:0.7rem;"><Icon type="ios-pin-outline" />{{ognDetail.address}}</div>
                    <div class="add"><Icon type="ios-call" />{{ognDetail.phone}}</div>
                    <div class="add"><Icon type="md-list" />{{ognDetail.info}}</div> 
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

         <mu-button color="#4BC1DD" class="dp" @click="goCommon(ognDetail.id)" style="height:100%;">
            <mu-icon left value="share" color='#fff'></mu-icon>
            <span style="color:#fff">我要点评</span> 
         </mu-button>
        </div>
        
        <tab-list></tab-list>
        <share-sheet :open='open' @close='close'></share-sheet>
    </div>
</template>

<script>
import headBar from '@/components/head'
import tabList from './tabList'
import shareSheet from './shareSheet'
import { Rate,Icon } from 'iview';
    export default {
        components:{
			  headBar,Rate,Icon,tabList,shareSheet
		  },
        data(){
            return{
                open:false,
                isClick:false,
                titleName:'机构详情',
                ognDetail:{

                }
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
                        type:2,
                        id: id
                    }
                })
            }
        },
        beforeMount(){
            this.goodsData.map((data)=>{
                if(data.id == this.$route.query.id){
                    this.ognDetail = data
                }
            })
        }
    }
</script>

