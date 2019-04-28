<template>
	<div class="studyAngle">
		 <headBar :titleName='titleName' :isShow='false'></headBar>
		 <div class="swiper">
			 	 <swiper></swiper>
		 </div>
		<tab></tab>
		<div class="add" @click="toRelease">
			<img src="../../assets/images/add.png"/>
		</div>
	</div>
</template>

<script>
import headBar from '@/components/head'
import swiper from '@/components/swiperT'
import tab from './tab'
	export default {
		 components:{
			  headBar,swiper,tab
		  },
		     data() {
      return {
     	 titleName:'社区交流'

      }
    },
    methods:{
    	toRelease(){
    		this.$router.push("/release")
    	}
    }
	}
</script>

<style lang='scss'>
	.studyAngle{
		height: 100%;
		overflow: scroll;
		padding-top: 2.75rem;
		padding-bottom: 3.5rem;
		.swiper{
			height: 7.625rem;
			width: 100%;
			padding: 1rem 0 1rem 0;
			background: #ffffff;
			margin-bottom: .5rem;
		}
		.add{
			width: 4.12rem;
			height: 4.12rem;
			position: fixed;
			right: 0;
			bottom: 5.12rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	
</style>