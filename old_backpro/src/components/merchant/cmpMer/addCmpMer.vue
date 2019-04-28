<template>
    <div class="addCmpMer">
        <div class="title">添加企业商户</div>
        <div class="secTitle">商户背景</div>
        
        <!-- @keydown.native.enter.prevent ="keyDownEvent" -->
        <Form ref="formItem" :model="background" :label-width="100" style="text-align:left;" @submit.native.prevent>
            <FormItem label="商户名称    *" prop='merName'>
                 <Input v-model="background.name" placeholder='请输入商户名称'></Input>
                 
            </FormItem>
            <FormItem label="商户类型">
                 <p style="color:#000;">企业商户</p>
            </FormItem>
            <FormItem label="商户简称       *" prop='merSurName'>
                 <Input v-model="background.nickName" placeholder='请输入商户简称'></Input>
            </FormItem>
            
            <FormItem label="所在地   *">
                  <Row>
                    <Col span="12">
                        <al-cascader v-model="addr" :placeholder="area"/>
                        <!-- <al-selector v-model="res_s"/> -->
                    </Col>
                    <Col span="12" offset="0">
                            <Input v-model="moreAddr" :placeholder="moreArea"></Input>
                    </Col>
                  </Row>
            </FormItem>

             <FormItem label="所在行业   *" prop='job'>
                <Select v-model="background.industry" style="width:200px;margin-bottom:15px;" placeholder='请选择所在行业'>
                    <Option v-for="item in jobList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="固定电话 " prop='phone'>
            	 <InputNumber v-model="background.telPhone" placeholder="请输入固定电话" ></InputNumber>
            	
                 <!--<Input v-model="background.telPhone" placeholder='请输入固定电话'></Input>-->
            </FormItem>
            <FormItem label="手机号码   *" prop='telephone'>
            	 <InputNumber v-model="background.mobiPhone" placeholder="请输入手机号码" ></InputNumber>
            	
                 <!--<Input v-model="background.mobiPhone" placeholder='请输入手机号码'></Input>-->
            </FormItem>
            <FormItem label="QQ" prop='QQ'>
            	 <InputNumber v-model="background.qq" placeholder="请输入商户QQ" ></InputNumber>
            	
                 <!--<Input v-model="background.qq" placeholder='请输入商户QQ'></Input>-->
            </FormItem>
            <FormItem label="营业执照编号 " prop='idcard'>
                 <Input v-model="background.idNum" placeholder='请输入营业执照编号'></Input>
                 <!--<Input v-model="background.idNum" placeholder='请输入营业执照编号'></Input>-->
            </FormItem>
            <!--上传工商营业执照-->
            <FormItem label="上传营业执照">
            		<lazy :time = '200'>
                   	 <addpic @update="businessLicense" @remove="removeIdPic" :size = 1 :defaultPic='background.idCardPic'></addpic>
                   </lazy>       
            </FormItem> 


    		
    		 <!--上传公司logo-->            
             <FormItem label="上传公司logo">
                   <lazy :time = '200'>
             		<addpic @update="cmpLogo" :size = '1' @remove="removeHeadPic" :defaultPic = "background.headPic" ></addpic>
             	</lazy>
             </FormItem>        
            <div class="secTitle">产品信息 <Button type="primary" icon="plus-round"  @click="addPro" class="add">添加</Button></div>
            
            <div class="btm">
            	<!--添加产品的列表-->
              <div class="addPromessage" v-for="(pro,index) in this.addList.proList">
	              	 <div class="proHeader">
	              	 	<div>应用<span>{{index+1}}</span></div>
	              	 	<div>----------------------------------------------------</div>
	              	 	<div @click="delate1(pro,index)"><span>删除</span></div>
	              	 </div>
              		 <div class="proBox">
		              	<FormItem label="应用名称  *">
		                 <Input v-model="pro.name" placeholder='请输入产品名称，例如‘淘宝’'></Input>
		                 </FormItem>
		                  <FormItem label="领域   *">
		                       <Select v-model="pro.field" clearable style="width:200px">
		                        <Option v-for="item in domain" :value="item.label" :key="item.id">{{ item.label }}</Option>
		                    </Select>
		                 </FormItem>
		                 <FormItem label="应用大小 *">
		                         <!--<Input v-model="pro.size" placeholder='请输入应用大小'>-->
            				    <InputNumber v-model="pro.size" placeholder="请输入应用大小" >

            				    	
            				    </InputNumber>
		                         <span>MB</span>
		                         	

		                         <!--</Input>-->
		                 </FormItem>
		
		                <FormItem label="应用特点  *">
          					  <Input v-model="pro.appSpecialty " type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="应用特点：如无毒，无广告"></Input>
       			  		 </FormItem>
		                 <!--上传应用logo-->            
		            	 <FormItem label="上传应用logo *">
                 		<!--<addpic @update="proLogo(index)" :size = 1></addpic>
                 		   <img :src="pro.logo" v-if="readOnly"/>-->
                 		   <addpic @update="proLogo(index)" @remove="removeProLogo(index)" :size = 1 :defaultPic = "pro.logo"></addpic>
                 		   
            			
		            	 </FormItem> 
				
		                 <FormItem label="应用域名 *" style="margin-top:20px;">
		                      <Button @click="addHost(index)">添加域名</Button>
		                      <table  border="1"  cellspacing="0" cellpadding="0" v-if="pro.table" align="center">
								<tr class="thd">
									<td>域名</td>
									<td>备案号</td>
									<td style="text-align: center;">到期日</td>
								</tr>
								<tr class="tft">
									<td>{{pro.url}}</td>
									<td>{{pro.record}}</td>
									<td>{{pro.endTime_}}</td>
								</tr>
							</table>
		                </FormItem>
		                <!--添加域名的会话弹框-->
					    <Modal
					        title="添加域名"
					        v-model="modal5"
					        @on-ok="ok5(pro)"
					        width="600"
					        class-name="hostBox">
					        	 <FormItem label="域名:   *" >
				          			  <Input v-model="addProHost.url" placeholder="请输入域名"></Input>
				      			  </FormItem>
				      			  <FormItem label="备案号：" >
				          			  <Input v-model="addProHost.record" placeholder="请输入备案号"></Input>
				      			  </FormItem>
				      			  <FormItem label="到期时间：">
						            <Row>
						                <Col span="11">
						                    <DatePicker type="date" placeholder="Select date" v-model="addProHost.endTime"></DatePicker>
						                </Col>						                
						            </Row>
						        </FormItem>
					    </Modal>
		              </div>
		             </div>
				<!--添加网站的列表-->
					 <div class="addWebmessage" v-for="(web,index) in this.addList.webList">
	              	 <div class="webHeader">
	              	 	<div>网站<span>{{index+1}}</span></div>
	              	 	<div>----------------------------------------------------</div>
	              	 	<div @click="delate2(index)"><span>删除</span></div>
	              	 </div>
              		 <div class="webBox">
		              	<FormItem label="网站名称       *">
		                 <Input v-model="web.name" placeholder='请输入网站名称'></Input>
		                 </FormItem>
		                  <FormItem label="领域       *">
		                       <Select v-model="web.field" clearable style="width:200px">
		                        <Option v-for="item in domain" :value="item.label" :key="item.id">{{ item.label }}</Option>
		                    </Select>
		                 </FormItem>	              
		                
		                <FormItem label="网站logo   *">
                 		   <!--<addpic @update="webLogo(index)" :size = 1></addpic>
                 		   <img :src="web.logo" v-if="readOnly"/>-->
                 		   <addpic @update="webLogo(index)" @remove="removeWebLogo(index)" :size = 1 :defaultPic = "web.logo"></addpic>
            			
		                </FormItem>
		
		                 <FormItem label="网站域名    *" style="margin-top:20px;">
		                      <Button @click="addHost2(index)">添加域名</Button>
		                      <table  border="1"  cellspacing="0" cellpadding="0" v-if="web.table">
								<tr class="thd">
									<td>域名</td>
									<td>备案号</td>
									<td style="text-align: center;">到期日</td>
								</tr>
								<tr class="tft">
									<td>{{web.url}}</td>
									<td>{{web.record}}</td>
									<td>{{web.endTime_}}</td>
								</tr>
							</table>
		                </FormItem>
		              </div>
		              <!--添加域名的会话弹框-->
					    <Modal
					        title="添加域名"
					        v-model="modal6"
					        @on-ok="ok6(web)"
					        width="600"
					        class-name="hostBox">
					        	 <FormItem label="域名:     *" >
				          			  <Input v-model="addWebHost.url" placeholder="请输入域名"></Input>
				      			  </FormItem>
				      			  <FormItem label="备案号：" >
				          			  <Input v-model="addWebHost.record" placeholder="请输入备案号"></Input>
				      			  </FormItem>
				      			  <FormItem label="到期时间：">
						            <Row>
						                <Col span="11">
						                    <DatePicker type="date" placeholder="Select date" v-model="addWebHost.endTime"></DatePicker>
						                </Col>						                
						            </Row>
						        </FormItem>
					    </Modal>
		             </div>
		             
		             <!--添加卡片列表-->
		             <div class="addCardmessage" v-for="(card,index) in this.addList.cardList">
	              	 <div class="cardHeader">
	              	 	<div>卡片<span>{{index+1}}</span></div>
	              	 	<div>----------------------------------------------------</div>
	              	 	<div @click="delate3(index)"><span>删除</span></div>
	              	 </div>
              		 <div class="cardBox">
		              	<FormItem label="卡片名称     *">
		                 <Input v-model="card.name" placeholder='请输入卡片名称'></Input>
		                 </FormItem>
		                  <FormItem label="卡片类型       *">
		                       <Select v-model="card.cardType " clearable style="width:200px">
		                        <Option v-for="item in domain2" :value="item.label" :key="item.id">{{ item.label }}</Option>
		                    </Select>
		                 </FormItem>	              
		                <FormItem label="卡片特点       *">
		                 <Input type="textarea" v-model="card.cardSpecialty " placeholder='请输入卡片特点'></Input>
		                 </FormItem>
		                 <FormItem label="卡片样式        *">
                 		   <!--<addpic @update="cardLogo(index)" :size = 1></addpic>
                 		   <img :src="card.logo" v-if="readOnly"/>-->
                 		   <addpic @update="cardLogo(index)" @remove="removeCardLogo(index)" :size = 1 :defaultPic = "card.logo"></addpic>
            			
		                 </FormItem>
		                <FormItem label="办卡链接地址       *">
		                 <Input type="textarea" v-model="card.url" placeholder='请输入任务链接地址'></Input>
		                </FormItem>
		              </div>
		             </div>
           	 </div>
	       <div v-if="!readOnly" class="subButton" @click="sub">保存</div>
	        <div v-if="readOnly" class="subButton" @click="changeSub">提交修改</div>
         </Form>
        <!--点击添加产品的会话框-->
         <Modal
        title="产品类型"
        v-model="modal1"
        @on-ok="ok1"
	    @on-cancel ='cancel1'    
        width="400"
        class-name="addPro">
        <Form>
        	<FormItem label="产品类型">
		          <Select v-model="addSelect" clearable style="width:200px">
		              <Option v-for="item in proType" :value="item.label" :key="item.value">{{ item.label }}</Option>
		          </Select>
		     </FormItem>
        </Form>
    </Modal>
	    <!--点击应用删除的会话弹框-->
	    <Modal
	        title="确认删除"
	        v-model="modal2"
	        @on-ok="ok2"
	        width="400"
	        class-name="delateBox">
	        <div>是否删除该条数据，如果删除，之前填写的数据将被清除，无法找回！</div>
	    </Modal>
	     <!--点击网站删除的会话弹框-->
	    <Modal
	        title="确认删除"
	        v-model="modal3"
	        @on-ok="ok3"
	        width="400"
	        class-name="delateBox">
	        <div>是否删除该条数据，如果删除，之前填写的数据将被清除，无法找回！</div>
	    </Modal>
	     <!--点击卡片删除的会话弹框-->
	    <Modal
	        title="确认删除"
	        v-model="modal4"
	        @on-ok="ok4"
	        width="400"
	        class-name="delateBox">
	        <div>是否删除该条数据，如果删除，之前填写的数据将被清除，无法找回！</div>
	    </Modal>
	    
    </div>
</template>

<script>
    import addpic from '@/common/update'
    import lazy from "@/common/plLazy";
    
    export default {
		components:{
            addpic,lazy
        },
        name:'',
        data(){	
            return{
            	flag:true,
            	flag2:true,
            	flag3:true,
            	delteNum:[],
            	proHost:false,
            	webHost:false,
            	dizhi:'',
            	readOnly:false,
            	//大概地址
            	area:"请选择省, 请选择市, 请选择县区, 选择街道",
            	//详细地址
            	moreArea:'请输入详细地址',
            	//应用大小
            	size:'',
            	//域名
            	hostName:'',
            	//备案号
            	contentProvider:"",
            	//到期时间
            	date:'',
            	//添加产品会话框是否显示
        	modal1:false,
        	//删除会话是否显示
        	modal2:false,
        	//删除网站会话
        	modal3:false,
        	//删除卡片会话
        	modal4:false,        	
        	//添加域名的弹框
        	modal5:false,
        	//网站添加域名弹框
        	modal6:false,
        	//将要删除的数据的下标，用作确认删除
        	willDelateIndex:'',
        	//连级地址
        	addr:[],
        	//详细地址
        	moreAddr:'',
        	 //行业选择
                    jobList:[
                            {
                            value: 1,
                            label: '实业'
                            },
                             {
                            value: 2,
                            label: '互联网'
                            }
                        ],
             //背景信息
             background:{
				  abbr: "",
				  address: "",
				  balance: 0,
				  createBy: "",
				  createTime: "",
				  headPic: "",
				  id: "",
				  idCardPic: "",
				  idNum: "",
				  industry: "",
				  inventory: "",
				  level: "",
				  mobiPhone: 0,
				  name: "",
				  nickName: "",
				  orderStr: "",
				  page: "",
				  qq: 0,
				  rows: "",
				  telPhone: "",
				  totalAmount: "",
				  type: "0",
				  children:[]
				},
        	//添加列表需要显示的数组：
        	addList:{
        		proList:[],
        		cardList:[],
        		webList:[]
        	},
        	//领域
                    domain:[],
             //卡片类型
             		domain2:[],
        	//产品类型
        	proType:[],
               //添加时弹框显示下拉
               addSelect:'',   
               //应用点击添加域名时，记录下标
               proHostIndex:'',
               webHostIndex:'',
               addProHost:{
               		url:'',
               		record:'',
               		endTime:''
               },
               addWebHost:{
               		url:'',
               		record:'',
               		endTime:''
               }
            }
        },
        update(){
        	
        },
        methods:{
            addPro(){
            this.modal1 = true
            },
            ok1(){            	        
            	if(this.addSelect == "应用"){
            		let a = {
            			operateType : "insert",
            			type:"1",
            			//应用logo1
            			logo:"",
            			//应用名称1
            			name:'',
            			//领域1
            			field :"",
            			//应用大小 1
            			size :"",
            			//应用特点
            			appSpecialty:"",
            			//域名1
            			url :'', 
            			//备案号1
            			record :'',
            			//到期时间1
            			endTime :'',
            			tenantId:null,
            			id:null,
            			cardType:"",
            			cardSpecialty:""
            			
            		}
						this.addList.proList.push(a)        			
            	}
            	if(this.addSelect == "卡片"){
            		let a = {
            			operateType : "insert",
            			type:"3",
            			//名称
            			name:'',
            			//卡片样式
            			logo:'',
            			//域名
            			url:'',
            			//卡片类型
            			cardType :"",
            			//卡片特点
            			cardSpecialty:'',
            			appSpecialty:'',
            			endTime:'',
            			field:"",
            			id:null,
            			record:'',
            			size:null,
            			tenantId:null
  
            		}
            		this.addList.cardList.push(a)
            	}
            	if(this.addSelect == "网站"){//网站
            		let a = {
            			operateType : "insert",
            			type:"2",
            			//到期时间
            			endTime :'',
            			//网站logo
            			logo:'',
            			//名字
            			name:'',
            			//领域
            			field:'',
						//域名1
            			url :'', 
            			//备案号1
            			record :'',
            			appSpecialty:'',
            			cardSpecialty:'',
            			cardType:"",
            			id:null,
            			size:null,
            			tenantId:null
            			
            		}
            		this.addList.webList.push(a)
            	}
            },
            //产品点击删除的确认键
            ok2(){
            	if (this.addList.proList[this.willDelateIndex].operateType == null) {
            		this.addList.proList[this.willDelateIndex].operateType = "delete";
            		this.delteNum.push(this.addList.proList[this.willDelateIndex])
            	}
            this.addList.proList.splice(this.willDelateIndex,1)
            	
            },
            //网站点击删除的确认键
            ok3(){
          	if (this.addList.webList[this.willDelateIndex].operateType == null) {
            		this.addList.webList[this.willDelateIndex].operateType = "delete";
            		this.delteNum.push(this.addList.webList[this.willDelateIndex])
            	}  	
            this.addList.webList.splice(this.willDelateIndex,1)
            },
            //卡片点击删除的确认键
            ok4(){
            	if (this.addList.cardList[this.willDelateIndex].operateType == null) {
            		this.addList.cardList[this.willDelateIndex].operateType = "delete";
            		this.delteNum.push(this.addList.cardList[this.willDelateIndex])
            	}
            this.addList.cardList.splice(this.willDelateIndex,1)
            },
            //添加域名确认
            ok5(){
            			this.addList.proList[this.proHostIndex].url = this.addProHost.url
            			this.addList.proList[this.proHostIndex].record = this.addProHost.record
            			this.addList.proList[this.proHostIndex].endTime = this.addProHost.endTime
            			this.addList.proList[this.proHostIndex].table = true
            			if (this.addList.proList[this.proHostIndex].endTime!=="") {
            				this.addList.proList[this.proHostIndex].endTime_ = this.changeTime(this.addList.proList[this.proHostIndex].endTime)
            			}

//						this.proHost = true
//					pro.endTime_ = this.changeTime(pro.endTime)
            },
            //网站添加域名确认
            ok6(){
         			   	this.addList.webList[this.webHostIndex].url = this.addWebHost.url
            			this.addList.webList[this.webHostIndex].record = this.addWebHost.record
            			this.addList.webList[this.webHostIndex].endTime = this.addWebHost.endTime
            			this.addList.webList[this.webHostIndex].table = true

						if (this.addList.webList[this.webHostIndex].endTime!=="") {
            				this.addList.webList[this.webHostIndex].endTime_ = this.changeTime(this.addList.webList[this.webHostIndex].endTime)
						}
				
				
//					this.webHost = true
//					web.endTime_ = this.changeTime(web.endTime)
					
            },
            cancel1(){
            	
            },
            delate1(pro,index){
            	this.modal2 = true
            	this.willDelateIndex = index
            },
            delate2(index){
            	this.modal3 = true
            	this.willDelateIndex = index
            },
            delate3(index){
            	this.modal4 = true
            	this.willDelateIndex = index

            },
            //应用类添加域名
            addHost(index){
            	this.proHostIndex = index
            	this.modal5 = true
            	
            	
            	this.addProHost.url = this.addList.proList[this.proHostIndex].url 
           		this.addProHost.record = this.addList.proList[this.proHostIndex].record  
      			this.addProHost.endTime = this.addList.proList[this.proHostIndex].endTime
            	
            	
            	
            },
            //网站类添加域名
            addHost2(index){
            	this.webHostIndex = index
            	this.modal6 = true
            	
            	
            	this.addWebHost.url = this.addList.webList[this.webHostIndex].url 
           		this.addWebHost.record = this.addList.webList[this.webHostIndex].record  
      			this.addWebHost.endTime = this.addList.webList[this.webHostIndex].endTime
            },       
            //营业执照上传
            businessLicense(){
            if(typeof(this.background.idCardPic)=="string"){
            		if (this.background.idCardPic !== "") {
            		this.background.idCardPic = this.background.idCardPic.split(',')
            		}else{
            			this.background.idCardPic = []
            		}
            	}
				this.background.idCardPic.push(this.$store.state.shareUrl.url)
               this.background.idCardPic =  this.background.idCardPic.toString()
                  
            },
             removeIdPic(){
            	this.background.idCardPic = ""
            },
            cmpLogo(){
                this.background.headPic  = this.$store.state.shareUrl.url
            },
            removeHeadPic(){
            	this.background.headPic = ""
            },
             proLogo(index){
                this.addList.proList[index].logo = this.$store.state.shareUrl.url
            },
            removeProLogo(index){
            	this.addList.proList[index].logo = ""
            },
            webLogo(index){
                this.addList.webList[index].logo = this.$store.state.shareUrl.url
            },
            removeWebLogo(index){
            	this.addList.webList[index].logo = ""
            	
            },
            cardLogo(index){
                this.addList.cardList[index].logo = this.$store.state.shareUrl.url
            	
            },
            removeCardLogo(index){
            	this.addList.cardList[index].logo = ""
            },
            changeSub(){
            	
            	let that = this;  
            	that.flag = true;
            	that.flag2 = true;
            	that.flag3 = true;
            	let children = that.addList.proList;
            	children = children.concat(that.addList.webList);
            	children = children.concat(that.addList.cardList);
            	children = children.concat(that.delteNum)
            	 that.background.children = children
            	 
            	 //表单验证
            	 if (that.background.name == "" || that.background.nickName == ""|| that.background.industry ==""||that.background.mobiPhone =="") {
                    that.$Message.warning('请完善表格信息，注意带  *  号的内容必填');
                    return;
            	}
            	

            	if(that.background.children.length!==0){
            		if (that.addList.proList.length!==0) {

            			that.addList.proList.forEach(function(i,index){
            				if (i.name == ""||i.field==''||i.size == ""||i.appSpecialty == ""||i.logo == ""||i.url == "") {
			                    that.$Message.warning('请完善添加的应用表格信息，注意带  *  号的内容必填');
			                    that.flag = false;
            				}
//          				else{
//          				that.flag = true;
//          				}

            			})
            		}
            		if (that.addList.webList.length!==0) {
            			that.addList.webList.forEach(function(i,index){
            				if (i.name == ""||i.field==''||i.logo == ""||i.url == "") {
			                    that.$Message.warning('请完善添加的网站表格信息，注意带  *  号的内容必填');
                 		   that.flag2 = false;
            				}
//          				else{
//          				that.flag2 = true;
//          				}
            			})
            			
            		}
            		if (that.addList.cardList.length!==0) {
            			that.addList.cardList.forEach(function(i,index){
            				if (i.name == ""||i.cardType==''||i.cardSpecialty == ""||i.logo == ""||i.url == "") {
                    			that.$Message.warning('请完善添加的卡片表格信息，注意带  *  号的内容必填');
			                    that.flag3 = false;
            				}
//          				else{
//          				that.flag3 = true;            					
//          				}
            			})
            			
            		}
            	}
//          	alert(that.flag)
            	if(that.flag == true&&that.flag2 == true&&that.flag3 == true){
            			var myPromise2 = new Promise(function(resolve,reject){	
			if (that.addr.length == 0) {
				 that.background.address = that.dizhi
			}else{
				//将详细地址打包一起送给天成
  				let a = "";
				that.addr.forEach(function(e){
					a += e.name
				});
				that.background.address = a +","+ that.moreAddr;										

			}
			resolve()

		})
            myPromise2.then(function(){
              	          	that.$http({
            		method:'POST',
            		url:that.allUrl.updateTenant,
            		headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:that.background
            	}).then((res)=>{
            		if(res.data.ret == "ok"){
							that.$router.push({path:'/addCmpMer/addCmpReadonly',query:{id:that.$route.query.id}})
						}
            	})
            })
            	}
            	 
            	 
	


            
            	
            },
            sub(){
            	let that = this
            	
            	that.flag = true;
            	that.flag2 = true;
            	that.flag3 = true;
            	let children = that.addList.proList;
            	children = children.concat(that.addList.webList);
            	children = children.concat(that.addList.cardList);
            	 that.background.children = children
            	 
            	 
            	if (that.background.name == "" || that.background.nickName == ""||that.addr == ""|| that.moreAddr ==""|| that.background.industry ==""||that.background.mobiPhone =="") {
                    that.$Message.warning('请完善表格信息，注意带  *  号的内容必填');
                    return;
            	}
            	

            	if(that.background.children.length!==0){
            		if (that.addList.proList.length!==0) {

            			that.addList.proList.forEach(function(i,index){
            				if (i.name == ""||i.field==''||i.size == ""||i.appSpecialty == ""||i.logo == ""||i.url == "") {
                    that.$Message.warning('请完善添加的应用表格信息，注意带  *  号的内容必填');
                    that.flag = false;
            				}
//          				else{
//          				that.flag = true;
//          				}

            			})
            		}
            		if (that.addList.webList.length!==0) {
            			that.addList.webList.forEach(function(i,index){
            				if (i.name == ""||i.field==''||i.logo == ""||i.url == "") {
			                    that.$Message.warning('请完善添加的网站表格信息，注意带  *  号的内容必填');
                 		   that.flag2 = false;
            				}
//          				else{
//          				that.flag2 = true;
//          				}
            			})
            			
            		}
            		if (that.addList.cardList.length!==0) {
            			that.addList.cardList.forEach(function(i,index){
            				if (i.name == ""||i.cardType==''||i.cardSpecialty == ""||i.logo == ""||i.url == "") {
                    			that.$Message.warning('请完善添加的卡片表格信息，注意带  *  号的内容必填');
			                    that.flag3 = false;
            				}
//          				else{
//          				that.flag3 = true;            					
//          				}
            			})
            			
            		}
            	}
					//条件满足进行请求提交
					if (that.flag == true&&that.flag2 == true&&that.flag3 == true) {
								    //验证无漏输入 进行提交         	
				var myPromise = new Promise(function(resolve,reject){	
					//将详细地址打包一起送给天成
		  				let a = "";
						that.addr.forEach(function(e){
							a += e.name
						});
						that.background.address = a +","+ that.moreAddr;										
					resolve()
				})
				myPromise.then(function(){
					console.log(that.background)
					//上传背景
				that.$http({
						method:'POST',
						url: that.allUrl.addTenant,
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						data:that.background
				}).then((res)=>{
					 console.log(res)
						if(res.data.ret == "ok"){
							that.$router.push({path:'/addCmpMer/addCmpReadonly',query:{id:res.data.data.id}})
						}
					})
		})
	}

            



            		
            		

            	
            	
            	
            	
            					
            					
            }
        },
        	mounted () {	
        		//产品列表查询
        		this.get(this.allUrl.findProperties).then((res)=>{
        			console.log(res)
        			    
        			this.proType = res.data.data.productType;
        			//领域类型搜索
					this.domain = res.data.data.field
        			  this.domain2 = res.data.data.cardType
        		})
            
            if (this.$route.query.id) {
            	this.readOnly = true;
            	this.get(this.allUrl.findTenant,{tenantId:this.$route.query.id}).then((res)=>{
				this.background = res.data.data;
				//将地址先存起来
				     this.dizhi = this.background.address
				let adds = [];
				adds = this.background.address.split(",")
				this.area = adds[0]
				this.moreArea= adds[1]
				
				
				
				let that = this;

				that.background.children.forEach(function(i,index){
					if (i.endTime !=="") {
						i.endTime = new Date(i.endTime)
						i.endTime_ = that.changeTime(i.endTime)
						}
					
					
					//将size转换为字符串
					i.size = String(i.size)
					if (i.type == 1) {
						i.table = true;
						that.addList.proList.push(i)

					}
					if (i.type == 2) {
							i.table = true;
						that.addList.webList.push(i)
					}
					if (i.type == 3) {
						that.addList.cardList.push(i)
					}
				});
				console.log(that.addList)
				
				
			})
            }
        	
        }

    }
</script>

<style scoped lang='scss'>


.ivu-form-item{
    width: 45%;
    margin-bottom: 0;
}
    .addCmpMer{
        width: 100%;
        height: 97%;
        overflow-y: auto;
        .title{
            line-height: 51px;height: 51px;width: 100%;
            padding-left: 40px;font-size: 28px;
            text-align: left;border-bottom:1px solid #000000;
        }
        .secTitle{
            padding-left: 5px;font-size: 20px;text-align: left;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
            .add{height: 30px;}
        }
        .btm{
            width: 100%;
            .addPromessage{
            	border-bottom: 1px solid darkcyan;
            	margin-bottom: 30px;
            	width: 100%;
            	.proHeader{
            		padding-left: 40px;
            		width: 500px;
            		height: 50px;
            		line-height: 50px;
            		display: flex;
            		div:nth-child(1){
            			color: #222222;
            			font-size: 15px;
            		}
            		div:nth-child(2){
            			width: 300px;
						text-align: center;
            		}
            		div:nth-child(3){
            			width: 100px;
            			display: flex;
            			justify-content: space-between;
						text-align: center;
						color: blue;
            		}
            	}
            	.proBox{
            		display: flex;
          			  width: 100%;         
           			 flex-wrap: wrap;
            	}
            }
            .addWebmessage{
            	border-bottom: 1px solid darkcyan;
            	width: 100%;
            	margin-bottom: 30px;
            	.webHeader{
            		padding-left: 40px;
            		width: 500px;
            		height: 50px;
            		line-height: 50px;
            		display: flex;
            		div:nth-child(1){
            			color: #222222;
            			font-size: 15px;
            		}
            		div:nth-child(2){
            			width: 300px;
						text-align: center;
            		}
            		div:nth-child(3){
            			width: 100px;
            			display: flex;
            			justify-content: space-between;
						text-align: center;
						color: blue;
            		}
            	}
            	.webBox{
            		display: flex;
          			  width: 100%;         
           			 flex-wrap: wrap;
            	}
            
            	
            }
            .addCardmessage{
            	width: 100%;
            	border-bottom: 1px solid darkcyan;
            	margin-bottom: 30px;
            	.cardHeader{
            		padding-left: 40px;
            		width: 500px;
            		height: 50px;
            		line-height: 50px;
            		display: flex;
            		div:nth-child(1){
            			color: #222222;
            			font-size: 15px;
            		}
            		div:nth-child(2){
            			width: 300px;
						text-align: center;
            		}
            		div:nth-child(3){
            			width: 100px;
            			display: flex;
            			justify-content: space-between;
						text-align: center;
						color: blue;
            		}
            	}
            	.cardBox{
            		display: flex;
          			  width: 100%;         
           			 flex-wrap: wrap;
            	}
            
            	
            }
        }
        
    }
    .hostBox .ivu-form-item{
    	width: 100%;
    }
  
    .subButton{
    	width: 100px;
    	height: 40px;
    	text-align: center;
    	line-height: 40px;
    	margin: 0 auto;
    	margin-top: 50px;
    	background: #007AFF;
    	color:#ffffff;
    	border-radius: 5px;
    }
    .ivu-input-number{
        width: 90% !important;
    }
</style>