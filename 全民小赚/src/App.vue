<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>



export default {
  name: 'App'
}
</script>

<style>
@import "assets/reset.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.mu-step-label.active .mu-step-label-circle, .mu-step-label.completed .mu-step-label-circle {
    background-color: #ffffff;
    color: #f35a54;
    border: .03125rem solid #f35a54;
}
.mu-step-label.active .mu-step-label-icon, .mu-step-label.completed .mu-step-label-icon {
    color: #f35a54;
}
.mu-step-label-circle, .mu-step-label.disabled .mu-step-label-circle {
      background-color: #ffffff;
    color: #f35a54;
    border: .03125rem solid #f35a54;
}
.step .midBox .btBox .demo-vsteper-container .mu-step-label[data-v-704d3eed] {
    font-size: .96875rem;
    color: #333333 !important;
}
.mu-stepper-vertical{
    height: 12.7rem;
}

</style>
