<style scoped>
.ivu-rate {
    font-size: 1.5625rem !important;
}
.ivu-rate-star-chart {
    margin-right: .25rem !important;
}
.ivu-rate-star {
   margin-right: .25rem !important;
}

           .mu-input{
      border: .0625rem solid #EAEAEA;
    border-radius: .1875rem;
    padding: .5rem 1rem .5rem 1rem;
}
            .container {
    padding: 0;margin-top: 1.875rem;
}
</style>
<template>
    <div class="comment">
         <headBar :titleName='titleName' :isShow='true'></headBar>
         <div class="cTop">
            <img :src="detailInfo.imgSrc" alt="">
            <div>
                <p class="p1">{{type==3?detailInfo.name:detailInfo.title}}</p>
                <p class="p2" v-if="type!==1">
                    {{type==2?"人均￥"+detailInfo.averge:detailInfo.info}}
                </p>
                <p class="p3" v-if="type==1">
                    免费试听 <span>原价￥{{detailInfo.price}}</span>
                </p>
            </div>
         </div>

         <div class="comBox">
             <p class="pf">
                 {{type==1?'课程评分':type==2?'机构评分':'老师评分'}}
             </p>
             <div class="rate">
                 <Rate v-model="stars" /> {{(stars).toFixed(1)}} 分
             </div>
             <p class="pf">
                发表评论
             </p>
               <mu-text-field multi-line :rows="4" full-width v-model="value" :solo='true'></mu-text-field><br/>
               <mu-container class="button-wrapper">
            
                <mu-flex justify-content="center" align-items="center">
                    <mu-button full-width color="#4BC1DD" :disabled='value?false:true'>发 表</mu-button>
                </mu-flex>
                </mu-container>
         </div>
    </div>
</template>

<script>
import headBar from '@/components/head'
import { Rate } from 'iview';
    export default {
         components:{
			  headBar,Rate
          },
          data(){
              return{
                //   1课程 2机构 3老师
                  type:1,
                  titleName:'',
                  detailInfo:{},
                  stars:5,
                  value:null
              }
          },
          beforeMount(){
              this.type = this.$route.query.type;
              if(this.$route.query.type == 1){
                  this.titleName = '点评课程'
                  this.classData.map((data)=>{
                      if(data.id==this.$route.query.id){
                          this.detailInfo = data
                      }
                  })
              }else if(this.$route.query.type == 2){
                  this.titleName = '点评机构'
                  this.goodsData.map((data)=>{
                      if(data.id==this.$route.query.id){
                          this.detailInfo = data
                      }
                  })
              }else{
                  this.titleName = '点评老师'
                  this.teacherInfo.map((data)=>{
                      if(data.id==this.$route.query.id){
                          this.detailInfo = data
                      }
                  })
              } 
          }
    }
</script>

<style scoped lang='scss'>

    .comment{
        height: 100%;
        background: #ffffff;
        padding-top: 2.75rem;
        .button-wrapper {
  text-align: center;
  .mu-button{
    margin: .5rem;
    vertical-align: middle;
  }
 
  a.mu-button {
    text-decoration: none;
  }
}
        .comBox{
            padding: 1rem;text-align: left;
            .pf{
                font-size: .875rem;color: #333333;font-weight: bold;margin-bottom: .75rem;
            }
            .rate{
             height: 2.375rem;line-height: 2.35rem;font-size: .875rem;color: #FF8859;font-weight: bold;
             margin-bottom: 1.55rem;
           }
           
        }
        .cTop{
            text-align: left;
           
            border-bottom: .0625rem solid #EEEEEE;
            height: 5.71875rem;
            width: 100%;background: #ffffff;
            padding: 1rem;
            display: flex;
            img{height: 3.75rem;width: 3.75rem;margin-right: .6875rem;border-radius: .3125rem;}
            .p1{
                color: #333333;font-size: 1rem;line-height: 1.3125rem;font-weight: bold;
                margin-bottom: .5rem;margin-top: .5rem;
                }
                .p2{
                    font-size: .8125rem;color: #333333;font-weight: bold;
                }
                .p3{
                    font-size: .9375rem;color: #333333;font-weight: bold;
                    span{font-size: .75rem;color: #ABABAB;font-weight: normal;margin-left: .375rem;}
                }
        }
    }
    
</style>