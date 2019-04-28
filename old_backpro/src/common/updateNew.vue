<template>
	<div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
         <Modal title="View Image" v-model="visible">
            <img :src='imgName' v-if="visible" style="width: 100%">
        </Modal>
    </div>
         

     
    <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format="['jpg','jpeg','png','gif','mp4','avi']"
        :max-size="5120"
        :default-file-list="defaultList"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :with-credentials = 'true'
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        :action=url
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
    </div>
</template>
<script>
    export default {

        props:['size','defaultPic'],

        data () {
            return {
                url:'',
                imgName: '',
                visible: false,
                uploadList: [],
                defaultList: []
            }
        },
        methods: {
            // changePlace(){
            //     this.uploadList = this.uploadList.slice(-1).concat(this.uploadList.slice(0,-1));
            //     this.defaultList = this.defaultList.slice(-1).concat(this.defaultList.slice(0,-1));
            // },
            handleView (url) {
                this.imgName = url;
                this.visible = true;
            },
            handleRemove (file,index) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.$store.state.imgIndex = index;
                console.log(index)
                this.$emit('remove')

            },
            handleError(error, file, fileList){
                console.log(error)
                this.$Message.error('上传失败');
            },
            handleSuccess (res, file,fileList) {
              console.log(file)
              file.url = "http://"+file.response.data[0];
              this.$store.state.shareUrl = file;
              this.$emit('update')
        
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '文件' + file.name + '格式不正确，请选择jpg或者png'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + '太大了，最多5M'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < this.size;
                if (!check) {
                    let info  = '最多上传'+this.size+'张'

                    this.$Notice.warning({
                        title: info
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
           
        },
        beforeMount () {
            this.url = this.allUrlThree.uploadPic;
                if(this.defaultPic!=undefined){

                    if(this.defaultPic==''){

                    }else{
                        let a = this.defaultPic.split(';')
                        a.map((val)=>{
                            let b = {url:val}
                            this.defaultList.push(b)
                            
                        })  
                    }

            }
       
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
