<style>
.mu-step-label.active .mu-step-label-circle, .mu-step-label.completed .mu-step-label-circle {
    background-color: #ffffff !important;
    color: #f35a54 !important;
    border: .03125rem solid #f35a54 !important;
}
.mu-step-label.active .mu-step-label-icon, .mu-step-label.completed .mu-step-label-icon {
    color: #f35a54;
}
.mu-step-label-circle, .mu-step-label.disabled .mu-step-label-circle {
      background-color: #ffffff !important;
    color: #f35a54 !important;
    border: .03125rem solid #f35a54 !important;
}
.step .midBox .btBox .demo-vsteper-container .mu-step-label {
    font-size: .96875rem;
    color: #333333 !important;
}
.mu-stepper-vertical{
    height: 12.7rem !important;
}
</style>

<template>
    <div class="step">
        <div class="bg">
			<div class="backBtn" @click="toIndex"></div>
		</div>
        <div class="midBox">
            <div class="title">
                <img src="../../assets/images/stepTitle.png" alt="">
            </div>
            <div class="btBox">
                <div class="demo-vsteper-container">
                    <mu-stepper :active-step=0 orientation="vertical">
                    <mu-step>
                        <mu-step-label style="color:#333;">
                            第一次答题
                        </mu-step-label>   
                    </mu-step>
                    <mu-step>
                        <mu-step-label style="color:#333;">
                            第二次答题
                        </mu-step-label>   
                    </mu-step>
                    <mu-step>
                        <mu-step-label style="color:#333;">
                            第三次答题
                        </mu-step-label>   
                    </mu-step>
                    </mu-stepper>
                </div>
                <div class="rightBox" v-if="show">
       
                        <mu-button round class="rBtn" v-if="this.data[0].state==2" @click="goDetail(1)">领取{{expand[0]}}元</mu-button>
                        <p class="allR" v-if="this.data[0].state==1">已领取{{expand[0]}}元</p>
                        <p class="allF" v-if="this.data[0].state==0">领取失败</p>
         
                        <mu-button round class="rBtn" v-if="this.data[1].state==2" @click="goDetail(2)">领取{{expand[1]}}元</mu-button>
                         <mu-button round class="fBtn" v-if="this.data[1].state==3" disabled>领取{{expand[1]}}元</mu-button>
                         <p class="allR" v-if="this.data[1].state==1">已领取{{expand[1]}}元</p>
                         <p class="allF" v-if="this.data[1].state==0">领取失败</p>

                        <mu-button round class="rBtn" v-if="this.data[2].state==2" @click="goDetail(3)">领取{{expand[2]}}元</mu-button>
                         <mu-button round class="fBtn" v-if="this.data[2].state==3" disabled>领取{{expand[2]}}元</mu-button>
                        <p class="allR" v-if="this.data[2].state==1">已领取{{expand[2]}}元</p>
                        <p class="allF" v-if="this.data[2].state==0">领取失败</p>
          
                    
                </div>

            </div>
        </div>
        <p class="bm">规则说明：分三次答题，每天可以答一题，领取相应金额。</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                taskId:'',
                expand:[],
                data:[{state:null},{state:null},{state:null}],
                show:false
            }
        },
        methods: {
            toIndex(){
				this.$router.go(-1)
            },
            goDetail(data){
                this.$router.push({
                path: '/detail',
                query: {
                                id: this.taskId,
                                openId:this.oldSession3rd,
                                stepId:data
                }
                })
            }
        },
        beforeMount() {
            this.oldSession3rd = this.$route.query.openId
            this.taskId = this.$route.query.id
            this.$http.get(this.allUrl+'/taskRecord/getTaskRecordStepList?oldSession3rd='+this.oldSession3rd+'&taskId='+this.taskId).then((response)=>{
                this.expand = response.data.expand
                this.data = response.data.data
                // this.show = false
                this.show = true
              
            })
        },
        mounted () {
            this.$http({
		url:'https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=qmxzStep&&channel=lvtudiandian',
                method:'post'
            })
            .then((res)=>{
            
            })
        }
    }
</script>

<style lang="scss" scoped>
    .step{
        width: 100;
        height: 100%;
        position: relative;
        overflow: hidden;
        min-height: 41.68rem;
        background: -webkit-linear-gradient(#fee5b6, #fbcdab); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#fee5b6, #fbcdab); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#fee5b6, #fbcdab); /* Firefox 3.6 - 15 */
        background: linear-gradient(#fee5b6, #fbcdab); /* 标准的语法 */
        .bg{
  	width: 100%;
  	height: 13.375rem;
  	background: url('http://image.miduoxing.cn/a57b9c14-87eb-4493-baa2-e6738929857d') no-repeat center center;
  	background-size: 100% 100%;
  	.backBtn{
  		width: 2.9rem;
  		height: 2.9rem;
  		background: url(../../assets/images/backBtn.png) no-repeat center center;
  		background-size: 100% 100%;
  		position: absolute;
  		top: 0.62rem;
  		left: 0.62rem;
  	}
    
  }
    .midBox{
          width: 91.3%;
          margin: 0 auto;
          background: #ffffff;
          height: 22.09375rem;
          border-radius: .21875rem;
          .title{
              width: 100%;
              height: 7.09375rem;
              img{
                  height: 2.375rem;
                  width: 11.3125rem;
                  margin-top: 1.75rem;
              }
          }
          .btBox{
              margin-left: 1.375rem;
              display: flex;
              .demo-vsteper-container{
                  width: 12.5rem;
                  .mu-step-label{
                      font-size: .96875rem;
                  }
                  .mu-step{
                      font-weight: bold;
                   
                  }
                  .mu-step-label.active {
                        font-weight: 900;
                      
                    }
                 
              }
              .rightBox{
                  margin-top: 0.25rem;
                  width: 6.85rem;
                  height: 12.03125rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                 .rBtn{
                     background: url('../../assets/images/Rbtn.png') no-repeat center center;
                     background-size: 100% 130%;
                     font-weight: bold;color: #ffffff;
                     box-shadow: none;
                 }
                 .fBtn{
                    background: url('../../assets/images/Fbtn.png') no-repeat center center;
                     background-size: 100% 130%;
                     font-weight: bold;color: #ffffff;
                     box-shadow: none;
                 }
                 .allR{
                     height: 2rem;line-height: 2rem;color: #d04c35;font-weight: bold;
                 }
                 .allF{
                     height: 2rem;line-height: 2rem;color: #909090;font-weight: bold;
                 }
              }
          }
      }
      .bm{
          margin-top: 1.5625rem;
          font-size: .7875rem;
          font-weight: bold;
          color: #2a2a2c;
      }
    }
</style>