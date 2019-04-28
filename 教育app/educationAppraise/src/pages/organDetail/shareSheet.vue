<template>
  <mu-bottom-sheet :open.sync="open" :overlay-close='false'>
    <div class="showContent">
        <div class="top">
            <div class="top1">
                <div class="box" @click="closeBottomSheet">
                    <img src="../../assets/images/wx.png" alt="">
                    <span>微信</span>
                </div>
                <div class="box" @click="closeBottomSheet">
                    <img src="../../assets/images/qq.png" alt="">
                    <span>QQ</span>
                </div>
                <div class="box" @click="closeBottomSheet">
                    <img src="../../assets/images/wb.png" alt="">
                    <span>微博</span>
                </div>
            </div>
            <div class="top2">
                <div class="box" @click="closeBottomSheet">
                    <img src="../../assets/images/pyq.png" alt="">
                    <span>朋友圈</span>
                </div>
                <div class="box" @click="closeBottomSheet">
                    <img src="../../assets/images/kj.png" alt="">
                    <span>QQ空间</span>
                </div>
            </div>
        </div>
        <div class="close" @click="closeBottomSheet">
            取消
        </div>
    </div>
  </mu-bottom-sheet>

</template>


<script>
export default {
  props: {
  open: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      
    }
  },
  methods: {
    closeBottomSheet () {
     this.$emit("close")
    }
    
  }
}
</script>

<style lang='scss' scoped>
    .showContent{
        width: 100%;
        height: 15rem;
        background: #ffffff;
        .top{
            height: 11.875rem;
            width: 100%;
            padding: 1.3125rem 2.5rem 0 2.5rem;
            .top1{
                    width: 100%;margin-bottom: .5rem;
                    display: flex;justify-content: space-between;
                }
            .top2{
                width: 100%;
                    display: flex;justify-content: space-around;
                }
            .box{
                width: 2.875rem;
                height: 4.5625rem;
                text-align: center;
                img{
                    height: 2.875rem;width: 2.875rem;margin-bottom: .4375rem;   
                }
                 span{
                        font-size: .8rem;color: #888888;
                    }
            }
        }
        .close{
            height: 3.125rem;
            line-height: 3.125rem;
            width: 100%;
            background: #F4F4F4;
            font-size: .875rem;
            color: #666666;
            text-align: center;
        }
    }
</style>
