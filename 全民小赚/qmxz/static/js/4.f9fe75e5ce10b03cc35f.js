webpackJsonp([4],{"785U":function(t,s){},Fgwz:function(t,s){},VPW1:function(t,s){},omtV:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("bOdI"),a=e.n(i),o={props:["size","defaultPic"],data:function(){return{url:"",imgName:"",visible:!1,uploadList:[],defaultList:[]}},methods:{handleView:function(t){this.imgName=t,this.visible=!0},handleRemove:function(t,s){var e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1),this.$store.state.imgIndex=s,this.$emit("remove")},handleError:function(t,s,e){this.$toast.error("上传失败")},handleSuccess:function(t,s,e){s.url="http://"+s.response.data[0],this.$store.state.shareUrl=s,this.$emit("update")},handleFormatError:function(t){this.$toast.error("文件格式错误")},handleMaxSize:function(t){this.$toast.error("文件过大")},handleBeforeUpload:function(){var t=this.uploadList.length<this.size;if(!t){this.size;this.$toast.error("最多上传五张")}return t}},mounted:function(){this.uploadList=this.$refs.upload.fileList},beforeMount:function(){var t=this,s=this.allUrl+"/uploadPic/uploadPic";(this.url=s,void 0!=this.defaultPic)&&(""==this.defaultPic||this.defaultPic.split(",").map(function(s){var e={url:s};t.defaultList.push(e)}))}},n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"58px"},attrs:{"show-upload-list":!1,"on-success":t.handleSuccess,"on-error":t.handleError,format:["jpg","jpeg","png","gif","mp4","avi"],"default-file-list":t.defaultList,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"with-credentials":!0,"before-upload":t.handleBeforeUpload,multiple:"",type:"drag",action:t.url}},[e("div",{staticStyle:{padding:"20px 0"}},[e("Icon",{attrs:{type:"ios-cloud-upload",size:"20"}}),t._v(" "),e("p",{staticClass:"p1"},[t._v("上传任务截图")]),t._v(" "),e("p",{staticClass:"p2"},[t._v("仅支持png、jpg格式，最多上传5张")])],1)]),t._v(" "),e("div",{staticClass:"listContent"},t._l(t.uploadList,function(s,i){return e("div",{staticClass:"demo-upload-list"},["finished"===s.status?[e("img",{attrs:{src:s.url}}),t._v(" "),e("div",{staticClass:"demo-upload-list-cover"},[e("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(e){t.handleRemove(s,i)}}}),t._v(" "),e("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(e){t.handleView(s.url)}}})],1)]:[s.showProgress?e("Progress",{attrs:{percent:s.percentage,"hide-info":""}}):t._e()],t._v(" "),e("mu-dialog",{attrs:{open:t.visible},on:{"update:open":function(s){t.visible=s}}},[t.visible?e("img",{staticStyle:{width:"100%"},attrs:{src:t.imgName}}):t._e()])],2)}),0)],1)},staticRenderFns:[]};var l=e("VU/8")(o,n,!1,function(t){e("VPW1")},null,null).exports,r={components:{headBar:e("2Hch").a,addpic:l},data:function(){var t;return t={placeholder:"请输入手机号或相应信息",info:{},showPic:"",picModel:!1,status:0,id:null,detailImg:[]},a()(t,"status",null),a()(t,"phone",null),a()(t,"picList",[]),t},methods:{showpic:function(t){this.showPic=t,this.picModel=!0},upImg:function(){this.picList.push(this.$store.state.shareUrl.url)},removeImg:function(){var t=this.$store.state.imgIndex;this.picList.splice(t,1)},init:function(){var t=this,s=this.allUrl+"/easyMake/getEasyMake?oldSession3rd="+this.oldSession3rd+"&easyMakeId="+this.id;this.$http.get(s).then(function(s){console.log(s),t.info=s.data.data,t.detailImg=s.data.data.strategyPic.split(";"),t.status=s.data.data.status,t.placeholder=s.data.data.cation})},submit:function(){console.log(this.status),this.phone?0!=this.picList.length?this.sub():this.$toast.error("请上传任务截图"):this.$toast.error("请输入手机号或相应信息")},sub:function(){null==this.status?this.save():this.change()},save:function(){var t=this,s=this.picList.join(";"),e={easyMakeId:this.id,voucherUrl:s,phone:this.phone,openId:this.oldSession3rd,status:2};this.$http({url:this.allUrl+"/easyMakeRecord/saveEasyMakeRecord",method:"post",data:e}).then(function(s){console.log(s),"1"==s.data.resultCode&&(t.$toast.success("提交成功"),t.status=2)})},change:function(){var t=this,s=this.picList.join(";"),e={easyMakeId:this.id,voucherUrl:s,phone:this.phone,openId:this.oldSession3rd,status:2};this.$http({url:this.allUrl+"/easyMakeRecord/updateEasyMakeRecord",method:"post",data:e}).then(function(s){console.log(s),"1"==s.data.resultCode&&(t.$toast.success("提交成功"),t.status=2)})}},beforeMount:function(){this.oldSession3rd=this.$route.query.openId,this.id=this.$route.query.id,this.init()}},u={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"updatePic"},[e("headBar",{attrs:{titleName:"上传凭证",isBack:"true"}}),t._v(" "),e("div",{staticClass:"explain"},[e("p",[t._v("任务说明")]),t._v(" "),e("p",[t._v(t._s(t.info.easyMakeExplain))]),t._v(" "),e("div",{staticClass:"picContent"},t._l(t.detailImg,function(s){return e("img",{attrs:{src:s,alt:""},on:{click:function(e){t.showpic(s)}}})}),0)]),t._v(" "),e("div",{staticClass:"f5"}),t._v(" "),e("div",{staticClass:"btmContent"},[e("mu-text-field",{attrs:{placeholder:t.placeholder},model:{value:t.phone,callback:function(s){t.phone=s},expression:"phone"}}),t._v(" "),e("addpic",{attrs:{size:5},on:{update:t.upImg,remove:t.removeImg}}),t._v(" "),e("mu-flex",{staticStyle:{margin:".7rem 0"},attrs:{"justify-content":"center","align-items":"center"}},[e("mu-button",{directives:[{name:"show",rawName:"v-show",value:null==t.status||6==t.status||1==t.status,expression:"status==null||status==6||status==1"}],attrs:{color:"#FF7C74","full-width":"",textColor:"#fff"},on:{click:t.submit}},[t._v("提交审核")]),t._v(" "),e("mu-button",{directives:[{name:"show",rawName:"v-show",value:2==t.status,expression:"status==2"}],attrs:{color:"#D4D4D4","full-width":"",textColor:"#fff"}},[t._v("已上传任务凭证，审核中…")])],1),t._v(" "),t._m(0)],1),t._v(" "),e("mu-dialog",{attrs:{width:"360",open:t.picModel},on:{"update:open":function(s){t.picModel=s}}},[e("img",{staticStyle:{height:"100%",width:"100%"},attrs:{src:t.showPic,alt:""}})])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("温馨提示：审核时间需要 "),s("span",{staticClass:"pick"},[this._v("3")]),this._v(" 个工作日，审核完毕后，奖励将自动打到您的个人账户中，金额前往“"),s("span",{staticClass:"pick"},[this._v("钱包")]),this._v("”模块中查看")])}]};var c=e("VU/8")(r,u,!1,function(t){e("785U"),e("Fgwz")},"data-v-d9b62d88",null);s.default=c.exports}});
//# sourceMappingURL=4.f9fe75e5ce10b03cc35f.js.map