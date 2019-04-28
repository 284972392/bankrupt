<template>
	<div class="addCmpReadonly">
		<div class="addsuccess">添加商户成功！<span></span></div>
		<div class="title"><span>添加商户</span><Button type="primary" @click="giveRoad">发布渠道</Button></div>	
		<div class="cmpMerBase">
			<div class="merBack">
				<div class="mer_header">商户背景</div>
				<div>商户名称 <span>{{base.name}}</span></div>
				<div>商户类型<span>个人商户</span></div>
				<div>商户编号<span>{{base.id}}</span></div>
				<div>入驻时间<span>{{base.createTime}}</span></div>
				<div>商户简称<span>{{base.nickName}}</span></div>
				<div>所在地址<span>{{base.address}}</span></div>
				<div>所在行业<span>{{base.industry}}</span></div>
				<div>电话<span>{{base.mobiPhone}}</span></div>
				<div>QQ<span>{{base.qq}}</span></div>
				<div class="zhiZhao"><span>身份证</span><img :src=idPicOne alt="" /><img :src=idPicTwo alt="" /></div>
				<div class="merLogo"><span>个人头像</span> <img :src=base.headPic alt="" /></div>			
			</div>
			<div class="merPro">
			<div class="mer_proHeader">产品信息</div>
			<!--应用-->
			<div class="adhibitionBox" v-for="(adhibition,index) in proList">
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
			<!--网站信息-->
			<div class="adhibitionBox" v-for="(adhibition,index) in webList">
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
			<!--卡片信息-->
			<div class="adhibitionBox" v-for="(adhibition,index) in cardList">
				<div class="left">
					<div class="left_1">
						<div class="_left">卡片<span>{{index+1}}</span></div>
						<div class="_right"></div>
					</div>
					<div class="left_2">
						<div class="_left">卡片名称</div>
						<div class="_right">{{adhibition.name}}</div>
					</div>
					<div class="left_4">
						<div class="_left">卡片样式</div>
						<img :src=adhibition.logo alt="" />
					</div>
				</div>
				<div class="right">
					<div class="right_1">
						<div class="_left">卡片类型</div>
						<div class="_right">{{adhibition.cardType}}</div>
					</div>					
					<div class="right_2">
						<div class="_left">卡片链接</div>
						<div class="_right">{{adhibition.url}}</div>
					</div>
					<div class="right_3">
						<div class="_left">卡片特点</div>
						<div class="_right">{{adhibition.cardSpecialty}}</div>
					</div>
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 40px;display:  flex;justify-content: center;align-items: center;">
		<Button type="primary" @click="changeCmpMer">修改</Button>
			
		</div>

		
	</div>
	<!--发布任务弹框-->
             <Modal v-model="road" width="600" title="选择渠道类型" @on-ok="ok">
		      		<div>
					<span> 选择渠道：</span>		      			
		      			<Select v-model="firstLeval" clearable style="width:200px" @on-change = "firstChange">
		                        <Option v-for="item in domain" :value="item.id" :key="item.id">{{ item.label }}</Option>
		                 </Select>
		                 <Select v-model="secondLeval" clearable style="width:200px" @on-change = "secondChange">
		                        <Option v-for="item in domain2" :value="item.id" :key="item.id">{{ item.label }}</Option>
		                 </Select>

		      		</div>
		               <div style="margin-top: 20px;" v-if="product">
		               	<span>产品</span>
			               	<Select v-model="threeLeval" clearable style="width:200px">
			                        <Option v-for="item in domain3" :value="item.name+'*'+item.id" :key="item.id">{{ item.name }}</Option>

			                 </Select>
               					 	<Button @click="toAddPerson">添加产品</Button>
			                 
		               </div>
  		 	 </Modal>
	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				idPic:[],
				idPicOne:'',
				idPicTwo:'',
				//是否显示产品
				product:false,
				road:false,
            	//一级目录
            	domain:[
                         {
                            id:1,
                            label: '发布任务'
                            },
                             {
                            id: 2,
                            label: '发布优惠'
                            },
                            {
                            id:3,
                            label: '发布划算'
                            }
                    ],
                    //二级目录
                    domain2:[],
                    //产品列表
                    domain3:[],
                    //应用类型
                    proType:'',
                    firstLeval:'',
                    secondLeval:'',
                    threeLeval:'',
				proList:[],
				webList:[],
				cardList:[],
				base:{},		
				id:''
			}
		},
		methods:{
			toAddPerson(){
            	this.$router.push({path:'/addPersonMer',query:{id:this.id}})				
        	},
			firstChange(value){
        		if(value == 1){
        			this.product = true;
        			this.domain2 = [
                         {
                            id:1,
                            label: '应用赚'
                            },
                             {
                            id: 2,
                            label: '注册赚'
                            },
                            {
                            id:3,
                            label: '办卡赚'
                            }
        			]
        		};
        		if( value == 2){
        			this.product = false;
        			
        			this.domain2 = [
                         {
                            id:4,
                            label: '优惠券'
                            },
                             {
                            id: 5,
                            label: '福利红包'
                            },
                            {
                            id:6,
                            label: '免费课程'
                            }
        			]
        		};
        		if( value == 3){
        			this.product = false;
        			
        			this.domain2 = [
                         {
                            id:7,
                            label: '购买券'
                            },
                             {
                            id: 8,
                            label: '0元购'
                            },
                            {
                            id:9,
                            label: '特卖商城'
                            }
        			]
        		}
        	},
        	secondChange(value){
        		if (value == 1) {
        			this.proType = 1;
        		};
        		if (value == 2) {
        			this.proType = 2;
        		};
        		if (value == 3) {
        			this.proType = 3;
        		};
        		
        		this.get(this.allUrl.getProduct,{tanantId:this.id,type:this.proType}).then((res)=>{
            		this.domain3 = res.data.data.products
            		console.log(this.domain3)
            	})
        	},
			//发布渠道
			giveRoad(){
        		this.road = true;
				
			},
			changeCmpMer(){
            	this.$router.push({path:'/addPersonMer',query:{id:this.id}})				
			},
			ok(){
				//办卡赚跳转
				if (this.secondLeval == 3) {
					if (this.threeLeval == "") {
						this.$Message.warning("暂无办卡任务 请前往添加")
					}else{
            			this.$router.push({path:'/channel/task/addCardRoad',query:{name:this.threeLeval,id:this.id}})				
					}
				}


				 //跳转到发布任务页面
                   var typeS = ''
                if(this.secondLeval == 4){
                    typeS = '优惠券'
                }else if(this.secondLeval == 5){
                    typeS = '福利红包'
                }else if(this.secondLeval == 6){
                    typeS = '免费课程'
                }else if(this.secondLeval == 7){
                    typeS = '购买券'
                }else if(this.secondLeval == 8){
                    typeS = '0元购'
                }else if(this.secondLeval == 9){
                    typeS = '特卖商城'
                }else if(this.secondLeval == 1){
                    typeS = '应用赚'
                }else if(this.secondLeval == 2){
                    typeS = '注册赚'
                }

                if(this.secondLeval == 4||this.secondLeval == 5||this.secondLeval == 6){
                    this.$router.push({ path:'/shareDiscount',
                                query: {
                                   tenant:this.id,
                                   type:typeS
                                }
                                })
                }else if(this.secondLeval == 7||this.secondLeval == 8||this.secondLeval == 9){
                      this.$router.push({ path:'/addBargain',
                                query: {
                                   tenant:this.id,
                                   type:typeS
                                }
                                })
				}else if(this.secondLeval == 1||this.secondLeval == 2){
                    if(this.threeLeval==''){
                        this.$Message.warning('请选择产品!');
                    }else{
                         this.$router.push({ path:'/addTaskOne',
                                query: {
                                   tenant:this.id,
                                   pro:this.threeLeval,
                                   type:typeS
                                }
                                })
                    }
				}
				
				
			}
		},
		beforeMount(){
		},
		mounted(){
			this.id = this.$route.query.id;
			this.get(this.allUrl.findTenant,{tenantId:this.id}).then((res)=>{
				console.log(res)
				this.idPic = res.data.data.idCardPic.split(",")
				this.idPicOne = this.idPic[0];
				this.idPicTwo = this.idPic[1];
				this.base = res.data.data;
				let that = this;
				that.base.createTime = that.changeTime(that.base.createTime)
				this.base.children.forEach(function(i,index){
					i.endTime = that.changeTime(i.endTime)
					if (i.type == 1) {
						that.proList.push(i)
					}
					if (i.type == 2) {
						that.webList.push(i)
					}
					if (i.type == 3) {
						that.cardList.push(i)
					}
				});

			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
.addCmpReadonly{
	text-align: left;
	width: 100%;
	height: 97%;
	display: flex;
	flex-direction: column;
	.addsuccess{
		width: 100%;
		height: 30px;
		background: #6D6D72;
		color: white;
		font-size: 17px;
		line-height: 30px;
		span{
			display: block;
			width: 30px;
			height: 30px;
			float: right;
			background: url(../../../assets/cha.png) no-repeat center center;
			background-size: 100% 100%;
		}
	}
	.title{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #2C3E50;
		span{
			font-size: 18px;
			margin-left: 20px;
			font-weight: 600;
		}
		Button{
			float: right;
			margin-top: 10px;
			margin-right: 20px;
		}
	}
	.cmpMerBase{
		width: 100%;
		flex: 1;
		overflow-x: hidden;
		overflow-y: scroll;
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
}
</style>