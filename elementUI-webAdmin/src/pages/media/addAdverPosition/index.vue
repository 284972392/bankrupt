<template>
    <!-- ham -->
    <div>
        <el-dialog
        
        :title="defaultPic?'修改广告位':'新建广告位'"
        center
        :visible.sync="dialogVisible"
        width="800px"
        @close="$emit('update:showPosition',false)">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm" size='medium' v-loading="isLoading">
             <el-form-item label="广告位名称：" prop="positionName">
                <el-input v-model="ruleForm.positionName" placeholder="请以广告位的形式或位置命名"></el-input>
            </el-form-item>
            <el-form-item label="广告位入口：" prop="entranceImg">
                <p class="enter">格式为PNG、JPG、JPEG、GIF的图片，大小控制在5MB以内，最多上传3张图片</p>
                <upLoad ref="listPic" :size=3 @update="upImg" @remove="removeImg" :defaultPic="defaultPic?defaultPic:''" ></upLoad>
            </el-form-item>
            <el-form-item label="投放类型" prop="type">
               <el-radio v-model="ruleForm.type" label='0'>手动投放</el-radio>
            </el-form-item>
            <el-form-item label="广告位规格" required>
                 <el-col :span="7">
                <el-form-item prop="num1">
                    <el-input-number v-model="ruleForm.num1" :controls='false' :min="1" size="mini"></el-input-number>
                </el-form-item>
                </el-col>
                <el-col class="line" :span="1">*</el-col>
                <el-col :span="11">
                <el-form-item prop="num2">
                    <el-input-number v-model="ruleForm.num2" :controls='false' :min="1" size="mini"></el-input-number>
                </el-form-item>
                </el-col>
                
                
            </el-form-item>
             
            <el-form-item>
                <el-button type="primary" @click="save('ruleForm')">保存，提交审核</el-button>
            </el-form-item>
        </el-form>
        
        </el-dialog>
    </div>
</template>

<script>
    import upLoad from '@/components/upLoad'
     import { advertPositionSave,updateAdvertPosition } from '@/api/account'
    export default {
        props:{
            change:null,
            mediaId:'',
            sendMediaName:'',
            showPosition:{
                type:Boolean,
                default:false
            },
        },
        components: {
            upLoad
        },
        watch:{
            showPosition(){
                this.dialogVisible = this.showPosition
            }
        },
        data(){
           return{
               defaultPic:null,
               isLoading:false,
               dialogVisible:this.showPosition,
               imgArr:[],
               ruleForm:{
                   entranceImg:'',
                   type:'0',
               },
               form:{

               },
                rules: {
                      positionName: [
                        { required: true, message: '请填写广告位名称', trigger: 'blur' },
                        ],
                    num1: [
                        { required: true, message: '请填写规格', trigger: 'blur' },
                        ],
                     num2: [
                        { required: true, message: '请填写规格', trigger: 'blur' },
                        ],
                      entranceImg: [
                          { required: true, message: '请上传入口图片',trigger:'change'},
                      ]
                   
                  }
           }
        },
        methods:{
            save(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                  if (valid) {
                     this.isLoading = true  
                     this.ruleForm.specs = this.ruleForm.num1 + '*' + this.ruleForm.num2
                     this.form = this.ruleForm
                     delete this.form.num1
                     delete this.form.num2
                        if(this.change){
                            this.changePosition()
                        }else{

                           this.addPositon()
                        }
                    } else {
                        return false;
                    }
                });
            },
            upImg(){
                 this.imgArr.push(this.$store.state.shareUrl)
                  this.ruleForm.entranceImg = this.imgArr.join(';')
                this.$refs.ruleForm.validateField('entranceImg')     
            },
            removeImg(){
                this.imgArr.splice(this.$store.state.imgIndex, 1)
                this.ruleForm.entranceImg = this.imgArr.join(';')
                this.$refs.ruleForm.validateField('entranceImg') 
            },
             async addPositon() {
                try {
                    let res = await advertPositionSave( this.form )
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        })
                     this.isLoading = false
                     this.dialogVisible = false
                    }
                } catch (err) {
                    this.$message({
                    type: 'error',
                        message: '添加失败'
                    })
                    this.isLoading = false
                    this.dialogVisible = false
                }
            },
             async changePosition() {
                try {
                    let res = await updateAdvertPosition( this.form )
                    console.log(this.form)
                    console.log(res)
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        })
                     this.isLoading = false
                     this.dialogVisible = false
                    }
                } catch (err) {
                    this.$message({
                    type: 'error',
                        message: '修改失败'
                    })
                    this.isLoading = false
                    this.dialogVisible = false
                }
            },
        },
        mounted(){
            this.ruleForm.mediaId = this.mediaId
            this.ruleForm.mediaName = this.sendMediaName
            if(this.change){
                this.ruleForm = this.$store.state.adverPositionInfo
                this.ruleForm.num1 = this.ruleForm.specs.split('*')[0]
                this.ruleForm.num2 = this.ruleForm.specs.split('*')[1]
                this.imgArr = this.ruleForm.entranceImg.split(';')
                this.defaultPic = ''
                this.imgArr.map((res)=>{
                    this.defaultPic += 'http://' + res + ',';
                })
                this.defaultPic = this.defaultPic.substr(0,this.defaultPic.length-1)
            }
        }
    }
</script>

<style scoped>
    .grid-content {
        margin-bottom: 15px;
        min-height: 36px;
        border-bottom: 1px solid #cfcdcd;
    }
    .demo-ruleForm{
        width: 89%;
    }
    .enter{
        color: #bdb8b8;
        font-size: 13px;
    }
</style>