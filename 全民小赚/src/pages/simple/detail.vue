
<style lang="scss">
     .showResonHead{
            background: linear-gradient(47deg, #FB5A5A 0%, #FFA183 100%);
            color: #fff;
            font-size: .875rem;
            width: 100%;
            height: 6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1rem;
            img{
                height: 2.5rem;
                width: 2.5rem;
                margin-top: 1rem;
                margin-bottom: .6rem;
            }
        }
        .showResonBtm{
            width: 100%;
            height: 8rem;
            background: #Fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #000;
            font-weight: bold;
            font-size: 1rem;
            padding: 0 .5rem;
            p:nth-child(1){
                color: #7c7c7c;
                margin-bottom: .8rem;
                font-size: .9rem;
            }
             p:nth-child(2){
                 line-height: 1.5rem;
             }
        }
        .resonmodel{
            .mu-dialog-body{
                padding: 0;
            }
        }
</style>

<template>
    <div class="simpleDetail">
         <headBar titleName='简单赚详情' isBack=true></headBar>
         <div class="top">
             
                <img :src="data.listPic" alt="" class="icon">
                <div class="mid">
                    <p>{{data.easyMakeName?data.easyMakeName:data.name}}</p>
                    <p>任务限时: <span class="pick">{{data.expirationMin}}</span> 分钟</p>
                    <p>{{data.characteristics}}</p>
                    
                </div>
                <div class="right">
                    <span class="pick">{{data.singlePrice}}</span> 元        
                </div>
     
         </div>
         <div class="notice">
            <p>注意事项说明</p>
            <p>必须是新用户首次完成任务，按照要求操作上传真实正确截图。任务开始后限时{{data.expirationMin}}分钟，超时任务失效，一个任务只能领取一次，上传截图一次。</p>
         </div>

         <div class="notice2">
           <p>任务步骤及截图说明</p>
           <p>{{data.easyMakeExplain}}</p>
           <div class="imgContent">
               <div v-for="(data,index) in detailImg">
                   <img :src="data" alt="" @click="showpic(data)">
                   <span>第{{index+1}}步</span>
               </div>
           </div>
         </div>


         <div class="btm">
              <mu-flex justify-content="center" align-items="center">
                    <mu-button v-if="status==null" color="#FF7C74" textColor='#fff' @click="startModel=true">开始任务</mu-button>
                    <mu-button v-if="status==1" color="#FF7C74" textColor='#fff' @click="startModel=true">继续任务</mu-button>
                    <mu-button v-if="status==2" color="#D4D4D4" textColor='#fff'>已上传任务凭证，审核中...</mu-button>
                    <mu-button v-if="status==6" color="#fff" textColor='#FF7C74' @click="checkReson" style="border: 1px solid #FF7C74;">凭证审核失败，查看原因</mu-button>
                    <p v-if="status==7">已完成任务，奖励已发放到钱包中</p>
                    <p v-if="status==5">任务已过期</p>
                </mu-flex>
         </div>

           <mu-dialog  width="360" :open.sync="picModel">
               <img :src="showPic" alt="" style="height:100%;width:100%;">
            </mu-dialog>

            <mu-dialog  width="300" :open.sync="startModel">
                <div style="width:70%;margin-left:15%">
                    <mu-button color="#FF7C74" textColor='#fff' full-width style="border-radius: 4px;margin-bottom:1.375rem;" @click="starMisson" v-show='data.easyMakeLink'>开始做任务</mu-button>
                    <mu-button color="#fff" textColor='#FF7C74' full-width @click="goPushPic" style="border: .03125rem solid #FF7C74;border-radius: 4px;">已做任务上传凭证</mu-button>
                </div>
                 
                 <!-- <mu-button slot="actions" flat color="primary" @click="startModel=false">关闭</mu-button> -->
            </mu-dialog>

            <mu-dialog width='300' :open.sync="showReson" class="resonmodel">
                <div class="showResonHead">
                    <img src="http://image.miduoxing.cn/0104b1e6-0ad6-44d9-9501-b34a86e0f944" alt="">
                    <p>审核不通过</p>
                </div>
                <div class="showResonBtm">
                        <!-- <mu-button color="#fff" textColor='#333' style="border-radius: 4px;border: 1px solid #E1E1E1;" @click="starMisson">重做任务</mu-button>
                        <mu-button color="#fff" textColor='#FF7C74' style="border-radius: 4px;border: 1px solid #FF7C74;" @click="goPushPic">重新上传</mu-button> -->
                        <p>不通过原因</p>
                        <p>{{data.failReason}}</p>
                </div>
            </mu-dialog>

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
                id:null,
                status:0,
                showPic:'',
                picModel:false,
                startModel:false,
                showReson:false,
                data:{},
                detailImg:[]
            }
        },
        methods:{
            checkReson(){
                // this.$toast.error(this.data.failReason)
                this.showReson = true
            },
            showpic(data){
                this.picModel = true;
                this.showPic = data
            },
            init(){
                let url = this.allUrl + '/easyMake/getEasyMake'+'?oldSession3rd='+this.oldSession3rd+'&easyMakeId='+this.id
                this.$http.get(url).then((res)=>{ 
                    console.log(res.data.data.status)
                    this.data = res.data.data      
                    this.detailImg = res.data.data.strategyPic.split(';')  
                    this.status = res.data.data.status           
                })
            },
            starMisson(){  
                let url = this.allUrl + '/easyMake/getEasyMake'+'?oldSession3rd='+this.oldSession3rd+'&easyMakeId='+this.id
                this.$http.get(url).then((res)=>{ 
                    if(res.data.data.status==null){
                        this.save()
                    }else{
                        window.location.href = this.data.easyMakeLink
                    }
                })
                
            },
            save(){
                  let formDate = {
                    easyMakeId:this.id,
                    voucherUrl:null,
                    phone:null,
                    openId:this.oldSession3rd,
                    status:1
                }
                this.$http({
					url:this.allUrl+'/easyMakeRecord/saveEasyMakeRecord',
					method:'post',
					data: formDate 
				  }).then((response) =>{
                      console.log(response)
                      if(response.data.resultCode=='1'){
                          this.status = 1
                      }
                      window.location.href = this.data.easyMakeLink
                  })
            },
            goPushPic(){
                  this.$router.push({
                    path: '/updatePic',
                    query: {
                            openId:this.oldSession3rd,
                            id:this.data.easyMakeId
                    }
                    })
            }
        },
        beforeMount(){
            this.oldSession3rd = this.$route.query.openId
            this.id = this.$route.query.id
            this.init()
        },
        mounted(){
            this.init()
        }
    }
</script>

<style scoped lang='scss'>
    .simpleDetail{
        padding-top: 2.90625rem;
        height: 100%;
        width: 100%;
        background: #f5f5f5;
        overflow-x:hidden;
        overflow-y: scroll;
        
    
           .pick{
                        color:#FF7C74;
                    }
        .top{
            height: 6.09375rem;
            width: 100%;
            background: #fff;
        }
        .notice{
            height: 6.53125rem;
            width: 100%;
            background: #fff;
            margin-top: .4375rem;
            overflow: hidden;
            padding-left: 1rem;
            padding-top: .8125rem;
            text-align: left;
            font-weight: bold;
            p:nth-child(1){
                font-size: .9375rem;
                color: #888888;
            }
            p:nth-child(2){
                font-size: .8125rem;
                color: #333333;
                line-height: 1.1875rem;
                margin-top: .5625rem;
                width: 90.13%;
            }
        }
        .notice2{
            width: 100%;
            background: #fff;
            margin-top: .4375rem;
            overflow: hidden;
            padding-left: 1rem;
            padding-top: .8125rem;
            text-align: left;
            font-weight: bold;
            p:nth-child(1){
                font-size: .9375rem;
                color: #888888;
            }
            p:nth-child(2){
                font-size: .8125rem;
                color: #333333;
                line-height: 1.1875rem;
                margin-top: .5625rem;
                width: 90.13%;
            }
            .imgContent{
                width: 22rem;
                margin-top: 1.125rem;
                display: flex;
                margin-bottom: 6rem;
                flex-wrap: wrap;
                div{
                    display: flex;
                    flex-direction: column;
                   align-items: center;
                   margin-right: .40625rem;
                     margin-bottom: .9375rem;
                }
                img{
                    width: 6.90625rem;
                    height: 9.53125rem;
                    margin-bottom: .75rem;
                }
            }
        }
         .top{
                 position: relative;
                 height: 6.125rem;
                 width: 100%;
                 padding-left: 1rem;
                 padding-top: .78125rem;
                 display: flex;
                 overflow: hidden;
                 border-bottom: .03125rem solid #eeeeee;
                 .icon{
                     height: 4.0625rem;
                     width: 4.0625rem;
                 }
                 .mid{
                     height: 4.0625rem;
                     text-align: left;
                     margin-left: .8125rem;
                     display: flex;
                      flex-direction: column;
                     justify-content: space-between;
                     p:nth-child(1){
                         font-size: 1rem;
                         color: #333333;
                         font-weight: bold;
                     }
                     p:nth-child(3){
                         font-size: .75rem;
                         color: #888888;
                     }  
                     p:nth-child(2){
                         font-size: .9rem;
                         color: #333333;
                         font-weight: bold;
                     }                    
                 }
                 .right{
                    position: absolute;
                    top: 2.25rem;
                    right: 1rem;
                    color: #888888;
                    font-weight: bold;
                    font-size: 1.125rem;
                    img{
                        width: 4.03125rem;
                        height: 1.21875rem;
                    }
                 }
         }
         .btm{
             width: 100%;
             height: 4rem;
             background: #fff;
             position: fixed;
             bottom:0;
             box-shadow: 0 -2px 4px 0 rgba(176,176,176,0.15);
            .mu-raised-button {
                margin-top: .78125rem;
                width: 90.53%;
                height: 2.5rem;
                font-size: .96875rem;
                font-weight: bold;
                // box-shadow: 0 4px 10px 0 rgba(236,84,80,0.61); 
                border-radius: .25rem;
            }
            p{
                font-size: 1rem;
                color: #999999;
                margin-top: 1.3rem;
            }
         }

       
    }
</style>