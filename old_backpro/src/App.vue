
<template>
  <div id="app">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'App',
  computed:mapGetters(['loading']),
  beforeMount() {
    // document.cookie="username=John Doe";
    // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },
}
</script>

<style>
@import "./assets/reset.css";

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
 
}
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
        
    }
    .ivu-spin-fix{z-index: 999 !important;}
</style>
