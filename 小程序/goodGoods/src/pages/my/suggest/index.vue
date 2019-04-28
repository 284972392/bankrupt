<template>
	<div class="suggest"> 
		<!--<div class="goodNews">
		好消息 ： 若您的建议反馈呗采纳即刻获得<span>1元</span>现金红包
		</div>-->
		<div class="words">
			<span>提出建议</span><span>*</span><span>(100字以内)</span>
		</div>
		<textarea @blur="blur" v-model="suggestWord" class="wordsText" maxlength=100 placeholder-style="font-size: 26rpx;" placeholder="您有哪些地方想让我们改进呢~" name="textarea" />
		<div class="upPicTitle">
			<span>上传图片</span><span>（可上传想要改进地方的截图，最多上传3张图）</span>
		</div>
		<!--<mp-uploader successRes="successRes" @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail" @uploadDelete="uploadDelete" :showTip=false :count=1></mp-uploader>-->
	
	<!--上传-->
	<div class="upload">
		<div class="weui-uploader__bd th-backwhite clearfix">
		      <div class="weui-uploader__files" id="uploaderFiles">
		        <block v-for="(item,index) in files" :key="index">
		          <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
		            <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index)"/>
		            <image class="weui-uploader__img" :src="item" mode="aspectFill" />
		          </div>
		        </block>
		      </div>
		      <div class="weui-uploader__input-box">
		        <div class="weui-uploader__input" @click="chooseImage"></div>
		      </div>
    </div>
		
	</div>
	
	<div :class="isOk?'gree':'red'" @click="submit">提交</div>
	<div class="worm">
		<span>注：您提的建议会在三到五个工作日内处理</span>
		<span @click="toRecord">反馈记录</span>
	</div>

	</div>
</template>

<script>
import mpUploader from 'mpvue-weui/src/uploader';
	export default {
		  components: {
    mpUploader
  },
	onLoad(options){  
      wx.setNavigationBarTitle({  
        title:'建议反馈'
      });
		  	Object.assign(this.$data, this.$options.data())
      
  },
  data(){
  	return{
  		suggestWord:'',
  		isOk:true,
  		toastType:'success',
  		files: [],
      filesOnline:[],
      pics:[]



  	}
  },
  methods:{
  	uploadimgs(data){
			let that = this;
  		
             let session3rd = wx.getStorageSync('appDt').session3rd
  	if (data.path.length == 1) { //如果只选了一张
    		        wx.uploadFile({
            url: 'https://good.hzqimiao.com/upload/upload',    //模拟接口 
            filePath: data.path[0],
            formData:{
           	 oldSession3rd:session3rd
            },
            name: 'file',
            header: {  
              "Content-Type": "multipart/form-data"  
            },  
            success: function(res){
            	
            	console.log(res)
              that.filesOnline = that.filesOnline.concat(JSON.parse(res.data).data)
            }
          })
  	}else if (data.path.length > 1) { //选择了多张
        var i=data.i?data.i:0,//当前上传的哪张图片
        
         success=data.success?data.success:0,//上传成功的个数
         fail=data.fail?data.fail:0;//上传失败的个数
           console.log(data.path[i]);
         
      wx.uploadFile({
            url: data.url, 
            filePath: data.path[i],
            name: 'file',//这里根据自己的实际情况改
      		  header: {  
              "Content-Type": "multipart/form-data"  
            },  
            formData:{
           	 oldSession3rd:session3rd
            },//这里是上传图片时一起上传的数据
            success: (resp) => {

               console.log(JSON.parse(resp.data).data)
//              console.log(resp);
              that.filesOnline = that.filesOnline.concat(JSON.parse(resp.data).data)
                
                if (resp.errMsg == "uploadFile:ok") {
             		  success++;//图片上传成功，图片上传成功的变量+1
         		       i++;//这个图片执行完上传后，开始上传下一张
             		  
                }
                //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
            },
            fail: (res) => {
                fail++;//图片上传失败，图片上传失败的变量+1
                console.log('fail:'+i+"fail:"+fail);
            },
            complete: () => {
//              console.log(i);

            if(i==data.path.length){   //当图片传完时，停止调用          
                console.log('执行完毕');
                console.log('成功：'+success+" 失败："+fail);
            }else{//若图片还没有传完，则继续调用函数
                data.i=i;
                data.success=success;
                data.fail=fail;
                that.uploadimgs(data);
            }
                
            }
        });
  	}

  	},
  	submit(){
  		
  		if (this.isOk == false) {
  						let imgs = this.filesOnline;
		  				imgs = imgs.join()
		  				console.log(imgs)
  		              let url = this.globalUrl.addFeedBack
  		          let session3rd = wx.getStorageSync('appDt').session3rd
  		              
                  this.$http.get(url,{
                  			oldSession3rd:session3rd,
                  			url:imgs,
                  			feedContent:this.suggestWord
                  }).then(res =>{
                  	console.log(res)
						wx.showToast({
						  title: '提交成功',
						  icon: 'success',
						  duration: 2000
						})
						
     			setTimeout(function(){
     				 wx.navigateTo({url:'../suggestRecord/main'})
				        },2000)
						
                  })
  		}else{
  			
  		}

  	},
  	toRecord(){
      wx.navigateTo({url:'../suggestRecord/main'})
  	},
  	blur(){
		if (this.suggestWord == "") {
			this.isOk = true
		}else{
			this.isOk = false
		}
  	},
  	
  	 chooseImage(e) {
  	 	
	 	if (this.files.length<3) {
//	 	      var _this = this;
//    wx.chooseImage({
//      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//      success: function (res) {
//        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//        _this.files = _this.files.concat(res.tempFilePaths)
//        
//        var tempFilePaths = res.tempFilePaths
//        // console.log(tempFilePaths)
//            let session3rd = wx.getStorageSync('appDt').session3rd
//        wx.uploadFile({
//          url: 'https://good.hzqimiao.com/upload/upload',    //模拟接口 
//          filePath: tempFilePaths[0],
//          formData:{
//         	 oldSession3rd:session3rd
//          },
//          name: 'file',
//          header: {  
//            "Content-Type": "multipart/form-data"  
//          },  
//          success: function(res){
//            _this.filesOnline = _this.filesOnline.concat(JSON.parse(res.data).data)
//          }
//        })
//        
//      },
//      fail: function () {
//        console.log('fail');
//      },
//      complete: function () {
//        console.log('commplete');
//      }
//    })	
//	 	}else{
////			已经上传三张了
//	 	}

 var that=this,
　　　　　　pics=[];

      wx.chooseImage({
           count: 3-that.pics.length, // 最多可以选择的图片张数，默认9
           sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
           sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
           success: function(res){
           var imgsrc=res.tempFilePaths; 
           that.files = that.files.concat(res.tempFilePaths)
　　　　　　　　　pics=pics.concat(imgsrc);  
//          that.setData({
//              pics:pics
//          });
            that.pics = that.pics.concat(imgsrc)
            console.log(pics)
       that.uploadimgs({
           url:'https://good.hzqimiao.com/upload/upload',//这里是你图片上传的接口
           path:pics//这里是选取的图片的地址数组
        });

            
            
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

}else{
	//已经上传三张了
}
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index){
      this.pics.splice(index,1)
      this.files.splice(index,1)
      this.filesOnline.splice(index,1)
    }
  }
  	
  	
  }
	
</script>

<style scoped>
.th-icon-cancel{
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  right: -14rpx;
  top: -14rpx;
}
.weui-uploader__input-box{
  margin-right: 0;
}
.weui-uploader__bd{
  margin-bottom: 0;
}
.posi-rela{
  position: relative;
  overflow: visible;
}
.weui-uploader__file:nth-child(4n){
  margin-right: 0;
}
.th-backwhite{
  width: 750rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
}
/* 绿色贯穿按钮 */
.th-submit-btn{
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  margin: 50rpx auto;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  border-radius: 6rpx;
}
</style>

<style scoped>
page{
  height: 100%;
  font-family: PingFangSC-Medium; 
}
</style>
<style scoped lang="scss">
.suggest{
	width: 100%;
	height: 100%;
	.goodNews{
		width: 100%;
		height: 76rpx;
		line-height: 76rpx;
		text-align: center;
		background: #FFF6F6;
		font-size: 26rpx;
color: #333333;
letter-spacing: 0;
span{
	color: #E65454 ;
}
	}
	.words{
		width: 100%;
		height: 42rpx;
		line-height: 42rpx;
		margin-top: 32rpx;
		padding-left: 32rpx;
		span:nth-child(1){
			font-size: 30rpx;
color: #333333;
		}
		span:nth-child(2){
			font-size: 30rpx;
color: #E65454;
		}
		span:nth-child(3){
			font-size: 24rpx;
color: #ABABAB;
		}
	}
	.wordsText{
		box-sizing: border-box;
		display: block;
		padding: 20rpx;
		width: 92%;
		height: 228rpx;
		margin: 0 auto;
		margin-top: 22rpx;
		border: 1px solid #EEEEEE;
border-radius: 4px;
font-size: 28rpx;
color: #666666;
	}
	.upPicTitle{
		width: 100%;
		height:42rpx;
		line-height: 42rpx;
		margin-top: 36rpx;
		padding-left: 32rpx;
		span:nth-child(1){
			font-size: 30rpx;
color: #333333;
letter-spacing: 0;
		}
		span:nth-child(2){
			font-size: 24rpx;
color: #ABABAB;
		}
	}
.upload{
	width: 100%;
	height: 190rpx;
	margin-top: 28rpx;
}
.gree{
	width: 90%;
	height: 84rpx;
	text-align: center;
	line-height: 84rpx;
	color: #ffffff;
	background: #D3D3D3;
	margin: 0 auto;
	margin-top: 90rpx;
	font-size: 30rpx;
color: #FFFFFF;
box-shadow: 0 2px 7px 0 #DCDCDC;
border-radius: 21px;
}
.red{
	width: 90%;
	height: 84rpx;
	text-align: center;
	line-height: 84rpx;
	color: #ffffff;
	background-image: linear-gradient(0deg, #E65454 0%, #FF8686 100%);
	margin: 0 auto;
	margin-top: 90rpx;
	font-size: 30rpx;
color: #FFFFFF;
box-shadow: 0 2px 7px 0 #FF7878;
border-radius: 21px;
}
.worm{
	width: 100%;
	height: 54rpx;
	display: flex;
	box-sizing: border-box;
	margin-top: 46rpx;
	line-height: 54rpx;
	justify-content: space-between;
	padding:0 32rpx;
	span:nth-child(1){
		font-size: 26rpx;
color: #ABABAB;
	}
	span:nth-child(2){
		display: block;
		width: 154rpx;
		height: 54rpx;
		border: 1px solid #EBEBEB;
border-radius: 13.5px;
text-align: center;
font-size: 24rpx;
color: #333333;
	}
}
}
</style>