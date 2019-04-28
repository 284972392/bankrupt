<template>
    <div class="styleList">
        <headBar :titleName='titleName' :isShow='true'></headBar>
        <classList></classList>
    </div>
</template>

<script>
import headBar from '@/components/head'
import classList from '@/pages/index/tabs'
    export default {
        components:{
			  headBar,classList
		  },
        data(){
            return{
                titleName:''
            }
        },
        beforeMount(){
            this.titleName = this.$route.query.title;
          
        }
    }
</script>

<style scoped lang='scss'>
    .styleList{
        height: 100%;overflow: scroll;
      .container{
          padding: 0;
          margin-top: 2.2rem;
        //   height: 36.5rem;
          overflow: scroll;
      }
    }
</style>    