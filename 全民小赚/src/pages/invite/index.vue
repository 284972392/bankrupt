<template>
	<div class="invite">
        <img src="http://image.miduoxing.cn/null_5c184457-9251-4e78-8f64-eec5e45b262d" alt="" class="top">
        <div class="amountCard">
            <p>您目前邀请的有效人数</p>
            <span>{{amount}}</span>
        </div>
        
        <div class="list2">
                 <div class="head">
                     <hr>中奖名单<hr>
                 </div>
                 <div class="inviteList">
                     <div class="box" v-for="data in priceList">
                         <img :src="data.headImgUrl" alt="">
                         <span>{{data.nickName}}</span>
                         <p>{{data.price}}元</p>
                     </div>         
                 </div>
             </div>
        <p class="beizhu">邀请活动已结束，邀请奖励已发放，如有疑问，请联系客服，微信号：miduoxing004</p>
        <img src="http://image.miduoxing.cn/null_0297f93d-f049-4b00-b174-38448cce8e9b" alt="" class="addP">
        
            <div class="box1">
                <span class="red" style="line-height:2rem;">活动时间</span>
                <p style="font-size: 1rem;">3.20 — 3.29</p>
                
            </div>
            <div class="box1">
                <span class="red" style="line-height:2rem;">活动内容</span>
                <p style="text-align:left;">在活动期间内邀请好友关注全名小赚公众号。3月30日根据邀请好友的有效人数（没有取关）进行现金发放,金额随机。奖金即时到账，显示在我的钱包中。</p>
            </div>
             <div class="box1">
                <span class="red" style="line-height:2rem;">现金奖励,金额随机</span>
                <div class="boxC">
                    <p>有效人数 10-20 ： 3元—5元</p>
                    <p>有效人数 21-30 ： 6元—10元</p>
                    <p>有效人数 31-40 ： 11元—15元</p>
                    <p>有效人数 41-50 ： 16元—20元</p>
                    <p> 有效人数51以上： 21元以上</p>
                </div>
             </div>
              <div class="box1">
                <span class="red" style="line-height:2rem;">活动规则</span>
                <p style="text-align:left;">1.通过不正当手段（包括但不限于作弊、用机器模拟客户端）获得奖励，将被取消奖励资格;</p>
                <p style="text-align:left;">2.本活动最终解释权归甘来科技有限公司所有。</p>
            </div>

             <div class="list">
                 <div class="head">
                     <hr>您当前邀请的好友<hr>
                 </div>
                 <div class="inviteList">
                     <div class="box" v-for="data in list">
                         <img :src="data.headImgUrl" alt="">
                         <span>{{data.nickName}}</span>
                     </div>
                     <div v-if="list.length==0" style="width:100%;">还没有邀请好友，快去邀请吧~</div>
                 </div>
             </div>
    </div>

</template>

<script>


export default {
        data(){
            return{
                amount:0,
                list:[
                
                ],
                priceList:[

                ]
            }
        },
        beforeMount() {
                this.oldSession3rd = this.$route.query.openId
                 let url = this.allUrl + '/wechatUserInfo/getInviteUser'
                	this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
							.then((response)=>{
                              
                                this.amount = response.data.data.num
                                this.list = response.data.data.inviteUsers;
                        })
                 let url2 = this.allUrl + '/taskRecord/getInviteTaskRecordList'
                 this.$http.get(url2).then((res)=>{
                     this.priceList = res.data.data
                 })

                
        }
 
  }
</script>

<style scoped lang="scss">
.invite{
	width: 100%;
	height: 100%;
    background: #fff;
    position: relative;
    overflow: scroll;
    .beizhu{
        width: 80%;
        margin-left: 10%;
        text-align: left;
        line-height: 1.5625rem;
        font-size: .9375rem;
        color: #bb292c;
        font-weight: bold;
    }
    .addP{
        width: 83.46%;
        height: 3.28125rem;
        margin-top: .9375rem;
    }
    .top{
        height: 11.34375rem;
        width: 100%;
        margin-bottom: 3rem;
      
    }
    .amountCard{
        position: absolute;
        height: 6.75rem;
        width: 83%;
        top: 7.5625rem;
        left: 8.5%;
        background: #fff;
        border-radius: .46875rem;
        box-shadow: #eee 0 3px 5px;
        font-weight: bold;
        color: #333333;
        p{
            font-size: .90625rem;
            margin-top: 1.78125rem;
            margin-bottom: 1.09375rem;
        }
        span{
            font-size: 1.40625rem;
        }
    }
    .box1{
        width: 92%;
        margin-left: 1.21875rem;
        // text-align: left;
        font-weight: bold;
        color:#444444;
        font-size: .875rem;
        line-height: 1.325rem;
        margin-bottom: .4rem;
        .boxC{
            text-align: left;
            padding-left: 21%;
        }
        .red{color: #b63637;font-size: 1rem;line-height: 3rem !important;}
    }
    .list2{
         overflow: hidden;
        height: 27.25rem;
        width: 91%;
        margin-left: 4.5%;
        background: #f8eeef;
        margin-bottom: 1.5rem;
        margin-top: 2rem;
        border-radius: .15625rem;
         .head{
            height: .96875rem;
            margin-left: .75rem;
            margin-top: 1.71875rem;
            font-size: .9375rem;
            font-weight: bold;
            color: #b03436;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 19.8125rem;
            margin-bottom: 1.28125rem;
            hr{
                width: 7rem;
                height: .03125rem;
                border:none;
                border-top:1px solid #e29c9c;
            }
        }
           .inviteList{
            height: 24.0625rem;
            width: 19.53125rem;
            overflow-y: scroll;
            margin-left: .78125rem;
            padding-top: 0.1rem;
            .box{
                text-align: left;
                display: block;
                height: 1.84375rem;
                width: 100%;
                margin-bottom: .9375rem;
                color: #190d23;
                font-weight: bold;
                font-size: .875rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                img{
                    height: 1.84375rem;
                    width: 1.84375rem;
                    margin-right: .625rem;
                    border-radius: 100%;
                }
                p{
                    float: right;
                    margin-top: .49rem;
                }
            }
        }
    }
    .list{
        overflow: hidden;
        height: 15.5625rem;
        width: 91%;
        margin-left: 4.5%;
        background: #f5f5f5;
        margin-bottom: 1.5rem;
        .head{
            height: .96875rem;
            margin-left: .75rem;
            margin-top: 1.71875rem;
            font-size: .9375rem;
            font-weight: bold;
            color: #282828;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 19.8125rem;
            margin-bottom: 1.28125rem;
            hr{
                width: 5.21875rem;
                height: .03125rem;
          
                border:none;
                border-top:1px solid #d1d1d1;
            }
        }
        .inviteList{
            height: 10.9375rem;
            width: 19.53125rem;
            overflow-y: scroll;
            margin-left: .78125rem;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-top: 0.1rem;
            .box{
                text-align: left;
                display: block;
                height: 1.84375rem;
                width: 8.71875rem;
                margin-bottom: .9375rem;
                color: #190d23;
                font-weight: bold;
                font-size: .875rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                img{
                    height: 1.84375rem;
                    width: 1.84375rem;
                    margin-right: .625rem;
                    border-radius: 100%;
                }
            }
        }
    }
}

</style>