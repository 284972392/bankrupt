<template>
<div class="Troubleshoot">
    <headBar :titleName='titleName' :isShow='true'></headBar>
	<div class="content">
			<mu-container>
  <mu-expansion-panel :zDepth="1" :expand="panel === 'panel1'" @change="toggle('panel1')">
    <div class="header" slot="header">1. 商户排名前后与教育师资力量有关吗？</div>

    <p>    商户排名前后与教师师资力量无关。</p>
  </mu-expansion-panel>
  <mu-expansion-panel :zDepth="1" :expand="panel === 'panel2'" @change="toggle('panel2')">
    <div class="header" slot="header">2. 如何获得贡献值奖励？</div>
   <p>如何获得贡献值请在会员等级中查看。</p>
  </mu-expansion-panel>
  <mu-expansion-panel :zDepth="1" :expand="panel === 'panel3'" @change="toggle('panel3')">
    <div class="header" slot="header">3. 课程优惠信息与实际不符，怎么办？</div>
<p> APP中所有课程均由商家提供，我们尽可能的为用户筛选出最具性价比的优惠信息，如发现与实际不符，请立即与对应商家联系，我们也会给予全力协助。
</p>
  </mu-expansion-panel>
</mu-container>
	</div>

</div>
</template>

<script>
import headBar from '@/components/head'
	
	export default {
	    components:{
			  headBar
		  },
		data(){
			return{
				 panel: '',
				 titleName:"疑难解答"
				 
			}
		},
		  methods: {
		    toggle (panel) {
		      this.panel = panel === this.panel ? '' : panel;
		    }
  		}
	}
</script>

<style type="text/css" lang="scss">
	.mu-elevation-1 {
		    box-shadow: 0 2px 1px -1px rgba(0,0,0,.05), 0 1px 1px 0 rgba(0,0,0,.05), 0 1px 3px 0 rgba(0,0,0,.05);
}
</style>
<style scoped lang="scss">
.Troubleshoot{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.content{
		width: 100%;
		margin-top:2.95rem;
		.header{
			font-size: 0.87rem;
				color: #333333;
				letter-spacing: 0;
		}
		p{
			text-align: left;
			font-size: 0.75rem;
color: #888888;
letter-spacing: 0;
line-height: 1.12rem;
		}
	}
}
</style>