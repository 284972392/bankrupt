<template>  
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide><img src="../assets/images/banner1.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/banner2.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/banner3.png" alt=""></swiper-slide>      
      </swiper>


</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
      components: {
    swiper,
    swiperSlide
  },
    data() {
      return {
        swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          autoplay:true,
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
          },
          loop: true,
          slidesPerView: 'auto',
          loopedSlides: 3,
        
        }
      }
    }
  }
</script>

<style scoped>

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 16.875rem;
    height: 7.8125rem;
  }
  img{
      height: 100%;
      width: 100%;
  }
</style>