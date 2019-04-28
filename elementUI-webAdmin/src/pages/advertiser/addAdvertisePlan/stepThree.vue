<template>
    <!-- ham -->
    <div>
        <el-row>
        <el-col :span="24"><div class="grid-content">优惠码信息</div></el-col>
        </el-row>
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm" size='medium'>
             <el-form-item label="设置有效期" prop="indate">
               <el-checkbox label="跟随投放日期" v-model="ruleForm.indate" disabled></el-checkbox>
            </el-form-item>
            <el-form-item label="优惠码内容" prop="content">
               <el-checkbox label="推广链接" v-model="ruleForm.content" disabled></el-checkbox>
            </el-form-item>
            <el-col :span="24">
                <div style="padding:0 0 10px 28px;"> <span style="color:#fc1111;">提示：</span>用户点击推广链接即可直接享受优惠</div>   
            </el-col>
  
              <el-form-item label="优惠码数量" prop="content">
               <el-checkbox label="不限" v-model="ruleForm.content" disabled></el-checkbox>
            </el-form-item>
           
            <el-form-item>
                 <el-button type="danger" plain @click="last">上一步</el-button>
                <el-button type="primary" @click="next()">保存并提交</el-button>
            </el-form-item>
             
        </el-form>
    </div>
</template>

<script>
    export default {
        name:'stepOne',
        props:{
            ruleForm:{
                type:Object,
                default:{
                  
                }
            }
        },
        data(){
           return{
    
           }
        },
        methods:{
            next(){
                 this.$emit('submit')
            },
            last(){
                 this.$emit('returnStepTwo')
            }
        }
    }
</script>

<style scoped>
    .grid-content {
        margin-bottom: 15px;
        min-height: 36px; 
        border-bottom: 1px solid #cf1111;
    }
    .demo-ruleForm{
        width: 60%;
    }
</style>