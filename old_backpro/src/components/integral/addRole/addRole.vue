<template>
	<div class="addRole">
		<Tabs value="name1">
	        <TabPane label="通用规则" name="name1">
	        	<!--通用规则-->
	        	<div class="TYRole">
	        		<div class="header">通用规则(注意填写完请点击保存)</div>
	        		<Form ref="formItem" :model="form1" :label-width="100" style="text-align:left;" @submit.native.prevent>
	        		<FormItem label="奖励形式    *" prop='merName'>
               				  <Select v-model="form1.rewardMode" clearable style="width:200px">
		                        <Option v-for="item in giftlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
		                    </Select>
         			</FormItem>
         			 <FormItem label="获取个数:   *" >
            			 <InputNumber v-model="form1.goldAmount" placeholder="请输入获取个数" ></InputNumber>
         			 	
	          			  <!--<Input v-model="form1.goldAmount" placeholder="请输入获取个数"></Input>-->
	      			  </FormItem>
	      			  <FormItem label="循环周期:   *" >
            			 <!--<InputNumber v-model="form1.cycele" placeholder="请输入循环周期" ></InputNumber>-->
	          			  <Input v-model="form1.cycle" placeholder="请输入循环周期"></Input>
	      			  </FormItem>
	      			  <FormItem label="是否启用:   *" >
	          			  <RadioGroup v-model="form1.status_">
					        <Radio label="是"></Radio>
					        <Radio label="否"></Radio>
					    </RadioGroup>
	      			  </FormItem>
     		   </Form>
     		   <div style="height: 36px;">
     		   		<Button type="primary" @click="TYsave">保存</Button>	
     		   </div>

	        	</div>
	        	
	        	
	        </TabPane>
	        <TabPane label="连续规则" name="name2">
	        	<!--连续规则-->
     		   <div class="LXRole">
	        		<div class="header">连续规则<span @click="addLxRole">添加规则</span></div>
	        		<Form ref="formItem" :model="form2" :label-width="100" style="text-align:left;" @submit.native.prevent>
	        			<div class="roleList" v-for="(data,index) in this.form2.ruleVoList">
	        				<span>第</span>
	        				<input v-model="data.startTime" type="text" placeholder="天数"/>
	        				<span>天至</span>
	        				<input v-model="data.endTime" type="text" placeholder="天数"/>
	        				<span>天签到，奖励</span>
	        				<input v-model="data.goldAmount" type="text" placeholder="金币数量"/>
	        				<span>金币，送</span>
	        				 <Select v-model="data.rewardMode" clearable style="width:200px">
		                        <Option v-for="item in giftlist2" :value="item.value" :key="item.value">{{ item.label }}</Option>
		                    </Select>
		                    <span v-if="index!==0" style="color: deepskyblue;" @click="delLXRole(index)">删除规则</span>
	        			</div>
	        			<FormItem label="是否启用:   *">
	          			  <RadioGroup v-model="form2.status_">
					        <Radio label="是"></Radio>
					        <Radio label="否"></Radio>
					    </RadioGroup>
	      			  </FormItem>
     		  	 	</Form>
     		   		<Button type="primary" @click="LXsave">保存</Button>	
     		  	 	
     		   </div>
	        </TabPane>
	        
	        
	        
	        <TabPane label="特定规则" name="name3">
	        	<!--累计规则-->
	        	<div class="LJRole">
	        		<div class="header">特定规则(暂时还未添加表单验证，请输入完整且正确的信息)<span @click="addLJRole">添加规则</span></div>
	        		<Form ref="formItem" :model="form3" :label-width="100" style="text-align:left;" @submit.native.prevent>
	        			<div class="roleList" v-for="(data,index) in form3.ruleVoList">
	        				<div class="top">
	        					<div>
			        						<span>{{index+1}}、连续签到，第</span>
			        						
			        				<input v-model="data.cycle" type="text" placeholder="天数"/>
			        				<span>天，奖励</span>
			        				 <!--<Select v-model="data.gift" clearable style="width:200px">
				                        <Option v-for="item in giftlist3" :value="item.label" :key="item.id">{{ item.label }}</Option>
				                   </Select>。-->
				                    <Select v-model="data.rewardMode_" multiple style="width:220px" @on-change="selectWT(data)"	>
		                                        <Option v-for="item in giftlist3" :value="item.value" :key="item.value" >{{ item.label }}</Option>
		                            </Select>。
				                    <span style="color: deepskyblue;" @click="delLJRole(index)">删除规则</span>
			        			
	        					</div>
	        				</div>
	        				<div class="bot">
	        					<!--金币-->
								<div class="gold" v-if="data.isGold">
									<div class="left">
										<span>金币</span>
										<span @click="addLog(data)">添加备注</span>
									</div>
									<div class="right">
										<div class="logList" v-for="(item1,index1) in data.goldList">
												<span>备注{{index1+1}}：适用条件</span>
												<Select v-model="item1.appCondition" style="width:220px" @on-change="selectCondition(item1,data)"	>
					                                 <Option v-for="item in condition" :value="item.value" :key="item.value" >{{ item.label }}</Option>
					                           </Select>
							                   <div v-if="item1.isBalance">
					                           	   <span>，抽中概率</span>
							        				<input v-model="item1.winRate" type="text" placeholder="概率"/>
													    <span>%,数量</span>
							        				<input v-model="item1.amount" type="text" placeholder="个数"/>
													    <span>个。</span>
								                    <span style="color: deepskyblue;" @click="delLog(data,index1)">删除备注</span>
									    
				                        	   </div>
					                           <div v-if="!item1.isBalance">
					                           	  <Select v-model="item1.symbol" style="width:220px"	>
					                                 <Option v-for="item in mathList" :value="item.label" :key="item.value" >{{ item.label }}</Option>
					                         	  </Select>
							        			 <input v-model="item1.base" type="text" placeholder="个数"/>
												<span>个，适用概率</span>
							        			<input v-model="item1.winRate" type="text" placeholder="概率"/>
												<span>%,数量</span>
							        			<input v-model="item1.amount" type="text" placeholder="个数"/>
												<span>个 。</span>
												<span style="color: deepskyblue;" @click="delLog(data,index1)">删除备注</span>
					                           </div>
										</div>
									
									</div>
									
									
									
								</div>
								<!--优惠券-->
								<div class="gold" v-if="data.isDiscount">
									<div class="left">
										<span>优惠券</span>
										<span @click="adddisLog(data)">添加备注</span>
									</div>
									<div class="right">
										<div class="logList" v-for="(item1,index1) in data.discountList">
												<span>备注{{index1+1}}：适用条件</span>
												<Select v-model="item1.appCondition" style="width:220px" @on-change="selectCondition(item1,data)"	>
					                                 <Option v-for="item in condition" :value="item.value" :key="item.value" >{{ item.label }}</Option>
					                           </Select>
							                   <div v-if="item1.isBalance">
					                           	   <span>，抽中概率</span>
							        				<input v-model="item1.winRate" type="text" placeholder="概率"/>
													    <span>%,数量</span>
							        				<input v-model="item1.amount" type="text" placeholder="个数"/>
													    <span>个。</span>
								                    <span style="color: deepskyblue;" @click="deldisLog(data,index1)">删除备注</span>
									    
				                        	   </div>
					                           <div v-if="!item1.isBalance">
					                           	  <Select v-model="item1.symbol" style="width:220px" 	>
					                                 <Option v-for="item in mathList" :value="item.label" :key="item.value" >{{ item.label }}</Option>
					                         	  </Select>
							        			 <input v-model="item1.base" type="text" placeholder="个数"/>
												<span>个，适用概率</span>
							        			<input v-model="item1.winRate" type="text" placeholder="概率"/>
												<span>%,数量</span>
							        			<input v-model="item1.amount" type="text" placeholder="个数"/>
												<span>个 。</span>
												<span style="color: deepskyblue;" @click="deldisLog(data,index1)">删除备注</span>
					                           </div>
										</div>
									
									</div>
									
									
									
								</div>
								<!--抽奖-->
								<div class="gold" v-if="data.isGift">
									<div class="left">
										<span>抽奖</span>
										<span @click="addgiftLog(data)">添加备注</span>
									</div>
									<div class="right">
										<div class="logList" v-for="(item1,index1) in data.giftList">
												<span>备注{{index1+1}}：适用条件</span>
												<Select v-model="item1.appCondition" style="width:220px" @on-change="selectCondition(item1,data)"	>
					                                 <Option v-for="item in condition" :value="item.value" :key="item.value" >{{ item.label }}</Option>
					                           </Select>
							                   <div v-if="item1.isBalance">
					                           	   <span>，抽中概率</span>
							        				<input v-model="item1.winRate" type="text" placeholder="概率"/>
													    <span>%,数量</span>
							        				<input v-model="item1.amount" type="text" placeholder="个数"/>
													    <span>个。</span>
								                    <span style="color: deepskyblue;" @click="delgiftLog(data,index1)">删除备注</span>
									    
				                        	   </div>
					                           <div v-if="!item1.isBalance">
					                           	  <Select v-model="item1.symbol" style="width:220px"	>
					                                 <Option v-for="item in mathList" :value="item.label" :key="item.value" >{{ item.label }}</Option>
					                         	  </Select>
							        			 <input v-model="item1.base" type="text" placeholder="个数"/>
												<span>个，适用概率</span>
							        			<input v-model="item1.winRate" type="text" placeholder="概率"/>
												<span>%,数量</span>
							        			<input v-model="item1.amount" type="text" placeholder="个数"/>
												<span>个 。</span>
												<span style="color: deepskyblue;" @click="delgiftLog(data,index1)">删除备注</span>
					                           </div>
										</div>
									
									</div>
									
									
									
								</div>
								<!--金币翻倍-->
								<div class="gold" v-if="data.isDBGold">
									<div class="left">
										<span>金币翻倍</span>
										<span @click="addgoldLog(data)">添加备注</span>
									</div>
									<div class="right">
										<div class="logList" v-for="(item1,index1) in data.GoldDBList">
												<span>备注{{index1+1}}：适用条件</span>
												<Select v-model="item1.appCondition" style="width:220px" @on-change="selectCondition(item1,data)"	>
					                                 <Option v-for="item in condition" :value="item.value" :key="item.value" >{{ item.label }}</Option>
					                           </Select>
							                   <div v-if="item1.isBalance">
					                           	   <span>，抽中概率</span>
							        				<input v-model="item1.winRate" type="text" placeholder="概率"/>
													    <span>%,翻</span>
							        				<input v-model="item1.amount" type="text" placeholder="个数"/>
													    <span>倍。</span>
								                    <span style="color: deepskyblue;" @click="delgoldLog(data,index1)">删除备注</span>
									    
				                        	   </div>
					                           <div v-if="!item1.isBalance">
					                           	  <Select v-model="item1.symbol" style="width:220px" >
					                                 <Option v-for="item in mathList" :value="item.label" :key="item.value" >{{ item.label }}</Option>
					                         	  </Select>
							        			 <input v-model="item1.base" type="text" placeholder="个数"/>
												<span>个，适用概率</span>
							        			<input v-model="item1.winRate" type="text" placeholder="概率"/>
												<span>%,翻</span>
							        			<input v-model="item1.amount" type="text" placeholder="个数"/>
												<span>倍。</span>
												<span style="color: deepskyblue;" @click="delgoldLog(data,index1)">删除备注</span>
					                           </div>
										</div>
									
									</div>
									
									
									
								</div>
	        				</div>
	        			</div>
	        			<FormItem label="是否启用:   *">
	          			  <RadioGroup v-model="form3.status_">
					        <Radio label="是"></Radio>
					        <Radio label="否"></Radio>
					    </RadioGroup>
	      			  </FormItem>
	        		</Form>
     		   		<Button type="primary" @click="TDsave">保存</Button>	
	        		
	        	</div>
	        </TabPane>
    	</Tabs>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				startTime:"",
				endTime:"",
				//是否选取余额
				isYe:true,
				form1:{
					id:1,
					ruleRemarkVoList:[],
					ruleVoList:[],
					typeDetail:0
				},
				status:"",
				form2:{
					id:2,
					ruleVoList:[{}],
					typeDetail:1
				},
				form3:{
					id:3,
					ruleVoList:[
					{
						goldList:[],
						discountList:[],
						giftList:[],
						GoldDBList:[]
					}
],
					typeDetail:2
				},
				giftlist:[
            		{
            			value:1,
            			label:"金币"
            		},
            		{
            			value:0,
            			label:"无"
            		}
            	],
            	giftlist2:[
            		{
            			value:1,
            			label:"优惠券"
            		},
            		{
            			value:2,
            			label:"抽奖"
            		}
            	],
            	giftlist3:[
            		{
            			value:"0",
            			label:"金币"
            		},
            		{
            			value:"3",
            			label:"金币翻倍"
            		},
            		{
            			value:"1",
            			label:"优惠券"
            		},
            		{
            			value:"2",
            			label:"抽奖"
            		}
            	],
            	//适用条件
            	condition :[
            		{
            			value:1,
            			label:"无"
            		},
            		{
            			value:2,
            			label:"金币余额"
            		}
            	],
            	mathList:[
            		{
            			value:1,
            			label:">"
            		},
            		{
            			value:2,
            			label:"<"
            		},
            		{
            			value:3,
            			label:">;="
            		},
            		{
            			value:4,
            			label:"<;="
            		}
            	]
			}
		},
		methods:{
			//通用规则保存
	
			TYsave(){
				console.log(this.form1.goldAmount)
				if(this.form1.cycle == ""|| this.form1.cycle == undefined ||this.form1.goldAmount == undefined||this.form1.goldAmount == null||this.form1.rewardMode ==undefined||this.form1.status_ == undefined){
					this.$Message.warning("请填写完整")
					return;
				}
				if (this.form1.status_ == "否") {
					this.form1.status = 0
				}
				if(this.form1.status_ == "是"){
					this.form1.status = 1
				}
				this.$http({
						method:'POST',
						url: this.allUrl.updateRule,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:this.form1
					}).then((res)=>{

					})
			},
			LXsave(){
				let that = this;
				let flag1 = true;
				
				this.form2.ruleVoList.forEach(function(i,index){
					
					if (i.startTime == ""||i.startTime == undefined||i.endTime == ""||i.endTime == undefined||i.goldAmount == ""||i.rewardMode == undefined) {
						that.$Message.warning("请填写完整信息")
						flag1 = false;
					}
					i.cycle = i.startTime + ";" + i.endTime
				})
				if (this.form2.status_ == undefined) {
						that.$Message.warning("是否启用")
						return;
				}else{
					if(this.form2.status_ == "是"&&this.form1.status_ == "否"){
						that.$Message.warning("如果启用连续规则必须启用通用规则")
						flag1 = false
					}
				}
				if (this.form2.status_ == "否") {
					this.form2.status = 0
				}
				if(this.form2.status_ == "是"){
					this.form2.status = 1
				}
				if(flag1 == true){
					this.$http({
						method:'POST',
						url: this.allUrl.updateRule,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:this.form2
					}).then((res)=>{

					})
				}
				
			},
			TDsave(){
				let flag2 = true;
				
				if (this.form3.status_ == "否") {
					this.form3.status = 0
				}
				if(this.form3.status_ == "是"){
					this.form3.status = 1
					if (this.form1.status_ == "否"||this.form2.status_ == "否") {
						this.$Message.warning("如果启用特定规则必须启用通用规则和连续规则")
						flag2 = false
					}
				}
				
				this.form3.ruleVoList.forEach(function(i,index){
					 i.ruleRemarkVoList  = i.goldList.concat(i.discountList)
					 i.ruleRemarkVoList  = i.ruleRemarkVoList.concat(i.giftList)
					 i.ruleRemarkVoList  = i.ruleRemarkVoList.concat(i.GoldDBList)
					 i.rewardMode = i.rewardMode_.join(";")

				})
				if(flag2 == true){
					this.$http({
						method:'POST',
						url: this.allUrl.updateRule,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:this.form3
					}).then((res)=>{

					})
				}
				
			},
			//下拉选择
			selectWT(data){
				if(data.rewardMode_.indexOf("0") == -1 ){
							data.isGold = false
				}else{
							data.isGold = true
				};
				if(data.rewardMode_.indexOf("1") == -1 ){
							data.isDiscount = false
				}else{
							data.isDiscount = true
				};
				if(data.rewardMode_.indexOf("2") == -1 ){
							data.isGift = false
				}else{
							data.isGift = true
				};
				if(data.rewardMode_.indexOf("3") == -1 ){
							data.isDBGold = false
				}else{
							data.isDBGold = true
				};

				

//				data.gift.forEach(function(i,index){
//					console.log(i)
//						if (i == "金币") {
//							data.isGold = true
//						}
//						
////						if (i !== "金币") {
//
////							
////						}
//				})
			},
			//使用条件选择
			selectCondition(item1,data){
				console.log(data)
				data.goldList.forEach(function(i,index){
					i.appCondition = item1.appCondition;
					if (i.appCondition == 1 ||i.appCondition == "") {
					i.winRate = "100"
					i.isBalance = true
				}else{
					i.isBalance = false

				}
				})
				data.discountList.forEach(function(i,index){
					i.appCondition = item1.appCondition;
					if (i.appCondition == 1 ||i.appCondition == "") {
					i.winRate = "100"
					i.isBalance = true
				}else{
					i.isBalance = false

					
				}
				})
				data.giftList.forEach(function(i,index){
					i.appCondition = item1.appCondition;
					if (i.appCondition == 1 ||i.appCondition == "") {
					i.isBalance = true;
					i.winRate = "100"
				}else{
					i.isBalance = false

					
				}
				})
				data.GoldDBList.forEach(function(i,index){
					i.appCondition = item1.appCondition;
					if (i.appCondition == 1 ||i.appCondition == "") {
					i.winRate = "100"
					i.isBalance = true
				}else{
					i.isBalance = false

					
				}
				})
				
			},
			//添加连续规则
			addLxRole(){
				this.form2.ruleVoList.push({})
			},
			//删除连续规则
			delLXRole(index){
				this.form2.ruleVoList.splice(index,1)
				
			},
			//添加金币备注
			addLog(data){
				console.log(data)
				if(data.goldList == undefined){
					data.goldList=[]
				}
//				if (data.goldList.length == 0 &&) {
					data.goldList.push(
					{
						isBalance:true,
						rewardType:0
					}
				)
//				}else{
//					this.$Message.warning("试用条件为无，只有一条备注")
//				}
				
				
			},
			//添加优惠券备注
			adddisLog(data){
//				if (data.discountList.length == 0) {
					data.discountList.push(
					{
						isBalance:true,
						rewardType:1
					}
					)
//				}else{
//					this.$Message.warning("试用条件为无，只有一条备注")
//				}
				
			},
			//添加抽奖备注
			addgiftLog(data){
//				if(data.giftList.length == 0){
					data.giftList.push(
					{
						isBalance:true,
						rewardType:2
					}
					)
//				}else{
//					this.$Message.warning("试用条件为无，只有一条备注")
//				}
				
			},
			//添加金币翻倍备注
			addgoldLog(data){
//				if (data.GoldDBList.length == 0) {
					data.GoldDBList.push(
					{
						isBalance:true,
						rewardType:3
					}
					)
//				}else{
//					this.$Message.warning("试用条件为无，只有一条备注")
//				}
				
			},
			//删除备注
			delLog(data,index1){
				if (data.goldList.length == 1) {
					this.$Message.warning("留个活路")
					
				}else{
				data.goldList.splice(index1,1)
				}
			},
			//删除优惠备注
			deldisLog(data,index1){
				if (data.discountList.length == 1) {
					this.$Message.warning("留个活路")
					
				}else{
				data.discountList.splice(index1,1)
				}
			},
			//删除抽奖备注
			delgiftLog(data,index1){
				if (data.giftList.length == 1) {
					this.$Message.warning("留个活路")
					
				}else{
				data.giftList.splice(index1,1)
				}
			},
			//删除金币翻倍备注
			delgoldLog(data,index1){
				if (data.GoldDBList.length == 1) {
					this.$Message.warning("留个活路")
					
				}else{
				data.GoldDBList.splice(index1,1)
				}
			},
			
			//累计规则添加
			addLJRole(){
				this.form3.ruleVoList.push({
						goldList:[],
						discountList:[],
						giftList:[],
						GoldDBList:[]
				})
			},
			//删除累计规则
			delLJRole(index){
				if (this.form3.ruleVoList.length == 1) {
					this.$Message.warning("留个活路")
				}else{
				this.form3.ruleVoList.splice(index,1)
				}

			},
		},
		mounted(){
			this.get(this.allUrl.findRuleList).then((res)=>{
				console.log(res.data.data)
				let that = this;
				 	res.data.data.forEach(function(i,index){
					if (i.status == 0) {
						i.status_ = "否"
					}
					if (i.status == 1) {
						i.status_ = "是"
					};
					i.rewardMode = Number(i.rewardMode);
					i.ruleVoList.forEach(function(e,index){
						e.parentId = e.parentId;
						e.rewardMode_ = e.rewardMode.split(";");
							e.goldList = []
							e.discountList = []
							e.giftList = []
							e.GoldDBList = []

						e.ruleRemarkVoList.forEach(function(k,index){
							if (k.rewardType == 0) {
								e.goldList.push(k)
							}
							if (k.rewardType == 1) {
								e.discountList.push(k)
							}
							if (k.rewardType == 2) {
								e.giftList.push(k)
							}
							if (k.rewardType == 3) {
								e.GoldDBList.push(k)
							}
						})
					});
					if (i.typeDetail == 0) {
						that.form1 = i
					}
					if (i.typeDetail == 1) {
						that.form2 = i;
						that.form2.ruleVoList.forEach(function(i,index){
						i.rewardMode = Number(i.rewardMode)
						
						let a = i.cycle.split(";")
						i.startTime = a[0]
						i.endTime = a[1]
					})
					}
					if (i.typeDetail == 2) {
						that.form3 = i;
						that.form3.ruleVoList.forEach(function(i,index){
						i.ruleRemarkVoList.forEach(function(j,index){

							if (j.appCondition == 1||j.appCondition == "") {
								j.isBalance = true
							}else{
								j.isBalance = false
							}
							if (j.rewardType == 0) {
								i.isGold = true
							
							}else{
								i.isGold = false
							}
							if (j.rewardType == 1) {
								i.isDiscount = true
							}else{
								i.isDiscount = false
							}
							if (j.rewardType == 2) {
								i.isGift = true
							}else{
								i.isGift = false
							}
							if (j.rewardType == 3) {
								i.isDBGold = true
							}else{
								i.isDBGold = false
							}
						})
					})
					}
					
					
					
				})
				 	

					
						
				 	
			})
		},
//		mounted(){
//					
//						}
		}

</script>

<style scoped="scoped" lang="scss">
.ivu-select-multiple{
	width: 120px!important;
	.ivu-select-selection{
				width: 100%!important;
			}
}
.ivu-select-single{
	width: 70px!important;
	.ivu-select-selection{
				width: 100%!important;
			}
}
.ivu-select-multiple .ivu-select-selection{
	width: 100%!important;
}

.addRole{
	width: 100%;
	height: 100%;
}
.ivu-tabs{
	width: 100%;
	height: 100%;
}
.TYRole{
	width: 100%;
	height: 230px;
	display: flex;
	flex-direction: column;
	.header{
            padding-left: 5px;font-size: 20px;text-align: left;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
        
	}
	.ivu-form{
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		div{
			width: 50%;
		}
	}
}
.LXRole{
	width: 100%;
	height: 500px;
	overflow-x: hidden;
	overflow-y: scroll;
	.header{
            padding-left: 5px;font-size: 20px;text-align: left;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
            span{
            	margin-left: 30px;
            	font-size: 15px;color: deepskyblue;
            }
        
	}
	.roleList{
		color: #000000;
		width: 100%;
		height: 70px;
		margin-left: 100px;
		font-size: 16px;
		display: flex;
		align-items: center;
		input{
			width: 60px;
			height: 25px;
			margin-left: 5px;
			margin-right: 5px;
		}
	}
}
.LJRole{
	width: 100%;
	height: 700px;
	overflow-x: hidden;
	overflow-y: scroll;
	.header{
            padding-left: 5px;font-size: 20px;text-align: left;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
            span{
            	margin-left: 30px;
            	font-size: 15px;color: deepskyblue;
            }
        
	}
	.roleList{
		color: #000000;
		width: 100%;
		padding-left: 100px;
		font-size: 16px;
		.top{
			height: 80px;
			width:100%;
			div{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
					input{
					width: 60px;
					height: 25px;
					margin-left: 5px;
					margin-right: 5px;
					}
			
		}
		}
		.bot{
			width: 100%;
			.gold{
				width: 100%;
				display: flex;
			font-size: 16px;
			color:#000000;
			.left{
				height: 40px;
				display: flex;
				align-items: center;
				span:nth-child(1){

				font-weight: 600;
				font-size: 18px;
			}
			span:nth-child(2){
				color: deepskyblue;
				margin-left: 10px;
				margin-right: 10px;
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				.logList{
					height: 40px;

					display:flex;
					align-items: center;

					/*.ivu-select-multiple{
					width: 170px!important;
					}*/

					div{
					display: flex;
					input{
						width: 60px;
						height: 25px;
						margin-left: 5px;
						margin-right: 5px;
						}
			}
				}
				
			}
		
			
			}
			
		}
		
	}
}
</style>