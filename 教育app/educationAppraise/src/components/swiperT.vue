

<template>
      <!-- swiper -->
     <swiper :options="swiperOption">
        <swiper-slide><img src="../assets/images/s1.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/s2.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/s3.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/s4.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/s5.png" alt=""></swiper-slide>
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
           slidesPerView: 'auto',
           freeMode: true,
          spaceBetween: 15,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        
        }
      }
    }
  }
</script>

<style scoped>

 
  img{
      height: 5.625rem;
  }
    .swiper-slide {
        
    width: 5.25rem;
  }
  .swiper-slide:nth-child(1) {
      margin-left: 1rem;
      width: 5.25rem;
  }

  .swiper-slide:nth-child(3) {
      width: 6.25rem;
  }
   .swiper-slide:nth-child(4) {
      width: 6.25rem;
  }
  .swiper-slide:nth-child(5) {
      width: 6.25rem;
      margin-right: 1rem;
  }
</style>