<template>
    <div class="record">
        <div class="empty" v-if="isEmpty">
            <div>
                 <img src="http://image.miduoxing.cn/fd8e0ab3-a632-49f5-bc97-63a12e6e1e69" alt="">
            </div>
            <span>暂 无 数 据</span>
        </div>

        <div class="list" v-if="!isEmpty">
            <div class="content" v-for="data in arr">
                <div class="innerBox">
                    <div class="left">
                        <div class="top">
                            <img src="../../../static/qian.png" alt="">
                            <span>提现至微信钱包</span>
                        </div>
                        <div class="time">{{data.createTime}}</div>
                    </div>
                    <div class="right">{{data.amount}} 元</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isEmpty:false,
                arr:[
                 
                ],

            }
        },
        beforeMount(){
            
            this.oldSession3rd = this.$route.query.openId
             let url = this.allUrl + '/withdrawRecord/getWithdrawRecord'
            this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
			  .then((response)=>{
          
                    this.arr = response.data.data   
                      if(this.arr==null){   
                            this.isEmpty=true
                        }else{
                            this.isEmpty=false
                        }
			   })       

 
        },
        mounted () {
            this.$http({
	    	url:'https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=qmxzGetCashRecord&&channel=lvtudiandian',
                method:'post'
            })
            .then((res)=>{
            
            })
        }
    }
</script>

<style scoped lang="scss">
    .record{
        width: 100%;
    	height: 100%;
        background: #ffffff;
        overflow-x: hidden;
        overflow-y: scroll;
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
        .content{
            height: 4.375rem;
            border-bottom: .03125rem solid #ededed;
            padding-left: 1.0625rem;
            padding-right: 1.25rem;
            padding-top: 1.125rem;
            .innerBox{
                width: 100%;
                text-align: left;
                display: flex;
                justify-content: space-between;
                .right{
                    margin-top: .65625rem;
                    font-size: .90625rem;
                    color: #d23939;
                    font-weight: bold;
                }
                .left{
                    .top{
                        height: 1.0625rem;
                        line-height: 1.0625rem;
                        img{
                            width: 1.0625rem;
                            height: 1.0625rem;
                            margin-right: .71875rem;
                        }
                        span{                         
                            font-size: .84375rem;
                            font-weight: bold;
                            color: #333333;
                        }
                    }
                    .time{
                        margin-top: .625rem;
                        margin-left: 1.98rem;
                        font-size: .625rem;
                        color: #999999;
                        text-align: left;
                    }
                }
            }
        }
    }
</style>