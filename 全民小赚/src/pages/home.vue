<template>
  <div class="hello">
		<div class="main">
					<router-view></router-view>
			</div>


  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
    	bottomNav: '/index',
    	a:true
    }
  },
  methods:{
    goRoute(data){
    	  this.bottomNav = data
    }
},
created(){
	this.bottomNav = this.$route.path;

}
}
</script>


<style scoped>
.container{
  padding: 0;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
.hello{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main{
  flex: 1;
  /* overflow: hidden; */
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 .625rem;
}
a {
  color:  #ABABAB;
}
</style>
