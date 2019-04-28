


<template>

	<div class="index">
        <headBar :titleName='titleName' :isShow='false'></headBar>
        <div class="homeTop">
            <mu-text-field v-model="value1" icon='search' :solo='true' class="headInput" placeholder='搜索课程、机构或商圈'></mu-text-field>
            <swiper></swiper>
        </div>
        <div class="ageContent">
              <div class="top">
                <hr width='80rpx;' style="margin-right:1rem;">
                    年龄阶段
                 <hr width='80rpx;' style="margin-left:1rem;">
              </div>
              <div class="btm">
                  <div class="tou" @click="goList('幼儿阶段')">
                    <img src="../../assets/images/youer@3x.png" alt="">
                    <span>幼儿阶段</span>
                  </div>
                  <div class="tou" @click="goList('小学阶段')">
                    <img src="../../assets/images/xiaoxue @3x.png" alt="">
                    <span>小学阶段</span>
                  </div>
                  <div class="tou" @click="goList('初中阶段')">
                    <img src="../../assets/images/chuzhong@3x.png" alt="">
                    <span>初中阶段</span>
                  </div>
                  <div class="tou" @click="goList('高中阶段')">
                    <img src="../../assets/images/gaozhong@3x.png" alt="">
                    <span>高中阶段</span>
                  </div>
              </div>
        </div>
        <div class="classContent">
            <div class="top">
               <hr width='80rpx;' style="margin-right:1rem;">
                课程分类
                <hr width='80rpx;' style="margin-left:1rem;">
              </div>
           <div class="classBtm">
              <div @click="goList('才艺')"><img src="../../assets/images/caiyi@3x.png" alt="">
                    <span>才艺</span></div>
                    <div @click="goList('早教中心')"><img src="../../assets/images/zaojiao@3x.png" alt="">
                    <span>早教中心</span></div>
              <div @click="goList('课本知识')"><img src="../../assets/images/keben@3x.png" alt="">
                    <span>课本知识</span></div>
              <div @click="goList('编程')"><img src="../../assets/images/bianc@3x.png" alt="">
                    <span>编程</span></div>
              <div @click="goList('儿童乐园')"><img src="../../assets/images/leyuan@3x.png" alt="">
                    <span>儿童乐园</span></div>
              
              
            </div>
             <div class="classBtm" style="margin-top:1.125rem;">
             	<div @click="goList('科学')"><img src="../../assets/images/kex@3x.png" alt="">
                    <span>科学</span></div>
              
              <div @click="goList('幼儿衔接')"><img src="../../assets/images/youerxianjie@3x.png" alt="">
                    <span>幼儿衔接</span></div>
              <div @click="goList('幼儿外语')"><img src="../../assets/images/waiyu@3x.png" alt="">
                    <span>幼儿外语</span></div>
              
              <div @click="goList('魔方')"><img src="../../assets/images/mofang@3x.png" alt="">
                    <span>魔方</span></div>
              <div @click="goList('全部分类')"><img src="../../assets/images/quanbu@3x.png" alt="">
                    <span>全部分类</span></div>
            </div>
        </div>

    <tabs></tabs>
       
    </div>
</template>

<script>
import headBar from '@/components/head'
import swiper from '@/components/swiper'
import tabs from './tabs'


export default {
    components:{
			  headBar,swiper,tabs
		  },
    data() {
      return {
      titleName:'教育点评',
      value1:'',
      value2:2
     
    
      }
    },
    beforeMount(){
       
    },
    methods:{
      goList(data){
       
        this.$router.push({
          path: '/styleList',
          query: {
            title: data
          }
        })
      }
    }

 
  }
</script>

<style scoped>

.container{
  padding: 0;
}
.index{
  overflow: hidden;
  margin-bottom: 3.5rem;
}
hr{
  border: .0625rem solid #E7E7E7;
}
.classBtm{
  width: 100%;

  display: flex;
  justify-content: space-around;
}
.classBtm div{
  font-size: .75rem;
color: #333333;
letter-spacing: 0;
display: flex;
flex-direction: column;
align-items: center;
font-weight: bold;
}
.classBtm div img{
  height: 1.5625rem;
  margin-bottom: .28125rem;
}
.classContent{
  height: 10.8125rem;
  width: 100%;
  margin-top: .5rem;
  padding-top: .75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
       background: #FFFFFF;
}
  .homeTop{
    height: 13.4875rem;
    width: 100%;
    text-align: center;
    padding-top: .8575rem;
   margin-top: 2.75rem;
  
    background: #FFFFFF;
    margin-bottom: .5rem;

  }
  .ageContent{
    height: 9.25rem;
    width: 100%;
    background: #FFFFFF;
    padding-top: .75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
   .top{
    font-size: .8125rem;
    color: #666666;
    letter-spacing: 0;
    height: 1.125rem;
    display: flex;
    width: 16.375rem;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .ageContent .btm{
    height: 5.375rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .ageContent .btm .tou{
    height: 100%;
    width: 3.6875rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: .875rem;
    color: #333333;
    letter-spacing: 0;
    font-weight: bold;
    
  }
  .ageContent .btm .tou img{
    height: 3.6875rem;
    width: 3.6875rem;
  }
  .headInput{
    height: 2rem;
    width: 19.5rem;
    background: #F2F2F2;
    border-radius: .25rem;
    font-size: .75rem;
color: #ABABAB;
letter-spacing: 0;
margin-bottom: .9375rem !important;
  }
</style>