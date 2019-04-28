<template>
  	<div class="register">
  		<div class="formBox">
		   <el-tabs v-model="activeName" @tab-click="handleClick" class="aaaa">
		    <el-tab-pane label="注册为广告主" name="first">
		    	<hostRegister :message="activeName" @showLogin="fromChild"></hostRegister>
		    </el-tab-pane>
		    <el-tab-pane label="注册为媒体" name="second">
		    	<mediaRegister :message="activeName" @showLogin="fromChild"></mediaRegister>
		    </el-tab-pane>
		  </el-tabs>
  		</div>
  	</div>

</template>
<script>
import hostRegister from '@/components/hostRegister'
import mediaRegister from '@/components/mediaRegister'
export default {
  name: 'register',
  components: {
  	hostRegister,mediaRegister
  },
  data() {
    return {
			activeName:'first',
			flag:"",//定义个空值 存放从子组件传来的东西
    }
  },
  watch:{
			flag:function(newV,oldV){
						if (newV == 'showLogin') {
								this.flag = "";
								this.$emit("showLgin","showLogin")
						}
			}
  },
  methods: {
  	  handleClick(key, event) {
     },
     fromChild(data){

				this.flag = data
     }
  },
  created() {

  },
  mounted() {

  }
}
</script>
<style lang='scss' scoped>

	.register{
  position: absolute;
   top: 22.96%;
   left: 30%;
 height: 570px;
 width: 40%;
 min-width: 665px;
 background: #ffffff;
 border-radius: 10px;
 overflow: hidden;
 .formBox{
 	width: 100%;
 	height: 100%;
                 
	}
	.aaaa{
	}
	}


</style>
<style lang="scss">
	.aaaa{
		.el-tabs__header{
			.el-tabs__nav-wrap{
				padding-left: 50px;	
			}
		}
	}
</style>