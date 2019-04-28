

<template>
 

  <mu-bottom-sheet :open.sync="open" :overlay-close='false'>
    <div class="showContent">
        <div class="top">
            <img src="../../assets/images/quan50.png" alt="" @click="closeBottomSheet"> 
            <img src="../../assets/images/quan200.png" alt="" @click="closeBottomSheet">
        </div>
        <div class="close" @click="closeBottomSheet">
            关闭
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
        height: 16.9375rem;
        background: #ffffff;
        .top{
            height: 14.6875rem;
            width: 100%;
            padding: 1.125rem 1rem 0 1rem;
            img{
                height: 5rem;
                width: 21.4375rem;
                margin-bottom: 1.125rem;
            }
        }
        .close{
            height: 2.375rem;
            line-height: 2.375rem;
            width: 100%;
            background: #F4F4F4;
            font-size: .875rem;
            color: #666666;
            text-align: center;
        }
    }
</style>
