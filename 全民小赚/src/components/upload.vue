<template>
	<div>      
    <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format="['jpg','jpeg','png','gif','mp4','avi']"
        
        :default-file-list="defaultList"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :with-credentials = 'true'
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        :action=url
        style="display: inline-block;width:58px;">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="20"></Icon>
            <p class="p1">上传任务截图</p>
            <p class="p2">仅支持png、jpg格式，最多上传5张</p>
        </div>
    </Upload>
    <div class="listContent">
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
         <mu-dialog :open.sync="visible">
            <img :src='imgName' v-if="visible" style="width: 100%">
        </mu-dialog>
    </div>
    </div>
  

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
                this.$emit('remove')

            },
            handleError(error, file, fileList){
                this.$toast.error('上传失败');
            },
            handleSuccess (res, file,fileList) {
              file.url = "http://"+file.response.data[0];
              this.$store.state.shareUrl = file;
              this.$emit('update')
        
            },
            handleFormatError (file) {
                 this.$toast.error('文件格式错误');
            },
            handleMaxSize (file) {
                  this.$toast.error('文件过大');
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < this.size;
                if (!check) {
                    let info  = '最多上传'+this.size+'张'

                  this.$toast.error('最多上传五张');
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
           
        },
        beforeMount () {
            
                let url = this.allUrl + '/uploadPic/uploadPic'
            this.url = url;
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
       
        }
    }
</script>
<style>
    .ivu-upload{
        width: 100% !important;
        height: 6.25rem;
    }
    .p1{
        font-size: .8125rem;
        font-weight: bold;
        color: #333333;
        margin: .4375rem;
    }
    .p2{
        font-size: .6875rem;
        color: #999999;
    }
    .listContent{
         /* height: 7.25rem; */
               width: 95%;
               display: flex;
               overflow: scroll;
                margin-top: .625rem;
    }
    .demo-upload-list{
        display: inline-block;
        width: 5.25rem;
        height: 7.25rem;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .demo-upload-list img{
       width: 5.25rem;
                   height: 7.25rem;
                   margin-right: .875rem;
    }
    .demo-upload-list-cover{
        padding-top: 1rem;
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
