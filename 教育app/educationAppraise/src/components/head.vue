<template>
	<div class="Head">
      <mu-icon size="30" value="chevron_left" v-if="this.isShow" @click="back" class="headBack"></mu-icon>
        {{this.titleName}}
	</div>
</template>

<script>
  export default {
        props:['titleName','isShow'],
  	
     methods:{
        back(){
          this.$router.go(-1)
        }
     }
  

 
  }
</script>

<style>
    .Head{
        position: fixed;
        top: 0;
        z-index: 999;
        height: 2.75rem;
        line-height: 2.75rem;
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0 .0625rem .3125rem 0 rgba(203,203,203,0.50);
        font-size: 1.06rem;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        font-weight: bold;
    }
    .headBack{
      position: absolute;
      left:1rem;
      top: .38rem;
    }
</style>