
//站长统计
			var _czc = _czc || [];
			_czc.push(["_setAccount", "1274011341"]);
$(function(){	
	//转盘对象
	var turnplate={
		startAngle:0,				//开始角度
		randomRate:[],              //控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
		bRotate:false				//false:停止;ture:旋转
	};
	var sum;
	turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%', '0%', '0%'];

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
				turnplate.bRotate = !turnplate.bRotate;
				$(".zheZhao").show();
			}
		});
	};

	//点击开始
	$('.start').click(function (){						
							turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%', '0%', '0%'];
							//从后台请求获取数据设置对应的数组为100%	
							turnplate.randomRate[0] = "100%";
							//获取随机数(奖品个数范围内)
							var item = rnd(turnplate.randomRate);
							rotateFn(item);//data为你要带的参数		
							
	});
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

$('#winning').click(()=>{
	_czc.push(["_trackEvent",'转盘引流','点击','1',1,'button']);
				 var ua = navigator.userAgent.toLowerCase();
					    if(ua.match(/MicroMessenger/i)=="micromessenger") {
					        $(".zhezhao2").show()
					        $(".startEarm").css("overflow","hidden")
					         $(".zhezhao2").click(function(){
					         	$(this).hide()
					        	$(".startEarm").css("overflow","auto")
					         	
					         })
					    }else{
					    	window.location.href = "https://front.miduoxing.cn/meters/whiteBack/app-baidi.apk"//下载链接
					    }
})