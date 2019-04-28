<template>
<!-- 清明活动 -->
    <div class="qmhd">
        <div class="head"></div>
        <div class="card">
            <p>您当前获得基数</p>
            <p>{{num}}</p>
        </div>
        <p class="connect">获奖者请联系小赚客服，微信号：miduoxing004</p>
                <div class="list2">
                 <div class="head2">
                     <hr>中奖名单<hr>
                 </div>
                 <div class="inviteList">
                     <div class="box" v-for="data in priceList">
                         <img :src="data.headImgUrl" alt="">
                         <span>{{data.nickName}}</span>
                         <p>{{data.prize==1?'一等奖':data.prize==2?'二等奖':'三等奖'}}</p>
                     </div>         
                 </div>
                 </div>

        <div class="mainContent">
            <p class="title">活动时间</p>
            <p class="title2">4月5日-4月8日</p>
            <p class="title">活动内容</p>
            <div class="hdnr">
                小赚又来发福利啦。在全名小赚完成<span class="pink">每日签到</span>、<span class="pink">任务</span>、<span class="pink">简单赚</span>、<span class="pink">邀请好友 </span>（首次关注）
                即可参与排行榜活动，排名前20可以获得精选实物礼品，福利满满，还不快快行动~
            </div>
            <p class="title">活动奖品</p>
            <div class="jpBox">
                <div class="box">
                    <img src="http://image.miduoxing.cn/null_caddcb36-44ed-4d06-9abe-ddb3d3aaf01c" alt="">
                    <div>
                        <p class="pTop">一等奖：3名</p>
                        <p>紫米面包 （一箱）</p>
                    </div>
                </div>
                <div class="box">
                    <img src="http://image.miduoxing.cn/null_b4644bb4-8425-498c-9719-62bfeb4d6b22" alt="" class="img2">
                    <div>
                        <p class="pTop">二等奖：7名</p>
                        <p>零食大礼包 （一箱）</p>
                    </div>
                </div>
                <div class="box">
                    <img src="http://image.miduoxing.cn/null_3f9fa178-ce50-492c-a138-be34cd1f301c" alt="">
                    <div>
                        <p class="pTop">三等奖：10名</p>
                        <p>香水菠萝 （一箱）</p>
                    </div>
                </div>
            </div>
            <p class="title">活动规则</p>
            <div class="hdnr">
                1.活动期间，用户完成的活动基数大于10，即可参加排名，任务包括签到、做任务、简单赚、邀请好友 （首次关注） 等。
            </div>
            <div class="hdnr">
                2.计算公式：活动基数=累计签到天数+做任务次数+简单赚任务+邀请好友个数（数据必须真实）
            </div>
            <div class="hdnr">
                3.获奖名单于4月9日统计并公布，请获得奖品的用户在4月11日前联系微信客服领取奖品，客服微信: <span class="pink">miduoxing004</span>,过期名额作废。
            </div>
            <div class="hdnr">
                4.本活动最终解释权归甘来科技有限公司所有。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                num:0,
                priceList:[]
            }
        },
        beforeMount() {
              this.oldSession3rd = this.$route.query.openId
                 let url = this.allUrl + '/taskRecord/getRewardBase'
                	this.$http.get(url+'?oldSession3rd='+this.oldSession3rd)
							.then((response)=>{
                              this.num = response.data.data
                        })
               let url2 = this.allUrl + '/wechatUserInfo/getWinner'
                 this.$http.get(url2).then((res)=>{
                     console.log(res.data.data.winner)
                     this.priceList = res.data.data.winner
                 })
               
        },
    }
</script>

<style scoped lang='scss'>
    .qmhd{
        width: 100%;
        height: 100%;
        background: #d4eff6;
        position: relative;
        overflow-y: scroll;
        .pink{color: #d23457;}
        .connect{
            line-height: 3rem;
            font-weight: bold;
            font-size: .9rem;
            color: #d23457;
        }
        .head{
            height: 18.75rem;
            width: 100%;
            background: url('http://image.miduoxing.cn/null_e1531b6e-726b-4b8a-94fb-841fe6ab0e81') no-repeat center center;
            background-size:100% 100%;
        }
         .list2{
         overflow: hidden;
        height: 27.25rem;
        width: 91%;
        margin-left: 4.5%;
        background: #fff;
        margin-bottom: 1.5rem;
        // margin-top: 2rem;
        border-radius: .15625rem;
         .head2{
            height: .96875rem;
            margin-left: .75rem;
            margin-top: 1.71875rem;
            font-size: .9375rem;
            font-weight: bold;
            color: #016e4e;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 19.8125rem;
            margin-bottom: 1.28125rem;
            hr{
                width: 7rem;
                height: .03125rem;
                border:none;
                border-top:1px solid #01704f;
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
                color: #190d21;
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
        .card{
            width: 89.2%;
            margin-left: 5.4%;
            margin-top: -4.125rem;
            border-radius: .46875rem;
            height: 6.875rem;
            text-align: center;
            background: #FFF;
            font-size: 1.875rem;
            color: #01704f;
            font-weight: bold;
            overflow: hidden;
            p:nth-child(1){
                margin-top: 1.625rem;
                margin-bottom: .9375rem;
                font-size: .9375rem;
            }
        }
        .mainContent{
             width: 89.2%;
            margin-left: 5.4%;
             border-radius: .46875rem;
             background: #bde4eb;
             margin: 1.25rem;
             margin-top: 1.6875rem;
             padding-top: 1.71875rem;
             padding-bottom: .5rem;
             margin-bottom: 2.03125rem;
             .title{
                 color: #01626b;
                 font-weight: bold;
                 font-size: .9375rem;
                 margin-bottom: .84375rem;
             }
             .title2{
                 font-size: .96875rem;font-weight: bold;
                 color: #000;margin-bottom: 1.4375rem;
             }
             .hdnr{
                 width: 100%;
                 padding: 0 1.875rem;
                 font-size: .78125rem;
                 font-weight: bold;
                 color: #000;
                 line-height: 1.46875rem;
                 margin-bottom: .78125rem;
                 text-align: left;
             }
             .jpBox{
                 width: 91.6%;
                 margin-left: 4.2%;
                 background: #d0eff2;
                 padding: 0 .5625rem;
                 margin-bottom: 1.5rem;
                 .box{
                     padding: .9375rem 0 1rem .96875rem;
                     border-bottom: .03125rem solid #94cdd6;
                     display: flex;
                     font-size: .9375rem;
                     font-weight: bold;
                     color: #000;
                     .img2{
                         margin-right: .84375rem;
                     }
                     img{
                         height: 6.4375rem;
                         width: 6.96875rem;
                         margin-right: 1.25rem;
                     }
                     
                     .pTop{
                         margin-top: 1.5rem;
                         margin-bottom: 1.09375rem;
                     }
                 }
                 .box:nth-child(3){
                     border:none;
                 }
             }
        }
    }
</style>