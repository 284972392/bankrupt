<template>
    <!-- ham -->
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" size='medium'>
             <el-form-item label="媒体名称：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请填写网站名称，不超过20个字"></el-input>
            </el-form-item>
             <el-form-item label="用户偏好行业广告：" prop="industry">
                <el-select v-model="ruleForm.industry" placeholder="请选择用户偏好行业广告">
                   <el-option v-for="item in industry" :key="item.label" :label="item.label" :value="item.value">
                   </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="网站域名：" prop="website">
                <el-input v-model="ruleForm.website" placeholder="请输入网站域名，如http://域名"></el-input>
            </el-form-item>
            <el-form-item label="媒体关键字：" prop="keyWord">
                <el-input v-model="ruleForm.keyWord" placeholder="请填写媒体的性质或者主要用途，不超过20个字"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介" prop="introduction">
                <el-input type="textarea" v-model="ruleForm.introduction" placeholder="正确地填写媒体简介能够提高广告的匹配度及收益，至少40个字"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="next('ruleForm')">保存，提交审核</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
const industry = [
  { value: '0', label: '金融理财' },
  { value: '1', label: '医疗保健' },
  { value: '2', label: '教育培训' },
  { value: '3', label: '服装鞋帽' },
  { value: '4', label: '箱包饰品' },
  { value: '5', label: '食品饮料' },
  { value: '6', label: '家庭日用' },
  { value: '7', label: '母婴护理' },
  { value: '8', label: '化妆护理' },
  { value: '9', label: '手机数码' },
  { value: '10', label: '家用电器' },
  { value: '11', label: '硬件办公' },
  { value: '12', label: '家具建材' },
  { value: '13', label: '网络服务' },
  { value: '14', label: '生活服务' },
  { value: '15', label: '交通出行' },
  { value: '16', label: '旅游住宿' },
  { value: '17', label: '房地产' },
  { value: '18', label: '通讯服务' },
  { value: '19', label: '游戏' },
  { value: '20', label: '休闲娱乐' },
  { value: '21', label: '媒体自我推广' },
  { value: '22', label: '优惠卡券' },
  { value: '23', label: '电商平台' },
]

    export default {
        props:{
            ruleForm:{
                type:Object,
                default:{
                  
                }
            }
        },
        data(){
           return{
               industry:industry,
                rules: {
                      name: [
                        { required: true, message: '请填写应用市场名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '不超过20个字', trigger: 'blur' }
                        ],
                      industry: [
                            { required: true, message: '请选择用户偏好行业广告', trigger: 'change' }
                        ],
                      website: [
                          { required: true, message: '请填写网站域名', trigger: 'blur' },
                        ],
                      keyWord: [
                        { required: true, message: '请填写媒体的性质或者主要用途', trigger: 'blur' },
                        { min: 1, max: 20, message: '不超过20个字', trigger: 'blur' }
                      ],
                      introduction:[
                        { required: true, message: '请填写媒体简介', trigger: 'blur' },
                        { min: 40, message: '至少40个字', trigger: 'blur' }
                      ]
                  }
           }
        },
        methods:{
            next(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                  if (valid) {
                       this.$emit('submit')
                    
                    } else {
                       
                        return false;
                    }
                });
            }
        },
        mounted(){
            
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