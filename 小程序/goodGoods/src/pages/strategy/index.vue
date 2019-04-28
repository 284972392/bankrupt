<template>
    <div class="strategy">
        <div class="bb1">
            <div class="top">
                <img src="../../images/q1.png" alt="">
                <img src="../../images/tt1.png" alt="">
            </div>
            <div class="btm">
                <img src="../../images/a1.png" alt="">
                <p>
                    悠享好货是集合拼多多官方授权、商品种类齐全的优惠券免费分发平台，并且购物后还能享受佣金返现。切记在去拼多多购物之前，要来悠享好货领取相应优惠券哦
                </p>
            </div>
        </div>
        <div class="bb1">
            <div class="top">
                <img src="../../images/q2.png" alt="">
                <img src="../../images/tt2.png" alt="" style="width:340rpx;">
            </div>
            <div class="btm">
                <img src="../../images/a2.png" alt="">
                <p>
                  请记住7个字“<span>购物之前先领券</span>”，只要在平台商城购物就能领券省钱，特色专区、精品分类、高额优惠，反正都要买，领券更划算，操作详情如下：
                </p> 
            </div>
            <img src="http://image.miduoxing.cn/1eb52cd7-920b-4ce0-bb33-b3be4864b34e" alt="" class="step">
        </div>
         <div class="bb1">
            <div class="top">
                <img src="../../images/q3.png" alt="">
                <img src="../../images/tt3.png" alt="" style="width:340rpx;">
            </div>
            <div class="btm">
                <img src="../../images/a3.png" alt="">
                <p>
                  请记住7个字“ <span>分享好友拿佣金</span> ”，分享邀请新用户就有机会赚钱，只要好友完成购物，你和好友都能拿到相应的佣金，佣金由悠享好货官方替你发放，分享越多，佣金越高。操作详情如下：
                </p> 
            </div>
            <img src="http://image.miduoxing.cn/2ec53285-0cb5-41f7-8a4e-4984b4e90068" alt="" class="step">
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    page{
  height: 100%;
   background: #f4f4f4;
}
</style>

<style scoped lang="scss">
    .strategy{
        height: 100%;width: 100%;
        background: #FFFFFF;
        .bb1{

            width: 100%;
            box-sizing: border-box;
            border-bottom: 1px solid #EEEEEE;
            padding: 32rpx 0 28rpx 30rpx;
            .top{
                display: flex;
                align-items: center;margin-bottom: 30rpx;
                img:nth-child(1){
                    width: 52rpx;height: 52rpx;
                }
                img:nth-child(2){
                    margin-left: 24rpx;
                   height: 42rpx;width: 250rpx;
                }
            }
            .btm{display: flex;
                img:nth-child(1){
                    width: 52rpx;height: 52rpx; margin-right: 24rpx;
                }
                p{
                    width: 572rpx;font-size: 26rpx;color: #333333;
                    span{color: #E65454;}
                }
            }
        .step{
            width: 646rpx;height: 2104rpx;margin-left: 20rpx;margin-top: 22rpx;
        }
        }
    }
</style>