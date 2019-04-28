<template>
 
<div class="head">
            <img src="http://image.miduoxing.cn/eb8857df-f482-4b6d-bb92-1fe5d8495db5" alt="" @click="back" v-if="isBack">
             {{this.titleName}}
        </div>

</template>

<script>
    export default {
          props:['titleName','isBack'],
  	
     methods:{
        back(){
          this.$router.go(-1)
        }
     }
    }
</script>

<style scoped lang='scss'>
       .head{
            height: 2.90625rem;
            z-index: 999;
            width: 100%;
            font-size: 1rem;
            color: #333;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            img{
                position: absolute;
                left: 1rem;
                top:.8125rem;
                height: 1.40625rem;
                width: .84375rem;
            }
        // background: -webkit-linear-gradient(left,#fb5c5b, #ff977d); /* Safari 5.1 - 6.0 */
        // background: -o-linear-gradient(left,#fb5c5b, #ff977d); /* Opera 11.1 - 12.0 */
        // background: -moz-linear-gradient(left,#fb5c5b, #ff977d); /* Firefox 3.6 - 15 */
        // background: linear-gradient(left,#fb5c5b, #ff977d); /* 标准的语法 */
        background: #f2f2f2;
        }
</style>