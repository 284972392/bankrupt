<template>
	<div class="upload">
		<el-upload
        ref="upload"
        :on-success="handleSuccess"
	  :action="url"
	  list-type="picture-card"
	  :file-list="defaultList"
	  :on-preview="handlePictureCardPreview"
	  :on-remove="handleRemove"
	  :before-upload="handleBeforeUpload"
	  >
	  <i class="el-icon-plus"></i>
	</el-upload>
	<el-dialog :visible.sync="dialogVisible">
	  <img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>
	</div>
</template>

<script>
  export default {
        props:['size','defaultPic'],
  	
    data() {
      return {
      	url:'',
        dialogImageUrl: '',
        dialogVisible: false,
        defaultList:[
//      {name: 'food.jpeg',
//      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
//      {name: 'food2.jpeg', 
//      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        uploadList:[]
      };
    },
    methods: {
      clearDefault(){
        this.defaultList = []
        this.dialogImageUrl = ''
      },
      handleRemove(file, fileList) {
          let index = this.defaultList.indexOf(file);

      		this.defaultList = fileList
          this.$store.state.imgIndex = index;
          this.$emit('remove')
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传成功
      handleSuccess (res, file,fileList) {
   	        	this.defaultList = fileList
//            file.url = "http://"+file.url;
              this.$store.state.shareUrl = file.response.data[0];
              this.$emit('update')

            },
      changeImg(){
        this.$emit('changeImg')
      },
      handleBeforeUpload (file) {
                const check = this.defaultList.length < this.size;
                if (!check) {
                    let info  = '最多上传'+this.size+'张'

                    this.$message({
                        message: info,
                        type:'warning'
                    });
                }
                return check;
            },
 
    },
    beforeMount(){
            this.url = this.allUrl.uploadPics;
             if(this.defaultPic!=undefined){
                    if(this.defaultPic==''){
                    }else{
                        let a = this.defaultPic.split(',')
                        a.map((val)=>{
                            let b = {url:val}
                            this.defaultList.push(b)
                            
                        })  
                    }
            
            }
    },
     mounted () {
            this.defaultList = this.$refs.upload.fileList;
        },
  }
</script>
<style scoped lang="scss"> 
	.upload{
		/*width: 100px;*/
		height: 100px;
		/*overflow: hidden;*/
		div{
			ul{
				li{
			width: 100px!important;
			height: 100px!important;
				}
			}
		}
		.el-upload-list__item{
			width: 100px!important;
			height: 100px!important;
		}
	} 
	
</style>
<style type="text/css">
	.el-upload-list__item{
				width: 100px!important;
				height: 100px!important;
	}
	.el-upload--picture-card{
		width: 100px!important;
		height: 100px!important;
		line-height: 100px!important;
	}
</style>