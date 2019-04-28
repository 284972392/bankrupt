<template>
 <mu-container>
  <mu-tabs :value.sync="active1" inverse color="#4BC1DD" indicator-color="#4BC1DD"  center>
    <mu-tab>热门</mu-tab>
    <mu-tab>最新</mu-tab>
  </mu-tabs>
  <div class="demotext" v-if="active1 === 0">
      <div class="bigBox" @click="toDetail" v-for="data in info" :key="data.id">
          <div class="top">
              <div>
                  <img :src="data.imgSrc" alt="">
                  <span>{{data.name}}</span>
              </div>
              <span>{{data.time}}</span>
          </div>
          <p class="title">{{data.title}}</p>
          <div class="content">
              {{data.content}}
          </div>
          <div class="btm">
              <span>图</span>
              <span>{{data.pick1}}</span>
              <span>{{data.pick2}}</span>
              <span>{{data.pick3}}</span>
          </div>
      </div>
      
      
  </div>
  <div class="demotext" v-if="active1 === 1">

       <div class="bigBox" @click="toDetail" v-for="data in info2" :key="data.id">
          <div class="top">
              <div>
                  <img :src="data.imgSrc" alt="">
                  <span>{{data.name}}</span>
              </div>
              <span>{{data.time}}</span>
          </div>
          <p class="title">{{data.title}}</p>
          <div class="content">
              {{data.content}}
          </div>
          <div class="btm">
              <span>图</span>
              <span>{{data.pick1}}</span>
              <span>{{data.pick2}}</span>
              <span>{{data.pick3}}</span>
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
                  info:[],
                  info2:[]
            }
        },
        beforeMount(){
            this.info = this.studyInfo
            this.info2 = this.studyInfo2
        },
        methods:{
         toDetail(){
          this.$router.push("/releaseDetail")
         }

        }
    }
</script>

<style lang='scss' scoped>
.demotext{
        border-top: .0625rem solid #EEEEEE;
}
     .mu-tabs-center{
  justify-content: space-around;
  color: #666666;
  font-weight: bold;
  margin-top: .5rem;
  background: #FFFFFF;
}
.container {
    width: 100%;
    padding-right: 0;
    padding-left: 0;
    margin-right: auto;
    margin-left: auto;
}
.mu-tab{
    min-width: 6.875rem;
}

.bigBox{
    width: 100%;text-align: left;
    padding: .5625rem 1rem .4375rem 1rem;
    border-bottom: .0625rem solid #EEEEEE;
    background: #FFFFFF;
    .top{
        width: 100%;height: 1.75rem;
        display: flex;justify-content: space-between;
        span{font-size: .75rem;color: #666666;}
        div{span{font-size: .75rem;color: #333333;}}
        img{height: 1.75rem;width: 1.75rem;margin-right: .625rem;border-radius: 100%;}
    }
    .title{
        font-size: 1.0625rem;color: #333333;font-weight: bold;margin-top: .4375rem;
    }
    .content{
        margin-top: .3125rem;font-size: .8125rem;color: #666666;line-height: 1rem;margin-bottom: .5625rem;
    }
    .btm{
        color: #ABABAB;font-size: .75rem;
        span:nth-child(1){
            color: #4BC1DD;margin-right: .25rem;
        }
        span:nth-child(2){
            margin-right: .6875rem;
        }
        span:nth-child(3){
            margin-right: .6875rem;
        }
    }
}
</style>