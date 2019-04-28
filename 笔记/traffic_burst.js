var hideTime;
$(function(){
	// 加载数据
	if (aop()) {
		init()
	}
	$('.post_logo').click(function(){
		$('.position2').show();
	})
//	$('.publish').click(function(){
//		var txtarea = $('textarea').val();
//		if(txtarea == ''){
//			noSelect('请输入相关文字描述');
//		}else if(txtarea.length > 200){
//			noSelect('文字个数超过200字');
//		}
//	});
	
	$('.cancel3').click(function(){
		var txtarea = $('textarea').val();
			if(txtarea == ''){
				$(this).find('a').attr('href','traffic_burst_index.html');
			}else{
				$('.my_oder_bakpop').show();
			}
	})
	
	$('.cancel2').click(function(){
		$('.my_oder_bakpop').hide();
	})
	
	$('.sure').click(function(){
		$(this).find('a').attr('href','traffic_burst_index.html');
	})
	
	//OSS上传
	g_dirname = ''
	g_object_name = ''
	g_object_name_type = ''
	now = timestamp = Date.parse(new Date()) / 1000; 

	function check_object_radio() {
	    g_object_name_type = 'local_name';
	}

	function get_dirname()
	{
	    g_dirname = dir;
	}

	function random_string(len) {
	　　len = len || 32;
	　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
	　　var maxPos = chars.length;
	　　var pwd = '';
	　　for (i = 0; i < len; i++) {
	    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	    }
	    return pwd;
	}

	function get_suffix(filename) {
	    pos = filename.lastIndexOf('.')
	    suffix = ''
	    if (pos != -1) {
	        suffix = filename.substring(pos)
	    }
	    return suffix;
	}

	function calculate_object_name(filename)
	{
	    if (g_object_name_type == 'local_name')
	    {
	        g_object_name += "${filename}"
	    }
	    else if (g_object_name_type == 'random_name')
	    {
	        suffix = get_suffix(filename)
	        g_object_name = g_dirname + random_string(10) + suffix
	    }
	    return ''
	}

	function get_uploaded_object_name(filename)
	{
	    if (g_object_name_type == 'local_name')
	    {
	        tmp_name = g_object_name
	        tmp_name = tmp_name.replace("${filename}", filename);
	        return tmp_name
	    }
	    else if(g_object_name_type == 'random_name')
	    {
	        return g_object_name
	    }
	}

	function set_upload_param(up, filename, ret)
	{
	    g_object_name = g_dirname;
	    if (filename != '') {
	        suffix = get_suffix(filename)
	        calculate_object_name(filename)
	    }
	    new_multipart_params = {
	        'key' : g_object_name,
	        'policy': policyBase64,
	        'OSSAccessKeyId': accessid, 
	        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
	        'signature': signature,
	    };
	    up.setOption({
	        'url': host,
	        'multipart_params': new_multipart_params
	    });

	    up.start();
	}

	//plupload中为我们提供了mOxie对象
	//有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
	//如果你不想了解那么多的话，那就照抄本示例的代码来得到预览的图片吧
	function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
	    if(!file || !/image\//.test(file.type)){
	    	
	    	return;
	    }  //确保文件是图片
	    if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
	        var fr = new mOxie.FileReader();
	        fr.onload = function(){
	            callback(fr.result);
	            fr.destroy();
	            fr = null;
	        }
	        fr.readAsDataURL(file.getSource());
	    }else{
	        var preloader = new mOxie.Image();
	        preloader.onload = function() {
	            preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
	            var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
	            callback && callback(imgsrc); //callback传入的参数为预览图片的url
	            preloader.destroy();
	            preloader = null;
	        };
	        preloader.load( file.getSource() );
	    }   
	}
	
	var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',  
		browse_button : 'browse', 
	    // multi_selection: false,
		flash_swf_url : '../js/plupload/Moxie.swf',
		silverlight_xap_url : '../js/plupload/Moxie.xap',
	    url : 'http://oss.aliyuncs.com',
	    filters: {
	    	//只允许上传图片文件
//			 mime_types : [{ title : "Image files", extensions : "jpg,png,gif" }],
			prevent_duplicates: true,
	    },
	    resize : {crop : true, preserve_headers : false, type : "image/jpeg", quality : 100 },
		init: {
			PostInit: function() {
				// document.getElementById('ossfile').innerHTML = '';
				$('.publish').click(function(){
//					var askQuestion = $('.askQuestion').val();
//					if($('.select_expert_Info').css('display') == 'none'){
//						noExpert();
//						return false;
//					}
//					if(askQuestion == '问得好，才能回答得好。\n希望您别嫌麻烦多写一点啊～'){
//						noDescribe();
//						return false;
//					}
//					if(askQuestion.length <= 10){
//						submitBox();
//						return false;
//					}	
					set_upload_param(uploader, '', false);
					return false;
				})
			},
			QueueChanged:function(){
				//alert(000)
			},
			FilesAdded: function(up, files) {
				//alert(122)
				var _file = uploader.files;
				var _file1 = files;
				for(var i = 0; i<_file.length; i++){
					if(_file[i].type.split('/')[0] != 'image'){
						noChoseVideo();
						_file.splice(i--,1);
						uploader.refresh(_file);
					}
					console.log(_file);
				}
				for(var i = 0; i<_file1.length; i++){
					if(_file1[i].type.split('/')[0] != 'image'){
						_file1.splice(i--,1);
						uploader.refresh(_file1);
					}
					console.log(_file1);
				}
				var MAX_FILE_NUM = 6;  // 上传最大文件个数
				var oldLen = uploader.files.length - files.length;
				uploader.files.splice(MAX_FILE_NUM, uploader.files.length);
    			files = files.slice(0, MAX_FILE_NUM - oldLen);
				plupload.each(files, function(file) {
					if($('.file_list').length >= 5){
						// var file_name = files[i].name; //文件名
						var html = '<div id="file-' + file.id +'" class="file_list"><b></b><p class="progress"></p><div class="file_list_del"></div></div>';
	                	$(html).insertBefore('.upload_pic');
						//构造html来更新UI						
		                !function(i){
		                    previewImage(file,function(imgsrc){
								$('#file-'+file.id).append('<img src="'+ imgsrc +'" />');
		                    })
		                }(file);
						$('.upload_pic').hide();
					}else{
						// var file_name = files[i].name; //文件名					
						var html = '<div id="file-' + file.id +'" class="file_list"><b></b><p class="progress"></p><div class="file_list_del"></div></div>';
	               		$(html).insertBefore('.upload_pic');
						//构造html来更新UI						
		                !function(i){
		                    previewImage(file,function(imgsrc){
		                        var type = file.type.split('/')[0];								
								$('#file-'+file.id).append('<img src="'+ imgsrc +'" />');
		                    })
		                }(file);
					}
				});
			    $('.file_list_del').on('click',function() {
			    	// var delid =  $(this).data('val');
			    	var delid =  $(this).parent('.file_list').attr('id');
			    	//uploader.removeFile(file);
			    	for(var i in uploader.files){
			    		if('file-'+uploader.files[i].id === delid){
			    			toremove = i;
			    		   }
			    		}
			    	for(var i in files){
			    		if('file-'+files[i].id === delid){
			    			toremove1 = i;
			    		   }
			    		}
			    	uploader.files.splice(toremove, 1); 
			    	files.splice(toremove1, 1); 
			    	uploader.refresh(uploader.files);
			    	uploader.refresh(files);
			    	$(this).parent('.file_list').remove();
			    	if($('.file_list').length>=6){
			    		$('.upload_pic').hide();
			    	}else{
						$('.upload_pic').show();
			    	}			    	
			    });
			},

			BeforeUpload: function(up, file) {
	            check_object_radio();
	            get_dirname();
	            set_upload_param(up, file.name, true);
	            upload();
	        },

			UploadProgress: function(up, file) {
				upload();
			},

			FileUploaded: function(up, file, info) {
				var obj = {};
	            if (info.status == 200)
	            {
	            	// alert(200);
	            	 console.log(file);
	             	obj.fileUrl = get_uploaded_object_name(file.name);
	             	obj.originFileName = file.name;
	             	obj.fileSize = file.size;
	             	obj.fileType = file.type;
	             	obj.fileId = file.id;
//	             	var str = JSON.stringify(obj); 
	             	objAll.push(obj);

	            }
	            else
	            {
	                // document.getElementById('file-'+file.id).getElementsByTagName('b')[0].innerHTML = info.response;
	            } 
			},

			UploadComplete: function(up, files) {
				uploadNo();
	            publishOK();
				
			},

			Error: function(up, err) {
				alert(err.message)
				console.log("\nError xml:" + err.message);
				// document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
			}
		}
	});

	uploader.init();
	//提交成功跳转
	function publishOK(){
		var txtarea = $('textarea').val();
		if(txtarea.length > 200){
			noSelect('文字个数超过200字');
		} else {
			vm.commit()
		}
	}
	function upload(){
		$('.submit_boxUpload').show();
	}
	//上传中消失
	function uploadNo(){
		$('.submit_boxUpload').hide();
	}
	
})

var objAll = []
var url1 = ajaxUrl + 'interact/frontAddInteract'
var url2 = locationUrl + '/portal/traffic_burst_index.html'

function init () {
	vm = new Vue({
		el : "#resultList",
		data () {
			return {
				addressDefault:{
					address: '',
					point: {
						lat: '',
						lng: ''
					}
				},
				addressList: [],
				interactContent: ''
			}
		},
		mounted () {
			this.uploadPolicy()
			this.getAddress()
		},
		computed: {
		},
		methods : {
			uploadPolicy () {
				//上传凭证
				let jsnObj = {"modelName":"zjwd","accessToken":token,'bucketType':'OSS_BUCKET_MALL','pathType':'OSS_PATH_MALL_OTHER'};
				$.ajax({
					url:""+ajaxUrl+"upload/uploadPolicy", 
					type:"get",
					data:{'data':JSON.stringify(jsnObj)},
					dataType:"json",
					success:function(data){
						if (data.code === '0') {
							//token过期
							if ('badToken' === data.message) {
								getToken();	
							}
							console.log(data)
						} else {
							console.log(data);
							host = data.host;  //OK
							accessid = data.accessid; //OK
							policyBase64 = data.policy;  //OK
							signature = data.signature;  
							dir = data.dir;  //OK
							expire = data.expire;
						}
					}
				})
			},
			getAddress () {
				// 百度地图API功能
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function (r) {
					var map = new BMap.Map("allmap")
					var mPoint = new BMap.Point(r.longitude, r.latitude)
					map.centerAndZoom(mPoint, 12);
		            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
		            	var options = {
							onSearchComplete: function(results){
								// 判断状态是否正确
								if (local.getStatus() == BMAP_STATUS_SUCCESS){
									for (var i = 0; i < results.getCurrentNumPois(); i ++){
										results.getPoi(i).current = false
										vm.addressList.push(results.getPoi(i))
									}
								}
							}
						}
						var local = new BMap.LocalSearch(map, options);
						local.searchNearby('街道', mPoint, 1000);
		            }
		        })
				console.log(this.addressList)
			},
			getData () {
				let param = {
					accessToken: token,
					orderId: this.orderId,
					orderType: this.orderCheck
				}
				console.log(param)
				$.ajax({
					type : "GET",
					url : url2,
					dataType : "json",
					data : {
						"data" : JSON.stringify(param)
					}
				}).then(res => {
					if (res.code === '0') {
						//token过期
						if ('badToken' === res.message) {
							getToken();	
						}
						console.log(res)
					} else {
						console.log(res)
						let jsn = JSON.parse(res.data)
						this.order = jsn
						console.log(jsn)
					}
				}, err => {
					console.log(err)
				})
			},
			doAddress (address) {
				this.addressDefault = address
				this.addressList.forEach(a => this.$set(a, 'current', false))
				this.$set(address, 'current', true)
				$('.no_address').removeClass('on')
				$('.position2').hide();
			},
			clearAddress () {
				let address = {
					address: '',
					point: {
						lat: '',
						lng: ''
					}
				}
				this.addressDefault = address
				this.addressList.forEach(a => this.$set(a, 'current', false))
				$('.no_address').addClass('on')
				$('.position2').hide()
			},
			commit () {
				objAll.forEach((obj, index) => {
					obj.sortNum = index + 1
					obj = JSON.stringify(obj)
				})
				console.log(objAll)
				let param = {
					accessToken: token,
					category: category,
					interactContent: this.interactContent,
					interactAddress: this.addressDefault.address,
					shopLat: this.addressDefault.point.lat,
					shopLon: this.addressDefault.point.lng,
					newsNfuLst: objAll
				}
				console.log(param)
				$.ajax({
					type : "POST",
					url : url1,
					dataType : "json",
					data : {
						"data" : JSON.stringify(param)
					}
				}).then(res => {
					console.log(res)
					if (res.code === '0') {
						//token过期
						if ('badToken' === res.message) {
							getToken();	
						}
						console.log(res)
						noSelect(res.message)
					} else if (res.code === '5') {
						noSelect(res.message)
						setTimeout(() => {
							this.cancel()
						},1000)
					} else {
						noSelect('爆料成功')
						setTimeout(() => {
							this.cancel()
						},1000)
					}
				}, err => {
					console.log(err)
				})
			},
			cancel () {
				window.location.href = url2
			}
		}
	})
}
