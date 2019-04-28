<template>
	<div>
		
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
    <div class="th-submit-btn">提交</div>
		
	</div>

</template>


   
 <script type="text/javascript">
export default {
  data () {
    return {
      files: [],
      filesOnline: [] 
    }
  },
  methods: {
    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        	console.log("抓取"+res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
          
          var tempFilePaths = res.tempFilePaths
          // console.log(tempFilePaths)
          wx.uploadFile({
            url: 'http://asdasdasdsadasdasd',    //模拟接口 
            filePath: tempFilePaths,
            name: 'file',
            header: {  
              "Content-Type": "multipart/form-data"  
            },  
            success: function(res){
            	console.log("上传"+res)
              _this.filesOnline = _this.filesOnline.concat(JSON.parse(res.data).data)
            }
          })
          
        },
        fail: function () {
          console.log('fail');
        },
        complete: function () {
          console.log('commplete');
        }
      })
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index){
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
  border-bottom:4rpx solid #f5f5f5;
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
