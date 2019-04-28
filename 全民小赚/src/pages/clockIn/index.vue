<style lang="scss" scoped>
       .zdHead{
            width: 100%;
            text-align: center;
            color: #000;
            font-weight: bold;
            border-bottom: .03125rem solid #000;
            height: 1.9375rem;
        }
        .zdList{
            height: 3.75rem;
            width: 100%;
            display: flex;
            align-items: center;
            font-size: .875rem;
            color: #000;
            font-weight: bold;
            img{
                height: 2.1875rem;
                width: 2.1875rem;
                border-radius: 100%;
                margin-right: .875rem;
            }
        }
</style>
<template>
<!-- 一周打卡挑战 -->
    <div class="clockIn">
        <img src="http://image.miduoxing.cn/9495250d-261e-435d-977a-5448eb8228d3" alt="" class="head">

            <div class="list2">
                 <div class="heads">
                     <hr>中奖名单<hr>
                 </div>
                 <div class="inviteList">
                     <div class="box" v-for="data in priceList">
                         <img :src="data.headImgUrl" alt="">
                         <span>{{data.nickName}}</span>
                         <p>{{data.price==30?'复联4电影票':data.price+'元'}}</p>
                     </div>         
                 </div>
             </div>

        <div class="card">
            <div class="top">已打卡：<span>{{amount}}</span>次</div>
            <div class="mid">
                <div class="box">
                    <span>我的积分</span>
                    <span>{{myScore}}</span>
                    <mu-button round class="lBtn" @click="clockIn"></mu-button>
                </div>
                <div class="box">
                    <span>战队积分</span>
                    <span>{{teamScore}}</span>
                    <mu-button round class="rBtn" @click="invite"></mu-button>
                </div>
            </div>
            <div class="btm">
                <span>我的战队:</span>
                    <div class="imgBox">
                        <img :src="data.headImgUrl" v-for="data in imgBox" alt="">
                        <span v-if="imgBox.length==0">暂无组队</span>
                    </div>
                <p><span v-if="imgBox.length==6">......</span></p>
                <div @click="checkAll" v-if="imgBox.length!==0">查看</br>全部</div>
            </div>
        </div>

        <div class="rule">
            <p class="title">活动时间</p>
            <p class="time">04月19日-04月25日</p>
            <p class="title">活动内容</p>
            <div class="box1">邀请好友加入打卡战队，每天完成任务完成打卡，完成任务越多，获得积分越高，所得现金奖励将越高，积分最高战队的前三名成员还可获得复仇者联盟4影票</div>
            <p class="title">活动奖品</p>
            <p>瓜分千元现金红包</p>
            <p class="cp">复仇者联盟电影票</p>
            <p class="title">活动规则</p>
            <div class="rBox">
                <p>1.通过邀请海报邀请好友加入战队（10人战队成</p>
                <p class="pl">立，上不封顶）</p>
            </div>
            <div class="rBox">
                <p>2.每日打卡（做任务）获得积分：1个任务=1分</p>
                <p class="pl">战队积分等于战队所有成员的积分总和</p>
            </div>
            <div class="rBox">
                <p>3.现金奖励：达到门槛的团队成员</p>
                <p class="pl">门槛：打卡次数≥5</p>
                <p class="pl">计算方式：随机金额×倍数</p>
                <p class="pl">随机金额：个人积分越高，随机金额越大</p>
                <p class="pl">倍数范围：1~10，倍数根据战队总积分计</p>
                <p class="pl">算，积分越高，倍数越大</p>
            </div>
            <div class="rBox">
                <p>4.复联电影票：总战队积分榜排名第一的战队，</p>
                <p class="pl">成员前三名获得复仇者联盟电影票一张；</p>
            </div>
            <div class="rBox">5.作弊、刷单等行为将失去奖励资格，请诚信参与</div>
            <div class="rBox">6.本活动最终解释权归杭州甘来科技有限公司所有</div>
        </div>

         <mu-dialog scrollable width="360" :open.sync="showDialog" dialog-class='dialogClass'>
             <div class="zdHead">我的战队（{{listBox.length}}人）</div>
             <div class="zdList" v-for="data in listBox">
                 <img :src="data.headImgUrl" alt="">
                 <p>{{data.nickName}}</p>
             </div>
        </mu-dialog>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                showDialog:false,
                amount:0,
                myScore:0,
                teamScore:0,
                imgBox:[

                ],
                listBox:[
 
                ],
                priceList:[

                ]
            }
        },
        methods:{
            clockIn(){
                  this.$router.push({
                path: '/index',
                query: {
                    openId:this.oldSession3rd,
                }
                })
            },
            invite(){
                this.$toast.info('请到公众号活动菜单中生成推广海报');
            },
            checkAll(){
                this.showDialog = true
            }
        },
          beforeMount() {
            this.oldSession3rd = this.$route.query.openId

                 let url = this.allUrl + '/taskRecord/getInviteTaskRecordList'
                 this.$http.get(url).then((res)=>{
                     this.priceList = res.data.data
                    console.log(res)
                 })
        },
        mounted(){
            
               	this.$http.get(this.allUrl+'/taskRecord/getIntegral?oldSession3rd='+this.oldSession3rd)
	        	.then((response)=>{
                     this.myScore = response.data.data.personIntegral;
                     this.teamScore = response.data.data.teamIntegral;
                     this.amount = response.data.data.taskSignIn;
                 })
                 this.$http.get(this.allUrl+'/wechatUserInfo/getTeamUser?oldSession3rd='+this.oldSession3rd)
	        	.then((response)=>{
                    this.listBox = response.data.data.teamUser;
                    this.imgBox = response.data.data.teamUser.slice(0,6);
                })
                 
        }        
    }
</script>

<style lang="scss" scoped>    
    .clockIn{
        height: 125.9375rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url('http://image.miduoxing.cn/null_ef1edcff-4592-4ba4-9377-1dee9aa6fc0a') no-repeat center center;
        background-size: 100% 100%; 
        .head{
            width: 100%;
            position: absolute;
            top: 0;
            z-index: 0;
        }
        .card{
            width: 88%;
            height: 21.5rem;
            background: #fff;
            border-radius: 1.03125rem;
            // margin-top: 20.625rem;
            z-index: 99;
            .top{
                width: 100%;
                height: 4.25rem;
                font-size: .90625rem;
                font-weight: bold;
                color: #333333;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: .03125rem solid #d0cdec;
                span{
                    color: #038794;
                    font-size: 1.53125rem;
                    margin: 0 0.2rem 0 0.1rem;
                }
            }
            .mid{
                width: 100%;
                height: 11.78125rem;
                display: flex;
               justify-content: space-around;
               .box{
                   width: 7.84375rem;
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   font-weight: bold;
                   color: #220c92;
                   span:nth-child(1){
                       font-size: .9375rem;
                       margin-top: 1.5625rem;
                       margin-bottom: 1.25rem;
                   }
                   span:nth-child(2){
                       font-size: 1.4375rem;
                       margin-bottom: 1.875rem;
                   }
                   .lBtn{
                       width: 100%;
                       height: 2.6875rem;
                        background: url('http://image.miduoxing.cn/d0899bea-1786-4ba4-a84e-f056a05688cf') no-repeat center center;
                       background-size: 100% 100%;
                   }
                   .rBtn{
                       width: 100%;
                       height: 2.6875rem;
                        background: url('http://image.miduoxing.cn/ec539c1e-f49c-41c1-b402-a28ae91e8904') no-repeat center center;
                       background-size: 100% 100%;
                   }
               }
            }
            .btm{
                height: 3.46875rem;
                background: #e7e4f9;
                width: 92%;
                margin-left: 4%;
                border-radius: .3125rem;
                font-size: .75rem;
                font-weight: bold;
                color: #343434;
                display: flex;
                align-items: center;
                padding: 0 .46875rem 0 .59375rem;
 
                span{
                    margin-right: .78125rem;
                }
                p{
                    margin: 0 .59375rem 0 .34375rem;
                    width: 1.09375rem;
                }
                .imgBox{
                    width: 8.875rem;
                    background: none;
                    border: none;
                    border-radius: 0;
                    text-align: left;
                    line-height: 1.68rem;
                }
                img{
                    height: 1.8125rem;
                    width: 1.8125rem;
                    margin-left: -0.34375rem;
                    border: .09375rem solid #fff;
                    border-radius: 100%;
                }
                div{
                    height: 2.28125rem;
                    width: 2.28125rem;
                    background: #fff;
                    border-radius: 100%;
                    border: .0625rem solid #000;
                    padding-top: .3125rem;
                }
            }
        }
        .rule{
            width: 88%;
            height: 51.78125rem;
            margin-top: 1.46875rem;
            border-radius: .625rem;
            background: rgba(255, 255, 255, 0.08);
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: .90625rem;
            color: #fff;
            line-height: 1.25rem;
            padding-top: 1.8125rem;
            .cp{
                margin: .375rem 0 2.0625rem 0;
            }
            .title{
                font-size: 1.0625rem;
                color: #89fff3;
                font-weight: bold;
                margin-bottom: 1.15625rem;
            }
            .time{
                font-size: 1.0625rem;
                color: #fff;
                font-weight: bold;
                margin-bottom: 2.125rem;
            }
            .box1{
                width: 84.21%;
                text-align: left;
                margin-bottom: 1.71875rem;
            }
            .rBox{
                width: 86.85%;
                line-height: 1.4rem;
                margin-bottom: .9375rem;
                text-align: left;
                font-size: .78125rem;
                .pl{
                    margin-left: .8125rem;
                }
            }
        }
          .list2{
              margin-top: 20.625rem;
              z-index: 999;
            overflow: hidden;
            height: 27.25rem;
            width: 88%;
            background: #fff;
            margin-bottom: 1.5rem;
            border-radius: .7625rem;
         .heads{
            height: .96875rem;
            margin-left: 1.75rem;
            margin-top: 1.71875rem;
            font-size: .9375rem;
            font-weight: bold;
            color: #5441aa;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 16.8125rem;
            margin-bottom: 1.28125rem;
            hr{
                width: 5.5rem;
                height: .03125rem;
                border:none;
                border-top:1px solid #d3cfe8;
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
                width: 95%;
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
    }
</style>