<template>
    <div class="footer">
            <p class="info1">Copyright&copy;夏伏科技有限公司</p>
            <p class="info2">邮箱xxx@xxxxx.com 电话： （0571） xxxxx</p>
            <!-- <div class="secretary"></div> -->
    </div>
</template>

<script>
    export default {
        name:'foot'
    }
</script>

<style scoped lang='scss'>
        .footer{
            position: relative;
            margin-top: 20px;
            width: 100%;
            height: 100px;
           
        }
      .info1{
                font-size: 20px;color: #727272;margin-top: 20px;
            }
            .info2{
                font-size: 20px;color: #727272;margin-top: 10px;
            }
            .secretary{
                height: 100px;width: 369px;background: #fce7e7;
                position: absolute;right: 0;bottom: 0;
                box-shadow: -5px -5px 5px #8c8c8c;
            }
</style>    