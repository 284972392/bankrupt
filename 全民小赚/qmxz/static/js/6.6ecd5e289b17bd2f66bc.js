webpackJsonp([6],{gu8U:function(t,a){},"iT+H":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={components:{headBar:s("2Hch").a},data:function(){return{id:null,status:0,showPic:"",picModel:!1,startModel:!1,showReson:!1,data:{},detailImg:[]}},methods:{checkReson:function(){this.showReson=!0},showpic:function(t){this.picModel=!0,this.showPic=t},init:function(){var t=this,a=this.allUrl+"/easyMake/getEasyMake?oldSession3rd="+this.oldSession3rd+"&easyMakeId="+this.id;this.$http.get(a).then(function(a){console.log(a.data.data.status),t.data=a.data.data,t.detailImg=a.data.data.strategyPic.split(";"),t.status=a.data.data.status})},starMisson:function(){var t=this,a=this.allUrl+"/easyMake/getEasyMake?oldSession3rd="+this.oldSession3rd+"&easyMakeId="+this.id;this.$http.get(a).then(function(a){null==a.data.data.status?t.save():window.location.href=t.data.easyMakeLink})},save:function(){var t=this,a={easyMakeId:this.id,voucherUrl:null,phone:null,openId:this.oldSession3rd,status:1};this.$http({url:this.allUrl+"/easyMakeRecord/saveEasyMakeRecord",method:"post",data:a}).then(function(a){console.log(a),"1"==a.data.resultCode&&(t.status=1),window.location.href=t.data.easyMakeLink})},goPushPic:function(){this.$router.push({path:"/updatePic",query:{openId:this.oldSession3rd,id:this.data.easyMakeId}})}},beforeMount:function(){this.oldSession3rd=this.$route.query.openId,this.id=this.$route.query.id,this.init()},mounted:function(){this.init()}},e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"simpleDetail"},[s("headBar",{attrs:{titleName:"简单赚详情",isBack:"true"}}),t._v(" "),s("div",{staticClass:"top"},[s("img",{staticClass:"icon",attrs:{src:t.data.listPic,alt:""}}),t._v(" "),s("div",{staticClass:"mid"},[s("p",[t._v(t._s(t.data.easyMakeName?t.data.easyMakeName:t.data.name))]),t._v(" "),s("p",[t._v("任务限时: "),s("span",{staticClass:"pick"},[t._v(t._s(t.data.expirationMin))]),t._v(" 分钟")]),t._v(" "),s("p",[t._v(t._s(t.data.characteristics))])]),t._v(" "),s("div",{staticClass:"right"},[s("span",{staticClass:"pick"},[t._v(t._s(t.data.singlePrice))]),t._v(" 元        \n            ")])]),t._v(" "),s("div",{staticClass:"notice"},[s("p",[t._v("注意事项说明")]),t._v(" "),s("p",[t._v("必须是新用户首次完成任务，按照要求操作上传真实正确截图。任务开始后限时"+t._s(t.data.expirationMin)+"分钟，超时任务失效，一个任务只能领取一次，上传截图一次。")])]),t._v(" "),s("div",{staticClass:"notice2"},[s("p",[t._v("任务步骤及截图说明")]),t._v(" "),s("p",[t._v(t._s(t.data.easyMakeExplain))]),t._v(" "),s("div",{staticClass:"imgContent"},t._l(t.detailImg,function(a,i){return s("div",[s("img",{attrs:{src:a,alt:""},on:{click:function(s){t.showpic(a)}}}),t._v(" "),s("span",[t._v("第"+t._s(i+1)+"步")])])}),0)]),t._v(" "),s("div",{staticClass:"btm"},[s("mu-flex",{attrs:{"justify-content":"center","align-items":"center"}},[null==t.status?s("mu-button",{attrs:{color:"#FF7C74",textColor:"#fff"},on:{click:function(a){t.startModel=!0}}},[t._v("开始任务")]):t._e(),t._v(" "),1==t.status?s("mu-button",{attrs:{color:"#FF7C74",textColor:"#fff"},on:{click:function(a){t.startModel=!0}}},[t._v("继续任务")]):t._e(),t._v(" "),2==t.status?s("mu-button",{attrs:{color:"#D4D4D4",textColor:"#fff"}},[t._v("已上传任务凭证，审核中...")]):t._e(),t._v(" "),6==t.status?s("mu-button",{staticStyle:{border:"1px solid #FF7C74"},attrs:{color:"#fff",textColor:"#FF7C74"},on:{click:t.checkReson}},[t._v("凭证审核失败，查看原因")]):t._e(),t._v(" "),7==t.status?s("p",[t._v("已完成任务，奖励已发放到钱包中")]):t._e(),t._v(" "),5==t.status?s("p",[t._v("任务已过期")]):t._e()],1)],1),t._v(" "),s("mu-dialog",{attrs:{width:"360",open:t.picModel},on:{"update:open":function(a){t.picModel=a}}},[s("img",{staticStyle:{height:"100%",width:"100%"},attrs:{src:t.showPic,alt:""}})]),t._v(" "),s("mu-dialog",{attrs:{width:"300",open:t.startModel},on:{"update:open":function(a){t.startModel=a}}},[s("div",{staticStyle:{width:"70%","margin-left":"15%"}},[s("mu-button",{directives:[{name:"show",rawName:"v-show",value:t.data.easyMakeLink,expression:"data.easyMakeLink"}],staticStyle:{"border-radius":"4px","margin-bottom":"1.375rem"},attrs:{color:"#FF7C74",textColor:"#fff","full-width":""},on:{click:t.starMisson}},[t._v("开始做任务")]),t._v(" "),s("mu-button",{staticStyle:{border:".03125rem solid #FF7C74","border-radius":"4px"},attrs:{color:"#fff",textColor:"#FF7C74","full-width":""},on:{click:t.goPushPic}},[t._v("已做任务上传凭证")])],1)]),t._v(" "),s("mu-dialog",{staticClass:"resonmodel",attrs:{width:"300",open:t.showReson},on:{"update:open":function(a){t.showReson=a}}},[s("div",{staticClass:"showResonHead"},[s("img",{attrs:{src:"http://image.miduoxing.cn/0104b1e6-0ad6-44d9-9501-b34a86e0f944",alt:""}}),t._v(" "),s("p",[t._v("审核不通过")])]),t._v(" "),s("div",{staticClass:"showResonBtm"},[s("p",[t._v("不通过原因")]),t._v(" "),s("p",[t._v(t._s(t.data.failReason))])])])],1)},staticRenderFns:[]};var o=s("VU/8")(i,e,!1,function(t){s("jUbP"),s("gu8U")},"data-v-c8f34c26",null);a.default=o.exports},jUbP:function(t,a){}});
//# sourceMappingURL=6.6ecd5e289b17bd2f66bc.js.map