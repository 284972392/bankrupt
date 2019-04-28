<template>
  <div class="hello">
		<div class="main">
					<router-view></router-view>
			</div>

<div class="navBar">
    <mu-container>
		  <mu-bottom-nav :value="bottomNav" color="#4BC1DD" @change='goRoute'>
		    <mu-bottom-nav-item value="/index"  title="首页" to="/index" icon="home"></mu-bottom-nav-item>
		    <mu-bottom-nav-item value="/studyAngle" title="学习角" to="/studyAngle" icon="school"></mu-bottom-nav-item>
		    <mu-bottom-nav-item value="/my" title="我的" to="/my" icon="person"></mu-bottom-nav-item>
		  </mu-bottom-nav>
		</mu-container>
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
	.navBar{
		z-index: 999;
		position: fixed;
		bottom: 0;
		width: 100%;
		height:3.5rem;
    box-shadow: 0 -0.0625rem 0.3125rem 0 rgba(203,203,203,0.50);
	}
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
