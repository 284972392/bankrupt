<template>
    <!-- ham -->
    <div>
        <el-row>
        <el-col :span="24"><div class="grid-content">推广链接</div></el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" size='medium'>
             <el-form-item label="推广链接:" prop="promoteLink">
                <el-input v-model="ruleForm.promoteLink" placeholder="请输入预推广的网址链接"></el-input>
            </el-form-item>
             <el-form-item label="优惠券描述:">
                <p>新商品图片提交审核期间，系统将使用原来的图片正常投放，审核通过后会替换为新图</p>
            </el-form-item>
            <el-form-item label="商品名称:" prop="commodityName">
                <el-input v-model="ruleForm.commodityName" placeholder="请设置展示给用户的商品名称，不得超过13个字"></el-input>
            </el-form-item>
            <el-form-item label="商品说明:" prop="discountDescription">
                <el-input v-model="ruleForm.discountDescription" type="textarea" placeholder="描述商品本身信息，使用方法，限制条件等"></el-input>
            </el-form-item>

          <div style="display:flex;">
              <el-form-item label="详细图片:" prop="detailPic">
                  <div style="width:210px;">
                      <upLoad ref="detailPic" :size=1 @update="upDetailImg" @remove="removeIdPic" :defaultPic="ruleForm.detailPic?'http://'+ruleForm.detailPic:''"></upLoad>
                  </div>
            </el-form-item>
                <el-form-item label="列表图片:" prop="listPic" style="width:700px;">
                    <div style="width:210px;">
                      <upLoad ref="listPic" :size=1 @update="uplistImg" @remove="removelistImg" :defaultPic="ruleForm.listPic?'http://'+ruleForm.listPic:''"></upLoad>
                     </div>
                </el-form-item>
                <el-form-item label="LOGO图片:" prop="logoPic" style="width:700px;">
                    <div style="width:210px;">
                    <upLoad ref="logoPic" :size=1 @update="uplogoImg" @remove="removelogoImg" :defaultPic="ruleForm.logoPic?'http://'+ruleForm.logoPic:''"></upLoad>
                    </div>
                </el-form-item>
          </div>
             
             
           
            <el-form-item>
                 <el-button type="danger" plain @click="last">上一步</el-button>
                <el-button type="primary" @click="next('ruleForm')">保存，提交审核</el-button>
            </el-form-item>
             
            
              
        </el-form>
    </div>
</template>

<script>
 import upLoad from '@/components/upLoad'
 import validate from '@/mixin/validate'
    export default {
        mixins: [validate],
        components: {
            upLoad
        },
        name:'stepOne',
        props:{
            ruleForm:{
                type:Object,
                default:{}
            }
        },
        data(){
           return{
           
                rules: {
                    promoteLink: [
                         { required: true, message: '请输入预推广的网址链接', trigger: 'blur' },
                          ],
                    commodityName: [
                         { required: true, message: '请输入商品名称', trigger: 'blur' },
                          {  max: 13, message: '长度在13个字符以内', trigger: 'blur' }
                         ],
                    discountDescription:[
                         { required: true, message: '请输入商品说明', trigger: 'blur' },
                          ],
                    detailPic:[
                        { required: true, message: '请上传详细图片',trigger:'change'},
                    ],
                    listPic:[
                        { required: true, message: '请上传列表图片',trigger:'change'},
                    ],
                    logoPic:[
                        { required: true, message: '请上传Logo图片',trigger:'change'},
                    ]
                  }
           }
        },
        methods:{
            next(ruleForm){
                // console.log(this.ruleForm)
                //  this.$refs.ruleForm.validateField('detailImg')
                 this.$refs[ruleForm].validate((valid) => {
                  if (valid) {
                       this.$emit('goStepThree')
                    console.log('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
               
            },
            last(){
                 this.$emit('goStepOne')
            },
            upDetailImg(){
                console.log(this.$store.state.shareUrl)
                this.ruleForm.detailPic = this.$store.state.shareUrl
                this.$refs.ruleForm.validateField('detailPic')     
            },
            removeIdPic(){
                this.ruleForm.detailPic = null;
                this.$refs.ruleForm.validateField('detailPic')
            },
            uplistImg(){
                this.ruleForm.listPic = this.$store.state.shareUrl
                this.$refs.ruleForm.validateField('listPic')     
            },
            removelistImg(){
                this.ruleForm.listPic = null;
                this.$refs.ruleForm.validateField('listPic')
            },
            uplogoImg(){
                 this.ruleForm.logoPic = this.$store.state.shareUrl
                this.$refs.ruleForm.validateField('logoPic')     
            },
            removelogoImg(){
                this.ruleForm.logoPic = null;
                this.$refs.ruleForm.validateField('logoPic')
            },
         
        },
        computed:{
            getClear(){
            return this.$store.state.clearAdvertisePlanImg;
            }
        },
        watch: {
                getClear(val) {
                    if(val){
                        this.$refs.detailPic.clearDefault()
                        this.$refs.listPic.clearDefault()
                        this.$refs.logoPic.clearDefault()
                        this.$store.state.clearAdvertisePlanImg = false;
                    }
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
        width: 60%;
    }
</style>