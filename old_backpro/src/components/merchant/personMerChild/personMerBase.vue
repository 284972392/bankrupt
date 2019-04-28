<template>
	<div class="cmpMerBase">
		<div class="merBack">
			<div class="mer_header">商户背景</div>
			<div>商户名称 <span>{{base.name}}</span></div>
			<div>商户类型<span>个人商户</span></div>
			<div>商户编号<span>{{base.idNum}}</span></div>
			<div>入驻时间<span>{{base.createTime}}</span></div>
			<div>商户简称<span>{{base.nickName}}</span></div>
			<div>所在地址<span>{{base.address}}</span></div>
			<div>所在行业<span>{{base.industry}}</span></div>
			<div>固定电话<span>{{base.telPhone}}</span></div>
			<div>QQ<span>{{base.qq}}</span></div>
			<div class="zhiZhao"><span>头像</span><img :src=base.headPic alt="" /></div>
		</div>
		<div class="merPro">
			<div class="mer_proHeader">产品信息</div>
			<!--应用-->
			<div class="adhibitionBox" v-for="(adhibition,index) in addList.proList">
				<div class="left">
					<div class="left_1">
						<div class="_left">应用<span>{{index+1}}</span></div>
						<div class="_right"></div>
					</div>
					<div class="left_2">
						<div class="_left">应用名称</div>
						<div class="_right">{{adhibition.name}}</div>
					</div>
					<div class="left_3">
						<div class="_left">应用大小</div>
						<div class="_right">{{adhibition.size}}</div>
					</div>
					<div class="left_4">
						<div class="_left">应用logo</div>
						<img :src=adhibition.logo alt="" />
					</div>
				</div>
				<div class="right">
					<div class="right_1">
						<div class="_left">领域</div>
						<div class="_right">{{adhibition.field}}</div>
					</div>
					<div class="right_2">
						<div class="_left">应用特点</div>
						<div class="_right">{{adhibition.appSpecialty}}</div>
					</div>
					<div class="right_3">
						<div class="_left">应用域名</div>
						<div class="_right">
							<table  border="1"  cellspacing="0" cellpadding="0">
								<tr class="thd">
									<td>序号</td>
									<td>域名</td>
									<td>备案号</td>
									<td>到期日</td>
								</tr>
								<tr class="tft">
									<td>{{index+1}}</td>
									<td>{{adhibition.url}}</td>
									<td>{{adhibition.record}}</td>
									<td>{{adhibition.endTime}}</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!--网站-->
				<div class="adhibitionBox" v-for="(adhibition,index) in addList.webList">
				<div class="left">
					<div class="left_1">
						<div class="_left">网站<span>{{index+1}}</span></div>
						<div class="_right"></div>
					</div>
					<div class="left_2">
						<div class="_left">网站名称</div>
						<div class="_right">{{adhibition.name}}</div>
					</div>
					<div class="left_4">
						<div class="_left">网站logo</div>
						<img :src=adhibition.logo alt="" />
					</div>
				</div>
				<div class="right">
					<div class="right_1">
						<div class="_left">领域</div>
						<div class="_right">{{adhibition.field}}</div>
					</div>					
					<div class="right_3">
						<div class="_left">网站域名</div>
						<div class="_right">
							<table  border="1"  cellspacing="0" cellpadding="0">
								<tr class="thd">
									<td>序号</td>
									<td>域名</td>
									<td>备案号</td>
									<td>到期日</td>
								</tr>
								<tr class="tft">
									<td>{{index+1}}</td>
									<td>{{adhibition.url}}</td>
									<td>{{adhibition.record}}</td>
									<td>{{adhibition.endTime}}</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!--卡片-->
			<div class="adhibitionBox" v-for="(adhibition,index) in addList.cardList">
				<div class="left">
					<div class="left_1">
						<div class="_left">卡片<span>{{index+1}}</span></div>
						<div class="_right"></div>
					</div>
					<div class="left_2">
						<div class="_left">卡片名称</div>
						<div class="_right">{{adhibition.name}}</div>
					</div>
					<div class="left_3">
						<div class="_left">卡片类型</div>
						<div class="_right">{{adhibition.cardType}}</div>
					</div>
					<div class="left_4">
						<div class="_left">卡片样式</div>
						<img :src=adhibition.logo alt="" />
					</div>
				</div>
				<div class="right">
					<div class="right_1">
						<div class="_left">卡片特点</div>
						<div class="_right">{{adhibition.cardSpecialty}}</div>
					</div>					
					<div class="right_3">
						<div class="_left">办卡链接地址</div>
						<div class="_right">{{adhibition.url}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:["id_"],
		data(){
			return{
				id:'',
				base:{},
				addList:{
					proList:[],
					webList:[],
					cardList:[]
				}
			}
		},
		beforeMount(){
			
		},
		mounted(){
			this.id = this.id_;
			this.get(this.allUrl.findTenant,{tenantId:this.id}).then((res)=>{
				this.base = res.data.data
				console.log(this.base)
				this.base.createTime = this.changeTime(this.base.createTime)
				
				
				let that = this;
				that.base.children.forEach(function(i,index){
					//将size转换为字符串
					i.size = String(i.size)
					i.endTime = that.changeTime(i.endTime)
					if (i.type == 1) {
						that.addList.proList.push(i)
					}
					if (i.type == 2) {
						that.addList.webList.push(i)
					}
					if (i.type == 3) {
						that.addList.cardList.push(i)
					}
				});
				
				
			})

		}
	}
</script>

<style lang="scss" scoped>
 .cmpMerBase{
 	text-align: left;
 	width: 100%;
 	height: 80%;
 	overflow: auto;
 	.merBack{
 		width: 100%;
 		div{
 			width: 100%;
 			height: 50px;
 			line-height: 50px;
 			padding-left: 100px;
 			font-size: 20px;
 			color: #000000;
 			span{
 				color: gray;
 				margin-left: 30px;
 			}
 			img{
 				width: 100px;
 				height: 100px;
 			}
 		}
 		.zhiZhao{
 			width: 100%;
 			height: 150px;
 			/*line-height: 150px;*/
 			display: flex;
 			span{
 				display: block;
 				width: 130px;
 				height: 100%;
 				text-align: left;
 				line-height: 150px;
 				font-size: 20px;
 			color: #000000;
 			margin-left: 0;
 			}
			img{
				display: block;
				margin-top: 20px;
				width: 100px;
				height: 100px;
			
			}
 		}
 		.merLogo{
 			width: 100%;
 			height: 150px;
 			/*line-height: 150px;*/
 			display: flex;
 			span{
 				display: block;
 				width: 130px;
 				height: 100%;
 				text-align: left;
 				line-height: 150px;
 				font-size: 20px;
 			color: #000000;
 			margin-left: 0;
 			}
			img{
				display: block;
				margin-top: 20px;
				width: 100px;
				height: 100px;
			
			}
 		}
 		.mer_header{
 		height: 40px;
 		padding-left: 20px;
 		line-height: 40px;
 		font-size: 20px;
 		border-left: 10px solid deepskyblue;
 		margin-left: 50px;
 		margin-top: 30px;
 		}	
 	}	
 	.merPro{
 		width: 100%;
 		.mer_proHeader{
 		height: 40px;
 		padding-left: 20px;
 		line-height: 40px;
 		font-size: 20px;
 		border-left: 10px solid deepskyblue;
 		margin-left: 50px;
 		margin-top: 30px; 			
 		}
 		.adhibitionBox{
 			width: 100%;
 			display: flex;
 			padding-left: 100px;
 			margin-bottom: 40px;
 			.left{
 				flex: 1;
 				.left_1,.left_2,.left_3,.left_4{
 					margin-top: 20px;
 					width: 100%;
 					font-size: 17px;
 					display: flex;
 					._left{
 						width: 120px;
 						color: #000000; 						
 					}
 					._right{
 						flex: 1;
 						color:gray;
 					} 				
 					img{
 						width: 100px;
 						height: 100px;
 					}	
 				}
 				.left_1{
						font-weight: 600;
						._right{
						border-bottom: 1px dashed #ccc;	
						}
 				}
 			}
 			.right{
 				flex: 1;
 				padding-top: 40px;
 				padding-left: 20px;
 				.right_1,.right_2,.right_3{
 					margin-top: 20px;
 					width: 100%;
 					font-size: 17px;
 					display: flex;
 					._left{
 						width: 120px;
 						color: #000000; 						
 					}
 					._right{
 						flex: 1;
 						color:gray;
 					} 				
 				
 					
 				}
 				.right_3{
 					._right{
 						table{
 							text-align: center;
 							.thd{
 								color: #222222;
 								background: #cccccc;
 							}
 							.tft{
 								color: #333333;
 							}
 						}
 					}
 				}
 			}
 		}
 		
 	}
 }
</style>