<style>
      .mu-tab-wrapper{
            background: #fff !important;
        }
</style>
<template>
    <div class="applyCard">
         <headBar titleName='简单赚'></headBar>
        <div class="introduce">
            <img src="http://image.miduoxing.cn/null_a78e3f8b-de18-4ff7-adfc-22fb3a5684ef" alt="">
        </div>



      <mu-container>
  <mu-tabs :value.sync="active" inverse color="#ff7c74" indicator-color='#ff7c74' center full-width >
    <mu-tab>任务列表</mu-tab>
    <mu-tab>参与任务</mu-tab>
  </mu-tabs>
</mu-container>

  <div class="demo-text" v-show="active === 0">
      
      <div class="empty" v-show="isEmpty">
            <div>
                 <img src="http://image.miduoxing.cn/fd8e0ab3-a632-49f5-bc97-63a12e6e1e69" alt="">
            </div>
            <span>暂 无 数 据</span>
        </div>

      <div class="content" v-for='data in taskList' :key='data.id'  @click="goDetail(data)">
          <img :src="data.listPic" alt="" class="icon">
           <div class="mid">
               <p>{{data.name}}</p>
               <p>{{data.characteristics}}</p>
               <p>剩余<span class="pick">{{data.num}}</span>份</p>
           </div>
           <div class="right">
               <span class="pick">{{data.singlePrice}}</span> 元        
           </div>
      </div>
  </div>
  <div class="demo-text" v-show="active === 1">
      <div class="empty" v-show="isEmpty2">
            <div>
                 <img src="http://image.miduoxing.cn/fd8e0ab3-a632-49f5-bc97-63a12e6e1e69" alt="">
            </div>
            <span>暂 无 数 据</span>
        </div>
      <div class="content" v-for='data in onTaskList'  @click="goDetail2(data)">
          <img :src="data.listPic" alt="" class="icon">
           <div class="mid mid2">
               <p>{{data.easyMakeName}}</p>
               <p>{{data.characteristics}}</p>
           </div>
           <div class="right right2">

               <div> <span v-show="data.status==7" class="pick">+</span> <span :class="data.status==7?'pick':'black'">{{data.singlePrice}}</span> 元 </div>
               <img src="http://image.miduoxing.cn/null_0f9e5411-1efa-42ca-b38f-2e92effd6382" alt="" v-show="data.status!==7&&data.status!==6&&data.status!==5">       
               <img src="http://image.miduoxing.cn/null_dcadc2be-c739-475e-b8c3-ef188eb2e7fe" alt="" v-show="data.status==7||data.status==6||data.status==5">        
           </div>
      </div>

    

</div>


      


    </div>
</template>

<script>
import headBar from '@/components/head'
    export default {
        components:{
            headBar
        },
        data(){
            return{
                active: 0,
                isEmpty:false,
                isEmpty2:false,
                taskList:[
                   
                ],
                onTaskList:[
              
                ]
            }
        },
        methods:{
            getTaskList(){
                  let url = this.allUrl + '/easyMake/getEasyMakeList'
              this.$http.get(url).then((res)=>{ 
                  this.taskList = res.data.data;
                  if(res.data.data.length==0){
                      this.isEmpty = true
                  }
              })
            },
            getOnTaskList(){
                let url = this.allUrl + '/easyMakeRecord/getEasyMakeRecordList'+'?oldSession3rd='+this.oldSession3rd
                this.$http.get(url).then((res)=>{ 
                  this.onTaskList = res.data.data;
                  if(res.data.data.length==0){
                      this.isEmpty2 = true
                  }
              })
            },
            goDetail(data){
                this.$router.push({
                    path: '/simpleDetail',
                    query: {
                            openId:this.oldSession3rd,
                            id:data.id
                    }
                    })
                },
            goDetail2(data){
                this.$router.push({
                    path: '/simpleDetail',
                    query: {
                            openId:this.oldSession3rd,
                            id:data.easyMakeId
                    }
                    })
                },
            
            
           
        },
        beforeMount () {
         
            	this.oldSession3rd = this.$route.query.openId
                this.getTaskList();
                this.getOnTaskList();
        }
    }
</script>

<style scoped lang="scss">
    .applyCard{
        height: 100%;
        width: 100%;
        padding-top: 2.90625rem;
        background: #f5f5f5;
        overflow: hidden;
          .empty{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span{
                font-size: 1rem;
                color: #999;
                font-weight: bold;
            }
            div{
                margin-top: 10rem;
                margin-bottom: 1.46875rem;
                width: 8.5625rem;
                height: 8.5625rem;
                background: #f5f5f5;
                border-radius: 100%;
                img{
                  width: 8.5625rem;
                   }
            }
        }
         .container{
            background: #ffffff;
            height: 6.56%;
        }
        .introduce{
            // height: 6.125rem;
            height: 15.13%;
            width: 100%;
            background: #fff;
            // margin-bottom: .46875rem;
            margin-bottom: 1.15%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 76.4%;
               
            }

        }
        .demo-text {
            height: 85%;
            padding-top: .5rem;
             background: #fff;
             
             overflow-y: scroll;
             overflow-x: hidden;

             padding-bottom: 3.9375rem;
             .pick{
                        color:#FF7C74;
                    }
            .black{
                color: #333333;
            }
             .content{
                 position: relative;
                 height: 4.875rem;
                 width: 91.73%;
                 margin-left: 4.135%;
                 margin-top: .78125rem;
                 display: flex;
                 border-bottom: .03125rem solid #eeeeee;
                 .icon{
                     height: 4.0625rem;
                     width: 4.0625rem;
                     border-radius: .9375rem;
                 }
                 .mid{
                     text-align: left;
                     margin-left: .8125rem;
                     width: 60%;
                     p:nth-child(1){
                         font-size: 1rem;
                         color: #333333;
                         margin-top: .28125rem;
                         font-weight: bold;
                     }
                     p:nth-child(2){
                         margin-top: .5rem;
                         font-size: .75rem;
                         color: #888888;
                     }
                     p:nth-child(3){
                         font-size: .75rem;
                        color: #888888;
                        margin-top: .5rem;
                     }
                    
                 }
                 .mid2{
                     p:nth-child(1){
                         margin-top: .75rem;
                     }
                     p:nth-child(2){
                         margin-top: .625rem;
                     }
                 }
                 .right{
                    position: absolute;
                    font-size: 1.125rem;
                    top: 1.59375rem;
                    right: 0;
                    color: #888888;
                    font-weight: bold;
                    text-align: right;
                    img{
                        width: 4.03125rem;
                        height: 1.21875rem;
                    }
                 }
                 .right2{
                     top:.78125rem;
                     div{margin-bottom: .9375rem;}
                 }
             }
        }
    }

</style>