$(function(){

//页面禁止下拉
document.querySelector('body').addEventListener('touchmove', function(e) {
    e.preventDefault();
})
setTimeout(function(){
	$('#bigWord').removeClass('wobble');
	$('#bigWord').addClass('pulse infinite');
}, 1000);
//----------------------提取接口--------------
//		 var base = "http://testjourney.hzqimiao.com"
		var base = "https://journey.hzqimiao.com"
//		 var base = "http://192.168.2.228:8077"
		
		
		
//------------------全局定义用到的变量 =------------		
//全局定义 flag  判断是否初始化
var flag =false;
//全局定义 flag2  判断是否发牌动作跑完
var flag2 = false;
//全局定义用户标识
		 var Usign = {
		 	orderId :"",
		 	userSign : ""
		 };		
//全局定义奖品
	var gift ={};
	var giftPool = [];
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
			 	userSign : Give_me.userSign,
			 	place:Give_me.place
			};


//页面访问统计
	var pageAccesURl ='https://cloud.miduoxing.cn/pageAccess/v2/pageAccessMore?pageName='+Usign.place+'&&channel='+Usign.place
		$.ajax({
						type:"post",
						url:pageAccesURl,
						contentType : "application/json",
						Accept : "*/*",
						success:function(res){
						}
			});
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
        	$(".bigBox .contanner .redBoxs div").css({
				'width': '16.26%',
				'height': '23.77.%',
				"background": 'url(img/bao@2x.png) no-repeat center center',
				'background-size': '100% 100%'
			})
        	var uu = base+"/draw/preRedPack"+"?orderId="+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
			$.ajax({
				type:"post",
				url:uu,
				timeout:2000,//请求超时
				contentType : "application/json",
				Accept : "*/*",
				success:function(res){
					flag = true;

					console.log(res)
				$(".chanse span").text(res.expand.count);
				aa.residue = res.expand.count;
				
//请求到数据 就发牌
	if(aa.residue>0){
		$('.redBoxs div').css({top:0,left:0})
		$('.red0').animate({
			left:'-33%',
			top:'-33%'
		  },200,function(){
			$('.red1').animate({
				left:'0',
				top:'-33%'
			},200,function () {
				$('.red2').animate({
					left:'33%',
					top:'-33%'
				},200,function(){
					$('.red3').animate({
						left:'-33%',
						top:'0'
					},200,function(){
						$('.red5').animate({
							left:'33%',
							top:'0'
						},200,function(){
							$('.red6').animate({
								left:'-33%',
								top:'33%'
							},200,function () {
								$('.red7').animate({
									left:'0',
									top:'33%'
								},200,function(){
									$('.red8').animate({
										left:'33%',
										top:'33%'
									},200,function(){
										flag2 = true
									})
								})
							  })
						})
					})
				})
			  })
		})
	}else{
		$('.redBoxs .red0').css({'top':'-33%','left':'-33%'})
		$('.redBoxs .red1').css({'top':'-33%','left':'0'})
		$('.redBoxs .red2').css({'top':'-33%','left':'33%'})
		$('.redBoxs .red3').css({'top':'0','left':'-33%'})
		$('.redBoxs .red5').css({'top':'0','left':'33%'})
		$('.redBoxs .red6').css({'top':'33%','left':'-33%'})
		$('.redBoxs .red7').css({'top':'33%','left':'0'})
		$('.redBoxs .red8').css({'top':'33%','left':'33%'})
		
		
	}

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
						//这是不包含奖品的奖池
						giftPool = res.expand.prizePool
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
$(".redBoxs").on("click","div",function(){
	var inner =  $(".chanse span").text();

	if (inner == '' ) {//  半加载 , 用户无法请求的情况
		console.log(21)
		window.location.reload()
	}
	if (aa.residue == 0) {//剩余次数为0
			$(".zheZhao").show();
			$(".noChanse").show();
			return;
		}
	if (flag&&flag2) {//能够点击
			
			// 生成记录
		var sc = base+"/draw/initRecord?orderId="+Usign.orderId+"&&userSign="+Usign.userSign+"&&winner="+aa.winner+"&&place="+Usign.place
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

//展示奖品
		var that = this
	setTimeout(function(){
		$("."+that.className).css("background","#ffffff url(http://"+gift.url+") no-repeat center center");
		$("."+that.className).css("background-size","80% 80%")
		$("."+that.className).css("box-shadow","0")
	},300);
	
//展示奖池	
	 setTimeout(function(){
		let arr = ['red0','red1','red2','red3','red4','red5','red6','red7','red8']
		arr.map(function(res,index){
			if(arr[index]==that.className){
				arr.splice(index,1)
			}
		})
		
		arr.map(function(res,index){
			giftPool.map(function(res2,index2){
				if(index==index2){
						$("."+res).css("background","#ffffff url("+"http://"+res2.url+") no-repeat center center")
						$(".redBoxs div").css("background-size","80% 80%")
						$(".redBoxs div").css("box-shadow","0!important")
					
				}
			})
		})
	 	
	 },1200);
//展示弹框, 需要根据aa的状态来判断展示什么弹框
	setTimeout(function(){
		console.log(aa.residue)
			if (aa.isWin == 1) {
						$(".zheZhao").show();
						$(".giftZZ").show();
						$(".giftZZ .banner img").attr('src','http://'+aa.img)
						$(".giftZZ .title").text(aa.words)
				}else if(aa.isWin == 2){
						$(".zheZhao").show();
						$(".noneGift").show();
				}
	
	},2500)
		
		
		
		
 //抽完奖,还未初始化 将初始化状态设为false
 flag = false;
 flag2 = false;
	}

})


//规则
	$(".rule").click(function(){
			$(".zheZhao").show()
			$(".ruleZZ").show()
	});

//中奖了的弹框上 前往第三方点击
  $('.giftZZ .banner .toGetGift').click(function(){
  		//前往第三方的统计
  		var btnAccessUrl1 = "https://cloud.miduoxing.cn/pageAccess/v2/btnAccessMore?pageName="+Usign.place+"&&btnName="+aa.words+"&&channel="+Usign.place
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
//----没有机会----弹框上 查看 我的奖品 按钮点击
$(".noChanse .banner .toGetGift").click(function(){
			
  		var btnAccessUrl3 = "https://cloud.miduoxing.cn/pageAccess/v2/btnAccessMore?pageName="+Usign.place+"&&btnName="+"我的奖品按钮"+"&&channel="+Usign.place
    	  
			$.ajax({
			type:"post",
			url:btnAccessUrl3,
			contentType : "application/json",
			Accept : "*/*",
			success:function(res){
//		window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
		window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
		},
			error:function(err){
//		window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
		window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
		}
		})

    
})
// 未抽中还有机会弹框上 继续抽奖按钮点击
$(".noneGift .banner .toGetGift").click(function(){
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
			$(".badChanse").hide()
			
			init()
		});
//我的奖品 按钮点击
    $(".myGift").click(function(){
    	  var btnAccessUrl2 = "https://cloud.miduoxing.cn/pageAccess/v2/btnAccessMore?pageName="+Usign.place+"&&btnName="+"我的奖品按钮"+"&&channel="+Usign.place
			
			$.ajax({
			type:"post",
			url:btnAccessUrl2,
			contentType : "application/json",
			Accept : "*/*",
			success:function(res){
				//		window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
				window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
			},
			error:function(){
				//		window.location.href = 'https://front.miduoxing.cn/meters/giftListTest/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
					window.location.href = 'https://front.miduoxing.cn/meters/giftList/index.html?orderId='+Usign.orderId+"&&userSign="+Usign.userSign+"&&place="+Usign.place;
			}
		})

    })
		


})