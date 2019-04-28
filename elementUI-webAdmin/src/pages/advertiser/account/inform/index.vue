<template>
   <section class="pd20">
	
    <div class="formBox">
		   <el-tabs v-model="activeName" @tab-click="handleClick" class="aaaa">
		    <el-tab-pane label="客户信息" name="first">
					<customerInformation></customerInformation>
		    </el-tab-pane>
		    <el-tab-pane label="资质管理" name="second">
					<qualificationManagement></qualificationManagement>
		    </el-tab-pane>
		  </el-tabs>
  		</div>
  	</section>
</template>

<script>
import customerInformation from './customerInformation/index.vue'
import qualificationManagement from './qualificationManagement/index.vue'
	
    export default {
        name:'inform2',
        components:{
        	customerInformation,qualificationManagement
        },
        data(){
        	return{
        		activeName:"first",
        	}
        },
        methods:{
        	 handleClick(key, event) {
     			},
        }
    }
</script>

<style scoped lang="scss">
.pd20{
	width: 100%;
 	height: 100%;
 	padding: 20px;
 
}
 .formBox{
 	width: 100%;
 	height: 100%;
 	background: #ffffff;
 }
</style>
<style lang="scss">
	.aaaa{
		.el-tabs__header{
			.el-tabs__nav-wrap{
				padding-left: 50px;	
				.el-tabs__item{
					font-size: 18px;
				}
			}
		}
	}
</style>