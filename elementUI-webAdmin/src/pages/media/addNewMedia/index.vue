<template>
  <!-- ham -->
    <section class="pd20">  
       
        <el-card shadow="never" style="margin-top:20px;padding:20px;" v-loading="isLoading">
             <el-row>
              <el-col :span="24"><div class="grid-content">新建媒体</div></el-col>
            </el-row>
            <p style="margin:0 0 20px 69px;color:#606266;"> 系统平台：<span style="margin-left:11px;"></span>{{this.platform}}</p>
            <android-ios :ruleForm="form" @submit='submit' v-if="form.platform=='0'||form.platform=='1'"></android-ios>
            <H5 :ruleForm="form" @submit='submit' v-if="form.platform=='2'"></H5>
            <vipcn :ruleForm="form" @submit='submit' v-if="form.platform=='3'"></vipcn>
            <applet :ruleForm="form" @submit='submit' v-if="form.platform=='4'"></applet>
        </el-card>

        <el-dialog
            title="提交"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>确认提交审核？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitConfirm">确 定</el-button>
            </span>
            </el-dialog>

    </section>
</template>

<script>
    import androidIos from './androidIos'
    import H5 from './H5'
    import vipcn from './vipcn'
    import applet from './applet'
     import { mediaSave,mediaUpdate } from '@/api/account'
    export default {
         components:{
            androidIos,H5,vipcn,applet
        },
        data(){
            return{
                isChange:false,
                isLoading:false,
                form:{
                    platform:'',
                },
                platform:'',
                dialogVisible:false
            }
        },
        methods:{
            submit(){
                this.dialogVisible = true
            },
            submitConfirm(){
                this.dialogVisible = false
                this.isLoading = true
                if(!this.isChange){
                    this.addMedia()
                }else{
                    this.mediaUpdate()
                }
                
            },
             async addMedia() {
                try {
                    let res = await mediaSave( this.form )
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '提交成功，等待审核'
                        })
                     this.isLoading = false
                    this.$router.push('/mediaTraffic/myMedia')
                    }
                } catch (err) {
                    this.$message({
                    type: 'error',
                        message: '提交失败'
                    })
                    this.isLoading = false
                }
            },
            async mediaUpdate() {
                try {
                    let res = await mediaUpdate( this.form )
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '提交成功，等待审核'
                        })
                     this.isLoading = false
                     this.$router.push('/mediaTraffic/myMedia')
                    }
                } catch (err) {
                    console.log(err)
                    this.$message({
                    type: 'error',
                        message: '提交失败'
                    })
                    this.isLoading = false
                }
            },
            
        },
        mounted(){
            this.form.platform = this.$store.state.selectPlatform
            this.platform = this.form.platform=='0'?'Android':this.form.platform=='1'?'IOS':this.form.platform=='2'?'H5':this.form.platform=='3'?'公众号':'小程序'
        },
        beforeMount(){
            if(this.$route.query){
                 if(this.$route.query.action == 'change'){
                    this.isChange = true
                    this.form = this.$store.state.MediaInfo
                  } 
                }      
        }
    }
</script>

<style scoped>
    .grid-content{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
          margin-bottom: 15px;
        min-height: 36px;
        border-bottom: 1px solid #cfcdcd;
    }
</style>