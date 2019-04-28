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
 <mu-container>
  <mu-tabs :value.sync="active1" inverse color="#4BC1DD" indicator-color="#4BC1DD"  center>
    <mu-tab>课程</mu-tab>
    <mu-tab>老师</mu-tab>
  </mu-tabs>
  <div class="demotext2" v-if="active1 === 0">
      <div class="top">
          <span>
              课程筛选
             <mu-select full-width :solo='true'>
                <mu-option v-for="city,index in citys2" :key="city" :label="city" :value="city"></mu-option>
            </mu-select>
          </span>
            
            <span>
                智能排序
             <mu-select full-width :solo='true'>
                <mu-option v-for="city,index in citys3" :key="city" :label="city" :value="city"></mu-option>
            </mu-select>
            </span>  
      </div>
      <div class="boxContent">
        <div class="content" v-for="data in classData" :key="data.id" @click="goClassDetail(data.id)">
          <img :src="data.imgSrc" alt="" class="left">
          <div class="center">
              <span class="title">{{data.title}}</span>
              <div class="star">
                    <Rate v-model="data.stars" :disabled='true' icon="md-flower" allow-half /> 
              </div>
              <span class="average" style="font-size:0.8rem">免费试听 原价￥{{data.price}}</span>
              <span class="add">{{data.address}}</span>
          </div>
          <div class="right">
           <div class="hot">热度{{data.hot}}</div>
            <div class="distance">距你{{data.distance}}</div>
          </div>
      </div>
      </div>
      
  </div>
  <div class="demotext2" v-if="active1 === 1">
      <div class="top">
          <span>
              课程筛选
          <mu-select full-width :solo='true'>
                <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
            </mu-select>
          </span> 
            <span>
                智能排序
             <mu-select full-width :solo='true'>
                <mu-option v-for="city,index in citys3" :key="city" :label="city" :value="city"></mu-option>
            </mu-select>
            </span>  
      </div>
      <div class="boxContent">
            <div class="content" v-for="data in teacherInfo" :key="data.id" @click="goTeacherDetail(data.id)">
          <img :src="data.imgSrc" alt="" class="left">
       
          <div>
              <div>
                  <span class="span1">{{data.name}}</span>
                  <span class="span2">{{data.info}}</span>
              </div>
              <div class="back">{{data.back}}</div>
              <div class="introduce">{{data.introduce}}</div>
          </div>
          </div>
      </div>
      
  </div>

</mu-container>
</template>

<script>
import { Rate } from 'iview';
    export default {
        components:{
            Rate
        },
        data(){
            return{
                  active1:0,
                  citys:['网上授课','线下授课'],
                  citys2:['科学类','编程类','幼儿衔接','幼儿外教'],
                  citys3:['评分从高到低','评分从低到高'],
                  citys4:['附近1公里','附近5公里','附近10公里'],
                  
            }
        },
        beforeCreate(){
          
        },
        methods:{
            goClassDetail(id){
                this.$router.push({
                    path: '/classDetail',
                    query: {
                        id: id
                    }
                })
            },
            goTeacherDetail(id){
                this.$router.push({
                    path: '/teacherDetail',
                    query: {
                        id: id
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
.container{
    padding: 0;
   padding-bottom: 2.75rem;
}
    .mu-tabs-center{
  justify-content: space-around;
  color: #666666;
  font-weight: bold;
  margin-top: .5rem;
  background: #FFFFFF;
}
 .demotext2{  
       border-top: .0625rem solid #EEEEEE;
      .top{
          width: 100%;
          height: 2.96875rem;
          background: #FFFFFF;
          color: #4BC1DD;
          font-size: .75rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
      }
      .mu-input{
          width: 0rem;
          color: #4BC1DD;
          font-size: .75rem;
      }
      .mu-select-input{
           color: #4BC1DD;
      }
      .mu-select-action{
          padding: 0;
      }
      .content{
          height: 7.2375rem;
          width: 100%;
          padding: 0 1rem 0 1rem;
          background: #FFFFFF;
          display: flex;
          padding-top: .8125rem;
          text-align: left;
          border-bottom: .0625rem solid #EEEEEE;
          .left{
              height: 5.5rem;width: 5.5rem;
            //   border: .0625rem solid #EEEEEE;
              margin-right: .875rem;
          }
         .center{
             width: 11.25rem;
             display: flex;
             flex-direction: column;
             justify-content: space-between;
             height: 5.5rem;
             text-align: left;
             .star{img{height: .75rem;width: .71875rem;}}
             .title{font-size: .8125rem;color: #333333;font-weight: bold;}
             .average{font-size: 1.125rem;color: #333333;font-weight: bold;}
             .add{font-size: .6875rem;color: #666666;}
         }
         .right{
             .hot{font-size: .6875rem;color: #ABABAB;margin-top: 3.3rem;}
             .distance{font-size: .6875rem;color: #666666;margin-top: .825rem;}
         }
         .span1{
             font-size: .9375rem;color: #333333;font-weight: bold;line-height: 1.5rem;
         }
         .span2{
             font-size: .75rem;color: #ABABAB;margin-left: .8125rem;
         }
         .back{
             font-size: .75rem;color: #666666;margin-top: .375rem;margin-bottom: .375rem;
         }
         .introduce{
             font-size: .75rem;color: #666666;line-height: 1.2rem;
         }
      }
  }
</style>