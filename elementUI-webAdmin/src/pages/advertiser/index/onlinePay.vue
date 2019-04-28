<template>
    <!-- ham -->
    <div>
        <el-dialog class="dialog-form" width="600px" :visible.sync="visible" @close="$emit('update:show', false)">
              <div slot="title" class="tc title">
              {{title}}
            </div>
            <el-form :model="form" ref="form" v-if="visible" label-width="130px">
                <el-form-item label="账户类型" prop="accountType" :rules="[{required: true,validator:validator_accountStyle, trigger: 'change'}]">
                   <el-select v-model="form.accountType" placeholder="请选择银行账户类型">
                        <el-option label="企业账户" value="0"></el-option>
                        <el-option label="个人账户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="充值金额" prop="amount" :rules="[ { required: true, message: '金额不能为空'},{ type: 'number', message: '金额必须为数字值'},{required: true,validator:validator_money, trigger: 'blur'}]">
                   <el-input v-model.number="form.amount" autocomplete="off" @keyup.enter.native="submitForm('form')" class="w300" size="small" placeholder='请输入充值金额'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="tc">
               <el-button type="primary" class="w100" @click="submitForm('form')">在线充值</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
 import { rechargeRecordSave } from '@/api/account'
    export default {
        name:'onlinePay',
        props:{
            show:{
                type:Boolean,
                default:false
            },
            form:{
                type:Object,
                default:{
                    accountType:null,
                    amount:null
                }
            }
        },
        data(){
            return{
                visible:this.show,
                title:'输入充值金额'
            }
        },
        watch:{
            show(){
                this.visible = this.show
            }
        },
        methods:{
            submitForm(formName){
              
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 输入正确 掉充值接口
                      
                        this.rechargeRecordSave()
                    } else {
                        return false
                    }
                })
               
            },
             async rechargeRecordSave() {
                    try {
                        let res = await rechargeRecordSave({...this.form})
                        this.$message({
                            type: "success",
                            message: '充值成功'
                        })
                        this.visible = false;
                        
                    } catch (err) {
                        this.$message({
                            type: "error",
                            message: err.msg
                        })
                        this.visible = false;
                    }

               
              },
            validator_money(rule, value, callback) {
                if (value<=0||!value) {
                    callback(new Error('请输入正确充值金额'))
                }else{
                      callback()
                }
            },
            validator_accountStyle(rule,value,callback){
          
                if(value == undefined){
                    callback(new Error('请选择账户类型'))
                }else{
                      callback()
                }
            }
        }
    }
</script>

<style scoped>

</style>