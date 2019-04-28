$(function(){

//页面访问统计
	var pageAccesURl ='https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName=giftRole8&&channel=lvtudiandian'
		$.ajax({
						type:"post",
						url:pageAccesURl,
						contentType : "application/json",
						Accept : "*/*",
						success:function(res){
						}
			});
//页面禁止下拉
document.querySelector('body').addEventListener('touchmove', function(e) {
    e.preventDefault();
})
setTimeout(function(){
				$('#bigWord').removeClass('wobble');
				$('#openBtn').addClass('pulse infinite');
			}, 1000);

//----------------------提取接口--------------
//		 var base = "http://testjourney.hzqimiao.com"
		var base = "https://journey.hzqimiao.com"
//		 var base = "http://192.168.2.228:8077"
		
		
		
//------------------全局定义用到的变量 =------------		
//全局定义 flag  判断是否初始化
var flag =false;

//全局定义用户标识
		 var Usign = {
		 	orderId :"",
		 	userSign : ""
		 };		
//全局定义奖品
	var gift ={};
//获取用户标识
	var Give_me;
	var url = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
	var theRequest = new Object();
	if ( url.indexOf( "?" ) != -1 ) {
	  var str = url.substr( 1 ); //substr()方法返回从参数值开始到结束的字符串；
	  var strs = str.split( "&" );
	  for ( var i = 0; i < strs.length; i++ ) {
	    theRequest[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );
	  }
		 Give_me = theRequest
	}	
	  Usign = {
			 	orderId : Give_me.orderId,
			 	userSign : Give_me.userSign
			};

//全局定义传递值 -- 之前第一版的时候这样做的， 现在接着用了。。
				var aa ={
					residue:6,  //剩余转动次数
					links:"",//跳转链接
					isWin:1,	//0未抽中，1 抽中
					img:"", //抽中后弹框展示的图片
					words:'',  // 奖品对应的字段
					title:'', 
					isGit:true,
					winner:0
				};



//---------------------初始化 预抽奖        --------------------
        var init = function(){
        	var uu = base+"/draw/preRedPack"+"?orderId="+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+"lvtudiandian";
			$.ajax({
				type:"post",
				url:uu,
				timeout:2000,//请求超时
				contentType : "application/json",
				Accept : "*/*",
				success:function(res){
					flag = true;
					console.log(res)
				$(".changse span").text(res.expand.count);
				aa.residue = res.expand.count;
					if (res.resultCode == "B10000") {//未初始化，或者已经抽完
							aa.links="";//跳转链接
							aa.isWin=0;	//0未抽中，1 抽中
							aa.img=""; //抽中后弹框展示的图片
							aa.words='';  // 奖品对应的字段
							aa.title='';  // 奖品对应的字段
							aa.isGit = false;
					}else{
						//这是奖品
						gift = res.data

						if (res.data.id == null) {//抽到谢谢惠顾
							aa.isWin = 2
						}else{
							aa.winner = res.expand.winner
							aa.isWin = 1
						}
						aa.isGit = true;
						aa.links = res.data.link;
						aa.img = res.data.bannerUrl;
						aa.words = res.data.name;
						aa.title = res.data.title;
						return false;
						
					}
				},
				complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
						　if(status=='timeout'){//超时,status还有success,error等值的情况
							init()
				　　　　}
						if(status=='error'){
						init()
						}
				}
			})      
      };			
   
//初始化
	init();
   



//-------------------------------------点击事件--------------------------------------

//拆红包按钮
$(".openBtn").on("click",function(){
	var inner =  $(".changse span").text();

	if (inner == '' ) {//  半加载 , 用户无法请求的情况
		window.location.reload()
	}
	if (aa.residue == 0) {//剩余次数为0
			$(".zheZhao").show();
			$(".noChanse").show();
			return;
		}
	if (flag) {//能够点击
			
			// 生成记录
		var sc = base+"/draw/initRecord?orderId="+Usign.orderId+"&&userSign="+Usign.userSign+"&&winner="+aa.winner+"&&place=lvtudiandian"
			$.ajax({
					type:"post",
					url:sc,
					contentType : "application/json",
					Accept : "*/*",
					success:function(res){
						console.log(res)
						if (res.resultCode == 0) {

						}

					}
			})


//展示弹框, 需要根据aa的状态来判断展示什么弹框
	setTimeout(function(){
			if (aa.isWin == 1) {
						$(".zheZhao").show();
						$(".giftZZ").show();
						$(".giftZZ .banner img").attr('src','http://'+aa.img)
						$(".giftZZ .title").text(aa.words)
				}else if(aa.isWin == 2){
						$(".zheZhao").show();
						$(".noneGift").show();
				}
	
	},500)
		
		
   //抽完奖,还未初始化 将初始化状态设为false
   flag = false;

	}

})


//规则
	$(".rule").click(function(){
			$(".zheZhao").show()
			$(".ruleZZ").show()
	});

//中奖了的弹框上 前往第三方点击
$('.giftZZ .redBox .toGetGift').click(function(){
		//前往第三方的统计
	var btnAccessUrl1 = "https://cloud.miduoxing.cn/pageAccess/v2/btnAccessMore?pageName=giftRole8&&btnName="+aa.words+"&&channel=lvtudiandian"
			$.ajax({
			type:"post",
			url:btnAccessUrl1,
			contentType : "application/json",
			Accept : "*/*",
			success:function(res){
		window.location.href = aa.links
			},
			error:function(err){
		window.location.href = aa.links
			}
		})
		

})
// 未抽中还有机会弹框上 继续抽奖按钮点击
$(".noneGift .goOn").click(function(){
			$(".zheZhao").hide()
			$(".noneGift").hide()
			init()
})

//弹框叉点击
	$(".cha").click(function(){
			$(".zheZhao").hide()
			$(".ruleZZ").hide()
			$(".giftZZ").hide()
			$(".noneGift").hide()
			$(".noChanse").hide()
			
			init()
		});
//我的奖品 按钮点击
    $(".myGift").click(function(){
    	  var btnAccessUrl2 = "https://cloud.miduoxing.cn/pageAccess/v2/btnAccessMore?pageName=giftRole8&&btnName="+"我的奖品按钮"+"&&channel=lvtudiandian"
			$.ajax({
			type:"post",
			url:btnAccessUrl2,
			contentType : "application/json",
			Accept : "*/*",
			success:function(res){
//		window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+"lvtudiandian";
		window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+"lvtudiandian";
			},
			error:function(err){
//		window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+"lvtudiandian";
		window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+"lvtudiandian";
			}
		})
    })
		


})