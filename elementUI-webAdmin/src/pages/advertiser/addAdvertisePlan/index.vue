<template>
   <!-- ham -->
<section class="pd20">  
    <el-card shadow="hover">
         <el-steps :active="active" finish-status="success">
            <el-step title="互动广告"></el-step>
            <!-- <el-step title="添加优惠券"></el-step> -->
            <el-step title="提交审核"></el-step>
         </el-steps>
    </el-card>
     <el-card shadow="never" style="margin-top:20px;padding:20px;" v-if="changeShow">
         <step-one @goStepTwo="goStepTwo" v-show="show1" :ruleForm="form"></step-one>
         <step-two @goStepThree="goStepThree" @goStepOne="goStepOne" v-show="show2" :ruleForm="form"></step-two>
         <!-- <step-three @submit="submit" @returnStepTwo="returnStepTwo" v-show="show3" :ruleForm="form"></step-three> -->
    </el-card>
    </section>
</template>

<script>

    import stepOne from './stepOne'
    import stepTwo from './stepTwo'
    import { changeTime } from '@/api/public'
    import { advertSave,getAdvertById,advertUpdate } from '@/api/account'
    // import stepThree from './stepThree'
    export default {
        name:'addAdverPlan',
        components:{
            stepOne,stepTwo
        },
         data() {
            return {
                    changeShow:true,
                    isChange:false,
                    id:0,
                    active: 0,
                    show1:true,
                    show2:false,
                    show3:false,
                    form:{
                         platform:[],
                         putInArea:[],
                         detailPic:'',
                         listPic:'',
                         logoPic:'',
                         putInDate:[],
                         chargeMode:'0'
                    },
                    formData:{

                    }
                };
            },
        methods: {
            goStepTwo(){
                this.show1 = false
                this.show2 = true
                this.active = 1

            },
            goStepThree(){
                this.active = 2
                // this.show3 = true
                // this.show2 = false
                console.log(this.form)
                if(this.isChange){
                    this.advertUpdate()
                }else{
                    this.addAdver()
                }
               
            },
             async addAdver() {
                 this.form.putInDate = JSON.stringify(this.form.putInDate)
                 this.form.putInArea = JSON.stringify(this.form.putInArea)
                 this.form.platform = JSON.stringify(this.form.platform) 
                 this.formData = this.form     
                try {
                    let res = await advertSave( this.form )
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '添加成功,等待平台审核'
                        })
                    }
                    this.$router.push('/advertise/adverlist')
                } catch (err) {
                    this.form = this.formData
                    this.$message({
                    type: 'error',
                        message: '添加失败'
                    })
                    this.$router.push('/advertise/adverlist')
                }
            },
            async advertUpdate() {
                 this.form.putInDate = JSON.stringify(this.form.putInDate)
                 this.form.putInArea = JSON.stringify(this.form.putInArea)
                 this.form.platform = JSON.stringify(this.form.platform) 
                 this.formData = this.form     
                try {
                    let res = await advertUpdate( this.form )
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '修改成功，等待平台审核'
                        })
                    }
                    this.$router.push('/advertise/adverlist')
                } catch (err) {
                    this.form = this.formData
                    this.$message({
                    type: 'error',
                        message: '修改失败'
                    })
                    this.$router.push('/advertise/adverlist')
                }
            },
            async getAdvertById(){ 
                try {
                    let res = await getAdvertById( {advertId:this.id} )
                    res.data.data.chargeMode = String(res.data.data.chargeMode)
                    res.data.data.platform = JSON.parse(res.data.data.platform)
                    res.data.data.putInArea = JSON.parse(res.data.data.putInArea)
                    res.data.data.putInDate = JSON.parse(res.data.data.putInDate)
                    this.form = res.data.data
                    this.changeShow = true
                }catch (err) {
 
                }
            },
            
            goStepOne(){
                this.active = 0
                this.show1 = true
                this.show2 = false
            },
            // returnStepTwo(){
            //     this.show3 = false
            //     this.show2 = true
            // },
            // submit(){
            //     this.form = {platform:[],region:[], detailImg:'',listImg:'',logoImg:''}
            //     //  this.$refs[formName].resetFields();
            //      this.show1 = true
            //      this.show2 = false
            //      this.show3 = false
            //      this.$store.state.clearAdvertisePlan = true;
            //      this.$store.state.clearAdvertisePlanImg = true;
            // }
        },
        beforeMount(){
               if(this.$route.query){
                 if(this.$route.query.action == 'change'){
                     if(this.$store.state.AdvertiseInfo.id){
                         this.changeShow = false
                         this.isChange = true
                         this.id = this.$store.state.AdvertiseInfo.id
                         this.getAdvertById()
                     }
                  } 
                }      
        },
        mounted(){
                 
        }

    }
</script>

<style scoped>

</style>