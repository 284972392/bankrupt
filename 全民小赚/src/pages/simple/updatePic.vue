<style>
    .mu-input {
        width: 100%;
    }
      input::-webkit-input-placeholder {
         /* placeholder颜色  */
         color:#000;
         font-weight: bold;
         /* placeholder字体大小  */
         font-size: 1rem;
         /* placeholder位置  */
        
     }
</style>
<template>
    <div class="updatePic">
         <headBar titleName='上传凭证' isBack=true></headBar>
         <div class="explain">
             <p>任务说明</p>
             <p>{{info.easyMakeExplain}}</p>
             <div class="picContent">
                 <img :src="data" alt="" v-for="data in detailImg" @click="showpic(data)">
             </div>
         </div>

         <div class="f5"></div>
         <div class="btmContent">
               <mu-text-field v-model="phone" :placeholder="placeholder"></mu-text-field>
              <addpic @update="upImg" @remove="removeImg" :size='5'></addpic>  
            <mu-flex justify-content="center" align-items="center" style="margin:.7rem 0;">
                <mu-button color="#FF7C74" full-width textColor='#fff' v-show='status==null||status==6||status==1' @click="submit">提交审核</mu-button>
                <mu-button color="#D4D4D4" full-width textColor='#fff' v-show='status==2'>已上传任务凭证，审核中…</mu-button>
            </mu-flex>
            <p>温馨提示：审核时间需要 <span class="pick">3</span> 个工作日，审核完毕后，奖励将自动打到您的个人账户中，金额前往“<span class="pick">钱包</span>”模块中查看</p>
         </div>

 

         <mu-dialog  width="360" :open.sync="picModel">
               <img :src="showPic" alt="" style="height:100%;width:100%;">
            </mu-dialog>

    </div>
</template>

<script>
import addpic from '@/components/upload'
import headBar from '@/components/head'
    export default {
          components:{
            headBar,addpic
        },
        data(){
            return{
                placeholder:'请输入手机号或相应信息',
                info:{},
                showPic:'',
                picModel:false,
                status:0,
                id:null,
                detailImg:[],
                status:null,
                phone:null,
                picList:[]

            }
        },
        methods:{
            showpic(data){
                this.showPic = data
                this.picModel = true
            },
            upImg(){
                 this.picList.push(this.$store.state.shareUrl.url)
            },
            removeImg(){
                  let delectIndex = this.$store.state.imgIndex
                  this.picList.splice(delectIndex,1)
            },
            init(){
                let url = this.allUrl + '/easyMake/getEasyMake'+'?oldSession3rd='+this.oldSession3rd+'&easyMakeId='+this.id
                this.$http.get(url).then((res)=>{ 
                    console.log(res)
                    this.info = res.data.data     
                    this.detailImg = res.data.data.strategyPic.split(';')  
                    this.status = res.data.data.status     
                    this.placeholder = res.data.data.cation
                })
            },
            submit(){
                console.log(this.status)
                if(!this.phone){
                    this.$toast.error("请输入手机号或相应信息")
                    return;
                }
                // else{
                //     var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                //     if (!myreg.test(this.phone)) {
                //         this.$toast.error("请输入正确手机号")
                //         return;
                //     }
                // }

                if(this.picList.length==0){
                     this.$toast.error("请上传任务截图")
                     return;
                }
                this.sub()
            },
            sub(){
                if(this.status==null){
                    this.save()
                }else{
                    this.change()
                }
            },
            save(){
                let picUrl = this.picList.join(';')
                let formDate = {
                    easyMakeId:this.id,
                    voucherUrl:picUrl,
                    phone:this.phone,
                    openId:this.oldSession3rd,
                    status:2
                }
                this.$http({
					url:this.allUrl+'/easyMakeRecord/saveEasyMakeRecord',
					method:'post',
					data: formDate 
				  }).then((response) =>{
                      console.log(response)
                      if(response.data.resultCode=='1'){
                          this.$toast.success("提交成功")
                          this.status = 2
                      }
                  })
            },
            change(){
                   let picUrl = this.picList.join(';')
                let formDate = {
                    easyMakeId:this.id,
                    voucherUrl:picUrl,
                    phone:this.phone,
                    openId:this.oldSession3rd,
                    status:2
                }
                this.$http({
					url:this.allUrl+'/easyMakeRecord/updateEasyMakeRecord',
					method:'post',
					data: formDate 
				  }) .then((response) =>{
                      console.log(response)
                      if(response.data.resultCode=='1'){
                          this.$toast.success("提交成功")
                          this.status = 2
                      }
                  })
            }
        },
        beforeMount(){
            this.oldSession3rd = this.$route.query.openId
            this.id = this.$route.query.id
            this.init()
        }
    }
</script>

<style scoped lang='scss'>
    .updatePic{
        overflow-x:hidden;
        overflow-y: scroll;
        height: 100%;
        width: 100%;
       
        background: #fff;
        text-align: left;
         .pick{
                        color:#FF7C74;
                    }
        .explain{
            width: 100%;
            padding: 1rem 0 1.875rem 1rem;
            background: #fff;
            margin-top:  2.90625rem;
            font-size: .8125rem;
            color: #333333;
            font-weight: bold;
            p:nth-child(1){
                font-size: .9375rem;
                color: #888888;
                margin-bottom: .5rem;
            }
           p:nth-child(2){  
               line-height: 1.2rem;
           }
           .picContent{
               height: 7.25rem;
               width: 95%;
               display: flex;
               overflow: scroll;
                margin-top: .625rem;
               img{
                   width: 5.25rem;
                   height: 7.25rem;
                   margin-right: .875rem;
               }
           }
        }
        .f5{
            width: 100%;
            height: .5rem;
            background: #F5F5F5;
        }
        .btmContent{
            width: 100%;
            background: #fff;
            padding: 1.875rem 1rem 1rem;
            p{
                font-size: .6875rem;
                color: #888888;
                letter-spacing: 0;
                line-height: 1rem;
                padding-bottom: 2.34375rem;
                font-family: PingFangSC-Medium;
            }
        }
    }
</style>