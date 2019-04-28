<template>
    <!-- ham -->
    <div>
        <el-row>
        <el-col :span="24"><div class="grid-content">广告信息</div></el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" size='medium'>
             <el-form-item label="推广计划名称:" prop="advertName">
                <el-input v-model="ruleForm.advertName" placeholder="不超过20个字"></el-input>
            </el-form-item>
             <el-form-item label="计费方式:" prop="chargeMode">
                <el-radio-group v-model="ruleForm.chargeMode" @change='changeMode'>
                    <el-radio label="0">CPC(按点击计算)</el-radio>
                    <el-radio label="1">CPA</el-radio>
                </el-radio-group>
            </el-form-item>
             <el-form-item label="广告出价:" prop="price" :rules="[ { required: true, message: '金额不能为空'},{required: true,validator:validator_bidding, trigger: 'blur'}]">
                    <el-input v-model.number="ruleForm.price" :placeholder="ruleForm.chargeMode=='0'?'每一次有效点击的付费金额，填写不小于低价':'每次一有效注册，订单的付费金额'">
                        <template slot="append">元</template>
                    </el-input>
            </el-form-item>

              <el-form-item label="每日预算:" prop="dailyBudget" :rules="[{validator:validator_dailyBudget, trigger: 'blur'}]">
                    <el-input v-model.number="ruleForm.dailyBudget" :disabled="ruleForm.chargeMode=='1'" placeholder="每天的消费金额上限，不填则不限，填写则必须高于100">
                        <template slot="append">元</template>
                    </el-input>
            </el-form-item>

            <el-form-item label="投放平台:" prop="platform">
                <el-checkbox-group v-model="ruleForm.platform">
                    <el-checkbox label="0">Android</el-checkbox>
                    <el-checkbox label="1">IOS</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

             <el-form-item label="投放时间:" prop="putInDate">
                 <el-date-picker
                    v-model="ruleForm.putInDate"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"            
                    :default-time="['00:00:00', '23:59:59']"
                    >
                </el-date-picker>
             </el-form-item>

             <el-form-item label="投放地域:" prop="putInArea">
               <el-button type="primary" @click="showRegionState=true">选择</el-button>
               <get-region :showRegionState="showRegionState" @changeState="showRegion" :cityList="ruleForm.putInArea" @chooseCity="chooseCity"></get-region>
             </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="next('ruleForm')">下一步，添加优惠券信息</el-button>
            </el-form-item>
             
        </el-form>
        
    </div>
</template>

<script>
    import getRegion from '@/components/region/region'
  
    export default {
        name:'stepOne',
        components:{
            getRegion
        },
        props:{
            ruleForm:{
                type:Object,
                default:{
                 
                }
            }
        },
        data(){
           return{
               showRegionState:false,
               show:false,
                rules: {
                    advertName: [
                        { required: true, message: '请输入推广计划名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '不超过20个字', trigger: 'blur' }
                        ],
                    chargeMode: [
                        { required: true, message: '请选择计费方式', trigger: 'change' }
                    ],
                    platform: [
                        { type: 'array', required: true, message: '请至少选择一个投放平台', trigger: 'change' }
                    ],
                    putInDate:[
                        { type: 'array', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    putInArea:[
                        { type: 'array', required: true, message: '请选择', trigger: 'change' }
                    ],
                  }
           }
        },
        methods:{
            changeMode(val){
                if(val=='1'){
                    this.ruleForm.dailyBudget = ''
                }
            },
            showRegion() {
                 this.showRegionState = false
                
            },
            chooseCity(val){
                this.ruleForm.putInArea = val;
                 this.$refs.ruleForm.validateField('putInArea')
            },
            next(ruleForm){
              
                 this.$refs[ruleForm].validate((valid) => {            
                  if (valid) {
                       this.$emit('goStepTwo')
                  } else {
                    return false;
                  }
                });
                // this.$store.state.clearAdvertisePlan = true;
              
            },
             validator_bidding(rule, value, callback) {
                    if(typeof(value)!=='number') {
                        callback(new Error('输入金额必须为数字'))
                    }else if (value<=0) {
                      callback(new Error('请输入正确金额'))
                    }else{
                        callback()
                    }
            },
            validator_dailyBudget(rule, value, callback) {
                if(value&&value.length!==0){
                    if(typeof(value)!=='number') {
                        callback(new Error('输入金额必须为数字'))
                    }else if (value<=100) {
                      callback(new Error('输入金额需大于一百'))
                    }else{
                        callback()
                    }
                }else{
                      callback()
                }
            },
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