
//站长统计
			var _czc = _czc || [];
			_czc.push(["_setAccount", "1274011341"]);
		
			var pageAccesURl ='https://cloud.miduoxing.cn/pageAccess/v2/pageAccess?pageName=qmxzZhuanPan'
			$.ajax({
							type:"post",
							url:pageAccesURl,
							contentType : "application/json",
							Accept : "*/*",
							success:function(res){
			
							}
						})	

$(function(){
	//全局定义用户标识
	var Usign = {
		 	oderId :"",
		 	userSign : ""
		 };
	//获取uerId和orderId
	
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
		 	oderId : Give_me.orderId,
		 	userSign : Give_me.userSign
		}
	
	
	//全局定义传递值
	var aa ={
			residue:3,  //剩余转动次数
			links:"",//跳转链接
			isWin:1,	//0未抽中，1 抽中
			img:"", //抽中后弹框展示的图片
			words:'',  // 奖品对应的字段
			title:'', 
			isGit:true,
		};	 
	//全局定义中奖下标
	var index_roll = 0;			
	
	var init_roll = function(){
//				var uu = "https://testcloud.miduoxing.cn/draw/initialize"+"?orderId="+Usign.oderId+"&&userSign="+Usign.userSign;
				var uu = "https://journey.hzqimiao.com/draw/initialize"+"?orderId="+Usign.oderId+"&&userSign="+Usign.userSign+'&&place=qmxz';
				$.ajax({
					type:"post",
					url:uu,
					timeout:2000,//请求超时
					contentType : "application/json",
					Accept : "*/*",
					success:function(res){
						console.log(res)
					$(".reSum span").text(res.expand.count);
					aa.residue = res.expand.count;
					res.data.forEach(function(i,index){
						$(".block-"+(index+1)+" .content .img img" ).attr('src','http://'+i.url)
						$(".block-"+(index+1)+" .content .text" ).text(i.title)
					})
					},
						complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
							　if(status=='timeout'){//超时,status还有success,error等值的情况
								init_roll()
					　　　　}
							if(status=='error'){
							init_roll()
							}
					}
				})
	}
	//调用初始化接口
	init_roll();
	
	
	//转盘对象
	var turnplate={
		startAngle:0,				//开始角度
		randomRate:[],              //控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
		bRotate:false				//false:停止;ture:旋转
	};
	var sum;
	turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%', '0%', '0%'];
	//设置turnplate.randomRate的数组长度就是大转盘格子的个数
	var rotateTimeOut = function (){
		$('.awardGift').rotate({
			angle:0,
			animateTo:2160,
			duration:2000,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	//旋转
	var rotateFn = function (item){
		var angles = item * (360 / turnplate.randomRate.length) - (360 / (turnplate.randomRate.length*2));
		if(angles<270){
			angles = 270 - angles; 
		}else{
			angles = 360 - angles + 270;
		}
		$('.awardGift').stopRotate();
		$('.awardGift').rotate({
			angle:0,
			animateTo:angles+360,
			duration:2000,
			callback:function (){
				
				//旋转完成调用的函数
//				alert(txt.giftCode);

					if (aa.isWin == 1) {
						$(".zheZhao").show();
						$(".giftZZ").show();
						$(".giftZZ .banner img").attr('src','http://'+aa.img)
						$(".giftZZ .title").text(aa.words)
					}else{
						console.log(aa.residue)
						
							$(".zheZhao").show();
							$(".noneGift").show();	
					}
					$(".zheZhao").show();
					$('.black').css('background',"rgba(0,0,0,0)")
					//转完一圈后， 初始化！
					init_roll();

				//开启旋转
				turnplate.bRotate = !turnplate.bRotate;
			}
		});
	};
	//用户奖品点击跳转
			$('.myGift').click(function(){
			_czc.push(["_trackEvent",'九宫格3版我的奖品','点击','1',1,'button']);
//			window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.oderId+"&&userSign="+Usign.userSign;
			window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.oderId+"&&userSign="+Usign.userSign;
			})
	//点击开始
	$('.start').click(function (){
		console.log(turnplate.bRotate)
		//点击的时候是false才转
		if(aa.residue == 0){
			$(".zheZhao").show();
			$(".noChanse").show();
			return;
		}
		if(turnplate.bRotate)return;

		
	

//请求结果
    if (aa.residue > 0) {
//						var mm = "https://testcloud.miduoxing.cn/draw/calculate?orderId="+Usign.oderId+"&&userSign="+Usign.userSign;
						var mm = "http://journey.hzqimiao.com/draw/calculate?orderId="+Usign.oderId+"&&userSign="+Usign.userSign;
						//请求结果
						$.ajax({
						type:"post",
						url:mm,
						contentType : "application/json",
						Accept : "*/*",
						success:function(res){
							//请求到接口将状态调为true,使不能多次点击
		turnplate.bRotate = !turnplate.bRotate;
							
							if (res.resultCode == "B10000") {
									aa.behavior=1; 	//0跳转  ，1是打开弹框
									aa.links="";//跳转链接
									aa.isWin=0;	//0未抽中，1 抽中
									aa.img=""; //抽中后弹框展示的图片
									aa.words='';  // 奖品对应的字段
									aa.title='';  // 奖品对应的字段
									aa.isGit = false;
							}else{
								index_roll = res.expand.winner; //转圈过程不响应click事件，会将click置为false
								if (res.data.id == null) {
									aa.isWin = 0
								}else{
									aa.isWin = 1
								}
								aa.behavior = 1;
								aa.isGit = true;
								aa.links = res.data.link;
								aa.img = res.data.bannerUrl;
								aa.words = res.data.name;
								aa.title = res.data.title;
								
								turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%', '0%', '0%'];
							//从后台请求获取数据设置对应的数组为100%
							
							turnplate.randomRate[index_roll] = "100%";
							//获取随机数(奖品个数范围内)
							var item = rnd(turnplate.randomRate);
							rotateFn(item);//data为你要带的参数
							}
						
						}
					})
						}

		

//		$.get('json/award.json',function(data){
//			turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%', '0%', '0%'];
//			//从后台请求获取数据设置对应的数组为100%
//			
//			turnplate.randomRate[data.giftCode] = "100%";
//			//获取随机数(奖品个数范围内)
//			var item = rnd(turnplate.randomRate);
//			rotateFn(item);//data为你要带的参数
//		});
		
	});
	//规则
		$(".rule").click(function(){
				$(".zheZhao").show()
				$(".ruleZZ").show()
		})
	
	//弹框叉点击
		$(".cha").click(function(){
				$(".zheZhao").hide()
				$(".ruleZZ").hide()
				$(".giftZZ").hide()
				$(".noneGift").hide()
				$(".noChanse").hide()
			})
	//弹框上跳转第三方
		$(".giftZZ .banner .toGetGift").click(function(){
				let wtGift = aa.title
				_czc.push(["_trackEvent",'九宫格三版',"跳转第三方",wtGift,'button']);
				window.location.href = aa.links
		})
		
		$(".noneGift .banner .toGetGift").click(function(){
				$(".zheZhao").hide()
				$(".noneGift").hide()
			})
		$(".noChanse .banner .toGetGift").click(function(){
				$(".zheZhao").hide();
				$(".noChanse").hide();
//				window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.oderId+"&&userSign="+Usign.userSign;
				window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.oderId+"&&userSign="+Usign.userSign
			})
	//注意如果转盘对不准的情况下。可以调节awardGift下的img的旋转角度进去调节transform: rotate(22deg);。
});
function rnd(rate){
	var random = Math.floor(Math.random() * 100);
	var myRandom = [];
	var randomList = [];
	var randomParent = [];
	for(var i = 0; i < 100; i++){
		myRandom.push(parseInt([i]) + 1);
	}
	for(var i = 0; i < rate.length; i++){
		var temp = [];
		var start = 0;
		var end = 0;
		randomList.push(parseInt(rate[i].split('%')[0]));
		for(var j = 0; j < randomList.length; j++){
			start += randomList[j-1] || 0
			end += randomList[j]
		}
		temp = myRandom.slice(start, end);
		randomParent.push(temp)
	}
	for(var i = 0; i < randomParent.length; i++){
		if($.inArray(random, randomParent[i]) > 0){
			return(i+1)
		}
	}
	
}

